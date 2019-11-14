---
title: Study the Hugo-XMin Theme If You Wish to Customize A blogdown Website
date: '2017-11-22'
slug: tweak-blogdown-site
---

Jose [asked a question](https://stackoverflow.com/q/47114299/559676) about customizing [the hugo-xmin theme](https://github.com/yihui/hugo-xmin) for his website on StackOverflow a few weeks ago. Then he waited for two weeks and [asked me on Github](https://github.com/rstudio/blogdown/issues/231) since he didn't get a response (thanks for waiting for two weeks!). I asked him to read the Section 2.5 of the **blogdown** book, in which I carefully documented the hugo-xmin theme. This is a section that took me the longest time to write, so I hope readers can spend a good amount of time on it, if (and only if) they really want to tweak their websites. This morning, Jose came back and said:

> Oh my!!! Read the manual twice and didn't notice the answer was there. Thanks Yihui!!

Okay, it seems my time on this section was not wasted.

As I have warned you in the very beginning of the book ([Section 1.2](https://bookdown.org/yihui/blogdown/other-themes.html)), you'd better not spend too much time on customizing the appearance of your website, although it is extremely tempting to do so. Anyway, I guess few people would listen to me --- who doesn't want a beautiful website? In other words, pretty much everyone is a control freak (including me, of course).

To be able to fully customize your website, you have to understand how Hugo works sooner or later. The hugo-xmin theme was my attempt to simplify the basics of Hugo, as I [mentioned in a previous post](/en/2017/09/pull-requests-as-a-teaching-tool/). It is unlikely to be a theme that you really want to use because it is too simple, unless you are a minimalist like me. What I wanted to achieve with this theme are:

1. To introduce the basic concepts of Hugo templates (e.g., templates for lists and single pages). That is, to give you a little fish.

1. To show you how to implement some common features by yourself. That is, to teach you how to fish. The ideas are not limited to this specific theme, and can be applied to other themes.

Section 2.5 is a little lengthy, so you have to weigh your urge to customize your website against the possible pain of reading this section. Accept a Hugo theme as-is, or learn more about Hugo and customize it. There is no free lunch.

![Talk to yourself.](https://slides.yihui.org/images/me-to-me.jpg)
