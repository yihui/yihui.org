---
title: formatR update (0.1-5)
date: '2010-12-03'
slug: formatr-update-0-1-5
---

The **formatR** package has been silent for quite a few months now. Recently I've been moving my old packages from R-Forge to GitHub, and I finally killed several things on my TODO list. In the past, I made an awkward decision to let **formatR** depend on the **animation** package, which was ridiculous. Ronggui suggested me remove this dependency long time ago, and now it came true in the new version 0.1-5 ([on CRAN now](http://cran.r-project.org/package=formatR)). So **formatR** is finally a standalone package, although you can choose to use the GUI version after installing the **gWidgets** package (see the `tidy.gui()` function). To work with command lines, `tidy.source()` can be helpful. It takes a file, formats it into a tidy form, and writes the output into a specified file, or simply to the console.

When I first saw the Pretty-R tool provided by Revolution Analytics, I was not completely satisfied because it is just not "pretty" enough. If they have R and the **formatR** package installed on the server, perhaps they can provide another option to help the users format their source code in a more beautiful way, e.g. they could have turned

    x = seq(.1,10,.1)

to

    x = seq(0.1, 10, 0.1)

(You may ask: what the heck is the difference?! In this case, you don't need the **formatR** package because you are not **picky** enough...)

At the same time, I also removed the function `tidy.source()` from the **animation** package. Since this was my first R package, I tended to put everything into a single package, including some functions which are apparently irrelevant. I put them there just for my own use. Now all of them are defunct; see `?'animation-defunct'` in the next version of the **animation** package.
