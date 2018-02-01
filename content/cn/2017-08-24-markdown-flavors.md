---
title: 混乱的 Markdown 世界
date: '2017-08-24'
slug: markdown-flavors
---

经过十个月的奋战，终于发布了 blogdown 的第一个 [CRAN 版本](https://cran.rstudio.com/package=blogdown)。就在发布前夕，我突然注意到 Hugo [开始支持](https://gohugo.io/content-management/formats/)另一个 Markdown 变种，叫 Mmark。于是我看了一下 Mmark 的文档，惊喜地发现它竟然支持数学公式，但看完文档后觉得快疯了。这特么又是一种奇怪的 Markdown 方言。

比如数学公式只能用双美元符号写，包括行内公式（按 LaTeX 常规语法来说应该用一对单美元符号）。这种要求用双美元符号的语法纯粹是出于开发者的自私：因为他想避免文档解析的潜在歧义，也就是说，双美元符号比较奇怪，所以通常不会发生误写的事件；只要出现一对双美元符号，十之八九一定是数学公式。单美元符号的撞车概率就高多了，它可能真的表示美元。

用双美元符号写公式会让文档的可移植性变差，我想这也是大多数 Markdown 方言开发者没考虑的事情。他们只想着生成 HTML 页面，而没想过输出 LaTeX / PDF 的可能。Pandoc 是少有的业界良心，它多花了一些心思支持单美元符号，这样可以跟 LaTeX 靠得更近。Pandoc 花的心思其实并不复杂，比如要求起始美元符号后面不可以跟空格、结束美元符号前面不能是空格，等等。这样就大大减少了美元符号被误判为数学公式的可能性。我在 xaringan 包中[学习了这一点](https://github.com/yihui/xaringan/blob/32fd94f8f/R/utils.R#L78-L105)，为用户节省了两个反引号的输入（这里的几个正则表达式是这个包里我比较得意的伎俩，不过我没写注释）。

因为被 Mmark 的语法吓到了，我开始琢磨为什么大家不能以 Pandoc 为标杆开发自己的方言。Pandoc 的作者和另一伙人发起了 CommonMark，有志于标准化 Markdown 语法，省得日复一日大家重复发明奇怪的鸟语方言。然而我发现 CommonMark 的语法设定中并没有包含数学公式，于是我放狗搜了一下，发现了[这个讨论帖](https://talk.commonmark.org/t/1926)。读了楼主最后给的两个链接之后，我实在是对这个世界感到森森的绝望。对[第一个链接](http://cwoebker.com/posts/latex-math-magic)，我已经给出了我的[究极解决方案](/cn/2017/04/mathjax-markdown/)，我觉得比伊高明多了；对[第二个链接](https://github.com/cben/mathdown/wiki/math-in-markdown)，我的老天，世上竟然已经有这么多 Markdown 鸟语方言，而且各自有各自奇怪的数学公式语法。

所以当客官们看到神马软件说“支持 Markdown”的时候，一定要研究一下到底它支持的是哪种方言。目前我能接受的只有两种：一种自然是 Pandoc，另一种是 remark.js。后一种虽说也很离经叛道，但它有它独特的妙用，所以我可以谅解作者发明了很不一样的方言。其它不遵守 CommonMark 的方言我觉得都难以原谅。
