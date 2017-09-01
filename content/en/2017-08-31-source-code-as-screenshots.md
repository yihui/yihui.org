---
title: We Cannot Be Friends If You Share Source Code As Screenshots
author: Yihui Xie
date: '2017-08-31'
slug: source-code-as-screenshots
---

After having seen this many times before, I decided to write a short post about it. I don't know why some people prefer using screenshots when sharing source code (e.g., [rstudio/rmarkdown#520](https://github.com/rstudio/rmarkdown/issues/520) and [rstudio/rmarkdown#1133](https://github.com/rstudio/rmarkdown/issues/1133)). One day [Robert Flight said](https://twitter.com/xieyihui/status/875576180061028352) that he realized he was silly to include source code as screenshots, and I replied: 

> "We cannot be friends if you insert source code as screenshots."

Screenshots are good for showing problems relevant to your screen. The most obvious use case is to show problems in a certain GUI (graphical user interface). When you share source code, it often does not matter what your screen looks like. It is the plain text that is essential and important.

If you only share screenshots of source code, you are forcing other people to type everything out in the images if they need to run your source code, which is meaningless. What is more, this can be very frustrating when you file bug reports, and (busy) package authors cannot run your code immediately. Ideally, when you ask a question or file a bug report, you should make it as smooth as possible for other people to step right into your issue, instead of having to go back and forth with you before they can really do anything.

I wrote a post on "[Code Pollution With Command Prompts](/en/2013/01/code-pollution-with-command-prompts/)" a couple of years ago based on the same idea, but some people still prefer their own habits (feeling more comfortable with seeing prompts) over convenience to other people.
