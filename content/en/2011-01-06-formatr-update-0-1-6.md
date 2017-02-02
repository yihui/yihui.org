---
title: formatR update (0.1-6)
date: '2011-01-06'
slug: formatr-update-0-1-6
---

A new version of the **formatR** package is available [on CRAN](http://cran.r-project.org/package=formatR) now (binary packages are still on the way). There are three major updates:

1. the inline comments will also be preserved in most cases (in earlier versions, only single lines of comments are preserved)
1. `tidy_source()` gained a new argument `text` to accept a character vector as the source code
1. multi-byte characters are supported in the `formatR()` GUI now (sorry, this is not completely true in 0.1-6; it has been fixed in 0.1-7)

The first feature is a request from Cameron, which is actually from another request of another user. I also feel this is a necessary feature even from the first version of this package, but dealing with inline comments is not as easy as the single lines of comments, and it can be dangerous. Please read the help page of the function `tidy_source()` for all the dark and dirty tricks for preserving R comments when formatting the R code. Here is a quick example:

```r 
library(formatR)
src = c("# a single line of comments is preserved",
  "1+1", "if(TRUE){",
  paste("x=1  ", "# comments begin with at least 2 spaces!"),
  "}else{", "x=2;print('Oh no... ask the right bracket to go away!')}",
  "1*3 # this comment will be dropped!")
## source code
cat(src, sep = "\n")
## # a single line of comments is preserved
## 1+1
## if(TRUE){
## x=1   # comments begin with at least 2 spaces!
## }else{
## x=2;print('Oh no... ask the right bracket to go away!')}
## 1*3 # this comment will be dropped!
```

We can reformat the code as:

```r 
## the formatted version
tidy_source(text = src)
## # a single line of comments is preserved
## 1 + 1
## if (TRUE) {
##     x = 1   # comments begin with at least 2 spaces!
## } else {
##     x = 2
##     print("Oh no... ask the right bracket to go away!")
## }
## 1 * 3
```

