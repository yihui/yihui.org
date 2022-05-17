---
title: Don't Know Which LaTeX Package(s) to Install When Getting a LaTeX Error?
subtitle: "! LaTeX Error: File `inconsolata.sty' not found."
date: '2021-06-02'
slug: latex-pass
---

Colin said "[what fresh hell is
that](https://twitter.com/_ColinFay/status/1308061202938032138)" last September
when he ran into a LaTeX error, which may look familiar to some of you:

    ! LaTeX Error: File `inconsolata.sty' not found.

    Type X to quit or <RETURN> to proceed,
    or enter new name. (Default extension: sty)

    ! Emergency stop.
    <read *>

    l.276 ^^M

    !  ==> Fatal error occurred, no output PDF file produced!

If you use both the R package [**tinytex**](https://github.com/rstudio/tinytex)
and the LaTeX distribution [TinyTeX](https://yihui.org/tinytex/), it should be
nearly impossible to run into this type of error, because **tinytex** will try
to automatically install the missing LaTeX package (unless there is something
wrong with your Internet connection).

Since this great hacker complained about this LaTeX error, I thought it might be
useful to build a cloud service for general users to upload their LaTeX error
log to find out which LaTeX package(s) to install, given that I had already done
the work in **tinytex**.

Then I created [a Github repo called
**latex-pass**](https://github.com/yihui/latex-pass), which did not take me very
long. The only thing that took me a little while was to figure out how to write
comments to pull requests from AppVeyor. Anyway, you can upload an error log, a
`.tex` file, or an `.Rmd` file to this repo, wait for one minute or two, and you
will be notified the names of missing LaTeX packages.

Again, this is unlikely to be useful to R users who have installed **tinytex**
and TinyTeX. [A few people seem to have used
it](https://github.com/yihui/latex-pass/pulls), although I'm not sure where they
heard about this repo from.

To complete the story, Colin read my mind and discovered [four days
later](https://twitter.com/_ColinFay/status/1309415115922509824) that this repo
was created because of his original tweet.
