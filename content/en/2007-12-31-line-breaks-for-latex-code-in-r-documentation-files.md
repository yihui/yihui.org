---
title: Line Breaks for LaTeX Code in R Documentation Files
date: '2007-12-31'
slug: line-breaks-for-latex-code-in-r-documentation-files
---

I suddenly realized just now that the line breaks for `LaTeX` code in Rd files are also `\cr` instead of `\\` (which I thought to be in the past). `R CMD check` will replace your `\cr` with `\\` when producing `LaTeX` documentation files. If you write `\\` directly in Rd files, it will be recognized as "_an escape character_ + _a backslash_", which surely is not a line break symbol.

I found such a problem in the documentation file for the function `brownian.motion()` in my package [animation](http://cran.r-project.org/package=animation). The original code is:


```tex 
\deqn{x_{k + 1} = x_{k} + rnorm(1)\\
  y_{k + 1} = y_{k} + rnorm(1)}
  {x[k + 1] = x[k] + rnorm(1)\cr y[k + 1] = y[k] + rnorm(1)}
```

And actually it should be:

```tex 
\deqn{x_{k + 1} = x_{k} + rnorm(1)\cr
  y_{k + 1} = y_{k} + rnorm(1)}
  {x[k + 1] = x[k] + rnorm(1)\cr y[k + 1] = y[k] + rnorm(1)}
```

I was just to write an email for help but I understood the reason for my problem (by checking the result from `R CMD check`) before I sent my email.

