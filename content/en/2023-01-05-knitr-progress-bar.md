---
title: An Upcoming Clean Progress Bar in knitr
date: '2023-01-05'
slug: knitr-progress-bar
---

Do you love the multi-line progress bar when knitting a document? You probably
don't. Neither do I. It's too verbose and clutters the console with too much
information that often has too little real benefit. The information is intended
for debugging, but as a debugging champion, you only need to know the error
message, right? Why should **knitr** let you know the information from a hundred
other code chunks when the error comes from only one chunk? Worse still, as a
programming champion, you never run into errors and always watch the progress
bar go from 0% to 100% with a vacant look on your face:

    processing file: skeleton.Rmd
      |...                                                       |   4%
       inline R code fragments

      |......                                                    |   9%
    label: setup (with options) 
    List of 1
     $ include: logi FALSE

      |.........                                                 |  13%
      ordinary text without R code

      |............                                              |  17%
    label: unnamed-chunk-1 (with options) 
    List of 2
     $ eval: logi FALSE
     $ tidy: logi FALSE

      |...............                                           |  22%
       inline R code fragments

    ...

      |..........................................................| 100%
      ordinary text without R code

Why repeating the message "ordinary text without R code" for a hundred times?
How dare **knitr** declare that my text is *ordinary*? It is *extraordinary*!!

My apologies to all who have suffered from the meaningless garbage for ten
years! The next version of **knitr** will get rid of the garbage information in
the progress bar. The CRAN release may come later this month or next month. For
now, you can try the development version:

``` r
install.packages('knitr', repos = c(
  yihui = 'https://yihui.r-universe.dev',
  CRAN = 'https://cloud.r-project.org'
))
# restart R, and make sure packageVersion('knitr') >= '1.41.8'
```

Then you should see a single-line progress bar when knitting a document, which
only shows the progress and the chunk label by default. The progress bar will be
cleaned up afterwards. In case you do want the previous verbose information, you
can enable it explicitly via `options(knitr.package.verbose = TRUE)`.

If you don't like the default text progress bar, you can use your own favorite
progress bar by setting the global option `knitr.progress.fun` (in `.Rprofile`).
For example, you may use `winProgressBar` on Windows, or progress bars in
**cli** or
[**progressr**](https://progressr.futureverse.org/#the-knitr-package). See [the
documentation](/knitr/options/#global-r-options) for more details.

You can use this new option for any purpose of progress tracking. To quote
[Henrik](https://twitter.com/henrikbengtsson/status/1611046849217187840):

> It opens the door to use any combination of progress handlers while knitting,
> e.g. beepr, cli, progress, txtProgressbar, RStudio, notifier, rpushbullet,
> shiny, ...

With a fresh start of 2023, I hope you will enjoy the fresh progress bar in
**knitr** and make a lot of progress this year.
