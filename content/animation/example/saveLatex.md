---
title: saveLatex()
subtitle: "Insert animations into a LaTeX document and compile it"
date: '2017-04-04'
slug: saveLatex
from_Rmd: yes
---

Record animation frames and insert them into a LaTeX document with the
`animate` package. Compile the document if an appropriate LaTeX command
is provided.

This is actually a wrapper to generate a LaTeX document using R. The document
uses the LaTeX package called `animate` to insert animations into PDF's.
When we pass an R expression to this function, the expression will be
evaluated and recorded by a grahpics device (typically `png` and
`pdf`). At last, a LaTeX document will be created and compiled if
an appropriate LaTeX command is provided. And the final PDF output will be
opened with the PDF viewer set in `getOption('pdfviewer')` if
`ani.options('autobrowse') == TRUE`.
 

```r
library(animation)
## brownian motion: note the 'loop' option in ani.opts and the careful settings in documentclass

saveLatex({
  par(mar = c(3, 3, 1, 0.5), mgp = c(2, 0.5, 0),
      tcl = -0.3, cex.axis = 0.8, cex.lab = 0.8, cex.main = 1)
  brownian.motion(pch = 21, cex = 5, col = 'red', bg = 'yellow',
                  main = 'Demonstration of Brownian Motion')
}, img.name = 'BM', ani.opts = 'controls,loop,width=0.95\\textwidth',
          latex.filename = 'brownian_motion.tex'),
          interval = 0.1, nmax = 10,
          ani.dev = 'pdf', ani.type = 'pdf', ani.width = 7, ani.height = 7,
          documentclass = paste('\\documentclass{article}',
                                '\\usepackage[papersize={7in,7in},margin=0.3in]{geometry}', sep = '\n'))

## the PDF graphics output is often too large because it is uncompressed; try the option ani.options('pdftk') or ani.options('qpdf') to compress the PDF graphics; see ?pdftk or ?qpdf and ?ani.options
```
