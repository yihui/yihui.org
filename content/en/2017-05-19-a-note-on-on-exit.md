---
title: A Note on on.exit()
date: '2017-05-19'
slug: a-note-on-on-exit
---

I have used `on.exit()` for several years, but it was not until the other day that I realized a very weird thing about it: you'd better follow the default positions of its arguments `expr` and `add`, i.e., the first argument has to be `expr` and the second has to be `add`.

```r
on.exit(expr = NULL, add = FALSE)
```

If you do `on.exit(add = TRUE, {...})`, weird things can happen. I discovered this [by accident](https://github.com/rstudio/bookdown/commit/1f77a3e4ab). I have never switched the positions of `expr` and `add` before, and I was surprised that `R CMD check` failed on [Travis](https://travis-ci.org/rstudio/bookdown/builds/233076842) with an error message that confused me in the beginning:

```
Error in on.exit(add = TRUE, if (file.exists(main)) { : 
  invalid 'add' argument
```

I was thinking why `add = TRUE` was considered invalid. Then I guessed perhaps the expression `if (file.exists(main)) {}` was treated as the actual value of `add`. So I switched to the normal order of arguments, and the error was gone.

I tested it a bit more and was totally confused, e.g., why was `1` printed twice below? I guess `TRUE` was not printed because `add` was treated as `expr`.

```r
f = function() {
  on.exit(add = print(TRUE), print(1))
}
f()
# [1] 1
# [1] 1
```

I don't have the capability to understand the [source code in C](https://github.com/wch/r-source/blob/a7356bf91b/src/main/builtin.c#L131-L186), and I'll leave it experts to explain the weird things I observed. For me, I'll just never move `add` before `expr` again.

BTW, I don't know the rationale for the default `add = FALSE` in `on.exit()`, but I have not used `add = FALSE` for a single time, so I feel `add = TRUE` might be a better default. When I want to do something on exit, I almost surely mean do it _in addition to_ the things that I assigned to `on.exit()` before, instead of cleaning up all previous tasks and only doing this one (`add = FALSE`).

> **Update on 2018/01/17**: Half a year later, [I was bitten by the same problem](https://github.com/yihui/tinytex/issues/12) again in the **tinytex** package. Never, ever, do `on.exit(add = TRUE, expr)`.
