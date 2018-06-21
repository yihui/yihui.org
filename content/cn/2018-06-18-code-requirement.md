---
title: 读懂代码项目需求
date: '2018-06-18'
slug: code-requirement
---

我曾经的同门 Sam Tyner [在推特上问](https://twitter.com/sctyner/status/1008800016381743104)是否存在一个把名字转换为 Tidyverse 命名风格的包名的工具。有开玩笑性质，不过我瞅了一眼，觉得这倒是一个不错的读懂代码项目需求的例子。根据上下文以及过往经验，这个包名应该满足如下条件：

1. 纯小写；

1. 只能用五个字母；

1. 必须以 r 结尾；

1. 如果字母数不够五个，那么在尾巴上接一串 r。

这些条件并没有在对话中全列出来，只有 2 是显式说明过的。最后[我给的答案](https://twitter.com/xieyihui/status/1008801933807837184)是：

```r
tidy_name = function(x) {
  x = tolower(substr(abbreviate(x), 1, 4))
  paste(c(x, rep('r', 5 - nchar(x))), collapse = '')
}
```

举例：

```r
tidy_name('Sam Tyner')
# [1] "smtyr"
tidy_name('Hadley')
# [1] "hdlyr"
tidy_name('Yihui Xie')
# [1] "yihxr"
```

四个条件，四行代码^[不知何故，这个句式让我想起“八行书，千里梦”。]。这里面自以为比较厉害的是 `abbreviate()` 函数，这大概是没多少人知道的。我以前说过，写代码调函数如写诗词用典，好处在于精简、效率高，坏处在于需要了解更多函数（典故），而且可能会让读者费解。


