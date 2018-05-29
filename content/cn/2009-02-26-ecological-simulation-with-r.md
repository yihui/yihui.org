---
title: 啊（R），辽阔的非洲草原！（一个生态模拟）
date: '2009-02-26'
slug: ecological-simulation-with-r
---

很久以前，某同学问我，为什么R语言要叫R呢？我回答：因为它总是让人发出一声“啊！”。譬如，“啊，R语言真TM难学”，或“啊，R语言真神奇”，等等。啊，我今天在论坛上看见[一个生态模拟的例子](https://cosx.org/cn/topic/14093)，便为发帖者编撰了如下场景：

```r
ecol.simu = function(nr = 10, nc = 10, col.sp = c(1, 2),
  pch.sp = c(1, 2), col.die = 1, pch.die = 4, cex = 3,
  nmax = 50, interval = 1) {
  x = rep(1:nc, nr)
  y = rep(1:nr, each = nc)
  par(ann = FALSE)
  p = sample(rep(1:2, nr * nc/2), nr * nc)
  for (i in 1:nmax) {
    plot(1:nc, 1:nr, type = "n", xlim = c(0.5, nc + 0.5),
        ylim = c(0.5, nr + 0.5))
    abline(h = 1:nr, v = 1:nc, col = "lightgray", lty = 3)
    points(x, y, col = col.sp[p], pch = pch.sp[p], cex = cex)
    Sys.sleep(interval)
    idx = sample(nr * nc, 1)
    points(x[idx], y[idx], pch = pch.die, col = col.die,
        cex = cex, lwd = 3)
    tbl = as.vector(table(p))
    tbl = tbl + sign(p[idx] - 1.5) * c(1, -1)
    p[idx] = sample(1:2, 1, prob = tbl)
    Sys.sleep(interval)
  }
  p
}
par(mar = c(3, 3, 1, 1))
# 一步一步来
ecol.simu()
# 对于急性子和眼力好以及计算机速度快的同志，试试这个暴力模拟
ecol.simu(col.sp = c(8, 2), pch.sp = c(20, 17), nmax = 1000,
  interval = 0.05)
```

大意是：有两种物种，每次随机死一个，后继者的概率为生者的比例。

