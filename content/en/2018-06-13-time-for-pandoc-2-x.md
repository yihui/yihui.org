---
title: Okay, it is Time to Try Pandoc 2.x Now
date: '2018-06-13'
slug: time-for-pandoc-2-x
---

Half a year ago, I said [it was not necessary to upgrade to Pandoc 2.x yet](/en/2017/11/pandoc-2/). Over these months, I have tested Pandoc 2.x by myself with several R packages related to R Markdown, and I feel the R Markdown ecosystem should be ready for Pandoc 2.x now.

- If you are not an RStudio user, you may [install Pandoc by yourself](https://pandoc.org/installing.html).

- If you use RStudio, you may consider trying [the latest preview release of the RStudio IDE](https://www.rstudio.com/products/rstudio/download/preview/), in which we have bundled Pandoc 2.x, so you don't need to install Pandoc separately.

If you encounter any problems with the new version of Pandoc, please feel free to report to [the **rmarkdown** repo](https://github.com/rstudio/rmarkdown) on Github.

P.S. Yes, the new version of Pandoc allows you to create PowerPoint from Markdown. This is also supported in the **rmarkdown** package and the preview release of RStudio. Please do us a favor to carefully test this feature if you are interested in PowerPoint. [I hope we can get enough testing](https://community.rstudio.com/t/8441) before anyone shouts out loud on Twitter. Thanks!
