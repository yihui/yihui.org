---
title: A Desiccated baseR-er's Snowflakes via Base R Graphics
date: '2017-12-05'
slug: baser-snowflakes
---

As I [said previously](/en/2017/10/base-r-broman/), I'm a desiccated baseR-er like Karl Broman, and I'm an unfortunate master of `par()`. Today I saw a lovely papa drew [some beautiful snowflakes](https://twitter.com/ikashnitsky/status/937786580231696384) for his daughter using **ggplot2**.

I'm sorry for boring you, but... I haven't drawn any plots for a long time, but `par()` is still in my memory, and here is the desiccated base R version of the snowflakes:

```r
par(mar = rep(0, 4), bg = 'black', ann = FALSE)
n = 100
with(
  list(x = runif(n), y = runif(n), size = runif(n, 1, 7)),
  plot(x, y, pch = 42, cex = size, col = 'white')
)
```

Perhaps this is one of the rare examples in which base R code looks a little easier, and a grammar of graphics may be an overkill.
