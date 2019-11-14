---
title: Fancy HTML5 Slides with knitr and pandoc
date: '2012-04-22'
slug: fancy-html5-slides-with-knitr-and-pandoc
---

Karthik Ram gave an [Introduction to R](http://inundata.org/R_talks/meetup/) a couple of weeks ago, and I strongly recommend you to take a look at his cool HTML5 slides. I started [trying HTML5 slides](https://slides.yihui.org/2011-r-dev-lessons.html) last year, and now it is difficult for me to go back to beamer, which I have used for a few years for my presenations. It is horrible to see beamer slides everywhere at academic conferences (especially the classic blue themes).

![Traces of all vessels](https://db.yihui.org/imgur/CiY3K.png)

You probably have heard of an interesting blog post by Ben Schmidt about [ocean shipping animations](http://sappingattention.blogspot.co.uk/2012/04/visualizing-ocean-shipping.html) in the 18th and 19th centuries. I also played with the dataset a little bit, and made some slides named [Voyages of Sinbad the Sailor](/slides/stat585x-shipping-yihui-xie.html) (use Left/Right or Up/Down to navigate). The source file was written in markdown, compiled by [**knitr**](/knitr/), then converted to DZSlides by [pandoc](http://johnmacfarlane.net/pandoc/).

I'm using the development version of **knitr**, which you can install from [Github](https://github.com/yihui/knitr/#readme). I plan to release the version 0.5 this weekend, and this version will particularly feature the markdown support. You can always read the [NEWS](https://github.com/yihui/knitr/blob/master/NEWS) file to know what is going on in the development.

Another piece of news which may be a little bit early to announce is the corresponding support in RStudio. I'm not going to say any details about it right now, but I'm pretty sure the so-called reproducible research and dynamic report generation can be easier than ever very soon! No LaTeX. No worries about HTML/CSS. A simple text file and a single click will give your a reasonably beautiful HTML page. Stay tuned.

