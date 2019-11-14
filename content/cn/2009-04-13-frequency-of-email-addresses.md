---
title: 邮件地址的频数统计
date: '2009-04-13'
slug: frequency-of-email-addresses
---

受Zhang H.启发，自个儿看了看Gmail邮箱的联系人，导出为Outlook的CSV格式，然后读进R，用正则表达式去掉*@部分，table()了一下。Hotmail邮箱的频数比我想象的要高，然后也没想到中科院植物所也排在前面，估计是那次R会议所致。剩下的联系人就分布在五湖四海了，结果请看：

![](https://db.yihui.org/imgur/g6Bh4XF.png)

[CSV频数文件下载](https://github.com/yihui/yihui.github.com/releases/download/latest/email-frequency.csv)

```r
x = read.csv("contacts.csv", stringsAsFactor = FALSE)
y = gsub("^.*@", "", x$E.mail.Address)
y = sort(table(y))
```
