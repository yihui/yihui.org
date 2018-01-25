---
title: 记录R画图的每个步骤
date: '2010-10-12'
slug: record-all-plot-changes
---

几年前我刚开始写[animation包](http://cran.r-project.org/web/packages/animation/index.html)的时候就遇到一个头疼问题：图形设备无法记录低层作图函数带来的**变化**。例如`png()`等设备只能在一幅新的图形产生时才会创建一个新的文件保存图形，因此对于这样一段代码，`png()`只能记录3幅图形：

```r
f = function() {
    for(i in 1:3){
        plot(rnorm(100))
        lines(rnorm(100))
    }
}
png()
f()
dev.off()
```

而动画中经常需要点或线的运动，如果只是调用低层函数的话，这些运动不会自动被图形设备记录。后来我对这个问题的解决办法是一律暴力重画，所以在源代码中处处可见这种形式的代码：

```r
#＃ 依次添加点i
for (i in 1:n) {
    plot(x, type = "n")
    points(1:i, x[1:i])
    Sys.sleep(1)
}
```

而理想情况应该是：

```r
plot(x, type = "n")
for (i in 1:n) {
    points(i, x[i])
    Sys.sleep(1)
}
```

重画不仅慢一些，而且在Linux和Mac底下图形窗口会闪，导致动画很不连贯。所以我一直在想有什么办法能让低层作图函数触发图形设备记录新的图形。直到最近才发现一个在眼皮底下多年的函数`recordPlot()`，它可以把当前图形以`list`的数据结构存起来，这样每画一幅图都可以记录一下，到最后，如果这些图形需要用图形设备生成图片文件，只需要`print()`就可以了。如：

```r
f = function() {
    x = list()
    j = 1
    for(i in 1:3){
        plot(rnorm(100))
        x[[j]] = recordPlot()
        j = j + 1
        lines(rnorm(100))
        x[[j]] = recordPlot()
        j = j + 1
    }
    x
}
# 6幅图
png()
for(i in 1:length(x)){
    print(x[[i]])
}
dev.off()
```

这样我的问题可以部分解决了。但这样似乎带来了一个新问题：存储图形需要内存；如果图形很复杂而且数量很多，那么很可能导致内存不够（这个事件发生的概率很低）。另外，这种代码写起来也不那么直接，没有很好的扩展性。罢了罢了，暂时放弃。

## 胡思乱想后依惯例跑题

我觉得樱桃小丸子的片尾曲挺有意思的，昨天晚上我听了好几遍；感兴趣的客官娃娃可以[看看](http://www.tudou.com/programs/view/gZxvUeUTzMg/)。

<embed src="https://www.tudou.com/v/gZxvUeUTzMg/&bid=05&resourceId=0_05_05_99/v.swf" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" wmode="opaque" width="480" height="400">

又及：刚才看到还[有人](http://www.xiaobean.com/427.html)也叫“中国群众大学”，我心想这该不会是从我这里看的吧，于是Google了一下，结果发现我排第5，汗，如果仅此而已就不娇客了，真正娇客的地方在，排第3和第4的是真的“中国群众大学”。世上还真有群众大学啊……我又哈哈大笑。
