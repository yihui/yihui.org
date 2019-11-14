---
title: mwar.ani()
subtitle: Demonstration of Moving Window Auto-Regression
date: '2017-04-04'
slug: mwar-ani
from_Rmd: yes
---

This function just fulfills a very naive idea about moving window regression
using rectangles to denote the `windows` and move them, and the
corresponding AR(1) coefficients as long as rough confidence intervals are
computed for data points inside the `windows` during the process of moving.

The AR(1) coefficients are computed by `arima`.
 

```r
library(animation)
## moving window along a sin curve
ani.options(interval = 0.1, nmax = 50)
par(mar = c(2, 3, 1, 0.5), mgp = c(1.5, 0.5, 0))
mwar.ani(lty.rect = 3, pch = 21, col = "red", bg = "yellow", 
  type = "o")
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/mwar-ani/demo-a.mp4" /><p>plot of chunk demo-a</p></video>


```r
## for the data 'pageview'
mwar.ani(pageview$visits, k = 30)
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/mwar-ani/demo-b.mp4" /><p>plot of chunk demo-b</p></video>
