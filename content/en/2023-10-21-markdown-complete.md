---
title: 'R Markdown v1: Feature Complete!'
subtitle: Because it just does not have many features
date: '2023-10-21'
slug: markdown-complete
---

When we say "R Markdown", we usually refer to the **rmarkdown** package, which
is based on Pandoc and **knitr**. Prior to the **rmarkdown** package, there
actually existed an older version of R Markdown, which was based on the
**markdown** package instead of Pandoc. Later we called this version "R Markdown
v1".

R Markdown v1 was more or less an experiment, although many people liked it
(perhaps because they had suffered for too long from LaTeX). It did not take
long before we started developing v2, i.e., **rmarkdown**. V1 was much less
powerful than v2. For example, it only supported HTML output but not LaTeX or
any other output format. The now widespread CommonMark specs did not exist at
that time, so v1's Markdown syntax was chaos just like pretty much any other
Markdown conversion tools (each having its own homemade or wild-caught specs)
except Pandoc.

After R Markdown v2 became mature, v1 did not seem to be of much value any more.
Perhaps it would just quietly fade out and eventually die. But...

But Jeroen Ooms, the great ninja, created the R package **commonmark** later.
That changed the destiny of the **markdown** package. Previously, **markdown**
was based on a C library, which had been deprecated for a long time. Last year,
I removed the C library from **markdown**, and rewrote the package based on
**commonmark**.

Although I'm a minimalist, **commonmark**'s Markdown features are too limited in
my eyes. On the other hand, Pandoc's Markdown is too rich to me. What I did in
the **markdown** package was a compromise. You can read [the introduction
vignette](https://cran.r-project.org/web/packages/markdown/vignettes/intro.html)
to learn which features are supported in this package.

If you prefer reading slides over documentation, I have given a talk in May,
which was not recorded but you will not miss anything by only reading [the
slides](https://slides.yihui.org/2023-philly-markdown.html).

This post is not meant to encourage people to use R Markdown v1. On the
contrary, I think v2 and Quarto are better choices for most people. I just want
to mention the revived **markdown** package, and there is a small chance that it
actually meets some people's need.

Declaring "feature complete" is hard, and it is definitely not a firm rejection
to all future feature requests. It only means that "being feature-rich" is not
the goal of this package. In particular, new features that require substantial
work are unlikely to be added. Please feel free to request new features without
a high expectation that they would be implemented.

![Feature complete!](https://slides.yihui.org/gif/table-cloth.gif)

P.S. Currently, [the **markdown** repo](https://github.com/rstudio/markdown) is
the only Github repo that I maintain and has zero open issues. For years, I
thought [Will
Landau](https://github.com/ropensci/targets/issues/503#issuecomment-856264236)
was the only person on earth who could possibly achieve this.
