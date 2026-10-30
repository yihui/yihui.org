---
title: An Introduction to xfun
subtitle: A Collection of Miscellaneous Functions
author: "Yihui Xie"
date: "2026-10-29"
slug: xfun
githubEditURL: https://github.com/yihui/xfun/edit/main/vignettes/xfun.Rmd
output:
  html:
    meta:
      css: ["@default", "@article"]
      js: ["@sidenotes", "@toc-highlight"]
    options:
      toc: true
      number_sections: true
knit: litedown:::knit
---

<!--
%\VignetteIndexEntry{An Introduction to xfun}
%\VignetteEngine{litedown::vignette}
-->



After writing about 20 R packages, I found I had accumulated several utility functions that I used across different packages. This package extracts them so they can be used openly instead of buried as internal helpers. This vignette covers a curated subset; for a full list see `help(package = 'xfun')` or <https://github.com/yihui/xfun>.

## Strict lists: disable partial matching

R's `$` operator uses partial matching on lists, which can silently return the wrong element. `strict_list()` and `as_strict_list()` disable this:

``` r
z = strict_list(aaa = "I am aaa", b = 1:5)
z$a    # NULL — no partial match
```

```
#> NULL
```

``` r
z$aaa  # correct element
```

```
#> [1] "I am aaa"
```

``` r
z2 = unclass(z)  # ordinary list
z2$a   # "I am aaa" — partial match fires!
```

```
#> [1] "I am aaa"
```

``` r
z3 = as_strict_list(z2)
z3$a   # NULL again
```

```
#> NULL
```

The same surprise can happen with `attr()`. `attr2()` is an alias for `attr(exact = TRUE)`:

``` r
x = structure(list(), foobar = 42)
base::attr(x, "foo")  # 42 — partial match
```

```
#> [1] 42
```

``` r
attr2(x, "foo")       # NULL
```

```
#> NULL
```

``` r
attr2(x, "foobar")    # 42
```

```
#> [1] 42
```

## Human-readable output

### Print a character vector as-is

`raw_string()` suppresses indices, quotes, and escape sequences so you see the actual content:

``` r
x = c("line one", "say \"hello\"", "tab\there")
x            # with indices and escapes
```

```
#> [1] "line one"      "say \"hello\"" "tab\there"    
```

``` r
raw_string(x)  # what the strings actually contain
```

```
line one
say "hello"
tab	here
```

### Read a text file into the console

`file_string()` reads a file and returns a single string, printing it cleanly as a side effect:

``` r
f = system.file("LICENSE", package = "xfun")
file_string(f)
```

```
YEAR: 2018-2026
COPYRIGHT HOLDER: Yihui Xie
```

### A better `str()` for nested objects

`tree()` draws a tree diagram from `str()` output, replacing `..` depth markers with vertical pipes so parent–child relationships are clearer:

``` r
fit = lm(dist ~ speed, data = cars)
tree(fit)
```

