---
title: rgl英勇奖
date: '2008-10-11'
slug: rgl-medal-of-valor
---

话说近日Michael Friendly老爷子很郁闷，因为从R-forge上下载的rgl包中`rgl.snapshot()`函数不能用了，老是说"failed"，不能保存图形。我也遇到了同样的问题，不过后来Duncan提供了一个[新的下载地址](http://www.stats.uwo.ca/faculty/murdoch/temp/rgl_0.81.708.zip)，我下载之后发现可以用了，于是回了个邮件说问题解决了、表示感谢。今天Michael老爷子很高兴，给我回邮件说谢谢益辉同学啊，我还以为我自己的电脑坏掉了呢，寡人对你的大无畏测试精神很是感激，特授予你“rgl英勇奖”！（[这里是颁奖现场](https://stat.ethz.ch/pipermail/r-help/2008-October/176451.html)）

> ...and your test helped me slay the fear that something had gone horribly wrong with my desktop PC. ?I award you the _rgl Medal of Valor_. ;-)...

Michael是统计图形界的大牛，获此口头奖章本小子也很是高兴。后来他另写一封邮件说，小贼（第一声），大爷受你在不莱梅演讲的启发，近日[也开始玩动画](http://euclid.psych.yorku.ca/SCS/Gallery/Test/rgl-animations.ppt)了。

话说回来，rgl这个包牵涉到大量的C和C++代码，还有png库，编译起来很麻烦，R-forge的环境可能不能成功编译，所以那上面的rgl包会有问题，我还奇怪为什么它没有编译日志呢。
