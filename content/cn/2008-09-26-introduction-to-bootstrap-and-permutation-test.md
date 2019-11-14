---
title: Bootstrap方法和置换检验（Permutation Test）的入门读物
date: '2008-09-26'
slug: introduction-to-bootstrap-and-permutation-test
---

今天偶然发现[一个文档](https://pdfs.semanticscholar.org/a964/bc18aabbbd1c507168f3835a54a2f2cab3cd.pdf)，非常适合 Bootstrap 和 Permutation Test 的初学者读。主要是里面内容非常生动活泼，公式的面积一般不超过 10 平方厘米。而我一般是很不爱看包含有面积大于 20 平方厘米或者希腊字母超过 5 个的公式的论文或书籍的。顺带提一下，这是 Introduction to the Practice of Statistics 第五版中第 14 章。

~~这次请路人帮忙的事情是，这一章中提到了用Bootstrap方法不断计算光滑曲线，用来说明彩票的趋势并非纯粹偶然。我觉得这个例子举得不错，因此想把它的动画形式写入我的animation包，可以命名为boot.loess()，就用R里面的loess()函数去拟合局部多项式回归好了，每次Bootstrap就用圈圈把抽中的点标示出来，以及添加相应的平滑曲线。这个动画应该很容易做，有志愿者速速报名。报名之前请仔细阅读[animation包的文档](http://animation.yihui.org/animation:start)以及我对[独立同分布数据进行Bootstrap的展示函数boot.iid()](http://animation.yihui.org/dmml:bootstrap_i.i.d)。~~已经大致在[animation包的2.0-4版本](http://cran.r-project.org/package=animation)中实现，参见`boot.lowess()`函数。