```
List of 12
 |-coefficients : Named num [1:2] -17.58 3.93
 |  - attr(*, "names")= chr [1:2] "(Intercept)" "speed"
 |-residuals    : Named num [1:50] 3.85 11.85 -5.95 12.05 2.12 ...
 |  - attr(*, "names")= chr [1:50] "1" "2" "3" "4" ...
 |-effects      : Named num [1:50] -303.914 145.552 -8.115 9.885 0.194 ...
 |  - attr(*, "names")= chr [1:50] "(Intercept)" "speed" "" "" ...
 |-rank         : int 2
 |-fitted.values: Named num [1:50] -1.85 -1.85 9.95 9.95 13.88 ...
 |  - attr(*, "names")= chr [1:50] "1" "2" "3" "4" ...
 |-assign       : int [1:2] 0 1
 |-qr           :List of 5
 |  |-qr   : num [1:50, 1:2] -7.071 0.141 0.141 0.141 0.141 ...
 |  |  - attr(*, "dimnames")=List of 2
 |  |     |-: chr [1:50] "1" "2" "3" "4" ...
 |  |     |-: chr [1:2] "(Intercept)" "speed"
 |  |  - attr(*, "assign")= int [1:2] 0 1
 |  |-qraux: num [1:2] 1.14 1.27
 |  |-pivot: int [1:2] 1 2
 |  |-tol  : num 1e-07
 |  |-rank : int 2
 |  - attr(*, "class")= chr "qr"
 |-df.residual  : int 48
 |-xlevels      : Named list()
 |-call         : language lm(formula = dist ~ speed, data = cars)
 |-terms        :Classes 'terms', 'formula'  language dist ~ speed
 |     - attr(*, "variables")= language list(dist, speed)
 |     - attr(*, "factors")= int [1:2, 1] 0 1
 |        - attr(*, "dimnames")=List of 2
 |           |-: chr [1:2] "dist" "speed"
 |           |-: chr "speed"
 |     - attr(*, "term.labels")= chr "speed"
 |     - attr(*, "order")= int 1
 |     - attr(*, "intercept")= int 1
 |     - attr(*, "response")= int 1
 |     - attr(*, ".Environment")=<environment: R_GlobalEnv> 
 |     - attr(*, "predvars")= language list(dist, speed)
 |     - attr(*, "dataClasses")= Named chr [1:2] "numeric" "numeric"
 |        - attr(*, "names")= chr [1:2] "dist" "speed"
 |-model        :'data.frame':	50 obs. of  2 variables:
    |-dist : num [1:50] 2 10 4 22 16 10 18 26 34 17 ...
    |-speed: num [1:50] 4 4 7 7 8 9 10 10 10 11 ...
    - attr(*, "terms")=Classes 'terms', 'formula'  language dist ~ speed
          - attr(*, "variables")= language list(dist, speed)
          - attr(*, "factors")= int [1:2, 1] 0 1
             - attr(*, "dimnames")=List of 2
                |-: chr [1:2] "dist" "speed"
                |-: chr "speed"
          - attr(*, "term.labels")= chr "speed"
          - attr(*, "order")= int 1
          - attr(*, "intercept")= int 1
          - attr(*, "response")= int 1
          - attr(*, ".Environment")=<environment: R_GlobalEnv> 
          - attr(*, "predvars")= language list(dist, speed)
          - attr(*, "dataClasses")= Named chr [1:2] "numeric" "numeric"
             - attr(*, "names")= chr [1:2] "dist" "speed"
 - attr(*, "class")= chr "lm"
```

