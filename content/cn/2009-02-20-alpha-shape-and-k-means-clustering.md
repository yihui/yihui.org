---
title: 计算Alpha Shape（与K-Means聚类）
date: '2009-02-20'
slug: alpha-shape-and-k-means-clustering
---

前几天[R-help邮件列表中有人问如何计算Alpha Shape](https://stat.ethz.ch/pipermail/r-help/2009-February/188857.html)（注：Alpha Shape可以看作是闭包Convex Hull的扩展，它可以通过调整Alpha参数计算更精细的“闭包”从而大致描述平面或空间上一群点的外形），我给了一个K-Means聚类的做法：

```r
set.seed(1234)
devAskNewPage(ask = TRUE)
par(pch = 20)
dat = iris[, 1:2]
n = nrow(dat)
for (k in 2:30) {
    ch = integer()
    cl = kmeans(dat, k, 50)$cluster
    plot(dat, main = paste("k =", k))
    for (i in unique(cl)) {
        idx = chull(tmp <- dat[cl == i, ])
        ch = c(ch, as.integer(rownames(tmp[idx, ])))
        polygon(tmp[idx, ], border = NA, col = rgb(0, 0, 0, 0.2))
    }
    plot(dat, main = paste("Polygon shape when k =", k))
    polygon(dat[ch, ], col = rgb(0, 0, 0, 0.2))  # need to be ordered
}
```

通过选择不同的k，可以逐步描述出点的外形，不过这种方法太粗略，而且最后找出来的多边形的顶点也没有排序，因此不是太好的解决方案。Alpha Shape的算法之一是用某个固定半径的圆去“套”一对一对的点，当一对点都刚好落在圆上而且圆内不包含任何其它点的时候，这两个点就是形状的边界点。通过这样的方法找出所有的边界点，便描述出了Alpha Shape。有兴趣的看官可以把这几句话转化为R代码试试。注意圆的半径是可变的参数，不同的半径对形状的描述精确程度有不同，显然当半径很大时，算法找出的就是闭包。

![Alpha Shape](https://user-images.githubusercontent.com/163582/50353864-2d0d3780-050f-11e9-81fb-2ca8c5198526.png)

写出代码的看官请不吝分享一下：）
