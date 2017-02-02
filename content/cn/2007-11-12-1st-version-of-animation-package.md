---
title: animation包：人生第一份正式英文作品
date: '2007-11-12'
slug: 1st-version-of-animation-package
---

我花了一个星期的成果终于提交了第一个版本，现在我的"animation"包已经在CRAN主站上了：

<http://cran.r-project.org/package=animation>

现在Package source和Windows binary都已经出来了。这个包完全是用R语言写的，所以每个函数都可以直接查看源代码；若有Bug请向我报告，多谢。

这个包提供了两种动画方式：一种是在R里面的图形窗口中（Windows / X Window），另一种是通过HTML页面的形式利用JavaScript调用图形“帧”，这种方式生成的结果在大部分计算机上都可以浏览，不用装R。目前包含的动画函数有：布朗运动、交叉验证、K-Means聚类、Buffon投针计算pi、抛硬币模拟概率、K最近邻（k-Nearest Neighbor）方法。有些函数如KNN方法提供了交互式操作，即：用户可以与动画交互，KNN分类中我们可以自己用鼠标在平面上点击确定测试数据集的位置，确定好测试集之后，动画函数就会开始计算判定你所点击位置的点应该属于哪种分类。

详情请参考包里的Vignette文档（写得很罗嗦）。

P.S. 下一步的工作除了添加更多的动画展示函数以外，还得考虑SVG格式，我预感这种格式一两年之内肯定会火爆起来的。尤其是在网络上，矢量图形绝对是王道（文件小、清晰、可以和计算融合）。

