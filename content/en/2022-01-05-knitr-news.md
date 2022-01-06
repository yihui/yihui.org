---
title: 'News from knitr v1.35 to v1.37: Alternative Syntax for Chunk Options, and Some New Engines'
date: '2022-01-05'
slug: knitr-news
---

With 2021 behind us, I want to highlight some news in the **knitr** package from
the last quarter of the last year.

## An alternative syntax for chunk options

Chunk options used to be written inside `{}` in the chunk header, which can be
hard to read when there are too many options, or certain options take too long
(character) values. [For
example](https://github.com/yihui/rmarkdown-cookbook/blob/9d523c0a/02-overview.Rmd#L11-L13):

```` md
```{r rmdworkflow, echo = FALSE, fig.cap = "A diagram illustrating how an R Markdown document is converted to the final output document.", out.width = "100%"}
knitr::include_graphics("images/workflow.png", dpi = NA)
```
````

Since **knitr** 1.35, we have provided an alternative way to write chunk
options. That is, you can write then inside a chunk after the special comments
`#|`, e.g.,

```` md
```{r}
#| rmdworkflow,
#| echo = FALSE,
#| fig.cap = "A diagram illustrating how an R Markdown document
#|   is converted to the final output document.",
#| out.width = "100%"

knitr::include_graphics("images/workflow.png", dpi = NA)
```
````

You can freely hard-wrap the lines in the `#|` comments. When **knitr** parses
these options, it will concatenate all lines and ignore the line-breaks.

With this new syntax, you no longer need to worry about code chunks that are too
wide for a page (e.g., when writing a book or a report that means to be printed
or typeset into PDF). It is up to you how many chunk options you want to put on
one line. It does not have to be one per line.

Beside the traditional comma-separated syntax, you can also use the YAML syntax
if you like, e.g.,

```` md
```{r}
#| echo: false
#| fig.width: 10
```
````

Personally I do not like YAML but I know many people do (I can never remember
how to properly write a string value that contains both single quotes and
colons). For the traditional comma-separated syntax, you only need to know the R
syntax, with which you should be familiar. Another benefit of the
comma-separated syntax is that [you can write R expressions
freely](https://bookdown.org/yihui/rmarkdown-cookbook/chunk-variable.html),
which is a little awkward in YAML---to provide an R expression as a YAML value,
you need to add `!expr` before the expression.

## Unbalanced chunk delimiters

In [another post last year](/en/2021/10/unbalanced-delimiters/), I wrote about
the upcoming breaking change for unbalanced chunk delimiters. The error/warning
message [was not very
clear](https://twitter.com/xieyihui/status/1465689371789697024) in **knitr**
1.35 and 1.36, which has been improved in 1.37. Now it will tell you the line
numbers of the problematic chunk delimiters.

## Read an external script into a chunk with the `file` option

Sometimes you may want to develop code in an external script. The new `file`
option in **knitr** 1.37 provides a way to read an external script into a code
chunk. If you are familiar with [the `code` option](/knitr/options/#code-chunk)
(which has existed in **knitr** for years), basically `file = "foo.R"` is
equivalent to `code = xfun::read_utf8("foo.R")`.

See [this section in the *R Markdown
Cookbook*](https://bookdown.org/yihui/rmarkdown-cookbook/option-code.html) for
examples of the `file` option.

## The new engines: `comment`, `verbatim`, and `embed`

Now you can comment out content using the new `comment` engine, e.g.,

````` md
````{comment}
Arbitrary content to be commented out.

```{r}
1 + 1
```

The above code chunk will not be executed.
Inline code like `r pi * 5^2` will be ignored, too.
````
`````

Note that if any line of the content to be commented out contains `N` backticks,
you will have to use at least `N + 1` backticks in the chunk header and footer
of the `comment` chunk.

The `verbatim` engine provides a way to output content verbatim (which is often
useful for teaching purposes), even if the content contains code chunks, e.g.,

````` md
````{verbatim}
We can output arbitrary content verbatim.

```{r}
1 + 1
```

The content can contain inline code like
`r pi * 5^2`, too.
````
`````

The `embed` engine allows you to embed plain-text files in the output, e.g.,

```` md
```{embed, file="foo.R"}
```
````

This engine is a simple wrapper based on the `verbatim` engine, in the sense
that the file is read into the code chunk, and its content will be displayed
verbatim.

You can learn more about these new engines in the release notes (from 1.35 to
1.37): <https://github.com/yihui/knitr/releases>. Hope you will find a good use
of them. Have fun!

![Have fun!](https://slides.yihui.org/gif/pass-chase.gif)
