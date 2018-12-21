---
title: How to Start Using (pgf)Sweave in LyX in One Minute
date: '2010-10-30'
slug: how-to-start-using-pgfsweave-in-lyx-in-one-minute
---

> Warning: this post has been substantially updated to use the **knitr** package instead of Sweave or **pgfSweave**, and the old version is deprecated now! [See this post for most information](/en/2011/05/sweave-and-pgfsweave-in-lyx-2-0-x-experimental/).

## 0. Summary

<iframe src="https://player.vimeo.com/video/32948939?title=0&amp;byline=0&amp;portrait=0" width="501" height="413" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

Take a look at the above video if you don't understand the title. To put it short, you install LyX (>= 2.0.3) and R (>= 2.14.1) with the [knitr](http://cran.r-project.org/package=knitr) package as well as a working LaTeX toolkit such as MikTeX or TeXLive or MacTeX, then you are ready to go.

Gregor Gorjanc published an interesting article "Using Sweave with LyX" in [R News in 2008](http://cran.r-project.org/doc/Rnews/Rnews_2008-1.pdf), which (I believe) makes it much easier to use Sweave. I use command-line tools a lot every day, but I am still "GUI-addicted". (I don't want to comment more about Microsoft Word here.) [LyX](http://www.lyx.org) looks like a WYSIWYG tool based on LaTeX, and on the first time I saw it I decided that Word was completely useless to me from then on. In the past, I did not like writing LaTeX documents just because I hate wasting my time on typing the raw commands. For example, I hate typing `\item` in an `itemize` environment each time I need a new item. There might be some text editors which can automatically do this tedious task, but the more serious problem is I cannot see the whole picture -- in my eyes there are only commands; my imagination is limited -- it is difficult for me to imagine `\section{}` to be a section title. However, LyX has provided a perfect solution to lazy people like me. We don't have to write LaTeX documents from scratch, and everything is intuitive in LyX. You can clearly _see_ the structure of your document, as well as figures (instead of `\includegraphics{}`), tables (instead of the gory `\begin{table} numbers 1.4 & 2.2 & 3.8`), headings (instead of `\title{} \section{}`) and math formulae (instead of `$\frac{\gamma}{\alpha_{ij}}$`)... In all, it is a whole lot easier and faster to write LaTeX documents in LyX. This is the main reason for an easier life of Sweave, because a Sweave document is nothing but a mixture of LaTeX and R code.

## 1. Introduction

Although Sweave in LyX is convenient to use, it was not a trivial task for beginners to configure and understand how it works, but things have become much better now since LyX 2.0.

As we can see in the above video, R code can be easily embedded into LyX. If you are familiar with Sweave, you don't even need time to learn anything. For those who do not know Sweave well, a good place to look at is the help page `?Sweave`. A Sweave document is dynamic in the sense that everything in the document can be changed by the R code (nothing is hard-coded), so we don't need to worry too much about the specific numbers and plots in the output. Instead, we focus on the code which produces these output. In the above video, I used a LaTeX macro `\Sexpr{}` to output the value of `pi` and I don't need to write the specific number `3.1415926` there.

## 2. **pgfSweave**

> Update: I have switched from pgfSweave to the knitr package now, but what was described below is still true.

While Sweave is a great invention for reproducible research, there are other packages which can improve R's default Sweave functionality. A brilliant one is the **pgfSweave** package. It was built upon the cacheSweave package to support caching R objects (to avoid unnecessary repeated computations and save time), and it also provided a mechanism to cache graphics! Beside the speed issues, a remarkable feature is the quality of graphics -- it is unbeatable. I'm not exaggerating. This packages uses the **tikzDevice** package to produce pgf/tikz graphics which are essentially LaTeX code, in other words, the R graphics are represented in the LaTeX language so that they are treated (compiled) in the same way as the body of a LaTeX document. This will make the style of graphics completely consistent with the body of a document, e.g. the fonts.

By the way, I also like the `nogin` option for Sweave.sty to be the default in pgfSweave, because I really don't like the idea of setting the size of graphics by a LaTeX macro `\setkeys{Gin}{width=0.8\textwidth}`. In pgfSweave, we just set the width and height naturally in the code chunk options like `<<width = 5, height =4>>=`.

pgfSweave comes with a command line usage like Sweave: `R CMD pgfSweave your-file.Rnw`. I'm not using this approach in LyX, because this requires system admin privilege to install pgfSweave. Instead, I use this way:

    R -q -e "library(pgfSweave);pgfSweave('yourfile.Rnw')"

R can accept a string in its `-e` argument, e.g.

    yihui@xie:~$ R -q -e "rnorm(5)"
    > rnorm(5)
    [1] -0.2970093 -0.2171444  1.5645127  0.5422097  0.7359204

Later I'll explain how to connect LyX and R/pgfSweave in this way.

## 3. Configuration

> Update: the several steps of configuration become one step since LyX 2.0.

To make LyX work with Sweave, we basically only need one step: configure the `PATH` variable; see [the manual](https://github.com/downloads/yihui/lyx/sweave.pdf) for details.

## 4. Demo

See my [lyx](https://github.com/yihui/lyx) and [knitr](https://github.com/yihui/knitr) repositories to see many examples.

## 5. Bad News

> Update: all previous bad news has gone.
