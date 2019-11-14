---
title: MC.hitormiss()
subtitle: Hit or Miss Monte Carlo Integration
date: '2017-04-04'
slug: MC-hitormiss
from_Rmd: yes
---

Integrate a function using the Hit-or-Miss Monte Carlo algorithm.

We compute the proportion of points hitting the area under the curve, and the
integral can be estimated by the proportion multiplied by the total area of
the rectangle (from xmin to xmax, ymin to ymax).

 

```r
library(animation)
ani.options(interval = 0.2, nmax = 100)

## should be close to 1/6
MC.hitormiss()$est
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/MC-hitormiss/demo-a.mp4" /><p>plot of chunk demo-a</p></video>

```
## [1] 0.1725
```


```r
## should be close to 1/12
MC.hitormiss(from = 0.5, to = 1)$est
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/MC-hitormiss/demo-b.mp4" /><p>plot of chunk demo-b</p></video>

```
## [1] 0.07874
```
