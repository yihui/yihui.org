---
title: 'A Review of **knitr** Updates from 2024 to 2026'
date: '2026-09-09'
slug: knitr-news
---

It's been a long while since I announced updates in **knitr** last time, so I'm
writing this post to cover notable changes in **knitr** v1.46–v1.52. For the
full changelog, please see the
[release notes](https://github.com/yihui/knitr/releases) on GitHub. I hope you
will find this 3-year review helpful.

## knitr 1.46 (2024-04-06)

### New chunk option `tab.cap`

You can now set the table caption in the chunk header instead of inside
`kable()`, e.g.,

```` md
```{r tab.cap="Motor Trend car data (first six rows)"}
knitr::kable(head(mtcars))
```
````

Previously you had to write `knitr::kable(head(mtcars), caption = "...")`,
which is inconvenient when you want to keep chunk options together and the R
code clean
([#1679](https://github.com/yihui/knitr/issues/1679)).

### `spin()` recognizes `# %%` and `#|`

Two more chunk delimiters work in `spin()` now. For example, a VS Code /
Jupyter-style script:

```r
# My report

# %%
plot(cars)

# %% results="hide"
invisible(summary(cars))
```

And Quarto-style pipe comments:

```r
#| label: fig-cars
#| fig-cap: "Speed vs. distance"
plot(cars)
```

Both can be spun into a document with `knitr::spin("script.R")`. The old `#-`
delimiter no longer works; please use `#+` or any of the above new delimiters
([#2307](https://github.com/yihui/knitr/issues/2307), [#2320](https://github.com/yihui/knitr/issues/2320)).

### Chunk hooks accept `...`

Before, every chunk hook had to declare arguments `before`, `options`, `envir`,
and `name` explicitly, e.g.,

```r
# old: had to list explicitly
knitr::knit_hooks$set(my_hook = function(before, options, envir, name) {
  if (before) cat("starting\n")
})
```

Now `...` can be used to capture all and **knitr** will pass all arguments
implicitly to `...` (if your hook doesn't support any of these arguments, they
will be silently dropped):

```r
knitr::knit_hooks$set(my_hook = function(before, ...) {
  if (before) cat("starting\n")
})
```

### PNG optimization for package vignettes

If `optipng` or `pngquant` is on your `PATH`, vignette PNG plots are
automatically compressed during `R CMD build`. No code change needed—just
install the tools. PNG plots on CRAN are [often surprisingly
large](https://bsky.app/profile/yihui.org/post/3mkg5i5ju7k2e); for vignettes
with several plots this can meaningfully reduce the installed package size.

### Breaking: unbalanced chunk fences are errors

Any chunk header/footer mismatch now throws an error, e.g.,

````` md
````{r}
1 + 1
```
`````

The opening fence has four backticks; the closing fence must match exactly
([#2306](https://github.com/yihui/knitr/issues/2306)).

### Breaking: vignettes tangled during `R CMD check`

**knitr** no longer skips tangling vignettes during `R CMD check`. The tangled R
script is then run, so check failures can now come from the vignette code
rather than the vignette build. CRAN sets
`_R_CHECK_VIGNETTES_SKIP_RUN_MAYBE_=true` so this mostly affects non-CRAN
checks (e.g., GitHub Actions). Add that environment variable to your workflow
if you want the old behavior.

## knitr 1.47 (2024-05-29)

### Limit `kable()` rows via global option

Large data frames accidentally passed to `kable()` can generate enormous tables.
Set a global cap if you want to prevent an accidental huge table, e.g.,

```r
options(knitr.kable.max_rows = 30)
knitr::kable(big_df)  # only first 30 rows rendered, rest silently dropped
```

## knitr 1.48 (2024-07-08)

This release contains bug fixes only, to which you don't need to pay attention.

## knitr 1.49 (2024-11-08)

### Disable in-chunk references with `ref.chunk = FALSE`

**knitr**'s `<<label>>` syntax for [reusing chunk
code](https://pkg.yihui.org/rmarkdown-cookbook/reuse-chunks.html) silently
mangles R code that legitimately uses `<<`/`>>` as delimiters—for example,
`glue::glue()` variants that change the open/close markers:

```r
myglue <- function(..., .envir = parent.frame()) {
  glue(..., .open = "<<", .close = ">>", .envir = .envir)
}
x <- "<<NAME>> <- function(x) { <<BODY>> }"
```

Any `<<...>>` pattern on its own line gets silently removed by **knitr**, so
`x` ends up with missing lines in the knitted output. Set `ref.chunk = FALSE`
to turn off that substitution for the affected chunk
([#2360](https://github.com/yihui/knitr/issues/2360)), e.g.,

```` md
```{r ref.chunk=FALSE}
...
x <- "<<NAME>> <- function(x) { <<BODY>> }"
```
````

### `fig.alt` for LaTeX

Alt text for figures now works in LaTeX output, e.g.,

```` md
```{r fig.alt="A scatter plot of speed versus stopping distance"}
plot(cars)
```
````

**knitr** emits `\includegraphics[alt={A scatter plot...}]{...}`, which is
supported by recent versions of LaTeX and enables accessible PDFs
([#2378](https://github.com/yihui/knitr/issues/2378)).

### Custom evaluation environment

`knit_global()` now accepts an environment argument, so you can redirect all
chunk evaluation to a custom environment. For example, the recommended pattern
saves and restores the old environment:

```r
new_env <- new.env(parent = globalenv())
old_env <- knitr::knit_global(new_env)
on.exit(knitr::knit_global(old_env), add = TRUE)
knitr::knit("report.Rmd")  # all chunks evaluated in new_env
```

This is useful for packages like
[**multiverse**](https://github.com/yihui/knitr/pull/2358) that need to execute
chunks in separate environments per analysis rather than the shared global
environment.

## knitr 1.50 (2025-03-16)

### Precise line numbers for inline code errors

Previously, an error in an inline expression like `` `r log(-1)` `` reported
the line range of the surrounding paragraph. Now it points to the exact line,
making it much faster to locate the offending expression in a long document
([#2387](https://github.com/yihui/knitr/issues/2387)).

### Error tracebacks in `R CMD build`

When a vignette fails to build, the full R traceback is now printed. Before,
you only got the error message and had to reproduce the failure interactively
to see where it came from
([#2390](https://github.com/yihui/knitr/issues/2390)).

### `kable()` column alignment for Org Mode

Alignment specifiers now render correctly in Org Mode output, e.g.,

```r
knitr::kable(head(iris), format = "org", align = c("l","r","r","r","l"))
```

Previously the alignment was ignored and all columns appeared left-aligned
([#2391](https://github.com/yihui/knitr/issues/2391)).

### `combine_words()` and `write_bib()` moved to xfun

Both functions gained a proper home in **xfun** (my base for miscellaneous
functions), e.g.,

```r
xfun::join_words(c("apples", "oranges", "bananas"))
# "apples, oranges, and bananas"

xfun::pkg_bib(c("knitr", "rmarkdown"), file = "refs.bib")
```

The **knitr** versions (`combine_words()`, `write_bib()`) remain as wrappers
and are not deprecated, but new code should prefer the **xfun** versions.

## knitr 1.51 (2025-12-20)

### OpenTelemetry tracing

With **otel** / **otelsdk** installed and a tracer configured, knitting
automatically emits spans you can send to any OpenTelemetry backend, e.g.,

```r
library(otelsdk)
# configure your exporter, then:
knitr::knit("report.Rmd")
# → spans: "knitr processing", "knitr output", one "knit" span per chunk
```

Each per-chunk span records the chunk label and engine, so you can profile
which chunks are slow in a large document
([#2422](https://github.com/yihui/knitr/issues/2422)).

### Before/after-knit hooks

You can run setup or teardown code around the entire knit, not just around each
chunk, e.g.,

```r
knitr::knit_hooks$set(
  before.knit = function() {
    con <<- DBI::dbConnect(RSQLite::SQLite(), "data.db")
  },
  after.knit = function() {
    DBI::dbDisconnect(con)
  }
)
```

([#2223](https://github.com/yihui/knitr/issues/2223), [#2419](https://github.com/yihui/knitr/issues/2419))

### `fig.alt = ''` emits empty alt attribute

Setting `fig.alt = ""` now produces `<img alt="" ...>` instead of omitting the
attribute entirely. Use `fig.alt = NA` to omit it, e.g.,

```r
# decorative image: alt="" tells screen readers to skip it
knitr::opts_chunk$set(fig.alt = "")   # → <img alt="" ...>

# no attribute at all (old behavior for empty alt):
knitr::opts_chunk$set(fig.alt = NA)   # → <img ...> (no alt)
```

The distinction matters for accessibility audits: `alt=""` explicitly marks
a figure as decorative; a missing `alt` is flagged as an error by most tools
([#2415](https://github.com/yihui/knitr/issues/2415)).

## knitr 1.52 (2026-09-06)

### New chunk option `fig.note`

Add a source note or explanatory note below a figure, separate from the
caption, e.g.,

```` md
```{r fig.cap="US population", fig.note="Source: US Census Bureau"}
plot(uspop)
```
````

For HTML this becomes `<p class="figure-note">Source: US Census Bureau</p>`
inside the figure `<div>`, which you can style with CSS. For LaTeX it emits
`\figurenote{Source: US Census Bureau}` inside the figure environment (you can
redefine that command in the preamble, e.g., to use **floatrow**'s
`\floatfoot`). Typst output is also supported
([#2022](https://github.com/yihui/knitr/issues/2022)).

### Typst support: `.Rtyp` input and `knitr::rtyp` vignette engine

I wrote a [dedicated post](/en/2026/04/knitr-typst/) about this feature. In
short, you can now write R + Typst documents with a `.Rtyp` extension and knit
them like R Markdown, e.g.,

```r
knitr::knit("report.Rtyp")          # → report.typ
knitr::knit2pdf("report.Rtyp")      # → report.pdf (via Typst)
```

I'm not sure how many people would actually use this at all, but at least I'm
glad that [Frank
Harrell](https://bsky.app/profile/f2harrell.bsky.social/post/3muuyuutgbk2o)
has been exploring his exciting new journey with the Typst support in
**knitr**
([#2401](https://github.com/yihui/knitr/issues/2401), [#2283](https://github.com/yihui/knitr/issues/2283)).

A new vignette engine means packages can ship Typst vignettes with just two
lines in `DESCRIPTION`:

```
VignetteBuilder: knitr
Suggests: knitr
```

and a vignette header:

```
%\VignetteEngine{knitr::rtyp}
%\VignetteIndexEntry{My Typst Vignette}
```

([#2447](https://github.com/yihui/knitr/issues/2447))

### `hook_plot_tex()` respects `animation.hook`

Previously only `hook_plot_html()` was extensible via `animation.hook` /
`animation.fun`. Now the LaTeX hook respects the same option, e.g., to use
**xmpmulti** for Beamer overlays instead of **animate**:

```r
knitr::opts_chunk$set(
  animation.hook = function(x, options) {
    # use \multiinclude from xmpmulti for Beamer overlays
    paste0("\\multiinclude[format=png]{", xfun::sans_ext(x[1]), "}")
  }
)
```

Without this change, LaTeX animations were locked to the **animate** package
([#2452](https://github.com/yihui/knitr/issues/2452)).

### WebP figures via `ragg::agg_webp()`

For example:

```r
knitr::opts_chunk$set(dev = "agg_webp", fig.ext = "webp")
```

Requires **ragg** >= 1.5.0. WebP is typically 25–35% smaller than PNG at
equivalent visual quality, useful for HTML reports where file size matters
([#2434](https://github.com/yihui/knitr/issues/2434)).

### `dev.args` works with `gridSVG`

For example:

```r
knitr::opts_chunk$set(
  dev = "gridSVG",
  dev.args = list(strict = FALSE, pointsize = 12)
)
```

**knitr** now routes `strict` to `gridSVG::grid.export()` and `pointsize` to
`grDevices::svg()`, so you no longer need a custom hook just to pass options
to `gridSVG`
([#2450](https://github.com/yihui/knitr/issues/2450), [#2451](https://github.com/yihui/knitr/issues/2451)).

### Bug fix: captions dropped for multi-figure chunks

When a single chunk produced more than one figure with captions, only the
first caption survived because Pandoc treated consecutive images in one
paragraph as inline (uncaptioned) images. **knitr** now inserts a blank line
between captioned figures, e.g.,

```` md
```{r fig.cap=c("First plot","Second plot")}
plot(cars)
plot(pressure)
```
````

Both captions now appear correctly in HTML and PDF output
([#2032](https://github.com/yihui/knitr/issues/2032), [#1524](https://github.com/yihui/knitr/issues/1524), [#1760](https://github.com/yihui/knitr/issues/1760)).

### Bug fix: `include_graphics()` paths when output dir differs

For example:

```r
# Rendered with rmarkdown::render("report.Rmd", output_dir = "docs/")
knitr::include_graphics("images/fig1.png")
```

Previously this produced a broken path in the output because **knitr** resolved
the path relative to the input directory, not the output directory. It now
uses the output directory communicated by **rmarkdown** >= 2.32
([#2171](https://github.com/yihui/knitr/issues/2171)).

### `knit2html()` and friends use litedown directly

`knit2html()`, `stitch()`, `knit_rd()`, and the `knitr::knitr` vignette engine
now call `litedown::mark()` directly instead of going through the **markdown**
package. This is potentially a breaking change. Previously, `markdown::mark()`
silently fixed several common problems in vignette YAML headers before handing
off to **litedown**; now those fixes no longer happen. If your vignette was
relying on that silent repair, it will break. Specifically:

1. **`yes`/`no` in YAML.** YAML boolean values must be `true`/`false` in
   litedown. If your vignette header contains e.g. `toc: yes`, change it to
   `toc: true`.

2. **`bibliography` without rbibutils.** If your YAML has a `bibliography:`
   field but the **rbibutils** package is not installed, `markdown::mark()` would
   skip the field silently during `R CMD check`. Now you will get an error, so
   add **rbibutils** to `Suggests` in `DESCRIPTION` if you use bibliography
   in vignettes.

3. **List items with `- ` in YAML.** litedown uses a different YAML syntax than
   standard YAML for lists. Items starting with `- ` at the beginning of a line
   are not supported; see the [litedown YAML
   syntax](https://yihui.org/litedown/#sec:yaml-syntax) for alternatives.

For packages using the `knitr::knitr` vignette engine, also update
`DESCRIPTION` to depend on **litedown** instead of **markdown**, e.g.,

```
Suggests: litedown
```

or if you need the bibliography support:

```
Suggests: litedown, rbibutils
```

## Acknowledgements

Thanks to all contributors who filed issues or submitted pull requests for
these releases:
Abhraneel Sarma ([@abhsarma](https://github.com/abhsarma)),
[@aksigkvgithub](https://github.com/aksigkvgithub),
Arnaud Gallou ([@arnaudgallou](https://github.com/arnaudgallou)),
[@atusy](https://github.com/atusy),
Sebastian Meyer ([@bastistician](https://github.com/bastistician)),
[@blset](https://github.com/blset),
Alex Reinhart ([@capnrefsmmat](https://github.com/capnrefsmmat)),
Christophe Dervieux ([@cderv](https://github.com/cderv)),
Patrick R ([@codeZeilen](https://github.com/codeZeilen)),
David Cser ([@dcser123](https://github.com/dcser123)),
Deepayan Sarkar ([@deepayan](https://github.com/deepayan)),
[@DeliciousRoastPotato](https://github.com/DeliciousRoastPotato),
[@dlampart](https://github.com/dlampart),
David Kaplan ([@dmkaplan2000](https://github.com/dmkaplan2000)),
Chao Cheng ([@fenguoerbian](https://github.com/fenguoerbian)),
Florian Kohrt ([@fkohrt](https://github.com/fkohrt)),
Floris Vanderhaeghe ([@florisvdh](https://github.com/florisvdh)),
Garrick Aden-Buie ([@gadenbuie](https://github.com/gadenbuie)),
[@ggrothendieck](https://github.com/ggrothendieck),
Hadley Wickham ([@hadley](https://github.com/hadley)),
Watal M. Iwasaki ([@heavywatal](https://github.com/heavywatal)),
Hedvig Skirgård ([@HedvigS](https://github.com/HedvigS)),
Doug Hemken ([@Hemken](https://github.com/Hemken)),
Michael Higgins ([@Higgs32584](https://github.com/Higgs32584)),
Jameel Alsalam ([@jameelalsalam](https://github.com/jameelalsalam)),
Jennifer Bryan ([@jennybc](https://github.com/jennybc)),
Jeroen Ooms ([@jeroen](https://github.com/jeroen)),
Johan Larsson ([@jolars](https://github.com/jolars)),
Kevin Ushey ([@kevinushey](https://github.com/kevinushey)),
[@knokknok](https://github.com/knokknok),
Kyle F Butts ([@kylebutts](https://github.com/kylebutts)),
Lee Mendelowitz ([@LeeMendelowitz](https://github.com/LeeMendelowitz)),
Leonidas Zhak ([@LeonidasZhak](https://github.com/LeonidasZhak)),
L. Sandig ([@lsandig](https://github.com/lsandig)),
Markus Schlegel ([@markschl](https://github.com/markschl)),
Max Schmit ([@maxschmi](https://github.com/maxschmi)),
[@mbs2016](https://github.com/mbs2016),
[@mclements](https://github.com/mclements),
Matthew Michalska-Smith ([@mjsmith037](https://github.com/mjsmith037)),
Nicolás A. Méndez ([@naikymen](https://github.com/naikymen)),
Nan Xiao ([@nanxstats](https://github.com/nanxstats)),
Olivia Box Power ([@Olivia-Box-Power](https://github.com/Olivia-Box-Power)),
Ott Toomet ([@otoomet](https://github.com/otoomet)),
Sebastian Kopf ([@sebkopf](https://github.com/sebkopf)),
[@shangeconnew](https://github.com/shangeconnew),
Charlie Gao ([@shikokuchuo](https://github.com/shikokuchuo)),
Toby Dylan Hocking ([@tdhock](https://github.com/tdhock)),
Felix Turbanisch ([@turbanisch](https://github.com/turbanisch)),
Ulrik Lyngs ([@ulyngs](https://github.com/ulyngs)).

It's kind of hard to believe that **knitr** is almost 15 years old now. It has
accompanied me for more than 1/3 of my life. Needless to say, this project
wouldn't be possible without the support from the wider R community, especially
the 2500+ GitHub issues/PRs these years. If there's anything else you need,
please always feel free to file new issues, comment on/upvote old issues, or
send pull requests: https://github.com/yihui/knitr Thank you!
