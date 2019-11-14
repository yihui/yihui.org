---
title: clt.ani()
subtitle: Demonstration of the Central Limit Theorem
date: '2017-04-04'
slug: clt-ani
from_Rmd: yes
---

First of all, a number of `obs` observations are generated from a
certain distribution for each variable `\(X_j\)`, `\(j = 1, 2, \cdots, n\)`, and `\(n = 1, 2, \cdots, nmax\)`, then
the sample means are computed, and at last the density of these sample means
is plotted as the sample size `\(n\)` increases (the theoretical limiting
distribution is denoted by the dashed line), besides, the P-values from the
normality test `shapiro.test` are computed for each `\(n\)` and
plotted at the same time.

As long as the conditions of the Central Limit Theorem (CLT) are satisfied,
the distribution of the sample mean will be approximate to the Normal
distribution when the sample size `n` is large enough, no matter what is
the original distribution. The largest sample size is defined by `nmax`
in `ani.options`.

 

```r
library(animation)
ani.options(interval = 0.1, nmax = 150)
op = par(mar = c(3, 3, 1, 0.5), mgp = c(1.5, 0.5, 0), tcl = -0.3)
clt.ani(type = "s")
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/clt-ani/demo-a.mp4" /><p>plot of chunk demo-a</p></video>

```r
par(op)
```


 

```r
## other distributions: Chi-square with df = 5 (mean = df, var
## = 2*df)
f = function(n) rchisq(n, 5)
clt.ani(FUN = f, mean = 5, sd = sqrt(2 * 5))
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/clt-ani/demo-b.mp4" /><p>plot of chunk demo-b</p></video>
