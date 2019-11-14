---
title: 为什么汇总的数据不能说明问题
date: '2008-10-21'
slug: useless-aggregated-data
---

今天13点左右[COS论坛](https://cosx.org/bbs)的注册人数显示为83778人，我看了一下会员列表，发现一个特征，凡是填了个人主页一栏的几乎都是广告，而且都是一家广告（推广小助手），我就不写网址了，免得帮这帮无耻之徒做了广告。

当我删掉主页中包含这个网址的会员之后，剩下的会员是65123人，这两年来他们竟然注册了近两万机器人。

如果再去掉近35000没有激活的用户，COS真实用户数大约为三万人。

![](https://db.yihui.org/imgur/J8OzStR.png)

乍一看，哇，八万大军，砍掉两万机器人，再砍掉没有激活的，只有36%的用户是可能真实的，里面当然还有机器人，只是目前还没有发现他们的特征。三万大军，意味着平均每天有30个活人注册，也不错了。

俗话说：数据一汇总，上帝就发笑。

R代码仅供图形初学者参考：

    # png("users.png", width = 500, height = 200)
    par(mar = c(2, 0.1, 0.1, 0.1))
    x = c(83778, 65123, 30000)
    plot(x, 1:3, type = "n", xaxt = "n", yaxt = "n", xlim = c(0,
        max(x)), ylim = c(0, 4), ylab = "", xlab = "", bty = "n")
    axis(1, c(0, x))
    s = 0.4
    rect(c(0, 0, x[3]), c(2 - s, 3 - s, 3 - s), c(x[3],
        x[3], x[2]), c(2 + s, 3 + s, 3 + s), lty = 3, border = c("green",
        "green", "blue"))
    rect(c(0, x[3], x[2]), (1:3) - s, rev(x), (1:3) +
        s, col = c("green", "blue", "red"))
    text(c(x[3], x[3] + x[2], x[2] + x[1])/2, 1:3, c("normal users",
        "spammers or confused users", "an ad spammer"), col = "yellow")
    text(c(x[3], x[3] + x[2])/2, c(2, 3), paste(round(100 *
        c(x[3], x[2] - x[3])/x[1], 2), "%", sep = ""))
    # dev.off()
