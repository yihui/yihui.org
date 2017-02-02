---
title: LyX 2.0与Sweave/pgfSweave
date: '2011-02-09'
slug: lyx-2-0-and-sweave
---

> 2013/02/05更新：本文已经严重过期，请不要模仿暗黑招数；参见[这篇日志](/cn/2010/02/misc-issues-in-latex-lyx-r-sweave-pgfsweave/)。

转眼间LyX 2.0已经陆续发布beta 1, 2, 3, 4，希望不要再发beta 5，直接出正式版吧。这回在LyX 2.0中Sweave有了内生支持，不过它自带的Sweave的缺点一大堆，前天上午本来想给LyX报告一下这些事情，结果写着写着，自个儿发现了解决办法，昏死，写了几大段道理，白写了。抄起键盘给2.0写了个Sweave自动配置脚本，仅仅在Ubuntu下测试了一下，貌似还挺好使。勇猛的Linux用户可以自行下载LyX 2.0 beta4源代码包编译安装，然后在R里运行：

```r
source('http://gitorious.org/yihui/lyx-sweave/blobs/raw/lyx2/lyx-sweave-config.R')
```

关键之处在于，Sweave从此变成了LyX的一个模块（module），对LyX了解的人都知道这样做的意义：它意味着你可以对任意文档应用Sweave，从此脱离了layout的限制。只要一个文档应用了pgfSweave这个模块，那么LyX就会认为这是个文学编程文档，从而调用R去执行文档中的代码生成LaTeX。这是最显著的进步。

其次，[我以前提过](/cn/2010/12/lyx-sweave-misc-notes/)，LyX/Sweave文档中的R代码中如果使用回车换行，那么得到的结果是代码之间会产生空行。这也是让人很不爽的一点，在2.0中也已经由 `ParbreakIsNewline` 标签解决了。这将增强格式化R代码的功能，用户可以用 `keep.source = TRUE` 来保留自己的代码格式而不必担心空行的问题。

LyX 2.0另一个牛哄哄的地方在于它终于能显示debug的信息了，这让我们可以省下不少力气去研究什么命令行重定向之类的玩意儿：直接勾上LyX菜单View --> View Messages，就可以看到整个编译的过程了，包括R里面的进度，都一清二楚，哪个代码段要是出错了立马就能知道。这给查错带来了无穷的便利。

总结一句话：牛可牛，非常牛。

近段时间发现Ubuntu下编LaTeX似乎比Windows下快很多，尤其是动画，Windows下每一页图都要编上一两秒，整个动画编出来黄花菜都凉了。另外发现animate宏包实际上已经能和`\def\input@path`一起用，所以动画文件不必写绝对路径，在LyX中就可以用了。只可惜Ubuntu中的TeXLive更新实在是太慢太慢，让我花了很长时间才意识到animate已经更新了，我的问题已经解决了；我对Ubuntu中最不满的一个软件就是TeXLive，它的宏包管理功能比MiKTeX差太远太远了。现在MiKTeX有个简单的Linux版本的宏包管理器，算是可以凑合着用吧（从源代码编译会出错，不过Google一下就解决了）。
