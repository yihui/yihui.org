---
title: One Fewer Dependency of knitr
subtitle: It will no longer depend on the stringr package
date: '2023-01-05'
slug: knitr-stringr
---

Just before the 2022 Christmas, we finally fulfilled [a **knitr** request from
2018](https://github.com/yihui/knitr/issues/1549) by Hugh Parsonage (thanks,
Hugh). That is, remove the **stringr** dependency in **knitr**. The original
motivation was to make it faster to install **knitr**, since **stringr** depends
on **stringi**, which is a relatively heavy dependency and can take quite some
time to compile. This motivation is no longer that strong because it has become
easier to install prebuilt binaries of **stringi** later (e.g., via the Posit
Package Manager).

Anyway, I'm always in favor of fewer dependencies if possible, especially for
infrastructure packages that are widely used. Last year when I saw [Deepayan's
work](https://blog.r-project.org/2022/04/08/enhancements-to-html-documentation/#examples-and-demos)
in base R using **knitr** to run examples and demos on R help pages, I was a
little concerned that **knitr** might be too heavy for this task.

It turned out that **knitr**'s dependency on **stringr** was not too tight. The
functions were mostly straightforward to be replaced by base R functions like
`gsub()`, `substr()`, `gregexpr()`, and `regmatches()`, so we have done that.

With **stringr** gone, it means **knitr** has also removed seven indirect
dependencies (see the dependency graphs below). Only four hard dependencies are
left. The dependency on **highr** could be removed, too, because it is used only
for syntax highlighting in Rnw documents, but it's quite lightweight, and I'm
not sure if it's worth bothering Rnw users and asking them to install **highr**
explicitly (probably not).

``` text
knitr (<= v1.41)
  |> evaluate 
  |> highr 
  |> stringr 
    |> cli 
    |> glue 
    |> lifecycle 
    |> magrittr 
    |> rlang 
    |> stringi 
    |> vctrs 
  |> yaml 
  |> xfun 
```

``` text
knitr (> v1.41)
  |> evaluate 
  |> highr 
  |> yaml 
  |> xfun 
```

Now one thing left for us to figure out is whether this will affect the
performance much. I feel the impact should be trivial, because the most
time-consuming part in knitting is often evaluating the code chunks, rather than
parsing the document. Anyway, we will do the benchmarking next, and update this
post with the results accordingly. In the meantime, please feel free to try it
out by yourself and let us know if you notice any performance issues:

``` r
install.packages('knitr', repos = c(
  yihui = 'https://yihui.r-universe.dev',
  CRAN = 'https://cloud.r-project.org'
))
```

Thanks!

Update on 2023-01-19

:   We (mainly [\@cderv](https://github.com/cderv)) have finished benchmarking
    and you can [read a report
    here](https://github.com/cderv/knitr/blob/bench-stringr-replace/inst/benchmark/stringr-replace.md).
    Some of our base R functions are faster than **stringr** equivalents, and
    some are slower. Overall I don't have any concerns on the slower functions,
    because 1) some of them are used in processing `.Rnw` documents only, and 2)
    the absolute time of one function call is often less than one millisecond,
    which shouldn't be noticeable even if it is 3 or 4 times slower.
