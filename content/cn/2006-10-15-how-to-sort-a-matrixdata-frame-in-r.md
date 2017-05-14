---
title: How to sort a matrix/data frame in R
date: '2006-10-15T16:45:49+08:00'
slug: how-to-sort-a-matrixdata-frame-in-r
---

This is one of the difficulties I encountered when I was making an R script for a sampling task in a project. First I thought this would be a simple problem, and apply(x, 2, sort) might be OK. Later I found it was wrong:

```r
> a
     [,1] [,2]
[1,]  -14   11
[2,]    1    5
[3,]    1    2
[4,]    1    3
[5,]   -2  -20
> apply(a,2,sort)
     [,1] [,2]
[1,]  -14  -20
[2,]   -2    2
[3,]    1    3
[4,]    1    5
[5,]    1   11
```

Apparently the data structure was destroyed. I want to sort the matrix by a column (or several columns), but apply(x, 2, sort) sorts all the columns **respectively**. Of course a simple function sort() will return a more "terrible" result.

The correct way is to use the function **order()**, which returns a _permutation_ which rearranges its first argument into ascending or descending order, but **order()** alone still can't solve the problem. Just compare

```r 
> a[order(a[, 1]), ]
     [,1] [,2]
[1,]  -14   11
[2,]   -2  -20
[3,]    1    5
[4,]    1    2
[5,]    1    3
```

with

```r
> a[order(a[ ,1], a[ ,2]), ]
     [,1] [,2]
[1,]  -14   11
[2,]   -2  -20
[3,]    1    2
[4,]    1    3
[5,]    1    5
```

Today I looked up for this question in "[R FAQ](http://finzi.psych.upenn.edu/R/doc/manual/R-FAQ.html)" and easily found it. It seems that I still lack the habit of searching the [R site](http://finzi.psych.upenn.edu/search.html).
