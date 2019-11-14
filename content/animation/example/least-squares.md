---
title: least.squares()
subtitle: Demonstrate the least squares method
date: '2017-04-04'
slug: least-squares
from_Rmd: yes
---

This is a simple demonstration of the meaning of least squares in univariate
linear regression.

With either the intercept or the slope changing, the lines will be moving in
the graph and corresponding residuals will be plotted. We can finally see the
best estimate of the intercept and the slope from the residual plot.
 

```r
library(animation)
par(mar = c(5, 4, 0.5, 0.1))
ani.options(interval = 0.3, nmax = 50)

## default animation: with slope changing
least.squares()
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/least-squares/demo-a.mp4" /><p>plot of chunk demo-a</p></video>


```r
## intercept changing
least.squares(ani.type = "intercept")
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/least-squares/demo-b.mp4" /><p>plot of chunk demo-b</p></video>

We want to find an estimate for the slope in 50 candidate slopes, so we just compute the RSS one by one. 
