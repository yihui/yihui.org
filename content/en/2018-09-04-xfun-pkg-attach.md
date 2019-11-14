---
title: 'xfun::pkg_attach(): A Vectorized Version of library()'
date: '2018-09-04'
slug: xfun-pkg-attach
---

Chances are you often need to use more than one package in R, so it is common to see that an R script starts with multiple calls to `library()`, the function that attaches a package to an R session, e.g.,

```r
library(ggplot2)
library(dplyr)
library(shiny)
```

![Repeat the same function call over and over again](https://slides.yihui.org/gif/repeat-smoke.gif)

## The vectorized `library()`

With the function `xfun::pkg_attach()`, you can attach them through a character vector:

```r
xfun::pkg_attach(c('ggplot2', 'dplyr', 'shiny'))
```

As I said in a post on "[`library()` vs `require()`](/en/2014/07/library-vs-require/)" in 2014, I believe it was a design mistake to use NSE (non-standard evaluation) in `library()`. It saves a little bit typing effort since you don't need to type the quotes, but it also opens a can of worms, and introduces more non-standard things due to this non-standard thing (e.g., when you do code analysis, you have to make a special rule for the `library()` calls to make sure those "variables" in parentheses are not real variables but character strings of package names). The above `xfun::pkg_attach()` call is essentially a for-loop:

```r
for (i in c('ggplot2', 'dplyr', 'shiny')) {
  library(i, character.only = TRUE)
}
```

## Automatically install missing packages

It is also common to see code like this in R scripts (install a package if not installed or loadable):

```r
if (!require('shiny')) install.packages('shiny')
library(shiny)
if (!require('ggplot2')) install.packages('ggplot2')
library(ggplot2)
```

The argument `install = TRUE` in `xfun::pkg_attach()` allows you to do the above task, e.g.,

```r
xfun::pkg_attach(c('ggplot2', 'dplyr', 'shiny'), install = TRUE)
```

Or use the shorthand `xfun::pkg_attach2()`, which is essentially `pkg_attach(..., install = TRUE)`:

```r
xfun::pkg_attach2(c('ggplot2', 'dplyr', 'shiny'))
```

Some people may argue that you should never install software packages without the user's permission. That is a good point. If your R script is meant to be run by other users, you need to be a little conservative, but some users may actually prefer convenience (i.e., don't bother me with error messages about missing packages). Of course, if you are writing a script for yourself, you can always use `pkg_attach2()`. If you want to ask for permission, you certainly can, e.g.,

```r
xfun::pkg_attach(
  c('ggplot2', 'dplyr', 'shiny'),
  install = readline('Install missing packages (y/n)? ') == 'y'
)
```

## Suppress package startup messages

Some people don't like package startup messages. I think those messages are fine if they only appear once or at most a couple of times to a new user. When you see the same messages over and over again, you will be bored, but you cannot shout at your screen that "I KNOW `dplyr::filter()` MASKS `stats::filter()`! PLEASE DON'T TELL ME THIS AGAIN!" when you `library(tidyverse)`.

How to suppress package startup messages? As you could have guessed, the function is named `suppressPackageStartupMessages()`. Do you like it? I don't, because it is too long and often calls for disproportional attention when you read the code (worse if you have to call it multiple times). Do I have a better name? No (so I'll shut up on naming).

If you are attaching a package in **knitr**, you can use the chunk option `message = FALSE` to suppress package startup messages, e.g.,

````markdown
```{r, message=FALSE}
library(tidyverse)
```
````

Note that this will suppress _any types of messages_, including package startup messages. It might be a problem, but I often load packages in a separate code chunk in the beginning of a **knitr** document, so it is unlikely to suppress messages that I didn't mean to suppress.

Since my colleague Winston [was not satisfied](https://github.com/yihui/knitr/issues/1583) by this solution, I added a `message` argument to `xfun::pkg_attach()` to suppress startup messages (and he didn't like it, either, which was understandable).

```r
xfun::pkg_attach('tidyverse', message = FALSE)
```

The default value of `message` in this function comes from the global option `xfun.pkg_attach.message`, so you may set it in your `.Rprofile` to always suppress startup messages, e.g.,

```r
options(xfun.pkg_attach.message = FALSE)
```

I wish the `library()` function has a similar argument, so I don't have to hack at it this way.

## Will `xfun::pkg_attach()` become the new `library()`?

No, I don't believe so, and I don't mean so, either. I wrote this post just to illustrate one type of pain [I mentioned a few days ago](/en/2018/08/influence-depth-or-breadth/): the pain that is tiny yet comes frequently. To sum it up, the tiny pain here is:

1. You cannot `library(c('ggplot2', 'dplyr', 'shiny'))`.

1. You have to test the availability of a package explicitly before deciding to install it, i.e., `if (!require()) install.packages()`.

1. You have to explicitly suppress the package startup messages every single time if you don't want to see them, either through a long-named function or by a **knitr** chunk option.
