---
title: Rd2roxygen
subtitle: Convert Rd to roxygen documentation
author: "Yihui Xie"
date: '2019-11-14'
slug: Rd2roxygen
show_toc: true
githubEditURL: https://github.com/yihui/Rd2roxygen/edit/master/vignettes/Rd2roxygen.Rmd
output:
  knitr:::html_vignette:
    toc: yes
vignette: >
  %\VignetteEngine{knitr::rmarkdown}
  %\VignetteIndexEntry{Rd2roxygen: Convert Rd to roxygen documentation and utilities to enhance R documentation}
---



The package [**Rd2roxygen**](https://github.com/yihui/Rd2roxygen) helps R package developers who
used to write R documentation in the raw LaTeX-like commands but now want to
switch their documentation to [**roxygen2**](https://cran.r-project.org/package=roxygen2), which is a
convenient tool for developers, since we can write documentation as inline
comments, e.g.


```r
## the source code of the function `parse_and_save`
ex.file = system.file("examples", "parse_and_save.R", package = "Rd2roxygen")
cat(readLines(ex.file), sep = "\n")
```

```
#' Parse the input Rd file and save the roxygen documentation into a file.
#'
#' @param path the path of the Rd file
#' @param file the path to save the roxygen documentation
#' @param usage logical: whether to include the usage section in the output
#' @return a character vector if \code{file} is not specified, or write the
#'   vector into a file
#' @export
#' @author Hadley Wickham; modified by Yihui Xie <\url{http://yihui.org}>
parse_and_save <- function(path, file, usage = FALSE) {
  parsed <- parse_file(path)
  output <- create_roxygen(parsed, usage = usage)
  if (missing(file)) output else
	cat(paste(output, collapse = "\n"), file = file)
}
```

With **roxygen2** (typically using `roxygenize()`), we can create the real
Rd file from the above source code like this:


```r
rd.file = system.file("examples", "parse_and_save.Rd", package = "Rd2roxygen")
cat(readLines(rd.file), sep = "\n")
```

```
\name{parse_and_save}
\alias{parse_and_save}
\title{Parse the input Rd file and save the roxygen documentation into a file.}
\usage{parse_and_save(path, file, usage=FALSE)}
\description{Parse the input Rd file and save the roxygen documentation into a file.}
\value{a character vector if \code{file} is not specified, or write the vector
into a file}
\author{Hadley Wickham; modified by Yihui Xie <\url{http://yihui.org}>}
\arguments{\item{path}{the path of the Rd file}
\item{file}{the path to save the roxygen documentation}
\item{usage}{logical: whether to include the usage section in the output}}
```

The **Rd2roxygen** package goes exactly in the _opposite_ way -- it parses
the Rd files and turns them back to roxygen comments. We can either do this
job on single Rd files, or just convert the whole package. The latter might
be more useful for developers who are considering the transition from Rd to
roxygen.

# Convert a whole package

The function `Rd2roxygen::Rd2roxygen()` can take a path of a source package, parse all
the Rd files under the `man` directory, and write the roxygen comments right
above the source code of the functions under the `R` directory. See
`?Rd2roxygen` for an example.


```r
Rd2roxygen::Rd2roxygen("path/to/source/pkg")
## there must be 'man' and 'R' directories under this path
```

Note the path to the package should not be `.`. You are recommended to call this function in the directory that contains the source package.

# Parse a single Rd file

We can parse a single Rd file and create the roxygen comments as well with
`parse_file()` and `create_roxygen()`, e.g.


```r
library(Rd2roxygen)
## we can specify the roxygen comments prefix (#' by default)
options(roxygen.comment = "##' ")
str(info <- parse_file(rd.file))
```

```
List of 9
 $ title   : chr "Parse the input Rd file and save the roxygen documentation into a file."
 $ usage   : chr "parse_and_save(path, file, usage=FALSE)"
 $ desc    : chr "Parse the input Rd file and save the roxygen documentation into a file."
 $ section : chr(0) 
 $ value   : chr "a character vector if \\code{file} is not specified, or write the vector\ninto a file"
 $ author  : chr "Hadley Wickham; modified by Yihui Xie <\\url{http://yihui.org}>"
 $ name    : chr "parse_and_save"
 $ keywords: list()
 $ params  : chr [1:3] "path the path of the Rd file" "file the path to save the roxygen documentation" "usage logical: whether to include the usage section in the output"
```

```r
# parse_and_save() combines these two steps
cat(create_roxygen(info), sep = "\n")
```

```
##' Parse the input Rd file and save the roxygen documentation into a file.
##' 
##' Parse the input Rd file and save the roxygen documentation into a file.
##' 
##' 
##' @param path the path of the Rd file
##' @param file the path to save the roxygen documentation
##' @param usage logical: whether to include the usage section in the output
##' @return a character vector if \code{file} is not specified, or write the
##' vector into a file
##' @author Hadley Wickham; modified by Yihui Xie <\url{http://yihui.org}>
```

# Roxygenize and build a package

This package also provides a tool `roxygen_and_build()` (or in short `rab()`)
to help us build the package.


```r
rab(pkg, build = TRUE, build.opts = "--no-manual", install = FALSE, 
  install.opts = if (build) "" else "--with-keep.source", check = FALSE, 
  check.opts = "--as-cran --no-manual", remove.check = TRUE, 
  reformat = TRUE, before = NULL, ...)
```

The main feature of `rab()` is the option to "reformat" the code in the
usage and example sections. If we specify `reformat = TRUE` in `rab()`, the
code will be reformated like this:


```r
## original code
rab=function(pkg,build=TRUE,install=FALSE,
check=FALSE,check.opts='',remove.check=TRUE,reformat=TRUE,...){}
```

```r
## the reformatted code; note the spaces and indent
rab = function(pkg, build = TRUE, install = FALSE, check = FALSE, 
  check.opts = "", remove.check = TRUE, reformat = TRUE, ...) {
}
```

Note this functionality depends on the package [**formatR**](https://yihui.org/formatR), and
sometimes it might not be possible to reformat the code, e.g. the
`\dontrun{}` command in Rd can contain arbitrary texts, which means there
could be illegal R expressions and **formatR** will be unable to format the
code. In this case, the original code will not be reformatted and a message
will be printed on screen.

# About this vignette

This vignette was built using the vignette engine `knitr::rmarkdown`
in the [**knitr**](https://yihui.org/knitr) package. You can find the source
in the [Rd2roxygen
repository](https://github.com/yihui/Rd2roxygen/tree/master/vignettes) on
Github, or


```r
system.file("doc", "Rd2roxygen.Rmd", package = "Rd2roxygen")
```
