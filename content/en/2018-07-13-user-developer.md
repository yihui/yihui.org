---
title: The User-Developer Spectrum in the R Ecosystem
date: '2018-07-13'
slug: user-developer
---

Roger Peng wrote [a very thoughtful post](https://simplystatistics.org/2018/07/12/use-r-keynote-2018/) to reflect on the evolution of the R ecosystem after his keynote at UseR! 2018. It was a great read to me (I'd rate it as the best post so far in Simply Statistics this year). In particular, the "user-developer" spectrum struck me. It didn't surprise me, but I had never consciously thought about this notion. Clearly, the R ecosystem has been moving to the user's end on the spectrum, and Tidyverse is an outstanding example. To understand `tapply()`, you have to wear a programmer's shoes. To understand `group_by()`, you pretty much only need to understand English.

This reminds me of LaTeX v.s. Markdown (I wish I had more time to update [an old post I wrote in 2013](/en/2013/10/markdown-or-latex/)). An analogy to the "user-developer spectrum" is the "_author-typesetter spectrum_": Markdown tends to make you an author, and LaTeX tends to turn you into a typesetter. Although I have been preaching Markdown, I found a couple of months ago that I had never been able to explain the philosophy better than [Jennifer Thompson](https://twitter.com/jent103/status/998440668484722688):

![A tweet by Jennifer Thompson on the Markdown philosophy](https://pbs.twimg.com/media/DdssM0XV0AIR0C5.jpg#border)

Markdown is for 90% of the results from 10% of the effort. Very well said.

I don't mean a certain end on the spectrum is wrong. There is nothing wrong with a programming or authoring language being designed for developers or typesetters. There is nothing wrong if you want more control, as long as you think it is worth your time. Different people have different priorities. I just happen to prefer the user/author's end on the spectrum, based on the belief that the number of users is almost surely much larger than that of developers. I enjoy my own life as a developer, but I don't think most other users want to do the same thing as I do every day.

BTW, [John Myles White was skeptical](https://twitter.com/johnmyleswhite/status/1017773947360874497) about a few points in Roger's post. One of his doubts was:

> I also find this odd: "If R seems a bit confusing, disorganized, and perhaps incoherent at times, in some ways that's because so is data analysis." If anything, the reason tidyverse succeeded was precisely because it wasn't incoherent, but that didn't make it worse for analysis.

I tend to agree with John that R was incoherent not because data analysis was so. My theory is that R does not have a [BDFL](https://en.wikipedia.org/wiki/Benevolent_dictator_for_life), and perhaps features/changes in base R are not implemented as pull requests (I'm not really sure; maybe they have something similar in SVN). Besides, I guess most active R core developers are more on the developer's end of the spectrum. The Tidyverse does not have a nominal BDFL, either, but we all know "one of these developers is not like others". He cares deeply, deeply about data analysis, and has simple yet sound frameworks for data analysis (e.g., Tidy Data). I think that should explain the much better coherence.

Interestingly enough, Python's BDFL [just chose to step down yesterday](https://mail.python.org/pipermail/python-committers/2018-July/005664.html) after an exhausting fight over [a proposal](https://www.python.org/dev/peps/pep-0572/). I wonder what this will mean to the development of Python.
