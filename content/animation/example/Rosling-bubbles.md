---
title: Rosling.bubbles()
subtitle: "The Bubbles Animation in Hans Roslings Talk"
date: '2017-04-04'
slug: Rosling-bubbles
from_Rmd: yes
---

In Hans Rosling's attractive talk `Debunking third-world myths with the best
stats you've ever seen`, he used a lot of bubble plots to illustrate trends
behind the data over time. This function gives an imitation of those moving
bubbles, besides, as this function is based on `symbols`, we can
also make use of other symbols such as squares, rectangles, thermometers,
etc.

Suppose we have observations of `\(n\)` individuals over
`ani.options('nmax')` years. In this animation, the data of each year
will be shown in the bubbles (symbols) plot; as time goes on, certain trends
will be revealed (like those in Rosling's talk). Please note that the
arrangement of the data for bubbles (symbols) should be a matrix like
`\(A_{ijk}\)` in which `\(i\)` is the individual id (from 1 to n), `\(j\)`
denotes the `\(j\)`-th variable (from 1 to p) and `\(k\)` indicates the time
from 1 to `ani.options('nmax')`.

And the length of `x` and `y` should be equal to the number of rows
of this matrix.

 

```r
library(animation)
ani.options(interval = 0.2, nmax = 50)

## use default arguments (random numbers); you may try to find
## the real data
par(mar = c(4, 4, 0.2, 0.2))
Rosling.bubbles()
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/Rosling-bubbles/demo-a.mp4" /><p>plot of chunk demo-a</p></video>

 

```r
## rectangles
Rosling.bubbles(type = "rectangles", data = matrix(abs(rnorm(50 * 
  10 * 2)), ncol = 2))
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/Rosling-bubbles/demo-b.mp4" /><p>plot of chunk demo-b</p></video>
