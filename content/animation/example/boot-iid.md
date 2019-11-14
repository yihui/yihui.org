---
title: boot.iid()
subtitle: Bootstrapping the i.i.d data
date: '2017-04-04'
slug: boot-iid
from_Rmd: yes
---

Use a sunflower scatter plot to illustrate the results of resampling, and a
histogram to show the distribution of the statistic of interest.

This is actually a very naive version of bootstrapping but may be useful for
novices. By default, the circles denote the original dataset, while the red
sunflowers (probably) with leaves denote the points being resampled; the
number of leaves just means how many times these points are resampled, as
bootstrap samples **with** replacement. The x-axis is the sample values,
and y-axis is the indices of sample points.

The whole process has illustrated the steps of resampling, computing the
statistic and plotting its distribution based on bootstrapping.

 

```r
library(animation)
## bootstrap for 20 random numbers from U(0, 1)
par(mar = c(1.5, 3, 1, 0.1), cex.lab = 0.8, cex.axis = 0.8, mgp = c(2, 
  0.5, 0), tcl = -0.3)
ani.options(nmax = 50)
## don't want the titles
boot.iid(main = c("", ""))
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/boot-iid/demo-a.mp4" /><p>plot of chunk demo-a</p></video>


```r
## for the median of 15 points from chi-square(5)
boot.iid(x = rchisq(15, 5), statistic = median, main = c("", 
  ""))
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/boot-iid/demo-b.mp4" /><p>plot of chunk demo-b</p></video>


```r
## change the layout; or you may try 'mat = matrix(1:2, 1)'
par(mar = c(1.5, 3, 2.5, 0.1), cex.main = 1)
boot.iid(heights = c(1, 2))
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/boot-iid/demo-c.mp4" /><p>plot of chunk demo-c</p></video>
