---
title: 以其人之道
date: '2009-03-08'
slug: smart-trick-to-tidy-r-source
---

前段时间[在论坛上发了一个帖子征求美化R代码的解决方案](https://cosx.org/cn/topic/14056)，小邱同学不辞辛劳写了一个tidy.source()的改进版本，而昨日他突然灵光乍现（大家快出来看上帝！），想到一个绝妙的解决方案，令我心中好一阵欣喜。哇哈哈哈！

总结起来就是这么一句话：以R之道，还施彼身。

我们来看看效果；整容前：

```r
# 画个渐变多边形
y=0.1+runif(20,0.2,1)
xx=c(1,1:20,20);yy=c(0,y,0)
plot(xx,yy,type="n",xlab="x",ylab="y")
# 多边形的高越来越小，颜色越来越红
for(i in 255:0){
yy=c(0,y-(1-i/255)*min(y),0);polygon(xx,yy,col=rgb(1,i/255,0),border=NA)
# 停一会儿看看清楚
Sys.sleep(0.05)           }
```

整容后：

```r
# 画个渐变多边形
y = 0.1 + runif(20, 0.2, 1)
xx = c(1, 1:20, 20)
yy = c(0, y, 0)
plot(xx, yy, type = "n", xlab = "x", ylab = "y")
# 多边形的高越来越小，颜色越来越红
for (i in 255:0) {
    yy = c(0, y - (1 - i/255) * min(y), 0)
    polygon(xx, yy, col = rgb(1, i/255, 0), border = NA)
    # 停一会儿看看清楚
    Sys.sleep(0.05)
}
```