`tabset()` renders a list as interactive Markdown tabsets (requires **litedown**'s tabset support). Each list member becomes a tab; nested lists become nested tabsets. By default each tab shows `str()` output, but you can pass any function:

```r
tabset(iris)                # one tab per column
tabset(iris, print)         # print() instead of str()
tabset(iris, function(x) {
  if (is.factor(x)) tab_content(join_words(levels(x), before = "`"))
  else print(summary(x))
})
```

### Format byte sizes

`format_bytes()` converts raw byte counts to human-readable strings:

``` r
format_bytes(c(500, 2048, 1.5e6, 3e9))
```

```
#> [1] "500 bytes" "2 Kb"      "1.4 Mb"    "2.8 Gb"   
```

## String utilities

### Filter and transform in one step

`grep_sub()` combines `grep(..., value = TRUE)` and `gsub()`. It extracts matching elements and transforms them:

``` r
grep_sub('(\\w+)@(\\w+)', '\\2/\\1', c('alice@corp', 'bob@org', 'not-an-email'))
```

```
#> [1] "corp/alice" "org/bob"   
```

### Test for blank strings

`is_blank()` returns `TRUE` for empty strings and strings that contain only whitespace:

``` r
is_blank(c("", "   ", "\t\n", "hello"))
```

```
#> [1]  TRUE  TRUE  TRUE FALSE
```

### Combine words into a natural-language list

`join_words()` builds a phrase from a character vector, adding a conjunction before the last word:

``` r
join_words(c("apples", "oranges", "pears"))
```

```
apples, oranges, and pears
```

``` r
join_words(c("R", "Python", "Julia"), and = "or")
```

```
R, Python, orJulia
```

``` r
join_words(c("one", "two", "three"), before = "'", after = "'")
```

```
'one', 'two', and 'three'
```

### Generate HTML-safe ID strings

`alnum_id()` replaces non-alphanumeric characters with dashes (and strips HTML tags), which is handy for generating element IDs from arbitrary text:

``` r
alnum_id(c("Hello world 123!", "a  &b*^c"))
```

```
#> [1] "hello-world-123" "a-b-c"          
```

``` r
alnum_id("<h1>Section <em>1.2</em></h1>")
```

```
#> [1] "section-1-2"
```

### Validate R syntax

`valid_syntax()` checks whether code can be parsed without running it:

``` r
valid_syntax("1 + 1")
```

```
#> [1] TRUE
```

``` r
valid_syntax("1 +")       # incomplete
```

```
#> [1] FALSE
```

``` r
valid_syntax("if(T) {1 + 1")  # unclosed brace
```

```
#> [1] FALSE
```

### Split source into complete expressions

`split_source()` parses a character vector of R code line by line and groups lines into complete expressions:

``` r
code = c("# comment", "if (TRUE) {", "  1 + 1", "}", "print('done')")
split_source(code)
```

```
#> [[1]]
#> [1] "# comment"
#> 
#> [[2]]
#> [1] "if (TRUE) {" "  1 + 1"     "}"          
#> 
#> [[3]]
#> [1] "print('done')"
#> 
```

``` r
split_source(code, merge_comments = TRUE)
```

```
#> [[1]]
#> [1] "# comment"   "if (TRUE) {" "  1 + 1"     "}"          
#> 
#> [[2]]
#> [1] "print('done')"
#> 
```

### Convert numbers to English words

`n2w()` (alias `numbers_to_words()`) is useful for writing reports where you want to spell out numbers:

``` r
n2w(c(0, 1, 13, 42, 100, 1001), cap = TRUE)
```

```
#> [1] "Zero"              "One"               "Thirteen"         
#> [4] "Forty-two"         "One hundred"       "One thousand, one"
```

``` r
n2w(1e6 + 234567, and = TRUE)
```

```
#> [1] "one million, two hundred and thirty-four thousand, five hundred and sixty-seven"
```

``` r
n2w(-987654321)
```

```
#> [1] "minus nine hundred eighty-seven million, six hundred fifty-four thousand, three hundred twenty-one"
```

## HTML helpers

### Build HTML tags programmatically

`html_tag()` constructs an HTML tag with attributes and content. Content is escaped by default; wrap it in `html_value()` to mark it as already-valid HTML:

``` r
html_tag("a", "R Project", href = "https://www.r-project.org", target = "_blank")
```

``` {.html .plain}
<a href="https://www.r-project.org" target="_blank">R Project</a>
```

``` r
html_tag("br")
```

``` {.html .plain}
<br />
```

``` r
html_tag("p", list("Visit ", html_tag("a", "CRAN", href = "https://cran.r-project.org")))
```

``` {.html .plain}
<p>Visit 
<a href="https://cran.r-project.org">CRAN</a></p>
```

### Escape special characters for HTML

`html_escape()` replaces `&`, `<`, `>` (and optionally `"`, `\r`, `\n` for attributes):

``` r
html_escape('2 < 3 & "quotes"')
```

```
#> [1] "2 &lt; 3 &amp; \"quotes\""
```

``` r
html_escape('attr="val"', attr = TRUE)
```

```
#> [1] "attr=&quot;val&quot;"
```

### Strip HTML tags

`strip_html()` removes tags and comments from text:

``` r
strip_html('<p>Hello <strong>world</strong><!-- comment -->!</p>')
```

```
#> [1] "Hello world!"
```

## File I/O

### Read and write UTF-8 files

