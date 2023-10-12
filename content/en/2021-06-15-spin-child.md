---
title: 'One Little Thing: Spin a Child Script via `knitr::spin_child()`'
date: '2021-06-15'
slug: spin-child
---

You probably know that you can include a child document in a knitr document
(such as R Markdown) via the chunk option `child`. If you do not, you may see
[Section 16.4 of the R Markdown
Cookbook](https://bookdown.org/yihui/rmarkdown-cookbook/child-document.html).

You may also know that you can convert an R script to R Markdown via the
function `knitr::spin()`. Again, if you do not, you may read [Section
3.3](https://bookdown.org/yihui/rmarkdown-cookbook/spin.html) of the book.

Then the question is, when you render an R Markdown document, can you spin a
child script inside that document? [Tom asked this
question](https://stackoverflow.com/q/67571162/559676) on Stack Overflow last
month, and the answer is "Yes." There is a function `knitr::spin_child()`
designed exactly for this purpose. When you call this function inside an R code
chunk, it spins an R script to R Markdown, and includes the R Markdown document
as a child document of the main document. For example, if you have an R script
`test.R`:

``` r
#' # This is a child document

1 + 1
```

You can convert it to a child R Markdown document inside the main document:

```` md
---
title: The main document
---

```{r, echo=FALSE}
knitr::spin_child('test.R')
```
````

When you knit the main document above, you are essentially knitting this
document below:

```` md
---
title: The main document
---

# This is a child document

```{r}
1 + 1
```
````

In conclusion, `knitr::spin_child()` enables you to write *a part of your
report* with an R script, if you do not want to write the whole report in an R
script.

