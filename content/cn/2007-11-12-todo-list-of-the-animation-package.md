---
title: 关于动画包接下来要做的几件事情
date: '2007-11-12'
slug: todo-list-of-the-animation-package
---

这几天不能继续写这个包了，先把预想的几件事记录在此，欢迎有兴趣的朋友们根据我的想法贡献代码。

包中要增加的函数（与动画无关的杂项）：

1. 动态生成Highlight软件的R定义文件，很简单，结合ls()函数即可。参见[这里](/en/2007/09/r-language-definition-file-for-highlight/)。
2. 根据一个文本文件自动创建RSS feed文件，这也很简单，因为XML的语法非常容易，略懂tag即可。
3. 重命名文件。比如对一批照片重命名为***1、***2、……，利用file.rename()即可。

与动画有关的函数：

1. Boosting的过程图示，如AdaBoost等。
2. Bootstrap。这个我其实已经写得差不多了，但我并不满意，打算重写，参见[这里](http://r.yihui.org/stat/machine_learning/bootstrapping/index.htm)。
3. CART。展示一个二维情况下搜索节点的过程。
4. Arcing。暂时没想好。
5. 随机梯度下降寻找线形分割直线。
6. 最速梯度下降。一维和二维情况。
7. Newton系列的优化算法。
8. 中心极限定理。
9. 回归分析中的诊断（离群点、杠杆值等）。
10. 置信区间的展示。参见[这里](/en/2007/10/demonstration-of-confidence-intervals-using-r-animated/)。
11. 四种基本抽样。参见[这里](http://r.yihui.org/stat/sampling_survey/index.htm)。

暂时就这些。现在开始干别的活儿了……另：今天拿到了我精心挑选的42本英文书，旁边书柜一层码满了，以后有的看了。

