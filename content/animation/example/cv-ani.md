---
title: cv.ani()
subtitle: Demonstration of the k-fold Cross Validation
date: '2017-04-04'
slug: cv-ani
from_Rmd: yes
---

This function uses rectangles to illustrate the `\(k\)` folds and
mark the test set and the training set with different colors.

Briefly speaking, the process of cross-validation is just to split
the whole data set into several parts and select one part as the
test set and the rest parts as the training set.

The computation of sample sizes is base on `kfcv`.

 
This is a naive demonstration for the k-fold cross validation. The k rectangles in the plot denote the k folds of data. Each time a fold will be used as the test set and the rest parts as the training set. 


```r
library(animation)
ani.options(interval = 1, nmax = 15)
cv.ani(main = "Demonstration of the k-fold Cross Validation", 
  bty = "l")
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/cv-ani/demo-a.mp4" /><p>plot of chunk demo-a</p></video>




```r
## leave-one-out CV
cv.ani(x = runif(15), k = 15)
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/cv-ani/demo-b.mp4" /><p>plot of chunk demo-b</p></video>


