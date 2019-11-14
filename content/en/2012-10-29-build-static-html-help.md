---
title: Build Static HTML Help Pages for R Packages
date: '2012-10-29'
slug: build-static-html-help
---

Many R users may still remember the good old days when we had static HTML documentation for R packages. That was probably before R 2.10.0 (in 2009). Then we had the fancy dynamic HTML help based on the built-in httpd server, but it has never really made much sense to me. Ever since then, I have been feeling uncomfortable about writing package documentation, because each time I update my documentation and reinstall my package, I have to quit R and restart it to see the new documentation, otherwise I will have to see this cryptic error in my web browser if I stay in the same R session:

```text 
Error in fetch(key) : internal error -3 in R_decompress1
```

This is how I feel about the dynamic help system in R:

![How I felt about R dynamic help](https://slides.yihui.org/gif/give-up.gif)

The greatest potential of the httpd server, in my opinion, is to build real dynamic documentation for R, which is something like Sweave, e.g. run examples in real time. But this is not yet done (a design has been there for a long time, though). Anyway, it is super cool to see the package demos run in the web browser when we click the links in `help.start()`.

## Static HTML Help

I do not often need dynamic help; I just want static HTML pages so I do not have to open R each time I only want to look at the documentation of one function. Below is a function to build HTML documentation pages for one package using `Rd2HTML()`:

```r 
# for one package
static_help = function(pkg, links = tools::findHTMLlinks()) {
  pkgRdDB = tools:::fetchRdDB(file.path(find.package(pkg), 'help', pkg))
  force(links); topics = names(pkgRdDB)
  for (p in topics) {
    tools::Rd2HTML(pkgRdDB[[p]], paste(p, 'html', sep = '.'),
                   package = pkg, Links = links, no_links = is.null(links))
  }
}
```

It is easy to build the HTML documentation for all packages based on the above function:

```r 
# for all packages
static_help_all = function() {
  owd = getwd(); on.exit(setwd(owd))
  links = tools::findHTMLlinks()
  for (p in .packages(TRUE)) {
    message('* Making static html help pages for ', p)
    setwd(system.file('html', package = p))
    static_help(p, links)
  }
}
```

## Rebuild R Help with knitr

That is still not the ideal format to me. R help should have been much more appealing and useful, so here comes `knit_rd()` in the **knitr** package, which is my attempt to rebuild HTML help pages for R, but with the examples compiled as well. It is pretty much based on `static_help()` above, and one additional step is to extract the examples code and run it.

My friend Tengfei Yin built his documentation for **ggbio** with this approach, and you can see the pages here: <http://tengfei.github.com/ggbio/docs/man/>.

In the [development version](https://github.com/yihui/knitr) of **knitr**, I also added `knit_rd_all()` to build static html pages for all packages. Once we have static pages, we can add them to bookmarks of our web browser, or publish them to the web (like Tengfei).

## About `--enable-prebuilt-html`

[Experts](http://www.mail-archive.com/r-help@r-project.org/msg183702.html) would recommend us to build R from source, with the `--enable-prebuilt-html` option. That should be the fundamental solution. As Martin said, that is not a bad exercise after all.

## Staticdocs

Hadley's [**staticdocs** package](https://github.com/hadley/staticdocs) has taken a much further step in this direction. It has a cool style based on bootstrap (it has nothing to do with resampling). See the new [ggplot2 documentation](http://docs.ggplot2.org/current/) website for a fantastic example.
