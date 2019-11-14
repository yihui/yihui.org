---
title: Let MiKTeX Install Missing LaTeX Packages Automatically
date: '2018-03-20'
slug: miktex-auto-install
---

While debugging the **rmarkdown** issue [#1285](https://github.com/rstudio/rmarkdown/issues/1285), I discovered that MiKTeX might fail to install missing LaTeX packages in certain cases. The default behavior of MiKTeX is to ask you whether you want to install missing LaTeX packages, but it may fail to pop up the dialog box to ask you in the first place. I'm still not sure why it could fail (I feel when MiKTeX is installed by the system admin, it may fail to pop up the dialog), but you can change the default setting and let MiKTeX install the missing LaTeX packages without asking. In the MiKTeX Console (you can find it from the Start menu on Windows), choose "Always install missing packages on-the-fly":

![Always install missing packages on-the-fly](https://user-images.githubusercontent.com/163582/37617602-9e2ffe38-2b81-11e8-9e98-0853a08a4413.png)

From the viewpoint of the developer, it is absolutely the right thing to do to ask users before installing the missing LaTeX packages. However, from the viewpoint of users, I guess 99.99% of users will agree to install the missing packages. What would you do otherwise in this case? Just stare at the screen, let LaTeX fail, and feel the miserable life? I don't think you want to do that. Convenience outweighs the potential risk of letting certain software install (random) packages automatically in this case.

The **rmarkdown** bug #1285 once again confirmed that [TinyTeX](https://yihui.org/tinytex/) could be a better option than MiKTeX on Windows. Although it was not MiKTeX's fault in this case, MiKTeX's `pdflatex` fails when called via `system2('pdflatex', 'test.tex', stdout = FALSE)` in the R console in RStudio, even though `system2('pdflatex', 'test.tex')` succeeds, which is [a really weird bug](https://github.com/rstudio/rstudio/issues/2446) that took me a long time to realize. By comparison, TinyTeX's `pdflatex` works just fine.
