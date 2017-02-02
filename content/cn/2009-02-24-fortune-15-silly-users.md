---
title: fortune(15)
date: '2009-02-24'
slug: fortune-15-silly-users
---

有人想要在Rcmdr中导入一个CSV数据，结果用open script菜单而不知道用import data。此类问题真是很让人无语，不过地球上有一类人好像天生就是对计算机没有感觉。

当遇到这样的问题时，可以用R开个玩笑：

```r
if (!require(fortunes)) install.packages("fortunes")
library(fortunes)
fortune(15)
```

没有任何贬义啊。
