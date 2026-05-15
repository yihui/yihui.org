---
title: Converting testthat Tests to testit
subtitle: A 13-year-old zero-dependency testing framework for R that just reached v1.0
date: '2026-05-15'
slug: testthat-to-testit
---

Back in 2013, I [wrote about testing R
packages](/en/2013/09/testing-r-packages/) when I first released **testit**.
Thirteen years later, I still believe that unit testing should be nothing more
than "tell me if something unexpected happened." Recently I converted a large
**testthat** test suite to **testit**, and I thought I'd share a practical guide
for anyone considering the same move.

## Migration guide

### The file structure

| **testthat**                 | **testit**                               |
|------------------------------|------------------------------------------|
| `tests/testthat.R`           | `tests/*.R` (any name, e.g., `testit.R`) |
| `tests/testthat/test-*.R`    | `tests/testit/test-*.R`                  |
| `tests/testthat/helper-*.R`  | `tests/testit/helper*.R`                 |
| `tests/testthat/_snaps/*.md` | `tests/testit/test-*.md`                 |

R runs all `.R` scripts in `tests/` during `R CMD check`. The filename does not
matter---`tests/testthat.R` is merely a convention that **testthat**'s tooling
creates. **testit** likewise does not require any specific filename. For
example:

``` r
# tests/testit.R
library(testit)
test_pkg("pkgname")
```

You can also split tests into multiple runners, each calling `test_pkg()` with a
different directory:

``` r
# tests to run unconditionally under the `core/` dir
library(testit)
test_pkg("pkgname", dir = "core")

# tests under `slow/`; only run when not on CRAN
if (identical(tolower(Sys.getenv("NOT_CRAN")), "true")) {
  test_pkg("pkgname", dir = "slow")
}

# tests under `ci/`; only run when on CI
if (identical(tolower(Sys.getenv("CI")), "true")) {
  test_pkg("pkgname", dir = "ci")
}
```

This provides a natural way to conditionally skip entire groups of tests (the
**testit** equivalent of `skip_*()` like `skip_on_cran()`)---simply guard the
`test_pkg()` call with a condition.

### The core pattern

**testthat**:

``` r
test_that("description", {
  expect_true(condition)
  expect_equal(a, b)
})
```

**testit**:

``` r
assert("description", {
  (condition)
  (a == b)
})
```

Any expression wrapped in `()` inside `assert()` is checked---if it evaluates to
`TRUE` (or a vector of all `TRUE`s), it passes; anything else is a failure. The
expression can be any R code: `(x > 0)`, `(is.data.frame(df))`,
`(nrow(x) == 10)`, etc. For approximate numeric comparison, you may use
`(all.equal(a, b))`---it returns `TRUE` on success or a descriptive string on
failure, both of which **testit** handles correctly. In case of testing exact
identity, you may use `identical()` or the `%==%` operator in **testit** (see
later).

### Assertion mappings

Here is a cheat sheet for translating `expect_*` calls:

| **testthat** | **testit** |
|----|----|
| `expect_true(x)` | `(x)` |
| `expect_false(x)` | `(!x)` |
| `expect_equal(a, b)` | `(all.equal(a, b))` |
| `expect_equal(a, b, tolerance = t)` | `(all.equal(a, b, tolerance = t))` |
| `expect_identical(a, b)` | `(identical(a, b))` |
| `expect_null(x)` | `(is.null(x))` |
| `expect_length(x, n)` | `(length(x) == n)` |
| `expect_s3_class(x, "cls")` | `(inherits(x, "cls"))` |
| `expect_gt(a, b)` | `(a > b)` |
| `expect_gte(a, b)` | `(a >= b)` |
| `expect_lt(a, b)` | `(a < b)` |
| `expect_lte(a, b)` | `(a <= b)` |
| `expect_named(x, nms)` | `(identical(names(x), nms))` |
| `expect_match(x, pat)` | `(grepl(pat, x))` |
| `expect_error(expr)` | `(has_error(expr))` |
| `expect_error(expr, "msg")` | `(has_error(expr, "msg"))` |
| `expect_warning(expr)` | `(has_warning(expr))` |
| `expect_warning(expr, "msg")` | `(has_warning(expr, "msg"))` |
| `expect_message(expr)` | `(has_message(expr))` |
| `expect_no_error(expr)` | `(!has_error(expr))` |
| `expect_no_warning(expr)` | `(!has_warning(expr))` |
| `expect_no_message(expr)` | `(!has_message(expr))` |
| `expect_type(x, "t")` | `(typeof(x) == "t")` |
| `expect_setequal(a, b)` | `(setequal(a, b))` |
| `expect_in(x, table)` | `(x %in% table)` |
| `expect_contains(x, expected)` | `(expected %in% x)` |
| `expect_output(expr, pat)` | `(grepl(pat, paste(capture.output(expr), collapse = "\n")))` |

