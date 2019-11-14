---
title: 'Help Needed: Use Sentence Styles in knitr''s Documentation'
date: '2017-12-29'
slug: sentence-styles-knitr
---

A major change I want to make about my life as a software developer in 2018 is that I will ask for help more frequently. I have a lot of burden that I hope to shift to other people's shoulders. Of course, I won't simply use you as pure labor -- I hope you could learn something while helping me. I'll start listing the simpler tasks in the next few weeks. Here is today's task.

Due to my laziness in the early days (didn't bother to hold the Shift key), I didn't use proper sentence styles in **knitr**'s documentation, including both the R help pages, and the **knitr** website. Perhaps I have been "tortured" by copy-editors of my books and also the CRAN team, now the **knitr** documentation looks sloppy in my eyes. For example, take a look at the help page `?knitr::knit`:

```
Arguments

input   path of the input file
output	path of the output file for knit(); if NULL,
        this function will try to guess and it will be
        under the current working directory
```

I wish there were proper capitalization and punctuation marks (including Oxford commas) like this:

```
Arguments

input   Path of the input file.
output	Path of the output file for knit(). If NULL,
        this function will try to guess, and it will be
        under the current working directory.
```

Similarly, there are sloppy sentences everywhere on the web page of [**knitr** chunk options](/knitr/options/) (which is the most important page in the documentation).

If you want to help me, please first indicate it in the Github issue [yihui/knitr#1481](https://github.com/yihui/knitr/issues/1481), to avoid possible duplicated effort (two people working on the same thing at the same time). This is going to be a quite boring task, and you won't learn a lot of super cool things. I recommend this task to those who are relatively new to Github and R package development (and of course, have plenty of spare time to kill). I expect you to fork the **knitr** repo on Github, make the changes in the roxygen comments ([for example](https://github.com/yihui/knitr/blob/99fb135c4/R/output.R#L58-L70)), and submit a pull request when you are done. You are welcome to change the R documentation of a single function, and submit a pull request before you try the rest of functions, just to make sure you are able to go through the correct process.

For the **knitr** website, the source files are hosted in another Github repo `rbind/yihui` under the [`content/knitr/`](https://github.com/rbind/yihui/tree/master/content/knitr) directory. You can modify those Markdown files and submit a pull request. If you don't know anything about GIT, you can simply click the menu "Edit this page" on the left of any of my web page (including the **knitr** web documentation pages) to edit the source and submit pull requests.

English is only my third language: my first language is Chinese, and my second is R. Feel free to improve other aspects of the documentation if you think it is appropriate.

I'll look forward to your pull requests!

![pull requests](https://slides.yihui.org/gif/dog-drag.gif)
