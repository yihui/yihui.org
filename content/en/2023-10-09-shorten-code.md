---
title: An Example of Shortening R Code
date: '2023-10-09'
slug: shorten-code
---

While I was answering [a
question](https://github.com/yihui/yihui.org/discussions/1458#discussioncomment-7186642)
from a user last week, I saw a piece of code that, in my opinion, could be
shortened. What it does is to set two chunk options, `message` and `warning`, to
`NA` or `FALSE` according the version of the **evaluate** package.

``` r
setHook(packageEvent("knitr", "onLoad"),
        function(...) {
          message_default <- FALSE
          installed <- installed.packages()
          if ("evaluate" %in% rownames(installed)) {
            evaluate_installed <- installed["evaluate",]
            evaluate_version <- evaluate_installed[["Version"]]
            evaluate_version <- package_version(evaluate_version)
            if (evaluate_version == package_version("0.19")) {
              message("evaluate version 0.19 is broken - there is no way to get log messages out")
            }
            if (evaluate_version >= package_version("0.20")) {
              message_default <- NA
            }
          }
          knitr::opts_chunk$set(message = message_default, warning = message_default)
          knitr::opts_hooks$set(message = function(options) {
            options$message = message_default 
            options$warning = message_default
            options
          })
        })
```

There is nothing wrong with the code. I'd actually call it professional. For
example, it carefully checks if the **evaluate** package is installed, finds its
version number, and sets options conditionally.

My own coding style is that I prefer using shorter variable names (single
letters if possible) inside a function if the function is relatively short. I
know most programmers would frown upon [single-letter
variables](https://javascript.info/ninja-code#one-letter-variables), but I do
not think they are that bad when the context is short---you can quickly learn
what `x` or `y` is. In a short function, you will not have many variables.

In the above example, variable names are self-explanatory, such as
`evaluate_installed`, `evaluate_version`, and `message_default`. I'm a little
slow to read these verbose names, though. Here is how I'd write the code:

``` r
setHook(
  packageEvent('knitr', 'onLoad'),
  function(...) {
    v = packageVersion('evaluate')
    if (v == '0.19') message(
      'evaluate v0.19 is broken - there is no way to get log messages out'
    )
    knitr::opts_hooks$set(message = function(options) {
      options$message = options$warning = if (v >= '0.20') NA else FALSE
      options
    })
  }
)
```

Inside the function, the key variable is the version number, which I named `v`.
I wonder if it is difficult for readers to remember that `v` denotes the version
number. It is the only variable inside this function.

However, the length of variable names is not the main factor that affects the
length of the code. The code was shortened based on some assumptions and
knowledge:

1.  There is no need to check if **evaluate** was installed, because it is a
    hard dependency of **knitr**. As long as **knitr** is installed and can be
    loaded, **evaluate** is guaranteed to be available.
2.  We can get the version number from `packageVersion()` instead of retrieving
    it from `installed.packages()`.
3.  A version number can be compared with a string directly if the string can be
    coerced to a version number (e.g., `v == '0.19'` or `v >= '0.20'`). There is
    no need to coerce it explicitly with `package_version()`. R will try to
    coerce the string automatically when it is compared to a version number.

If you want to further shorten the code, it is definitely possible, but I'm
afraid it will become "ninja code", e.g.,

``` r
    knitr::opts_hooks$set(message = function(o) {
      o$message = o$warning = v >= '0.20' && NA
      o
    })
```

The variable `options` was renamed to a single-letter `o` above, and the
expression `if (v >= '0.20') NA else FALSE` was changed to `v >= '0.20' && NA`.
The latter change may take you a few seconds to digest (hint: `FALSE && NA` is
`FALSE`, and `TRUE && NA` is `NA`).
