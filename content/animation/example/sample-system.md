---
title: sample.system()
subtitle: Demonstration of the systematic sampling
date: '2017-04-04'
slug: sample-system
from_Rmd: yes
---

The whole sample frame is denoted by a matrix (`nrow * ncol`) in the
plane, and the sample points with equal intervals are drawn out according to
a random starting point. The points being sampled are marked by red circles.
 

```r
library(animation)
ani.options(nmax = 50)
par(mar = rep(1, 4), lwd = 2)
sample.system()
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/sample-system/demo-a.mp4" /><p>plot of chunk demo-a</p></video>
