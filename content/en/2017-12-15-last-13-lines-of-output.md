---
title: More Than "Last 13 lines of output" in R CMD check?
subtitle: Dear _R_CHECK_TESTS_NLINES_, where were you these years?
date: '2017-12-15'
slug: last-13-lines-of-output
---

When running `R CMD check`, I often cry a little upon "Last 13 lines of output" in the log, because 13 lines is often not enough for me to figure out why tests failed. Today I was tortured by this problem again (it is particularly painful when tests only fail on Travis CI but not locally^[I'm aware of the [debug mode](https://docs.travis-ci.com/user/running-build-in-debug-mode/) on Travis, and just don't bother sending the email request.]), and could no longer stand it. I desperately wanted to see more lines of output. After some Google searches, I didn't find an answer, so in the spirit of "Luke, use the ~~force~~ source!", I searched in the base R source (Winston's [r-source repo](https://github.com/wch/r-source)), and finally found [this line in `tools/R/check.R`](https://github.com/wch/r-source/blob/da80a968b/src/library/tools/R/check.R#L3225). Bingo! The magic number 13 is controlled by the environment variable named `_R_CHECK_TESTS_NLINES_`. Then I went to the [R Internals](https://cran.rstudio.com/doc/manuals/r-release/R-ints.html) manual, and found it had been documented there. 

After I set `_R_CHECK_TESTS_NLINES_=0`, I was able to see the full output (instead of the truncated version), and finally figured out what was wrong.

![Seeing the full cookie](https://slides.yihui.org/gif/happy-elmo.gif)
