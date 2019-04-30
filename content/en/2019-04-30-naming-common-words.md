---
title: Naming Software Packages with Common Words
subtitle: It is probably fine
date: '2019-04-30'
slug: naming-common-words
---

Andrew Gelman [regretted the name "Stan"](https://statmodeling.stat.columbia.edu/2019/04/29/we-shouldntve-called-it-stan-i-shouldve-listened-to-bob-and-hadley/), because it is a common word, which makes it hard to find relevant results on Google. Actually I was taught the same lesson by Hadley when I first created the **knitr** package in 2011. Fortunately I listened. In the very beginning, I simply named it "knit", which is certainly not very "Googleable". Appending "R" after it made it much easier and "neater" to search through Google. In the early years, I had a couple of other packages named after common words, such as [**animation**](https://github.com/yihui/animation) and [**fun**](https://github.com/yihui/fun). These packages were obviously difficult to find via Google, although on the other hand, I guess they are not really important packages, so users won't think of finding them.

In the following years, I tried to stick to this rule of using unique words when naming packages, e.g., **bookdown**, **blogdown**, **xaringan**, and **tinytex**. There is no ambiguity for these packages in Google results now. When I started working on **pagedown** last year, I spent some time on searching for different names on Google, and initially decided to use the name **leafdown**, because it seemed to be unique enough, and "leaf" also has the meaning of "page". The first name that came to my mind was actually **pagedown**, because it was such an obvious choice (an R Markdown package for paged documents). I didn't want to use this name for the obvious reason. However, JJ suggested that I go with the name **pagedown**. His defense was from the experience of "Shiny". Shiny is such a common word, yet after a couple of years, Google started to put our Shiny [on the first page of search results](https://www.google.com/search?q=shiny).

Before I made **pagedown** public on Github, there was another **pagedown** project from StackExchange on Github. I though I'd never be able to compete with StackExchange in the Google search. To my great surprise, our **pagedown** became the first item in the Google search results within three months!

A much more extreme example is the [**DT**](https://github.com/rstudio/DT) package. The name is only two letters. I'd never imagine it could be found via Google. However, even with the two letters, **DT** has made its way to the first page of Google search results.

I guess the new lesson learned here is that a common word as a software package name is probably fine, but you'd better avoid words related to the pop culture or the entertainment industry. If you search for a word on Google and Google shows you YouTube videos or images, it is likely to be a bad idea.
