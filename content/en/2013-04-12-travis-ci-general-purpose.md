---
title: Travis CI for R! (not yet)
date: '2013-04-12'
slug: travis-ci-general-purpose
---

A few days ago I [wrote](/en/2013/04/travis-ci-for-r/) about Travis CI, and was wondering if we could integrate the testing of R packages into this wonderful platform. A reader (Vincent Arel-Bundock) pointed out in the comments that Travis was running Ubuntu that allows you to install software packages at your will.

I took a look at the [documentation](http://about.travis-ci.org/docs/), and realized they were building and testing packages in virtual machines. No wonder `sudo apt-get` works. Remember `apt-get -h | tail -n1`:

> This APT has Super Cow Powers. (APT有超级牛力)

## R on Travis CI

Now we are essentially system admins, and we can install anything from Ubuntu repositories, so it does not really matter that Travis CI does not support R yet. Below are a few steps to integrate your R package (on Github) into this system:

1. follow the [official guide](http://about.travis-ci.org/docs/user/getting-started/) util you see `.travis.yml`;
1. copy my [`.travis.yml`](https://github.com/yihui/knitr/blob/master/.travis.yml) for the **knitr** package if you want, or write your own;
    - I use a custom library path `~/R` to install add-on R packages so that I do not have to type `sudo` everywhere
    - at the moment I use the RDev PPA by Michael Rutter to install R 3.0.0 since his plan for R 3.0 on CRAN is in May; at that time I'll change this PPA to a CRAN repository
    - since `R CMD check` requires all packages in `Suggests` as well, I install **knitr** using `install.packages(dep = TRUE)` to make sure all relevant packages are installed
    - `make install` and `make check` are wrappers of `R CMD build` and `R CMD check` respectively, defined in the [`Makefile`](https://github.com/yihui/knitr/blob/master/Makefile)
1. push this `.travis.yml` to Github, and Travis CI will start building your package when a worker is available (normally within a few seconds);

By default you will receive email notifications when there are changes in the build. You can also find the guide on the build status image in the documentation as well, e.g. [![Build Status](https://travis-ci.org/yihui/knitr.png)](https://travis-ci.org/yihui/knitr)

What I described here actually applies to any software packages (not only R), as long as the dependencies are available under Ubuntu, or you know how to build them.

## But it is still far from CRAN

OK, it works, but we are still a little bit far from what CRAN does, because Travis CI does not have official support for R. Each time we have to install one Gigabyte of additional software to create the R testing environment (sigh, if only R did not have to tie itself to LaTeX). If these packages are pre-built in the virtual machines, it will save us a lot of time.

~~The second problem is, there is no Windows support on Travis CI~~ (one developer told us on [Twitter](https://twitter.com/henrikhodne/status/322667858205241344) that it was coming). There is [a page](http://about.travis-ci.org/docs/user/osx-ci-environment/) for OS X, but I did not really figure out how to build software under OS X there.

The third problem is Travis CI only builds and tests packages; it does not provide downloads like CRAN. Perhaps we can upload the packages using [encryption keys](http://about.travis-ci.org/docs/user/encryption-keys/) to our own servers.

## R-Forge, where are you going?

<!--
[R-Forge](http://r-forge.r-project.org/), the most promising "Travis CI" in the R world, is slow and broken from time to time according to my experience. For developers, immediate feedback is precious -- you push some changes to the repository and you want to know immediately if anything is broken. Usually we have to wait for at least one day for the new build on R-Forge. Sometimes the system hangs up for unknown reasons, and the admin has to be notified by users to solve the problem seven days later. There are always requests like "Could you install the foo package for my bar package?" Meanwhile, the development version of R has been disabled for a long time, which is really unfortunate since CRAN insists that packages should be checked against both the current version and the development version of R. What is really funny is that the build and check log links are hidden (by default) behind a button called "Show/Hide extra info". Why don't you want us to see that??
-->

I will shut up here since I realized I was not being constructive. Let me spend more time thinking about this, and I love to hear suggestions from readers as well.

So, two potential Google Summer of Code projects:

- make R an officially supported language on Travis CI (this really depends on if the Travis team want it or not)
- improve R-Forge (of course this depends on if the R-Forge team think they need help or not)

