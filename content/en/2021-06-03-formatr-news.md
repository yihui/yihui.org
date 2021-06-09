---
title: News from formatR v1.9 to v1.11
subtitle: Pipe operators, line width limit, function argument layout, wrap comments, and the right arrow
date: '2021-06-03'
slug: formatr-news
---

The [formatR package](https://github.com/yihui/formatR) is 11 years old now.
Interestingly, my [very first English blog
post](/en/2007/08/tidy-up-your-r-code/) was about this package. The original
implementation was 8 lines of code in total, which still works today.

In the 11 years, the code size has grown to 784 lines, which is roughly 100
times bigger, and this package still has zero R package dependencies. It has
some soft dependencies, but they do not affect the core functionality.

``` sh
$ wc -l R/*.R
    33 R/eval.R
    10 R/shiny.R
   253 R/tidy.R
   187 R/usage.R
   301 R/utils.R
   784 total
```

To be honest, the package contains a lot of ugly and dirty hacks (if I were
younger, I would also say "clever"), and I do not even have the courage of look
at them sometimes, but [they have been fun at
times](https://twitter.com/eisamahyari/status/1116452768372232192), too.

## Support for pipe operators

I have not touched this package much in recent years until [Alastair Rushworth
tweeted about it](https://twitter.com/icymi_r/status/1371443591613194243) on Mar
15th this year, under which Philéas Condemine mentioned that it did not support
pipes. I had been aware of [this
issue](https://github.com/yihui/formatR/issues/54) for years, but was not
motivated to work on it, partly because I thought it was a hard problem and
partly because I rarely use pipes myself. However, this time I thought for a few
more minutes, and came up with yet another dirty hack, which finally solved this
problem. Now I'm happy to say that both magrittr and R's native pipes (e.g.,
`%>%` and `|>`) are supported in **formatR**.

You can play with the [demo Shiny app](https://yihui.shinyapps.io/formatR/)
below (click the demo button to use demo code):

[![A Shiny app to reformat R code with
formatR](https://db.yihui.org/imgur/lUgtEAb.png)](https://yihui.shinyapps.io/formatR/)

## Set the maximum line width

I have been long embarrassed by the `width.cutoff` argument of
`formatR::tidy_source()`, because it essentially sets the *minimum* width,
instead of the often desired *maximum* width. When I write a book, I definitely
want to control the maximum line width of code, so the code will not exceed the
page margin. In **formatR** 1.9, I used a binary search to try to set the
maximum width, which was initially [contributed by Pavel N.
Krivitsky](https://github.com/yihui/formatR/pull/71) in 2017. Now if you want
the width to be the maximum width, you put the number in `I()` and pass it to
the `width.cutoff` argument, e.g.,

``` r
formatR::tidy_source(..., width.cutoff = I(60))
```

Please note that the maximum width cannot always be respected, i.e., the binary
search will not always succeed. It depends on whether the code can be broken
into relatively small pieces, so the lines can be wrapped more freely. When
there is a super long element that cannot be broken in the code, such as a long
variable name or a character string, setting the maximum width is likely to
fail.

## Start function arguments on a new line

Another feature that I have also desired for by myself is to reorganize the
arguments of a function call, when the function name is lengthy, e.g.,

``` r
shiny::updateSelectizeInput(session, "foo", label = "New Label", selected = c("A",
  "B"), choices = LETTERS, server = TRUE)
```

I hope it could be reformatted to:

``` r
shiny::updateSelectizeInput(
  session, "foo", label = "New Label", selected = c("A", "B"),
  choices = LETTERS, server = TRUE
)
```

This has become possible with the argument `args.newline = TRUE` of
`formatR::tidy_source()` in v1.11.

Above is a style that I personally prefer because it could fit more arguments on
one line, after the lengthy function name is separated from its arguments. I
know that perhaps [more people](https://github.com/yihui/formatR/issues/57) love
the style below more:

``` r
shiny::updateSelectizeInput(session, "foo", label = "New Label",
                            selected = c("A", "B"),
                            choices = LETTERS, server = TRUE)
```

Or strictly one argument per line:

``` r
shiny::updateSelectizeInput(session, "foo",
                            label = "New Label",
                            selected = c("A", "B"),
                            choices = LETTERS,
                            server = TRUE)
```

This should not be too hard to implement, but I do not have time now, so I will
not consider it until perhaps a couple of years later, unless another hacker
wants to tackle this problem and send a pull request [on
Github](https://github.com/yihui/formatR/). Alternatively, you can also use the
[**styler** package](https://cran.r-project.org/package=styler), which has
already supported this style of argument alignment.

## Wrap comments with a more accurate width

In **formatR** v1.10, [Siqi Zhang contributed a pull
request](https://github.com/yihui/formatR/pull/92) that fixed a pet peeve of
mine. That is, when re-wrapping blocks of comments with
`formatR::tidy_source(wrap = TRUE)`, previous versions of **formatR** were not
accurate in terms of the width of comment lines, because they did not consider
the width of the possible indentation or comment characters. For example,

``` r
if (TRUE) {
    # this is a long long long long long long long long long long comment
}
      #---------#---------#---------#---------#---------|---------#------
#---------#---------#---------#---------#---------|---------#---------#--
```

When we re-wrap the comment inside the `if` statement with a desired width 50,
previous versions of **formatR** would wrap it as:

``` r
if (TRUE) {
    # this is a long long long long long long long long
    # long long comment
}
```

That is because the width of the four spaces (indentation) and `#` are not
considered. After considering these six characters, the actual width we should
use will be 50 - 6 = 44, which is what **formatR** does since v1.10:

``` r
if (TRUE) {
    # this is a long long long long long long long
    # long long long comment
}
```

## The right arrow `->`

Previously, the right arrow `->`, a lesser known assignment operator in R, would
be reformatted as the left arrow `<-` (e.g., `1 -> x` would be reformatted as
`x <- 1`). Now the right arrow is preserved. Perhaps I should not have mentioned
this, since the R community has had enough headache about all kinds of
assignment operators.

## Final words

This package has been more like a personal hobby project in the past 11 years. I
do not have high expectations about it, so I will continue to keep it simple in
the future. To me, its main usage is to reformat code in my books (to control
the line width). As mentioned before, if you have sophisticated requirements for
styling code that are not [covered by **formatR**](/formatr/), you may consider
using other packages like **styler**.

