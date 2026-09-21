---
title: Three New Debugging Aids in knitr
date: '2026-09-21'
slug: knitr-debugging
---

Note

:   This is one of a few posts on new features from a recent [four-day knitr
    triage sprint](/en/2026/09/knitr-backlog/); see that post for the full
    details of the sprint.

When a document fails to knit, the worst part isn't the error---it's the
scavenger hunt. *Which* line, in *which* chunk, produced *this* message? In a
long report with dozens of chunks, that hunt can eat more time than the actual
fix. Three additions this cycle are all aimed at the same thing: telling you
where a problem came from, faster.

## Click the error, jump to the line

When a chunk errors, **knitr** prints a "Quitting from lines ..." message with
the file and line range. In a terminal that supports hyperlinks---the RStudio
IDE, for one---that path is now a clickable link that takes you straight to the
offending line:

```         
Quitting from report.Rmd:42-45  ← now clickable in RStudio
```

There's nothing to configure; if your front-end sets the right environment
variable (RStudio sets `RSTUDIO_CLI_HYPERLINKS`), you get the link, and
everywhere else you get the plain path as before. A small thing, but it removes
a step from the loop every single time you hit an error
([#2153](https://github.com/yihui/knitr/issues/2153)).

## Backtraces for warnings, not just errors

Errors have long been able to show an **rlang** backtrace---the chain of calls
that led to the failure. Warnings couldn't, which is a shame, because a warning
buried in a large document ("NAs introduced by coercion" from... somewhere) can
be just as hard to locate as an error.

Now warnings can carry a backtrace too. It's off by default; turn it on with an
option:

``` r
options(rlang_backtrace_on_warning_report = "full")   # or "branch"
```

With that set, each warning emitted while knitting is followed by the call tree
that produced it, so you can see exactly which function raised it
([#2219](https://github.com/yihui/knitr/issues/2219)).

## Watch your code run

Sometimes the problem isn't an error at all---it's that the render *hangs*, or
takes forever, and you have no idea which chunk is the culprit. This is
especially painful for documents rendered on a remote server or in a batch job,
where you can't just watch an interactive session.

The new `log.echo` chunk option streams each expression to `stderr` immediately
before it's evaluated:

```` md
```{r, log.echo=TRUE}
step_one()
step_two()   # if the render hangs here, you'll see step_two() logged and then silence
```
````

Because the logging happens right before evaluation, the last line you see
logged is the line that's currently running. If your logging platform stamps
timestamps, you also get a crude profiler for free---the gap before the next log
line is how long that expression took
([#2222](https://github.com/yihui/knitr/issues/2222)).

Three different problems---an error, a warning, a hang---and now three ways to
pin down where each came from.
