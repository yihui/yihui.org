---
title: Hooks
subtitle: Customizable functions to run before / after a code chunk, tweak the output,
  and manipulate chunk options
date: '2017-02-03'
show_toc: true
---

The object `knit_hooks` in the **knitr** package is used to set hooks; the basic
usage is `knitr::knit_hooks$set(name = FUN)` (see [objects](../objects/) for
details) where `name` is the name of a chunk option (can be arbitrary), and
`FUN` is a function. There are two types of hooks: chunk hooks and output hooks.
Hook functions may have different forms, depending what they are designed to do.

## Chunk hooks

Chunk hooks are functions to be called before or after a code chunk when the
associated chunk option is not `NULL`. A hook function can accept the following
arguments:

``` r
hook_foo = function(before, options, envir, name, ...) {
  if (before) {
    # code to be run before a chunk
  } else {
    # code to be run after a chunk
  }
}
```

-   When **knitr** is processing the document, `hook_foo(before = TRUE)` will be
    called before a code chunk is executed (unless the chunk is cached or set
    not to be evaluated), and `hook_foo(before = FALSE)` is called after a
    chunk.

-   The argument `options` is a list of [options](../options/) in the current
    chunk (e.g. `options$label` is the label of the current chunk).

-   The argument `envir` is the environment in which the code chunk is
    evaluated.

-   The argument `name` is the name associated with the hook in `knit_hooks`.

-   All arguments are optional, e.g., both `function(before)` and
    `function(options, ...)` are valid signatures. A value in
    `list(before, options, envir, name)` will be passed to the corresponding
    argument of the hook function only if the argument exists.

For example, if we set a hook for the `small_mar` option as:

``` r
knitr::knit_hooks$set(small_mar = function(before, ...) {
  if (before)
    par(mar = c(4, 4, .1, .1))  # smaller top/right margin
})
```

Then this function will be called for a chunk like this (`small_mar` doesn't
have to be `TRUE`; it can be any non-`NULL` value):

```` md
```{r, myplot, small_mar=TRUE}
hist(rnorm(100), main = '')  # no main title
```
````

In **knitr**, hooks can also be used to insert texts into the output. To do
this, the hook function must return a character result. This feature can greatly
extend the power of hooks. Take the **rgl** package for example: if we want to
insert 3D snapshots produced in **rgl** into our Markdown/HTML document, we may
consider this hook function (see the more sophisticated `hook_rgl()` in the
**rgl** package):

``` r
knitr::knit_hooks$set(rgl = function(before, options, envir) {
  if (!before) {
    # after a chunk has been evaluated
    if (rgl.cur() == 0) return()  # no active device
    name = paste0(options$fig.path, options$label, '.png')
    rgl.snapshot(name, fmt = 'png')
    return(paste0('![rgl plot](', name, ')\n'))
  }
})
```

And the code chunk may look like this:

```` md
```{r, fancy-rgl, rgl=TRUE}
library(rgl)  # example taken from ?plot3d
open3d()
x = sort(rnorm(1000)); y = rnorm(1000); z = rnorm(1000) + atan2(x,y)
plot3d(x, y, z, col = rainbow(1000))
```
````

In the Markdown output, we will see `![rgl plot](fancy-rgl.png)`.

In summary:

1.  The hook can be set in `knit_hooks` via `knit_hooks$set(name = FUN)`;
2.  The chunk option `name` should take a non-`NULL` value in this chunk for the
    hook function to run;
3.  A hook can be run before and/or after a chunk;
4.  Character results returned by hooks will be written into the output without
    modifications.

