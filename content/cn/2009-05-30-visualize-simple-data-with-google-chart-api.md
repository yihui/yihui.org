---
title: 用Google Chart API展示简单的数据以及WordPress示例
date: '2009-05-30'
slug: visualize-simple-data-with-google-chart-api
---

[![Venn Diagram by Google Chart API](https://chart.apis.google.com/chart?cht=v&chs=100x100&chd=t:10,10,10,5,5,5,3)](/cn/2009/05/visualize-simple-data-with-google-chart-api/)

Google Chart API是很老的产品了（下文简称GCA），以前隐约听说过这么个东西，只是没觉得什么地方能用上，如果仅仅是单幅图形，还不如自己用软件画出来，而且自己画图比用GCA要方便灵活许多。这两天琢磨着网页里面有些简单的数字该如何显示给读者，比如几乎所有人的博客上都会显示阅读次数、评论条数等数据，这些数据是动态的，所以不适合静态图形展示，因此又想起GCA。简单来说，GCA就是用网址传递数据给Google的某个画图程序，Google画完之后把图形以PNG形式返回给你，你可以在网页中尽情使用。由于数据包含在网址中，因此很容易通过动态网页程序（如PHP）生成数据并写出网址。

## 1、从访问数和评论数生成Venn图

作为一个简单应用，我把原本枯燥的三个数字“用户（user）阅读次数”、“机器人（bot，网络爬虫）浏览次数”和“评论（comment）条数”用Venn图展示在每个条标题下的信息栏中了。对于学过与集合有关的课程（如概率论）的人来说，Venn图几乎是第一节课就会接触到的东西，它直观表明了几个集合之间的关系，如交集与并集。前面的三个数字中，user和bot交集为空，而user与comment的交集为comment，因为凡是发表评论的人必然要打开页面阅读。

Venn图的主要参数是7个数字，依次说明各个集合的大小：A, B, C, A∩B, A∩C, B∩C, A∩B∩C。这7个数字传给数据参数`chd`即可，如：
   
    https://chart.apis.google.com/chart?cht=v&chs=300x300&chd=t:100,80,60,30,25,20,10

生成图形：

![Venn Diagram by Google Chart API](https://chart.apis.google.com/chart?cht=v&chs=300x300&chd=t:100,80,60,30,25,20,10)

需要图例的话，用`chdl`添加即可（用`chdlp`控制图例位置）。

我使用了WP PostViews Plus插件来记录阅读次数，用`the_views()`相关函数以及WP自己的函数`comments_number()`即可获得上面三个数据，`echo`到URL中，一幅图形就产生了。具体代码如下：

```php
<?php
if (function_exists('the_views')) {
  echo '<li><div align="center">';
  echo '<img src="https://chart.apis.google.com/chart?cht=v&chd=t:' .
  	the_user_views('',false) . ',' . the_bot_views('',false) . ',';
  comments_number('0','1','%');
  echo ',0,';
  comments_number('0','1','%');
  echo ',0,0';
  echo '&chs=150x100&chdl=user|bot|comment&chdlp=b"
   alt="venn diagram: the number of user views, robot views and comments"
   title="venn diagram: the number of user views, robot views and comments"
   width="150" height="100"
   onerror="setInterval(\'this.src=this.src;\',1000);" /></div></li>';
}
?>
```

由于天朝对Google素来不友好，那伟大的墙无处不在，连这个图形API都可能被殃及，因此图形会间或性抽风显示不出来，我只好凑合着加了一句`onerror = "setInterval(\'this.src = this.src;\', 1000);"`，但发现基本上是自己一厢情愿的想象。如果遇到图形无法显示的时候，请刷新页面或点右键显示图形。

## 2、解读Venn图

这三个圈圈有神马好看的呢？稍微想一下也就知道了：

* 如果**机器人的圈圈**比**活人**还大，那么这篇博客可能受活人冷落，平时只有网络爬虫来瞧瞧，如果你坚持要看这篇文章，那么你可以被定义为人类的离群点

* 如果评论的圈圈显得非常大，那么应该是一个火爆话题，如果哪天**蓝圈圈**和**橙圈圈**一样大了，那么**赶快去叫你的娘子出来看上帝**吧

说了这么多，其实意义不太大，只是介绍一个工具，如果哪天你到了一个没有任何作图工具的裸机上而又需要用饼图向领导汇报工作的时候，那么不妨试试这个tooooold的Google Chart API。

## 3、关于Google Chart API的延伸

有程序开发癖的同志们看到这个东西也许会想，这玩意儿完全可以写一个PHP类或者R函数啊，前者似乎已经有人做过了，不过我瞅了一眼，貌似需要`urlencode()`一下；至于后者嘛，有了R干嘛还要Google Chart啊，不过这个API里面还是有几种图形在R里面不方便实现的，比如那个仪表和QR条码，如果有谁做了这件从R到Google Chart API的转化工作，请勿忘到这里来吼一声，让我知道我好去膜拜啊。
