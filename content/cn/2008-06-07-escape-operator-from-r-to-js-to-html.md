---
title: 转义符：从R到JavaScript到HTML
date: '2008-06-07'
slug: escape-operator-from-r-to-js-to-html
---

每种语言都有自己的特殊字符，比如引号、反斜杠等，当我们需要把这些字符当作普通字符使用时，就必须在前面加上一个转义符（escape character），例如JavaScript中需要输出双引号时，就要用`\"`。想一下，如果用R输出“能输出HTML字符的Java脚本”，那样转义符会是什么模样。

比如HTML中需要一对双引号：`""`，用Java脚本写的话就是：`document.write("\"\"")`，用R来写这句Java脚本的话就是：`cat("document.write(\"\\\"\\\"\")")`。而我需要的Java脚本远比这复杂，不幸的是用R写出来之后Firefox运行正常，IE不正常，说脚本有错，额滴神啊，人海茫茫让我上哪儿去给您找错，IE也没一个debug功能。这就是我崩溃的原因。
