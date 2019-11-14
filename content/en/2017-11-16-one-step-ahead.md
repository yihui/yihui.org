---
title: One Step Ahead
date: '2017-11-16'
slug: one-step-ahead
---

Last month [Jeroen asked](https://twitter.com/opencpu/status/924432693571608578) if there was a way to detect if the R code is executed inside **knitr**/R Markdown. Later he commented "The ninja is always one step ahead." Of course that was flattering.

In [a previous post](/en/2017/10/base-r-broman/), I said "I consider my programming skills to be mediocre". I'm not a modest person --- I guess I'm relatively good at thinking a few steps ahead. In the above example, when users start to wonder if there is a way to check the code is being executed in **knitr**, chances are they want to output something special for **knitr**, e.g., a table. In that case, I have provided the [S3 generic function `knit_print()`](https://cran.rstudio.com/web/packages/knitr/vignettes/knit_print.html) in **knitr** to emulate `print()` in base R. You don't need to check if you are in **knitr**; instead, just define an S3 printing method for `knit_print()`, and **knitr** will call the method automatically.

That is why sometimes when users ask "HOW to do something", it could be useful if we first ask them "WHAT do you want to do?" before answering the "HOW" question.

See [this line of code](https://github.com/rstudio/blogdown/blob/e6844804/R/utils.R#L287-L288) for a silly example of me "thinking ahead" :) It is easy to think about and write code that works for the current step (or the current environment, setting, and so on), and who knows what will happen in the future...

![](https://slides.yihui.org/gif/missed-shot.gif)
