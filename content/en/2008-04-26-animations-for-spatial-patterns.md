---
title: Animations for Spatial Patterns (simulation only!)
date: '2008-04-26'
slug: animations-for-spatial-patterns
---

Sorry, it has been a long long time since I wrote the last blog entry... In the past few months, I was extremely busy with a lot of time-consuming affairs, and it seems that such a trend is not to change in near future.

A week ago, [Ye Li](http://individual.utoronto.ca/ye_li/) wrote me an email, telling me his interests in my package [animation](http://cran.r-project.org/package=animation). And his idea was to implement animations in spatio-temporal models to illustrate certain changes of patterns over time / space (say, clustering). Well, this sounds easy for me to create animations, however, I should know theories behind spatial statistics first of all -- that's much more difficult than the animation techniques and requires more efforts in study.

Here is a simple demonstration using the map of USA:

![Animations for Spatial Patterns (simulation only!)](https://db.yihui.org/imgur/CJe13.gif)

I just used the function `saveMovie()` in the **animation** package:

```r 
library(animation)
library(maps)
saveGIF({
  for (i in 1:20)
    map("state", col = sample(terrain.colors(30)), fill = TRUE)
}, ani.height = 300, ani.width = 500, outdir = getwd())
```

Easy enough, huh?

