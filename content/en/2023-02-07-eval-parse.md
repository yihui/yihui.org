---
title: You Should Rarely Need `eval(parse())`
date: '2023-02-07'
slug: eval-parse
---

Many programming languages have a function to evaluate a string as code or an
expression, e.g., `eval()` in R. Once you learn it, it becomes tempting to abuse
it. Instead of writing code naturally and directly, you start to think about
*writing code that constructs code* to be evaluated. For example, instead of
writing `1 + 1`, you may write a monster like this:

``` r
eval(parse(text = paste(c('1', '1'), collapse = '+')))
```

This is obviously just a silly example, but I have seen people abuse `eval()` in
R many times in the past, often due to the lack of understanding of a function.
One example is [a recent Stack Overflow
question](https://stackoverflow.com/q/74564027/559676). The OP wants to include
a series of figures via `knitr::include_graphics()`, but didn't realize that
this function can just take a vector of figure paths, and then the OP wrote code
to construct code consisting of a series of `knitr::include_graphics()` calls.

This way of thinking not only often leads to clumsy code, but also brings
security risks when you, as a developer, allow users to input any string to be
evaluated.

Of course, `eval(parse())` has its great value and I'm not saying it should be
banned. For example, the whole **knitr** package is built on top of it (for
evaluating code chunks as code strings). However, I feel it's almost surely the
wrong way to go in your daily programming job. There should be a better way.
