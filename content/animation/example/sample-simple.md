---
title: sample.simple()
subtitle: Demonstration of the simple random sampling without replacement
date: '2017-04-04'
slug: sample-simple
from_Rmd: yes
---

The whole sample frame is denoted by a matrix (`nrow * ncol`) in the
plane just for convenience, and the points being sampled are marked out (by
red circles by default). Each member of the population has an equal and known
chance of being selected.
 

```r
library(animation)
ani.options(nmax = 50)
par(mar = rep(1, 4))
sample.simple()
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/sample-simple/demo-a.mp4" /><p>plot of chunk demo-a</p></video>