Most of the translations boil down to "use the base R function directly." That's
the point.

**A note on `expect_output()`:** The `capture.output()` translation above works,
but is ugly to read and maintain. In practice, you may want to use **testit**'s
snapshot tests instead---just put the code in an `.md` file alongside your test
script and let **testit** compare the output for you. See the "Snapshot tests"
section below.

**A caveat on `expect_equal()` vs `all.equal()`:** The mapping above is accurate
for the most common case---comparing numeric values, data frames, and
lists---where they behave the same with the same default tolerance
(`sqrt(.Machine$double.eps)`). However, there are subtle differences depending
on which **testthat** edition you use:

-   In edition 2, `expect_equal()` wraps `all.equal()` but passes
    `check.environment = FALSE` by default. This means `expect_equal(f, g)` will
    pass for two functions with identical bodies but different enclosing
    environments, whereas a bare `all.equal(f, g)` would fail. If you are
    comparing functions or formulas, add `check.environment = FALSE` to your
    `all.equal()` call to match the old behavior.

-   In edition 3, `expect_equal()` switched from `all.equal()` to
    `waldo::compare()` under the hood. **waldo** also ignores function and
    formula environments by default, normalizes string encoding before
    comparison, and has more sophisticated handling of S4/R6 objects. For most
    numeric tests this makes no practical difference, but if your tests compare
    functions, formulas, or strings with mixed encodings, be aware that
    `all.equal()` may be slightly stricter.

In short: for data and numbers (the vast majority of test assertions), the
mapping is a drop-in replacement. For functions and formulas, you may need
`check.environment = FALSE`.

### The `%==%` operator

**testit** provides `%==%` as an alias of `identical()`. The advantage over
calling `identical()` directly is that when the assertion fails inside
`assert()`, it prints `str()` for both sides, so you may be able to immediately
spot the difference:

``` r
assert("example", {
  (1:3 %==% 1:3)
  (c("a", "b") %==% c("a", "b"))
})
```

If it fails, you'll see something like:

```         
x (LHS) ==>
 int [1:3] 1 2 3
----------
 int [1:3] 1 2 4
<== (RHS) y
```

### Snapshot tests

**testthat** stores snapshots in `tests/testthat/_snaps/`. **testit** uses a
simpler approach: just Markdown files like `tests/testit/test-name.md` alongside
the `.R` test scripts.

```` markdown
## `function_name()` description (optional)

Narratives (optional).

```r
code_to_run()
```

More narratives (optional).

```
expected output here
```
````

**testit** runs the R code block and compares its output to the following code
block (without the language name `r`). If they differ, the test fails and shows
a diff.

To initialize a snapshot test, you can omit the output block and only include
the R source code. When you run the tests (execute the command
`Rscript tests/*.R`, instead of running `R CMD check`), **testit** will
automatically fill in the output---no need to copy and paste results manually.
If you use RStudio, you can click "Run Tests" in the Build pane to initialize
and update snapshots (see the "RStudio setup" section below for configuration).

### Conditional test execution

**testthat** has `skip_on_cran()`, `skip_if_not_installed()`, etc. **testit**
offers three levels of conditional execution:

**Skip an entire test directory**---guard the `test_pkg()` call in a runner
script, e.g.,

``` r
library(testit)
if (identical(Sys.getenv("NOT_CRAN"), "true")) {
  test_pkg("pkgname", dir = "extended")
}
```

