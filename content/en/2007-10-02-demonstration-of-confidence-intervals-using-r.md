---
title: Demonstration of Confidence Intervals Using R (Animated)
date: '2007-10-02'
slug: demonstration-of-confidence-intervals-using-r
---

> NOTE: There's a typo in the graph! The `\(\mu\)` should be replaced with the sample mean `\(\bar{X}\)`! And the code is available in the R package **animation**; see `library(animation); ?conf.int`

Recently I've been thinking about attending the conference of [IASC2008](http://www.iasc-ars.org/IASC2008/index.html), and my vague idea is to use _animations_ in statistical education, especially in the demonstration of some algorithms containing _iterations_ or _loops_. Perhaps the main difficulty just lies in an integrated theory -- currently I'm still not clear about the literature in this area (if anyone knows, please do drop me a line).

The other day when I was browsing the R documentation pages, I noticed that the amount of materials in those pages is increasing at a high speed. Among them I also saw some excellent web sites built by students (e.g. from Taiwan), which has triggered my own idea on building an independent website introducing animated pictures in statistics.

So... Let's come back to the topic. In fact this is a demonstration I made several weeks ago, and today I modified it a little bit in order that the coverage rate can be better shown. The idea behind this simulation is simple: draw samples (random numbers) from the population which follows `N(0, 1)`, and calculate confidence intervals (CI) based on these samples respectively. I believe everybody surely knows the formula in the main title of the figure below (suppose `sigma` is _known_, then compute the CI for the _unknown_ `mu`).

![Demonstration of Confidence Intervals Using R (Animated)](https://db.yihui.org/imgur/V37Mp.png)

R code for the demo:

```r 
library(animation)
conf.int
```
