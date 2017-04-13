---
title: sample.strat()
subtitle: Demonstration of the stratified sampling
date: '2017-04-04'
slug: sample-strat
from_Rmd: yes
---

Each rectangle stands for a stratum, and the simple random sampling without
replacement is performed within each stratum. The points being sampled are
marked out (by red circles by default).
 

```r
library(animation)
ani.options(nmax = 50)
par(mar = rep(1, 4), lwd = 2)
sample.strat(col = c("bisque", "white"))
```

<video controls loop autoplay><source src="https://assets.yihui.name/figures/animation/example/sample-strat/demo-a.mp4?dl=1" /><p>plot of chunk demo-a</p></video>
