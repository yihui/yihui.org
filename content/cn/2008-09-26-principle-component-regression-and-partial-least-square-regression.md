---
title: 主成分回归与偏最小二乘回归
date: '2008-09-26'
slug: principle-component-regression-and-partial-least-square-regression
---

我一直都觉得主成分回归（Principle Component Regression，PCR）是很奇怪的方法，原因是主成分分析仅仅与自变量有关，为什么用自变量自身的协方差结构做出来的成分（Principle Component，PC）可以去和因变量作回归呢？PCA本身与因变量毫无关系，难道PC就会与Y有很好的关系？

PCR的优点（大家一般都这么说）在于PC是互相独立的，这样的话回归便不会有多重共线性的问题（大家对此感到很高兴），然而这里面潜在的危险就是，万一成分与因变量无关呢？

事实上我的这点疑虑早已经有人写过文章了，Ali S. Hadi和Robert F. Ling（1998）在The American Statistician上发表了[一篇关于PCR的警告](http://www.jstor.org/stable/info/2685559)，文章给出了一个例子，例子的现象就是，前p-1个PC跟因变量一点关系都没有，而最后一个PC解释了因变量所有的变异。奇怪么？不奇怪。作者们也这么说：原因在于PCA仅仅依赖于X，如果非要用PC的方法，那么应该考虑PC对因变量的贡献。

说白了，偏最小二乘回归（PLSR）基本上就是这个问题的答案。
