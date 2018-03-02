---
title: Thanks, Alicia Schep, for Digging into knitr Engines
subtitle: Uncovering less known features is one of the best ways to make software authors happy
date: '2018-02-23'
slug: alicia-knitr-engine
---

Alicia Schep recently discovered an interesting fact about **knitr**: you can not only use other languages in R Markdown (Python, Julia, C++, Bash, SQL, and so on), but also actually have full control of _how_ to run such code chunks. In other words, these "language engines" in **knitr** are fully customizable and extensible. 

[In her blog post](http://www.aliciaschep.com/blog/js-rmarkdown/), she expressed the surprise and joy:

> After figuring out a quick way to do this, I ended up becoming interested in how knitr's language engines work, and was pleasantly surprised by how accessible the engines are --- with a few lines of code you can add a new chunk option to affect the output of a javascript chunk!

That is exactly what I expect users to discover. This fact was not documented in great detail anywhere in public, unless you read [the source code](https://github.com/yihui/knitr/blob/master/R/engine.R). The only full documentation was in the **knitr** book (Dynamic Documents with R and knitr), which is unfortunately not free. Good news is that this may change in this summer.

So thanks, Alicia. I started my day in a pleasant morning.

BTW, have I mentioned how awesome [Nick Strayer and Lucy D'Agostino McGowan](http://livefreeordichotomize.com) are?

**Update on 2018-03-02**: [Colin Fay is also awesome!](https://twitter.com/_ColinFay/status/969183208687448064) Thanks!
