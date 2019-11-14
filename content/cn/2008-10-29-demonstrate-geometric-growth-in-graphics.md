---
title: 几何级数增长应该怎样用图形表达
date: '2008-10-29'
slug: demonstrate-geometric-growth-in-graphics
---

今日在北大听史密斯商学院创业大赛报告，其中有一位参赛者幻灯片中提到了他们的用户数这几年呈几何级数增长，并拿用户数和时间作了一幅图，图中线条呈现出增长越来越快的趋势，其实这种做法有糊弄之嫌——增长越来越快的并不一定是几何级数增长方式。例如y = sin(x) + 1在[1.5&pi;, 2&pi;]区间上增长也是越来越快，但它并非几何级数。

表达几何级数增长（或者指数增长）的方式一般是对y取对数，然后与x作图，看图形是否呈一条直线：若log(y) = a * x + b，那么显然是指数增长方式。人眼观察直线比观察曲线要容易得多，因此这种方法比用原始数据作图要更容易表达“几何级数增长”。下图左边为原始数据，右边为y轴取对数后的图形。R中处理起来非常简单，作图时添加参数log即可（可以对x轴或y轴或者同时取对数）。

![指数增长的图示方法](https://db.yihui.org/imgur/MMM7v5X.png)

    # png("exp_growth.png", width = 600, height = 500)
    options(scipen = 5)
    x = seq(1.51 * pi, 2 * pi, length = 100)
    par(mfrow = c(2, 2), pch = 20, mar = c(5, 6, 1, 0.1),
        col = rgb(0, 0, 0, 0.5), las = 1, mgp = c(4, 1, 0))
    plot(x, sin(x) + 1)
    plot(x, sin(x) + 1, log = "y")
    plot(x, exp(x))
    plot(x, exp(x), log = "y")
    # dev.off()
