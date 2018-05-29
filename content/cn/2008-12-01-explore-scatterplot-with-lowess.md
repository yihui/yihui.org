---
title: 局部加权回归散点平滑图示
date: '2008-12-01'
slug: explore-scatterplot-with-lowess
---

在Frank Harrell强调LOWESS的重要性之前，我没有意识到它的作用。从德国回来之后，在John Maindonald的书上再一次看到了用LOWESS观察散点图的例子，这下子才渐渐有了感觉。

统计就是以糟蹋数据为代价获取汇总的信息，这个汇总往往是全局的（global）；统计容易受人诟病的部分原因也在于此。一个均值就能代表全体数据？一条回归直线就能代表两个变量之间的关系？这种怀疑绝对是底气十足的，确实命中了统计糟蹋数据的那一面。因此，我们需要仔细品味数据，局部方法对此便是一种补充。上周在COS主站上发了一篇例子：[用局部加权回归散点平滑法观察二维变量之间的关系](https://cosx.org/2008/11/lowess-to-explore-bivariate-correlation-by-yihui/)；感兴趣的客官不妨看一看。
