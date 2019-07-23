---
title: 码力之抽象力
date: '2018-04-06'
slug: abstract-code
---

前天我收了一个 [bookdown 的合并请求](https://github.com/rstudio/bookdown/pull/561/files)，其代码是正确的，但反映出一个很普遍的代码问题：冗余。代码是否冗余，一般不需要仔细看，只要表面上扫一眼，看看是不是有类似的代码在不断重复即可。这个例子很典型，以前我也碰到过不少，不过一直都没写下来。一眼望去，if-else 语句里全都是调用同一个函数 `list.files()`，不同的只是参数取值。

```r
if (isTRUE(config[['rmd_subdir']])) {
  files = list.files(
    '.', '[.]Rmd$', ignore.case = TRUE, recursive = TRUE
    )
} else if (is.character(config[['rmd_subdir']])) {
  files = list.files(
    config[['rmd_subdir']], '[.]Rmd$', ignore.case = TRUE,
    recursive = TRUE, full.names = TRUE
  )
} else {
  files = list.files(
    '.', '[.]Rmd$', ignore.case = TRUE
  )
}
```

我合并之后作了一个[简化的修改](https://github.com/rstudio/bookdown/commit/3f89707990007b59c875db6733963a4b552ac9ef)。为了简化代码，我们需要观察 `list.files()` 的每一个参数在什么条件下怎样取值，从第一个参数开始依次看即可。

1. 首先 `config[['rmd_subdir']]` 在代码中出现了三次。事不过三，这么臃肿的提取列表子元素的代码（长达 21 个字符）应该考虑抽出来作为一个变量，如 `subdir = config[['rmd_subdir']])`。

1. 第一个参数是路径，如果 `subdir` 是字符型则用它的字符值，否则用 `"."`。即：

    ```r
    list.files(if (is.character(subdir)) subdir else '.', ...)
    ```

1. 第二个参数是文件名特征（正则表达式），它以及后面的 `ignore.case = TRUE` 是三个函数参数的共同部分，所以三次调用都可以用：

    ```r
    list.files(
      if (is.character(subdir)) subdir else '.', '[.]Rmd$',
      ignore.case = TRUE, ...
    )
    ```

1. 再看 `recursive` 参数，在 `subdir` 是 `TRUE` 或字符型的情况下取值为 `TRUE`，默认为 `FALSE`。`full.names` 参数取值理论上是雷同的；此处要注意，原始代码中第一个调用（也就是 `isTRUE(subdir)` 条件下）没有用 `full.names = TRUE`，但在第一个参数是 `"."` 的条件下，`full.names = TRUE` 或 `FALSE` 无所谓，因为一个文件路径 `foo.txt` 和 `./foo.txt` 等价（此处需要敲黑板）。为了能和 `recursive` 参数用同样的取值，我们就把它改为 `TRUE` 好了。于是抽取一个公共变量 `subdir_yes`：

    ```r
    subdir_yes = isTRUE(subdir) || is.character(subdir)
    files = list.files(
      if (is.character(subdir)) subdir else '.', '[.]Rmd$',
      ignore.case = TRUE, recursive = subdir_yes, full.names = subdir_yes
    )
    ```

经过几次“合并同类项”，原先的三个选择分支、14 行代码至此压缩为一个函数调用、5 行代码。全剧终。

如同好的诗文须炼字一样，写代码也需要炼码。我觉得这是写代码的能力（码力）中比较难获得的一种，需要长时间的磨练。仍然跟写文章一样：每个人都会有很多素材，但只有少数人能以精致干练的形式把它们叙述出来。程序的基本元素（结构、函数等）所有人都可以学，就算不知道，随便找个参考也能翻出来，难学的是如何组织这些元素。

之所以要尽量避免简单重复代码，是因为将来万一需要修改，重复三处的代码就需要改三遍；比如，如果想把正则表达式 `[.]Rmd$` 换成 `[.]R?md$`，那么用上面修改过的代码就只需要一次修改搞定，而不必担心是不是还有别的地方需要修改。

当然凡事都有个限度，诗词过于抽象会让人不知所云，代码抽象也不能过度，须在易读性和精简度之间权衡。易读性比较难衡量，因为它有点主观；如果源代码主要是写给自己看的，那么至少在近期的未来得保证自己还能很快读懂。

## 附录：文档是否该重复？

不光是写代码，我写文档也会尽量避免重复，一般情况下我都不想在不同函数文档中重复相同含义的参数文档（就算是 roxgyen 的 `@inheritParams` 我也不想用）。如果两个函数中一个函数的参数会传给另一个函数，我会在前一个函数中用 `...` 参数，然后在帮助文档中说：请看第二个函数的文档。这样做的好处是对我来说，维护代码和文档的压力都会大大减轻^[代码压力小是因为我不需要在第一个函数中显式写出第二个函数的那些参数名，而且第二函数参数更新时我也不需要更新第一个函数的源代码；文档压力小是因为我不必在第一个函数文档中重复第二个函数的文档。]，但坏处是对用户来说，他们需要从第一个函数的文档跳转到第二个函数才知道第一个函数有哪些可能的参数。

在第一个函数中是用 `...` 参数，还是显式列出所有传给第二个函数的参数？答案见仁见智。我常用第一种方式，比如 `bookdown::gitbook()` 函数会把它的 `...` 参数传给 `rmarkdown::html_document()`，这样我就不必在前者中啰嗦一遍后者的参数了；我是为了方便自己。这种利己也不是完全出于自私，避免重复会让代码和文档在将来更容易维护，容易维护的软件也会相对稳定一点。而敝厂的老大 JJ 则坚持用第二种方式（显式重复所有公共参数），他是为了方便用户，节省一次点击，比如 rmarkdown 包中的函数就有相当大量的公共参数。

更夸张的是，他在写 rmarkdown 的网页版文档时，也会大量复制粘贴。最近两个月我在写一本官方 R Markdown 指南的书，看了这些大量的复制粘贴之后，还是决定不要在书中重复它们了，而是改为交叉引用。比如讲 [`word_document`](https://bookdown.org/yihui/rmarkdown/word-document.html) 格式有哪些功能，就不再全文重复 [`html_document`](https://bookdown.org/yihui/rmarkdown/html-document.html) 中已经谈过的功能。
