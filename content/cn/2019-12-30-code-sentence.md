---
title: 论代码的句感
date: '2019-12-30'
slug: code-sentence
---

书接《[代码的语感](/cn/2018/04/tmp/)》。那次说的是词感，这次说句感。今天翻论坛帖子的时候，看到[一则问题](https://d.cosx.org/d/421162)，说是给定一个日期，要求返回这个日期所在季度的上一个季度的最后一天的日期。我看这问题在逻辑上并没有什么难点，于是试着敲了几行代码。

```r
last_quarter_day = function(dates) {
  dates = as.Date(dates)
  month = as.integer(format(dates, '%m'))
  year  = as.integer(format(dates, '%Y'))

  quarter = ceiling(month / 3)  # 1:3 -> 1; 4:6 -> 2; ...
  day     = c('12-31', '03-31', '06-30', '09-30')[quarter]

  i = quarter == 1
  year[i] = year[i] - 1

  as.Date(sprintf('%d-%s', year, day))
}
```

敲完四顾，踌躇满志。尤其对第五句的下标索引感到满意——一对方括号把这个问题的本质体现地淋漓尽致。不过这寥寥几行代码读下来，到倒数二三句觉得有些别扭。那里是为了处理一季度的日期，这种情况需要返回前一年的年份。这里让我感觉别扭的原因是，这个函数的主体语句从字符数上来说几乎都是中长句，而这两句是短句，显得不够匀称；而且在没写注释的情况下，读者突然遇到一个短变量名 `i`，可能会疑惑不解。

```r
  i = quarter == 1
  year[i] = year[i] - 1
```

我略微琢磨了一下，把两句合并为一句条件判断语句：

```r
  if (any(i <- quarter == 1)) year[i] = year[i] - 1
```

其实这里 `if ()` 和 `any()` 完全是多余的：就算所有的 `i` 都是 `FALSE`，后面 `year[i] = year[i] - 1` 也一样能运行。此处画蛇添足有两个目的：一是为了把句子撑长一点，这只是形式上的工夫；二是为了掩盖一下这个特殊条件的特殊处理（年份前移一年），而不要让它裸露在外。为什么这样做呢？我们再看一眼全体代码：

```r
last_quarter_day = function(dates) {
  dates = as.Date(dates)
  month = as.integer(format(dates, '%m'))
  year  = as.integer(format(dates, '%Y'))

  quarter = ceiling(month / 3)  # 1:3 -> 1; 4:6 -> 2; ...
  day     = c('12-31', '03-31', '06-30', '09-30')[quarter]

  if (any(i <- quarter == 1)) year[i] = year[i] - 1

  as.Date(sprintf('%d-%s', year, day))
}
```

前面五句代码全都是在赋值。我们读到第六句时，斜刺里杀出一个判断语句，可能会打扰到我们的阅读节奏，但应该也容易翻译为人类语言：如果季度是第一季度，那么年份前移一年。如果第一遍没看懂，那么其实暂时跳过它，也不太妨碍整体代码的解读；毕竟这里只是一个特例，而特例可以放到最后再去理解。
