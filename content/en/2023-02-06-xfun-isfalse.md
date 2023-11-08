---
title: Deprecating `xfun::isFALSE()`
date: '2023-02-06'
slug: xfun-isfalse
---

Update on 2023-09-07

:   You probably came to this blog post due to an error related to
    `xfun::isFALSE()`, and I strongly recommend that you [update all your R
    packages](/en/2017/05/when-in-doubt-upgrade/):
    `update.packages(ask = FALSE, checkBuilt = TRUE)` That's because the error
    is most likely to be from one of your outdated packages.

Base R has had the function `isTRUE()` for many years, and I had wished for a
few years that there were an `isFALSE()`, too. I had used `identical(x, FALSE)`
many times before I added it to the first version of the **xfun** package as the
function `isFALSE()`. The **xfun** package was first released to CRAN on
2018-01-22.

Three months later (2018-04-23), R 3.5.0 was released, which included a function
named `isFALSE()` in the base package. Apparently another mind was thinking like
me (which turned out to be Martin Mächler).

Ah...

Last year Martin sent [a pull request](https://github.com/yihui/xfun/pull/66) to
remove `isFALSE()` from **xfun**, which was what I wished to do for a long time,
but I couldn't just remove it, because it was used in quite a few of packages
that I maintain. Recently I have removed the usage in them and checked all
reverse dependencies of **xfun**. It seems no other packages would be affected
if I deprecate `xfun::isFALSE()`, which is good news. I'm not sure if it is used
in non-package code by anyone, though.

Anyway, I'm announcing the deprecation of `xfun::isFALSE()` today (I hope it is
the first and also the last time that you have heard of this function). For now,
it will throw an error during `R CMD check` if you still use it in a package. In
future, it will simply throw an error if `base::isFALSE()` exists. In the end,
I'll just remove it from **xfun**, and you should use `isFALSE()` in base R
instead. I wish it won't have much impact on your code. I apologize if it does.

Had I waited for three more months, I wouldn't have this trouble. Timing can be
funny sometimes.
