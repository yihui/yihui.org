---
title: 'swfDevice, RGoogleTrends, FlashMXML, and SVGAnnotation'
date: '2009-10-19'
slug: some-interesting-packages-in-r-swfdevice-rgoogletrends-flashmxml-svgannotation
---

I love R because there are always exciting new packages which can be far beyond your imagination. Here I'd like to introduce a couple of packages that look really awesome:

# 1. swfDevice: R graphics device for SWF output (by Cameron Bracken)

This package is still at a pre-alpha stage but you can see a sketch now in R-Forge: <https://r-forge.r-project.org/projects/swfdevice/>

Its author, Cameron, certainly knows well that I will be excited to see it, because I've been waiting for a long long time for the REAL Flash animation output in R. What I've done in my `animation` package is simply using SWF Tools to combine several static pictures (PNG or PDF, ...) into a naive Flash animation -- by "naive" I mean there is no interaction or real dynamic stuff in the Flash animation. Hopefully Cameron will provide a useful tool to create genuine Flash animations directly from R (with the help of the library `libming`).

By the way, I have to mention that the `tikzDevice` package by Cameron and another author is also fantastic for generating high-quality graphics LaTeX.

# 2. RGoogleTrends: Query and download Google Trends data in R

Ever heard of [Google Trends](http://www.google.com/trends)? Duncan Temple Lang released an R package named [RGoogleTrends](http://www.omegahat.org/RGoogleTrends) that allows you to download Google Trends data directly from R. Basically this package uses `RCurl` to log in your Google account and send queries to get Google Trends data. Well, you may ask "why bother using a package since I can manually download the data by myself?"; just imagine R can automatically and dynamically do it for you, so you don't have to open the web page every day.

# 3. FlashMXML and SVGAnnotation: New graphics devices for R

They are also written by Duncan Temple Lang. `FlashMXML` can record R graphics in MXML (a kind of XML language) and we can compile the XML file to Flash output. `SVGAnnotation` enables us to save R graphics in SVG format, which also supports animation. The function `animate()` will be of great help to my `animation` package, I think.

You may check the Omegahat website for more interesting packages: <http://www.omegahat.org>

