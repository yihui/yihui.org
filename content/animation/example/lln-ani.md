---
title: lln.ani()
subtitle: Demonstration of the Law of Large Numbers
date: '2017-04-04'
slug: lln-ani
from_Rmd: yes
---

This function plots the sample mean as the sample size grows to check whether
the sample mean approaches to the population mean.

`np` points are plotted to denote the distribution of the sample mean;
we will observe that the range of the sample mean just becomes smaller and
smaller as the sample size increases and ultimately there will be an obvious
trend that the sample mean converges to the population mean `mu`.

The parameter `nmax` in `ani.options` means the maximum
sample size.

 

```r
library(animation)
ani.options(interval = 0.01, nmax = 150)

lln.ani(pch = ".")
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/lln-ani/demo-a.mp4" /><p>plot of chunk demo-a</p></video>


```r
## chi-square distribution; population mean = df
lln.ani(FUN = function(n, mu) rchisq(n, df = mu), mu = 5, cex = 0.6)
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/lln-ani/demo-b.mp4" /><p>plot of chunk demo-b</p></video>

The sample mean approaches to the population mean as the sample size n grows
