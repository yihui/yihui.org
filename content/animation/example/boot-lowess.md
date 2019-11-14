---
title: boot.lowess()
subtitle: Bootstrapping with LOWESS
date: '2017-04-04'
slug: boot-lowess
from_Rmd: yes
---

Sample the original data with replacement and fit LOWESS curves accordingly.

We keep on resampling the data and finally we will see several bootstrapped
LOWESS curves, which may give us a rough idea about a `confidence interval`
of the LOWESS fit.
 

```r
library(animation)
ani.options(nmax = 100, interval = 0.02)

boot.lowess(cars, pch = 20, xlab = "speed", ylab = "dist")
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/boot-lowess/demo-a.mp4" /><p>plot of chunk demo-a</p></video>


```r
boot.lowess(cars, f = 1/3, pch = 20)
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/boot-lowess/demo-b.mp4" /><p>plot of chunk demo-b</p></video>
