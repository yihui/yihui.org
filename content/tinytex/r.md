---
title: The R package tinytex
subtitle: Helper Functions to Manage TinyTeX, and Compile LaTeX Documents
date: '2017-12-03'
---

The R package **tinytex** is currently not on CRAN yet. You have to install it from Github:

```r
devtools::install_github('yihui/tinytex')
```

The package mainly provides two sets of functions: functions to manage TinyTeX, and those that help compile LaTeX documents to PDF.

## Manage TinyTeX

The `tlmgr_*` family of functions calls the TeX Live utility `tlmgr` to manage TeX Live, e.g., install or update LaTeX packages. See `?tinytex::tlmgr` for the full documentation. The functions `tlmgr_search()`, `tlmgr_install()`, and `tlmgr_update()` may be the ones that you will most frequently use if you want to manage TeX Live by yourself.

## Compile LaTeX Documents

The most "lovely" feature of LaTeX is that you often have to compile a document multiple times to get the PDF, when you have cross-references (e.g., a bibliography or index).

A common reason for LaTeX to fail is missing LaTeX packages. Sometimes it is not straightforward to figure out which package is missing (certain packages may contain multiple `*.sty` or `*.cls` files). If you use pre-packaged TeX Live, this problem can be even worse. For example, on Debian/Ubuntu, LaTeX packages are grouped into collections and built to different Debian packages, so even only if one LaTeX package is missing, you have to install a big Debian package, which contains the package you need and possibly many other packages that you don't need.

The function `latexmk()` in **tinytex** tries to solve these two problems automatically. With a chosen LaTeX engine (`pdflatex`, `xelatex`, or `lualatex`), it compiles a LaTeX document three times by default, and also tries to install missing packages by default. The missing packages are detected from the LaTeX log via the function `tinytex::parse_packages()`.

You can change the number of times to compile the document, and disable the automatic installation of missing packages. See `?tinytex::latexmk` for details.

The three function `pdflatex()`, `xelatex()`, and `lualatex()` are wrapper functions based on `latexmk()`. For example, `pdflatex()` is basically `latexmk(engine = 'pdflatex', emulation = TRUE)`.

The implementation is clumsy. Don't read the source code. I may not improve it in the future. I have wasted enough time on LaTeX, and a clumsy implementation should already save me a lot of time. Perfect is the enemy of good.
