---
title: 'Three Useful Functions in Base R: `regexec()`, `strrep()`, and `append()`'
date: '2023-10-11'
slug: three-functions
---

I just finished reviewing [a pull
request](https://github.com/yihui/knitr/pull/2294/files) in the **knitr** repo
that tries to improve the error message when it fails to parse YAML, and I feel
three base R functions are worth mentioning to more R users. I have been
inspired by Maëlle Salmon's [3
functions](https://masalmon.eu/2023/09/29/three-functions/) blog series, and
finally started writing one by myself.

## `regexec()`: get substrings with patterns

If you want to master string processing using regular expressions (regex) with
base R, the two help pages `?grep` and `?regexp` are pretty much all you need.
Although I had read them many times in the past, I did not discover `regexec()`
until about three years ago, while this function was first introduced in R
2.14.0 (2011-10-31).

This function gives you the positions of substring groups captured by your
regular expressions. It will be much easier to understand if you actually get
the substrings instead of their positions, which can be done via `regmatches()`,
another indispensable function when you work with functions like `regexec()` and
`regexpr()`. For example:

``` r
x = 'abbbbcdefg'
m = regexec('a(b+)', x)  # positions
regmatches(x, m)  # substrings
```

```         
[[1]]
[1] "abbbb" "bbbb"
```

The length of the returned value depends on how many `()` groups you have in the
regular expression. In the above example, the first value is the whole match
(`abbbb` is matched by `a(b+)`), and the second value is for the first group
`(b+)` (any number of consecutive `b`'s).

If you do not know `regexec()` or `regmatches()`, it is natural to do `substr()`
like the aforementioned pull request originally did:

``` r
message = e$message
regex = "line (?<line>\\d+), column (?<column>\\d+)"
regex_result = regexpr(regex, message, perl = TRUE)
starts = attr(regex_result, "capture.start")
lengths = attr(regex_result, "capture.length")
line_index = substr(message, starts[,"line"], starts[,"line"] + lengths[,"line"] - 1)
column_index = substr(message, starts[,"column"], starts[,"column"] + lengths[,"column"] - 1)
line_index = as.integer(line_index)
column_index = as.integer(column_index)
```

Its goal is to extract a line and column number from a string of the form
`"line x, column y"`. I rewrote the code (using my obnoxious
one-letter-variable-name style) as:

``` r
x = e$message
r = "line (?<row>\\d+), column (?<col>\\d+)"
m = regmatches(x, regexec(r, x, perl = TRUE))[[1]][-1]
row = as.integer(m['row'])
col = as.integer(m['col'])
```

Note that `(<?NAME>...)` means a *named* capture, so you could later extract the
substrings by names instead of numeric indices, e.g., `m['row']` instead of
`m[1]`. But this is not important. It is okay to use a numeric index.

BTW, if you are new to regular expressions and not sure if you should use
`perl = TRUE` or `FALSE` (often the default) in the regex family of functions,
I'd recommend `perl = TRUE`. Perl-compatible regular expressions (PCRE) should
cause you fewer surprises and are more powerful.

## `strrep()`: repeat a string for a number of times

How many times have you done this?

``` r
paste(rep('abc', 10), collapse = '')
```

I have done it for numerous times. Now, no more `rep()` or `paste()`. Use
`strrep()` instead:

``` r
strrep('abc', 10)
```

It is even vectorized like most other base R functions, e.g.,

``` r
strrep(c('abc', 'defg'), c(3, 4))
```

I do not want to pretend that I have always known everything---in fact, I did
not discover this function until about *two* years ago.

It is common to generate `N` spaces like the original pull request did:

``` r
spaces = paste(rep(" ", column_index), collapse = "")
cursor = paste(spaces, "^~~~~~", collapse = "")
```

And I rewrote it as:

``` r
cursor = paste0(strrep(" ", col), "^~~~~~")
```

## `append()`: insert elements to a vector

Maëlle has mentioned `append()` [in her post](https://masalmon.eu/2023/09/29/three-functions/). Interestingly, it could be used in
this pull request, too. Original code:

``` r
split_indexes = seq_along(meta) <= line_index
before_cursor = meta[split_indexes]
after_cursor = meta[!split_indexes]
error_message = c(
  "Failed to parse YAML: ", e$message, "\n",
  before_cursor,
  cursor,
  after_cursor
)
```

New code:

``` r
x = c("Failed to parse YAML: ", x, "\n", append(meta, cursor, row))
```

I remember when I first learned S-Plus in 2004, I was surprised to see a
classmate wrote a `t.test()` function by herself (which was actually cool) and
she was equally surprised when I told her that there was a built-in `t.test()`
function. I think similar things still happen today. If you are not aware of
`regexec()`, `strrep()`, or `append()`, it is easy and tempting to reinvent
them, which can make your code lengthy and complicated.
