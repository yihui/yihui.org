---
title: 文学化编程
date: '2014-01-03'
slug: literate-programming
---

Gelman大人[说](http://andrewgelman.com/2013/11/29/the-gradual-transition-to-replicable-science/)有人问他要一篇文章的R代码，他感到很窘，因为代码写得一团糟。于是他也在琢磨“可重复的科学”，底下Bob Carpenter评论提到代码注释问题，链接到他自己的一篇[旧博客](http://lingpipe-blog.com/2009/10/15/the-futility-of-commenting-code/)，里面谈到文学化编程：

> [...] Knuth wants programs to look more like natural language, which is a Very Bad Idea. For one, Knuth has a terrible track record, bringing us TeX, which is a great typesetting language, but impossible to read, and a three-volume set of great algorithms written in some of the most impenetrable, quirky pseudocode you're ever likely to see.

此话深得我心，是我一贯的想法，也是我第一次见人这么直白评论TeX。不明白为什么要创造以反斜杠为特征的“语言”，放眼望去齐刷刷的反斜杠，不知从哪儿开始，在哪儿结束。话说回来，我也不确定什么样的语言才是可读的标记语言，这个想想还是很有难度的。HTML凑合能接受，XML就过头了，Markdown以前说过很多次，不再评论。

文学化编程本来是为了编程和写文档两个目的而生的，想法看起来很好，但其实这两件事情都没有很方便地完成。编程通常就是代码加注释，大家都熟悉这个套路，没有人在代码之间长篇大论写文档来解释这里的代码在干什么；文档通常也是相对独立于代码的。嵌入了代码的文档或嵌入了文档的代码对于一般读者来说都不易读，所以总而言之，文学化编程本来是一个坏主意。何况最原始的文学化编程是TeX和Pascal两种语言的结合，更难有人采纳。

然而Knuth大人可能做梦也没想到，这个编程范式无意间却影响了可重复的科学研究。它不适合写代码，但适合写数据分析报告，数据分析比纯写代码有趣，因为结果经常是图文并茂，但数据分析的过程往往是一团糟，这里就是文学化编程的想法能发力的地方，代码嵌入文档中的目的不是为了单纯的编译，而是为了出结果（图表等）。代码和文档结合之后，也便于动态控制输出结果，这一点在[忍者篇](https://github.com/yihui/r-ninja)里已经罗嗦够了。原始的文学化编程的R实现，不是Sweave/knitr，而是roxygen2。

其实Knuth大人是很狡猾的，文学化编程（Literate Programming）这个名字出招见血——可能我翻译不准确，我也不知道该怎么翻译，literate是聪明的/受教育的意思，要是不用这个编程范式，意思就是你的智商堪忧（文盲？）……
