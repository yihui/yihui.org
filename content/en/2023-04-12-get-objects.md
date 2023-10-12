---
title: Do You Have to `get()` Objects?
date: '2023-04-12'
slug: get-objects
---

Last month I saw [an interesting
question](https://stackoverflow.com/q/75819997/559676) on Stack Overflow, in
which the OP wanted to print a series of data frames as tables, and tried double
loops, which did not work:

``` r
for (i in c("CP", "BK", "IT", "WP")) {
  for (j in c("DD", "SI")) {
    data <- get(paste0(i, "_", j, "_comb1"))
    print(data)
  }
}
```

There are two reasons why this won't work:

1.  `print()` doesn't create tables. You must create a table either explicitly
    (e.g., via `knitr::kable()`) or inexplicitly (e.g., via [the `df_print`
    option](https://bookdown.org/yihui/rmarkdown/html-document.html#data-frame-printing)
    in R Markdown).
2.  Tables must be printed in [top-level
    expressions](/en/2017/06/top-level-r-expressions/). They won't be generated
    inside loops by default.

I posted an answer there to create top-level expressions to print the data
frames, base on the chunk option `code`. However, I think there must be a deeper
problem, and I might have provided a right answer to a wrong question. That is,
if you have to `get()` a series of objects by their names, and the names *share
a pattern* (e.g., `*_*_comb1` in the original question), perhaps these objects
shouldn't have existed in the first place!

If they have existed, that means the author must have created them in a way like
this:

``` r
CP_DD_comb1 <- ...
BK_DD_comb1 <- ...
IT_DD_comb1 <- ...
WP_DD_comb1 <- ...
CP_SI_comb1 <- ...
BK_SI_comb1 <- ...
IT_SI_comb1 <- ...
WP_SI_comb1 <- ...
```

The code in `...` must also have a pattern, like
`subset(data, X1 == "CP" & X2 == "DD")`, which is likely to violate the DRY
principle (Don't Repeat Yourself).

When you find yourself create a series of objects with a pattern in their names,
I'd say you are probably doing it wrong. Instead of creating these global
objects, you really should create one object only---a list that contains these
objects. For example, if you want to partition the `mtcars` data by the `cyl`
and `am` variables, you shouldn't create objects like `cyl_8_am_0`. Instead, you
create a list:

``` r
mtcars_list <- split(mtcars, ~ cyl + am)
```

Then if you want to create a table for each combination of `cyl` and `am`, you
simply write one line of code:

``` r
knitr::kable(mtcars_list)
```

That's much more elegant and simpler than first creating several global objects
(which can pollute the global environment), then retrieving them via `get()`
(which can bite you if you are not careful enough about its `envir`, `mode`, and
`inherits` arguments), and finally printing them one by one.

I'd argue that you should rarely need to use `get()` in your daily code, just
like [you should rarely need `eval()`](/en/2023/02/eval-parse/). If you have to
resort to `get()`, there is likely to be a deeper problem and you may need to
pause and rethink.
