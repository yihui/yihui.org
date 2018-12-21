---
title: Demonstrating the Power of F Test with gWidgets
date: '2010-04-03'
slug: demonstrating-the-power-of-f-test-with-gwidgets
---

We know the real distribution of the F statistic in linear models -- it is a non-central F distribution. Under H0, we have a central F distribution. Given 1 - alpha, we can compute the probability of (correctly) rejecting H0. I created a simple demo to illustrate how the power changes as other parameters vary, e.g. the degrees of freedoms, the non-central parameter and alpha. Here is [the video](http://vimeo.com/10647395):

<iframe src="https://player.vimeo.com/video/10647395" width="600" height="749" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

And for those who might be interested, here is the code (you need to install the **gWidgets** package first and I recommend the **RGtk2** interface). Have fun:

```r 
## install.packages('gWidgetsRGtk2') first if not installed
if (!require("gWidgetsRGtk2")) install.packages("gWidgetsRGtk2")
if (!require("cairoDevice")) install.packages("cairoDevice")
library(gWidgetsRGtk2)
options(guiToolkit = "RGtk2")
tbl = glayout(container = gwindow("Power of the F Test"), spacing = 0)
tbl[1, 1:4, anchor = c(0, 0), expand = TRUE] = g.f = ggraphics(container = tbl,
  expand = TRUE, ps = 11)
tbl[2, 1, anchor = c(1, 0)] = "numerator df"
tbl[2, 2, anchor = c(0, 0), expand = TRUE] = g.dfn = gslider(from = 1,
  to = 50, value = 3, container = tbl, handler = function(h, ...) {
      p.Ftest(dfn = svalue(h$obj))
  })
tbl[2, 3, anchor = c(1, 0)] = "denominator df"
tbl[2, 4, anchor = c(0, 0), expand = TRUE] = g.dfd = gslider(from = 1,
  to = 50, value = 20, container = tbl, handler = function(h, ...) {
      p.Ftest(dfd = svalue(h$obj))
  })
tbl[3, 1, anchor = c(1, 0)] = "delta^2"
tbl[3, 2, anchor = c(0, 0), expand = TRUE] = g.ncp = gslider(from = 0,
  to = 100, value = 10, container = tbl, handler = function(h, ...) {
      p.Ftest(ncp = svalue(h$obj))
  })
tbl[3, 3, anchor = c(1, 0)] = "alpha"
tbl[3, 4, anchor = c(0, 0), expand = TRUE] = g.alpha = gslider(from = 0,
  to = 1, by = 0.01, value = 0.05, container = tbl, handler = function(h,
      ...) {
      p.Ftest(alpha = svalue(h$obj))
  })
tbl[4, 1, anchor = c(1, 0)] = "x range"
tbl[4, 2:4, anchor = c(0, 0), expand = TRUE] = g.xr = gslider(from = 1,
  to = 50, value = 15, container = tbl, handler = function(h, ...) {
      p.Ftest(xr = svalue(h$obj))
  })
## draw the graph
p.Ftest = function(dfn = svalue(g.dfn), dfd = svalue(g.dfd),
  ncp = svalue(g.ncp), alpha = svalue(g.alpha), xr = svalue(g.xr)) {
  x = seq(0.001, xr, length.out = 300)
  yc = df(x, dfn, dfd)
  yn = df(x, dfn, dfd, ncp = ncp)
  par(mar = c(4.5, 4, 1, 0.05))
  plot(x, yc, type = "n", ylab = "Density", ylim = c(0, max(yc, yn)))
  xq = qf(1 - alpha, dfn, dfd)
  polygon(c(xq, x[x >= xq], xr), c(0, yn[x > xq], 0), col = "gray",
      border = NA)
  lines(x, yc, lty = 1)
  lines(x, yn, lty = 2)
  legend("topright", c(as.expression(substitute(F[list(df1,
      df2)] ~ " density", list(df1 = dfn, df2 = dfd))), as.expression(substitute(F[list(df1,
      df2)](ncp) ~ " density", list(df1 = dfn, df2 = dfd, ncp = ncp))),
      as.expression(substitute("Power = " ~ p, list(p = round(1 -
          pf(xq, dfn, dfd, ncp = ncp), 4))))), lty = c(1:2,
      NA), fill = c(NA, NA, "gray"), border = NA, bty = "n")
  return(1 - pf(xq, dfn, dfd, ncp = ncp))
}
p.Ftest()
```
