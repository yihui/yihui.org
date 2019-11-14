---
title: 关于最小中位数平方法（Least Median of Squares）
date: '2008-10-20'
slug: least-median-of-squares
---

如果我没记错的话，Prof Lin在课堂上提到，Least Median of Squares是一个难题：它的目标是最小化误差平方的中位数。当时上课我没去考虑这个问题，晚上突然想起，这个问题不管怎么说至少可以有暴力解法，比如用BFGS等方法去优化就能算出系数了。

但是转念一想，LMS这个东西怎么看着眼熟，打开MASS一看，原来是自己以前用过的。MASS包的lqs()可以计算各种稳健和耐抗回归，LMS是其中一种。LMS是一种稳健回归方法（下第一幅图），然而MASS的文献指出它对大量堆在中间位置上的数值敏感（下第二幅图）。

![LMS与OLS的比较（LMS较稳健）](https://db.yihui.org/imgur/iIb0IDM.png)

图1 离群点对普通最小二乘有严重影响，LMS却没问题

![LMS与OLS的比较（LMS对中间值敏感）](https://db.yihui.org/imgur/YtY3dt0.png)

图2 大量的中间值让LMS失效，普通最小二乘却没事

    # png("lms.png", width = 500, height = 400)
    par(mar = c(4, 4, 0.1, 0.1))
    library(MASS)
    set.seed(1)
    x = runif(50)
    set.seed(1)
    y = 2 + 3 * x + rnorm(50)
    # an outlier
    x = c(x, 2); y = c(y, 30)
    plot(x, y, pch = 20)
    abline(lqs(y ~ x, method = "lqs"), col = "blue", lty = 2)
    abline(lm(y ~ x), col = "red")
    legend("topleft", legend = c("OLS", "LMS"), col = c("red",
        "blue"), lty = 1:2, bty = "n")
    # dev.off()
    
    # png("lms-central.png", width = 500, height = 400)
    par(mar = c(4, 4, 0.1, 0.1))
    library(MASS)
    set.seed(1)
    x = runif(50)
    set.seed(1)
    y = 2 + 3 * x + rnorm(50)
    # 500 central values
    x = c(x, jitter(rep(mean(x), 500), 3))
    y = c(y, jitter(rep(mean(y), 500), 3))
    plot(x, y, pch = 20, cex = c(rep(1, 50), rep(0.1, 500)))
    abline(lqs(y ~ x, method = "lqs"), col = "blue", lty = 2)
    abline(lm(y ~ x), col = "red")
    legend("topleft", legend = c("OLS", "LMS"), col = c("red",
        "blue"), lty = 1:2, bty = "n")
    # dev.off()

