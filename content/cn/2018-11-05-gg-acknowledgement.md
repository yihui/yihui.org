---
title: 图形语法、哥哥作图以及令人生疑的致谢
date: '2018-11-05'
slug: gg-acknowledgement
---

两年前我看见[蚂蚁金服可视化团队做的的 G2](https://github.com/antvis/g2) 时，心里就掠过一丝疑问。它的首页用醒目的文字写着：感谢 Leland Wilkinson 的图形语法（Grammar of Graphics）一书，它奠定了本软件的基础。

![G2 对图形语法的致谢](https://user-images.githubusercontent.com/163582/48026349-6cbcc300-e10b-11e8-881d-8721945a4bc9.png)

我的疑问是，G2 的作者们真的是直接接触到这本原著而萌发的写一套软件的想法吗？显然客官们知道我想说的是什么。图形语法一书出版于 1999 年，我斗胆猜测，要不是哥哥作图（ggplot2）对这套语法的惊人软件实现，这本书至今应该还在多数图书馆角落里继续攒灰。以下是这本书和 ggplot2 的[谷歌搜索量对比](https://trends.google.com/trends/explore?date=all&q=%2Fm%2F06djfgz,ggplot2)，有压倒性优势的红线是 ggplot2，那匍匐前进的蓝线就是 Wilkinson 的书。

![The Grammar of Graphics 与 ggplot2 的谷歌搜索量](https://user-images.githubusercontent.com/163582/48025806-04b9ad00-e10a-11e8-93b6-04bf063f3042.png)

所以说在致谢中只提这本书，而不提 ggplot2，我认为有不实诚的嫌疑。当然，我只能说有嫌疑，万一作者真的是没听说过 ggplot2，而就是在某藏经阁中发现这本易筋经而练就了绝世武功呢。

我之所以想起这件事，是因为前几天又发现一个惊人相似的致谢。微软也开始开发一个可视化的包，叫 chart-parts。它的[介绍第一节](https://microsoft.github.io/chart-parts/documentation/introduction)就赫然挂着图形语法书的封面图片，然后说它是自己的根基。

![chart-parts 对图形语法的致谢](https://user-images.githubusercontent.com/163582/48026405-9c6bcb00-e10b-11e8-887a-fb0f97bf784b.png#border)

我仍然觉得这不太实诚。缺乏自信的人总喜欢用一套看起来高深的理论体系给自己撑门面，因为世人总觉得理论高于实践和实现。如果说自己的软件受 ggplot2 启发，则让人感觉这只不过是图形语法的孙子；而如果说自己的软件直接诞生于图形语法，那么就是儿子了。其实我翻了一下它提到的 Vega、Vega-Lite 和 Altair，三者没有一人提这本书（至少是不醒目，我翻了一下它们的文档都没找到这本书的痕迹）。

这让我想起郭德纲的名言：只有同行之间才是赤裸裸的仇恨。我就整天如此[小人之心](/cn/2017/05/little-mind/)。
