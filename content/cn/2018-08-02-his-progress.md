---
title: 壮士的进步
date: '2018-08-02'
slug: his-progress
---

上周在审阅[谭显英壮士](/cn/2018/03/copss-5/)的一则 DT 补丁时，发现[他开始](https://github.com/rstudio/DT/pull/576/commits/0bcf6d937b1)萃取重复代码并考虑使用有具体含义的变量名了，看样子是受了[上次](/cn/2018/04/tmp/)我举变量命名例子的影响。他将这两行代码

```js
var content = $(thiz.api().cell(row, col).node()).html();
$(thiz.api().cell(row, col).node()).html(prefix + content + suffix);
```

改写为

```js
var cell = $(thiz.api().cell(row, col).node());
cell.html(prefix + cell.html() + suffix);
```

不亦清爽哉。
