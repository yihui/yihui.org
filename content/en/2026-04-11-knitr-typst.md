---
title: Preliminary Support for Typst in knitr
date: '2026-04-11'
slug: knitr-typst
---

A few days ago I added [preliminary support for
Typst](https://github.com/yihui/knitr/commit/be404d230c8ee50503a4b115c6d0f3815a2209b7)
to **knitr**. The way it works is simple: if your file has the extension `.Rtyp`,
**knitr** will recognize it as a Typst document, knit it, and produce a `.typ`
output file. The chunk syntax follows the same markdown-style fenced code block
convention---` ```{r} ` to start a chunk and ` ``` ` to end it, with inline R
expressions written as `` `r expr` ``. A minimal example (`hello.Rtyp`):

```` typst
#set page(paper: "a4")
#set text(font: "New Computer Modern", size: 11pt)

= Hello, Typst!

```{r}
x = rnorm(10)
summary(x)
```

The mean is `r round(mean(x), 3)`.
````

Then you run either:

``` r
knitr::knit("hello.Rtyp")       # produces hello.typ
knitr::knit2pdf("hello.Rtyp", compiler = "typst")  # produces hello.pdf
```

That's about it. I called this "preliminary" support because I have not done
extensive testing, and there are probably rough edges. If you use Typst and give
this a try, please [let me know](https://github.com/yihui/knitr/issues) what
breaks.

## On Typst itself

Typst is genuinely impressive. It is fast, the syntax is cleaner than LaTeX by a
wide margin, and the error messages are actually readable---three things that are
very much not true of LaTeX. I understand why so many people in the R community
are excited about it.

That said, I want to be honest: I don't think most **knitr** / **rmarkdown** /
Quarto users will notice much benefit from Typst's speed. The bottleneck in
dynamic documents is almost never the typesetting step---it's the computation in
code chunks. If a document takes two minutes to render, perhaps five seconds of
that is PDF compilation, and Typst shaving that down to half a second is nearly
invisible against the rest. The speed argument for Typst is compelling for pure
writing workflows; for data analysis documents, I'm skeptical it matters much in
practice.

And then there is the larger question of whether you need PDF at all.

## In HTML I Trust

I have believed for a long time that HTML is the better target for almost
everything, including what people typically reach for PDF to accomplish:
typesetting for reading, sharing, and archiving. You get hyperlinks, search,
accessibility, reflowable text, responsive layout, and zero installation
requirements---free, in a browser that everyone already has.

If you genuinely need paginated output that looks like a printed document, it is
more achievable from HTML than most people realize. I have a small script
[pages.js](https://github.com/yihui/lite.js/blob/main/js/pages.js) that
typesets a continuous HTML page into individual pages---you can press `P` (or
`Ctrl/Cmd + P`) on any page at [yihui.org/litedown/](https://yihui.org/litedown/)
to see the effect. The result is not perfect, but it is good enough for many
use cases, and you get to keep all the benefits of HTML along the way.

The accessibility angle is one I keep hearing more about, and rightly so. HTML
is dramatically better than PDF on this front---screen readers, keyboard
navigation, zoom, high-contrast mode, all of it works because browsers have been
doing this for decades. LaTeX has finally made some progress here
too,[^tagpdf] but the gap remains large.

[^tagpdf]: The [`tagpdf`](https://ctan.org/pkg/tagpdf) package by Ulrike Fischer,
    developed as part of the LaTeX Project's multi-year tagged PDF initiative,
    brings accessibility support to LaTeX documents. It is impressive work. But
    "impressive for a decades-old typesetting system" is a low bar compared to
    what HTML does by default.

So: Typst support in **knitr** is there if you want it, and I think Typst is a
genuinely good tool. I just wouldn't trade my HTML output for it.
