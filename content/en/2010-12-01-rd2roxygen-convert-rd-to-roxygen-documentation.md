---
title: 'Rd2roxygen: Convert Rd to roxygen documentation'
date: '2010-12-01'
slug: rd2roxygen-convert-rd-to-roxygen-documentation
---

I must admit that I have been tired of maintaining my R packages for a long time, and the main reason is I feel really uncomfortable with writing R documentations (Rd). The required structure of an R package mainly includes two directories `R` and `man` -- the former for the R source code (typically functions), and the latter for documentation. In the past I usually use `package.skeleton()` to generate a skeleton of the documentation and fill in the tags one by one. The main headache is to frequently switch between the two files and type the raw Rd commands such as `\title{}` and `\description{}`.

People told me all kinds of advantages of Emacs+ESS in the past few years, and I tried it for more than ten times, but often ended up with frustration (so I installed and removed Emacs repeatedly for several times). My last attempt a few months ago succeeded finally, and I realized how easy it was to document R functions in Emacs with `roxygen`. See the 1-minute video below:

<iframe src="https://player.vimeo.com/video/16619180?badge=0" width="600" height="443" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

In Emacs (with ESS), you just press `C-c C-o` to insert a documentation template as roxygen comments above your function, and the rest of things to do are to fill the `@tags` and update them when necessary. These inline comments will be converted to the real Rd files when we run `R CMD roxygen your.package` or `roxygenize('your.package')`. For details please read the vignette of the [roxygen](http://cran.r-project.org/package=roxygen) package. In all, **roxygen** makes the life of developers much easier. Then a natural problem comes:

> What if I have already been stuck in the raw Rd files?

Since R 2.9.x, Duncan Murdoch announced a new way of parsing Rd files (mainly the function `tools::parse_Rd()`), which is quite useful for converting Rd files to other formats (e.g. `Rd2txt()`, `Rd2latex()`, ...). This also brings us the possibility of converting Rd files to roxygen comments. I asked the question in R-help a few days ago, and Hadley pointed me to his code snippets on this conversion. I was fairly happy about them, so I sat down and spent one day on improving them. Finally I released this work as an R package [**Rd2roxygen** on CRAN](http://cran.r-project.org/packages=Rd2roxygen).

The main function that the developers may want to use is `Rd2roxygen()`: given a package root directory, this function can parse all the Rd files under the man directory, convert them into roxygen comments and update all the corresponding R scripts under the R directory. Most of the Rd tags are supported, but we may need some tiny adjustment by hand. Moreover, the function `roxygen_and_build()` can be of help for building packages. It tries to remove the unnecessary Rd files generated automatically by roxygen, replaces `%` with `\%` (because I believe it is very uncommon to write comments with `%` in Rd files; this replacement is optional, though), and builds the source package. Optionally it also installs or checks the package.

After I have done this package, I experimented on my [**animation**](http://cran.r-project.org/packages=animation) package, and the converted package, when roxygenized, can pass `R CMD check` ([I have moved the package to GitHub](https://github.com/yihui/animation)). This finally gives me new courage to actively maintain my old packages... My brain cannot deal with too many functions without seeing the documentation instantly.

This new package might have little bugs, of course. Please let me know if it does not work for you.
