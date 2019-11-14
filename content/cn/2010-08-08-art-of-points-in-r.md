---
title: 随机艺术一则：用R画点
date: '2010-08-08'
slug: art-of-points-in-r
---

李丰同学建议在《现代统计图形》书稿中插入一些彩蛋，我想第一颗蛋就用这些杂乱无章的彩色点线吧。不过小的实在拿不定哪一幅图看着更“艺术”一些，因此请路人帮忙挑选一下。下图只是众多可能的随机图中的一幅，更多图形请运行下面的完整代码。挑好之后把图中的起始数字告诉小的，小的会在书稿的致谢部分说明您的贡献。

![用随机大小和颜色画点](https://db.yihui.org/imgur/Cf9DY.png)

如果客观关心这些图是如何画出来的，这里有代码有真相：

```r
devAskNewPage(TRUE)
par(mar = c(0.2, 0.2, 0.2, 0.2), mfrow = c(2, 2))
for (n in 41:200) {
    set.seed(711)
    plot.new()
    size = c(replicate(n, 1/rbeta(2, 1.5, 4)))
    center = t(replicate(n, runif(2)))
    center = center[rep(1:n, each = 2), ]
    color = apply(replicate(2 * n, sample(c(0:9, LETTERS[1:6]),
        8, replace = TRUE)), 2, function(x) sprintf("#%s", paste(x,
        collapse = "")))
    points(center, cex = size, pch = rep(20:21, n), col = color)
    box()
    text(0.5, 0.5, n)
}
```

## 用作桌面

如果有客官想用这样的图形作桌面的话，也不是件难事：用png()设备把图形记录下来，然后将图形文件设为桌面即可。以我的显示器为例，我的分辨率是1366x768，那么：
    
```r
# 为了保证高质量的PNG图片，这里用附加包cairoDevice
# 如果读者对图片质量要求不高，也可以用R自带的png()设备
# 即png("points-desktop.png", width = 1366, height = 768)
library(cairoDevice)
Cairo_png("points-desktop.png", width = 13.66 * 1.39,
    height = 7.68 * 1.39)
par(mar = c(0, 0, 0, 0))
n = 76
set.seed(711)
plot.new()
size = c(replicate(n, 1/rbeta(2, 1.5, 4)))
center = t(replicate(n, runif(2)))
center = center[rep(1:n, each = 2), ]
color = apply(replicate(2 * n, sample(c(0:9, LETTERS[1:6]),
    8, replace = TRUE)), 2, function(x) sprintf("#%s", paste(x,
    collapse = "")))
points(center, cex = size, pch = rep(20:21, n), col = color)
dev.off()
```

这样，我们打开文件`points-desktop.png`（它在当前工作目录下`getwd()`），设定为桌面就可以了。

