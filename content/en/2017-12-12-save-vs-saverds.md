---
title: save() vs saveRDS()
date: '2017-12-12'
slug: save-vs-saverds
---

So Jenny finally decided to write a [blog post](https://www.tidyverse.org/articles/2017/12/workflow-vs-script/) about why she would set your computer on fire, which was great. [Twitter is an inferior tool](/en/2017/12/twitter-shaped-us/) for discussions or Q&A. Sadly, most people would still stick to Twitter for everything. I saw [Scott Gigante asked](https://twitter.com/scottgigante/status/940453687616524290) Jenny a great question on Twitter:

> Why do you prefer `saveRDS()` to `save()`?

From the replies, [Simon Coulombe](https://twitter.com/JennyBryan/status/940504195093872640) cited Gavin Simpson's [blog post](https://www.fromthebottomoftheheap.net/2012/04/01/saving-and-loading-r-objects/) in 2012 (Yes! Write blog posts!!), which was clearly written, but I think it missed one important thing, which was later pointed out by [Thomas Leeper](https://twitter.com/thosjleeper/status/940502883770011648) in the same Twitter thread.

> `load()` can overwrite objects, silently. `readRDS()` cannot.

That is the greatest advantage of `saveRDS()` over `save()`, and explains why I almost always use the former. To put it short:

- `save()` saves the objects and their names together in the same file; `saveRDS()` only saves the value of a single object (its name is dropped).

- `load()` loads the file saved by `save()`, and creates the objects with the saved names silently (if you happen to have objects in your current environment with the same names, these objects will be overridden); `readRDS()` only loads the value, and you have to assign the value to a variable.

The combination `save()` + `load()` can be dangerous. You may destroy your existing objects without knowing it. `readRDS()` is more explicit, and safer.

Some may argue that `save()` has the advantage of saving multiple objects. I don't think this advantage is worth it, when you consider its possibly destructive consequence. If you must save multiple objects, what I'd do is to combine them into a `list()`, and save the single list with `saveRDS()`. Later I can retrieve the list, and explicitly extract the elements I need.
