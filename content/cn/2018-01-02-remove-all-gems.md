---
title: 卸载系统中所有 Ruby 包
date: '2018-01-02'
slug: remove-all-gems
---

我在多个场合提过或讲过，我放弃著名的静态网站生成工具 Jekyll 的主要原因之一是我已经厌倦了 Ruby 系统的依赖地狱。当年我还在 Ubuntu 里混迹的时候，尤其是烦透了需要 sudo 管理而且藏得很深的软件包。每次装个 Jekyll 都要装一坨依赖，这让我感到很不舒服（总觉得系统中有上次残留的垃圾包）。挣扎了几次之后，我在 [2011 年找到](https://github.com/yihui/ideas/issues/21)一个卸载所有包的命令行：

```bash
gem list | cut -d" " -f1 | xargs sudo gem uninstall -aIx
```

今日想起这事，顺手再写一行卸载 R 包的代码：

```r
remove.packages(.packages(TRUE))
```

当然这个不一定能成功，因为 R 可能会不让你自杀，即：卸载 R 基础包。另外我发现似乎很多人都不知道 `.packages()` 这个函数，所以经常绕道去获取所有包名（比如从 `installed.packages()` 里）；而且我也不理解为什么这个函数要以点开头（表示隐藏对象），可能有是某位核心成员某天随意写出来的函数吧。叫 `list_packages()` 不是很好咩。
