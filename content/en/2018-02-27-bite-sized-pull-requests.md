---
title: '"Bite-sized" Pull Requests'
date: '2018-02-27'
slug: bite-sized-pull-requests
---

A couple of days ago, the great hacker Leonardo Collado-Torres submitted [a pull request to **blogdown**](https://github.com/rstudio/blogdown/pull/263) after a very detailed [bug report](https://github.com/rstudio/blogdown/issues/261). It was definitely one of the best bug reports I had seen over the years. I was busy with something else when I saw the pull request, so I only briefly looked at it. I found it did three things: (1) Fixing the original bug; (2) Adding a new feature; (3) Fixing another "bug" that turned out not to be a bug. These things were related to each other, but the changes did not depend on each other. For example, you could fix the bug in a PR without adding the new feature. So I suggested him submit "bite-sized" PRs if possible next time. That way, I can quickly accept one change without considering the other. For example, I may like the new feature (I do in this case), but am not satisfied with the bug fix. The new feature won't be delayed by the bug fix.

The cognitive load of PR reviewers will also be lighter when PRs are bite-sized. Each small PR may take one minute to review and merge, but if three small changes are placed in a moderate PR, it may take more than three minutes to review and merge (1 + 1 > 2).

[![Hey I've got a pull request for you](https://pbs.twimg.com/media/DkAJYk6XgAAEVt2.jpg:large)](https://twitter.com/_ColinFay/status/1026831038587326464)

Because I understand how busy developers are, I'll try to submit small PRs when possible, and avoid bringing too many changes in a single PR. For example, I have submitted [three PRs](https://github.com/gohugoio/hugo/pulls?q=is%3Apr+author%3Ayihui+is%3Aclosed) to Hugo so far. In [#3639](https://github.com/gohugoio/hugo/pull/3639), I focused on the essential changes (making Hugo work with Disqus out of the box). I was not satisfied with the JavaScript code and wanted to make some cosmetic changes, but I refrained from doing it in this PR to make it really minimal and highlight the essential changes. After it was accepted, I submitted a separate PR [#3655](https://github.com/gohugoio/hugo/pull/3655) for the cosmetic changes. I didn't care if the second PR would be accepted or not.

In terms of cosmetic changes, Leonardo actually paid close attention to my coding style, and tried to use `=` instead of `<-` for assignments. That was very considerate of him. However, he can only win the second-place award for being considerate of Yihui's coding style this week, because Ian Lyttle will definitely win the first-place award for his PR [rstudio/blogdown#265](https://github.com/rstudio/blogdown/pull/265): I didn't ask him to use the style

```r
foo(
  arg1, arg2, ...
)
```

but apparently he noticed my style, respected it, and started the long list of arguments _below_ the left parenthesis `(`. Of course, I'm not saying my style makes sense or advocating my style (it is a weird style!), but it will be such a smooth experience to review PRs like this, since there is zero mental friction (as if the PR were created by myself). He also meticulously corrected [a funny typo](https://github.com/rstudio/blogdown/pull/265#discussion_r170489377) of mine in `NEWS.md` --- apparently my brain was poisoned by the Rd syntax `\code{}`. That was a great extra thing to do in a PR (no questions asked).

P.S. This is what it feels like when opening a PR on Github only to find too many changes in it (cannot bite with a single bite):

![Reviewing a PR with too many changes](https://slides.yihui.org/gif/dog-fish.gif)
