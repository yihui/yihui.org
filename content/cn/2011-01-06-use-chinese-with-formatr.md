---
title: formatR中文问题解决了（v0.1-7）
date: '2011-01-06'
slug: use-chinese-with-formatr
---

刚发布formatR包0.1-6版本，解决了几个历史遗留问题。一个是行内注释在之前的版本中都是被去掉的，现在可以用黑魔法保留了（但存在潜在的危险，但愿用户不要中奖）；二是界面内的中文字符现在也可以处理了。答案就像黄荣贵和怡轩提到的一样，用`Encoding(x) <- "UTF-8"`，但以前处理界面内的代码是先把它写到一个文件中，再用`tidy.source()`处理，估计这个读写的过程出了问题，现在`tidy.source()`可以接受一个字符向量来解析，不涉及文件读写，编码问题也就迎刃而解了。

过去总觉得编码问题很可怕，现在经历了各种诡异的错误经验之后，总算心里有了底。

标题写的版本是0.1-7，是因为刚发布0.1-6之后发现多字节字符问题并没有完全解决，编码的顺序不对（应该先编码，再拆分），这个问题[已经在0.1-7中修正](https://github.com/yihui/formatR)，过两天再发布。以下为效果图：

![formatR：R代码整容前](https://db.yihui.org/imgur/mSLO0go.png)

![formatR：R代码整容后](https://db.yihui.org/imgur/DrmGAvO.png)

又及：上次[animation 2.0-0](http://cran.r-project.org/package=animation)发布之后，有细心的用户Michael Friendly老爷子来信说Sweave演示`demo('Sweave_animation')`中的`prompt`和`continue`选项最后没有重置，又有Aquery指出帮助文档中笔误expresion为expression。对开发者来说，这都是最好的鼓励。就像这里的读者有时候指出我的错别字一样，其实也是不断锻炼我的眼力。
