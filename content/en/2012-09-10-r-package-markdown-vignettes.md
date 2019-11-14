---
title: R Package Vignettes with Markdown
date: '2012-09-10'
slug: r-package-markdown-vignettes
---

> Note: since R 3.0.0, you can build Markdown vignettes naturally; see https://yihui.org/knitr/demo/vignette/ for details.

What is the best resource to learn an R package? Many R users know the almighty question mark `?` in R. For example, type `?lm` and you will see the documentation of the function `lm`. If you know nothing about a package, you can take a look at the HTML help by

```r 
help.start()
```

where you can find the complete list of documentation by clicking the link `Packages`. The individual help pages are often boring and difficult to read, because you cannot see the whole picture of the elephant. That is where package vignettes can help a lot. A package vignette is like a short paper (in fact some are real journal papers), which gives you an overview of this package, and sometimes with examples. Package vignettes are not a required component of an R package, so you may not find them in all packages. For those packages which contain vignettes, you can find them by `browseVignettes()`, e.g. for the **knitr** package

```r 
browseVignettes(package = 'knitr')
# or go to
system.file('doc', package = 'knitr')
```

You can also see links to vignettes from `help.start()`: click `Packages` and go to the package documentation, or

```r 
help.start()
browseURL(paste0('http://127.0.0.1:', tools:::httpdPort(),
          '/library/knitr/doc/index.html'))
```

Most vignettes are written in LaTeX/Sweave since that is the official approach (see [Writing R Extensions](http://cran.r-project.org/doc/manuals/R-exts.html)). In the past [Google Summer of Code](http://www.google-melange.com/gsoc/project/google/gsoc2012/cloud_wei/16001), Taiyun Wei explored a few interesting directions of the **knitr** package, and one of them was to build HTML vignettes for R packages from Markdown, which is much easier to write than LaTeX.

For package authors who are interested, Taiyun's [**corrplot** package](https://github.com/taiyun/corrplot/) (on Github) can serve as an example. The markdown vignette is [vignettes/corrplot-intro.Rmd](https://github.com/taiyun/corrplot/blob/master/vignettes/corrplot-intro.Rmd). When you run `R CMD build corrplot`, `corrplot-intro.Rmd` will be converted to `corrplot-intro.html`, which you can view in `help.start()` after `R CMD INSTALL corrplot_*.tar.gz`.

Once you have this HTML vignette, you can also publish it elsewhere. For example, either [RPubs.com](http://rpubs.com) or [GitHub pages](http://pages.github.com/) to gain more publicity (see [an example](http://rpubs.com/mcmurdie/plot_heatmap) of the **phyloseq** package). It is important to let users be aware of package vignettes, and a web link is apparently easier to tell other people than `browseVignettes()` (I felt very uncomfortable when I was writing the first half of this post because the vignettes are hidden so deep, hence so hard to describe).

So why not start building an HTML vignette for your package with R Markdown now? Think about animations, interactive content (e.g. googleVis), MathJax equations and other exciting web stuff.
