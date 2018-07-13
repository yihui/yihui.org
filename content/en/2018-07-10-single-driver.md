---
title: Only One Person Can Help You with That
subtitle: My concern about a single bus driver
date: '2018-07-10'
slug: single-driver
---

There is only one thing that really concerns me in open source software development. It is never about how cool the technology is, or how smart a developer is. It is the [bus factor](https://en.wikipedia.org/wiki/Bus_factor).

A couple of days ago I saw [an interesting reply](http://r.789695.n4.nabble.com/CRAN-Update-protocol-buffers-on-macOS-for-RProtoBuf-td4750815.html) from Prof Ripley (I have to take a deep breath right now) re: building the macOS binary of an R package, in which he said:

> Only one person can help you with that, and it is most effective to contact him directly. 

I think you all know whom he meant. The whole R world on macOS is pretty much on his shoulders. Help us, Simon Wan Kenobi, you are our [only hope](http://scifiquotes.net/quotes/152_Youre-My-Only-Hope). We all macOS R users should be extremely grateful to him. But...

That is also what I'm deeply worried about. When users run into certain problems, only one person can help. One person managing more than 12,000 binary packages (although most should be easy to build).

I have been waiting for CRAN to fully embrace Homebrew -- not only the Homebrew packages, but the Homebrew development model: _let the most motivated people work on the particular problems_, instead of having one person to manage them all. You care about a certain binary package? Then you bring a pull request to build it yourself, and make sure you pass the automated tests. The repo maintainer does not really have to know well about every single package.

To some degree, building an open source project is like growing cucumbers. When the project is large enough, it is much more important and sustainable to build a trellis for cucumbers to grow by themselves than taking care of individual cucumbers.
