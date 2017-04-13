---
title: quincunx()
subtitle: Demonstration of the Galton Box, example 1
date: '2017-04-04'
slug: quincunx
from_Rmd: yes
---
Demonstration of the Quincunx (Bean Machine/Galton Box)

Simulates the quincunx with ``balls'' (beans) falling through several layers
(denoted by triangles) and the distribution of the final locations at which
the balls hit is denoted by a histogram; `quincunx()` is shows single
layer, and `quincunx2()` is a two-stage version of the quincunx.

The bean machine, also known as the quincunx or Galton box, is a device
invented by Sir Francis Galton to demonstrate the law of error and the normal
distribution.

When a ball falls through a layer, it can either go to the right or left side
with the probability 0.5. At last the location of all the balls will show us
the bell-shaped distribution.
 

```r
library(animation)
set.seed(123)
ani.options(nmax = 200 + 15 - 2, 2)
freq = quincunx(balls = 200, col.balls = rainbow(200))
```

```r
## frequency table
barplot(freq, space = 0)
```

<video controls loop autoplay><source src="https://assets.yihui.name/figures/animation/example/quincunx/demo-a.mp4?dl=1" /><p>plot of chunk demo-a</p></video>
