---
title: Java比R更容易表达连续型动画
date: '2008-10-19'
slug: java-is-better-than-r-in-animation
---

话说我做动画的难题之一就是不容易做连续型动画，即连续表示元素的运动。今天在看[高尔顿板的模拟](http://www.ms.uky.edu/~mai/java/stat/GaltonMachine.html)时，突然意识到，这类问题应该交给Java去解决，而不要在R里面纠缠了。不过由于不太会用Java画图，所以只好继续凑合着用R了，下面是一个初步的模拟：

![](https://db.yihui.org/imgur/KazR8Ip.gif)


这个模拟目前已经放到[AniWiki](http://animation.yihui.org)中（[链接](http://animation.yihui.org/prob:bean_machine)）；看了维基百科，原来高尔顿板又称豌豆机器。本豌豆机器的启发来自于Roger Koenker提供的一个[原型](http://www.econ.uiuc.edu/~roger/courses/476/routines/quincunx.R)。
