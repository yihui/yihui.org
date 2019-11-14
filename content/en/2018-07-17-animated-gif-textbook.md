---
title: How Will an Animated GIF Work in a Textbook?
date: '2018-07-17'
slug: animated-gif-textbook
---

When I gave my [first public talk on **bookdown**](http://slides.yihui.org/2016-ASAChicago-bookdown-Yihui-Xie.html) in Chicago in 2016, I mentioned a few motivations behind this project. One of them was that I believed books should/could have richer content. I meant there could be videos, dynamic or interactive content in a book. For example, readers could be able to fit a model right inside the book if you embed a Shiny app.

Yesterday (i.e. two years later) I finally saw a real example from [a tweet by Matt Crump](https://twitter.com/MattCrump_/status/1018897122635239424), where he showed an animated GIF that demonstrates how small sample sizes could fool you when you look for a correlation between two variables.

![how correlation behaves when there is no correlation](https://crumplab.github.io/statistics/gifs/corUnifFourNs-1.gif)

Nick Brown [asked](https://twitter.com/sTeamTraen/status/1018875230805258240) in a reply "How will an animated GIF work in a textbook?" I was excited to learn that Matt was working on a book written with **bookdown**, so the answer was "Read the web version of the book." You can find the GIF in their text book "[Answering Questions with Data](https://crumplab.github.io/statistics/Correlation.html#some-more-movies)". That is exactly the type of books I was looking forward to.

BTW, actually I used a similar idea in [the function `animation::sim.qqnorm()`](https://yihui.org/animation/example/sim-qqnorm/) to show that even when the actual distribution is Normal, the points in the QQ plot do not necessarily line up nicely on the diagonal. When the sample size is small, the uncertainty could be so big to fool you into believing that you have discovered patterns which are essentially artifacts.

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/sim-qqnorm/demo-a.mp4?dl=1" /><p>Simulated QQ plots</p></video>

I should also mention [the VIT project](https://www.stat.auckland.ac.nz/~wild/VIT/) (Visual Inference Tools) started by Chris Wild, in which you can find more interesting examples related to this topic.

Oh, I should also mention one of [Colin Fay's favorite tech-related memes](https://twitter.com/_ColinFay/status/1012964820004548609):

![a bookdown meme](https://pbs.twimg.com/media/Dg7GIbtX4AAyJFi.jpg#border)
