---
title: 厉害了我的编辑
date: '2018-06-19'
slug: copy-editor
---

大约两周前我把 [R Markdown 的书稿](https://bookdown.org/yihui/rmarkdown)发给了我的文字编辑，上周五她审阅完书稿，发给我说“我觉得就没必要给你设定死线了，因为我知道死线对你没意义”。知我者莫过于这位编辑。昨天下午我开始修订，到半夜两点修订完。

这次她用的编辑软件可以说有些没人性，修改的字词只有红色标记，我只能睁大[狗眼金睛](/cn/2017/02/eyes/)在三百多页 PDF 中逐页寻找红色的字词。有时候只是添加了一个逗号，或把 to 改成 into，这种细微的变动我得用肉眼来回扫描三四遍才能发现，难度堪比“大家来找茬”的游戏。哪怕 PDF 阅读器能提供一个修改的列表导航也会好很多，我起码知道哪一页上有修改，不用白白浪费眼力在没有修订的页面上。

不过好歹是改完了。这次我没料到的是，她竟然连我书中一些屏幕截图里面的文字都仔细看过了，而且还修订了那里面的语法问题。她一共发现了五幅图有问题：

1. 轩哥的 prettydoc 例子中的单数可数 [HTML document 没有冠词](https://github.com/yixuan/prettydoc/pull/10)。当然，用复数也可以，我给改成复数了。

1. rmdshower 包中的例子里的 your looking for [应该是 you're looking for](https://github.com/MangoTheCat/rmdshower/pull/49)。每当我看见英语母语的歪果仁犯这个错误都觉得好笑，怎么会[有那么多人](https://twitter.com/apreshill/status/1009431901990350854)分不清 your 和 you're 呢？老虎，老鼠，傻傻分不清楚。

1. pkgdown 包的首页中 go settings [应该是 go to settings](https://github.com/r-lib/pkgdown/pull/736)，漏了介词 to。

1. rticles 包中的 ACM 模板[拼错了 Machinery](https://github.com/rstudio/rticles/pull/141)。

1. tufte 包中的例子里 see Allaire (2018) more information [漏了一个 for](https://github.com/rstudio/tufte/commit/ff23ef7cc6)。

这些错误放在正文中也许会比较容易发现，但对截图来说，应该不会有人会去读里面的文字，结果这位编辑大人竟然发现这么多小问题。

要不是重新修改文字并截图，以及沧海找一粟，我估计我两个小时就能修订完。这是我跟 Chapman & Hall 出版的第四本书，我已经很熟悉文字编辑的风格和要求，所以这次她已经拿不出太多修订意见。希望有一天我能让她彻底无言以对。

这本书表面上是三人合著，但其实是我全盘捉刀（主要是因为我这人极独立，不喜欢、也不擅长大规模合作），两位合著者在这本书中真正写的部分是他们各自的自我介绍。他们成为合著者，完全是被动的：我抄了大量的现有文档，而这些文档是他们写的，所以某种程度上他们几年前就写好了这书的一部分，而我只是来把青椒、茄子和土豆做成了地三鲜。相对而言，[我还是蛮擅长也喜欢做地三鲜的](https://yufree.cn/cn/2018/06/07/r-conf-18/)。
