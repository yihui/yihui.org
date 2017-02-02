---
title: R图形的动态缩放和平移
date: '2009-02-20'
slug: to-zoom-and-pan-r-graphs
---

最近两天Friedrich在R-devel发了一个通知，告诉大家[要开始准备Google Summer of Code了](https://stat.ethz.ch/pipermail/r-devel/2009-February/052190.html)！然后一位叫Oleg Sklyar的同志迫不及待[提出了两个主意](https://stat.ethz.ch/pipermail/r-devel/2009-February/052202.html)，结果讨论很快就乱了套，因为他提的第一个主意就是关于交互式图形的，他说很关键的一点是R不能实现图形的缩放和平移（zooming and panning），我一看，不对劲呀，谁说不能缩放、平移呀，于是三下五除二给了一个例子：

```r
##################################################################
# a demo for zooming and panning in R graphics
# by Yihui Xie, Feb 20, 2009
##################################################################
# a large number of points
plot(x <- rnorm(5000), y <- rnorm(5000), xlab = "x", ylab = "y")
xylim <- c(range(x), range(y))
zoom <- function(d, speed = 0.05) {
   rx <- speed * (xylim[2] - xylim[1])
   ry <- speed * (xylim[4] - xylim[3])
   # global assignment '<<-' here!
   xylim <<- xylim + d * c(rx, -rx, ry, -ry)
   plot(x, y, xlim = xylim[1:2], ylim = xylim[3:4])
   NULL
}
# Key `+`: zoom in; `-`: zoom out
# Left, Right, Up, Down: self-explaining
# `*`: reset
# Press other keys to quit
keybd <- function(key) {
   switch(key, `+` = zoom(1), `-` = zoom(-1), Left = zoom(c(-1,
       1, 0, 0)), Right = zoom(c(1, -1, 0, 0)), Up = zoom(c(0,
       0, 1, -1)), Down = zoom(c(0, 0, -1, 1)), `*` = plot(x,
       y), "Quit the program")
}
getGraphicsEvent(onKeybd = keybd)
##################################################################
```

上图仅限于Windows下操作，因为getGraphicsEvent()函数仅限于Windows图形设备使用。通过键盘上的加（放大）减（缩小）乘（恢复）和上下左右键可以很容易实现图形的动态缩放和平移。

不过后来Simon Urbanek老大[发话了](https://stat.ethz.ch/pipermail/r-devel/2009-February/052215.html)，Yihui你这不叫交互式图形；Simon老大说得对，不过俺只是为了说明R并不是像Oleg老大讲的那样不能实现缩放和平移。
