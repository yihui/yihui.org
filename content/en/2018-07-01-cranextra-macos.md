---
title: A CRANextra Repository for Homebrew and R Users on macOS
subtitle: Installing rattle on macOS? No more struggles!
date: '2018-07-01'
slug: cranextra-macos
---

Two weeks ago [I announced](/en/2018/06/homebrew-binary-r-packages/) the repository `macos.rbind.org`, and asked for feedback in [RStudio Community](https://community.rstudio.com/t/9907). After reading my colleague Jim Hester's feedback and doing some research on the differences between `brew install r` and `brew cask install r-app`, I decided to switch to the latter.^[One reason for this was that `brew install r` does not support `cairo`, so you cannot use graphical devices such as `svg()` or `cairo_pdf()`. Anyway, `brew cask install r-app` installs the official version of R from CRAN, which supports features like `install.packages(..., type = 'both')`.] Consequently, I changed the scope of the repository `macos.rbind.org` to only building the missing binary packages on CRAN. Windows users may have heard of the so-called "CRANextra" repository, which contains binary R packages that are not available on CRAN. The repository `macos.rbind.org` is also a CRANextra repository, but created for macOS users.

The full documentation is on the repository homepage https://macos.rbind.org. In short, you just add an extra CRAN repository in your global option `repos`, e.g.,

```r
options(repos = c(
  CRAN = 'https://cran.rstudio.com',
  CRANextra = 'https://macos.rbind.org'
))
```

Then you will be able to install some missing binary R packages, such as **RGtk2**, provided that your R was installed via `brew cask install r-app`.

While working on this CRANextra repository, I briefly looked at some users' work on [installing the **rattle** package](https://rattle.togaware.com/rattle-install-mac.html), which depends on **RGtk2** and **cairoDevice**. It was such a big mess! There were people still using MacPorts, and some were trying to edit the `gtk+` formula in Homebrew and building `gtk+` from source. With the above CRANextra repository, all you need is:

```r
system('brew install gtk+')
install.packages('rattle')
```

There will be no more Step 1, 2, ..., and 12.

To be clear, eventually I hope this repository can be retired and CRAN can provide the missing binaries. From what I understand, the major obstacle at the moment is the missing support for OpenMP (`-fopenmp`) in the system Clang on macOS, so CRAN provided a homemade version of Clang. I don't know why that is so critical, but I wish one day packages could just build out of the box (or at least make it possible to automate the process). Personally I always frown upon software that tries to turn average users into sysadmins: What does `-fopenmp` even mean? What is `Makevars`? And `SHLIB_OPENMP_CFLAGS`? And `R CMD javareconf`? Sigh. We all love software.
