---
title: brownian.motion()
subtitle: Demonstration of Brownian Motion
date: '2017-04-04'
slug: brownian-motion
from_Rmd: yes
---
 

Brownian motion, or random walk, can be regarded as the trace of some
cumulative normal random numbers.

The location of the next step is `current location + random Gaussian numbers`, i.e.,

`$$x_{k+1} = x_{k} + rnorm(1)$$`


`$$y_{k + 1} = y_{k} + rnorm(1)$$`

where `\((x, y)\)` stands for the location of a point.

 

```r
library(animation)
ani.options(interval = 0.05, nmax = 150)
brownian.motion(pch = 21, cex = 5, col = "red", bg = "yellow", 
  main = "Demonstration of Brownian Motion")
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/brownian-motion/demo-a.mp4" /><p>plot of chunk demo-a</p></video>
