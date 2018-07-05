---
title: Why TinyTeX?
subtitle: What is the pain with other LaTeX distributions?
date: '2017-12-15'
---

Some developers may doubt if I'm just reinventing wheels. I certainly don't want to reinvent wheels for no reason. As I said on the homepage, my own pain with existing LaTeX distributions is that they are often too big, and the documentation, while being comprehensive and useful, usually does not highlight the most useful part to me (how to find and install a missing package).

I also dislike the fact that it often requires `sudo` (on *nix) to manage LaTeX packages. For personal computers, I don't see any point of requiring `sudo`, considering the fact that TeX Live can be a self-contained folder that can be placed anywhere on your computer. I waited for a couple of years before `tlmgr` was finally available on Debian/Ubuntu, and I was [extremely excited](https://twitter.com/xieyihui/status/397238590523973632) about it, but soon disappointed, because it seemed to be broken and not usable at all (couldn't do anything with it). I checked it again this year, and it still seems to be broken. Perhaps I didn't use it correctly (anything I try will lead to errors), but you are only allowed to use the user mode of `tlmgr`, which is very restrictive to me.

My daily OS is macOS, and the officially recommended TeX Live distribution is MacTeX, which contains several additional packages that I don't need, such as the TeX Live Utility (I know how to use the `tlmgr` command), TeXShop (I use R Markdown primarily and hope not to edit or even read raw LaTeX if possible), LaTeXiT, and so on. 