`read_utf8()` and `write_utf8()` enforce UTF-8 encoding and warn when files contain invalid bytes. They are thin wrappers around `readLines()` / `writeLines()` that set the encoding correctly:

``` r
f = tempfile()
write_utf8(c("héllo", "wörld"), f)
read_utf8(f)
```

```
#> [1] "héllo" "wörld"
```

### Append unique lines

`append_unique()` adds lines to a file only if they are not already present:

``` r
f = tempfile()
write_utf8("apple", f)
append_unique(c("apple", "banana", "cherry"), f)
read_utf8(f)
```

```
#> [1] "apple"  "banana" "cherry"
```

### Concatenate multiple files

`read_all()` reads a list of files and combines their content, optionally adding a header or footer around each file's content:

``` r
scripts = system.file("scripts", c("call-fun.R", "child-pids.sh"), package = "xfun")
read_all(scripts, before = function(f) paste("##", f), after = "")
```

```
## /home/xieyih/R/xfun/scripts/call-fun.R
# This script is executed via the command line `Rscript call-fun.R arg1 arg2
# arg3`, where arg1 is a path to an .rds file, which contains the function and
# its arguments saved as a list; arg2 is a path to an .rds file to which the
# returned value of the function call is saved; arg3 saves the error message.

local({
  if (length(a <- commandArgs(TRUE)) != 3)
    stop('The number of arguments passed to Rscript should be 3.')
  # save the error message on exit if an error occurred
  on.exit(if (!file.exists(a[2])) saveRDS(geterrmessage(), a[3]))
  x = readRDS(a[1])  # list(fun, args)
  f = x[[1]]
  if (is.character(f)) f = eval(parse(text = f), envir = globalenv())
  r = do.call(f, x[[2]], envir = globalenv())
  saveRDS(r, a[2])
})

## /home/xieyih/R/xfun/scripts/child-pids.sh
# given a PID, output all its child PIDs recursively
list_children() {
  for j in $(pgrep -P $1); do
    echo $j
    echo $(list_children $j)
  done
}

for i in $@; do
  list_children $i
done

```

## Search and replace in files

### Replace text in a single file

`gsub_file()` performs an in-place `gsub()` on a file. All other `gsub_*` functions are built on top of it.

``` r
f = tempfile()
write_utf8(c("color", "favourite", "grey"), f)
gsub_file(f, "colour|grey", c(colour = "color", grey = "gray"))
```

``` {.plain .warning}
#> argument 'replacement' has length > 1 and only the first element will be used
```

``` r
read_utf8(f)
```

```
#> [1] "color"     "favourite" "color"    
```

**Warning:** these functions modify files in place. Back up or use version control first.

### Replace across multiple files

`gsub_dir()` applies a substitution to every file in a directory. Narrow the scope with `ext` (file extensions) or `mimetype` (a regex on MIME types):

```r
# change "rmarkdown" to "litedown" in all .Rmd files
gsub_dir("rmarkdown", "litedown", ext = "Rmd")

