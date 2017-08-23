---
title: IPython vs knitr, or Python vs R
date: '2012-11-23'
slug: ipython-vs-knitr
---

I watched this video by Fernando Pérez a few days ago when I was reading [a comment](http://simplystatistics.tumblr.com/post/35778860973/reproducible-research-with-us-or-against-us) by James Correia Jr on Simply Statistics:

<iframe width="560" height="315" src="https://www.youtube.com/embed/F4rFuIb1Ie4?rel=0" frameborder="0" allowfullscreen></iframe>

This is absolutely a fantastic talk that I recommend everybody to watch (it is good in both the form and content). Not surprisingly, I started thinking ipython vs knitr. [Corey Chivers](http://bayesianbiologist.com/2012/11/21/ipython-vs-rstudioknitr/) said we could learn a lot from each other, and that is definitely true on my side, since ipython is so powerful now.

## ipython and knitr

I did not take a close look at ipython when I was designing knitr because I'm still at the "hello-world" level in Python, and I did not realize until I watched the video that we ended up with some common features like:

- support to Markdown/MathJax (to be fair, MathJax is RStudio and [**markdown**](http://cran.r-project.org/package=markdown) instead of knitr's contribution), not to mention HTML and LaTeX
- multi-language integration: [`*magic`](http://ipython.org/ipython-doc/stable/config/extensions/index.html) in ipython (rmagic, octavemagic, ...) vs [`engines`](/knitr/demo/engines/) in knitr (python, ruby, bash, C++, ...)
- support to D3 ([knitr example](http://vis.supstat.com/2012/11/contour-plots-with-d3-and-r/); I did not find a live example with ipython at the moment)

Obviously knitr is still much weaker than ipython in many aspects, but some aspects do not really hurt; for example, the user interface. IPython enables one to write in the browser, which looks cool and is indeed useful. We ([Carlos](http://cscheid.net), [Simon](http://www2.research.att.com/~urbanek/) and I) had a similar attempt called [RCloud](https://github.com/cscheid/rcloud) in the summer this year when I was doing intern at AT&T Labs, which was a combination of Rserve, FastRWeb, knitr, Markdown and a bunch of JS libraries. The user interface is pretty much like ipython; in fact, it was inspired by ipython.

The RCloud project is not completely done yet, but I believe RStudio has done a fair amount of work to make the user interface more friendly, so I'm not terribly worried.

## Python community

That being said, I felt overwhelmed when I saw the Emacs client for ipython in the talk. On one hand,

> 日本のプログラマが最も私を驚かせた

(I wrote that by Google translation; not sure if it is accurate; I mean in terms of nationality, _Japanese programmers have surprised me most_; examples include the Ruby language, [Kohske Takahashi](http://rpubs.com/kohske) and [kaz_yos](http://rpubs.com/kaz_yos))

![IPython Notebook in Emacs](https://github.com/tkf/emacs-ipython-notebook/raw/data/screenshots/notebook_simple_plot.png)

On the other hand, the R community is still too small compared to Python. I have been looking forward to the R Markdown support in Emacs/[ESS](http://ess.r-project.org). The infrastructure on R's side has been ready for quite a while. ESS developers have been working hard, but we just need more force to spin R to a higher level in a more timely fashion (embrace the web server, EC2, D3, web sockets, Julia and all the cool stuff; not only generalized linear models).

## R community

Small as it is, the R community is also moving to interesting directions. I especially agree with Jeff Horner on his recent post [Innovation in Statistical Computing](http://jeffreyhorner.tumblr.com/post/35782252672/innovation-in-statistical-computing) that RStudio has been making remarkable and innovative contributions to the R community. I think one thing important is that RStudio developers are not statisticians like R core. The R community absolutely needs this kind of fresh power: good sense of user interface, good knowledge of modern computing technologies and most important of all, good project/product managers.

The [shiny](http://www.rstudio.com/shiny/) package is yet another example besides what were mentioned in Jeff's post. I think it is interesting to compare shiny with Rserve, FastRWeb, gWidgetsWWW(2), rApache, Rook and older packages like CGIwithR. From the technical point of view, each package in the latter group may be more complicated than shiny (Simon, Jeff and John are extremely smart guys), but apparently shiny has become the Gangam style of R web apps. Most users will not, nor do they, care about the technology behind the package. A developer may feel unfair that the user only sees the nice [twitter bootstrap](http://twitter.github.com/bootstrap/) style, without noticing the [websockets](https://github.com/rstudio/R-Websockets), but that is just the fact.

I always regard R as a _general computing language_ instead of for statistics only. We need more geeks in the R community both to understand non-statistical technologies such as Emacs Lisp, JavaScript and Httpd, etc, and to connect them to certain aspects of (computational) science such as reproducible research.

## Misc

When I saw the 3D barplot in the talk, I feel R graphics will be able to survive longer for a while.
