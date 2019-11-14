---
title: Simulation of Burning Fire in R
date: '2009-06-12'
slug: simulation-of-burning-fire-in-r
---

Linlin Yan posted [a cool (hot?) simulation of burning fire](https://cosx.org/en/topic/the-first-r-code-here) with R in the [COS forum](https://cosx.org/en/) yesterday, which was indeed a _warm_ welcome. I'm not sure whether our forum members will be scared by the "fire" under the title "Welcome to COS Forum". The fire was mainly created by the function `image()` with carefully designed rows and columns in heated colors `heat.colors()`. Here is one of the pictures generated from his code:

![Simulation of Burning Fire in R](https://db.yihui.org/imgur/A0hAC.png)

The speed of drawing animation frames is rather slow in my computer, but it doesn't matter since we can use the **animation** package (hey, you are advertising!) to save all the image frames and convert them to a single animation file.

```r 
library(animation)
# set row=50 instead of the default 100 to let the fire burn to the ceiling
# make sure you have installed the SWF Tools and the command 'png2swf' can
#    be executed (with or w/o it installation path); see ?saveSWF
saveSWF(Fire(50), interval = 0.05, dev = "png", outdir = getwd(),
    para = list(mar = c(0, 0, 2, 0)))
```

Now the animation is much more smooth than what we saw in R graphics window.

Thanks, awesome Linlin.

> For those who are not familiar with the website [Capital of Statistics](https://cosx.org/) (COS), I'd like to give a brief introduction here: this website was built 3 years ago by me and it was originally a Chinese website for discussion in statistics, but later I thought a place for English-speaking visitors was also necessary, so an English forum was constructed: <https://cosx.org/en/>. Please feel free to join us if you are interested.

