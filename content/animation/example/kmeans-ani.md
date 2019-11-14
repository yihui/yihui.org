---
title: kmeans.ani()
subtitle: Demonstration of the K-means Cluster Algorithm
date: '2017-04-04'
slug: kmeans-ani
from_Rmd: yes
---

This function provides a demo of the k-Means cluster algorithm for data
containing only two variables (columns).

The k-Means cluster algorithm may be regarded as a series of iterations of:
finding cluster centers, computing distances between sample points, and
redefining cluster membership.

The data given by `x` is clustered by the `\(k\)`-means method, which
aims to partition the points into `\(k\)` groups such that the sum of squares
from points to the assigned cluster centers is minimized. At the minimum, all
cluster centres are at the mean of their Voronoi sets (the set of data points
which are nearest to the cluster centre).
 

```r
library(animation)
## set larger 'interval' if the speed is too fast
ani.options(interval = 1)
par(mar = c(3, 3, 1, 1.5), mgp = c(1.5, 0.5, 0))
kmeans.ani()
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/kmeans-ani/demo-a.mp4" /><p>plot of chunk demo-a</p></video>
 

```r
## the kmeans() example; very fast to converge!
x = rbind(matrix(rnorm(100, sd = 0.3), ncol = 2), matrix(rnorm(100, 
  mean = 1, sd = 0.3), ncol = 2))
colnames(x) = c("x", "y")
kmeans.ani(x, centers = 2)
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/kmeans-ani/demo-b.mp4" /><p>plot of chunk demo-b</p></video>
 

```r
## what if we cluster them into 3 groups?
kmeans.ani(x, centers = 3)
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/kmeans-ani/demo-c.mp4" /><p>plot of chunk demo-c</p></video>
