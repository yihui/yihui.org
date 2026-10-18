// Reindex this repo's Discussions when GitHub drops the search index.
//
// GitHub occasionally drops the Discussions search index: discussions still exist
// and open (repository.discussions returns them, direct URLs work), but
// search(type:DISCUSSION) returns almost none. The Discussions list page and giscus
// both read the search index, so they break while direct links keep working.
//
// Writing to a discussion re-adds it to the index. This finds discussions missing
// from the search index and patches each (append a space, then restore the original
// body) to force a reindex. Net body change is zero.
//
// Invoked from .github/workflows/reindex-discussions.yml via actions/github-script.
module.exports = async ({ github, context }) => {
  const owner = context.repo.owner;
  const name = context.repo.repo;
  const forceAll = context.payload.inputs?.force_all === 'true';
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  // GraphQL point budget (GITHUB_TOKEN: ~5000/hr). Querying rateLimit itself costs 0,
  // so we can poll it freely. Each patch spends ~3 points (1 body read + 2 mutations);
  // stop with a buffer so we never fail mid-patch.
  const RATE_BUFFER = 20;
  async function rateLimit() {
    const q = await github.graphql(`{ rateLimit { remaining resetAt } }`);
    return q.rateLimit;
  }

  // All discussions (this API is healthy even when search is broken).
  async function allDiscussions() {
    const out = [];
    let after = null;
    do {
      const q = await github.graphql(`
        query($owner:String!,$name:String!,$after:String){
          repository(owner:$owner,name:$name){
            discussions(first:100, after:$after, orderBy:{field:UPDATED_AT, direction:DESC}){
              pageInfo{ hasNextPage endCursor }
              nodes{ id number createdAt updatedAt }
            }
          }
        }`, { owner, name, after });
      const c = q.repository.discussions;
      out.push(...c.nodes);
      after = c.pageInfo.hasNextPage ? c.pageInfo.endCursor : null;
    } while (after);
    return out;
  }

  // Numbers currently present in the (possibly degraded) search index. Search returns
  // at most 1000 results per query (discussionCount still reports the true total), so
  // bisect the creation-time range until each slice fits, then paginate each slice.
  const SEARCH_CAP = 1000;
  async function searchSlice(from, to, set) {
    const query = `repo:${owner}/${name} created:${from.toISOString()}..${to.toISOString()}`;
    const first = await github.graphql(`
      query($q:String!){ search(type:DISCUSSION, query:$q, first:1){ discussionCount } }`, { q: query });
    const count = first.search.discussionCount;
    if (count === 0) return;
    if (count > SEARCH_CAP && to - from > 1000) {
      const mid = new Date(Math.floor((from.getTime() + to.getTime()) / 2));
      await searchSlice(from, mid, set);
      await searchSlice(new Date(mid.getTime() + 1000), to, set); // ranges are inclusive, 1s resolution
      return;
    }
    let after = null;
    do {
      const q = await github.graphql(`
        query($q:String!,$after:String){
          search(type:DISCUSSION, query:$q, first:100, after:$after){
            pageInfo{ hasNextPage endCursor }
            nodes{ ... on Discussion { number } }
          }
        }`, { q: query, after });
      for (const n of q.search.nodes) if (n?.number) set.add(n.number);
      after = q.search.pageInfo.hasNextPage ? q.search.pageInfo.endCursor : null;
    } while (after);
  }

  async function indexedNumbers(all) {
    const set = new Set();
    const times = all.map(d => new Date(d.createdAt).getTime());
    await searchSlice(new Date(Math.min(...times)), new Date(Math.max(...times) + 1000), set);
    return set;
  }

  // Secondary (content-creation) rate limits are separate from the point budget and
  // not exposed by rateLimit. Go fast and back off only when GitHub signals one,
  // honoring Retry-After so a run does as much as allowed.
  async function gqlWrite(mut, vars) {
    for (let attempt = 0; ; attempt++) {
      try { return await github.graphql(mut, vars); }
      catch (e) {
        const h = e?.response?.headers || e?.headers || {};
        const secondary = /secondary rate limit|abuse|\brate limit\b/i.test(e.message || '');
        if (!secondary || attempt >= 5) throw e;
        let wait = 0;
        if (h['retry-after']) wait = parseInt(h['retry-after'], 10) * 1000;
        else if (h['x-ratelimit-reset']) wait = parseInt(h['x-ratelimit-reset'], 10) * 1000 - Date.now();
        wait = Math.min(Math.max(wait, 1000), 60000) + 1000; // 1s..61s
        console.log(`Secondary rate limit; waiting ${Math.round(wait / 1000)}s (attempt ${attempt + 1}).`);
        await sleep(wait);
      }
    }
  }

  // Two writes: body+' ' then original body. Forces a reindex, net-zero change.
  // Re-read the body right before patching so a concurrent edit (e.g. the sibling
  // discussion.yml normalizing a new giscus discussion) is not clobbered.
  async function patch(d) {
    const cur = await github.graphql(`
      query($id:ID!){ node(id:$id){ ... on Discussion { body } } }`, { id: d.id });
    const body = cur.node?.body || '';
    const mut = `mutation($id:ID!,$body:String!){
      updateDiscussion(input:{discussionId:$id, body:$body}){ discussion{ number } }
    }`;
    await gqlWrite(mut, { id: d.id, body: body + ' ' });
    await sleep(400);
    await gqlWrite(mut, { id: d.id, body });
  }

  const all = await allDiscussions();
  const indexed = await indexedNumbers(all);
  console.log(`total=${all.length} indexed=${indexed.size} forceAll=${forceAll}`);

  // Build the work list and patch oldest -> newest, so the newest keeps the latest
  // updatedAt and the original chronological order is preserved in GitHub's "Latest"
  // sort and in giscus.
  let targets = forceAll ? all.slice() : all.filter(d => !indexed.has(d.number));
  targets.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));

  if (targets.length === 0) {
    console.log('Search index healthy; nothing to reindex.');
    return;
  }

  let rl = await rateLimit();
  console.log(`Need to reindex ${targets.length}; rate limit remaining=${rl.remaining}, resets ${rl.resetAt}.`);
  let ok = 0, fail = 0, stopped = false, i = 0;
  for (; i < targets.length; i++) {
    // Patch costs ~3 points; stop before the budget runs out.
    if (rl.remaining < RATE_BUFFER + 3) {
      stopped = true;
      break;
    }
    const d = targets[i];
    let patched = true;
    try { await patch(d); ok++; }
    catch (e) {
      patched = false;
      fail++;
      console.log(`#${d.number} failed: ${e.message}`);
      if (/rate limit|secondary/i.test(e.message)) { stopped = true; break; }
    }
    console.log(`[${i + 1}/${targets.length}] #${d.number} ${patched ? 'reindexed' : 'FAILED'} (ok=${ok} fail=${fail})`);
    await sleep(400); // throttle to avoid secondary rate limits
    rl = await rateLimit(); // free to poll; keeps budget tracking exact
  }
  const remaining = targets.length - i;
  console.log(`Reindexed ${ok}, failed ${fail}, remaining ${remaining}. Rate limit remaining=${rl.remaining}.`);
  if (stopped && remaining > 0) {
    console.log(`Stopped near rate-limit budget; the next scheduled run (or re-dispatch after ${rl.resetAt}) will continue.`);
  }
};
