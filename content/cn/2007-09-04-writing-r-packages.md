---
title: 用R编写自己的Package
date: '2007-09-04'
slug: writing-r-packages
---

> 本文已经过期，请参考统计之都上的最新文章：[开发R程序包之忍者篇](https://cosx.org/2011/05/write-r-packages-like-a-ninja/)。

若只想要一个粗略的包，其实也很简单，R 的 **utils** 包中提供了一个 `package.skeleton()` 函数，用它基本上就足够了。

```
package.skeleton            package:utils            R Documentation

Create a Skeleton for a New Source Package

Description:

     'package.skeleton' automates some of the setup for a new source
     package.  It creates directories, saves functions, data, and R
     code files to appropriate places, and creates skeleton help files
     and a 'Read-and-delete-me' file describing further steps in
     packaging.

Usage:

     package.skeleton(name = "anRpackage", list,
                      environment = .GlobalEnv,
                      path = ".", force = FALSE, namespace = FALSE,
                      code_files = character())
```


这个函数会在`path`下面生成一个文件夹，里面包含了`list`中的对象（函数、数据等），接下来我们需要对这个文件夹进行编译，用`R CMD build`就可以了。说实话，很久以来我都完全不知道`R CMD`这一系列命令是怎么用的，昨晚研究了好半天才大致明白，汗。

今晚编写一个包，发现在Ubuntu下用`package.skeleton()`函数会把我的源代码中的中文字符给改掉，我找了半天也没找到在哪里设置语言选项，于是只好现在Windows下把这个Skeleton做好了之后拿到Ubuntu下用`R CMD build`。两台机器上来回跑，才把一个包打好。

呃……急需Linux入门老师……虽说每次遇到问题能Google出来，但感觉还是办事太慢效率太低。

