---
title: Once in a Blue Moon, I Reached "Issue Zero" in a Github Repo
subtitle: The new CRAN release of the rticles package
date: '2018-07-06'
slug: issue-zero
---

"Inbox Zero" (no emails in the inbox) may never be possible to me again, but today I reached a goal of "Issue Zero" for the Github repo [rstudio/rticles](https://github.com/rstudio/rticles). I have to say this is so rare. In fact, it is the very first time I have been able to close _all_ issues in a Github repo.

![no more rticles issues](https://user-images.githubusercontent.com/163582/42387508-1158fcbc-8108-11e8-8e09-7fe979ac1a13.png#border)

## Answer all questions and kill all bugs

Last week [we were reminded](https://github.com/rstudio/rticles/issues/178) of the fact that the **rticles** package had not been updated on CRAN for more than a year. Its original maintainer (JJ) asked me for help, so I spent the last week and this week on the new CRAN release. Initially I only planned to take a look at existing pull requests, which contained new article formats contributed from other users. After reviewing all pull requests, I also looked at the issues. I knew there was an annoying long-standing bug (you could not use `$` in JSS or R Journal articles), which I really hoped to fix, because it has affected multiple users ([#6](https://github.com/rstudio/rticles/issues/6), [#10](https://github.com/rstudio/rticles/issues/10), [#49](https://github.com/rstudio/rticles/issues/49), [#70](https://github.com/rstudio/rticles/issues/70), [#132](https://github.com/rstudio/rticles/issues/132), [#149](https://github.com/rstudio/rticles/issues/149), and [rstudio/rmarkdown#398](https://github.com/rstudio/rmarkdown/issues/398)).

Once I started working on Github issues, I thought it might be good to take advantage of the inertia, which is often hard to obtain. Finally I answered all questions and fixed all bugs reported in these issues. During this process, I realized that [we didn't even support bibliography](https://github.com/rstudio/rticles/issues/71) for The R Journal articles. That was such a shame. How could we have provided such a half-baked product? It revealed the fact that **rticles** maintainers at RStudio didn't really write journal articles with the **rticles** package (i.e., we don't eat our own **rticles** dog food), which means we are probably not the most appropriate people to work on these article formats. We absolutely need more contribution from real authors and LaTeX experts. On the other hand, this also means **rticles** users may have better luck when asking questions in other public forums such as Stack Overflow or RStudio Community instead of Github issues, because we maintainers are not experts of these article formats, and I don't want you to wait for four years for me to answer your question.

## No more looking for missing LaTeX packages

The best thing I did for this release was [enabling Travis CI](https://github.com/rstudio/rticles/pull/130) for this repo (thanks to Zhian N. Kamvar). Yes, it was so late, and such a big shame. We should have enabled Travis CI years ago. Previously JJ was just trying to manually test everything locally on his computer when new pull requests came in.

One nice thing about the Travis setup is that it uses (and caches) [TinyTeX](/tinytex/), so that any missing standard LaTeX packages required by the article formats can be automatically installed on Travis (and cached). No `sudo` is required.

```yaml
cache:
  packages: true
  directories:
    - $HOME/.TinyTeX
latex: false

env:
  global:
    - PATH=$HOME/bin:$PATH

before_install:
  - wget -qO- https://yihui.org/gh/tinytex/tools/download-travis-linux.sh | sh
```

At this moment, the setup for R on Travis adds symlinks of TeX Live executables to `/usr/local/bin`, which prevents us from installing other executables (such as `epstopdf`). That is why I disabled the default LaTeX installation `latex: false`.

## Hi, Journal of Statistical Software

Early last year, the editor of JSS said the JSS article format in **rticles** [was "unacceptable"](https://github.com/rstudio/rticles/issues/102). I was sad to hear that. I'm [always sad to hear](/en/2017/12/formatting-papers/) formatting issues could be real and critical issues. Anyway, after some communication with the editor, we happily and [easily](https://github.com/rstudio/rticles/commit/65a66b51) resolved the main issue (bibliography should have been generated via **natbib**). So it was actually not too bad. After fixing the dollar sign issue mentioned before, and the issue of authors on multiple lines ([#100](https://github.com/rstudio/rticles/issues/100)), personally I feel the JSS article format in **rticles** is pretty good now. The new version of **rticles** (v0.5) has been released on CRAN. Let's see if we can survive the journal of the highest LaTeX standard in the world this time.

![Am I awesome enough now?](https://slides.yihui.org/gif/awesome-me.gif)
