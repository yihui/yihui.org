---
title: MC.samplemean()
subtitle: Sample Mean Monte Carlo Integration
date: '2017-04-04'
slug: MC-samplemean
from_Rmd: yes
---


Integrate a function from 0 to 1 using the Sample Mean Monte Carlo algorithm

**Sample Mean Monte Carlo** integration can compute

`\(I=\int_0^1 f(x) dx\)`

by drawing random numbers `\(x_i\)` from Uniform(0, 1) distribution and
average the values of `\(f(x_i)\)`. As `\(n\)` goes to infinity, the sample
mean will approach to the expectation of `\(f(X)\)` by Law of Large Numbers.

The height of the `\(i\)`-th rectangle in the animation is `\(f(x_i)\)` and
the width is `\(1/n\)`, so the total area of all the rectangles is `\(\sum_{i=1}^{n}\frac{1}{n}f(x_i)\)`, which is just the sample mean. We can compare the area of
rectangles to the curve to see how close is the area to the real integral.
 

```r
library(animation)
ani.options(interval = 0.2, nmax = 50)
par(mar = c(4, 4, 1, 1))

## when the number of rectangles is large, use border = NA
MC.samplemean(border = NA)$est
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/MC-samplemean/demo-a.mp4" /><p>plot of chunk demo-a</p></video>

```
## [1] 0.1638
```

```r
integrate(function(x) x - x^2, 0, 1)
```

```
## 0.1667 with absolute error < 1.9e-15
```



```r
## when adj.x = FALSE, use semi-transparent colors
MC.samplemean(adj.x = FALSE, col.rect = c(rgb(0, 0, 0, 0.3), 
  rgb(1, 0, 0)), border = NA)
```

```r
## another function to be integrated
MC.samplemean(FUN = function(x) x^3 - 0.5^3, border = NA)$est
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/MC-samplemean/demo-b.mp4" /><p>plot of chunk demo-b</p></video>

```
## [1] 0.09573
```

```r
integrate(function(x) x^3 - 0.5^3, 0, 1)
```

```
## 0.125 with absolute error < 2.4e-15
```
