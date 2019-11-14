---
title: newton.method()
subtitle: Demonstration of the Newton-Raphson method for root-finding
date: '2017-04-04'
slug: newton-method
from_Rmd: yes
---

This function provides an illustration of the iterations in Newton's method.

Newton's method (also known as the Newton-Raphson method or the
Newton-Fourier method) is an efficient algorithm for finding approximations
to the zeros (or roots) of a real-valued function f(x).

The iteration goes on in this way:

`$$x_{k + 1} = x_{k} - \frac{FUN(x_{k})}{FUN'(x_{k})}$$`

From the starting value `\(x_0\)`, vertical lines and points are plotted to
show the location of the sequence of iteration values `\(x_1, x_2, \ldots\)`; 
tangent lines are drawn to illustrate the
relationship between successive iterations; the iteration values are in the
right margin of the plot.

 

```r
library(animation)
ani.options(interval = 1, nmax = 50)
par(pch = 20)

## default example
xx = newton.method()
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/newton-method/demo-a.mp4" /><p>plot of chunk demo-a</p></video>

```r
xx$root  # solution
```

```
## [1] 2
```


```r
## take a long long journey
newton.method(function(x) 5 * x^3 - 7 * x^2 - 40 * x + 100, 7.15, 
  c(-6.2, 7.1))
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/newton-method/demo-b.mp4" /><p>plot of chunk demo-b</p></video>


```r
## another function
ani.options(interval = 0.5)
xx = newton.method(function(x) exp(-x) * x, rg = c(0, 10), init = 2)
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/newton-method/demo-c.mp4" /><p>plot of chunk demo-c</p></video>


```r
## does not converge!
xx = newton.method(function(x) atan(x), rg = c(-5, 5), init = 1.5)
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/newton-method/demo-d.mp4" /><p>plot of chunk demo-d</p></video>

```r
xx$root  # Inf
```

```
## [1] Inf
```


```r
## interaction: use your mouse to select the starting point
if (interactive()) {
  ani.options(interval = 0.5, nmax = 50)
  xx = newton.method(function(x) atan(x), rg = c(-2, 2), interact = TRUE)
}
```
