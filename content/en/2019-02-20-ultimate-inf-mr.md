---
title: The Ultimate Infinite Moon Reader for xaringan Slides
subtitle: Instant preview without fully rebuilding HTML, and the linked navigation
date: '2019-02-20'
slug: ultimate-inf-mr
---

Recently I have been playing with WebSocket, partly due to the `chrome_print()` function in [the **pagedown** package](https://github.com/rstudio/pagedown). Last Friday, it suddenly occurred to me that there could be a very interesting way to improve the user experience of the "Infinite Moon Reader" in the **xaringan** package (i.e., `xaringan::inf_mr()`). After three days' work, I have finally become happy with it:

![The ultimate infinite moon reader for xaringan slides: when navigating in the source, the corresponding slide in the output will be automatically displayed; when typing in the source, you can instantly preview the output.](https://user-images.githubusercontent.com/163582/53144527-35f7a500-3562-11e9-862e-892d3fd7036d.gif)

## Two unpleasant issues about authoring documents with R Markdown

I have been slightly unhappy with the user experience of authoring documents with R Markdown. The two particular issues are:

1. It is hard to hold the desire to preview the document. I feel like I want to click the `Knit` button after I write every single sentence. With `xaringan::inf_mr()`, this problem is a little less unpleasant: you just save the document, and the output will be automatically recompiled and refreshed. However, this often takes a couple of seconds. Yes, even a couple of seconds bothers me.

1. The source document and the output page are completely independent. When the documents are long, it can be time-consuming for the user to navigate to the R Markdown source corresponding to a certain part in the output, or go from a certain part of the output page to the corresponding source.

Fortunately, these general issues are solvable in the case of HTML5 slides, because slides are usually short and regular pages. It is relatively easy to establish the map between the slide source (Markdown) and the slide output (an HTML element).

## The new `xaringan::inf_mr()`

If you install the development version of **xaringan** (I recommend that Windows users also install [the latest preview version of RStudio](https://www.rstudio.com/products/rstudio/download/preview/) if you cannot preview **xaringan** slides in RStudio Viewer):

```r
remotes::install_github('yihui/xaringan', upgrade = TRUE)
```

and run the "Infinite Moon Reader" addin in RStudio, or `xaringan::inf_mr()` on an R Markdown document that has the output format `xaringan::moon_reader`, you should be able to observe these new features:

1. When you navigate through the R Markdown source document in RStudio, the slide output will be automatically navigated to the page corresponding to the current line in the R Markdown source.

1. When you modify the R Markdown source, you can preview the output immediately (by default, the delay is one second, but this is configurable via the global option `options(servr.interval = N)` before you run `xaringan::inf_mr()`; you can set `N` to an arbitrary time interval, e.g., `0.5`). LaTeX math expressions can also be previewed. Code blocks will be syntax highlighted if necessary.

1. When you click on the slides and navigate through them, the cursor in the RStudio editor will also be automatically moved to the first source line corresponding to the current page in the slides.

Please note that these features only exist for **xaringan** slides. General HTML output formats are not supported: no automatic navigation or instant preview, but the feature of automatically recompiling Rmd and refreshing output as soon as Rmd is modified and saved still works like before.

## When in doubt, save the source document

The above features work when the document is modified but not saved. The navigation won't work if the numbers of pages of slides calculated from the source and the output are not equal (e.g., after you add a new slide in the source). The preview doesn't run R code chunks, respect slide attributes (such as classes or background images), or understand any **knitr** code chunk options.^[One exception is that when a code chunk uses the option `eval=FALSE` or `include=FALSE`, the code block will be hidden in the preview, but no code chunks are really executed through **knitr** until you save the document.] As soon as the source document is saved, the whole document will be recompiled, and things should be normal again.

However, if you dynamically generate slides via R code, these features won't work (`xaringan::inf_mr()` won't be that smart), e.g.,

````md
```{r, results='asis'}
cat('\n---\n# A new slide\n\n')
```
````

In this case, it is hard for me to know how to map a line in the source to a page in the output.

## Please help me test it

[The implementation](https://github.com/yihui/xaringan/commit/97922037b38a) was not super complicated. At least the mechanism was simple enough: create a websocket in the browser, keep sending the page information to R, let R send the source of the current slide back to the websocket when necessary, and render the Markdown source to HTML. I may have been too excited about the new `xaringan::inf_mr()` and failed to consider certain edge cases, so please help me test it and let me know what you discover or think.

P.S. Hi, [Chris Engelhardt](https://twitter.com/EngelhardtCR/status/1096914316702433281), you probably should not let your 5-year-old son know these new features, or I'll worry about your keyboard...
