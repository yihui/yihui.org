---
title: 显示beamer幻灯片中的图形和表格编号
date: '2010-08-22'
slug: show-caption-numbers-in-beamer
---

不夸张地说，我看过的**几乎所有**人的beamer幻灯片都有一个明显的问题：图形和表格的编号缺失了。也就是它们看起来是这样：

> Figure: 标题内容

或者

> Table: 标题内容

在（挑剔的）我看来，这是难以容忍的缺陷。图表怎么能没有编号呢？既不好看，又不方便交叉引用。beamer自身默认图表是没有编号的，如果需要把编号调出来，只需要在导言区加上：
    
```tex
\setbeamertemplate{caption}[numbered]
```
