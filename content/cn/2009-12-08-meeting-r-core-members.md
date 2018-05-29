---
title: 最近跟R core们经常打照面
date: '2009-12-08'
slug: meeting-r-core-members
---

近来有些奇怪，有几位R core们居然给本小子写邮件，让本小子着实感到吃惊。比如，首先是Brian Ripley，这是R core中的core，前面提到过[他在R源代码中的突出贡献](/cn/2009/10/50000-revisions-committed-to-r/)，这位真人不露面、网上找不着照片的大佬，前段时间给我发封邮件说，你小子的animation包的启动消息不正规啊，因为我用`suppressPackageStartupMessages()`无法屏蔽启动消息；我一看，R里面居然还存在这么长名字的函数，顺便学习了`message()`函数，从此不再用老土的`cat()`函数了，后来考虑了一下，干脆把启动消息去掉了，`library(animation)`不会再有任何提示消息。

然后是我发现Duncan Temple Lang这位不靠谱的大叔做着一些我很喜欢的不靠谱的事情，于是乎对Omegahat心向往之，一来二去聊了聊，将来有机会一定要会一会他。

Sweave对注释的处理是要么完全去除，然后R代码会被整理整齐，要么完全保留，但R代码也保留原样，而我一直希望既能保留注释又能整理代码，这才诞生了`animation`包中`tidy.source()`函数（[在小邱聪明的技巧下](https://cosx.org/bbs/read.php?tid=14056)），前段时间想想给Friedrich Leisch，也就是Sweave的作者，发封邮件说了这个事情，打探一下是否能多设置一些Sweave选项，比如把`parse()`和`deparse()`函数以选项的形式抽象出来，这样就可以实现既整理代码又保留注释的功能了，不过大叔貌似很忙，回了一封邮件就再也没有音信了，后来由于Michael Friendly对Sweave的一些功能请求在R-help上发了邮件，我们一干人等通过Duncan Murdoch间接了解到Friedrich的确很忙，不过好消息是圣诞节过后Sweave可能会有更新，届时用户可以自行设置图形设备，不必局限在PDF和EPS。但整理代码的事情仍然遥遥无期……唉，还得用硬性Hack的方法。

Martin Maechler前面提过，看到我们开R会，说要向The R Journal交报告啊，回头再跟他谈谈明年R会议的事情。

最意想不到的是，Duncan Murdoch刚才居然给我发个邮件问问题，额滴神啊，这位大叔可是Rtools的管理者、若干个包的作者（rgl等）啊。不过大叔问的是Flash的问题，还好我知道那么一点点，算是能解决。趁此机会，干脆回问两个C语言问题，子曾经曰过：问一个够本，问两个赚一个。
