---
title: 多元情况下的描述统计
date: '2008-09-24'
slug: multivariate-descriptive-statistics
---

很多人可能都觉得描述统计简单，就是加加减减算算平均值啥的。可是问题到了多元的环境下就大不一样了，一个严重的问题就是排序，由此导致最小值、最大值、中位数等统计量都不好定义。就拿二维变量来说，怎样确定散点图中的某个点是数据的中位数？或者更通俗地讲，谁是数据的中心？一维的时候没什么争议，从最小到最大数过去，中间位置那个就是中位数。

这个题目已经有些年代了，25年前一个叫Oja的家伙讨论过了这个问题，并定义了多元情况下的统计量。最近两天R-help上面正在讨论Oja中位数，直到今天早上，有个Dortmund的家伙宣布他要写一个函数包了。

相关论文：

- [Computation of the multivariate Oja median](http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.3.2494)（只是草稿，非正式论文）
- [Multivariate analysis by data depth: descriptive statistics, graphics and inference, (with discussion and a rejoinder by Liu and Singh)](http://projecteuclid.org/DPubS?service=UI&version=1.0&verb=Display&handle=euclid.aos/1018031260)
