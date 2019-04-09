---
title: Build Binary R Packages for the Homebrew Version of R?
subtitle: The missing CRAN repository for Homebrew R users
date: '2018-06-14'
slug: homebrew-binary-r-packages
---

> **Update on 2018-07-01**: I have changed the scope of the repository https://macos.rbind.io. Please ignore the post below, and see [this post](/en/2018/07/cranextra-macos/) instead.

One of the open source projects is not like the others. The project is called [Homebrew](https://brew.sh). In my eyes, it is *the* most successful open source project in history in several aspects. I saw an interesting graph [on Twitter](https://twitter.com/nayafia/status/1004526578175361024) a few days ago, which perfectly characterized the amazing community nature of Homebrew:

![Magnet or Sticky?](https://pbs.twimg.com/media/DfDI76AUwAAHE8m.jpg)

Personally I don't really care about if a project is "sticky", and I believe being magnetic is a lot more difficult and valuable than being sticky for an open source project. Okay, that is a little bit digression for this blog post.

## Why using Homebrew?

Do I need to repeat the merits of Homebrew? The key is automation. In most cases, you can install a system software package with one command, and it does not require `sudo`. Compare this with the traditional way of installing software on macOS: how many mouse clicks does it take for you to find, download, open, and install a package? No matter how inconvenient it was the last time you installed a package, the next time you will have to go through the painful process again if you want to upgrade a package. Worse, if you want to [uninstall a package](https://stackoverflow.com/q/25925752/559676) installed from a `*.pkg` installer, sometimes you may want to kill yourself, and Windows users will be able to laugh out loud at you, since it is so awkward to cleanly uninstall a package on macOS.

Isn't Homebrew just `apt(-get)` on Debian/Ubuntu or `yum` on CentOS? Well, I believe Homebrew did one thing absolutely correctly: it does not require `sudo` (and everything is written to `/usr/local`). This is important and a perfect decision for personal computer users. Yes, `sudo` makes perfect sense for a system with multiple users (e.g., a Linux server), but I really don't like it in the case of a single user installing software on his/her own computer. Requiring `sudo` also makes me nervous: What exactly will the installer do? Does it write to `/usr` or `/opt` or elsewhere? I have no idea. I'm just a dumb user of my own computer. I don't want to be a sysadmin, and I don't want to touch the directories to which I don't have write permission without inputting my password. If I touch them, I'm likely to forget what I did someday.

## Homebrew and R

Thanks to many contributors to [the R formula](https://github.com/Homebrew/homebrew-core/blob/master/Formula/r.rb) in Homebrew, it is easy to install a pre-built binary package of R:

```sh
brew install r
```

For developers, you may also want TeXinfo (for `R CMD check`) and XQuartz (for R packages like **rgl**):

```r
brew install texinfo
brew tap homebrew/cask
brew cask install xquartz
```

## The missing CRAN repository

If you use the Homebrew version of R, it will be super easy to upgrade or remove R in the future. However, the biggest problem is the add-on R packages from CRAN. Currently you can only install those packages from source with the Homebrew version of R (because it is not officially supported by CRAN), i.e.,

```r
install.packages(..., type = 'source')
```

Actually, installing R packages from source may not be as bad as you thought. About 75% packages on CRAN do not need compilation, which means they are pure R packages, without C/C++/Fortran code. These packages can be easy and fast to install from source.

For the rest of 25%, most don't require external system dependencies, so your Hombrew version of R should be able to compile them (you have Clang, and also `gfortran` from Homebrew's `gcc` formula). The only problem is some packages take long time to compile (e.g., **stringi**), so we may want to prebuild the binaries for them.

The trickiest packages are those with (heavy) system dependencies, such as **RGtk2**, **cairoDevice**, and **rJava**. They are not too bad, either, because their dependencies typically exist as Homebrew formulas, e.g., you can `brew install gtk+` for **RGtk2**. The problems are: 1) you need to know the names of the formulas (you may look it up in the [r-hub/sysreqsdb](https://github.com/r-hub/sysreqsdb) repo), and 2) the R packages may also take a long time to compile.

With the above background information, the problem of "the missing CRAN repository of binary R packages for the Homebrew R" is actually not too bad. We may not really need to build 12,000 binary R packages. Perhaps building only the top 30 trickiest and also frequently used R packages is enough for most R users on macOS.

## An experiment: macos.rbind.io

I have been hoping to experiment with this for a couple of years. Finally I finished [the R Markdown book](https://github.com/rstudio/rmarkdown-book), which pretty much swallowed the first half of my 2018. Then I got a short break mainly because I started to run the reverse dependency check for the **rmarkdown** package. To those who are not R package developers, this basically means I have to run `R CMD check` on more than 2000 reverse dependencies of **rmarkdown**. This usually takes a couple of days. Every time I do this task, I need to figure out how to install a few tricky R packages (same pain comes when I check the **knitr** package).

This time I just gave up and decided to take a stab at building some binary R packages against the Homebrew version of R, so that I won't need to worry about installing them again in the future. I used the `osx` environment for the first time on Travis, built some packages on Travis, and automatically deployed to https://macos.rbind.io. So far so good, although I have to admit I'm definitely not an expert in compiling packages from source. I just have some bare minimum knowledge.

Currently the scripts for building the packages are in the Github repo [yihui/homebrew-r-packages](https://github.com/yihui/homebrew-r-packages) (I may move it to a certain organization in the future if a wider community shows interest in it). The main script is [build.R](https://github.com/yihui/homebrew-r-packages/blob/master/build.R), which I believe is not too complicated.

See https://macos.rbind.io for detailed instructions on how to install these pre-built binary packages, as well as things that I need help with. You have been warned that this is only a quick experiment of mine over two days. Trust me: I'm not an expert, I'm not an expert, and I'm not an expert (e.g., OpenMP? What's that?)! I'll be waiting for experts' feedback and help!

## Appendix: Hello, RGtk2, Finally!

In January this year, I wrote down some notes [on how to install **RGtk2** on macOS](/en/2018/01/install-rgtk2-macos/). I'm delighted to say that the post is obsolete now. All you need is:

```r
system('brew install gtk+')
install.packages(
  'RGtk2', type = 'mac.binary.el-capitan',
  repos = 'https://macos.rbind.io'
)
```

No more hacking at the `gtk+` formula in Homebrew!
