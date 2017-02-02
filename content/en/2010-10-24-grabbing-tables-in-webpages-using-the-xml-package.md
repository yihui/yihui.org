---
title: Grabbing Tables in Webpages Using the XML Package
date: '2010-10-24'
slug: grabbing-tables-in-webpages-using-the-xml-package
---

Tables are pretty common in web pages as data sources, and the most direct way to get these data is probably to copy and paste. This is OK if there are only two or three tables, and when we need to grab 5000 tables in 1000 web pages, we may not really wish to fulfill the task by hand. That is one of the reasons for why we need programming -- we want to be as lazy as possible. Who is willing to spend 2 hours copying and pasting? Just let the computers do the tedious job and we can watch movies.

The R package [**XML**](http://www.omegahat.org/RSXML/) is a handy tool to deal with web pages (both XML or HTML). I'm actually a big fan of its author, Duncan Temple Lang, who did a lot of work on the infrastructure of statistical computing (see the [Omegahat](http://www.omegahat.org) project). Next I use [the Stat579 homework of week 8](http://www.public.iastate.edu/~hofmann/stat579/homework/week8.html) as an example to show how to read tables from web pages directly using R, i.e. no Excel, no Word, no copy & paste. The task is to grab 3 data tables from the web pages for 3 states, clean the data and do some graphics. Specifically, I'll take [the page for Iowa](http://www.disastercenter.com/crime/iacrime.htm) as an example. See the R code below:

```r 
if (!require(XML)) install.packages('XML')
library(XML)
x = readHTMLTable('http://www.disastercenter.com/crime/iacrime.htm')
## the 3rd element is what we want
x = x[[3]]
## names are in the first 2 rows
nms = as.vector(apply(x[1:2, ], 2, paste, collapse = ''))
## remove the first 2 rows because they are not data
x = x[-(1:2), ]
## assign the names to data
names(x) = nms
## then remove any characters which are not numbers (i.e. 0-9)
x = sapply(x, function(xx) as.numeric(gsub('[^0-9]', '', xx)))
```

The most important function is `readHTMLTable()`, which is a convenient wrapper to parse an HTML page and retrieve the table elements. The rest of work is simply to figure out which table we need. Then we have to remove some characters which are not numbers. This is done by a regular expression `[^0-9]` in which `^` means matching any characters other than the following ones (in this case, they are digits from 0 to 9). It is easy to extend this script to reading other web pages too -- just change the URL (e.g. using a loop).

To assist understanding the code above, I put some intermediate results below:

```r 
if (!require(XML)) install.packages('XML')
library(XML)
x = readHTMLTable('http://www.disastercenter.com/crime/iacrime.htm')
str(x, max.level = 1)
# List of 18
#  $ NULL:'data.frame':   1 obs. of  1 variable:
#  $ NULL:'data.frame':   1 obs. of  1 variable:
#  $ NULL:'data.frame':   52 obs. of  12 variables:
#  $ NULL:'data.frame':   1 obs. of  1 variable:
#  $ NULL:'data.frame':   1 obs. of  1 variable:
#  $ NULL:'data.frame':   1 obs. of  3 variables:
#  $ NULL:'data.frame':   1 obs. of  1 variable:
#  $ NULL:'data.frame':   2 obs. of  1 variable:
#  $ NULL:'data.frame':   1 obs. of  2 variables:
#  $ NULL:'data.frame':   1 obs. of  1 variable:
#  $ NULL:'data.frame':   1 obs. of  1 variable:
#  $ NULL:'data.frame':   1 obs. of  1 variable:
#  $ NULL:'data.frame':   52 obs. of  12 variables:
#  $ NULL:'data.frame':   1 obs. of  2 variables:
#  $ NULL:'data.frame':   5 obs. of  13 variables:
#  $ NULL:'data.frame':   1 obs. of  2 variables:
#  $ NULL:'data.frame':   1 obs. of  1 variable:
#  $ NULL:'data.frame':   1 obs. of  1 variable:
## the 3rd element is what we want
x = x[[3]]
head(x)
#     V1         V2     V3      V4       V5     V6       V7      V8         V9      V10      V11     V12
# 1                                                Forcible         Aggravated          Larceny- Vehicle
# 2 Year Population  Index Violent Property Murder     Rape Robbery    assault Burglary    Theft   Theft
# 3 1960  2,757,537 30,991     656   30,335     17      102     301        236    6,375   21,865   2,095
# 4 1961  2,779,000 30,035     643   29,392     36       81     291        235    6,356   21,096   1,940
# 5 1962  2,777,000 31,590     559   31,031     31      105     238        185    7,326   21,668   2,037
# 6 1963  2,780,000 32,784     629   32,155     35      100     253        241    7,516   22,374   2,265
## names are in the first 2 rows
nms = as.vector(apply(x[1:2, ], 2, paste, collapse = ''))
nms
#  [1] "Year"              "Population"        "Index"             "Violent"           "Property"
#  [6] "Murder"            "ForcibleRape"      "Robbery"           "Aggravatedassault" "Burglary"
# [11] "Larceny-Theft"     "VehicleTheft"
## remove the first 2 rows because they are not data
x = x[-(1:2), ]
head(x)
#     V1        V2     V3    V4     V5 V6  V7  V8  V9   V10    V11   V12
# 3 1960 2,757,537 30,991   656 30,335 17 102 301 236 6,375 21,865 2,095
# 4 1961 2,779,000 30,035   643 29,392 36  81 291 235 6,356 21,096 1,940
# 5 1962 2,777,000 31,590   559 31,031 31 105 238 185 7,326 21,668 2,037
# 6 1963 2,780,000 32,784   629 32,155 35 100 253 241 7,516 22,374 2,265
# 7 1964 2,756,000 37,383 1,007 36,376 35 137 310 525 8,004 25,733 2,639
# 8 1965 2,760,000 38,574 1,067 37,507 36 123 354 554 8,398 26,220 2,889
## assign the names to data
names(x) = nms
head(x)
#   Year Population  Index Violent Property Murder ForcibleRape Robbery Aggravatedassault Burglary
# 3 1960  2,757,537 30,991     656   30,335     17          102     301               236    6,375
# 4 1961  2,779,000 30,035     643   29,392     36           81     291               235    6,356
# 5 1962  2,777,000 31,590     559   31,031     31          105     238               185    7,326
# 6 1963  2,780,000 32,784     629   32,155     35          100     253               241    7,516
# 7 1964  2,756,000 37,383   1,007   36,376     35          137     310               525    8,004
# 8 1965  2,760,000 38,574   1,067   37,507     36          123     354               554    8,398
#   Larceny-Theft VehicleTheft
# 3        21,865        2,095
# 4        21,096        1,940
# 5        21,668        2,037
# 6        22,374        2,265
# 7        25,733        2,639
# 8        26,220        2,889
## then remove any characters which are not numbers (i.e. 0-9)
x = sapply(x, function(xx) as.numeric(gsub('[^0-9]', '', xx)))
head(x)
#      Year Population Index Violent Property Murder ForcibleRape Robbery Aggravatedassault Burglary
# [1,] 1960    2757537 30991     656    30335     17          102     301               236     6375
# [2,] 1961    2779000 30035     643    29392     36           81     291               235     6356
# [3,] 1962    2777000 31590     559    31031     31          105     238               185     7326
# [4,] 1963    2780000 32784     629    32155     35          100     253               241     7516
# [5,] 1964    2756000 37383    1007    36376     35          137     310               525     8004
# [6,] 1965    2760000 38574    1067    37507     36          123     354               554     8398
#      Larceny-Theft VehicleTheft
# [1,]         21865         2095
# [2,]         21096         1940
# [3,]         21668         2037
# [4,]         22374         2265
# [5,]         25733         2639
# [6,]         26220         2889
str(x)
#  num [1:50, 1:12] 1960 1961 1962 1963 1964 ...
#  - attr(*, "dimnames")=List of 2
#   ..$ : NULL
#   ..$ : chr [1:12] "Year" "Population" "Index" "Violent" ...
```
