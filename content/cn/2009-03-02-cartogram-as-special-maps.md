---
title: Cartogram：变形的地图
date: '2009-03-02'
slug: cartogram-as-special-maps
---

用地图展示统计信息有一个明显的缺陷，就是各地区的面积大小可能会极大地影响你的视觉。如：北京上海面积小，但人口多，若是直接用地图的颜色或斜线密度表示人口多少，那么这些面积小的地区将会很不显眼，而事实上它们本应该是很“吸引眼球”的地方，这种情况下，我们可以将地区边界变形，使得面积和统计信息成比例。尽管你会看到一副很丑的图，但表达的信息却是被校正过的。

一个更明显的例子是美国的大选，若用红蓝标示各州的选举情况，似乎红方麦凯恩大胜了，而事实是麦凯恩获胜的州都是人口稀少的地方，总账算下来，仍然是奥巴马那小子赢了（比如他拿下了人口众多的加州）。看看以下两幅地图的对比：

[![](https://user-images.githubusercontent.com/163582/50254969-b14ba780-03b5-11e9-8e26-589225d891fd.png)](http://www-personal.umich.edu/~mejn/election/2008/statemapredbluer1024.png)

[![](https://user-images.githubusercontent.com/163582/50254989-be689680-03b5-11e9-94a7-a30644e30cb1.png)](http://www-personal.umich.edu/~mejn/election/2008/statepopredblue1024.png)

Duncan Temple Lang几年前写了一个包叫[Rcartogram](http://www.omegahat.org/Rcartogram/)，发在Omegahat上，不过不幸的是，Windows用户不能使用。它是基于一个C程序的，而这个程序里面的算法又涉及到另一个做快速傅里叶变换（FFT）的软件包，因此在Windows下编译起来很复杂（我花了很长时间也没搞清楚）。

Cartogram的一种算法可以参见"[Diffusion-based method for producing density-equalizing maps](http://www.pnas.org/content/101/20/7499.abstract)"一文。
