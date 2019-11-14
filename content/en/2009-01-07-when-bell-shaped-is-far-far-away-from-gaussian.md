---
title: When Bell-shaped is Far Far Away from Gaussian
date: '2009-01-07'
slug: when-bell-shaped-is-far-far-away-from-gaussian
---

I was surprised to find the density estimation of a constant was also "bell-shaped" by default when a friend passed some R code to me to illustrate CLT, but I realized the reason soon.

```r 
x = rep(0, 1000)
par(mfrow = c(1, 2), mar = c(4, 4, 0.1, 0.1))
plot(density(x), main = "")
plot(density(x), main = "")
rug(jitter(x))
```

![](https://db.yihui.org/imgur/kMSde.png)

Note that I added a rug (jittered) to the right plot to tell you the true locations of the data points.
