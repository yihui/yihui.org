---
title: R Language Definition File for Highlight
date: '2007-09-11'
slug: r-language-definition-file-for-highlight
---

> Note: I have written a function _highlight.def()_ to dynamically generate the R definition file; just refer to the package '[animation](http://cran.r-project.org/package=animation)' (>=0.1-4) in R.

Indeed [Highlight](http://www.andre-simon.de/) is excellent for highlighting program code, however, the definition file for R language is far from complete. Below is the original definition file:

    $KW_LIST(kwa)=if else repeat while function for in next break
    $KW_LIST(kwb)=NULL NA Inf NaN
    $STRINGDELIMITERS=" '
    $SL_COMMENT=#
    $ESCCHAR=\
    $SYMBOLS= ( ) [ ] { } , ; : & | < > ! = / * % + -

Certainly, what we still need are those thousands of keywords in R, most of which are functions. Thus how can we get the names of functions in the packages of R? The solution is actually quite easy -- just use `ls()` with the environment name specified. The following is my source code for picking out the names of functions in all packages which are in the search path:

```r 
lst = search()
lst = lst[grep("package:", lst)]
########################################################
# "package:stats" "package:graphics" "package:grDevices"
# "package:utils" "package:datasets" "package:methods"
# "package:base"
########################################################
x = NULL
for (i in 1:length(lst)) x = c(x, ls(lst[i]))
y = x[-grep("[]\\\ \\|\\(\\)\\[\\{\\^\\$\\*\\+\\?~#%&=:!/@<>-]", x)]
# remove "functions" with special symbols using regexp
kw = c("if", "else", "repeat", "while", "function",
    "for", "in", "next", "break", "ifelse", "switch", "NULL",
    "NA", "Inf", "NaN", "TRUE", "T", "FALSE", "F")
# remove some constants, etc
y = setdiff(y, kw)
cat(y, sep = " ", file = 'func.txt') # format the result as highlight needs
```

The rest of work is just copy the result, and then paste them into the file "`r.lang`" (in directory "`langDefs`") as `$KW_LIST(kwc)`. Finally the definition codes are just like:

    $KW_LIST(kwa)=if else repeat while function for in next break ifelse switch
    $KW_LIST(kwb)=NULL NA Inf NaN TRUE T FALSE F
    $KW_LIST(kwc)=acf acf2AR add.scope add1 addmargins aggregate ...
    $STRINGDELIMITERS=" '
    $SL_COMMENT=# $ESCCHAR=\
    $SYMBOLS= ( ) [ ] { } , ; : & | < > ! ?= / * % ?+ -

At last, I'd like to thank [André Simon](http://www.andre-simon.de/) for his help and suggestions for the improvements of this definition file.
