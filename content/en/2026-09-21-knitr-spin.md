---
title: spin() Improvements in knitr
date: '2026-09-21'
slug: knitr-spin
---

Note

:   This is one of a few posts on new features from a recent [four-day knitr
    triage sprint](/en/2026/09/knitr-backlog/); see that post for the full
    details of the sprint.

The concept of `spin()` is like the reverse of `purl()`. Instead of pulling code
out of a document, it turns a plain script---code with special `#'` comments for
prose and `#+` comments for chunk options---into a full report. It's a nice way
to write a quick reproducible document when you can't be bothered to create an
`.Rmd`: just write an R script, sprinkle in some `#'` comments, and spin it.
This cycle it got a few nice upgrades.

## Spin scripts in other languages

`spin()` assumed R. But if you keep your analysis in a Python script, you
shouldn't have to annotate every single chunk with `#+ engine="python"` just to
spin it. The new `engine` argument sets a default engine for all chunks:

``` r
knitr::spin("analysis.py", engine = "python")
```

Better still, if you leave `engine` unset, it's guessed from the file
extension---so a `.py` file spins as Python without any argument at all. A chunk
that sets its own `engine` still overrides the default. (This applies to the
Markdown output formats.) It makes `spin()` a genuinely language-agnostic way to
turn an annotated script into a report
([#1773](https://github.com/yihui/knitr/issues/1773)).

## Keeping roxygen2 blocks intact

Here's a subtle collision. `spin()` treats `#'` lines as prose. But
**roxygen2**---the tool that generates R package documentation---*also* uses
`#'` lines, for tags like `#' @param`. So if you tried to spin a script that
doubled as roxygen-documented package code, your `@param` tags got swept up and
turned into prose, and the script stopped being valid roxygen input.

The new `roxygen = TRUE` argument fixes the conflict: a block of consecutive
`#'` lines that contains a roxygen tag is kept verbatim, inside the code chunk,
instead of being converted to prose. Blocks with no tag are still treated as
documentation:

``` r
knitr::spin("myfun.R", roxygen = TRUE)
```

So the same file can be both a spinnable report and a source file **roxygen2**
is happy to parse ([#2317](https://github.com/yihui/knitr/issues/2317)).

## Round-tripping with purl()

`purl(documentation = 2)` emits chunk labels as `## ----label` tokens, and
`spin()` reads those back. But it used to glue the label straight onto the
engine name, producing an invalid header like ```` ```{rlabel} ````---and on the
next `purl()`, `rlabel` was mistaken for an engine name and the chunk got
mangled. `spin()` now inserts the missing space (```` ```{r label} ````), so
`purl()` → `spin()` → `purl()` round-trips cleanly
([#2014](https://github.com/yihui/knitr/issues/2014)).

## Catching mismatched delimiters

`spin()` uses `# /*` and `# */` to mark a block of lines to drop. It used to
only compare the *counts* of start and end delimiters, so a mis-ordered pair (an
end before its start) could silently swallow the lines in between. It now checks
that the delimiters are properly paired and ordered, and reports the line number
of any unmatched one instead of quietly eating your content
([#1801](https://github.com/yihui/knitr/issues/1801),
[#1802](https://github.com/yihui/knitr/issues/1802)).
