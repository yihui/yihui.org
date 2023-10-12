---
title: '`rmarkdown::output_format_dependency()`: An Easier Way to Customize Output Formats for R Markdown'
date: '2023-08-28'
slug: output-format-dependency
---

Traditionally there are two main ways to customize R Markdown output formats:
one is to use the options of an existing output format, e.g., set `toc: true`
for `html_document`; the other is to define [a new output format
function](https://bookdown.org/yihui/rmarkdown/new-formats.html) based on
`rmarkdown::output_format()`, which usually requires you to develop an R package
because that's the best place to host the function.

The first way can be limited---you can only customize the things that are given
to you. The second way gives you complete freedom but is also too advanced, and
not everyone wants to develop an R package only for the purpose of a customize R
Markdown output format. The two ways are two extremes. Is there a compromise?

Yes, Atusy [has made it
possible](https://github.com/rstudio/rmarkdown/pull/2462) in **rmarkdown** 2.24.
With the new function `rmarkdown::output_format_dependency()`, you can enjoy the
(almost) full freedom of customization without having to develop an R package.
He [has kindly written a blog
post](https://blog.atusy.net/2023/08/28/rmarkdown-output-format-dependency/)
about it, which I'd strongly recommend to R Markdown users who desire deeper
customizability. Thanks, Atusy!
