---
title: LyX、Sweave杂记
date: '2010-12-06'
slug: lyx-sweave-misc-notes
---

> 注意：本文中介绍的Sweave相关内容已经过期，请参见[LyX/Sweave手册](https://github.com/downloads/yihui/lyx/sweave.pdf)和[LyX/knitr手册](https://github.com/downloads/yihui/lyx/knitr.pdf)。

LyX 2.0的layout文件中将正式引进一个新标签`ParbreakIsNewline`，它让我过去的一个工作变成了废物，即：如何在代码块中回车换行，而不是Ctrl回车来换行。这种事情还是靠开发者从源头上解决比较好，民间技巧毕竟不是长久之计。

Sweave支持一个`\SweaveInput{}`命令，话说我用了这么久，完全没有意识到有这么个东西的存在。今天偶然发现，还是从LyX 2.0的sweave.module中看到的。Google之，无文档无说明。气煞我，我老早就在琢磨是否能将Sweave文档像LaTeX那样用`\include{}`分成几个小文档，原来这东西早就存在了。然后，又是不理解，为什么Leisch老大设计Sweave的时候总是喜欢发明一些新命令，你去解析`\include{}`命令不是挺好的么，干嘛又发明一个`\SweaveInput{}`。就像`\Sexpr{}`和`\SweaveOpts{}`一样，都是些伪LaTeX命令，我总觉得不优雅。

看了一下LyX的InsertLayout的用法，挺好的，早该看而没看的东西。

因为想写个包的文档，所以又回头看了看上次写的自动配置LyX和Sweave的脚本，左看右看觉得死板，于是乎又花了一天时间改写了一下。现在萝卜青菜，愿意吃啥吃啥了，把R执行的部分抽象出来单独放在一个文件中，如果将来想做新的配置，只需要在外部改这个R代码就可以了，从LyX彻底独立了出来。

```r
source('http://gitorious.org/yihui/lyx-sweave/blobs/raw/master/lyx-sweave-config.R')
```

命令行环境的细节真是能淹死人，今天才知道原来Windows的命令行窗口中，尖尖符号`^`是转义符；不懂它为啥要特立独行，人家都用反斜杠`\`转义。

现在的工作基本上全面转向Git；各大支持Git的网站中，可能GitHub是最好用的，大大提高了程序开发效率。尤其是其代码行内评论的功能，很是方便交流。有了[前面介绍的Rd2roxygen包](/cn/2010/12/rd2roxygen-to-convenient-r-documentation/)之后，开发R包也轻松多了，基本上就是在Emacs里`C-c C-o`，完事之后终端打开R，运行一下两句代码的事情：

```r
library(Rd2roxygen)
rab('your.pkg')
```

现在再加上LyX/Sweave这把刀也磨好了，于是写Vignette也不在话下。人挡杀人，佛挡杀佛。最终有了勇气把那些塞到犄角旮旯的老R包都捡出来，继续开发。上周[animation](https://github.com/yihui/animation)和[formatR](https://github.com/yihui/formatR)分别更新了新版本；Rd2roxygen也放了新版本（为了更加懒惰）；老早以前的那个[fun包](https://github.com/yihui/fun)也复活过来，再把文档整理一下，大概也是可以正式发布的。怡轩还翻出了另一个老想法：在R中原生支持生成Flash动画。现在已经完成了从PNG图形到SWF的转换，所有结果都在一个[新包R2SWF](https://github.com/yihui/R2SWF)中（将来也许会合并到animation中）。

## 外一篇：羊群效应

最近两天[COS论坛](https://cosx.org/cn/)上出现了一个典型的羊群效应：某一只新“羊”发帖以“急”开头，后来得到了回答，该羊可能便认为“急”是有用的，于是就每个帖子都来“急”一下；后来又来了一只羊，发帖以“ASAP”（越快越好）结尾，后来得到了回答，于是该羊也不假思索发帖一律加上ASAP结尾；又来了些新羊，大家看前面都是急帖，于是都跟着急。整个论坛就这样急起来了。有好事者问了一下其中一只羊，为啥要ASAP呢，结果发现事实不是ASAP。本来我就对急帖心存反感，一问还不是真的急（就像听了个狼来了的故事），这以后旁观者到底还该不该急呢？
