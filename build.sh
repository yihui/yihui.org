#!/bin/sh

# do not index the site on Netlify (only index the one built on Vercel)
if [ "$NETLIFY" = "true" ]; then
  cd static
  echo 'User-agent: *
Disallow: /' > robots.txt
  cd ..
fi

# Cloudflare Pages only does a shallow clone, which loses git info
if [ "$CF_PAGES_BRANCH" = "master" ]; then
  git fetch --unshallow
  mv static/_redirects_cf static/_redirects
fi

# for preview, build drafts (-D) and use the baseURL from the CI provider
if [ "${VERCEL_ENV:-$CONTEXT}" = "production" ] || [ "$CF_PAGES_BRANCH" = "master" ]; then
  hugo -F --enableGitInfo
else
  hugo -F -D -b "${CF_PAGES_URL:-$DEPLOY_PRIME_URL}" --enableGitInfo
fi

# add litedown documentation
cd public
git clone --depth 1 -b gh-pages https://github.com/yihui/litedown litedown
rm -rf litedown/.git
