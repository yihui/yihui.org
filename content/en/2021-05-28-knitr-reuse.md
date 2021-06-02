---
title: 'One Little Thing: Reusing Code Chunks and Chunk Options with knitr '
date: '2021-05-28'
slug: knitr-reuse
---

Most software users must have heard of the DRY principle (i.e., "Don't Repeat
Yourself"). If you repeat a piece of code or text for multiple times in a
document, it will be a pain to maintain these copies. Ideally, you only maintain
a single copy, and reuse it programmatically in other places.

For **knitr** documents, you can freely reuse code chunks. We have introduced
three methods in [the R Markdown Cookbook (Section
14.1)](https://bookdown.org/yihui/rmarkdown-cookbook/reuse-chunks.html). These
methods teach you how to reuse the code of a code chunk in other code chunks. As
you know, a code chunk consists of two parts: the code, and the chunk options.
What we did not cover in the book was how to reuse chunk options.

## Preset options in `knitr::opts_template`

Jared Lander is a very early adopter of **knitr** and uses it extensively. I was
not surprised to know that [he was not aware of
`knitr::opts_template`](https://twitter.com/xieyihui/status/1348033593759698944).
This feature of setting chunk options from an "option template" was introduced
[in 2012](https://github.com/yihui/knitr/issues/316), and documented in the book
"Dynamic Documents with R and knitr," which was first published in 2013 (my
first and only non-free book).

The idea is to save users substantial typing effort by storing a group of chunk
options in the object `knitr::opts_template` with an ID. Then use the chunk
option `opts.label` to refer to the ID and apply the pre-saved options to the
current code chunk. For example,

```` md
```{r}
knitr::opts_template$set(
  fig.large = list(fig.width = 10, fig.height = 6, dev = 'svg'),
  fig.small = list(fig.width = 5, fig.height = 3, dev = 'png'),
  no.message = list(message = FALSE, warning = FALSE)
)
```
````

Then you can (re)use these chunk options via the `opts.label` option, e.g.,

```` md
```{r, opts.label='fig.large'}
plot(cars)
```

The above chunk is equivalent to:

```{r, fig.width=10, fig.height=6, dev='svg'}
plot(cars)
```

Similarly, you can reuse other groups of options:

```{r, opts.label='fig.small'}
plot(1:10)
```

You can use a vector of labels, too:

```{r, opts.label=c('fig.large', 'no.message')}
plot(1:10)
```
````

You can reuse these chunk options for as many times as you like.

## Reuse chunk options from another code chunk

Sometimes you may want to just borrow chunk options from an existing code chunk,
instead of setting them in `knitr::opts_template` in advance. Before **knitr**
v1.32, this was not possible. [Thanks to
Atsushi](https://github.com/yihui/knitr/pull/1960), this has finally become
possible. The usage is very straightforward: you still use `opts.label` but its
value can be the labels of existing code chunks. For example,

```` md
```{r, chunk-a, fig.width=10, fig.height=6, dev='svg'}
plot(cars)
```

Reuse chunk options from chunk-a:

```{r, chunk-b, opts.label='chunk-a'}
plot(1:10)
```
````

## Reuse both chunk options and chunk content from another chunk

It is common to reuse the full code chunk (both code and options) for demo
purposes. For example, [in this blog
post](https://blog.rstudio.com/2021/04/20/knitr-fig-alt/), the penguin plot
appeared four times, but they are actually from the same code chunk. We did not
copy but reused the code chunk three times. Each time we changed one or more
chunk options locally after importing them from the first code chunk, to
demonstrate the effect of the changed option. An example should explain this
idea more clearly. First, we define the "template" chunk, with the label
`chunk-a`:

```` md
```{r, chunk-a, fig.cap="A template figure.", dev='svg'}
plot(cars)
```
````

To fully reuse a code chunk, you can use the chunk option `ref.label` (*note
that* it is `ref.label`, not `opts.label`) and pass a chunk label wrapped in
`I()` to it, e.g.,

```` md
```{r, chunk-b, ref.label=I('chunk-a')}
```
````

That means both the content and options of `chunk-a` will be applied to
`chunk-b`. Without the `I()` trick, only the code content of `chunk-a` will be
applied to `chunk-b`. If you feel `I()` is [black
magic](https://twitter.com/espinielli/status/1399796691151339520), you can use
`opts.label = TRUE` instead---`ref.label = I('foo')` is just a shortcut of
`ref.label = 'foo'` and `opts.label = TRUE` (`opts.label = TRUE` means
inheriting chunk options). The marker `I()` often indicates that the value is
"special."

With `ref.label`, you can still add more local options to a chunk header. For
example, we can define the alt text for the figure via the `fig.alt` option:

```` md
```{r, chunk-c, ref.label=I('chunk-a'), fig.alt='Yeah, alt text!'}
```
````

Note that local chunk options have higher precedence, meaning that a local
option will override a reused option. For example, we have specified
`dev = 'svg'` in `chunk-a`, and we can override it in another chunk while
inheriting the rest of chunk options:

```` md
```{r, chunk-d, ref.label=I('chunk-a'), dev='png'}
```
````

Then for this `chunk-d`, its `dev` option will be `png` instead of `svg`.

## Final words

With all these methods, it should be more flexible to author and program a
**knitr** document. They also manifest the spirit of Literate Programming
(LP)---you should be able to program a document. [This aspect of
LP](/en/2018/09/notebook-war/#literate-programming-for-real-for-software-development)
is not commonly seen in tools that claim to be based on LP.

Anyway, LP aside, the above methods can certainly help you stick more tightly to
the DRY principle. Once again, I'd like to thank Atsushi for the contribution.
These are the features that I had wished to exist and wanted to use for several
years. I'm really glad that they have finally arrived.
