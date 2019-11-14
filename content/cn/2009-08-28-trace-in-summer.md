---
title: 暑假轨迹
date: '2009-08-28'
slug: trace-in-summer
---

很久没来堆点文字，各位客官想必已经觉得此处荒草丛生了。这个暑假东奔西跑，在自家山沟沟里没网络，所以没更新，后来在别的地方每每想操起键盘写两个字，又觉得还有很多事情要做，所以迟迟未动手。再后来，不小心来美国了，初来乍到，种种事情要应付，也就更没工夫写。如今暂时尘埃落定，特向各位客官报个平安，概括这两个月的路径如下：

![洒家于暑假在地球上的轨迹](https://db.yihui.org/imgur/cYkoL3X.gif)

```r
library(maps)
x = structure(list(city = c("Beijing", "Yichang",
  "Qingdao", "Tokyo", "Seattle", "Minneapolis", "DC", "Ames"),
  latitude = c(39.908173, 30.691967, 36.066348, 35.689488,
    47.620973, 44.977482, 38.892091, 42.022864),
  longitude = c(116.397947,
    111.286471, 120.382771, 139.691706, -122.347276, -93.264351,
    -77.024055, -93.626792)), .Names = c("city", "latitude",
  "longitude"), row.names = c(NA, -8L), class = "data.frame")
library(animation)
##saveMovie({
  idx = c( 1, 2, 1, 3, 1, 4, 5, 6, 7, 8 )
  for (i in 1:length(idx)) {
    map(xlim = c(-128, 158), ylim = c(17, 54))
    text(-48, 32, x$city[idx[i]], font = 2)
    points(x$longitude, x$latitude, pch = 20, col = "red")
    if (i > 1)
        arrows(x$longitude[idx[i - 1]], x$latitude[idx[i -
            1]], x$longitude[idx[i]], x$latitude[idx[i]],
            length = 0.1, col = "gray")
    points(x$longitude[idx[i]], x$latitude[idx[i]], pch = 19,
        col = "blue")
    Sys.sleep(1)
  }
##}, moviename = "travel-in-summer", outdir = getwd(),
## para = list(mar = rep(0, 4)), width = 600, height = 100)
```

细节就不多说了。俺没有相机，所以也不上照片了，八卦的客官请自行到人人网上俺某师弟的页面上以及美国统计学会的统计计算和图形部门网站上扒拉，万一不小心扒到了请自个儿偷着乐，别吱声。

Iowa就是一片大农场，这地方，有人觉得是地狱，有人觉得是天堂。因为除了学习就是运动，没什么太多吃喝玩乐的地方。昨天俺们Dan Nordman老师说，晚上你要是觉得无聊了，不妨把讲义上的定理3拿出来证明一下，那定理还是有一定难度的（意即：可以打发足够多的时间）。

现在的生活基本上浓缩为“上课+做饭”，每天柴米油盐，做饭比学习还用功，不亦乐乎，做了几天米饭，稀饭干饭米饭丸子炸锅巴都试遍了，又跑去整了一袋面粉回来琢磨怎么蒸馒头、下面条。

咳咳，怎么一说做饭就没完了，虽然技术还很差。呃，可能是本次来到美帝，觉得资本主义国家的人都生活在水深火热中，只能吃面包夹生菜这么初级的食物，还是我中土大唐好啊，吃嘛嘛香。

最后向各位关心小的的大人们表示感谢，ISU这边有几位COS会员也给我很多帮助，还有，在这里终于见到了传说中的Rtist大人，俺们COS论坛上的老辈们应该都知道这位神一般的人物，尤其是colinisstudent童鞋，多次问我有没有见到Rtist。俺刚到这里，Rtist就为俺送来了桌子椅子，还有字帖。
