---
title: 动态连接图形（iplots包）
date: '2008-10-20'
slug: iplots-package-for-dynamic-graphics
---

用同一批数据作出的若干种图形在屏幕铺开时，连接的作用是很明显的：对一幅图形进行操作（如选择数据区域）时，其他图形会根据这幅图形上的操作相应更新，这样我们可以任意查看局部数据的性质。iplots是R里面基于Java写的一个程序包，感兴趣的看示例就行了。这里要提的是饼图：由于iplots没有给出饼图函数，所以这些动态更新的图形中不会有饼图，不过iplots提供的一些低层函数足够我们利用R自身的饼图函数pie()来实现这种功能了。以下是我的一个示例（可能有bug！）：

```r 
library(iplots)
cat("Select 'Break' from the menu of any plot to return back to R.\n")
set.seed(1)
dat = data.frame(x = rep(1:4, c(50, 100, 150, 80)),
    y = sample(rep(1:6, c(150, 50, 30, 70, 10, 70))))
ibar(dat$x)
while (!is.null(ievent.wait())) {
    if (iset.sel.changed()) {
        s <- iset.selected()
        if (length(s) > 1)
            pie(table(dat$y[s]))
    }
}
```

我估计Simon他们是故意不写饼图函数的，因为统计学家一般不推荐使用饼图——人们对角度感知太差，不如用长度或高度。
