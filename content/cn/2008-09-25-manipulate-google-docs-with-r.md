---
title: 用R操纵Google Documents以及其它网络操作
date: '2008-09-25'
slug: manipulate-google-docs-with-r
---

语言与软件相比缺点在于，语言的世界对初学者来说太庞大，满眼都是代码，不知从哪儿下手，但是最大的优点也就是灵活性。客官您要是问，R语言能做什么呢？据我所知的话，答案应该是计算机世界的几乎任何事情。比如，今天看见UC Davis的[Duncan Temple Lang](http://www.stat.ucdavis.edu/%7Eduncan)为R写了一个特别的包，叫[RGoogleDocs](http://www.omegahat.org/RGoogleDocs/)，它可以用来读、写、上传、删除[Google Docs](https://docs.google.com)。

顺便提一下，他写的[RCurl](http://www.omegahat.org/RCurl/)包可以用来获取或发送HTML表单（form），有了操纵表单的功能之后也就意味着，网络上大部分交互式操作都可以从R里面完成了，比如登录网站、提交日志、上传文件等等。

许久以来我想利用Socket连接写一个即时聊天的包，不过至今没有发布，其实实现起来不过二十来行代码，用base里面的`socketConnection()`函数以及读写Socket的`read.socket()`和`write.socket()`就可以完成了。我有一次在办公室两台电脑上测试了一下，嘿，还真可以。这件事情要是能结合[Simon Urbanek](http://simon.urbanek.info/)的Rserve包来做的话就更完美了，不仅可以聊文本，还可以传文件，要是再加上tcl/tk或者RGTK包来做一个界面的话，那就完全胜似QQ、MSN了，等等。感兴趣的客官要是哪天把这个想法在R里面实现了一定通知我一声（比如写了一个包叫作RICQ，意即Ah, I seek you!）。或者您有什么疯狂的主意也赶紧操起键盘联系我。
