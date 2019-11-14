---
title: 'Help Needed: Add More Tests in My R Packages'
date: '2018-07-27'
slug: add-more-tests
---

The three components of a software package are equally important in my eyes: source code, documentation, and tests. Usually I start working on the source code like most other developers, and I'll finish the R package documentation at the same time. The package documentation is often too dry and not enough for users to learn a package systematically, because the topics in the package documentation are not arranged in a logical manner (only listed alphabetically). So I have also been trying to write books. These things have consumed me a considerable amount of time, so I have been leaving tests behind, even though I hate doing so.

Now I have identifed three packages that seriously lack testing (I have also opened Github issues for them):

- **xfun**: https://github.com/yihui/xfun/issues/5

- **blogdown**: https://github.com/rstudio/blogdown/issues/318

- **tinytex**: https://github.com/yihui/tinytex/issues/59

I hope someone could help me with them. Personally I use a tiny package named **testit** for testing: https://github.com/yihui/testit (I guess most other people use **testthat** but I don't find its sophistication appealing to me). If you use RStudio, you may run the tests via `Ctrl/Cmd + Shift + T`, which essentially runs R scripts under the `tests/` directory.

A test with **testit** is typically in this format:

```r
library(testit)
assert('What a function is expected to do', {
  (FUN(args, ...)) %==% EXPECTED_OUTPUT)
})
```

For example:

```r
assert('as.character() converts values to character', {
  (as.character(123) %==% '123')
  
  (as.character(1:3) %==% c('1', '2', '3'))
})
```

Note that:

1. You can write multiple expressions inside the curly braces `{ }`. If an expression is inside a pair of parentheses `()`, it is expected to return a logical vector of `TRUE`'s (cannot be of length zero or contain `NA`), otherwise `assert()` will signal an error to indicate the test failure. Expressions not in `()` are evaluated as normal R code and their values are not checked.

1. The infix operator `%==%` is a shorthand of `identical()`, i.e., `x %==% y` is the same as `identical(x, y)`. You might use `==` for less strict comparisons, e.g., `1:3 == c(1, 2, 3)` will be `TRUE` (of length 3), but `1:3 %==% c(1, 2, 3)` is `FALSE` (because integer is not identical to double).

Of course, many of other packages that I maintain also lack sufficient testing (e.g., **knitr**). Please feel free to work on any packages you like. I believe as you work on these tests, you will understand many internal functions much better, because you have to clearly know what each function is supposed to do! Sometimes you may have to split a big function into smaller ones, and test these small parts separately. Please feel free to refactor/split whenever you think is necessary. I'll be waiting for your pull requests! Thanks!

![Let's test it!](https://slides.yihui.org/gif/demo-fail.gif)
