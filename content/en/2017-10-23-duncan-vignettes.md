---
title: 'R Package Vignettes: One Fundamental Contribution of Duncan Murdoch'
date: '2017-10-23'
slug: duncan-vignettes
---

Many R users may have heard this morning that [Duncan Murdoch has stepped down from the R Core Team](https://twitter.com/_R_Foundation/status/922475036593852416) and from the R Foundation. He no longer maintains the Windows R binaries, either.

I haven't had much interaction with Duncan on a personal basis. I think we have met only once at Interface 2012, where I complained about the old-fashioned R homepage to him. I'm definitely not the right person to summarize his enormous contributions to the R world, but after hearing that he was leaving the R Core Team, I briefly recalled what I knew about him in my mind.

If I can only mention one thing in this post, it would be [R package vignettes](https://yihui.org/knitr/demo/vignette/). I mean the non-Sweave vignettes. This would not be possible without Duncan's support and Henrik Bengtsson's hard work. An R package vignette can be an extremely helpful (to users) and convenient (to authors) documentation format, and is a great companion to R help pages.

It was one of my most exciting moments when I learned that non-Sweave vignettes were going to be supported in R 3.0.0. I think it is fairly clear today that limiting R package authors to Sweave in vignettes was not a good idea. Not many authors actually cared to write vignettes when Sweave was the only option, since it basically means you have to write in LaTeX.

Supporting non-Sweave vignettes opened the door wide. It seems we don't really need to persuade package authors that vignettes are important or helpful. When they realize they can write a package vignette in R Markdown, they will just write one. As of today, [there have been 2475 packages](https://gist.github.com/yihui/7698648) with 3777 vignettes based on **knitr** on CRAN. There may be more vignettes not generated via **knitr**. Needless to say, I'm truly happy to see these numbers.

## Appendix: My Bragging Rights

Duncan has submitted [a few pull requests to the **knitr** repo](https://github.com/yihui/knitr/pulls?utf8=%E2%9C%93&q=is%3Apr%20author%3Admurdoch) on Github. When he reported the bug [yihui/knitr#1309](https://github.com/yihui/knitr/issues/1309), I thought to myself if it was possible to get an R Core member to submit a Github pull request (base R is still developed in SVN). I really wanted to show that one did not have to master GIT before one can submit a pull request, because everything can be done through the Github web interface, and no command-line is required. And he made it, and again, and again.

I guess stepping down from R Core does not mean Duncan is leaving the R community, so I'm looking forward to his continued contributions in the future. Thanks for the great service and contributions over the past many years, Duncan!
