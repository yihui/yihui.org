---
title: 'Help Me: xaringan / remark.js CSS Themes?'
date: '2017-10-03'
slug: xaringan-themes
---

Since I have been fearing that too many people will use the same style for [**xaringan**](https://github.com/yihui/xaringan)-based slides, which will make **xaringan** a boring package, I'm looking forward to more user-contributed CSS themes. Currently, the `css` argument of the output format `xaringan::moon_reader` takes a default theme, and I hope to bundle more themes in this package, so that users can easily choose a theme they prefer. This is similar to [LaTeX beamer themes](https://hartwork.org/beamer-theme-matrix/).

In a previous post "[Why xaringan](/en/2017/08/why-xaringan-remark-js/)", I mentioned John Little created a Duke theme, which is a good example of what I'm looking for. I hope such CSS themes could be provided by **xaringan** (under [this directory](https://github.com/yihui/xaringan/tree/master/inst/rmarkdown/templates/xaringan/resources)) so that a user can specify something like `css: duke` to change the default theme.

I know this will [at least help Mine](https://twitter.com/minebocek/status/915045598956580865).

Anyone?

![Waiting for volunteers](https://slides.yihui.name/gif/questions.gif)

P. S. If you really want to kill time, see if you can "reproduce" a Microsoft PowerPoint style with CSS, or LaTeX beamer. The latter may be more challenging. I'll be waiting for pull requests on Github.
