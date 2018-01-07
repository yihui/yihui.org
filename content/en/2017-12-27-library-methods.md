---
title: 'library(methods): Human Time vs Computer Time'
subtitle: Save 0.04 seconds of computer time to waste infinite human time
date: '2017-12-27'
slug: library-methods
---

There is a forever confusing thing when you run the command `Rscript`: it does not attach the **methods** package by default. It is confusing because when you start an R session interactively, **methods** is loaded and attached by default. When you run the command `R`, it is also attached. It is just `Rscript` that does not load **methods**.

This confuses users over, and over, and over again, especially if you love or touch S4 (directly or indirectly). You will surely see questions like [this one](https://stat.ethz.ch/pipermail/r-devel/2017-December/075300.html) in the future unless the base R developers decide to change `Rscript`. It is said that the reason for not loading the **methods** is because it is slow, "in history", to load this package.

Okay, let's see how terribly "slow" it is today. On my MacBook Pro (I should run this multiple times but I think 0.04 should be in the ballpark):

```bash
$ Rscript -e "system.time(library(methods))"
   user  system elapsed 
  0.035   0.003   0.039
```

Is 0.04 seconds worth saving? I doubt it. Should it be considered as terribly slow? Here is the loading time of the **stats** package:

```bash
$ R_DEFAULT_PACKAGES=base Rscript -e "system.time(library(stats))"
   user  system elapsed 
  0.041   0.013   0.055 
```

Well, that is not a fair comparison, because **stats** depends on other base packages like **grDevices**, so here is the result for **grDevices**:

```bash
$ R_DEFAULT_PACKAGES=base Rscript -e "system.time(library(grDevices))"
   user  system elapsed 
  0.019   0.007   0.029 
```

I'd say **methods** is relatively slow to load, but it is not too bad. Given the endless confusion caused by `Rscript`, I don't think it is worth excluding it by default. In this case, we have wasted way too much human time on explaining the confusion to save a tiny bit computer time. If users really care about this 0.04 seconds, they should set the environment variable `R_DEFAULT_PACKAGES` by themselves, and I doubt anyone in the world would do it at all.

It is sad to see things that exist for historical reasons are so hard to change.

P.S. Although S4 is innocent in this case, this is a minor reason why I never liked S4.

> **Update on 2017/01/06**: [Gabor discovered](https://twitter.com/GaborCsardi/status/949722120375988224) that Luke Tierney [finally made `Rscript` consistent with `R`](https://github.com/wch/r-source/commit/c30ffef956) by default, i.e., **methods** will be attached in a future version of `Rscript`. It seems the long-lasting confusion will be ended in 2018.
