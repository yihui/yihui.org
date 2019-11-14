---
title: Making Reproducible Research Enjoyable
date: '2012-06-25'
slug: enjoyable-reproducible-research
---

> Note: this is a contributed article for the [ICSA Bulletin](http://www.icsa.org/bulletin/) and the basic idea can be summarized in this picture.

> ![No LaTeX tricks please](https://db.yihui.org/imgur/jrwbX.jpg)

It is hard to convince people to think about reproducible research (RR). There are two parts of difficulties: (1) tools used to be for experts only and (2) it is still common practice to copy and paste. For some statisticians, RR is almost equivalent to Sweave (R + LaTeX). I love LaTeX, but LaTeX is still hell to many people. I had an experience of teaching Sweave in a stat-computing class at Iowa State University, and I can tell you their horrible faces after I taught them LaTeX in the first half of the class. I will never do that again.

But RR is really important. I recommend you to watch this video if you have not heard of the Deception at Duke to see how improper data processing killed patients: <http://www.cbsnews.com/video/watch/?id=7398476n>, then you should be guilty when you copy and paste as a statistician. I fully respect the seminal work of Sweave, but in my eyes, it is really a half-done project which did not make much progress in the past few years. I suggested a few features to the R core team, which were often rejected. I understand R is too big to make substantial changes. As a useR, you always have the right to _vote by packages_, so I wrote the **knitr** package to fully implement what I thought would be a good engine for RR with R.

The basic idea was the same: to mix code and text together, then compile the whole document with code being executed, and you get a report without copying/pasting anything since the code will faithfully give you results. The design was very different from Sweave: **knitr** is not restricted to a specific format like LaTeX; any output format is possible, including HTML, Markdown and reStructuredText. I will ignore LaTeX in this article, although it took me much more time to work on than other formats.

I use Github extensively and learned Markdown there. For those who are not familiar with Markdown, it is an extremely simple language and you can learn it in five minutes at most: <http://en.wikipedia.org/wiki/Markdown>. It was almost trivial for me to add support for Markdown in **knitr**, so we can mix R code and Markdown text together and compile reports quickly. That was the beginning of the story.

Later [RStudio](http://www.rstudio.org) (_the_ IDE of R) saw the work of **knitr** and decided to add support to it. First we finished the work with Sweave documents, which was painful but rewarding (well, that is LaTeX!). Before that I had finished adding the **knitr** support in LyX -- an excellent front-end of LaTeX, and RR became enjoyable somehow, but only enjoyable for me and perhaps also some other LyX users. We could write LaTeX easily and click the button to get a PDF report from LyX, which was quite handy (<https://yihui.org/knitr/demo/lyx/>).

After the Sweave work was done, I suggested Markdown to RStudio developers, and fortunately they listened. The progress was fast; soon we had a format named _R Markdown_ in RStudio. That was when I believed RR became accessible to the general audience.

> And suddenly a golden glow descended on me, and all my sins were washed away...

Many people seem to have been waiting for a simple format like R Markdown for a long time. The only thing you need to do for a reproducible report is to write code and text. When you write in LaTeX, there are tons of rules to remember like which characters need to be escaped, or how to write a backslash or tilde, whereas in Markdown, you feel like writing emails.

JJ Allaire (one of the RStudio authors) and I were invited to give [a talk](//slides.yihui.org/2012-knitr-RStudio.html) at useR! 2012 on RR a few days ago, and we successfully convinced quite a few people to RR and R Markdown. One of my points was that RR should be made enjoyable. If people suffer from tools all the time, there is no hope for RR to become the common practice. To ask people to go to the right way, we just need to make the right way easier than the wrong way (one smart guy in the audience said this after we gave a talk to the Twin Cities R User Group). Chris Fonnesbeck, an instructor in Biostatistics at Vanderbilt University, decided to completely ban Word documents in his Bios301 this Fall. I admire his courage, and I am evil to be happy to see Word die, but I will be happier if the students can see why Word sucks and how **knitr**/RStudio/R Markdown can make things much easier and more beautiful. As I proposed at useR! 2012, we should really start to train students to do their homework assignments in a reproducible manner before they do research in the future. This is not hard now.

Kevin Coombes and Keith Baggerly are the two heroes (and detectives) who revealed the Duke scandal, which I mentioned before. They have been trying to promote Sweave, and I was thrilled at useR! 2012 that Kevin used one slide to introduce **knitr** in his invited talk. I was also excited when Keith told me R Markdown was cool and he was going to use it in his reports.

There are many other features in **knitr** which make RR enjoyable. For example, code is highlighted by default so that _plain text_ will not become _pain text_; for users who do not care about coding styles, their code will be automatically reformatted with the **formatR** package to make ugly code more readable (Martin Maechler does not like this but he is an R expert and knows how to format R code); figures will never exceed the page margin in LaTeX output; you do not have to use dirty tricks in order to get multiple figures per chunk; ... In all, we get beautiful reports by default, although the _beauty_ here is highly opinionated.

It is always enjoyable when we can embrace the web, where we have lots of fancy technologies. Markdown can be easily translated into HTML, so we can build web applications with **knitr** as well. Two examples:

1. [Rpubs.com](http://rpubs.com): you can publish your reports to this website (hosted by RStudio) freely from RStudio, and you can see there have already been a couple of nice reports (just forget about emailing ugly Word documents back and forth)
2. An OpenCPU demo: <http://public.opencpu.org/apps/knitr/> (you do not need anything but a web browser, then you can compile a report in the cloud)

You can see what other people have been doing with **knitr** at <https://yihui.org/knitr/demo/showcase/>. Let's stop the old habit of copy and paste. Let the code speak, and in code we trust.

