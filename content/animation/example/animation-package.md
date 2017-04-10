---
title: animation-package()
subtitle: A Gallery of Animations in Statistics and Utilities to Create Animations
date: '2017-04-04'
slug: animation-package
from_Rmd: yes
---

This package contains a variety functions for animations in statistics which
could probably aid in teaching statistics and data analysis; it also has
several utilities to export R animations to other formats.

This package mainly makes use of HTML & JavaScript and R windows graphics
devices (such as `x11`) to demonstrate animations in statistics;
other kinds of output such as Flash (SWF) or GIF animations or PDF animations
are also available if required software packages have been installed. See
below for details on each type of animation.

 

```r
library(animation)
### 1. How to setup a simple animation ###

## set some options first
ani.options(interval = 0.2, nmax = 10)
## use a loop to create images one by one
for (i in 1:ani.options('nmax')) {
  plot(rnorm(30))
  ani.pause()   ## pause for a while ('interval')
}
## restore the options


## see ?ani.record for an alternative way to set up an animation

### 2. Animations in HTML pages ###
saveHTML({
  ani.options(interval = 0.05, nmax = 30)
  par(mar = c(3, 3, 2, 0.5), mgp = c(2, .5, 0), tcl = -0.3,
      cex.axis = 0.8, cex.lab = 0.8, cex.main = 1)
  brownian.motion(pch = 21, cex = 5, col = 'red', bg = 'yellow',
                  main = 'Demonstration of Brownian Motion')
}, img.name = 'bm_plot', title = 'Demonstration of Brownian Motion',
         description = c('Random walk on the 2D plane: for each point',
                         '(x, y), x = x + rnorm(1) and y = y + rnorm(1).'))

### 3. GIF animations ###
saveGIF({
  ani.options(nmax = 30)
  brownian.motion(pch = 21, cex = 5, col = 'red', bg = 'yellow')
}, interval = 0.05, movie.name = 'bm_demo.gif', ani.width = 600, ani.height = 600)


### 4. Flash animations ###
saveSWF({
  par(mar = c(3, 2.5, 1, 0.2), pch = 20, mgp = c(1.5, 0.5, 0))
  buffon.needle(type = 'S')
}, ani.dev = 'pdf', ani.type = 'pdf', swf.name = 'buffon.swf',
        interval = 0.1, nmax = 40, ani.height = 7, ani.width = 7)


### 5. PDF animations ###
saveLatex({
  par(mar = c(3, 3, 1, 0.5), mgp = c(2, 0.5, 0), tcl = -0.3,
      cex.axis = 0.8, cex.lab = 0.8, cex.main = 1)
  brownian.motion(pch = 21, cex = 5, col = 'red', bg = 'yellow', main = 'Brownian Motion')
}, img.name = 'BM_plot',
          latex.filename = 'brownian_motion.tex'),
          interval = 0.1, nmax = 20)
```
