---
title: More Capable Cache in knitr
date: '2026-09-21'
slug: knitr-cache
---

Note

:   This is one of a few posts on new features from a recent [four-day knitr
    triage sprint](/en/2026/09/knitr-backlog/); see that post for the full
    details of the sprint.

**knitr**'s chunk cache is one of those features that may have quietly saved you
hours. Set `cache = TRUE` on an expensive chunk and its results are stored on
disk; next time you knit, if the code hasn't changed, the stored results are
reused instead of recomputed. Simple idea, and hard to be done well. Two changes
this cycle make the cache both more robust and more flexible.

## Caching objects that don't serialize

Some R objects are just pointers to memory managed by C or C++ code. A **terra**
raster is the classic example: save it with the default machinery, load it back,
and you get a dangling pointer that segfaults or returns garbage. For years the
answer was "don't cache those chunks."

Now there's a proper escape hatch: a new S3 generic `process_cache()`. **knitr**
calls it on every object before writing to the cache (with `pack = TRUE`) and
again after reading back (with `pack = FALSE`). Register a method for your class
and the object gets converted to something serializable on the way out, and
restored on the way in. For **terra**, that's `wrap()` / `unwrap()`:

``` r
registerS3method(
  "process_cache", "SpatRaster",
  function(x, pack = TRUE, ...) if (pack) terra::wrap(x) else x,
  envir = asNamespace("knitr")
)
registerS3method(
  "process_cache", "PackedSpatRaster",
  function(x, pack = TRUE, ...) if (pack) x else terra::unwrap(x),
  envir = asNamespace("knitr")
)
```

The nice part: package authors can register these in their own `.onLoad()`, so
their users get cacheable objects for free and never have to think about it
([#2340](https://github.com/yihui/knitr/issues/2340)).

Alongside this, the cache storage format changed under the hood: it now uses
`xfun::lazy_save()` / `xfun::lazy_load()` (plain `.rds` files) instead of the
non-public API `tools:::makeLazyLoadDB()`. Old caches in the previous
`.rdb`/`.rdx` format are still read, so nothing breaks; new caches are simpler
files.

## Cached chunks can depend on uncached ones

`dependson` lets you tell **knitr** that one cached chunk depends on another, so
that changing the upstream chunk invalidates the downstream cache. But this used
to require the upstream chunk to *also* be cached. If it wasn't, you got a
warning and the dependency didn't work.

The reason was mechanical: invalidation worked by purging the caches of
dependent chunks, which is impossible if the dependency has no cache to key off
of. That's now solved differently---the *code* of every chunk a cached chunk
depends on (following the chain transitively) is folded into the cache key. So
editing an uncached upstream chunk changes the key and invalidates the cached
downstream chunk, exactly as you'd expect:

```` md
```{r prep}
# not worth caching—runs in a millisecond
x <- rnorm(100)
```

```{r model, cache=TRUE, dependson="prep"}
# expensive; re-runs whenever `prep` changes, even though prep isn't cached
big_model(x)
```
````

This also works with `autodep = TRUE`, where **knitr** figures out the
dependencies for you ([#1039](https://github.com/yihui/knitr/issues/1039)).
