---
title: Dokuwiki Plugins animation and math Added
date: '2008-06-04'
slug: dokuwiki-plugins-animation-and-math-added
---

I spent three days on these two plugins. The first one "[animation](http://animation.yihui.org/wiki:animation_plugin)" is written by myself after a quick view of the instructions on writing plugins for Dokuwiki, as there is no such kind of plugins so far. What I want to say is "Regular expression is really a devil"! It has almost taken me a whole day to understand how to use a correct pattern to match the parameters in the tags...

Then I modified the "[math](http://wiki.splitbrain.org/plugin:math)" plugin so that it is much easier and more familiar for us to type LaTeX formulae in the wiki pages: just use `$...$` or `$$...$$`. People who are familiar with LaTeX surely know what they mean.

By the way, [Philippe Grosjean](http://www.sciviews.org/_phgrosjean) has kindly provided me the necessary files for highlighting R code in the Dokuwiki system. That's really fantastic! See [this page](http://animation.yihui.org/wiki:math) for some examples.

So the main infrastructure has been built till now; the next step is to modify my [**animation**](http://cran.r-project.org/package=animation) package and include more functions which have been in my mind for a long time. Then I will begin to migrate the old web pages to [AniWiki](http://animation.yihui.org).
