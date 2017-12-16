---
title: Why TinyTeX?
subtitle: What is the pain with other LaTeX distributions?
date: '2017-12-15'
---

Some developers may doubt if I'm just reinventing wheels. I certainly don't want to reinvent wheels for no reason. As I said on the homepage, my own pain with existing LaTeX distributions is that they are often too big, and the documentation, while being comprehensive and useful, usually does not highlight the most useful part to me (how to find and install a missing package).

I also dislike the fact that it often requires `sudo` (on *nix) to manage LaTeX packages. For personal computers, I don't see any point of requiring `sudo`, considering the fact that TeX Live can be a self-contained folder that can be placed anywhere on your computer.

My daily OS is macOS, and the officially recommended TeX Live distribution is MacTeX, which contains several additional packages that I don't need, such as the TeX Live Utility (I know how to use the `tlmgr` command), TeXShop (I use R Markdown primarily and hope not to edit or even read raw LaTeX if possible), LaTeXiT, and so on. 

In fact, I appreciate one nice feature of MiKTeX on Windows (which seems to be cross-platform now): automatically installing missing LaTeX packages. I think this is very helpful, so I borrowed this feature to the R package **tinytex**, and R users can enjoy the same feature when using TeX Live or TinyTeX. That said, even the basic MiKTeX is still too big, and one issue that drives me crazy is `bibtex.exe` in MiKTeX: it always adds the `.bib` extension to the bibliography database file in the `.aux` file, e.g., when we have `\bibliography{foo.bib}` in `bar.tex`, `bibtex.exe` generates `\bibdata{foo.bib.bib}` in `bar.aux`. Anyway, I have [patched this issue](https://github.com/yihui/tinytex/blob/4275a375c6/R/latex.R#L189-L196) in the R package **tinytex** for Windows users who use MiKTeX. TeX Live users don't suffer from this issue.

On this page, I'll let other users share their stories of installing and managing LaTeX. First I want to show a list of painful cases that I was aware of:

- [Why LaTeX is such a bloated system?](https://ubuntuforums.org/showthread.php?t=395863)

- [Is there a lightweight implementation/distribution of TeX for Mac OSX?](https://tex.stackexchange.com/q/43862/9128)

- [Installing (a lightweight version of) latex on an external hard drive](https://tex.stackexchange.com/q/81802/9128)

- texlive-full is [too big](https://github.com/rstudio/rticles/pull/130#issuecomment-313732003), and [just too big](https://github.com/road2stat/liftr/issues/25) for Docker images

- [Which LaTeX to install on Linux?](https://tex.stackexchange.com/q/18939/9128)

- Missing LaTeX packages confuse users [forever](https://github.com/rstudio/rmarkdown/issues/359), [forever](https://github.com/rstudio/rmarkdown/issues/1076), and it takes [forever](https://twitter.com/xieyihui/status/763805846807547904) to figure them out and install. [Error messages](https://stackoverflow.com/q/47400936/559676) can also be confusing.

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

> Seriously one of my only holdups teaching LaTex in Rmarkdown (still taught it anyway) is now solved.

> --- [ Tyson Barrett](https://twitter.com/healthandstats/status/941169151749406720)
