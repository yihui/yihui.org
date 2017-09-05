---
title: On Syntax Highlighting
date: '2017-07-06'
slug: on-syntax-highlighting
---

I have been asked several times to improve certain details in syntax highlighting (e.g., [this one](https://github.com/rstudio/blogdown/issues/125), and [this one](https://github.com/rstudio/bookdown/issues/207)), and I usually say no. It is not that these issues do not exist, but I don't think they are worth the effort. To me, syntax highlighting is only for cosmetic purposes. Colors make me feel more engaged in reading source code. It will be boring to read source code without colors. However, I don't really care if syntax highlighting tools do a precise job or not. I'm totally okay if certain keywords are not correctly identified or highlighted. Compared with what specific color is applied to an operator, I care much more about whether there are spaces around the operator.

My favorite syntax highlighting library on the web is [highlight.js](https://highlightjs.org). I think its author has done a very good job at saying no to the feature request of [adding line numbers](http://highlightjs.readthedocs.io/en/latest/line-numbers.html) to code blocks. I very much agree with him that many syntax highlighting libraries are overdoing the job.

Don't get me wrong. I don't say no to all issues related to syntax highlighting. For example, when [certain characters are simply eaten by the syntax highlighter](https://github.com/rstudio/rmarkdown/issues/988), it is certainly a legitimate issue that has to be fixed, because it is not about the appearance of the code but it has changed the content of the code.
