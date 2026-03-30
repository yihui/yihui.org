---
title: "The Surprising Slowness of `textConnection()` in R"
date: '2026-03-29'
slug: slow-textconnection
---

Earlier this month, [\@idavydov](https://github.com/idavydov) filed [an
issue](https://github.com/quarto-dev/quarto-cli/issues/14156) against Quarto
reporting that it is about 100x slower than rmarkdown for documents with long
output. The minimal reprex was striking:

``` r
cat(strrep("x\n", 100000))
```

Running `quarto render` on a document with that single chunk took 35 seconds.
The equivalent `rmarkdown::render()` finished in under half a second. As a side
note in the issue, the reporter pinged me that the same problem existed in
**litedown**. **litedown** is independent of both Quarto and **knitr**; it
executes R code through `xfun::record()`. That is where I started looking.

## Profiling

I reproduced the issue in **litedown** and ran `utils::Rprof()` on
`xfun::record()`. The first result looked clear: `cat()` was consuming 88% of
runtime, with a call stack that went through `one_string → paste → cat`. My
initial diagnosis was that `xfun::record()` was collapsing the output lines into
a single string with `paste()` before writing, and the string concatenation was
slow.

That turned out to be the wrong diagnosis.

I re-profiled, this time passing `gc.profiling = TRUE` to also capture garbage
collection data. The new profile completely changed the picture: **56% of the
total runtime was GC**. Not `cat()`, not `paste()`---the garbage collector. GC
consuming more than half your runtime is not a sign of slow code per se; it is a
sign that something is creating an enormous number of short-lived objects that R
has to keep reclaiming. The question shifted from "why is `cat` slow?" to "what
is producing all this garbage?" What a relief to kittens! How sad garbage trucks
are!

## Finding the Cause

With GC as the real culprit, I examined `handle_output()` inside
`xfun::record()`---the function that captures chunk output via `sink()`---with
Claude's help. The answer was sitting right at the top:

``` r
con = textConnection('out', 'w', local = TRUE)
```

A writable `textConnection` appends one element per line to a character vector.
So for `cat(strrep("x\n", 100000))`, R is effectively doing this 100,000 times
in a tight loop:

``` r
out = c(out, new_line)
```

Because R vectors are copy-on-modify, each `c()` call allocates a brand-new
vector and copies all previous content into it before adding the new element.
The growth pattern looks like:

```         
NULL → [1 elem] → [2 elems] → [3 elems] → ... → [100,000 elems]
```

That is `$O(n^2)$` in both allocations and data copies, and every discarded
intermediate vector becomes garbage for R's collector to clean up. The initial
profile was not lying about `cat`---time really was being spent writing
output---but the GC profile told the deeper truth. Without
`gc.profiling = TRUE`, I would have chased the wrong thing.

## Why rmarkdown Was Fast

rmarkdown itself uses **knitr**, which in turn uses the **evaluate** package to
execute code. **evaluate** captures output by sinking into a `file()`
connection, which delegates buffering to the operating system's file I/O layer
and sidesteps the R-level vector-growing trap entirely. It never accumulates a
character vector one line at a time; it just writes bytes.

## The Fix

The fix is to replace `textConnection()` with `rawConnection()`. A raw
connection uses a dynamically-growing byte buffer internally---similar to
`realloc()` with doubling in C---so appending is amortized `$O(1)$` rather than
`$O(n^2)$`. The change in `xfun::record()` was [a few
lines](https://github.com/yihui/xfun/commit/11e7a1184d12fce69ee96c60dbed89d6fa61720b):

``` r
# before
out = NULL
con = textConnection('out', 'w', local = TRUE)
# ...
sink()
close(con)

# after
con = rawConnection(raw(0), 'w')
# ...
sink()
out = rawToChar(rawConnectionValue(con))
close(con)
out = strsplit(out, '\n', fixed = TRUE)[[1]]
```

Instead of reading `out` directly from the connection variable (which
`textConnection` writes into by name), we retrieve the buffer at the end with
`rawConnectionValue()`, convert it to a character string with `rawToChar()`, and
split on newlines ourselves.

Another alternative I considered was sinking into a `file('')` connection opened
in read/write mode, which would also avoid the quadratic growth. I went with
`rawConnection()` instead because I wanted a pure in-memory solution with no
involvement of the file system at all.

After the fix, the runtime (for `cat(strrep("x\n", 50000))` instead of `100000`)
dropped from 5.58 seconds to 1.30 seconds---a 4.3× speedup---with `cat` and GC
disappearing from the profile entirely.

## What I Took Away

I have used `textConnection()` in R for a very long time and never thought to
question it. It is documented, idiomatic, and used inside base R itself (see
`?capture.output`). For typical usage---capturing a few lines of output---it is
perfectly fine. The quadratic behavior only bites you when the output is large,
which is rare enough that it stayed hidden for years.

The lesson I keep relearning is that "idiomatic" and "efficient" are not the
same thing. When something feels slow in a way that is hard to explain
intuitively, profiling almost always surfaces something surprising. In this
case, it was a base R function that I had mentally filed under "fast and boring"
that turned out to have a hidden `$O(n^2)$` trap.