**Skip a single assertion**---wrap `assert()` in a condition, e.g.,

``` r
if (requireNamespace("pkg", quietly = TRUE)) assert("uses pkg", {
  ...
})
```

**Skip the rest of a test file**---use an early `return()` in a test file, e.g.,

``` r
if (!requireNamespace("pkg", quietly = TRUE)) return()
```

Since **testit** files are sourced top-to-bottom, `return()` skips the rest of
the file.

### Setup and teardown

**testthat**'s `setup()` and `teardown()` are superseded; the current approach
uses `withr::defer(..., teardown_env())`. With **testit**, just use normal R
patterns:

``` r
old <- options(warn = -1)
on.exit(options(old), add = TRUE)
```

Or place shared setup in `helper.R` (sourced before test files).

For file cleanup, `test_pkg()` automatically removes any newly generated files
under the test directory after testing completes (controlled by
`options(testit.cleanup = TRUE)`, which is the default). This means your
`tests/` directory stays clean without manual teardown. Have you ever been
annoyed by [the stray `Rplots.pdf`](https://github.com/Merck/r2rtf/issues/227)
in your test folder? You won't suffer from this problem with **testit**.

### DESCRIPTION changes

``` diff
- Suggests: testthat (>= 3.0.0)
+ Suggests: testit (>= 1.0)
```

Remove `Config/testthat/edition: *` if present.

### RStudio setup

If you use RStudio, go to *Tools \> Project Options \> Build Tools* and uncheck
"Use devtools package functions if available." With this option unchecked, the
"Run Tests" button in the Build pane will run the `.R` scripts under `tests/`
directly (i.e., `Rscript tests/*.R`), which is exactly what **testit** needs. If
you leave devtools enabled, RStudio will try to run tests through
`devtools::test()`, which only looks for `tests/testthat/` and calls
`testthat::test_local()`---it will not find or run **testit** tests at all
(you'll just see "No testing infrastructure found").

Unfortunately, Positron does not have an equivalent setting---its test command
is hardcoded to `devtools::test()`, so it suffers from the same problem. If you
use Positron, you'll need to run `Rscript tests/*.R` manually in the terminal.

Sometimes I hear people use popularity as an argument to justify the use of
**testthat**. Personally I don't find this convincing. I apologize for being a
little snarky here, but flu is also "popular". Part of **testthat**'s popularity
may be self-reinforcing: IDEs like RStudio and Positron hardcode
`devtools::test()` as the test command, which assumes **testthat**. New users
see that their IDE "just works" with **testthat** and conclude it must be the
right choice. Tutorials and templates naturally gravitate toward the same
default. The popularity feeds the tooling, and the tooling feeds the popularity.
That's not a technical argument---it's a network effect. I'm not saying
**testthat** is a bad choice, but I do think it's worth evaluating testing
frameworks on their own merits rather than simply going with the default. There
is no free lunch. You gain while you lose, and vice versa.

No matter which editor/IDE you use, `R CMD check` is always your faithful friend
(it just runs `tests/*.R`) without assuming the testing framework, although it's
much more than running tests.

## Why testit over testthat?

After going through the mechanical conversion, let me explain why I think it's
worth the effort.

-   **Tests are just R.** Every assertion in **testit** is a plain R expression.
    `(x > 0)` means exactly what it says. There is no DSL to learn and no
    `expect_*` vocabulary to memorize. If you know R, you know **testit**.

-   **Radical simplicity.** **testit** is about 700 lines of R code in total
    (including comments and blank lines), with zero dependencies. It has five
    core functions (`assert()`, `test_pkg()`, `has_error()`, `has_warning()`,
    `has_message()`) and one operator (`%==%`). Most of time, you are likely to
    only need `assert()` and `%==%`.

    **testthat** is about 15,000 lines of R plus C code, and pulls in 22
    non-base dependencies: **brio**, **callr**, **cli**, **crayon**, **desc**,
    **diffobj**, **evaluate**, **fs**, **glue**, **jsonlite**, **lifecycle**,
    **magrittr**, **pkgbuild**, **pkgload**, **praise**, **processx**, **ps**,
    **R6**, **rlang**, **rprojroot**, **waldo**, and **withr**.

-   **No hidden tolerance semantics.** **testthat** has gone through multiple
    editions with changing comparison behavior (edition 2 uses `all.equal()`,
    edition 3 uses `waldo::compare()`). The tolerance semantics differ between
    editions in subtle ways. With **testit**, you control your own fate, e.g.,
    you may call `all.equal()` directly with explicit arguments---what you write
    is what you get.

-   **Fast installation and CI.** **testthat** pulls in a dependency tree, and
    **testit** has zero non-base dependencies. This means faster CI installs,
    fewer breakage vectors, and no transitive dependency conflicts.

-   **Stable across R versions.** **testit** relies on base R primitives that
    have been stable for decades: `tryCatch()`, `withCallingHandlers()`,
    `eval()`, `parse()`, `deparse()`, `new.env()`, `on.exit()`,
    `capture.output()`, `grepl()`, and the condition system (`stop()`,
    `message()`, `invokeRestart()`). None of these are likely to change in
    incompatible ways.

-   **Snapshot tests are self-contained.** In **testthat**, snapshot tests are
    split across two places: `expect_snapshot()` calls in your `.R` file, and
    separate output files under `tests/testthat/_snaps/`. This means if you
    rename a test, you have to rename the corresponding output file (or delete
    the stale one manually). You also need to ensure unique test names within
    each file---if two clash, one overwrites the other. Reviewing changes
    requires `snapshot_review()` (a Shiny app) or `snapshot_accept()`. In
    **testit**, everything lives in a single `.md` file: code and expected
    output side by side. There's no naming ceremony, no separate output
    directory, and no special tooling needed to review or accept changes---just
    read the diff (if your package is in a GIT repo, you will see the diff in
    GIT).

### What about features testthat has that testit doesn't?

-   **Mocking.** Mocking is not a testing framework concern. If you need to
    substitute function behavior, the cleanest approach is dependency
    injection---pass the function as an argument so tests can supply a fake. If
    you need to mock functions in a package namespace, **mockr** is a dedicated
    package for that. That said, unless the code is completely out of your
    control, the need for mocking often indicates a design problem---consider
    refactoring to make the code easier to test directly.

-   **Reporters (progress bars, JUnit XML, etc.).** Reporters are genuinely
    useful when you have large test suites---progress bars help during
    interactive development, JUnit XML lets CI systems display per-test results
    in their UI, and timing reports help identify slow tests. **testit** does
    not have these. For most packages, printing failures and relying on the exit
    code is sufficient, but if you run hundreds of tests that take minutes and
    can have miserably many failures, you may miss the richer feedback.

-   **`skip_on_cran()` and friends.** An `if (...) assert()` does the same thing
    with zero framework overhead.

-   **`withr` integration.** Base R's `on.exit()` has done this job since R 1.0.
    `old <- options(x = y); on.exit(options(old))` is one line (if cheating via
    `;` is allowed, otherwise two lines), has no dependencies, and is
    immediately understandable.

-   **Auto-generated test skeletons.** A test file is a plain R script. Create
    it however you create R scripts.

## testit v1.0

**testit** v1.0 has just been [released to
CRAN](https://cran.r-project.org/package=testit). The source code is on
[GitHub](https://github.com/yihui/testit). I want to express my immense
gratitude to [John Blischak](https://github.com/jdblischak) for his thoughtful
feedback during the test migration mentioned in the beginning of this post---his
suggestions on ergonomics (suppressing noisy error messages from `has_error()`,
adding the `filter` argument to `test_pkg()`, requiring `library(testit)` to be
documented clearly, and collecting all test failures instead of stopping at the
first) directly shaped the v1.0 release. FWIW, I bumped the version from 13
years' 0.x to 1.0 not because of breaking changes---there were none (excuse me,
how can I break this package?), but just to mark the significantly enhanced
usability of this package thanks to John's suggestions.

In short, **testit** embodies a philosophy: a test framework should assert
conditions and get out of the way. Everything else---mocking, parallelism,
reporting, environment management---belongs in separate, purpose-built tools or
in base R itself. The result is a testing system that is easy to understand,
impossible to misconfigure, and aims to be stable indefinitely.
