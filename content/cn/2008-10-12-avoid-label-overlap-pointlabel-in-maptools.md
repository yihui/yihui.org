---
title: 避免文本标签重叠：maptools中的pointLabel()
date: '2008-10-12'
slug: avoid-label-overlap-pointlabel-in-maptools
---

**maptools**包中的`pointLabel()`可以利用模拟退火算法或者遗传算法来解决图中文本标签的重叠问题。R本身提供了度量文本高度和宽度的函数`strwidth()`和`strheight()`，因此标签的放置问题本质上就是一个最优化问题，目标函数是标签所占矩形之间重叠面积之和，参数是标签的摆放位置（例如矩形的顶点坐标），问题就是求得参数使目标函数最小化。`pointLabel()`采用了模拟退火算法和遗传算法，另外，**plotrix**包中的`thigmophobe.labels()`利用简单的距离计算可以得出标签摆在点的下、左、上、右哪一面可以使得重叠最小化。以下是前面“[用R画中国地图并标注城市位置](/cn/2008/10/china-map-and-city-locations-with-r)”一文中曾经用到的例子，这里我们用`pointLabel()`添加标签：

![maptools中的pointLabel()添加文本标签](https://db.yihui.org/imgur/pRQqX.png)

相比之下，`thigmophobe.labels()`的功能就差一些了：

![plotrix中的thigmophobe.labels()添加文本标签](https://db.yihui.org/imgur/JKmUh.png)

