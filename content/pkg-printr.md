---
title: "An Introduction to the printr Package"
author: "Yihui Xie"
date: "2018-09-08"
slug: printr
show_toc: yes
githubEditURL: https://github.com/yihui/printr/edit/master/vignettes/printr.Rmd
output:
  knitr:::html_vignette:
    number_sections: yes
    toc: yes
vignette: >
  %\VignetteIndexEntry{An Introduction to the printr Package}
  %\VignetteEngine{knitr::rmarkdown}
---



The **printr** (read "printer" or "print R") package is a companion package to
[**knitr**](https://yihui.org/knitr/). Its main purpose is to extend the S3
generic function `knit_print()` in **knitr**, which is the default value of the
chunk option `render`, as explained in the vignette
[knit_print.html](https://cran.r-project.org/web/packages/knitr/vignettes/knit_print.html).

# Overview

To enable the printing methods defined in this package, just `library(printr)` or `loadNamespace('printr')`
in a code chunk (in the beginning) of your **knitr** document. Then some objects
will be printed differently with what you would have seen in a normal R console.
For example:

- matrices, data frames, and contingency tables are printed as tables (LaTeX,
  HTML, or Markdown, depending on your output format)
- the help page (from `?foo` or `help(foo)`) can be rendered as HTML, LaTeX, or
  plain text, and you can also specify which section(s) of the help page to
  include in the output
- the results from `browseVignettes()`, `help.search()`, `data()`, and
  `vignette()` are rendered as tables
- the package information from `library(help = 'foo')` is rendered as plain text

To disable the printing methods in this package, you can call
`detach('package:printr', unload = TRUE)` if you _attached_ the package via
`library(printr)` before, or `unloadNamespace('printr')` if you _loaded_ it via
`loadNamespace('printr')`.

This package aims to be portable in the sense that it should work in most
document formats, including `*.Rnw` (R + LaTeX), `*.Rmd` (R Markdown), and
`*.Rhtml` (R + HTML) files, etc.

You can find the package source as well as installation instructions on [Github](https://github.com/yihui/printr),
and you are welcome to contribute code via pull requests, or file feature
requests and bug reports via [Github
issues](https://github.com/yihui/printr/issues).

# Examples

First we take a look at a quick example of printing some R objects in the R
console:


```r
> # R uses plain text representation for data frames/matrices/...
> head(mtcars)
```

```
                   mpg cyl disp  hp drat    wt  qsec vs am gear carb
Mazda RX4         21.0   6  160 110 3.90 2.620 16.46  0  1    4    4
Mazda RX4 Wag     21.0   6  160 110 3.90 2.875 17.02  0  1    4    4
Datsun 710        22.8   4  108  93 3.85 2.320 18.61  1  1    4    1
Hornet 4 Drive    21.4   6  258 110 3.08 3.215 19.44  1  0    3    1
Hornet Sportabout 18.7   8  360 175 3.15 3.440 17.02  0  0    3    2
Valiant           18.1   6  225 105 2.76 3.460 20.22  1  0    3    1
```

```r
> head(iris)
```

```
  Sepal.Length Sepal.Width Petal.Length Petal.Width Species
1          5.1         3.5          1.4         0.2  setosa
2          4.9         3.0          1.4         0.2  setosa
3          4.7         3.2          1.3         0.2  setosa
4          4.6         3.1          1.5         0.2  setosa
5          5.0         3.6          1.4         0.2  setosa
6          5.4         3.9          1.7         0.4  setosa
```

Then we attach the **printr** package in this R session, and see how things
change later:


```r
library(printr)
```

## Matrices/data frames/tables

Matrices and data frames are printed as tables using the `kable()` function in
**knitr**:


```r
options(digits = 4)
set.seed(123)
x = matrix(rnorm(40), 5)
x
```



|        |        |        |        |        |        |        |        |
|-------:|-------:|-------:|-------:|-------:|-------:|-------:|-------:|
| -0.5605|  1.7151|  1.2241|  1.7869| -1.0678| -1.6867|  0.4265|  0.6886|
| -0.2302|  0.4609|  0.3598|  0.4979| -0.2180|  0.8378| -0.2951|  0.5539|
|  1.5587| -1.2651|  0.4008| -1.9666| -1.0260|  0.1534|  0.8951| -0.0619|
|  0.0705| -0.6869|  0.1107|  0.7014| -0.7289| -1.1381|  0.8781| -0.3060|
|  0.1293| -0.4457| -0.5558| -0.4728| -0.6250|  1.2538|  0.8216| -0.3805|

```r
# with colunm names
dimnames(x) = list(NULL, head(LETTERS, ncol(x)))
x
```



|       A|       B|       C|       D|       E|       F|       G|       H|
|-------:|-------:|-------:|-------:|-------:|-------:|-------:|-------:|
| -0.5605|  1.7151|  1.2241|  1.7869| -1.0678| -1.6867|  0.4265|  0.6886|
| -0.2302|  0.4609|  0.3598|  0.4979| -0.2180|  0.8378| -0.2951|  0.5539|
|  1.5587| -1.2651|  0.4008| -1.9666| -1.0260|  0.1534|  0.8951| -0.0619|
|  0.0705| -0.6869|  0.1107|  0.7014| -0.7289| -1.1381|  0.8781| -0.3060|
|  0.1293| -0.4457| -0.5558| -0.4728| -0.6250|  1.2538|  0.8216| -0.3805|

```r
# further customization via kable(), e.g. digits and captions
knitr::kable(x, digits = 2, caption = "A table produced by printr.")
```



|     A|     B|     C|     D|     E|     F|     G|     H|
|-----:|-----:|-----:|-----:|-----:|-----:|-----:|-----:|
| -0.56|  1.72|  1.22|  1.79| -1.07| -1.69|  0.43|  0.69|
| -0.23|  0.46|  0.36|  0.50| -0.22|  0.84| -0.30|  0.55|
|  1.56| -1.27|  0.40| -1.97| -1.03|  0.15|  0.90| -0.06|
|  0.07| -0.69|  0.11|  0.70| -0.73| -1.14|  0.88| -0.31|
|  0.13| -0.45| -0.56| -0.47| -0.63|  1.25|  0.82| -0.38|

```r
head(mtcars)
```



|                  |  mpg| cyl| disp|  hp| drat|    wt|  qsec| vs| am| gear| carb|
|:-----------------|----:|---:|----:|---:|----:|-----:|-----:|--:|--:|----:|----:|
|Mazda RX4         | 21.0|   6|  160| 110| 3.90| 2.620| 16.46|  0|  1|    4|    4|
|Mazda RX4 Wag     | 21.0|   6|  160| 110| 3.90| 2.875| 17.02|  0|  1|    4|    4|
|Datsun 710        | 22.8|   4|  108|  93| 3.85| 2.320| 18.61|  1|  1|    4|    1|
|Hornet 4 Drive    | 21.4|   6|  258| 110| 3.08| 3.215| 19.44|  1|  0|    3|    1|
|Hornet Sportabout | 18.7|   8|  360| 175| 3.15| 3.440| 17.02|  0|  0|    3|    2|
|Valiant           | 18.1|   6|  225| 105| 2.76| 3.460| 20.22|  1|  0|    3|    1|

```r
head(iris, 10)
```



| Sepal.Length| Sepal.Width| Petal.Length| Petal.Width|Species |
|------------:|-----------:|------------:|-----------:|:-------|
|          5.1|         3.5|          1.4|         0.2|setosa  |
|          4.9|         3.0|          1.4|         0.2|setosa  |
|          4.7|         3.2|          1.3|         0.2|setosa  |
|          4.6|         3.1|          1.5|         0.2|setosa  |
|          5.0|         3.6|          1.4|         0.2|setosa  |
|          5.4|         3.9|          1.7|         0.4|setosa  |
|          4.6|         3.4|          1.4|         0.3|setosa  |
|          5.0|         3.4|          1.5|         0.2|setosa  |
|          4.4|         2.9|          1.4|         0.2|setosa  |
|          4.9|         3.1|          1.5|         0.1|setosa  |

For contingency tables, 1-d tables are printed as a 1-row matrix, 2-d tables are
printed an `\(n \times m\)` matrix, and tables of higher dimensions are printed as
data frames with frequencies.


```r
x1 = sample(letters[1:3], 1000, TRUE)
x2 = sample(letters[1:3], 1000, TRUE)
x3 = sample(letters[1:3], 1000, TRUE)
table(x1)
```



|   a|   b|   c|
|---:|---:|---:|
| 332| 342| 326|

```r
table(x1, x2)
```



|x1/x2 |   a|   b|   c|
|:-----|---:|---:|---:|
|a     |  98| 117| 117|
|b     | 123| 114| 105|
|c     | 111| 113| 102|

```r
table(x1, x2, x3)
```



|x1 |x2 |x3 | Freq|
|:--|:--|:--|----:|
|a  |a  |a  |   33|
|   |   |b  |   35|
|   |   |c  |   30|
|   |b  |a  |   45|
|   |   |b  |   37|
|   |   |c  |   35|
|   |c  |a  |   42|
|   |   |b  |   34|
|   |   |c  |   41|
|b  |a  |a  |   44|
|   |   |b  |   40|
|   |   |c  |   39|
|   |b  |a  |   41|
|   |   |b  |   42|
|   |   |c  |   31|
|   |c  |a  |   26|
|   |   |b  |   35|
|   |   |c  |   44|
|c  |a  |a  |   40|
|   |   |b  |   23|
|   |   |c  |   48|
|   |b  |a  |   29|
|   |   |b  |   43|
|   |   |c  |   41|
|   |c  |a  |   37|
|   |   |b  |   26|
|   |   |c  |   39|

## Search results from `help.search()`

Here are some examples demonstrating the results of `help.search()`, or you can
also use `??` to search for a string.


```r
??sunflower
```



|Package   |Topic         |Title                                                      |
|:---------|:-------------|:----------------------------------------------------------|
|graphics  |sunflowerplot |Produce a Sunflower Scatter Plot                           |
|grDevices |xyTable       |Multiplicities of (x,y) Points, e.g., for a Sunflower Plot |

```r
help.search('contourplot')
```



|Package  |Topic           |Title                                         |
|:--------|:---------------|:---------------------------------------------|
|raster   |contour         |Contour plot                                  |
|raster   |filledContour   |Filled contour plot                           |
|graphics |filled.contour  |Level (Contour) Plots                         |
|lattice  |levelplot       |Level plots and contour plots                 |
|lattice  |panel.levelplot |Panel Functions for levelplot and contourplot |

```r
help.search('foo', package = 'base')
```



|Package |Topic     |Title                                                                         |
|:-------|:---------|:-----------------------------------------------------------------------------|
|base    |is.things |Explore some properties of R objects and is.FOO() functions. Not for newbies! |

```r
help.search('foooooooo', package = 'utils')
```

```
## No results found
```

In a normal R session, the results will be displayed as an HTML page by default,
but normally these functions are meant to be called in an interactive R session,
and **knitr** documents are often compiled in non-interactive R sessions, so we
changed the printing behavior of these results, and readers will get the basic
idea of these functions when reading the **knitr** output. If they want to run
these functions by themselves, they can do it in an interactive R session.

## Help pages

When you want to read the help page of a certain R object, you normally use `?`
or `help()`, which will launch a separate help page from the R session, and
require human interaction. Again, we may not desire human interactions in
**knitr** documents, so the help pages are printed as static documents here.


```r
?coef
```

```
Extract Model Coefficients

Description:

     'coef' is a generic function which extracts model coefficients
     from objects returned by modeling functions.  'coefficients' is an
     _alias_ for it.

Usage:

     coef(object, ...)
     coefficients(object, ...)
     ## Default S3 method:
     coef(object, complete = TRUE, ...)
     ## S3 method for class 'aov'
     coef(object, complete = FALSE, ...)
     
Arguments:

  object: an object for which the extraction of model coefficients is
          meaningful.

complete: for the default (used for 'lm', etc) and 'aov' methods:
          logical indicating if the full coefficient vector should be
          returned also in case of an over-determined system where some
          coefficients will be set to 'NA', see also 'alias'.  Note
          that the default _differs_ for 'lm()' and 'aov()' results.

     ...: other arguments.

Details:

     All object classes which are returned by model fitting functions
     should provide a 'coef' method or use the default one.  (Note that
     the method is for 'coef' and not 'coefficients'.)

     The '"aov"' method does not report aliased coefficients (see
     'alias') by default where 'complete = FALSE'.

     The 'complete' argument also exists for compatibility with 'vcov'
     methods, and 'coef' and 'aov' methods for other classes should
     typically also keep the 'complete = *' behavior in sync.  By that,
     with 'p <- length(coef(obj, complete = TF))', 'dim(vcov(obj,
     complete = TF)) == c(p,p)' will be fulfilled for both 'complete'
     settings and the default.

Value:

     Coefficients extracted from the model object 'object'.

     For standard model fitting classes this will be a named numeric
     vector.  For '"maov"' objects (produced by 'aov') it will be a
     matrix.

References:

     Chambers, J. M. and Hastie, T. J. (1992) _Statistical Models in
     S_.  Wadsworth & Brooks/Cole.

See Also:

     'fitted.values' and 'residuals' for related methods; 'glm', 'lm'
     for model fitting.

Examples:

     x <- 1:5; coef(lm(c(1:3, 7, 6) ~ x))
```

When help pages are really long, we can use the chunk option
`printr.help.sections` to select
a few sections to display, e.g. we only show the sections `description` and
`usage` of the `paste()` function:


```r
?paste
```

```
Concatenate Strings

Description:

     Concatenate vectors after converting to character.

Usage:

     paste (..., sep = " ", collapse = NULL)
     paste0(..., collapse = NULL)
```

## Vignette/dataset lists

We can print the lists of vignettes and datasets in packages using `vignette()`
and `data()`, respectively.


```r
vignette(package = "rpart")
```



|Item      |Title                                      |
|:---------|:------------------------------------------|
|longintro |Introduction to Rpart (source, pdf)        |
|usercode  |User Written Split Functions (source, pdf) |

```r
vignette(package = c("rpart", "knitr"))
```



|Package |Item           |Title                                                                |
|:-------|:--------------|:--------------------------------------------------------------------|
|rpart   |longintro      |Introduction to Rpart (source, pdf)                                  |
|rpart   |usercode       |User Written Split Functions (source, pdf)                           |
|knitr   |knitr-html     |An R HTML Vignette with knitr (source, html)                         |
|knitr   |knitr-markdown |An R Markdown Vignette with knitr (source, html)                     |
|knitr   |knit_print     |Custom Print Methods (source, html)                                  |
|knitr   |datatables     |Display Tables with the JavaScript Library DataTables (source, html) |
|knitr   |knitr-refcard  |knitr Reference Card (source, pdf)                                   |
|knitr   |knitr-intro    |Not an Introduction to knitr (source, html)                          |
|knitr   |docco-classic  |R Markdown with the Docco Classic Style (source, html)               |
|knitr   |docco-linear   |R Markdown with the Docco Linear Style (source, html)                |
|knitr   |knit_expand    |Templating with knit_expand() (source, html)                         |

```r
data(package = "lattice")
```



|Item                |Title                                                 |
|:-------------------|:-----------------------------------------------------|
|USMortality         |Mortality Rates in US by Cause and Gender             |
|USRegionalMortality |Mortality Rates in US by Cause and Gender             |
|barley              |Yield data from a Minnesota barley trial              |
|environmental       |Atmospheric environmental conditions in New York City |
|ethanol             |Engine exhaust fumes from burning ethanol             |
|melanoma            |Melanoma skin cancer incidence                        |
|singer              |Heights of New York Choral Society singers            |

```r
data(package = c("rpart", "lattice"))
```



|Package |Item                |Title                                                   |
|:-------|:-------------------|:-------------------------------------------------------|
|rpart   |car.test.frame      |Automobile Data from 'Consumer Reports' 1990            |
|rpart   |car90               |Automobile Data from 'Consumer Reports' 1990            |
|rpart   |cu.summary          |Automobile Data from 'Consumer Reports' 1990            |
|rpart   |kyphosis            |Data on Children who have had Corrective Spinal Surgery |
|rpart   |solder              |Soldering of Components on Printed-Circuit Boards       |
|rpart   |stagec              |Stage C Prostate Cancer                                 |
|lattice |USMortality         |Mortality Rates in US by Cause and Gender               |
|lattice |USRegionalMortality |Mortality Rates in US by Cause and Gender               |
|lattice |barley              |Yield data from a Minnesota barley trial                |
|lattice |environmental       |Atmospheric environmental conditions in New York City   |
|lattice |ethanol             |Engine exhaust fumes from burning ethanol               |
|lattice |melanoma            |Melanoma skin cancer incidence                          |
|lattice |singer              |Heights of New York Choral Society singers              |

```r
data(package = "knitr")  # no datasets here
```

```
## Data sets not found
```

```r
browseVignettes(package = "knitr")
```



|Vignette            |Title                                                 |
|:-------------------|:-----------------------------------------------------|
|knitr-html.html     |An R HTML Vignette with knitr                         |
|knitr-markdown.html |An R Markdown Vignette with knitr                     |
|knit_print.html     |Custom Print Methods                                  |
|datatables.html     |Display Tables with the JavaScript Library DataTables |
|knitr-refcard.pdf   |knitr Reference Card                                  |
|knitr-intro.html    |Not an Introduction to knitr                          |
|docco-classic.html  |R Markdown with the Docco Classic Style               |
|docco-linear.html   |R Markdown with the Docco Linear Style                |
|knit_expand.html    |Templating with knit_expand()                         |

## Package info

A description of a package can be printed via `library(help = 'foo')`:


```r
library(help = "printr")
```

```
		Information on package 'printr'

Description:

Package:            printr
Type:               Package
Title:              Automatically Print R Objects to Appropriate Formats According to the
                    'knitr' Output Format
Version:            0.1
Date:               2017-05-19
Author:             Yihui Xie
Maintainer:         Yihui Xie <xie@yihui.name>
Description:        Extends the S3 generic function knit_print() in 'knitr' to
                    automatically print some objects using an appropriate format such as
                    Markdown or LaTeX. For example, data frames are automatically printed
                    as tables, and the help() pages can also be rendered in 'knitr'
                    documents.
Imports:            knitr (>= 1.16)
Suggests:           tools, rmarkdown
License:            GPL
URL:                https://yihui.org/printr/
BugReports:         https://github.com/yihui/printr/issues
VignetteBuilder:    knitr
LazyData:           TRUE
RoxygenNote:        6.0.1
NeedsCompilation:   no
Packaged:           2017-05-18 21:08:46 UTC; yihui
Repository:         CRAN
Date/Publication:   2017-05-19 06:24:13 UTC
Built:              R 3.5.0; ; 2018-04-24 08:43:11 UTC; unix

Index:

printr                  Print R objects in 'knitr' documents nicely

Further information is available in the following vignettes in directory
'/Users/yihui/R/printr/doc':

printr: An Introduction to the printr Package (source, pdf)
```
