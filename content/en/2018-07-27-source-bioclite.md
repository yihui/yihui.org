---
title: On source("https://bioconductor.org/biocLite.R")
date: '2018-07-27'
slug: source-bioclite
---

About six years ago when [I visited Bioconductor](/en/2012/10/visiting/) for the first time in Seattle, I asked them a question that I had for long: Why is `source("https://bioconductor.org/biocLite.R")` the recommended way to install Bioconductor? Unfortunately, I don't remember their answer now, but I guess I was not convinced at that time anyway. Sourcing an R script directly from the web was an obviously very bad idea in my eyes. If you open this script, you will see that it further sources another script from bioconductor.org (and even tries to fall back to the insecure HTTP URL if HTTPS fails), which in turn sources yet another script. If the web server is compromised and someone injects something like `system('rm -rf /')` in these scripts, users will be in deep deep trouble _immediately_.

Yesterday I saw [Stephen Turner's tweet](https://twitter.com/strnr/status/1022451016736927745) about the new **BiocManager** package, and he recommended that we stop using the `biocLite()` function. While we should definitely thank the security team at Bioconductor for keeping the server secure for several years, I feel the `source()` way of installing Bioconductor should be retired as soon as possible.
