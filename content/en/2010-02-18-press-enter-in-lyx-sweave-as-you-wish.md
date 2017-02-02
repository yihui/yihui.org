---
title: Press Enter in LyX Sweave as You Wish
date: '2010-02-18'
slug: press-enter-in-lyx-sweave-as-you-wish
---

> Note: this post is seriously out-of-date, and you should ignore it completely. See the [Sweave manual](https://github.com/downloads/yihui/lyx/sweave.pdf) for instructions with latest versions of LyX.

> You have been warned above.

For a long time I've been wondering why we are not able to use Enter in the LyX Scrap environment which was set up by Gregor Gorjanc for Sweave. Two weeks ago, I (finally!) could not help asking Gregor about this issue, as I'm using ``LyX + Sweave'' more and more in my daily work. He explained it here: [LyX-Sweave: mandatory use of control+enter in code chunks](http://ggorjan.blogspot.com/2009/07/lyx-sweave-mandatory-use-of.html)

After digging into the LyX customization manual for a while, I found a solution which allows us to press the Enter key just as we normally do when typing in a LyX document. The key is to use `Environment` instead of `paragraph` as `LatexType` for the style definition of `Scrap`. Besides, I used the `LatexName` as `wrapsweave`, as a `LatexName` is required by LyX. The definition for `wrapsweave` is simple: just two empty lines by `\par`. (If you define it as `\newenvironment{wrapsweave}{}{}`, you will run into troubles sometimes; especially when you use indent for paragraphs.)

As we know, LaTeX environment cannot be centered in LyX (only paragraphs can), so I defined a special environment `ScrapCenter` when I want to insert graphics via Sweave and make them center-aligned.

To put all efforts together, this is the new `literate-scrap.inc` (compare it with [http://cran.r-project.org/contrib/extra/lyx/literate-scrap.inc](http://cran.r-project.org/contrib/extra/lyx/literate-scrap.inc)):


    Format 2

    Preamble
    \usepackage{Sweave}
    \newenvironment{wrapsweave}{\par}{\par}
    EndPreamble

    OutputType              literate

    Style Scrap
      LatexType             Environment
      LatexName             wrapsweave
      Margin                static
      TopSep                0.4
      BottomSep             0.4
      ParSep                0.0
      LabelType             static
      Align                 left
      AlignPossible         block, left, right, center
      NewLine               0
      PassThru              1
      FreeSpacing           1
      TextFont
        Color               latex
        Family              typewriter
      EndFont
    End

    Style ScrapCenter
      LatexType             Environment
      LatexName             center
      Margin                static
      TopSep                0.4
      BottomSep             0.4
      ParSep                0.0
      LabelType             static
      Align                 center
      NewLine               0
      PassThru              1
      FreeSpacing           1
      TextFont
        Color               latex
        Family              typewriter
      EndFont
    End



Enjoy pressing a single Enter key in LyX now! :)

P.S. the side effect of this modification is, your R code will be separated by empty lines. But Sweave will remove blank lines by default, so that is not really a big trouble.

P.P.S. Next time I will write my solution of using `pgfSweave` in LyX -- if you have never tried the `pgfSweave` package in R, I'd strongly recommend you do it right now!! My comment on this package is: amazingly beautiful!
