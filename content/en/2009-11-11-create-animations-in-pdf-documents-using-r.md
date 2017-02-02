---
title: Create Animations in PDF Documents Using R
date: '2009-11-11'
slug: create-animations-in-pdf-documents-using-r
---

Since **animation** 1.0-9, we will be able to create a PDF document with an animation embedded in it; the function is `saveLatex()`, and its usage is similar to `saveMovie()` and `saveSWF()`: you pass an R expression for creating animations to this function, and this expression will be evaluated in the function; the image frames get recorded by a graphics device. In the end, a LaTeX document is written in a directory, and we can get a PDF document by running `pdflatex` on the document.

In fact, the key point is the LaTeX package named `animate`, which can be used to insert image frames into a PDF document to generate an animation. The interface of animations created by this package is quite similar to the HTML animation page by the R package `animation`, moreover, it also uses JavaScript (in PDF) to animate the image frames.

Here is an example:

```r 
library(animation)
oopt = ani.options(interval = 0.1, nmax = 100)
## brownian motion: note the 'loop' option and how to set graphics
#    parameters with 'ani.first'
saveLatex({
    brownian.motion(pch = 21, cex = 5, col = "red", bg = "yellow",
        main = "Demonstration of Brownian Motion")
}, ani.basename = "BM", ani.opts = "controls,loop,width=0.8\\textwidth",
    ani.first = par(mar = c(3, 3, 1, 0.5), mgp = c(2, 0.5, 0),
        tcl = -0.3, cex.axis = 0.8, cex.lab = 0.8, cex.main = 1),
    latex.filename = "brownian.motion.tex")
ani.options(oopt)
```

The PDF document will be automatically opened if there is nothing wrong with `LaTeX` and your PDF viewer; if nothing happened, you can find the PDF document `brownian.motion.pdf` in the directory `ani.options("outdir")`.

The animation works in Acrobat Reader, and I do not know if other PDF viewers can deal with JavaScript correctly (AFAIK, the default PDF viewer in Mac OS will not). Linux users may need to install `acroread`.

For those who are curious about the LaTeX source code of the above demo:

```r 
> cat(readLines(file.path(ani.options("outdir"), "brownian.motion.tex")),
+     sep = "\n")
\documentclass{article}
\usepackage{animate}
\begin{document}
\begin{figure}
\centering
\animategraphics[controls,loop,width=0.8\textwidth]{10}{BM}{0}{99}
\end{figure}
\end{document}
```
