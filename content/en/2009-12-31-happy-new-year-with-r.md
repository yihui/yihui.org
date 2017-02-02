---
title: Happy New Year with R
date: '2009-12-31'
slug: happy-new-year-with-r
---

I have to admit that the previous post on Christmas is actually not much fun. Today I received another pResent from Yixuan which is more interesting:

<embed width="560" height="320" src="http://animation.r-forge.r-project.org/swf/new-year-animation-in-R.swf" type="application/x-shockwave-flash">

Basically the code deals with letter polygons (i.e. glyphs) and plot them with proper projections from 3D to 2D space:

```r 
## original code by Yixuan <yixuan.qiu@cos.name>, with my slight modification
h.x = c(0.193, 0.295, 0.295, 0.703, 0.703, 0.804, 0.804, 0.703, 0.703,
        0.295, 0.295, 0.193, 0.193)
h.y = c(0.935, 0.935, 0.575, 0.575, 0.935, 0.935, 0.063, 0.063, 0.475,
        0.475, 0.063, 0.063, 0.935)
a1.x = c(0.433, 0.546, 0.865, 0.746, 0.656, 0.328, 0.242, 0.136)
a1.y = c(0.935, 0.935, 0.063, 0.063, 0.326, 0.326, 0.063, 0.063)
a2.x = c(0.488, 0.629, 0.355)
a2.y = c(0.841, 0.418, 0.418)
y.x = c(0.136, 0.259, 0.496, 0.734, 0.853, 0.543, 0.543, 0.441, 0.441)
y.y = c(0.935, 0.935, 0.523, 0.935, 0.935, 0.431, 0.063, 0.063, 0.427)
n.x = c(0.189, 0.295, 0.707, 0.707, 0.804, 0.804, 0.701, 0.287, 0.287, 0.189)
n.y = c(0.935, 0.935, 0.248, 0.935, 0.935, 0.063, 0.063, 0.747, 0.063, 0.063)
e.x = c(0.222, 0.787, 0.787, 0.324, 0.324, 0.757, 0.757, 0.324, 0.324,
        0.804, 0.804, 0.222)
e.y = c(0.935, 0.935, 0.834, 0.834, 0.564, 0.564, 0.464, 0.464, 0.163,
        0.163, 0.063, 0.063)
w.x = c(0, 0.099, 0.254, 0.439, 0.564, 0.738, 0.902, 1, 0.789, 0.687,
        0.5, 0.31, 0.205)
w.y = c(0.935, 0.935, 0.187, 0.935, 0.935, 0.189, 0.935, 0.935, 0.063,
        0.063, 0.826, 0.063, 0.063)
p.x = c(0.218, 0.56, 0.56, 0.56, 0.56, 0.32, 0.32, 0.218, 0.32, 0.32)
p.y = c(0.935, 0.933, 0.832, 0.518, 0.418, 0.418, 0.063, 0.063, 0.518, 0.834)
p.cir.th = seq(pi/2, -pi/2, length.out = 50)
p1.cir.x = 0.56 + 0.2575 * cos(p.cir.th)
p1.cir.y = 0.6755 + 0.2575 * sin(p.cir.th)
p2.cir.x = 0.56 + 0.157 * cos(p.cir.th)
p2.cir.y = 0.6755 + 0.157 * sin(p.cir.th)
p1.x = c(0.218, p1.cir.x, 0.32, 0.32, 0.218)
p1.y = c(0.935, p1.cir.y, 0.418, 0.063, 0.063)
p2.x = c(0.32, p2.cir.x, 0.32)
p2.y = c(0.832, p2.cir.y, 0.518)
r1.cir.th = seq(pi/2, -7/18 * pi, length.out = 50)
r2.cir.th = seq(pi/2, -pi/2, length.out = 50)
r1.cir.x = 0.578 + 0.243 * cos(r1.cir.th)
r1.cir.y = 0.6955 + 0.243 * sin(r1.cir.th)
r2.cir.x = 0.578 + 0.145 * cos(r2.cir.th)
r2.cir.y = 0.6955 + 0.145 * sin(r2.cir.th)
r1.x = c(0.191, r1.cir.x, 0.877, 0.75, 0.54, 0.297, 0.297, 0.191)
r1.y = c(0.937, r1.cir.y, 0.059, 0.059, 0.448, 0.448, 0.059, 0.059)
r2.x = c(0.297, r2.cir.x, 0.297)
r2.y = c(0.841, r2.cir.y, 0.55)
draw.ch = function(x1, y1, x2 = NULL, y2 = NULL, center.x, color, alpha, xscale) {
  rgb.col = col2rgb(color)/255
  x1 = x1 * xscale + center.x - 0.5 * xscale
  x2 = x2 * xscale + center.x - 0.5 * xscale
  polygon(x1, y1, col = rgb(rgb.col[1], rgb.col[2], rgb.col[3],
                            alpha = alpha), border = NA)
  polygon(x2, y2, col = "black", border = NA)
}
x1 = list(h.x, a1.x, p1.x, p1.x, y.x, n.x, e.x, w.x, y.x, e.x, a1.x, r1.x)
y1 = list(h.y, a1.y, p1.y, p1.y, y.y, n.y, e.y, w.y, y.y, e.y, a1.y, r1.y)
x2 = list(NULL, a2.x, p2.x, p2.x, NULL, NULL, NULL,
          NULL, NULL, NULL, a2.x, r2.x)
y2 = list(NULL, a2.y, p2.y, p2.y, NULL, NULL, NULL,
          NULL, NULL, NULL, a2.y, r2.y)
th = seq(pi/6, 2 * pi, length.out = 12)
cols = rainbow(200)
## if you don't want to save the animation into SWF,
## just comment the function saveSWF()
library(animation)
saveSWF({
  for (j in 1:238) {
    th = th - pi/120
    center.x = 3 + 5 * cos(th)
    cols = c(cols[-1], cols[1])
    alpha = 0.1 + (50 * (1 - sin(th)))/100
    alpha = ifelse(alpha > 1, 1, alpha)
    xscale = -sin(th) * 1.2
    plot(1, xlim = c(-2, 8), ylim = c(-2.5, 3.5), type = "n")
    plot.order = (1:12)[order(xscale > 0)]
    for (k in 1:12) {
      i = plot.order[k]
      draw.ch(x1[[i]], y1[[i]], x2[[i]], y2[[i]], center.x[i],
              color = cols[k + 60 * ( i >= 6 & i <= 8 ) + 120 *
                (i > 8)], alpha[i], xscale[i])
    }
    text(8, -2.5, "Yixuan @ 2009-12-31 (http://yixuan.cos.name)",
         adj = c(1, 0), col = "white", cex = 0.8)

  }
}, interval = 0.05, dev = "pdf",
        para = list(bg = "black", mar = rep(0, 4)), width = 7, height = 4)
## in the 'fun' package (currently on R-Forge),
## see demo('HappyNewYear2010Yixuan')
```

Thanks, Yixuan!

By the way, there are even more interesting demos in the `fun` package, just install the package by `install.packages('fun')` to see `demo(package = 'fun')$results[, 'Item']`.
