---
title: 为什么避免用Excel作统计计算
date: '2008-09-10'
slug: why-avoid-excel-to-do-calculation
---

今天看了[Gregor Gorjanc](http://ggorjan.blogspot.com/)的一篇小文章"[Excel 2007 for statistics?](http://ggorjan.blogspot.com/2008/09/excel-2007-for-statistics.html)"，主要是综述Excel在统计计算中的种种“罪行”。世人一向觉得Excel用起来方便（或者更多的人也许不知道这世界上还有[Open Office](http://www.openoffice.org/)或者[Gnumeric](http://www.gnome.org/projects/gnumeric/)），却不知里面各种严重问题。

其中有一段很有意思，说Microsoft在Office 2003的时候就像把Wichmann-Hill随机数发生器放进去，但是失败了（不仅会产生不在[0, 1]区间内的数字，而且会产生负值！），等到Office 2007发布的时候，这个随机数发生器还是没能被正确加入；而事实是，这个随机数发生器的代码不过是寥寥几行而已。不了解它的同志们请参考R帮助`?RNG`。


----------------------------------------我是附加题分割线----------------------------------------



我突然想起那个猴子打字问题，比如某动物园有100只猴子每天在键盘上随机乱敲，问它们在4年内是否可能敲出Wichmann-Hill随机数发生器的源代码？或者换一个问题，假设这段源代码已经由别人写好，请问这100只猴子在4年内有没有可能把它正确插入到Excel的源代码中？


---------------------------------------------片尾广告---------------------------------------------



广告时间到了：[生物统计和生物多样性数据分析培训班](http://peixun.ibcas.ac.cn/shengwufx)。11月我将去香山讲两天R语言，这次有望大力推进一步R在国内的发展。
