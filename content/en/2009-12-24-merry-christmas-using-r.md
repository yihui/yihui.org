---
title: Merry Christmas Using R
date: '2009-12-24'
slug: merry-christmas-using-r
---

Life should be fun. I saw a post in R-help list saying Merry Christmas to other useRs, and I followed up by some R code which can produce a naive animation like this:

<embed width="600" height="75" name="plugin" src="http://animation.r-forge.r-project.org/swf/xmas-2009-animation.swf" type="application/x-shockwave-flash">

Here is the code to generate the above Flash animation with shining Christmas:

```r 
library(animation)
saveSWF({
  n = length(speed <- runif(angle <- runif(x <- strsplit("MERRY CHRISTMAS",
    "")[[1]], 0, 360), 0, 15))
  for (j in 1:300) {
    angle = angle + speed
    plot.new()
    plot.window(c(1, n), c(0, 1))
    for (i in 1:n) text(i, 0.5, x[i], srt = angle[i], cex = runif(1,
      1, 4), col = sample(colors(), 1))
    text(n, 0, "Yihui @ 2009-12-24 (http://yihui.org)",
      adj = c(1, 0), col = "white", cex = 0.8)
  }
}, interval = 0.04, dev = "pdf", outdir = getwd(), para = list(mar = rep(0,
  4), bg = "black"), width = 8, height = 1)
## in animation package (>=1.1-0), see demo('Xmas')
```

There are other animation formats in the R package **animation**:

1. use `saveMovie()` to get a GIF animation (need ImageMagick)
2. `ani.start()` and `ani.stop()` can produce an HTML page with the animation in it
3. `saveLatex()` can embed an animation into a PDF document
