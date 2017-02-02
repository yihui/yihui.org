---
title: 为了大一统的大一统？贝叶斯与频率学派的永久之战
date: '2010-12-17'
slug: unifying-bayesians-and-frequentists
---

到目前为止我对贝叶斯的了解仍然非常粗浅。Murray Aitkin的Statistical Inference一书是我看到的（确切地说是听到的）第二例关于试图统一贝叶斯学派和频率学派的出版物，同我第一例（Calibrated Bayes: a Bayes/frequentist roadmap，作者Little，2006）的感受一样，我觉得这种努力实际上意义不大，我不明白为什么需要大一统，所以我称为“为了大一统的大一统”。频率学派嘲笑贝叶斯学派的主观概率，其实毫无底气——所有的统计学家无时无刻不在用主观概率，只不过频率学派装作“客观”而已。只要你把脚伸进统计模型中，你就有意无意在利用主观判断。这个问题，根本不必争辩这么多年，争来争去，无非是“主观是中性词还是贬义词”。做临床试验的人恐怕是最恐惧“主观”这种词，因此似乎趋于保守、坚守经典的频率学派方法（我的印象可能存在偏差，若有误则请路过的客官纠正），这种保守是否有道理，值得思考。

上面说的“听到的”是指Gelman和Xi'an他们几个人写的一篇看似书评实为讨论的文章：[Do we need an integrated Bayesian/likelihood inference?](http://arxiv.org/abs/1012.2184) Aitkin的书被打成了马蜂窝。如果我的理解没错，Aitkin只是把似然函数翻了个面——直接看作关于参数的概率密度函数（当然需要乘以一个使得积分为1的常数），这和无信息先验分布（noninformative prior）在结果上没什么差异，只是看问题的角度不同。简单翻个面就能大一统了？恐怕不能这样吧。即使大一统有必要，也不能用这种方式去统一啊。

又说回在美帝看学术圈的感受：写书或做研究，若能避免用人造数据和老数据就尽量避免，像那种伪造的“投10次硬币得到1次正面”的数据说来玩玩可以，用作证据或例子就不合适了。这方面老板做了很好的表率，每当我拿个iris数据做演示的话，她就大叫“No, no more iris!!”。

说到贝叶斯，这两天看Dynamic Linear Models，觉得贝叶斯真是个神教组织，当年学习时间序列的那种痛苦（神马都是算子）在贝叶斯的世界根本就不存在了，这个世界果然很人本主义，思维都非常直接，遇到问题不必绕弯（神马都是分布和抽样模拟），直接闯过。Dynamic Linear Models with R这本书写得非常好，强烈推荐一下。

说到好书，溜达的时候发现有个叫Michael L. Lavine的老爷子几年前写了本书叫[Introduction to Statistical Thought](http://www.math.umass.edu/~lavine/Book/book.html)（CC协议、免费下载），粗翻了一下，觉得也写得不错，决定寒假读一读。

说到读书，仍然是溜达的时候，发现Efron这两年也在贝叶斯领域晃荡，论文[The Future of Indirect Evidence](http://www-stat.stanford.edu/~ckirby/brad/papers/2009Future.pdf)看起来也值得一读。

我的书稿，也打算在这个寒假写得差不多，不知道能否完成。越是看别人的书，就越觉得自己的书里要改进的地方太多了。
