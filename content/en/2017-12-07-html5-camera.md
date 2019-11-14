---
title: Embed A Live Video of Yourself Through Your Camera in HTML5 Slides
subtitle: with a xaringan example
date: '2017-12-07'
slug: html5-camera
---

Two years ago, I did a quick search on how to embed a live video through my webcam in my HTML5 presentations, and it turned out to be [simple enough](http://www.html5rocks.com/en/tutorials/getusermedia/intro/) if you have a modern web browser. I was looking for this because sometimes when you do webinars, your audience may want to see you (perhaps to confirm that they are not listening to a robot). It is also helpful when you record a video tutorial. Typically you can only record either your desktop or your face but not both, when your slides go fullscreen.^[I know some people open QuickTime and resize it to a tiny floating window. Then overlay the window on the slides. Essentially the slides and the video are in two windows. The technique I mention in this post makes it possible to embed the video right on the slide pages.]

So I used the technique in one of my remote presentations. It was pretty cool. There are a lot of cool stuff on my computer that I either don't have time to write about or simply forget. I think it is one of the two coolest little things^[The other one is the Shiny voice input app: https://yihui.shinyapps.io/voice/.] I have done these years related to web technologies, yet the technologies are relatively simple.

The reason that it came to my mind again was because [Daijiang Li](https://daijiang.name/) asked [a question on StackOverflow](https://stackoverflow.com/q/47576554/559676) a week ago,^[He pinged me [on Twitter](https://twitter.com/xieyihui/status/936618431939477505), which was understandable but not necessary, and I want to repeat in this corner: I read _every single_ question on StackOverflow related to my software packages, as long as you used the correct tags. If I'm able to answer your question, I'll just answer it. That said, if your question is extremely urgent, feel free to ping me anyway.] and it seemed he was trying to do something similar, so I pulled out my JavaScript code and created a minimal example to show [how to embed a live video through your webcam in your HTML5 slides](https://slides.yihui.org/2017-xaringan-webcam.html).

[![Embed A Live Video of Yourself Through Your Camera in HTML5 Slides](https://db.yihui.org/images/xaringan-webcam.png)](https://slides.yihui.org/2017-xaringan-webcam.html)

When you open this link for the first time, your web browser will ask you for permission to access your camera, and display a video if you have a camera connected.

The key is to include an HTML fragment [webcam.html](https://slides.yihui.org/webcam.html) in the output. This fragment does two things (read its HTML source to know how):

1. Captures the video through your camera and displays it;

1. Makes the video draggable, so you have put it anywhere on your screen.

The Rmd source file of the slides is [here](https://slides.yihui.org/2017-xaringan-webcam.Rmd). Enjoy! Hacking HTML and JavaScript is a lot of fun, as Colin Fay [may have discovered](https://twitter.com/_ColinFay/status/937950310370332672).
