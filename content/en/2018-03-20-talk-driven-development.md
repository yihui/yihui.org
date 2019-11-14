---
title: The "Talk-Driven Development" Model
subtitle: with an example of automatically converting post titles to title case
date: '2018-03-20'
slug: talk-driven-development
---

Last year at rstudio::conf 2017, I said I used the "conference-driven development model". Right before I gave the talk on **blogdown**, I wrote an RStudio addin to demonstrate in my talk, which later evolved into the "New Post" addin you see today. I really meant the "[talk-driven development](https://twitter.com/JennyBryan/status/970841704625356801)": when I'm going to give a talk, I'll surely ask myself how I could make better use of the unique chance to show something exciting to the audience.

This year, I thought about the same thing before I gave the talk at rstudio::conf, but didn't risk writing new code right before my talk (sigh, I'm becoming old and my brain is becoming slow). I mentioned a tiny feature [`options(blogdown.title_case = TRUE)`](https://slides.yihui.org/2018-blogdown-rstudio-conf-Yihui-Xie.html#22) in my talk, which was a **blogdown** feature I added two days before the talk. When you set this option, your post title will be converted to title case if the post is created via the "New Post" addin in RStudio or `blogdown::new_post()`, thanks to the function `tools::toTitleCase()`.^[As you all know, R is a language for statistical computing, graphics, and English grammar.]

The number of my own blog posts has been skyrocketing after I (pretty much) finished developing the **blogdown** package last year. I write a lot of posts and use title case myself, but I have two pains: (1) Sometimes I'm not sure if I should capitalize the initial letter of a word or not; (2) I don't enjoy holding the `Shift` key to type capitals. I had thought about `tools::toTitleCase()` but was too lazy to implement it in **blogdown**, and the upcoming talk at the conference was an excellent motivation.

It is a very tiny feature, but I believe it is very useful to those who blog frequently. As I mentioned in my slides, [tiny wins](http://joelcalifa.com/blog/tiny-wins/) are also important. Now I'm glad that I don't have to press `Shift` over and over again, and there is less stress on the little finger of my left hand.

![Always pressing the Shift key](https://slides.yihui.org/gif/penguin-stumble.gif)
