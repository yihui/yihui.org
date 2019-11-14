---
title: Double Negatives
date: '2018-08-08'
slug: double-negatives
---

Every time I use the function `stopifnot(...)`, I have to stop and think about it: should the conditions in `...` return `TRUE` or `FALSE`? Then I have to think in plain English. Hmm, what does "stop if not false" mean? Do I actually want to stop or not if the condition is true? All kinds of circles emerging in my mind...

![How to tie a tie](https://slides.yihui.org/gif/how-to-tie-a-tie.jpg)

I have wished many times the function name were `stopif()` instead. Reasoning about negations is often trickier than affirmatives. Compare these examples:

```r
stopifnot(x == 1)
stopifnot(x != 1)

stopif(x == 1)
stopif(x != 1)
```

To me, the `stopif()` versions are much clearer (`stopif(x)` means `if (x) stop()`, and `stopifnot(x)` means `if (!x) stop()`). That was one of the minor reasons why I created [the **testit** package](https://github.com/yihui/testit) and wrote the `assert()` function. When you `assert()`, you must assert something is true.

```r
library(testit)

assert(1.0 == 1)

assert('1.0 is equal to 1', {
  (1.0 == 1)
})
```

This morning I opened the help page `?installed.packages`, and saw the argument `noCache = FALSE`. It was not the first time I had read this help page, but...

`noCache = FALSE`? Excuse me. I'm slow. Just give me five seconds to decipher it again.

![How to find the key](https://slides.yihui.org/gif/lost-key.gif)

Strunk and White actually recommended in _The Elements of Style_ that "we put statements in positive form", which I believe also applies to program code.

Well, if you look at `?download.file`, there is an argument `cacheOK = TRUE`. Sigh... Why the name `cacheOK`? Why not just `cache = TRUE`? `cacheOK = TRUE` reads like "the statement 'it is okay to use cache' is okay". Double affirmatives this time?

Once again: naming, is, hard.
