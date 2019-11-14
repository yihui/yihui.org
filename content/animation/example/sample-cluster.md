---
title: sample.cluster()
subtitle: Demonstration of the cluster sampling
date: '2017-04-04'
slug: sample-cluster
from_Rmd: yes
---
Each rectangle stands for a cluster, and the simple random sampling without
replacement is performed for each cluster. All points in the clusters being
sampled will be drawn out.
 

```r
library(animation)
ani.options(nmax = 50)
par(mar = rep(1, 4))
sample.cluster(col = c("bisque", "white"))
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/sample-cluster/demo-a.mp4" /><p>plot of chunk demo-a</p></video>
