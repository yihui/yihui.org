---
title: 'One Little Thing: the knitr Chunk Option include=FALSE'
date: '2017-11-22'
slug: knitr-include-false
---

There are lots of [chunk options](https://yihui.org/knitr/options/) in the **knitr** package that give you granular control of your chunk output, but this huge number of options means it is easy to miss some useful ones when you go through the documentation.

I added an option named `include` in **knitr** almost from Day 1 (thanks to Sweave), but I feel it is often ignored by users ([for example](https://twitter.com/xieyihui/status/929186181509763072)), because I have seen code chunks with options like these many times:

````markdown
```{r, eval=TRUE, echo=FALSE, results='hide'}

```
````

or

````markdown
```{r, echo=FALSE, results='hide', message=FALSE, warning=FALSE}

```
````

or even

````markdown
```{r, echo=FALSE, results='hide', message=FALSE, warning=FALSE, fig.show='hide'}

```
````

What they want to do is hide all possible output but still evaluate the code, e.g., hide the R source code (`echo=FALSE`), hide text output (`results='hide'`), hide warnings, hide messages, hide plots, and so on.

Instead of enumerating all kinds of output elements, you can actually hide everything using a single chunk option:

````markdown
```{r, include=FALSE}

```
````

With `include=FALSE`, the code chunk will be evaluated (unless `eval=FALSE`), but the output will be completely suppressed.

So it is really easier than you imagined to kill the beast.

![Kill the beast](https://slides.yihui.org/gif/cool-car.gif)
