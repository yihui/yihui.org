---
title: quincunx
subtitle: "Demonstration of the Quincunx (Bean Machine/Galton Box)"
date: '2017-03-29'
slug: quincunx
from_Rmd: yes
---


```r
library(animation)
oopt = ani.options(nmax = 200 + 15 - 2, interval = 0.1)
quincunx(balls = 200, col.balls = rainbow(200))
```

<video controls loop autoplay><source src="https://assets.yihui.name/figures/animation/example/quincunx/demo-a-.mp4" /><p>Quincunx</p></video>
