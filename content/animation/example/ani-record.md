---
title: ani.record()
subtitle: Record and replay animations
date: '2017-04-04'
slug: ani-record
from_Rmd: yes
---

These two functions use `recordPlot` and `replayPlot`
to record image frames and replay the animation respectively.

One difficulty in capturing images in R (base graphics) is that the
off-screen graphics devices cannot capture low-level plotting commands as
**new** image files -- only high-level plotting commands can produce new
image files; `ani.record` uses `recordPlot` to record
the plots when any changes are made on the current plot. For a graphical
device to be recordable, you have to call `dev.control('enable')` before
plotting.
 

```r
library(animation)

n = 20
x = sort(rnorm(n))
y = rnorm(n)
## set up an empty frame, then add points one by one
par(bg = "white")  # ensure the background color is white
plot(x, y, type = "n")

ani.record(reset = TRUE)  # clear history before recording

for (i in 1:n) {
  points(x[i], y[i], pch = 19, cex = 2)
  ani.record()  # record the current frame
}

## now we can replay it, with an appropriate pause between
## frames
oopts = ani.options(interval = 0.5)
ani.replay()

## or export the animation to an HTML page
saveHTML(ani.replay(), img.name = "record_plot")

## record plots and replay immediately
saveHTML({
  dev.control("enable")  # enable recording
  par(bg = "white")  # ensure the background color is white
  plot(x, y, type = "n")
  for (i in 1:n) {
    points(x[i], y[i], pch = 19, cex = 2)
    ani.record(reset = TRUE, replay.cur = TRUE)  # record the current frame
  }
})

ani.options(oopts)
```
