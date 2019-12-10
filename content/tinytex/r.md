---
title: The R package tinytex
subtitle: Helper Functions to Manage TinyTeX, and Compile LaTeX Documents
date: '2017-12-03'
---

You can install the **tinytex** package from either CRAN or Github:

```r
# CRAN version
install.packages('tinytex')

# or the development version on Github
devtools::install_github('yihui/tinytex')
```

The package mainly provides two sets of functions: functions to manage TinyTeX, and those that help compile LaTeX documents to PDF.

## Manage TinyTeX

The `tlmgr_*` family of functions calls the TeX Live utility `tlmgr` to manage TeX Live, e.g., install or update LaTeX packages. See `?tinytex::tlmgr` for the full documentation. The functions `tlmgr_search()`, `tlmgr_install()`, and `tlmgr_update()` may be the ones that you will most frequently use if you want to manage TeX Live by yourself.

## Compile LaTeX Documents

The "loveliest" feature of LaTeX is that you often have to compile a document multiple times to get the PDF, when you have cross-references (e.g., a bibliography or index).

A common reason for LaTeX to fail is missing LaTeX packages. Sometimes it is not straightforward to figure out which package is missing (certain packages may contain multiple `*.sty` or `*.cls` files). If you use pre-packaged TeX Live, this problem can be even worse. For example, on Debian/Ubuntu, LaTeX packages are grouped into collections and built to different Debian packages, so even only if one LaTeX package is missing, you have to install a big Debian package, which contains the package you need and possibly many other packages that you don't need.

The function `latexmk()` in **tinytex** tries to solve these two problems automatically. With a chosen LaTeX engine (`pdflatex`, `xelatex`, or `lualatex`), it compiles a LaTeX document three times by default, and also tries to install missing packages by default. The missing packages are detected from the LaTeX log via the function `tinytex::parse_packages()`.

You can change the maximum number of times to compile the document, and disable the automatic installation of missing packages. See `?tinytex::latexmk` for details.

The three function `pdflatex()`, `xelatex()`, and `lualatex()` are wrapper functions based on `latexmk()`. For example, `pdflatex()` is basically `latexmk(engine = 'pdflatex', emulation = TRUE)`.

The implementation is clumsy. Don't read the source code. I may not improve it in the future. I have wasted enough time on LaTeX, and a clumsy implementation should already save me a lot of time. Perfect is the enemy of good.

## Debugging

If an error occurs when compiling a LaTeX to PDF, and the error message is not clear, you may try two things. 
First, [update all your R and LaTeX packages](/en/2017/05/when-in-doubt-upgrade/):

```r
update.packages(ask = FALSE, checkBuilt = TRUE)  # update R packages
tinytex::tlmgr_update()  # update LaTeX packages
```

If you see an error message like "tlmgr: Remote repository is newer than local (2018 < 2019)" when updating LaTeX packages, it means your TinyTeX is too old now, and you need to reinstall it for a newer version:

```r
tinytex::reinstall_tinytex()
```

If updating packages does not solve the problem, set the option in R:

```r
options(tinytex.verbose = TRUE)
```

before you compile the document. If you are using R Markdown and the `Knit` button in RStudio, you should set the option in a code chunk in the R Markdown document.

````md
```{r, include=FALSE}
options(tinytex.verbose = TRUE)
```
````

You can, and perhaps should, remove this option after you finish debugging (to silence LaTeX, because you no longer need to read the full log).

## Other LaTeX distributions

The **tinytex** package is not tied to TinyTeX, although (unsurprisingly) it should work best with TinyTeX. Specifically:

1. The feature of automatically compiling a LaTeX document for a number of times until all cross-references are resolved is available to any LaTeX distributions, e.g., you can use MiKTeX on Windows if you want. 

1. The feature of automatically installing missing LaTeX packages requires the LaTeX distribution to be TeX Live (remember, TinyTeX is a custom version of TeX Live, so TinyTeX also works). It also requires `tlmgr install` to be able to install packages. If you use a copy of TeX Live or TinyTeX installed by your system admin, and you are not given the privileges to modify it, this feature won't work for you. If you installed TinyTeX on your personal computer, chances are it will work. This feature is not available to MiKTeX users, but you won't need it, either, because MiKTeX itself can automatically install missing packages, too.
