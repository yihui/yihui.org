---
title: The Most Unexpected Discovery of An R Language Feature
subtitle: ... in a most unusual way
date: '2017-12-16'
slug: r-dot-dot-dot
---

Two months ago while I was trying to upgrade the highlight.js library in the **rmarkdown** package ([PR #1178](https://github.com/rstudio/rmarkdown/pull/1178)), I read the source code of the R syntax highlighter in our fork of highlight.js (created by Joe Cheng, our CTO), and [these lines](https://github.com/rstudio/highlight.js/blob/0710243a8e/src/languages/r.js#L60-L66) caught my attention:

```js
{
  // ..1, ..2, etc.
  className: 'keyword',
  begin: "\\.\\.\\d+(?![\\w.])",
  end: hljs.IMMEDIATE_RE,
  relevance: 10
}
```

I didn't know what "..1, ..2, etc" meant when I first saw it, and wondered why they were keywords. Later I wanted to check what the reserved keywords were in R, so I took a look at the help page `?reserved`, and noticed this sentence:

> `...` and `..1`, `..2` etc, which are used to refer to arguments passed down from a calling function.

I never knew that. Basically `..N` is like `$N` in shell scripts (and `...` is like `$@`), and we can refer to the N-th argument in the `...` argument, e.g.,

```r
f = function(...) {
  list(..1, ..2, ..3)
}
f(9, 1, 2, 1, 4)
```

[As I wrote last week](/en/2017/12/how-i-learned-r/), I never finished reading any R tutorials, books, or manuals when I learned R, so I missed this `..N` syntax in the "Introduction to R" manual, and eventually discovered it in a most unusual way (in a JavaScript syntax highlighter).

Again, [I don't know base R](/en/2017/11/matrix-indexing/). It still constantly surprises me after 13 years.
