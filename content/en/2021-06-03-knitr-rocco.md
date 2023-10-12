---
title: 'One Little Thing: The Docco Style with `knitr::rocco()`'
subtitle: A two-column HTML layout to show prose and code side by side
date: '2021-06-03'
slug: knitr-rocco
---

Miles McBain learned the Docco style in **knitr** by chance when he meant to
[ask about
`getParseData()`](https://twitter.com/MilesMcBain/status/1117769453691752448).
This HTML style is lesser known but one of my personal favorite styles. I have
used it in a few package vignettes such as [the **highr**
vignette](https://cran.r-project.org/web/packages/highr/vignettes/highr-internals.html).
The style is based on [Docco](https://github.com/jashkenas/docco), and the code
was mainly [contributed by Weicheng Zhu in
2013](https://github.com/yihui/knitr/pull/577). To render an R Markdown document
to this style, you may call:

``` r
knitr::rocco('test.Rmd')
```

Note that the R Markdown document should be [an old-fashioned
one](https://rmarkdown.rstudio.com/authoring_migrating_from_v1.html#continuing-to-use-v1),
i.e., to be rendered via the **markdown** package instead of Pandoc, which means
the Knit button in RStudio will not work.

Features of this Docco style include ([see a
demo](https://cran.r-project.org/web/packages/knitr/vignettes/docco-classic.html)):

-   The two-column layout, with prose on the left and code on the right.

-   The widths of the two columns can be adjusted by dragging the vertical
    middle border to the left or right.

-   You may press the key `t` to toggle the visibility of the two columns, so
    you may read prose only, code only, or both.

If you want to build a package vignette with this style, you can add the
following vignette metadata to your Rmd file to specify the vignette engine to
be `knitr::docco_classic`:

``` html
<!--
%\VignetteEngine{knitr::docco_classic}
%\VignetteIndexEntry{Your vignette title}
-->
```