See
[045-chunk-hook.md](https://github.com/yihui/knitr-examples/blob/master/045-chunk-hook.md)
([source](https://github.com/yihui/knitr-examples/blob/master/045-chunk-hook.Rmd))
for further examples.

## Output hooks

Output hooks are used to customize and polish the *raw* output from chunks.
There are 8 output hooks in all to deal with different types of output:

-   `source`: the source code
-   `output`: ordinary R output (i.e., what would have been printed in an R
    terminal) except warnings, messages and errors
-   `warning`: warnings from `warning()`
-   `message`: messages from `message()`
-   `error`: errors from `stop()` (applies to errors in both code chunks and
    inline R code)
-   `plot`: graphics output
-   `inline`: output of inline R code
-   `chunk`: all the output of a chunk (i.e., those produced by the previous
    hooks)
-   `document`: the output of the whole document (is `base::identity` by
    default)

All these hooks should be of the form `function(x, options)` (except the
`inline` and `document` hooks which only have one argument `x`), where `x` is
the character string of the output, and `options` is a list of current chunk
options. You may find more information and examples about output hooks in the
[*R Markdown
Cookbook*](https://bookdown.org/yihui/rmarkdown-cookbook/output-hooks.html).

Below is an example of setting the `error` hook to add extra formatting to any
error messages in an [R Markdown](https://rmarkdown.rstudio.com) document.

``` r
knitr::knit_hooks$set(error = function(x, options) { 
  paste(c('\n\n:::{style="color:Crimson; background-color: SeaShell;"}',
        gsub('^## Error', '**Error**', x),
        ':::'), collapse = '\n')
})
```

You may test the hook with a code chunk like this:

```` md
```{r, error=TRUE}
1 + "a"
```
````

Unlike chunk hooks which are empty by default, output hooks all come with
default values that can be reset with:

``` r
knitr::knit_hooks$restore() 
```

This package has set default output hooks for different parts of output and to
accommodate different output formats such as LaTeX, HTML, and Jekyll. A series
of functions of the form `render_*()` are provided to set built-in output hooks
for different output formats, e.g. `render_latex()` and `render_html()`, etc.
Output hooks should be set inside the document, but if the hooks are set before
`knitr::knit()` processes the document, `render_*()` must be called first, where
`*` is the output format, e.g., `render_markdown()` or `render_html()`. You can
access these output hooks without setting them via the `hooks_*()` functions,
e.g., `hooks_markdown()`.

Below are details for these formats:

### LaTeX: `render_latex()`

If the output file type is LaTeX, default hooks will put most output in the
`verbatim` environment, and numeric `inline` output will be formatted in
scientific notation (see [output demo](../demo/output/) for details); `plot` and
`chunk` hooks are more complicated:

-   The default `plot` hook takes many factors into account to give a reasonable
    output.
    -   For example, if the graphics device is `tikz`, the command `\input{}`
        will be used, otherwise it uses the normal `\includegraphics{}`.
    -   Depending on the `out.width` and `out.height` options, the hook will
        reset the size of the plot (e.g.
        `\includegraphics[width=.8\textwidth]{file}`).
    -   If there are multiple plots per chunk, we can set the option
        `fig.show='hold'` with an appropriate width so more than one plot can be
        arranged in a row (e.g., `.45\textwidth` means 2 plots per row); note
        this is not true for tikz graphics because they are inserted by
        `\input{}`, however, the chunk option `resize.width` and `resize.height`
        can be used to arrange multiple tikz plots in a row (via
        `\resizebox{resize.width}{resize.height}{file.tikz}`; if one of these
        options is `NULL`, it will be replaced by `!`; see LaTeX package
        `graphicx` for details).
    -   This hook function gives the user full power of using graphics in
        automatic report generation---not only multiple plots per chunk and
        setting sizes of plots become possible, but also we can even put base
        graphics and grid graphics (e.g. **ggplot2**) or multiple grid plots
        side by side. There are four values for the `fig.align` option to decide
        how to align plots (`default`, `left`, `right`, `center`), e.g., it is
        easy to center the plots (set chunk option `fig.align='center'`).
-   The default `chunk` hook is mainly used to decorate chunks.
    -   If the LaTeX package `framed` is available in the user's TeX software
        package (TeX Live or MikTeX or other packages), the chunk hook will put
        the whole output in the `kframe` environment with customizable
        background colors (default is very light gray), which makes the chunks
        cognitively better (they stands out from other text yet do not have a
        too strong visual impact). In the end, all the output is wrapped in a
        `knitrout` environment, and the user can redefine this environment in
        LaTeX.

### Sweave: `render_sweave()`

Put source code in the `Sinput` environment, output in the `Soutput` environment
and the whole chunk in the `Schunk` environment. The style file `Sweave.sty` is
required to use this theme, or at least these three environments have to be
defined.

### Listings: `render_listings()`

Similar to Sweave, and
[`Sweavel.sty`](https://github.com/yihui/knitr/blob/master/inst/misc/Sweavel.sty)
is used instead.

### HTML: `render_html()`

To write output into an HTML file, the hooks will be automatically adjusted.
Basically the output from chunks is put in `div` layers with classes, e.g.
source code is in `<div class="knitr source"></div>`; the whole chunk output is
in `<pre></pre>`; inline output is in `<code class="knitr inline"></code>`.

### Markdown: `render_markdown()`

The source code and output will be indented by 4 spaces. For GitHub Flavored
Markdown, the source code is put in between ```` ```r ```` and ```` ``` ````;
output is between ```` ``` ```` and ```` ``` ````.

### Jekyll: `render_jekyll()`

I need to build this site so I also set up some hooks especially for Jekyll, and
they are actually quite simple: R source code is put in a highlight environment
with the language set to `r`, and the rest of output belongs to the highlight
environment with the `text` language (nearly no highlighting at all). Currently
plots are written out according to the syntax of Markdown.

### reStructuredText: `render_rst()`

Code is put after `::` and indented by 4 spaces, or in the `sourcecode`
directive.

## Option hooks

Sometimes you may want to change certain chunk options according to the values
of other chunk options, and you may use the object `opts_hooks` to set up an
option hook to do it. An option hook is executed when a corresponding chunk
option is not `NULL`. For example, we can tweak the `fig.width` option so that
it is always no smaller than `fig.height`:

``` r
knitr::opts_hooks$set(fig.width = function(options) {
  if (options$fig.width < options$fig.height) {
    options$fig.width = options$fig.height
  }
  options
})
```

Because `fig.width` will never be `NULL`, this hook function is always executed
before a code chunk to update its chunk options. For the code chunk below, the
actual value of `fig.width` will be 6 instead of the initial 5 if the above
option hook has been set up:

```` markdown
```{r fig.width = 5, fig.height = 6}
plot(1:10)
```
````
