---
title: conf.int()
subtitle: Demonstration of Confidence Intervals
date: '2017-04-04'
slug: conf-int
from_Rmd: yes
---

This function gives a demonstration of the concept of confidence intervals in
mathematical statistics.

Keep on drawing samples from the Normal distribution N(0, 1), computing the
intervals based on a given confidence level and plotting them as segments in
a graph. In the end, we may check the coverage rate against the given
confidence level.

Intervals that cover the true parameter are denoted in color `cl[2]`,
otherwise in color `cl[1]`. Each time we draw a sample, we can compute
the corresponding confidence interval. As the process of drawing samples goes
on, there will be a legend indicating the numbers of the two kinds of
intervals respectively and the coverage rate is also denoted in the top-left
of the plot.

The argument `nmax` in `ani.options` controls the maximum
times of drawing samples.


 

```r
library(animation)
ani.options(interval = 0.1, nmax = 100)
## 90% interval
conf.int(0.9, main = "Demonstration of Confidence Intervals")
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/conf-int/demo-a.mp4" /><p>plot of chunk demo-a</p></video>


This animation shows the concept of the confidence interval which depends on the observations: if the samples change, the interval changes too. At last we can see that the coverage rate will be approximate to the confidence level.
