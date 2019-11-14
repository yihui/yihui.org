---
title: The Trouble of .Rprofile if it Doesn't Have a Trailing Newline
date: '2018-04-06'
slug: rprofile-trailing-newline
---

Yesterday I saw a rather odd issue on Stack Overflow, in which a **blogdown** user said [`options()` set in `.Rprofile` didn't work](https://stackoverflow.com/q/49639533/559676). I was very much confused. Later it turned out that a trailing newline was missing in the R startup profile file `.Rprofile`.

WAT?!

Then I did a quick search, and found [a similar question](https://stackoverflow.com/q/18469416/559676) asked in 2013. 2013! And it is so annoying that R _silently_ ignores the last line. Well, they may argue a line without the trailing newline is not a "line", but it will save us so much trouble if only it issues a warning. Problems like this are so hard to debug.

Anyway, I always configure my text editors to add a newline to the end of text files (below is a screenshot of my RStudio options), so I probably would never have discovered this issue by myself.

![Ensure that source files end with newline in RStudio](https://db.yihui.org/images/rstudio-newline.png)

Update on 2018-06-05: This issue just [continues to confuse more users](https://stackoverflow.com/q/50686292/559676).