# only in text files
gsub_dir("foo", "bar", mimetype = "^text/")
```

### Transform file content with an arbitrary function

`process_file()` reads a file, passes the lines through a function, and writes the result back:

``` r
f = tempfile()
write_utf8(c("a", "b", "c"), f)
process_file(f, rev)  # reverse the order of lines
read_utf8(f)
```

```
#> [1] "c" "b" "a"
```

## File paths and extensions

### Dissect and reassemble file paths

`file_ext()`, `sans_ext()`, and `with_ext()` manipulate the extension part of a path. They handle double extensions like `.tar.gz` and `.nb.html` that `tools::file_ext()` splits differently:

``` r
p = c("report.Rmd", "archive.tar.gz", "notes.nb.html", "script.R")
file_ext(p)
```

```
#> [1] "Rmd"     "tar.gz"  "nb.html" "R"      
```

``` r
sans_ext(p)
```

```
#> [1] "report"  "archive" "notes"   "script" 
```

``` r
with_ext(p, ".html")
```

```
#> [1] "report.html"  "archive.html" "notes.html"   "script.html" 
```

``` r
with_ext(p, c(".pdf", ".zip", ".html", ".txt"))
```

```
#> [1] "report.pdf"  "archive.zip" "notes.html"  "script.txt" 
```

### Normalize and compare paths

`normalize_path()` is a wrapper around `normalizePath()` that uses `/` on all platforms and does not signal an error for non-existent paths by default. `same_path()` compares two paths after normalizing both:

``` r
normalize_path("~")
```

```
#> [1] "/home/xieyih"
```

``` r
same_path("~/foo", file.path(Sys.getenv("HOME"), "foo"))
```

```
#> [1] TRUE
```

### Find files relative to the project root

`from_root()` returns a path relative to the project root (detected by `proj_root()`), which is useful in documents that live in a subdirectory:

```r
# in docs/report.Rmd, this returns ../data/cars.csv
from_root("data", "cars.csv")
```

`magic_path()` finds a file by basename anywhere under the project, so you can move files without breaking references:

```r
# finds data/raw/survey.csv wherever it lives
magic_path("survey.csv")
```

## Base64 encoding

`base64_encode()` and `base64_decode()` convert between raw bytes and base64 strings. `base64_uri()` produces a data URI that embeds a file directly in HTML — the mechanism behind `xfun::embed_file()`:

``` r
raw_bytes = charToRaw("Hello, xfun!")
(b64 = base64_encode(raw_bytes))
```

```
#> [1] "SGVsbG8sIHhmdW4h"
```

``` r
rawToChar(base64_decode(b64))
```

```
#> [1] "Hello, xfun!"
```

``` r
# data URI for a small file
f = system.file("LICENSE", package = "xfun")
substr(base64_uri(f), 1, 60)
```

```
#> [1] "data:text/plain;base64,WUVBUjogMjAxOC0yMDI2CkNPUFlSSUdIVCBIT"
```

## JSON serialization

`tojson()` converts R objects to JSON (or JavaScript). It handles `NULL`/`NA`, named lists as objects, unnamed lists as arrays, matrices by row, and data frames by column:

``` r
tojson(list(x = 1:3, y = c(TRUE, FALSE), z = NULL))
```

``` {.json .plain}
{
  "x": [1, 2, 3],
  "y": [true, false],
  "z": null
}
```

``` r
tojson(head(iris, 3))    # named data frame → columns
```

``` {.json .plain}
{
  "Sepal.Length": [5.1, 4.9, 4.7],
  "Sepal.Width": [3.5, 3, 3.2],
  "Petal.Length": [1.4, 1.4, 1.3],
  "Petal.Width": [0.2, 0.2, 0.2],
  "Species": ["setosa", "setosa", "setosa"]
}
```

``` r
tojson(matrix(1:6, 2))  # matrix → rows
```

``` {.json .plain}
[
  [1, 3, 5],
  [2, 4, 6]
]
```

Wrap a string in `js()` to embed it as raw JavaScript without quoting:

``` r
tojson(list(n = 42, callback = js("function(x) { return x * 2; }")))
```

``` {.json .plain}
{
  "n": 42,
  "callback": function(x) { return x * 2; }
}
```

For pure static JSON (valid for `JSON.parse()`), use `mode = "json"`. Dates become strings, `Inf` becomes `null`:

``` r
tojson(list(d = Sys.Date(), x = c(1, Inf, -Inf)), mode = "json")
```

``` {.json .plain}
{
  "d": "2026-10-29",
  "x": [1, null, null]
}
```

When many values repeat, `dict` dictionary-encodes a vector as an index + unique-values pair, which can be substantially shorter:

``` r
x = rep(c("apple", "banana", "cherry"), 100)
nchar(tojson(x, pretty = FALSE))          # without dict encoding
```

```
#> [1] 2601
```

``` r
nchar(tojson(x, dict = 1, pretty = FALSE))  # with dict encoding
```

```
#> [1] 642
```

## Caching expressions

`cache_exec()` caches the result of an expression on disk. It automatically detects which global variables the expression uses and invalidates the cache when any of them change. Re-running the same expression loads the cache instead of recomputing:

``` r
path = tempfile()
x = 42
result = cache_exec(
  { Sys.sleep(0); x^2 },
  path = path, id = "square"
)
result  # 1764
```

```
#> [1] 1764
```

``` r
# change x — cache is invalidated
x = 10
result = cache_exec(
  { Sys.sleep(0); x^2 },
  path = path, id = "square"
)
result  # 100
```

```
#> [1] 100
```

Pass `extra = file.mtime("data.csv")` to also invalidate when an external file changes.

## Recording R output

`record()` runs a character vector of R code and captures all output types — text, plots, messages, warnings, and errors — into a structured list:

``` r
code = c(
  "1 + 1",
  "message('hello from record()')",
  "warning('a warning')",
  "head(mtcars, 2)"
)
res = record(code, dev.path = FALSE, error = TRUE)
tree(res)
```

```
List of 8
 |-: 'record_source' chr "1 + 1"
 |  - attr(*, "lines")= int [1:2] 1 1
 |-: 'record_output' chr "[1] 2"
 |-: 'record_source' chr "message('hello from record()')"
 |  - attr(*, "lines")= int [1:2] 2 2
 |-: 'record_message' chr "hello from record()\n"
 |-: 'record_source' chr "warning('a warning')"
 |  - attr(*, "lines")= int [1:2] 3 3
 |-: 'record_warning' chr "a warning"
 |-: 'record_source' chr "head(mtcars, 2)"
 |  - attr(*, "lines")= int [1:2] 4 4
 |-: 'record_asis' chr [1:5] "| |mpg|cyl|disp|hp|drat|wt|qsec|vs|am|gear|carb|" "|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|" "|Mazda RX4|21|6|160|110|3.9|2.620|16.46|0|1|4|4|" "|Mazda RX4 Wag|21|6|160|110|3.9|2.875|17.02|0|1|4|4|" ...
 - attr(*, "class")= chr "xfun_record_results"
