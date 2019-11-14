---
title: BM.circle()
subtitle: Brownian Motion in a Circle
date: '2017-04-04'
slug: BM-circle
from_Rmd: yes
---

Several points moving randomly in a circle.

This is a solution to the question raised in R-help:
<https://stat.ethz.ch/pipermail/r-help/2008-December/183018.html>.

 

```r
library(animation)
ani.options(interval = 0.1, nmax = 100)
par(mar = rep(0.5, 4))
BM.circle(cex = 2, pch = 19)
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/BM-circle/demo-a.mp4" /><p>plot of chunk demo-a</p></video>
