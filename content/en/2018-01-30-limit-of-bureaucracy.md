---
title: It is Hard to Imagine the Limit of Bureaucracy
subtitle: Obscure Reasons Why Thou Shall Not Pass
date: '2018-01-30'
slug: limit-of-bureaucracy
---

Among all problems in life, I hate those caused purely by some people's personal preferences most. Personal preferences are usually fine, but you should not push them too far to block other people's ways. For example, if you run a journal, you [should not](/en/2017/12/formatting-papers/) force your authors to format their papers just to meet your own aesthetic standards. If you run a homeowner association, you should not force homeowners to use a specific color of fences. It is fine if certain rules are recommended, but they should not be enforced. It will be absurd to reject the publication of a scientific discovery based on the appearance of the paper.

I often create rules, too (in my software), but I will keep it in mind that I should not stand firmly in users' ways and say "thou shall not pass", unless it will bring me a lot of extra work to remove a rule. For example, I strongly prefer that the directory of an R Markdown file should be the working directory to evaluate code chunks (i.e., the Rmd document is the "center of universe"), but there are users who strongly disagree with my preference, and don't want **knitr** or **rmarkdown** to (temporarily) change the working directory when evaluating code chunks. Dean Attali is one of those users, and created the [**ezknitr**](https://github.com/ropensci/ezknitr) package. The fundamental reason that **ezknitr** can work (respecting the original working directory) is because I intentionally left the door open in **knitr**: I provided [an option](/knitr/options/) `knitr::opts_knit$get('root.dir')`. Basically that means I disagree with you, but I will give you the freedom to escape anyway.

I mourned over an email that I received this morning, in which a (**bookdown**) user reported to me that his university's IT forbids numbers in directory names of websites, e.g., `jquery-2.0/jquery.js` is not allowed, and it must be `jquery/jquery.js`. He asked me how to get rid of these numbers. While I generally don't like version numbers in these directory names, I see no point of forcing faculty and students to remove these numbers when publishing their websites to the university's web servers.

Fortunately, I have an answer: `options(htmltools.dir.version = FALSE)`, but why should I spend the time on dealing with such problems in the first place? It is hard to imagine the limit of bureaucracy in this world.

![Tired of bureaucracy](https://slides.yihui.org/gif/tired.gif)

P.S. I think most people must have been desperate enough about the [password rules](/en/2012/08/stupid-iastate-password-rules/) defined by the crazy IT people. That is a more common example of bureaucracy.
