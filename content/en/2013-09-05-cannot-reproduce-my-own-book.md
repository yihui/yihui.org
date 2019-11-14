---
title: After Three Months I Cannot Reproduce My Own Book
date: '2013-09-05'
slug: cannot-reproduce-my-own-book
---

> TL;DR I thought I could easily jump to a high standard (reproducibility), but I
  failed.

![](https://db.yihui.org/imgur/niyXcfk.gif)

Some of you may have noticed that the knitr book is finally out. [Amazon is
offering a good price](http://www.amazon.com/gp/product/1482203537) at the
moment, so if you are interested, you'd better hurry up.

I avoided the phrase "Reproducible Research" in the book title, because I
did not want to take that responsibility, although it is related to
reproducible research in some sense. The book was written with knitr v1.3
and R 3.0.1, as you can see from my `sessionInfo()` in the preface.

Three months later, several things have changed, and I could not reproduce
the book, but that did not surprise me. I'll explain the details later. Here
I have extracted the first three chapters, and released the corresponding
source files in the [knitr-book](https://github.com/yihui/knitr-book)
repository on Github. You can also find the link to download the PDF there.
This repository may be useful to those who plan to write a book using R.

What I could not reproduce were not really important. The major change in
the recent knitr versions was the syntax highlighting commands, e.g.
`\hlcomment{}` is `\hlcom{}` now, and the syntax highlighting has been
improved by the [**highr**](http://cran.r-project.org/package=highr) package
(sorry, Romain). This change brought a fair amount of changes when I look at
`git diff`, but these are only cosmetic changes.

I tried my best to avoid writing anything that is likely to change in the
future into the book, but as a naive programmer, I have to say sorry that I
have broken two little features, although they may not really affect you:

- the preferred way to stop knitr in case of errors is to set the chunk
  option `error = FALSE` instead of the package option `stop_on_error`,
  which has been deprecated (Section 6.2.4);
- for external code chunks (Section 9.2), the preferred chunk delimiter is
  `## ----` instead of `## @knitr` now;

Actually the backward-compatibility is still there, so they will not really
break until a long time later.

With exactly the same software environment, I think I can reproduce the
book, but that does not make much sense. Things are always evolving. Then
there are two types of reproducible research:

1. the "dead" reproducible research (reproduce in a very specific environment);
1. the reproducible research that evolves and generalizes;

I think the latter is more valuable. Being reproducible alone is not the
goal, because you may be reproducing either real findings or simply old
mistakes. As Roger Peng
[wrote](http://simplystatistics.org/2013/08/21/treading-a-new-path-for-reproducible-research-part-1/),

> [...] reproducibility cannot really address the validity of a scientific claim
as well as replication

Roger's recent three blog posts on reproducible research are very worth
reading. This blog post of mine is actually not quite relevant (no data
analysis here), so I recommend my readers to move over there after you haved
checked out the [knitr-book](https://github.com/yihui/knitr-book) repository.
