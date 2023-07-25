---
title: A Change in the Meaning of the Chunk Option "message = FALSE" / "warning = FALSE"
subtitle: Silence is gold...
date: '2022-12-19'
slug: message-false
---

With a new release of the **evaluate** package (v0.19) last week, the meanings
of the chunk option `message = FALSE` and `warning = FALSE` in **knitr** have
changed. Previously, they meant that messages and warnings would not be captured
at all. Normally the messages would be sent to the console.

That was both confusing and inconvenient. When users set `message = FALSE`, the
more likely intention is "I'm sure I don't want to see any messages anywhere
from this code chunk", instead of "I don't want to see messages in the output
document but want to see them in the console".

If you have updated the **evaluate** package, `message = FALSE` will completely
suppress messages, and similarly, `warning = FALSE` will muffle all warnings in
a code chunk. For example, this will just suppress the package startup messages:

```` md
```{r, message=FALSE}
library(dplyr)
```
````

You no longer have to resort to functions such as `suppressMessages()` or
`suppressWarnings()` in your code like this:

```` md
```{r, message=FALSE}
suppressPackageStartupMessages(library(dplyr))
```
````

I'm not sure if there are any users who actually prefer the old behavior. If you
do want messages in the console, please set the chunk option `message = NA`
(similarly, `warning = NA` for warnings).

P.S. One motivation behind this change was to make **knitr**'s text progress bar
cleaner. With the [next version of **knitr**](/en/2023/01/knitr-progress-bar/),
you will see a *single-line* progress bar, which will not be interrupted by
messages in code chunks. Currently you can [try out the development
version](https://github.com/yihui/knitr#installation) of **knitr** (the CRAN
release will come in January next year). Please also let me know if you have any
feedback on **knitr**'s new progress bar.
