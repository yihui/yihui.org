---
title: Tangling Gets Smarter in knitr
date: '2026-09-21'
slug: knitr-tangle
---

Note

:   This is one of a few posts on new features from a recent [four-day knitr
    backlog sprint](/en/2026/09/knitr-backlog/); see that post for the full
    details of the sprint.

Tangle is the old Literate Programming (e.g., WEB/Sweave) term for pulling the
code out of a document and throwing away the prose. In **knitr** you do it with
`purl()`: give it an `.Rmd` and you get back a `.R` script with just the code.
It's a small feature, but people lean on it more than I expected. In this
development cycle, it picked up several improvements:

## Tangling documents that aren't R

`purl()` has always assumed the code is R. But **knitr** happily runs Python,
Julia, SQL, and a dozen other engines, so why should tangling be R-only?

Now, if the *first* code chunk of a document uses another language, `purl()`
tangles the whole document to a script in that language. A Python-first document
gives you a `.py` file:

```` md
```{python setup}
import pandas as pd
```

```{python}
df = pd.read_csv("data.csv")
df.describe()
```
````

Run `knitr::purl("report.Rmd")` on that and you get a `report.py`. Chunk headers
become `#%%` cells (the convention VS Code and Jupyter understand as code
cells), and chunks in other languages are *dropped* (you still cannot mix
multiple languages in one tangled output file). Use the `output` argument if you
want a different extension
([#1928](https://github.com/yihui/knitr/issues/1928)).

## Reading chunks from another document

`read_chunk()` lets one document borrow labeled chunks from an external file.
Until now that file had to be a plain R script with `## ---- label` markers.

Now it can be another **knitr** source document---an `.Rmd`, an `.Rnw`,
whatever. **knitr** reads its chunks and keys them by label, so you can pull
individual chunks into the current document by reference:

```` md
```{r, cache=FALSE}
knitr::read_chunk("analysis.Rmd")
```

Here is the model-fitting step from the full analysis:

```{r fit-model}
```
````

The label can come from the chunk header (`{r fit-model}`) or from a `#| label:`
option. This is handy for teaching materials and papers, where you want to show
a curated subset of a larger analysis without copy-pasting code that will drift
out of sync ([#2041](https://github.com/yihui/knitr/issues/2041)).

## Deciding what to tangle with option hooks

Option hooks (registered via `opts_hooks$set()`) run when knitting, and now they
also run when tangling. That means a hook can decide which chunks make it into
the tangled script, based on any chunk option.

A common request: extract only the "solution" chunks from a document. With a
hook on the `label` option, you don't have to touch the source at all:

``` r
knitr::opts_hooks$set(label = function(options) {
  options$purl <- grepl("-solution$", options$label)
  options
})
knitr::purl("exercises.Rmd")  # only chunks labelled *-solution end up in the script
```

Before, `purl` was a static option you had to write into each chunk header; now
you can compute it ([#1903](https://github.com/yihui/knitr/issues/1903)).

## Comments, your way

When `purl()` tangles a chunk with `eval = FALSE`, it comments the code out, on
the theory that you didn't want to run it. But sometimes you do want it runnable
from the script. The `comment` option now controls this: set `comment = ''` (or
`NA`) to keep the code uncommented even though it's `eval = FALSE`:

```` md
```{r, eval=FALSE, comment=""}
# this stays runnable in the tangled script
dangerous_but_reproducible()
```
````

The reverse works too. Set an explicit `comment` prefix on an *evaluated* chunk
and its code will be commented out in the script---useful for keeping a record
of a one-time setup step that shouldn't be re-run
([#2425](https://github.com/yihui/knitr/issues/2425),
[#1352](https://github.com/yihui/knitr/issues/1352)).

## Odds and ends

Two smaller fixes in the same area:

-   `hook_purl()`, the hook that writes a tangled script *while* weaving, now
    keeps `#|` cell options in the output, matching `purl()` itself
    ([#2414](https://github.com/yihui/knitr/issues/2414)).
-   Tangling a document whose YAML defines `params` no longer silently drops
    chunks that reference those params in their options (e.g.,
    `eval = params$run`). I mentioned this one in the [backlog
    summary](/en/2026/09/knitr-backlog/)
    ([#1938](https://github.com/yihui/knitr/issues/1938)).