```

Each element carries a class like `record_source`, `record_output`, `record_message`, or `record_warning`. This is the engine behind **litedown**'s code chunk execution.

## Package utilities

### Attach multiple packages at once

`pkg_attach()` is a vectorized `library()`, and `pkg_attach2()` installs missing packages first:

``` r
pkg_attach("stats", "utils")  # equivalent to two library() calls
```

```r
pkg_attach2("ggplot2", "dplyr")  # installs any that are missing, then attaches
```

### Test whether a package is loadable

`loadable()` is a concise alternative to `requireNamespace(quietly = TRUE)`:

``` r
loadable("stats")
loadable("nonexistent.package.xyz")
```

## Environment variables and options

### Options that fall back to environment variables

`env_option()` checks `options()` first, then looks for an environment variable named `R_<NAME>` (uppercased, dots to underscores). This lets package authors support both `.Rprofile` and `.Renviron` configuration:

``` r
Sys.setenv(R_XFUN_TEST_OPTION = "from-env")
env_option("xfun.test.option")       # "from-env"
```

```
#> [1] "from-env"
```

``` r
options(xfun.test.option = TRUE)
env_option("xfun.test.option")       # TRUE (options() wins)
```

```
#> [1] TRUE
```

``` r
options(xfun.test.option = NULL)     # reset
env_option("xfun.test.option")       # "from-env" again
```

```
#> [1] "from-env"
```

``` r
Sys.unsetenv("R_XFUN_TEST_OPTION")
```

### Temporarily set environment variables

`set_envvar()` sets variables and returns their previous values so you can restore them:

``` r
old = set_envvar(c(MY_TOKEN = "secret"))
Sys.getenv("MY_TOKEN")
```

```
#> [1] "secret"
```

``` r
set_envvar(old)  # restore
Sys.getenv("MY_TOKEN")
```

```
#> [1] ""
```

### Run code in a different directory

`in_dir()` temporarily changes the working directory, then restores it:

``` r
in_dir(tempdir(), {
  writeLines("hello", "tmp.txt")
  file.exists("tmp.txt")
})
```

```
#> [1] TRUE
```

``` r
file.exists(file.path(tempdir(), "tmp.txt"))
```

```
#> [1] TRUE
```

## OS detection

The `is_*()` family detects the current operating system:

``` r
is_windows()
```

```
#> [1] FALSE
```

``` r
is_macos()
```

```
#> [1] FALSE
```

``` r
is_linux()
```

```
#> [1] TRUE
```

``` r
is_unix()   # TRUE on macOS and Linux
```

```
#> [1] TRUE
```

``` r
is_arm64()  # TRUE on Apple silicon
```

```
#> [1] FALSE
```

## Error handling

### Check whether an expression throws an error

`try_error()` returns `TRUE`/`FALSE` without stopping execution — cleaner than wrapping code in `tryCatch()`:

``` r
try_error(log(1))
```

```
#> [1] FALSE
```

``` r
try_error(log("a"))
```

```
#> [1] TRUE
```

`try_silent()` behaves like `try(silent = TRUE)`:

``` r
z = try_silent(sqrt("x"))
inherits(z, "try-error")
```

```
#> [1] TRUE
```

### Retry a failing operation

`retry()` calls a function repeatedly until it succeeds or the attempt limit is reached, pausing between tries. Useful for flaky network operations:

```r
# retry a download up to 3 times, waiting 5 seconds between attempts
retry(download.file, url = "https://example.com/data.csv", destfile = "data.csv")
```

## Check reverse dependencies

`rev_check()` automates running `R CMD check` on the reverse dependencies of a package. The main pain in package development is discovering whether a new version breaks downstream packages; this function handles downloading, parallel checking, and diffing results against the current CRAN version so new failures stand out:

```r
# check all reverse dependencies of knitr, using 4 cores
rev_check("knitr", src = "path/to/knitr_source", n = 4)
```

After the run, `compare_Rcheck()` produces a Markdown diff showing only the packages whose check status changed, so you can focus on regressions rather than pre-existing failures.

## Type characters into RStudio

`rstudio_type()` feeds characters into the RStudio source editor as if typed by a human — useful for live demos and screencasts where you want code to appear gradually rather than pasting it all at once:

```r
rstudio_type("1 + 1\n", pause = function() 0.05)
```

The `mistake` argument introduces random typos (which are immediately corrected) for a more realistic typing effect.

## Session information

### Compact session info

`session_info()` trims `sessionInfo()` output — no base-package noise, no matrix/BLAS details — and accepts a package list for a focused summary:

``` r
session_info(c("xfun", "litedown"), dependencies = FALSE)
```

```
R version 4.6.1 (2026-06-24)
Platform: x86_64-pc-linux-gnu
Running under: Red Hat Enterprise Linux 9.8 (Plow)

Locale:
  LC_CTYPE=en_US.UTF-8       LC_NUMERIC=C              
  LC_TIME=en_US.UTF-8        LC_COLLATE=en_US.UTF-8    
  LC_MONETARY=en_US.UTF-8    LC_MESSAGES=en_US.UTF-8   
  LC_PAPER=en_US.UTF-8       LC_NAME=C                 
  LC_ADDRESS=C               LC_TELEPHONE=C            
  LC_MEASUREMENT=en_US.UTF-8 LC_IDENTIFICATION=C       

Package version:
  litedown_0.11.20 xfun_0.62.5     
```

### Run a task only once per session

`do_once()` executes a task the first time it is called and skips it on subsequent calls in the same R session. Useful for showing a deprecation notice or one-time setup:

``` r
for (i in 1:3) {
  do_once(message("This prints once."), "my-one-time-task")
}
```

``` {.plain .message}
#> This prints once.
#> You will not see this message again in this R session. If you never want to see this message, you may set options(my-one-time-task = FALSE) in your .Rprofile.
```
