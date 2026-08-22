---
title: 'The lt Package: Lightweight HTML Tables for R (and Beyond)'
subtitle: A small grammar of tables, built on a JSON spec and a tiny bit of JavaScript
date: '2026-07-10'
slug: lt-package
customCSS: ["utils/lt.css"]
customJS: ["utils/lt.js"]
---

Recently I have released a new package on CRAN:
[**lt**](https://github.com/yihui/lt), short for *lightweight tables* (or *less
than*). Its origin story is a small moment of shock. About two years ago a
project required [**gt**](https://gt.rstudio.com), so I ran
`install.packages('gt')` in a fresh R session on Linux --- and then watched R
install one package after another after another, as if it were going to install
half of CRAN. Some of them had to be compiled, and a few took ages; **V8** in
particular was painful. For a while I wondered whether I had mistyped something,
because surely a table package could not need *this* much. That was when I
learned just how deep **gt**'s (recursive) dependency tree goes.

I have, to this day, never actually used **gt** to make a table --- but that
install left an impression, and **lt** is what eventually grew out of it. I'd
like to thank my manager [Keaven](https://keaven.github.io) at Merck for his
support on developing this package to make packages like **gsDesign2** and
**gsDesign** more lightweight and faster.

This post is a quick introduction to **lt**; you can learn more details and
examples on the package site at <https://pkg.yihui.org/lt/>. BTW, to save a few
kilobytes for the planet, I don't have [a hex
sticker](/en/2026/02/bye-stickers/) for this package.

<style>.lt-table {
  .highlight { font-weight: bold; color: #c60; }
}</style>
<script>((window.LT=window.LT||{}).q=window.LT.q||[]).push({s:document.currentScript,d:
{
  "data": {
    "Grp": ["Group A", "Group A", "Group B", "Group B"],
    "Label": ["<a href='#sec:cheatsheet'>lt(): make a table</a>", "lt_indent(): child A", "lt_indent(): child B", "lt_style() + lt_css()"],
    "Fmt": [1234567.89, -0.51234, Infinity, -Infinity],
    "Sub": [0, null, 3.14, 2e-04],
    "Date": [new Date("2024-01-15"), new Date("2024-02-20"), new Date("2024-03-25"), new Date("2024-04-30")],
    "Align": [1, 22, 333, 4],
    "Width": ["lt_width()", "sets", "column", "widths"],
    "Est": ["0.61", "0.79", "0.45", "0.90"],
    "CI": ["(0.40, 0.82)", "(0.57, 1.01)", "(0.20, 0.70)", "(0.71, 1.14)"]
  },
  "ops": [
    {
      "type": "merge",
      "columns": ["Est", "CI"],
      "pattern": "{1} {2}",
      "hide": true
    },
    {
      "type": "label",
      "labels": {
        "Grp": "lt_group()",
        "Width": "lt_width()",
        "Label": "lt_label(old = new, ...)",
        "Fmt": "lt_format()",
        "Sub": "lt_sub()",
        "Date": "lt_date()",
        "Align": "lt_align()",
        "Est": "lt_merge()"
      }
    },
    {
      "type": "align",
      "columns": ["Align"],
      "align": "center"
    },
    {
      "type": "width",
      "widths": {
        "Width": "9em",
        "Label": "16em"
      }
    },
    {
      "type": "fmt_number",
      "columns": ["Fmt"],
      "decimals": 1,
      "big_mark": ","
    },
    {
      "type": "fmt_date",
      "columns": ["Date"],
      "options": {
        "year": "numeric",
        "month": "short",
        "day": "numeric",
        "timeZone": "UTC"
      }
    },
    {
      "type": "sub",
      "columns": ["Sub"],
      "missing": "n/a",
      "zero": "—",
      "small": 0.01,
      "small_text": "< 0.01"
    },
    {
      "type": "indent",
      "rows": [2, 3],
      "level": 1
    },
    {
      "type": "style",
      "columns": ["Label"],
      "rows": [4],
      "class": "highlight"
    }
  ],
  "auto_format": false,
  "row_group": ["Grp"],
  "header": {
    "title": "A sample table... lt_header(title = ...)",
    "subtitle": "lt_header(subtitle = ...)"
  },
  "spanners": [
    {
      "label": "lt_spanner()",
      "columns": ["Fmt", "Sub"]
    }
  ],
  "html_cols": ["Label"],
  "footnotes": [
    {
      "text": "This table is rendered with lt. lt_footnote() can add a footnote anywhere.",
      "location": {
        "type": "title",
        "group": "title"
      }
    },
    {
      "text": ["Wrap text in <code>I()</code> for raw HTML."],
      "location": {
        "type": "body",
        "columns": ["Label"],
        "rows": [1]
      }
    },
    {
      "text": ["<code>Alt + Click</code> a table to toggle raw values."],
      "location": {
        "type": "body",
        "columns": ["Fmt"],
        "rows": [1]
      }
    }
  ],
  "notes": [
    "lt_note() — and lt_export() saves this table to HTML/PDF/PNG."
  ]
}
})</script>

## Why bother?

Obviously, I borrowed the lovely idea of the *grammar of tables* from **gt**:
you take a plain data frame and layer on titles, column spanners, row groups,
footnotes, and number formatters. That grammar is a good one, and **lt** owes it
the inspiration.

What I did not want was the machinery that came with it --- **sass**, **V8**,
**htmlwidgets**, and their dependencies. For a package whose job is to draw a
table, that is a lot to haul around. So I asked the question I keep asking: how
small can this be if I only care about HTML?

The answer turned out to be *quite* small. On the R side, **lt** leans on
nothing but base R and **xfun**. In the browser, the entire runtime is a single
vanilla-JS file, [lt.js](https://cdn.jsdelivr.net/npm/@xiee/utils/js/lt.js)
(about 10 KB minified). No LaTeX, no RTF, no build step, no framework. Just
HTML.

## Which brings me to my usual sermon

Regular readers know [where I stand](/en/2018/07/in-html-i-trust/): in HTML I
trust. I said it in 2018 and I keep saying it --- most recently while adding
[Typst support to knitr](/en/2026/04/knitr-typst/), where I announced that I had
quit LaTeX. (And don't get me started on MS Office, which I quit using many
years ago.) HTML is where I want my tables to live. It reflows, it styles with a
line of CSS, and it opens on any phone. And when you need a PDF, the tool is a
browser --- which almost every machine already has. Once you commit to HTML, an
enormous amount of complexity simply evaporates. **lt** is what falls out when
you make that commitment for tables.

## The trick: a JSON spec, not R code

Here is the part I am most pleased with. **lt** does not draw the table in R at
all. On the R side you merely *declare* what you want; under the hood, that
declaration is serialized to [a compact JSON
object](https://pkg.yihui.org/lt/examples/02-lt-js) and handed to the browser,
where the tiny `lt.js` runtime builds the real `<table>` on page load. One
inclusion of `lt.js` renders any number of tables on a page.

The R interface will look familiar --- pipe `lt_*()` functions onto an `lt()`
object:

``` r
library(lt)

d = data.frame(
  Group    = c("Treatment", "Treatment", "Control", "Control"),
  Endpoint = c("Primary", "Secondary", "Primary", "Secondary"),
  Estimate = c(0.6123, 0.7891, 0.4567, 0.5432),
  CI_Lower = c(0.4012, 0.5678, 0.2345, 0.3210),
  CI_Upper = c(0.8234, 1.0104, 0.6789, 0.7654),
  P_Value  = c(0.0012, NA, 0.1234, NA)
)
lt(d) |>
  lt_group(~ Group) |>
  lt_header("Study Results", "Primary and secondary endpoints") |>
  lt_spanner(`95% CI` ~ CI_Lower + CI_Upper) |>
  lt_format(~ Estimate + CI_Lower + CI_Upper, decimals = 3) |>
  lt_sub(~ P_Value, missing = "—") |>
  lt_footnote("Two-sided p-value from a t-test.", "column", ~ P_Value)
```

But here is why the JSON layer matters far more than it might first appear. R is
just *one* way to produce that spec. The rendering --- all the actual table
logic --- lives in `lt.js`, which knows nothing about R. So any language that
can emit a little JSON can drive it. Load `lt.js` on a page and call
`LT.build()` with the spec yourself, and you get exactly the same table:

``` js
LT.build({
  "data": { "x": [1, 2], "y": [3.1415, 2.7182] },
  "ops": [
    { "type": "fmt_number", "columns": ["y"], "decimals": 2 }
  ]
});
```

I think this is a meaningfully different bet from how **gt** evolved. **gt** is
an R package, and when the Python world wanted the same grammar, [Great
Tables](https://posit-dev.github.io/great-tables/) was essentially rebuilt from
scratch in Python --- a big, careful effort, but a *second implementation* of
the same logic. With **lt**, the logic lives in the JavaScript runtime, once. An
R package is a thin front end that writes JSON. A Python package could be
another thin front end writing the same JSON --- no re-implementation of the
table engine, just a different keyboard for the same piano. That door is wide
open, and I would be delighted if someone walked through it. I don't have much
interest in writing this Python package by myself, although I guess this should
be a simple task for AI.

## My favorite part: access to truth at any time

Because the browser holds the original data and does the rendering, the table is
not a dead picture --- it can be interactive. The little feature I love most:
when a value in a cell is formatted, the raw value is not thrown away. Hover
over a cell and a tooltip shows what it really was (so we no longer have to
argue about the most appropriate number of decimal places for the table --- you
can always see the original value). You can `Alt + Click` a table to reveal all
raw values at once, and `Alt + Double-Click` to toggle raw values for every
table on the page. A formatted table you can peek underneath, with no extra
setup, is exactly the kind of small delight that a static PDF or image can never
give you --- and it comes for free from committing to HTML.

I've had this idea since 2024, and I'm happy that I've finally implemented it
(technically, it's not hard at all).

## The grammar in brief

If you have used **gt**, the vocabulary will feel familiar:

-   **Structure**: `lt_header()` (title/subtitle), `lt_spanner()` (column
    spanners), `lt_group()` (row groups).
-   **Content & labels**: `lt_label()`, `lt_footnote()`, `lt_note()`,
    `lt_html()` (emit raw HTML instead of escaping).
-   **Formatting**: `lt_format()` (numbers), `lt_date()` (dates via the browser
    locale), `lt_sub()` (value substitution), `lt_merge()`, `lt_indent()`.
-   **Appearance**: `lt_align()`, `lt_width()`, `lt_style()`, `lt_css()`.
-   **Misc**: `lt_move()` (reorder columns), `lt_export()`, and Shiny bindings
    (`lt_output()` / `render_lt()`).

## When you need something static

Because the table is drawn by JavaScript, viewing it normally wants a browser.
When you need a self-contained artifact instead, `lt_export()` saves a table to:

-   `.html` --- optionally *baking* a static `<table>` that needs no JavaScript
    at all to view;
-   `.pdf` --- a vector PDF;
-   `.png` --- a raster image.

The PDF and PNG paths render through a headless browser (Chrome / Chromium /
Edge) and crop tightly to the table.

## Give it a spin

``` r
# CRAN
install.packages("lt")

# development version
install.packages("lt", repos = "https://yihui.r-universe.dev")
```

There is also an online [playground](https://pkg.yihui.org/lt/playground/) if
you would rather poke at it without installing anything, and a [migration
guide](https://pkg.yihui.org/lt/examples/03-gt.html) if you are coming from
**gt**.

Of course, I don't want to match **gt** feature for feature; I just want to
cover the table structure most reports actually need --- and to show, one more
time, that if you are willing to trust HTML, you can go a remarkably long way
with remarkably little.

P.S. I'll be on vacation for the next 5 weeks in China (to live an AI-less
life). While I'd like to hear your feedback on **lt** (please feel free to leave
comments below or file [Github issues](https://github.com/yihui/lt)), I'm afraid
I won't be very responsive until late August. Also stay tuned for the
lightweight and interactive version of the grammar of graphics later this year,
which is a much more challenging project than this table package.
