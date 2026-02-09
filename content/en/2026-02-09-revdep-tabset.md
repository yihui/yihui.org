---
title: Navigating CRAN's Reverse Dependency Check Logs
date: '2026-02-09'
slug: revdep-tabset
---

Note

:   This post is unlikely to be useful for most people, so please feel free to
    skip it unless you maintain an R package that has a lot of reverse
    dependencies.

The number of reverse dependencies of the **knitr** package (and **rmarkdown**)
reached 10,000 a couple of years ago, about which I have mixed feelings. On the
one hand, it's great that so many packages depend on **knitr** and
**rmarkdown**; on the other hand, it means checking reverse dependencies is
becoming more and more terrifying.

One problem is, with this many reverse dependencies, CRAN's reverse dependency
check will almost surely find false positive problems. Every single time I
submit a new version of **knitr** or **rmarkdown** to CRAN, I'll receive a
report telling me that they failed certain packages. Sometimes the logs can run
thousands of lines! The log looks like this:

```         
Package: lwqs
Check: re-building of vignette outputs
New result: ERROR
  Error(s) in re-building vignettes:
    ...
  --- re-building ‘lwqs-vignette.Rmd’ using rmarkdown
  
  
  Quitting from lwqs-vignette.Rmd:201-219 [unnamed-chunk-8]
  Execution halted

Package: NeEDS4BigData
Check: tests
New result: ERROR
    Running ‘spelling.R’ [0s/0s]
```

It's a huge pain to scan through the logs and find out which packages are really
broken. I'm sure that some problems are not my fault, like this one:

```         
Package: tsfeatures
Check: examples
New result: ERROR
  Running examples in ‘tsfeatures-Ex.R’ failed
  
  trying URL 'https://github.com/robjhyndman/tsfeatures/raw/master/extra-data/yahoo.rda'
  Warning in utils::download.file("https://github.com/robjhyndman/tsfeatures/raw/master/extra-data/yahoo.rda",  :
    cannot open URL 'https://github.com/robjhyndman/tsfeatures/raw/master/extra-data/yahoo.rda': HTTP status was '504 Gateway Timeout'
  Execution halted
```

However, I still have to read through all logs to be sure.

In 2024, I couldn't stand this anymore, so I wrote [a small JS
snippet](https://github.com/yihui/lite.js/blob/main/js/revdep-log-reader.js) to
transform these logs into tabsets. The script splits the text at each `Package:`
marker and wraps the results in tab structures. Each tab shows one package name
(with a link to its CRAN check page) and its log output.

To use the JS snippet, you can open the log (here's [an example
log](https://gist.github.com/yihui/5a57922d039475b976911793fe966009/raw/6c3712d30e2dc975a1060ae87be80dfbccba3d1a/knitr-revdep-sample.txt))
in a browser and copy/paste the JS code into the browser console. The page
transforms from a wall of text into organized tabs. Instead of scrolling through
the entire log, I can click a tab and see what went wrong with each package
without being overwhelmed by the sheer volume of logs.

The JS snippet was essentially a quick regex exercise and built on top of [the
minimal tabset implementation](/en/2023/10/section-tabsets/) that I created in
2023.
