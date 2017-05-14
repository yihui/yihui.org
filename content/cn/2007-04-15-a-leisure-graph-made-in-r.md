---
title: A Leisure Graph Made in R
date: '2007-04-15T20:23:46+08:00'
slug: a-leisure-graph-made-in-r
---

Some three weeks ago, Renmin University called for the designing of class logos. Usually I don't like such activities, but when I was drawing a graph using R, I suddenly got some inspirations and made a logo by means of some simple R functions like _symbols()_, _lines()_, _dnorm()_, _segments()_, _polygon()_ and _arrows()_, etc.

The PDF version of this (perhaps ugly) logo can be [_downloaded here_](http://xieyihui.googlepages.com/sign.pdf). Below are some core codes:

```r
....
> y = seq(2 * pi, 0, length = 150)
> x = sin(y)
> radius = ifelse(0.5 * abs(cos(y)) + 0.1 < 0.15, 0.15, 
+    0.5 * abs(cos(y)) + 0.1)
> symbols(x, y, circles = radius, inches = F, fg = heat.colors(150))
....
```