In fact, I appreciate one nice feature of MiKTeX on Windows (which seems to be cross-platform now): automatically installing missing LaTeX packages. I think this is very helpful, so I borrowed this feature to the R package **tinytex**, and R users can enjoy the same feature when using TeX Live or TinyTeX. That said, even the basic MiKTeX is still too big, and one issue that drives me crazy is `bibtex.exe` in MiKTeX: it always adds the `.bib` extension to the bibliography database file in the `.aux` file, e.g., when we have `\bibliography{foo.bib}` in `bar.tex`, `bibtex.exe` generates `\bibdata{foo.bib.bib}` in `bar.aux`. Anyway, I have [patched this issue](https://github.com/yihui/tinytex/blob/4275a375c6/R/latex.R#L189-L196) in the R package **tinytex** for Windows users who use MiKTeX. TeX Live users don't suffer from this issue.

On this page, I'll let other users share their stories of installing and managing LaTeX. First I want to show a list of painful cases that I was aware of:

- [Why LaTeX is such a bloated system?](https://ubuntuforums.org/showthread.php?t=395863)

- [Is there a lightweight implementation/distribution of TeX for Mac OSX?](https://tex.stackexchange.com/q/43862/9128)

- [Installing (a lightweight version of) latex on an external hard drive](https://tex.stackexchange.com/q/81802/9128)

- texlive-full is [too big](https://github.com/rstudio/rticles/pull/130#issuecomment-313732003), [too big](https://github.com/rocker-org/rocker/issues/266), and [just too big](https://github.com/road2stat/liftr/issues/25) for Docker images

- [Which LaTeX to install on Linux?](https://tex.stackexchange.com/q/18939/9128)

- Missing LaTeX packages confuse users [forever](https://github.com/rstudio/rmarkdown/issues/359), [forever](https://github.com/rstudio/rmarkdown/issues/1076), [forever](https://github.com/rstudio/rmarkdown/issues/1393), and it takes [forever](https://twitter.com/xieyihui/status/763805846807547904) to figure them out and install. [Error messages](https://stackoverflow.com/q/47400936/559676) can also be confusing. Sometimes we just [don't have a clue](https://github.com/rstudio/bookdown/issues/507).

- MiKTeX [might fail](https://github.com/rstudio/bookdown/issues/531) and we don't know what the error message "GUI framework cannot be initialized" means. Sometimes we have [no clue](https://stackoverflow.com/questions/48892499/compile-rmarkdown-document-with-render#comment84801684_48892499) why it doesn't work.

Below are stories and experiences contributed by other users:

> Removed TeX Live from my system (openSUSE): 1.5gb. Installed TinyTeX + the dependencies to compile my thesis: 150mb!!!! This is great!

> --- [Bruno Rodrigues](https://twitter.com/brodriguesco/status/942162790587957248)

<!-- -->

> Really liking the simplicity of tinytex package. Easy to get up and running to knit PDFs. No need for slow LaTeX install.

> --- [Daley Mikalson](https://twitter.com/lingwhatics/status/941766989424537602)

<!-- -->

> A tiny LaTeX distribution easy to install from RStudio or on Travis CI is just what we needed!

> --- [Philippe Grosjean](https://twitter.com/PhilGrosjean/status/941241878309232640)

<!-- -->

> Seriously one of my only holdups teaching LaTeX in Rmarkdown (still taught it anyway) is now solved.

> --- [ Tyson Barrett](https://twitter.com/healthandstats/status/941169151749406720)

<!-- -->

> Tried TinyTeX with rmarkdown and both English and Chinese rendering. The most smooth experience ever using LaTeX!

> --- [Kun Ren](https://twitter.com/renkun_ken/status/941352666730455041)

<!-- -->

> TinyTeX is awesome, if it had existed before I would have saved hours of my life spent dealing with LaTeX packages and failed R Markdown knits...

> --- [Antonio Vazquez Brust](https://github.com/rstudio/bookdown/issues/292#issuecomment-356480809)

<!-- -->

> Many people don't realize that Texlive on some Linux systems (say you need a rstudio server) doesn't come with the TeX package manager. If the package you need is not in their system, you are basically screwed as you can't even install it. TinyTeX solves this problem and makes everything sweet and easy. Also, after using it for more than a month, I found the  messages of tinytex are very helpful, comparing with basically NULL in texlive. 

> --- [Hao Zhu](https://community.rstudio.com/t/texlive-distribution-on-centos-for-rstudio-server-and-connect/2916)

<!-- -->

> I'm a novice with R and I found the entire process of installing rmarkdown, knitr, MiKTeX, and pandoc and then reconciling all their directories very difficult. [...] The 3-4 hour detour into MiKTeX etc and how to produce PDFs was a frustration experience to say the least. (Up and running with TinyTeX five minutes later...)

> --- Justin Shapiro

<!-- -->

> If you work in a locked down windows corporate enviroment and spent countless hours with MiKTeX or portable MiKTeX, you'll want to buy @xieyihui lunch.

> --- [Thomas Speidel](https://twitter.com/ThomasSpeidel/status/957856056108920835)

<!-- -->

> Too bad, this computer had a good month of TeX-free.

> --- [Romain François](https://twitter.com/romain_francois/status/979022989634174976)

<!-- -->

> I'd been avoiding installing LaTeX on my macOS and Windows machines b/c it's always such a hassle. Just learned about about TinyTeX today and easily got setup on both machines.

> --- [John Blischak](https://twitter.com/jdblischak/status/974066342780461056)

<!-- -->

> Like 2 hours later, I'm not sure I want to know, but there *must* be a faster way of updating all my TeX packages than the ftp in TeX Live Utility...

> --- [Mara Averick](https://twitter.com/dataandme/status/994531189217259521)

<!-- -->

> Installing a complete version of MiKTeX is a freaking nightmare though. Don't know if it's my internet connection or what but I just can't get it all installed in one go. I finally just did the basic install and am selecting batches of pkgs at a time to add.

> [...] I just installed this (TinyTeX) and it was SO EASY and I'm kind of upset that I didn't know about it before. Gonna be shouting this one [from the rooftops](https://twitter.com/swmpkim/status/1014546819085369344).

> --- [Kim Cressman](https://twitter.com/swmpkim/status/1014514680088399874)

