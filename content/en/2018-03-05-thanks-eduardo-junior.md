---
title: Thanks, Eduardo Junior, for Giving Up your Pull Request
date: '2018-03-05'
slug: thanks-eduardo-junior
---

Last week I received [a pull request](https://github.com/yihui/knitr/pull/1520) from Eduardo Junior in the **knitr** repo to add classes to odd/even rows of HTML tables generated from the function `knitr::kable()`. Eventually he closed the PR, because I believed there wouldn't be any use cases. The most typical use case would be making zebra striped tables. Perhaps ten years ago, we would need different classes for odd and even rows of a table, but now the `:nth-child` CSS selector has been widely supported, and it is extremely simple to make striped tables with only [a single line of CSS](https://css-tricks.com/snippets/css/css3-zebra-striping-a-table/) like:

```css
tbody tr:nth-child(odd) { background-color: #ccc; }
```

In general, I try not to close PRs. In this particular case, the benefit of the extra code brought to **knitr** seems to be minimal, while there could be potential disadvantages. I appreciate Eduardo's effort in this PR, and especially appreciate his understanding of my rejection. I know it is not easy to give up the work on which you have spent a non-trivial amount of time.
