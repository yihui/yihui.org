---
title: The R Markdown Source Documents of My Presentations
date: '2018-03-06'
slug: pres-rmd-source
---

Since I have been asked several times how I created my slides, I'm going to share a little secret about my slides in this short post: most of my slides in the recent years were generated from R Markdown,[^1] and you can easily obtain the `.Rmd` source documents if you replace the extension `.html` with `.Rmd` in the address bar of your web browser. That's it. For example, for the slides at

```
https://slides.yihui.org/2018-blogdown-rstudio-conf-Yihui-Xie.html
```

The Rmd source file can be obtained from:

```
https://slides.yihui.org/2018-blogdown-rstudio-conf-Yihui-Xie.Rmd
```

I host most of my slides in my Dropbox folder and serve them through Updog,[^2] so I don't need to explicitly upload them to a server, and you have access to any files in this folder.

[^1]: The more recent ones were created via the **xaringan** package. Previously I had used Slidy, revealjs, and ioslides in R Markdown.

[^2]: It is a little expensive now, but I was fortunate enough to catch the train early when the lifetime membership only cost me five dollars.
