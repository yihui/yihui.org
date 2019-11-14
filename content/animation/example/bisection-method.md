---
title: bisection.method()
subtitle: "The Bisection Method for root-finding on an interval"
date: '2017-04-04'
slug: bisection-method
from_Rmd: yes
---

This is a visual demonstration of finding the root of an equation `\(f(x) = 0\)` on an interval using the Bisection Method.

Suppose we want to solve the equation `\(f(x) = 0\)`. Given two points a and
b such that `\(f(a)\)` and `\(f(b)\)` have opposite signs, we know by the
intermediate value theorem that `\(f\)` must have at least one root in the
interval `\([a, b]\)` as long as `\(f\)` is continuous on this interval. The
bisection method divides the interval in two by computing `\(c = (a + b) / 2\)`. There are now two possibilities: either `\(f(a)\)` and `\(f(c)\)` have
opposite signs, or `\(f(c)\)` and `\(f(b)\)` have opposite signs. The
bisection algorithm is then applied recursively to the sub-interval where the
sign change occurs.

During the process of searching, the mid-point of subintervals are annotated
in the graph by both texts and blue straight lines, and the end-points are
denoted in dashed red lines. The root of each iteration is also plotted in
the right margin of the graph.

 

```r
library(animation)
ani.options(nmax = 30)

## default example
xx = bisection.method()
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/bisection-method/demo-a.mp4" /><p>plot of chunk demo-a</p></video>

```r
xx$root  # solution
```

```
## [1] 2
```
 

```r
## a cubic curve
f = function(x) x^3 - 7 * x - 10
xx = bisection.method(f, c(-3, 5))
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/bisection-method/demo-b.mp4" /><p>plot of chunk demo-b</p></video>



```r
## interaction: use your mouse to select the two end-points
if (interactive()) bisection.method(f, c(-3, 5), interact = TRUE)
```
