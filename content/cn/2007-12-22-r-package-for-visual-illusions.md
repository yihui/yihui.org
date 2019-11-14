---
title: 其实可以写一个视觉欺骗的R包
date: '2007-12-22'
slug: r-package-for-visual-illusions
---

这是昨天无意间想起来的一个馊主意，鉴于这个主意和统计没什么太大的关系，我也不打算在近期写这样的R包。不过我相信做出来之后还是会吸引一些眼球的，就像R里面的数独[sudoku](http://cran.r-project.org/package=sudoku)包一样，和统计也没太大关系，但把它写出来供娱乐用也颇有点意思。

比如这里我可以提供我昨天随意写的一段光学幻象代码：

```r
# By Yihui XIE, Dec 22, 2007 yihui.org
op = par(bg = "gray", mar = rep(2, 4), xpd = NA)
x = seq(0, 2 * pi, length = 16)
replicate(100, {
  for (i in 1:length(x)) {
    plot(1, xlim = c(-1, 1), ylim = c(-1, 1), axes = F, ann = F,
      type = "n")
    points(sin(x[-i]), cos(x[-i]), col = "magenta", cex = 7,
      pch = 19)
    points(0, 0, pch = "+", cex = 5, lwd = 2)
    Sys.sleep(0.05)
  }
})
par(op)
```

盯着中间的“**+**”看几秒之后，就会发现“绕圈”的那个点似乎变成绿色了。

