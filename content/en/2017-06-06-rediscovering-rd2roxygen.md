---
title: Rediscovering Rd2roxygen
date: '2017-06-06'
slug: rediscovering-rd2roxygen
---

During a lunch with [Rob Hyndman](https://robjhyndman.com) and [Earo Wang](https://earo.me) last week in Melbourne, I was surprised to know  that there still existed packages that did not use [**roxygen**](https://cran.rstudio.com/package=roxygen2) to write the R documentation (my greatest sympathy to those poor authors), and I was also pleasantly surprised that Rob knew and actually used my [**Rd2roxgyen**](/Rd2roxygen) package to convert the documentation of his packages to **roxygen**.

After Earo heard about this, she immediately [started working](https://github.com/earowang/hts/commit/ad6ae35e708d7dbee79f29a529db414d3ea93abc) on her **hts** package. She was one of the most impressive R ladies I had ever met. With a Buffalo wing in her left hand, and the Z shell in the right hand, she almost got it done a few minutes after Rob and I talked briefly about **Rd2roxygen**.

I [blogged about **Rd2roxygen**](/en/2010/12/rd2roxygen-convert-rd-to-roxygen-documentation/) in 2010 and have almost forgotten it (that is why blogging is important). Today I just saw Joseph Stachelek [tweeted about it](https://twitter.com/jjstache/status/872098193328230400). I'm happy that people still keep rediscovering it.

Without **roxygen**, I don't think I could keep the momentum of working on more R packages. I was totally frustrated with the documentation of my first R package ([**animation**](/animation/)), and almost wanted to give up. Then **roxygen** appeared, thanks to its original authors Peter Danenberg and Manuel Eugster, and I felt it was a life-saver. The main reasons for switching to **roxygen** for me were: 

1. In-source documentation, and no going back and forth between `.R` and `.Rd`.

1. Fewer [backslashes](https://xkcd.com/1638/). It should be well known now that I very much want to avoid reading any source files that contain LaTeX commands.

Over these years there have been a lot of improvements in the **roxygen2** package. For example, originally **roxygen** was actually terribly slow, and it became much faster after Hadley joined the force (it was largely rewritten and released as another package **roxygen2**). Not long ago, **roxygen2** started to support Markdown, too, which means the number of backslashes can be even smaller. Unless you a member of the R core team, I don't see any reasons why you should still stay in the Rd world.

If you still have packages with Rd but not roxygen comments and want to try **Rd2roxgyen**, the most important thing you should know is that [the **Rd2roxygen** conversion from Rd to roxygen is not meant to be perfect](https://github.com/yihui/Rd2roxygen/blob/master/man/Rd2roxygen-package.Rd#L17-L28). Call `Rd2roxygen::Rd2roxygen()` once on your package source directory, and it is quite likely that there are things you need to tweak manually. Make sure that your package source is under version control, so when you `roxygen2::roxygenize()` the package, you can see the differences in Rd files. Of course, you also need to build and install the package, and read the help pages to see if there is anything wrong. This is not pleasant work, but fortunately it is a one-time thing. Once you have moved to the **roxygen** land, your life will be easier ever. And you are free to delete **Rd2roxygen** then.
