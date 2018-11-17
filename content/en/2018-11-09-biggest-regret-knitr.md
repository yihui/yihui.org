---
title: My Biggest Regret in the knitr Package
subtitle: UTF-8, and UTF-8 only, or we cannot be friends
date: '2018-11-09'
slug: biggest-regret-knitr
---

The **knitr** package was written in late 2011, when I knew little about character encodings. I still don't know much about them today, but I have had enough pain. At RStudio, I have become the (self-nominated) "Character Encoding Ambassador", mainly because I'm the only native Chinese in the company, and Chinese characters are multibyte. It is common that problems related to character encodings are reported by Chinese users. If we can fix these problems, chances are problems for other languages will disappear at the same time.

The default `knitr::knit(..., encoding = getOption("encoding"))` was the biggest mistake in **knitr** in retrospect. Now I regret and hate it day and night. I used this default encoding because it is what all base R functions do when reading or writing files. For example, take a look at the help page `?file`. The default means the system native encoding (`native.enc`), which is _a total mess_ on Windows. Different languages have different default character encodings (e.g., Simplified Chinese uses `GBK`). On *nix, the default encoding is often UTF-8.

If Windows didn't introduce all these different encodings, I think half of programmers in the world could spend three months on the beach enjoying the sunshine every year. FWIW, [I have heard rumors](https://twitter.com/matarillo/status/931050504779526145) about the UTF-8 support in a certain future version of Windows. Even with that, I guess it will take several more years to clean up the mess.

[UTF-8 works everywhere](http://utf8everywhere.org), but it takes courage for software developers to force Windows users to use UTF-8. Over the years, I have been admiring the decision of Pandoc's author, John MacFarlane: UTF-8 in, and UTF-8 out. Most other software packages chose to compromise to the system native encoding by default. The compromise brings endless headache to developers, but the gain for users is at most marginal, if not nil. If users are forced to use UTF-8 consistently, the life of developers will be much easier, and the hassle for users is actually minimal: users only need to choose the UTF-8 encoding when reading or saving a file. Actually if the file editor gives users an option to set the encoding globally, the hassle will be none. For example, in RStudio, you can set the default text encoding to UTF-8:

![Set UTF-8 as the default encoding in RStudio](https://user-images.githubusercontent.com/163582/48278362-e3f79d00-e412-11e8-8d53-be409861928f.png)

Needless to say, if you haven't set this option on Windows, I won't be your friend.

If you don't use a language with multibyte characters, you probably won't feel the pain. This issue has wasted us so much time, as [Xianying Tan wrote](https://shrektan.com/post/2018/05/07/cant-bear-with-encoding-any-longer/) earlier this year (in Chinese). He has been trying to fix these encoding problems in various R packages like myself in the past, e.g., [in **plumber**](https://github.com/trestletech/plumber/pull/312), **roxygen2**, **devtools**, **data.table**, **odbc**, and so on.

Both **knitr** and **rmarkdown** default to the native encoding due to my initial blind decision, but since **bookdown**, I have started enforcing UTF-8. All of **bookdown**, **blogdown**, **xaringan**, **tinytex**,and my packages since 2016 only support UTF-8 based on two simple helper functions in the **xfun** package: `xfun::read_utf8()` and `xfun::write_utf8()`. Before then, I was a little worried if this would offend any users. The fact is, I haven't received any complaints about UTF-8 in these packages.

If you plan to write a package that involves file input/output, I'd strongly recommend that you support, and only support UTF-8. The UTF-8 assumption can save you a lot of time guessing and debugging.

Someday I'll force **knitr** and **rmarkdown** into the UTF-8 world, too (perhaps in **knitr** and **rmarkdown** v2.0), but this will certainly take a long time to happen.
