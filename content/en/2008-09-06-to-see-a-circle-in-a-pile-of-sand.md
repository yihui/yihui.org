---
title: To See A Circle in A Pile of Sand
date: '2008-09-06'
slug: to-see-a-circle-in-a-pile-of-sand
---

The other day I sent a small assignment to a group of people in order that they could _play_ with statistics and become more interested with this subject. The data-generating process was quite simple: first I generated 20000 random numbers (10000 rows, 2 columns) from `N(0, 1)` and then add 10000 rows of numbers which lie exactly on a circle; at last I provided this data in a randomized order so people cannot easily discover the pattern just from the numbers.

The question is, how to reveal the particular pattern in this "pile of sand"? Let's look at the original plot:

![The original scatter plot](https://db.yihui.org/imgur/TfwQw.png)

What can we observe from this scatter plot? Perhaps nothing but "a pile of sand". However, if we choose alternative ways to create the plot again, things will be completely different. Here are my approaches:

## 1. Use Semi-transparent Colors

Actually there are 10000 points lying on the circle, so the critical problem is overlapping. In order to show the degree of overlapping, we can use semi-transparent colors, because the color will be more opaque if there are many points at the same place.

![Transparent Colors](https://db.yihui.org/imgur/CwPVN.png)

## 2. Set Axes Limits

If we look closer into the plot, the scene will also be different. For example, we only plot the data in the range `[-1, 1]`.

![Set Axes Limits](https://db.yihui.org/imgur/szpEf.png)

## 3. Plot with Smaller Point Symbols

Certainly, small symbols can prevent overlapping effectively in this case.

![Plot with small symbols](https://db.yihui.org/imgur/xszYg.png)

## 4. Draw A Subset of the Data

As the problem is that there are too many data points, why not draw a subset and try a scatter plot first? For example, here we have sampled 1000 rows of data and the plot is like this:

![A subset of the original data](https://db.yihui.org/imgur/NGl93.png)

## 5. Estimate the 2D Density

The R package `KernSmooth` has provided functions to estimate the 1D or 2D density.We can further examine the shape of this 2D density using the package `rgl`. Here is [an animation](http://vimeo.com/4745847) recorded to illustrate the 2D density.

<iframe src="https://player.vimeo.com/video/4745847?title=0&amp;byline=0&amp;portrait=0" width="400" height="372" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

The R code for the above plots & animation is as follows:

```r 
# generate the data
x = rbind(matrix(rnorm(10000 * 2), ncol = 2), local({
  r = runif(10000, 0, 2 * pi)
  0.5 * cbind(sin(r), cos(r))
}))
x = as.data.frame(x[sample(nrow(x)), ])

devAskNewPage(TRUE)
# original plot
plot(x)
# transparent colors (alpha = 0.1)
plot(x, col = rgb(0, 0, 0, 0.1))
# set axes lmits
plot(x, xlim = c(-1, 1), ylim = c(-1, 1))
# small symbols
plot(x, pch = ".")
# subset
plot(x[sample(nrow(x), 1000), ])

# 2D density estimation
library(KernSmooth)
fit = bkde2D(as.matrix(x), c(0.1, 0.1))
# perspective plot by persp()
persp(fit$x1, fit$x2, fit$fhat)

library(rgl)
# perspective plot by OpenGL
rgl.surface(fit$x1, fit$x2, 5 * fit$fhat)
# animation
M = par3d("userMatrix")
play3d(par3dinterp(userMatrix = list(M,
  rotate3d(M, pi/2, 1, 0, 0), rotate3d(M, pi/2, 0, 1, 0),
  rotate3d(M, pi, 0, 0, 1))), duration = 20)
```

