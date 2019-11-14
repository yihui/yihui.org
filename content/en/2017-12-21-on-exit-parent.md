---
title: Add An on.exit() Call to A Parent Function
date: '2017-12-21'
slug: on-exit-parent
---

Kevin wrote a clever `defer()` function in [a pull request](https://github.com/rstudio/reticulate/pull/107/files) two months ago, and it almost killed me when I first saw it.^[This PR is one of the greatest contributions in the history of R packages. I'll talk about it next year. Some of you may be sleepless because of it.] It looked so short, but I'm really bad at reasoning code that uses a combination of `substitute()`, `evalq()`, and `do.call()` with the `envir` argument, especially when `substitute()` is used three times, and there are three `envir` arguments.

![It killed me several times](https://slides.yihui.org/gif/latex-tweak.gif)

I was [once confused by `on.exit()`](/en/2017/05/a-note-on-on-exit/), so the `defer()` function was completely magic to me. Today I found that I needed something similar -- I wanted to insert an `on.exit()` call to a parent function. I know how `on.exit()` works in the current function and have used it many times before, but I have never tried to inject `on.exit()` to a parent function, so I looked at Kevin's code again, and simplified it a little bit (hopefully):

```r
f = function() {
  g()
  print('printing in f()')  # <- 2
}
g = function() {
  x = 'an exit call added to f() by g()'
  on.exit(print('exiting g()'), add = TRUE)  # <- 1
  do.call(
    on.exit, list(substitute(print(x)), add = TRUE),
    envir = parent.frame()  # the key is this envir
  )  # <- 3
}
f()
# [1] "exiting g()"
# [1] "printing in f()"
# [1] "an exit call added to f() by g()"
```

You can see that first `g()` exits, then the `print()` expression in `f()` is executed, and finally `f()` exits, with the exit call added by `g()` executed.

I was looking for this because I have several functions that should do the same thing on exit, and I don't want to repeat the code `on.exit()` in all these functions. It seems `do.call(on.exit, envir = parent.frame())` solved my problem.
