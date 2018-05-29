---
title: animation v2.0-0：告一段落
date: '2010-12-30'
slug: animation-v2-0-0-freezing
---

好了，一整周时间，85次更新，干脆把animation包推向2.0-0版本。近段时间不会再大动了，余下的工作仅仅修改bug。现在包中有18个演示（demo），内容可谓乱七八糟，包括去年湖人和骑士的圣诞大战“回放”（ `demo('CLEvsLAL')` ，就是篮球场上整场比赛的投篮动画）、主伟呈贡献的烟花演示（ `demo('fireworks')` ）、焦静贡献的圣诞雪花（ `demo('Xmas2')` ），还有颜大站长以前贡献的象棋跳马（ `demo('jumpingHorse')` ，这是有背景故事的）和汉诺塔（ `demo('hanoi')` ）等等。

SciAnimator前两天更新增加了键盘控制动画的功能，现在`saveHTML()`的结果就更像个影音播放器了（比如空格暂定、左右箭头导航等）。

往Sweave中动态添加动画在`demo('Sweave_animation')`中给了例子。

rgl的3D动画也可以被轻松抓进来了，参见`demo('rgl_animation')`。总之，你能想到的能动的玩意儿，现在几乎都能抓进animation的框架，无论是输出为HTML页面，还是GIF，还是Flash，还是LaTeX/PDF。同样，源代码和Windows二进制文件可以[从开发页面上下载](https://github.com/yihui/animation)。

明天起开始回邮件，写文章，写书，干老板的活（嗨，看我这顺序安排的……）。计划先在统计之都主站写一篇“如何像个忍者一样写R包”（roxygen、Emacs、R包高阶概念如命名空间等），像上次的Sweave介绍一样，可能需要一小时阅读，但实践起来只是三五分钟的事情。不过这到底是忍者（ninja）呢，还是武士（samurai）？

之所以想起Samurai，是因为几天前吃饭时想起小时候看的一部动画片《魔神坛斗士》，也就是仁义礼智信忠孝悌忍那一套，突然看到英文翻译是[Yoroiden Samurai Troopers ](http://en.wikipedia.org/wiki/Ronin_Warriors)。

又及：你看日本动画片多么懂得融合中国传统文化。

再及：[COS论坛上这个帖子](https://cosx.org/cn/topic/103299)应该载入史册。

再再及：早上我在R-help里问CRAN的管理员是不是度假去了，Uwe说，“Yes, sometimes even Kurt is out of office.” Peter看到了说，嗯，这句话应该载入史册（即[fortunes](http://cran.r-project.org/web/packages/fortunes/index.html)包）。
