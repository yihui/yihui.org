---
title: 'One Little Thing: Touch a Source File in a blogdown Website'
date: '2018-06-16'
slug: touch-file-blogdown
---

Motivated by [a **blogdown** issue](https://github.com/rstudio/blogdown/issues/294) raised by Liang Zhang, I added an RStudio addin named "Touch File" in **blogdown** last month to update the modification time of the current file in RStudio.

Most **blogdown** users should already know [the LiveReload feature](https://bookdown.org/yihui/blogdown/livereload.html), which means if you edit a source file and save it, your website will be automatically rebuilt and refreshed in the RStudio viewer once you have used the "Serve Site" addin or the corresponding function `blogdown::serve_site()`.

This feature is great, but on some (relatively rare) occasions, you may want to force rebuilding an Rmd post. For example, when you read an external data file, and the data file has been updated, you want to rebuild the Rmd file even if you don't need to update the content of the Rmd file. In the past, I used to add a space in the Rmd file, delete it, and save the file, which would update the modification time of this file. This is a little awkward. Unix users know there is a `touch` command, which can update the modification time of a file. [I emulated it](https://github.com/rstudio/blogdown/commit/d1934655c) in the RStudio addin "Touch File" in **blogdown**. The basic idea is to call `touch` if the command is available. If not, do what I used to do: add a space, delete it, and save the file.

Four keystrokes (`Space`, `Delete`, `Ctrl/Command + S`) were "simplified" to two mouse clicks (`Addins -> Touch File`). Is it worth it?

![Should I really celebrate it?](https://slides.yihui.org/gif/missed-shot.gif)
