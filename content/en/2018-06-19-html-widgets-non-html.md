---
title: HTML Widgets for Non-HTML Output Formats
date: '2018-06-19'
slug: html-widgets-non-html
---

Not surprisingly, [HTML widgets](http://www.htmlwidgets.org) were designed for HTML output formats (e.g., `rmarkdown::html_document` and `rmarkdown::ioslides_presentation`). Their interactivity relies on JavaScript. In general, you should not expect JavaScript to work in LaTeX/PDF or Word or PowerPoint.

In January 2015, [I gave an introductory talk](https://www.youtube.com/watch?v=dV4gtARPvu8) on HTML widgets in the LA R User Group. I joked in the talk that "If you ask me how to use HTML widgets in Word or LaTeX, we cannot be friends ." (I meant, how could you possibly ask such a question?) A year later, this became only a half joke.

While developing **bookdown** in 2016, I added a feature in **knitr** to "support" HTML widgets for non-HTML output, which basically means if the output is not HTML, **knitr** will try to use the **webshot** package to automatically take a screenshot of the widget, and embed the static screenshot in the output. Of course, you won't be able to interact with this static image, but it may be better than nothing (or throwing an error).

The detailed documentation about this feature can be found in [Section 2.10 of the **bookdown** book](https://bookdown.org/yihui/bookdown/html-widgets.html).

Similarly, Shiny apps won't work in non-HTML output, either. If you want to include a screenshot of a Shiny app in a **knitr** document, you may explicitly use the `knitr::include_app()` function after you publish the app to a server. More generally, you can include a screenshot of any web page via `knitr::include_url()` when the output format is not HTML.

Screenshotting HTML widgets, Shiny apps, and arbitrary URLs works in any non-HTML output formats: PDF, Word, EPUB, RTF, and PowerPoint, etc. If you want, you may even force a screenshot in HTML output, too (see documentation).

I'd like to thank Winston for the heavy-lifting in [the **webshot** package](https://github.com/wch/webshot). It is a very neat package.
