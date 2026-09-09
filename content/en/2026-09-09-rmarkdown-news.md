---
title: 'A Review of **rmarkdown** Updates from 2024 to 2026'
date: '2026-09-09'
slug: rmarkdown-news
---

Back in 2022, I promised that [R Markdown wouldn't
die](/en/2022/04/quarto-r-markdown/). In this post, I'll give a summary of
notable updates in **rmarkdown** v2.26--v2.32 (2024--2026). For the full
changelog, please see the [release
notes](https://github.com/rstudio/rmarkdown/releases) on GitHub.

## rmarkdown 2.26 (2024-03-05)

### Avoid corrupting input files

A subtle bug could cause **rmarkdown** to silently overwrite the input `.Rmd`
file if certain conditions were met during rendering. This has been fixed
([#2534](https://github.com/rstudio/rmarkdown/issues/2534)).

### `fig_crop: auto` aligned with knitr

The output format option `fig_crop: auto` now uses the same logic as **knitr**
to decide whether PDF figure cropping is possible (checking for the `pdfcrop`
tool). Previously **rmarkdown** had its own, slightly different check that could
give inconsistent results
([yihui/knitr#2246](https://github.com/yihui/knitr/issues/2246)).

### Removed **stringr** dependency

**stringr** was used in only one place and the equivalent base R code is simple,
so it was removed. One fewer transitive dependency for all **rmarkdown** users
([#2530](https://github.com/rstudio/rmarkdown/issues/2530)).

## rmarkdown 2.27 (2024-05-20)

### Configurable auxiliary-files suffix

By default, **rmarkdown** writes HTML dependencies into a `<name>_files/`
directory. On Microsoft OneDrive and Google Drive this suffix can sometimes
cause the folder to be randomly deleted. You can now configure a different
suffix in your `.Rprofile`, e.g.,

``` r
options(rmarkdown.files.suffix = "_rmdfiles")
```

and the directory will be `<name>_rmdfiles/` instead
([#2550](https://github.com/rstudio/rmarkdown/issues/2550)).

### Image path regression fixed

A regression in 2.26 broke absolute image paths when `output_dir` is set.
Absolute paths pointing inside the output directory are now correctly made
relative to `output_dir` again.

## rmarkdown 2.28 (2024-08-17)

### `beamer_presentation` supports LaTeX dependencies

You can now declare LaTeX dependencies for Beamer slides either via the new
`extra_dependencies` argument or from within a chunk, e.g.,

``` yaml
---
output:
  beamer_presentation:
    extra_dependencies: ["booktabs", "longtable"]
---
```

or inline:

``` r
knitr::asis_output("", meta = list(
  rmarkdown::latex_dependency("longtable")
))
```

This makes it easier to include packages like **longtable** or **booktabs**
without patching the LaTeX template
([#2478](https://github.com/rstudio/rmarkdown/issues/2478)).

### Table row classes for Pandoc ≥ 3.2.1

Pandoc 3.2.1 changed how it names table row classes, dropping `odd`, `even`, and
`header`. **rmarkdown** now adds them back so existing CSS that styles table
rows continues to work
([#2567](https://github.com/rstudio/rmarkdown/issues/2567)).

## rmarkdown 2.29 (2024-11-04)

### `knit_params_ask()` uses `select` for multi-value parameters

When a parameter declared in YAML allows multiple values, the interactive
parameter dialog now shows a `select` (multi-choice) input instead of a `radio`
button, e.g.,

``` yaml
params:
  primaries:
    choices: ["red", "yellow", "blue"]
    multiple: true
```

Previously a `radio` input was incorrectly used, making it impossible to select
more than one value at a time. Single-value parameters with fewer than five
choices still use `radio` by default (which is configurable)
([#2576](https://github.com/rstudio/rmarkdown/issues/2576)).

## rmarkdown 2.30 (2025-09-29)

### Pandoc compatibility updates

The deprecated `--no-highlight` Pandoc argument was replaced with
`--syntax-highlighting=none` for Pandoc ≥ 3.8, and the long-obsolete `|>` / `=>`
syntax-highlighting workaround (unnecessary since Pandoc 2.18, over three years
ago) was removed ([#2602](https://github.com/rstudio/rmarkdown/issues/2602),
[#2290](https://github.com/rstudio/rmarkdown/issues/2290)).

### `convert_ipynb()` preserves raw cells without format

Raw notebook cells that have no `format` field in their metadata are no longer
silently dropped during conversion. For example, a cell like

``` json
{
  "cell_type": "raw",
  "source": ["some raw content"]
}
```

was previously lost; it is now passed through to the output
([#2587](https://github.com/rstudio/rmarkdown/issues/2587)).

### `render()` fixed for `.md` → PDF

A bug prevented `render()` from working when converting a plain `.md` file
directly to PDF. Fixed
([#2599](https://github.com/rstudio/rmarkdown/issues/2599)).

### `pandoc_convert()` errors when Pandoc is absent

Previously `pandoc_convert()` would fail silently or with a confusing message
when Pandoc was not available. It now throws an informative error immediately,
making the root cause obvious
([#2600](https://github.com/rstudio/rmarkdown/issues/2600)).

## rmarkdown 2.31 (2026-03-26)

### Base64 images work in non-HTML output

Previously, base64-encoded images only worked correctly in HTML output. They now
work in non-HTML formats (such as PDF) as well
([#2604](https://github.com/rstudio/rmarkdown/issues/2604)).

## rmarkdown 2.32 (2026-09-07)

### LaTeX auxiliary files written to output directory

When rendering to PDF, LaTeX auxiliary files (`.aux`, `.log`, etc.) are now
written to `output_dir` rather than the input file's directory. Previously
`latexmk()` ran in the input directory, so rendering failed when that directory
was read-only---common in production deployments or when the document lives in a
shared read-only location, e.g.,

``` r
rmarkdown::render("report.Rmd", output_dir = "docs/")
# Now works even if the directory containing report.Rmd is read-only
```

([#1975](https://github.com/rstudio/rmarkdown/issues/1975),
[#1615](https://github.com/rstudio/rmarkdown/issues/1615))

### `intermediates_dir` PDF rendering fixed

Two related bugs with the `intermediates_dir` argument were fixed:

1.  A `cannot open file '<name>.tex'` error when Pandoc wrote the intermediate
    `.tex` into `intermediates_dir` but **rmarkdown** looked for it in the input
    directory. The `.tex` is now resolved to its actual location.
2.  With `keep_tex: true`, the retained `.tex` is now moved next to the output
    instead of being left behind in `intermediates_dir`
    ([#2183](https://github.com/rstudio/rmarkdown/issues/2183)).

### `lib_dir` outside the output directory

HTML output no longer errors when `lib_dir` points outside `output_dir`, e.g.,

``` r
rmarkdown::render("a/report.Rmd",
  output_dir = "a/",
  lib_dir     = "../shared-libs/")
```

Dependencies are now referenced with an up-tree relative path instead of failing
with `"The path <file> does not appear to be a descendant of <dir>"`. This lets
documents in sibling subdirectories share a single library directory
([#146](https://github.com/rstudio/rmarkdown/issues/146),
[#1859](https://github.com/rstudio/rmarkdown/issues/1859),
[#2199](https://github.com/rstudio/rmarkdown/issues/2199)).

### Minimum Pandoc version raised to 2.8

Support for Pandoc 1.x and early 2.x was dropped, removing several internal
version guards. Pandoc 2.8 was released in 2019, so this should affect very few
users in practice ([#2623](https://github.com/rstudio/rmarkdown/issues/2623)).

### Relicensed to MIT

**rmarkdown** is now licensed under MIT (previously GPL-3)
([#2615](https://github.com/rstudio/rmarkdown/issues/2615)).

### Parallel `render()` via fork clusters fixed

When calling `render()` in parallel via `parallel::mclapply()` or a fork
cluster, processes could accidentally delete each other's temp files because all
processes shared the same `tempdir()`. Temp files are now tracked per process,
so sibling renders no longer interfere
([#1632](https://github.com/rstudio/rmarkdown/issues/1632)).

### ioslides captions fixed for Pandoc 3

Captioned figures disappeared from `ioslides_presentation()` output when using
Pandoc 3, which represents standalone captioned images as `Figure` elements not
handled by the custom writer. **rmarkdown** now handles them correctly
([#2607](https://github.com/rstudio/rmarkdown/issues/2607)).

## Acknowledgements

I want to thank all contributors who filed issues or submitted pull requests for
these releases: André Veríssimo ([\@averissimo](https://github.com/averissimo)),
[\@atusy](https://github.com/atusy), Sebastian Meyer
([\@bastistician](https://github.com/bastistician)), Michal Burda
([\@beerda](https://github.com/beerda)),
[\@BerndGit](https://github.com/BerndGit), Brian Perdomo
([\@brianperdomo](https://github.com/brianperdomo)),
[\@certara-tzweers](https://github.com/certara-tzweers), Christophe Dervieux
([\@cderv](https://github.com/cderv)), Etienne Bacher
([\@etiennebacher](https://github.com/etiennebacher)), Gábor Csárdi
([\@gaborcsardi](https://github.com/gaborcsardi)), Jiri Novotny
([\@gorgitko](https://github.com/gorgitko)), Jonathan Guerra
([\@jonathan-g](https://github.com/jonathan-g)),
[\@jsinnett](https://github.com/jsinnett),
[\@jszhao](https://github.com/jszhao), Jiří Moravec
([\@J-Moravec](https://github.com/J-Moravec)), Karan
([\@karangattu](https://github.com/karangattu)),
[\@katrinabrock](https://github.com/katrinabrock), Leonidas Zhak
([\@LeonidasZhak](https://github.com/LeonidasZhak)), Miriam Rainers
([\@mrainers](https://github.com/mrainers)), Rémi Thériault
([\@rempsyc](https://github.com/rempsyc)), Siddhartha Bagaria
([\@siddharthab](https://github.com/siddharthab)), Tomasz Kalinowski
([\@t-kalinowski](https://github.com/t-kalinowski)),
[\@therealgenna](https://github.com/therealgenna), Ruiyang Wu
([\@ywwry66](https://github.com/ywwry66)).

In particular, I want to highlight Jonathan Guerra for his perseverance on the
PR [#2199](https://github.com/rstudio/rmarkdown/pull/2199) for five whole years.
["Who speaks of victory? To endure (70+ times of git merge) is
all."](https://www.goodreads.com/quotes/852447-who-speaks-of-victory-to-endure-is-all)
Finally, I have had the time and courage to look at his PR and fix the problem
(apologies for the delay!), which has removed an unreasonable requirement in
**rmarkdown**'s `lib_dir` argument, and the original request goes all the way
back to 2014 with many upvotes on related issues! I'm really glad that this
problem is gone at last. Similarly, there have been some other long-lasting
annoying bugs like [#1975](https://github.com/rstudio/rmarkdown/issues/1975) and
[#1632](https://github.com/rstudio/rmarkdown/issues/1632), which were also
upvoted by many users and are now gone.

If you still use R Markdown (cool as a cucumber), I hope you will enjoy the new
releases. As usual, please feel free to file issues or send pull requests on
GitHub if you need anything. Thanks!
