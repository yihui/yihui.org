---
title: R2HTML：将R对象输出为HTML文件
date: '2007-08-29'
slug: r2html-package
---

虽说HTML语言简单，而且理论上用`cat()`函数就足够写文件用了，但我觉得Eric Lecoutre写的这个**R2HTML**包还是很有价值的，轻轻松松就可以获得漂亮的网页输出。

主要函数：

- HTML()：这是个泛型函数（generic function），会根据传入参数的类型（class）自动生成相应的HTML代码。
- HTMLbr()：熟悉HTML的人一看就知道，这是换行符`<br>`。
- HTMLhr()：同上，这是水平线`<hr>`。
- HTMLInsertGraph()：顾名思义，这是插入图片，即`<img src=... >`。

其实比较好玩的是即时生成HTML的两个函数：

- HTMLStart()
- HTMLStop()

它们会记录你在R中的一系列操作，最后用框架页的形式给出类似于日志（log）的报告。

