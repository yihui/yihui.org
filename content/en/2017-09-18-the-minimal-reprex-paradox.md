---
title: The Minimal Reproducible Example Paradox
date: '2017-09-18'
slug: the-minimal-reprex-paradox
---

How many times have I reminded a user of posting a minimal, self-contained, and reproducible example (reprex)? Probably 500 times. How many times do I think I will still need to remind users of this? Perhaps 5000 times.

I think there is a paradox, and there isn't a clever solution. The paradox is that we software developers know much more about our own software than average users (especially beginners), and we naturally anticipate a reprex, but users are in the dark, not knowing what information to provide to help solve the problem. Sometimes it is obvious to know what is wrong without an example (e.g., by reading the error message), but this is relatively rare. When users report a problem, we need them to show the problem is real, and the most convincing way is to provide a reprex.

Innocent users often report a problem without telling developers how to reproduce it, and that is probably because they think the developers are smart enough to figure out everything. This trust is similar to how we trust doctors when we are sick, but we don't just go to see doctors and tell them we are sick, then immediately ask for a medicine or treatment. Doctors have to ask several questions, so do software developers. The problems is that asking questions is a natural part of the job of doctors, however, for software developers, it is easy to lose patience when you have to repeat this 500 times to those who you offer free help:^[Free as in beer. I don't think it is completely "free". For example, developers can often benefit from answering questions. Sometimes they reveal bugs, and sometimes they help developers improve their software. That is, developers do get something in return in this process.]

> "Please provide a minimal, self-contained, and reproducible example."

The particularly difficult requirement for users is "minimal". It takes time to prepare a minimal example. In most cases, users run into software issues while working on real-world problems. I have seen a lot of bug reports with reproducible examples, but alas, these examples can contain thousands of lines of code (e.g., a giant Shiny app or R Markdown report). It is impractical for me to try to understand all the data and models, plus 50 add-on packages, before I can start investigating the issue.

![What is the root issue?](https://slides.yihui.org/gif/look-hard.gif)

I think it is much easier for developers to minimize the examples than users, because they often have the intuition about those lines of code that cannot possibly be the culprit. For example, I'd remove as many add-on packages in the example as possible (such as `library(ggplot2)`), and replace real data with simpler built-in datasets (such as `iris` or `mtcars`, or even simulated data), and see if the problem persists. For an R Markdown document, I'd delete as much content as possible (e.g., perhaps leave only one short paragraph). The more irrelevant content I have to look at, the slower it is for me to figure out the root issue. Deleting irrelevant content or code is something users can do and can also be tremendously helpful, but the problems are (1) they do not have the good intuition as developers; (2) they probably do not have time; (3) they may not even know it is so helpful to minimize a reprex.

![Cutting a reprex](https://slides.yihui.org/gif/shovel-snow.gif)

When a user is able to create a minimal reprex, chances are that she is really close to the root problem (perhaps only one step away), so that she may actually be able to solve the problem by herself!

Lastly I want to show a few examples of minimal reproducible examples:

- [Bugs I reported to Pandoc](https://github.com/jgm/pandoc/issues?q=is%3Aissue+author%3Ayihui+is%3Aclosed) on Github. These bugs are often discovered when other users report issues in the **rmarkdown** repo. After I investigate them, I try to minimize the examples to show the problems are only relevant to Pandoc (i.e., **rmarkdown** is innocent). My minimal reprex typically only contains a couple of lines of text.

- [rstudio/blogdown#197](https://github.com/rstudio/blogdown/issues/197): this is a recent issue, and Justin told me carefully how to reproduce the issue. I like this type of issues, because I don't need to ask more questions: just follow his steps, and I'm able to reproduce the issue. 

- Similarly, here are more bug reports that I was able to reproduce with no further questions asked: [yihui/tinytex#12](https://github.com/yihui/tinytex/issues/12), [rstudio/rmarkdown#1154](https://github.com/rstudio/rmarkdown/issues/1154), [rstudio/rmarkdown#1528](https://github.com/rstudio/rmarkdown/issues/1528), and [rstudio/DT#471](https://github.com/rstudio/DT/issues/471).

In conclusion, it is helpful for a developer to receive a minimal reprex, but it may not be a trivial thing to do for beginners. I'm well prepared to repeat the boring sentence for another 5000 times. Let's keep educating users the importance of a reprex together. Oh, I almost forgot to mention the "[When in doubt, upgrade](/en/2017/05/when-in-doubt-upgrade/)" strategy. Your issue may be automatically solved by simply upgrading.
