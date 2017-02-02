---
title: Netflix Prize（百万美元大奖）数据预处理的一个简单R程序
date: '2007-08-14'
slug: deal-with-netflix-prize-data-with-r
---

不知道这样一个程序要跑多久：

```r
files = list.files("training_set", full.names = T)
writeLines("movieID,customerID,Rating,ratingDate,movieReleaseDate",
   "training_set.csv")
for (i in 1:17770) {
   x = read.csv(files[i], F, skip = 1, as.is = F, stringsAsFactors = F)
   x = cbind(i, x, read.csv("movie_titles.txt", F, nrows = 1,
       skip = i - 1, as.is = F, stringsAsFactors = F)[1, 2])
   write.table(x, file = "training_set.csv", append = T, sep = ",",
       row.names = F, col.names = F, quote = F)
}
```

当我没加入第7~8行的`read.csv()`那一句时，程序在WinXP+奔四3.0GHz+512M内存下跑了47分钟把一个2G多的CSV数据文件写完了。不过等我用SQL语句去读其中一列时，发现内存终于不够用了。

[Netflix的奖金](http://www.netflixprize.com)是$1,000,000，呃，这么大一堆钱，做做梦吧。莫非这个奖还要比拼各家的计算机配置？国内啥时候能有这样的悬赏啊？

