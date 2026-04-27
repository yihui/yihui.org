---
title: Preliminary Support for Typst in knitr
date: '2026-04-27'
slug: knitr-typst
---

A few weeks ago I added [preliminary support for
Typst](https://github.com/yihui/knitr/commit/be404d) to **knitr**. The way it
works is simple: if your file has the extension `.Rtyp`, **knitr** will
recognize it as a Typst document, knit it, and produce a `.typ` output file. The
chunk syntax follows the same Markdown-style fenced code block convention:
```` ```{r} ```` to start a chunk and ```` ``` ```` to end it, with inline R
expressions written as `` `r expr` ``. A minimal example (`hello.Rtyp`):

```` md
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
knitr::knit("hello.Rtyp")      # produces hello.typ
knitr::knit2pdf("hello.Rtyp")  # produces hello.pdf
```

That's about it. I called this "preliminary" support because I have not done
extensive testing, and there are probably rough edges. If give this a try and
run into any problems, please feel free to leave comments below or [file
issues](https://github.com/yihui/knitr/issues) to the **knitr** repo on Github.

## On Typst itself

Typst is genuinely impressive and its speed seems to be unbeatable. I understand
why so many people in the R community are excited about it. However, for
**knitr** / **rmarkdown** / Quarto users, I think the bottleneck in dynamic
documents (`.Rtyp`, `.Rmd`, `.qmd`) is almost never the typesetting step---it's
the computation in code chunks. The speed argument for Typst is compelling for
pure writing workflows; for data analysis documents, I'm skeptical it matters
much in practice.

And then there is the larger question of whether you need PDF at all.

## In HTML I Still Trust

[I have believed for a long time](/en/2018/07/in-html-i-trust/) that HTML is the
better target for almost everything, including what people typically reach for
PDF to accomplish: typesetting for reading, sharing, and archiving. You get
hyperlinks, search, accessibility, reflowable text, responsive layout, and zero
installation requirements---free, in a browser that everyone already has.

If you genuinely need paginated output that looks like a printed document, it is
more achievable from HTML than most people realize. I have a small script
[pages.js](https://github.com/yihui/lite.js/blob/main/js/pages.js) that typesets
a continuous HTML page into individual pages---you can press `P` (or
`Ctrl/Cmd + P`) on any page at
[yihui.org/litedown/](https://yihui.org/litedown/) to see the effect. The result
is not perfect, but it is good enough for many use cases, and you get to keep
all the benefits of HTML along the way. BTW, I wrote pages.js purely by hand in
2024 when AI models were not as powerful, and I have to confess that while the
code is relatively short, it was the most challenging piece of JavaScript I had
ever written (again, the recursion almost killed me). I guess today's AI can do
a much better job than me.

The accessibility angle is one I keep hearing more about, and rightly so. HTML
is dramatically better than PDF on this front---screen readers, keyboard
navigation, zoom, high-contrast mode, all of it works because browsers have been
doing this for decades. LaTeX has finally made some progress here, too (e.g.,
the [`tagpdf`](https://ctan.org/pkg/tagpdf) package), which is great, but still
there are so many things that I doubt would ever become possible in LaTeX.

So: Typst support in **knitr** is there if you want it, and I think Typst is a
great tool. I wouldn't use it myself but I'm happy to serve those who do use it.
I gave up MS Office around 2009 after becoming a LaTeX fan for a few years. In
2024, I decided that I wouldn't use LaTeX anymore (when I need PDF, I just use
pages.js to print HTML). I believe HTML still has a lot of potential that I need
to explore further, and I really look forward to that.
