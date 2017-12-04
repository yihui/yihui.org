---
title: 'Please Help Me Test TinyTeX: A Small LaTeX Distribution And An R Companion Package'
date: '2017-12-04'
slug: test-tinytex
---

Over the past week, I worked extremely hard on a small project that I had wished to work on for several years. It is called [TinyTeX](https://github.com/yihui/tinytex). The two basic goals of this project are:

1. Provide a small version of TeX Live that is easy to maintain (one command to rule them all).

1. Make it hassle-free for R users to compile LaTeX documents, e.g., you do not need to worry how many times you should run `pdflatex`. In particular, R Markdown users should no longer worry about missing LaTeX packages, because they can be automatically installed in most cases.

I think TeX Live is pretty awesome (in particular, it is cross-platform), and it is just too big. I want to reduce its size, and highlight the useful parts of the TeX Live Manager (`tlmgr`).

Similarly, the LaTeX package [**latexmk**](https://ctan.org/pkg/latexmk) is also awesome, but it is written in Perl. For Unix users, this is probably not a big issue (chances are you have already got Perl installed). For Windows users, it can be very inconvenient and confusing. The R companion package **tinytex** contains functions to emulate **latexmk** (to compile a LaTeX document for a correct number of times). They are written in R, so R users don't need to install **latexmk** or Perl.

You can find everything you need from https://github.com/yihui/tinytex (full source code and the link to documentation). I hope TinyTeX and the R package can reduce your pain of working with a LaTeX distribution.

I only spent one week on this little project, but I think it is pretty much done. I'll truly appreciate it if you can be brave enough to test it. For R Markdown users, please install a special branch of the **rmarkdown** package to test your PDF output:

```r
# before installing TinyTeX, it will be great if you can uninstall
# your existing LaTeX distribution
devtools::install_github(
  c("yihui/tinytex", "rstudio/rmarkdown@feature/tinytex")
)
tinytex::install_tinytex()
```

P.S. When in doubt, please read the documentation. If you run into problems that you don't know how to solve, or have any feedback, please feel free to file Github issues.
