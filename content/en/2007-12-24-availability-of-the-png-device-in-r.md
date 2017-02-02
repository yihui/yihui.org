---
title: Availability of the PNG Device in R
date: '2007-12-24'
slug: availability-of-the-png-device-in-r
---

In some operating systems, a few R graphical devices might not be available, so we have to check the capabilities of devices before writing code for creating image files in case that there should be errors. The function is just `capabilities()`.

I didn't notice this and was wondering why there were errors in the [check summary](http://cran.r-project.org/src/contrib/checkSummary.html) of my R package [animation](http://cran.r-project.org/package=animation). Now I understand the reason.

