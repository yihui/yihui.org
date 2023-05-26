---
title: How to Fold Messages and Warnings in knitr
date: '2023-05-26'
slug: fold-messages
---

Most R Markdown users may know that [code blocks can be
folded](https://bookdown.org/yihui/rmarkdown-cookbook/fold-show.html) in HTML
output. Then [\@rkb965 asked a good
question](https://github.com/yihui/knitr/issues/2227) on how to fold messages
and warnings. The answer was not clear to me in the beginning, but later I
recalled [a contribution by
\@atusy](https://github.com/rstudio/rmarkdown/pull/1835) and came up with this
solution:

```` markdown
---
title: "Test"
output:
  html_document:
    code_folding: show
---

```{r, setup, include=FALSE}
knitr::opts_chunk$set(
  class.message = 'foldable fold-hide',
  class.warning = 'foldable fold-hide'
)
```

```{r}
message('Hello message!')
warning('Hello warning!')
```
````

Basically if an output block (not necessary a source code block) has the class
`foldable` and the `code_folding` feature is enabled, the block will be
foldable. To apply this class to messages and warnings, we just need to set the
chunk options `class.message` and `class.warning`, respectively. The class
`fold-hide` in the above example means messages and warnings will be hidden
initially. They could be unfolded if you click the button on the top right.
