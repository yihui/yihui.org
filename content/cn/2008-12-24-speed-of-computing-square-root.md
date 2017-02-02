---
title: 开平方的速度
date: '2008-12-24'
slug: speed-of-computing-square-root
---

今天突然想起，开平方`sqrt(x)`和直接用`x^0.5`谁的速度快，本以为`sqrt()`会快一些，结果貌似不是这样：

    
    > rm(list = ls(all = TRUE))
    > set.seed(123)
    > x = runif(1e+05)
    > system.time(replicate(1000, {
    +     sqrt(x)
    +     NULL
    + }))
       user  system elapsed
      18.07    0.00   18.14
    > system.time(replicate(1000, {
    +     x^0.5
    +     NULL
    + }))
       user  system elapsed
      10.47    0.00   10.50
    > identical(sqrt(x), x^0.5)
     [1] TRUE


看来四则运算还是快于调用函数啊。（旁白：真煞风景，今天是圣诞前夜呀老大！我：啥时候见过美国人过五四青年节么？）
