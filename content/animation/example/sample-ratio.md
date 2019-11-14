---
title: sample.ratio()
subtitle: Demonstration of the Ratio Estimation in Sampling Survey
date: '2017-04-04'
slug: sample-ratio
from_Rmd: yes
---

This function demonstrates the advantage of ratio estimation when further
information (ratio) about x and y is available.

From this demonstration we can clearly see that the ratio estimation is
generally better than the simple sample average when the ratio **R**
really exists, otherwise ratio estimation may not help.
 

```r
library(animation)
ani.options(interval = 1, nmax = 50)

## observe the location of the red line (closer to the
## population mean)
res = sample.ratio()
```

```r
## absolute difference with the true mean
matplot(abs(cbind(res$ybar.ratio, res$ybar.simple) - res$Ybar), 
  type = "l")
legend("topleft", c("Ratio Estimation", "Sample Average"), lty = 1:2, 
  col = 1:2)
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/sample-ratio/demo-a.mp4" /><p>plot of chunk demo-a</p></video>


```r
## if the ratio does not actually exist:
sample.ratio(X = rnorm(50), Y = rnorm(50))
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/sample-ratio/demo-b.mp4" /><p>plot of chunk demo-b</p></video>

```r
## ratio estimation may not be better than the simple average
```
