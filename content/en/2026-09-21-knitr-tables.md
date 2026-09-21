---
title: Better Tables with knitr::kable()
date: '2026-09-21'
slug: knitr-tables
---

Note

:   This is one of a few posts on new features from a recent [four-day knitr
    backlog sprint](/en/2026/09/knitr-backlog/); see that post for the full
    details of the sprint.

`kable()` is deliberately minimal---it makes a simple table and gets out of your
way, and if you want fancy tables, you reach for many other packages such as
**kableExtra**, **gt**, [**lt**](/en/2026/07/lt-package/), and **flextable**,
etc. But "minimal" shouldn't mean "stuck," and in this cycle, `kable()` picked
up a handful of refinements. A few are about accessibility, a few are about
getting numbers and captions to look right, and a few just remove old
annoyances.

## Accessible HTML tables

An HTML table is much more useful to screen-reader users when its header cells
are marked as headers with a `scope`. `kable()` now adds `scope="col"` to column
headers automatically---no option to set, you just get it:

``` r
knitr::kable(head(mtcars), format = "html")
# column headers now render as <th scope="col">
```

If you also want the row-name column treated as row headers
(`<th scope="row">`), opt in with a global option---it's off by default because
`<th>` cells can render differently from `<td>`:

``` r
options(knitr.table.html.row.header = TRUE)
```

([#1747](https://github.com/yihui/knitr/issues/1747))

## Numbers that typeset correctly in LaTeX

LaTeX has strong opinions about numbers, and left to its own devices it renders
minus signs, infinities, and scientific notation in text mode, where they look
wrong. `kable()` can now typeset numeric columns in math mode instead, which
fixes the minus signs and wraps decimal/thousands separator commas in braces to
preserve spacing:

``` r
knitr::kable(df, format = "latex", numeric.math = TRUE)
# or globally:
options(knitr.table.numeric.math = TRUE)
```

([#1709](https://github.com/yihui/knitr/issues/1709))

## Caption on top or bottom

For a floating LaTeX table, convention differs by field about whether the
caption sits above or below. `kable()` defaults to the top; the new
`caption.pos` argument lets you move it:

``` r
knitr::kable(df, format = "latex", caption = "...", caption.pos = "bottom")
# or globally:
options(knitr.table.caption.pos = "bottom")
```

([#1189](https://github.com/yihui/knitr/issues/1189))

## Line breaks in simple tables

`format = "simple"` produces Pandoc's simple tables, which are compact and
readable in the Markdown source---but they can't represent a line break inside a
cell, so any `\n` used to wreck the layout. `kable()` now detects that case and
emits a Pandoc *multiline* table instead, which preserves alignment:

``` r
x <- data.frame(item = "a", note = "first line\nsecond line")
knitr::kable(x, format = "simple")
```

([#2021](https://github.com/yihui/knitr/issues/2021))

## Keep your whitespace, control your NAs

Two small quality-of-life additions:

-   By default `kable()` trims leading/trailing whitespace in cells. If you were
    using spaces to align numbers under a monospace font in the source, set
    `options(knitr.kable.keep.whitespace = TRUE)` to preserve them
    ([#2066](https://github.com/yihui/knitr/issues/2066)).

-   The new `na` argument controls how `NA` values display in a single
    call---the per-call equivalent of the global `knitr.kable.NA` option, and it
    wins when both are set:

    ``` r
    knitr::kable(x, na = "")    # hide NAs
    knitr::kable(x, na = "--")  # show them as dashes
    ```

    ([#1813](https://github.com/yihui/knitr/issues/1813))
