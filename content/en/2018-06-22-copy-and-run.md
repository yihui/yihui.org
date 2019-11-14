---
title: Ideally, I Hope to Simply Copy and Run Your Example
subtitle: The "copy-and-run" principle for reproducible examples
date: '2018-06-22'
slug: copy-and-run
---

When you ask questions or file bug reports, you want to get answers and solutions as quickly as possible, right? If that is the case, I'd like to talk about a very common situation in questions and bug reports in this post. Basically, if I'm unable to answer the question due to lack of information or reproducible examples the first time I see it, I'm likely to skip it and won't come back for the second time, unless I happen to be free and happy enough to [remind a user for the 502nd time](/en/2017/10/501st-reminder/) about reproducible examples, or [ask 12 questions](/en/2017/11/12-questions/) for complete information. I believe most users understand this, but every now and then, I receive "reproducible examples" in the form of verbal descriptions when a full example can speak for itself. Had a full example been provided, I could be able to simply copy and run it, and hopefully see the problem immediately, instead of following a number of steps from the verbal description to prepare the example by myself.

**Words can be ambiguous. Code is precise.**

That is why you should provide a fully reproducible example whenever possible, instead of describing all the steps to create such an example.

I have seen this kind of issues many times in the past, and finally decided to write this post after I saw [yihui/knitr#1562](https://github.com/yihui/knitr/issues/1562) yesterday.^[And [rstudio/blogdown#337](https://github.com/rstudio/blogdown/issues/337) is another example a couple of months later.] Think about the work I had to do for this issue:

- For step 1, I had to copy it to an Rmd document in my RStudio session.

- For step 2, I had to copy the code and put it in an R code chunk.

- For step 3, I had to add more headers, and it was unclear how many "more headers" or what kind of headers I would need. I added two, but didn't realize the problem for some reason.

- For step 4, I tried, but since step 3 was unclear to me, I didn't know what I should be looking at.

In terms of the structure, this is actually a pretty good bug report. It stated the steps to reproduce the problem, and the expected behavior. But I can't simply copy and run an example. I just can't.

![I just can't](https://slides.yihui.org/images/cant-do-it.jpg)

I asked for a full reproducible example, and finally realized that I should be looking at the two elements "title" and "title2" in the TOC. Within five seconds, I was able to reproducible the problem after I copied and ran the full example.

BTW, when you discover bugs about something that you can _see_ on your screen, screenshots can be highly useful. They can be strong evidence of bugs. Although it is not really what I think in my head, but when you file a bug report, you may imagine that the developer would deny it if you don't show enough evidence. If you provide a relatively simple reproducible example and attach screenshots, there will be no way for me to escape but acknowledge the problem, which means a much higher chance to fix it.
