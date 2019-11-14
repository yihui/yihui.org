---
title: 指北箭头
date: '2009-03-11'
slug: north-arrow-in-r
---

我们可以把R-help邮件列表当作一个练手的地方，比如今天有人想把地图上的指北箭头作为位图格式导入他的地图，而我则建议不如手工画一个：

```r
north.arrow = function(x, y, h) {
  polygon(c(x, x, x + h/2), c(y - h, y, y - (1 + sqrt(3)/2) *
      h), col = "black", border = NA)
  polygon(c(x, x + h/2, x, x - h/2), c(y - h, y - (1 + sqrt(3)/2) *
      h, y, y - (1 + sqrt(3)/2) * h))
  text(x, y, "N", adj = c(0.5, 0), cex = 4)
}
par(mar = rep(0, 4))
plot(1, type = "n", ylim = c(0, 1), axes = FALSE, ann = FALSE)
north.arrow(1, 0.8, 0.4)
```

![指北箭头](https://db.yihui.org/imgur/BLJT13o.png)

不过这种基础性练习带来的坏处就是，你总觉得用R的基础图形元素什么图都可以画，从而不愿学习新的作图系统。
