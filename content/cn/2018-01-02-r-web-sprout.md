---
title: 基于 R 做网站/网页的萌芽
date: '2018-01-02'
slug: r-web-sprout
---

在“[Being Busy vs Being Productive](/en/2017/12/busy-vs-productive/)”一文中，我说我经常在做我好几年前想做的事情，这并不浮夸。我考虑事情很慢，从萌芽到付诸实现，中间跨度几年也不是什么稀奇事。论代码能力，我在码农界只能算中等，但若论痛感，我可能会是中等偏上。我对一些事情的痛感非常强烈，比如一般人能忍 LaTeX 和 Word 写作，而我是无论如何都忍不了；多数人可能觉得 WordPress 和 Jekyll 都挺好，能凑合着写网站，我也忍不了；多数人觉得论文投稿需要花时间调整格式太正常了，而我会觉得这特么实在[太不正常了](/en/2017/12/formatting-papers/)，死也要打倒这种无聊的人造障碍（如果期刊一定要逼着作者调格式，我们就[干掉期刊](/en/2012/03/a-really-fast-statistics-journal/)吧）。

当年我写完第一版的 knitr 包不久（嗯，现在大家都知道 knitr 是因为我的 Sweave 痛感太强而诞生的），我就觉得含有 R 代码的网页更新不应该手工维护，得有一个自动化的系统。这些年我做过一些不太成功的尝试，比如 2014 年我的 [knitr-jekyll 库](https://github.com/yihui/blogdown-jekyll)（现在已经更名为 blogdown-jekyll），其实我窃以为已经有点帅了，但我从没公开宣传过，因为我觉得 Jekyll 还是差不少火候。尽管如此，码农们还是慢慢发现了这个库。

我最早系统考虑的一个网站是 UCLA 的 [R 教程网站](https://stats.idre.ucla.edu/r/)，这个网站的历史很悠久了，我自己学 R 的时候还看过这个网站的例子。2012 年[我考虑这事的时候](https://github.com/yihui/ideas/issues/24) Markdown 还不流行，R Markdown 就更不用提了，还没诞生，当年顶多只能用 `.Rhtml` 文件生成网页，现在估计都没人知道什么是 `.Rhtml` 文件了。后来实际上那个网站的维护者确实也是用 `.Rhtml` 文件生成的网页。

手写 HTML 太反人类了，对比一下 HTML 和 Markdown 各自的年龄以及普及程度就知道，HTML 这种东西不大可能在寻常百姓中流行，所以 `.Rhtml` 不会是一条好的出路。2014 年我们开始以 Pandoc 为靠山做 rmarkdown 包。如果我没记错的话，郭巨侠当时认为 R Markdown 是“浮沙筑高塔”，不知这五年多过去之后他如何看待这套生态系统。

这一路上我看见几个著名统计学家都陆续开博客。比如 2014 年初我看见 Matloff 大伯[入驻 WordPress.com](https://matloff.wordpress.com/2014/03/30/new-blog-on-r-statistics-data-science-and-so-on/) 时，我坐在电脑前慨叹：唉，肿么又是一个 WordPress 网站，寄人篱下写代码写公式插图插表都不方便，只恨自己没有八双手能赶紧开发出一套简单又适合技术写作的网站系统。同样的感叹也发生在我看见 [Harrell 老大](http://www.fharrell.com)入驻 blogger.com 时，别介，等我一下啊（更新：在我写完这篇日志过后不到一周时间，他也搬家到 blogdown 世界了）。
