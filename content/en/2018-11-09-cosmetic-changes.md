---
title: On Cosmetic Changes in Pull Requests
date: '2018-11-09'
slug: cosmetic-changes
---

Programmers, including myself, make cosmetic changes in code all the time, such as adding or deleting white spaces or blank lines, or re-wrapping lines, or adding `{ }` to single-line `if` statements. That is usually fine. However, when making changes in other people's code and sending pull requests on Github, I suggest you refrain from introducing cosmetic changes. There are two reasons:

1. Such changes require unnecessary attention of the pull request reviewer. If you don't know if the reviewer is busy or not, always assume he/she is extremely busy, so the best strategy is to bring the really minimal set of changes, and exclude all non-essential changes ([or save them for later](/en/2018/02/bite-sized-pull-requests/)).

1. The author of the package may not really like the style of the cosmetic changes. This is worse. People can argue to death on style. Such changes are often red herrings and can quickly lead to [bikeshedding](https://en.wiktionary.org/wiki/bikeshedding). Unless you are going to take over the maintainership of a package, I recommend that you follow the style of the main author(s). Even if they use `=` for assignments, which makes absolutely no sense to you, you just use `=` (you can complain about it by yourself in your own room if that makes you feel better). FWIW, [I use `<-` when I contribute to a package](https://github.com/Robinlovelace/geocompr/issues/319) if its author uses `<-`. I don't think there is any need to argue about it, and I wish people could be more tolerant with each other's styles.

In summary, the whole point is "recognize the priorities". Getting the pull request merged is more important, so you want to save the reviewer time. It is more important for the package maintainers to be happy so they can carry on (bear in mind that they will also have to maintain the code you contributed _after you have left_), so you follow their own styles.

![I love pull requests, but usually you won't stay in my bathtub for long](https://slides.yihui.org/gif/drag-cat.gif)
