---
title: All Hidden Features will Eventually be Discovered
date: '2018-02-06'
slug: hidden-features
---

A few days ago [I said](/en/2018/01/attention-variance/) there was a large variance in the levels of attention of readers. The same is true for software users and the audience of talks. For example, [Kieran Healy](https://twitter.com/kjhealy/status/960247344670396418) just happily discovered the OptiPNG hook in **knitr**, which was first introduced about five years ago, but I rarely mentioned it in the public (other than in the **knitr** book, which is not free, so not many people will notice it).

PNG plots produced from R can usually be (heavily) optimized via OptiPNG, as I mentioned in the [Appendix B.4](https://bookdown.org/yihui/blogdown/useful-resources.html) in the **blogdown** book. I provided the chunk hook `hook_optipng()` in **knitr** to automate the optimization if OptiPNG has been installed.

From time to time, users keep discovering hidden features that I have rarely promoted, which often surprises me (such as the new JS macro feature in **xaringan**). The main reason that I don't actively promote them is because I prefer _deep wins_ over _wide wins_, i.e., compared to a large number of users moderately excited by certain features, I prefer a handful of users who are truly excited. Those who care about a software package will eventually discover all its features. For those who don't care so much (which is totally fine), I try not to preach, and save the time for doing more exciting work.

When I give talks, I also notice that some people listen really carefully to what I say. For example, [Rahul bought the book "Principles"](https://twitter.com/rsangole/status/960888961181855744) since I mentioned it in my [rstudio::conf 2018 talk](https://bit.ly/2018-blogdown#5). I just casually mentioned this book during the talk, without even putting its title or cover image in my slides, but he heard and remembered it.
