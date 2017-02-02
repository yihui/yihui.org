---
title: A Slider to Control Two Plotting Windows
date: '2010-09-28'
slug: a-slider-to-control-two-plotting-windows
---

One of my readers asked two weeks ago how to control two graphics windows with the slider in **gWidgets**. Here is a simple example:

```r 
if (!require("gWidgetsRGtk2")) install.packages("gWidgetsRGtk2")
library(gWidgetsRGtk2)
options(guiToolkit = "RGtk2")
graphics.off()
x11()
x11()
dev.set()

gslider(from = 1, to = 100, value = 10,
    container = gwindow("Two Plotting Windows"),
    handler = function(h, ...) {
        n = 10 * svalue(h$obj)
        plot(rnorm(n), main = "the 1st plot")
        dev.set()
        plot(hist(runif(n)), main = "the 2nd plot")
        dev.set()
    })
```

The basic idea is to use `dev.set()` function to set focus on different graphics devices. After one plot has been drawn, go to the next device to draw the next plot. That's it.
