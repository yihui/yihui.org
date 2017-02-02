---
title: 2010 John Chambers奖得主及评奖感想
date: '2010-04-19'
slug: 2010-john-chambers-winner-and-my-comments
---

早上和其他两位评委Simon Urbanek以及Hadley Wickham进行了电话会议，我们将今年的[Chambers奖](http://stat-computing.org/awards/jmc/)授给Michael J. Kane和他的[bigmemory](http://cran.r-project.org/web/packages/bigmemory/index.html)包（剧透了剧透了）。通过看今年提交的参赛作品，我觉得拿下这个奖的困难并没有想象中那么大，国内的客官们努力努力，也是很有希望获奖的（比如我相信精于C++的颜大站长能独立写出bigmemory包的概率大于95%）。此前在COS论坛上呼吁大家踊跃参加，估计大家都觉得这是天方夜谭，明年我以95%的概率不会做评委了，不过这评奖过程给我几点感想可供后来人借鉴：

1. 严格按照主办方的规则行事。主办方的评奖规则中怎么写，我们就对照这一条一条规则检查自己的作品是否都符合了要求。比如Chambers奖的规则描述是：

    > The entries will be judged on a variety of dimensions, including the **importance and relevance** for statistical practice of the tasks performed by the software, **ease of use**, **clarity of description**, **elegance and availability** for use by the statistical community. Preference will be given to those entries that are grounded in **software design** rather than calculation.

    最终评委的评分规则便根据三原则来：**重要程度和与统计学的相关程度**（多数作品都有很大的专业局限性，仅仅在自己的领域里针对某一特定模型写了软件包，不够通用，我也看不懂什么生物名词或天体物理名词）、**创新和软件设计**（想法是否足够新颖，没人做过当然最好，有人做过则要想想如何与众不同）、**易用性和文档是否清楚**（如果参赛者能多提供一些例子则会让评委更快了解你的软件，可以是录像、在线演示或动画、图形）。
	
2. 关于这些原则，如果参赛者能站在评委角度来考虑，肯定能为自己挣得不少分。也许有些作者软件写得很精妙，但缺少恰当的表现形式，所以就可能被埋没。记得有一位参赛者把自己三百多页的博士论文都发来了，满篇数学公式，想想如果自己是评委，看一篇博士论文的概率是多大呢？

    再回头看本小子去年的申请，估计很大程度上得益于本小子的动画网站，以及每个动画函数下都有例子展示，评委不用动脑子去仔细研究函数的每一个参数怎么用，只需要端着咖啡看演示就可以了。另外，本小子处心积虑套用了John Chambers那句名言**To turn ideas into software, quickly and faithfully**（我把software换成了animations），这主要是为了体现软件包与统计学思想的联系，另一方面，一眼看去这和竞赛的主题切合得甚为紧密。
	
3. 包装很重要。由此又不得不说LaTeX与Word……呃，各位把本小子看作技术愤青的大人们，这真的不是技术问题，除非是Word高手，普通人用Word做出来的任何文档的排版质量跟LaTeX一比，评论只有两个字：垃圾。没得商量。LaTeX生产出来的论文，即使内容连垃圾都不如，其形式看起来也是正儿八经能唬住人的。拿着Word写的灰头土脸的PDF文档交上来，首先给人印象就是这童鞋以95%的概率不是高手，否则怎么连LaTeX都不会用呢。

    去年我在申请的时候还没接触到LyX，所以老老实实写LaTeX源代码然后老老实实编译，而且用的是和R News文章一样的字体（这也是评委之一Hadley常用的字体），呈上去给大佬们一看，嘿，眼熟，我看这小子和R有一定关系。
    最后，这获奖者比其他选手还占一点优势，就是他在去年的JSM大会上做过Data Expo的poster，硕大的宣传板，我们三人都在那里看过，回头一想，脸熟啊。这一点呢，也和我去年类似，三位评委我见过两位，一位七分熟，一位三分熟（你煎牛排呢？），剩下一位未曾近距离接触，但我曾给他的一本书提过一处勘误。所以混圈子也是有用的。

这些不是告诉各位客官可以不劳而获或投机取巧，世上没那么多好事，而是用一个例子说明怎样小心地铺路，把自己能控制的因素都一步步做到最佳状态，剩下的事，或水到则渠成，或听天而由命……理想情况下，呔！手起刀落，砍他个人仰马翻。
