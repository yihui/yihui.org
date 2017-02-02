---
title: 问！积极地问！不耻上问！
date: '2008-06-19'
slug: ask-people-actively
---

当今这世道，单枪匹马地干是下策。遗憾的是我经常这么干，常常是劣性难改。大约一周前，我遇到一个看起来很简单自己却无法解决的Flash技术问题，就是把PDF转为SWF动画时，[SWF Tools](http://www.swftools.org/)无法设定帧频率（frame rate），而其它格式的文件转SWF全都可以设定。我第一反应是：下载源代码，找！找了半天晕头转向（世上最痛苦的事情莫过于阅读源代码），加上SWF和PDF的基础知识我都没有，更是无从下手。然后就往邮件列表发了[一封邮件](http://lists.gnu.org/archive/html/swftools-common/2008-06/msg00066.html)，等了一个星期，终于看见[有人提供了答案](http://lists.gnu.org/archive/html/swftools-common/2008-06/msg00071.html)。原来这个功能已经有了，但是还没有被写到文档中去。

这样的话就方便多了，我可以把animation包中的`saveSWF()`函数改了；更重要的是，用PDF制作出来的Flash比用位图格式（PNG、JPEG等）文件制作的Flash要小很多，而且PDF的矢量性让Flash拥有足够的清晰度，这一点实在是太棒了。
