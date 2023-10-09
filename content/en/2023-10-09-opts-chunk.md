---
title: Two Hidden Ways to Set Global Chunk Options for knitr
date: '2023-10-09'
slug: opts-chunk
---

Sometimes you may not like the default values of **knitr**'s [chunk
options](/knitr/options/), and you know how to change them (i.e.,
`knitr::opts_chunk$set()`), but it can be tedious to do it for every single
document. How can we change default chunk options globally in a system?

One approach is to set these options in your `.Rprofile`, if you know what this
file is and how to edit it. However, this approach has a drawback---it will load
**knitr** for any R session, even if you do not need to use **knitr** in a
certain session. To avoid that, you could set a package hook for **knitr** in
`.Rprofile`, e.g.,

``` r
setHook(packageEvent('knitr', 'onLoad'), function(...) {
  knitr::opts_chunk$set(message = FALSE, warning = FALSE)
})
```

With this hook, **knitr** will not be loaded immediately when R starts up. The
change of chunk options will occur only when **knitr** is being loaded (e.g.,
when you compile a document).

If you find the above approach too technical to understand, there are two other
ways to modify chunk options globally:

1.  You can set global R options of the form `options(knitr.chunk.NAME = VALUE)`
    in `.Rprofile`, where `NAME` is the chunk option name, and `VALUE` is the
    desired value. For example,

    ``` r
    options(knitr.chunk.message = FALSE, knitr.chunk.warning = FALSE)
    ```

    These options will be recognized by **knitr**, which will run
    `opts_chunk$set()` for you internally.

2.  Another way is for people who prefer environment variables over `.Rprofile`.
    You can set the environment variable `R_KNITR_OPTIONS` to a comma-separated
    value like this:

    ``` sh
    R_KNITR_OPTIONS="knitr.chunk.message=FALSE,knitr.chunk.warning=FALSE"
    ```

    Basically this value will be passed to `options()` and go to the previous
    way.

These two methods have existed for years but never been documented, because I
was not sure if they could be useful to anyone else (I use them occasionally).
Recently I seem to have seen [a use
case](https://github.com/yihui/yihui.org/discussions/1458#discussioncomment-7231836),
so I'm writing them down here.
