---
title: Migrating Comments from Disqus and Utterances to Giscus
date: '2022-12-19'
slug: disqus-to-giscus
---

Like [Rob](https://robjhyndman.com), I have wished to ditch Disqus for a long
time, which I have used for more than a decade. I was aware of [Maëlle Salmon's
work](https://masalmon.eu/2019/10/02/disqus/) in 2019 (and [Nan
Xiao's](https://nanx.me/blog/post/migrating-from-disqus-to-utterances/) in
2020), but hesitated at that time. Unlike Maëlle, removing Disqus was both
emotionally and technically hard for me because I had more than 10K comments in
Disqus, in which I had a lot of memories of the old days!

## The problems that I had with migrating Disqus comments

In September this year, I saw that [Rob's
post](https://robjhyndman.com/hyndsight/disqus2giscus.html) on migrating from
Disqus to Giscus. It seemed that Mitch O'Hara-Wild had fully automated the job
of extracting Disqus comments and re-posting them to Github Discussions so that
we could use Giscus, which sounded awesome to me, but again, the number of
Disqus comments on my site was huge. I knew Github has some rate limit, and I
had no idea how long it would take to post the 10K comments. In addition, I was
still hesitating on two other things:

1.  I didn't like the fact that all guest comments must be posted using my own
    Github account, even though there is a header line in each Github comment
    that says "this comment was originally posted by \[...\] on \[...\]". If the
    readers don't pay close attention, they may feel that I've been talking to
    myself on my own site for 17 years :) More importantly, the original authors
    will longer be notified if someone replies to their comments. There isn't an
    easy way for them to view their comment history, either (Disqus allows you
    to view all of your past comments on a single page).

2.  I also felt a little sad that the original timestamp of a comment couldn't
    be preserved but could only be written in a header note. Readers may see a
    comment which Github says was posted a week ago but was actually posted ten
    years ago.

Neither problem has a solution. You can't post a comment on another person's
behalf on Github, and nor can you modify the timestamp of a comment. However, I
did come up with a way to remedy #1: I registered a Github account `@giscus-bot`
to post guest comments, and used my personal account to post my own comments.
Then the whole comment thread looks like this ([a real
example](https://github.com/yihui/yihui.org/discussions/742)):

``` md
@giscus-bot 3 days ago

Guest *John Doe* @ 2012-03-02 08:38:03 originally posted:

Hi Yihui!

---------------------------------------------------------

    @yihui 2 days ago
    
    Hi John!
    
    > Originally posted on 2012-03-02 20:28:48
```

To further remedy #1, I added `@username` in the comments from some friends of
whom I know both their Github usernames and Disqus names. This means when
someone replies to their comments in the future, they will get notified.
However, this also means that during the migration to Github Discussions, these
friends could get tons of Github notifications, depending on how many comments
they have left on my site before. I told some of them that the closer our
friendship is, the more "spam emails" you will get from me this time.
Afterwards, among the people whom I didn't notify in advance, two told me they
were surprised by the sudden flood of tens of email notifications, and another
told me he got a few thousands... My apologies! I hope our friendship has stood
up well to this pressure test.

I also took this chance to clean up some Disqus comments programmatically. For
example, Chinese readers love using `~~` to express cuteness, but that coincides
with the syntax for ~~strikeout~~ in Github's Markdown. I substituted them with
the full-width `～～`. Another example is that Disqus shortens long bare links,
and I expanded them back.

## An Utterances problem

I also had some Utterances comments. Migrating them was much easier since Github
allows us to convert Github Issues (on which Utterances is based) to Github
Discussions. However, I had another complication on my site: I enabled both
Utterances and Disqus, and got comments from both systems for the same posts. I
had to merge these comments. Rob's script was only for creating new Github
discussions, so I modified it to check if a discussion exists (migrated from a
Github issue) and post Disqus comments to existing discussions if possible.

To post to an existing discussion, you need to know its ID. Here is how I
obtained a data frame of all existing discussions (you need to set up a Github
token first, e.g., in the environment variable `GITHUB_PAT`):

``` r
get_discussions = function(owner, repo) {
  has_next = TRUE
  next_cursor = NULL
  info = NULL
  while(has_next) {
    next_cursor = if (is.null(next_cursor)) '' else {
      paste0(', after: "', next_cursor, '"')
    }
    query = gh::gh_gql(sprintf('query FindRepo {
      repository(owner: "%s", name: "%s") {
        discussions(first: 100%s) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              title
              body
              id
            }
          }
        }
      }
    }', owner, repo, next_cursor
    ))
    res = query$data$repository$discussions
    has_next = res$pageInfo$hasNextPage
    next_cursor = res$pageInfo$endCursor
    info = c(info, lapply(res$edges, function(x) unlist(x$node)))
  }
  info = do.call(rbind, info)
  as.data.frame(info)
}

# fetch all discussions from the repo yihui/yihui.org
discussions = get_discussions('yihui', 'yihui.org')
```

In Rob's script, I added a check to see if a discussion exists to create new
discussions only conditionally.

## Deal with character escaping in Github GraphQL

The core technique for posting comments to Github Discussions is
[GraphQL](https://docs.github.com/en/graphql/guides/using-the-graphql-api-for-discussions).
I was not familiar with it before but it looked straightforward to learn (at
least for some simple tasks like querying or updating discussions). Here is an
example of querying your rate limit:

``` r
gh::gh_gql('query {
  viewer {
    login
  }
  rateLimit {
    limit
    cost
    remaining
    resetAt
  }
}')
```

I hit an error for a few times in the beginning, and realized that some special
characters needed to be properly escaped. To avoid the backslash madness (i.e.,
thinking about how many backslashes I *really* need in `gsub('"', '\\\\"', x)`,
which hurts a lot), I found it much easier to just use **jsonlite**, e.g.,

``` r
str_json = function(x) {
  jsonlite::toJSON(x, auto_unbox = TRUE)
}
str_json('A title containing "double quotes"')
```

Then you pass the result to `gh::gh_gql()`. It's guaranteed to be valid GraphQL
syntax. For example, if you want to update the title of a discussion:

``` r
gh::gh_gql(sprintf('mutation {
  updateDiscussion(input: {discussionId: "%s", title: %s}) {
    discussion {
      id
    }
  }
}', id, str_json(title)))
```

## Giscus's strict matching

One thing that Utterances bothered me a lot was the fuzzy matching. [I sent a
pull request](https://github.com/utterance/utterances/pull/496) early last year
but it seemed to be ignored. The problem can lead to comments being loaded under
the wrong page. Giscus, as a successor of Utterances, provides a very clever
option to solve this problem: `data-strict="1"` (great job, [Sage
Abdullah](https://github.com/giscus/giscus/pull/621)!).

Github doesn't provide strict matching in searching discussions, but Giscus's
clever method has made it possible. In short, when using the strict method,
Giscus searches for a *hash* of the searching term instead of the term directly.
This has well solved my problem: I prefer using `pathname` of the page URL as
the searching term, but the `pathname` can be quite fuzzy if you search for it
directly. Searching for the SHA-1 hash of the `pathname` gives much more
accurate results, which almost guarantees one-to-one mapping between a web page
and a Github discussion. No more fuzziness.

To enable `data-strict`, I had to append the SHA-1 hashes of the URL `pathname`s
to Github discussions when creating them. The hash can be computed via
`digest::digest()`:

``` r
sha1 = function(x) {
  digest::digest(x, 'sha1', serialize = FALSE)
}
sprintf('<!-- sha1: %s -->', sha1(pathname))
```

Be sure not to avoid HTML escaping, as that would escape the `<!-- -->` comment.
If you use `whisker::whisker.render()` in Rob's R script, use `{{{ }}}` instead
of `{{ }}`.

## Other little things

I had a lot of comments written in Chinese. To re-post them to Github, I added a
header note in Chinese, and the test for (common) Chinese characters I used was:

``` r
has_chinese = function(x) {
  length(grep('[\u4E00-\u9FFF]', x)) > 0
}
```

To post with a different Github account (e.g., `giscus-bot` in my case), you can
use the `.token` argument of `gh::gh_gql()`, e.g.,

``` r
gh::gh_gql(..., .token = if (guest) 'ghp_xxxxxx')
```

When converting Disqus's HTML comments to Markdown via Pandoc, I strongly
recommend using the `gfm` output format with the option `--wrap=none`.

``` r
rmarkdown::pandoc_convert(
  input = msg_html, from = "html",
  output = msg_md <- tempfile(fileext = ".md"),
  to = "gfm", options = '--wrap=none'
)
```

In Rob's script, `to = "markdown"` is not a great choice (e.g., it results in a
lot of unnecessary escaping), and `gfm` is a much more natural choice for
Github. The option `--wrap=none` is also critical, because Pandoc will hard-wrap
long lines by default. Unfortunately, Github treats line breaks in Markdown as
hard breaks (i.e., `<br/>`). Without the `--wrap=none` option, you may see a lot
of unexpected line breaks in the comments.

## The `for` loop

Mitch used a `for` loop to post discussions one by one. The `for` loops seem to
have a bad reputation in the R community (e.g., `for` loops are ugly and slow),
but I think sometimes it's just rumor or misunderstanding. I'll save this for
another post in the future. Here I think the `for` loop is indispensable and
actually extremely valuable. Why? Because you never know what kind of error you
will run into in the loop (GraphQL syntax errors, Internet problems, and so on).
If you do run into an unexpected error, it's quite simple to resume the `for`
loop: you just start with the current step index instead of from the beginning
(usually `1`).

A quick and silly example to illustrate this:

``` r
# take the square root of each element of a list
elements = list(1, 2, 3, '4', 5, 6)
roots = numeric(length(elements))

for (i in seq_along(elements)) {
  roots[i] = sqrt(elements[[i]])
}
```

Suppose that you didn't know there was a character value in the data. When you
run the loop, you will hit an error. No panic. Now you fix the problem and check
the value of `i`. After you know `i` is currently `4`, you restart the loop from
4 instead of 1:

``` r
# convert character to numeric
elements[[i]] = as.numeric(elements[[i]])

# resume the loop
for (i in 4:length(elements)) {
  roots[i] = sqrt(elements[[i]])
}
```

This means you don't need to repeat the computation for `i = 1, 2, 3`. When the
computation is relatively expensive, this can be a big time-saver. I don't
remember how many times I have done this during the migration of the comments.

## The `while` loop with `browser()`

I can't praise Mitch enough for this:

``` r
while (!is.null((out <- gh::gh_gql(query))$errors)) {
  if (out$errors[[1]]$message == "was submitted too quickly") {
    Sys.sleep(60)
  } else {
    # Unknown error, debug interactively
    browser()
  }
}
```

It also gave me a chance to inspect the error and resume the loop after fixing
the unexpected problem.

## Summary

I'm happy that I can finally say bye to Disqus. It has served me for more than a
decade, for which I feel thankful, but I can't stand its heavy weight and
tracking any more.

Special thanks to Rob, Maëlle, and Mitch for the R code, which has saved me
countless hours! I'm sorry that I didn't share my full script in this post.
Although I believe Rob would grant me permission to modify and publish the code,
my code is just too messy and may be confusing, too. To be honest, it's not a
single script any more---I have a few `Untitled-N*` scripts in my RStudio
editor. You won't want to read them. For most people, I think Rob's original
script would suffice. My situation is just too complicated.

Knowing that I can manipulate (not for evil, of course) comments
programmatically via Github GraphQL was a strong motivation for me to move the
comments over to Github. I have already taken advantage of this to batch modify
the discussion titles (to make them clearer instead of only having a `pathname`
in them).

In the end, I'm particularly grateful to people who have posted comments on my
site over these 17 years (you can [view all of them on
Github](https://github.com/yihui/yihui.org/discussions) if interested). I have
noticed an obvious decline in the number of comments after social media became
popular, but I have already made enough long-time friends. Feel free to sign in
Giscus with your Github account to leave comments at the bottom from now on. See
you in the next 17 years!
