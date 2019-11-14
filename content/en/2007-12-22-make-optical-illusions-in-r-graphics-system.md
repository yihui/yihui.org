---
title: Make Optical Illusions in R Graphics System
date: '2007-12-22'
slug: make-optical-illusions-in-r-graphics-system
---

> NOTE: this illusion has been implemented in the R package **animation** v0.1-4. The function is `vi.lilac.chaser()`.

This was a sudden idea that came into my mind yesterday. Actually some optical illusions can be very easily created using R graphics system. Here is one example I wrote yesterday:

```r 
# By Yihui XIE, Dec 22, 2007 http://yihui.org
op = par(bg = "gray", mar = rep(2, 4), xpd = NA)
x = seq(0, 2 * pi, length = 16)
invisible(replicate(100, {
  for (i in 1:length(x)) {
    plot(1, xlim = c(-1, 1), ylim = c(-1, 1), axes = F, ann = F,
        type = "n")
    points(sin(x[-i]), cos(x[-i]), col = "magenta", cex = 7,
        pch = 19)
    points(0, 0, pch = "+", cex = 5, lwd = 2)
    Sys.sleep(0.05)
  }
}))
par(op)
```

Focus your eyes on the center **+** for a few seconds, and you will find the color of the "circling" point just changes (to green). Perhaps I'll write a package for these illusions next year.

