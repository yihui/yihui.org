---
title: Auto-completion in Notepad++ for R Script
date: '2010-08-14'
slug: auto-completion-in-notepad-for-r-script
---

Auto-completion is fancy in a text editor. Notepad++ does not support auto-completion for the R language, so I spent a couple of hours on creating such an XML file to support R, and you can get [the R script on GitHub](https://gist.github.com/2143971).

Put the output file `R.xml` from that script under `plugins/APIs` in the installation directory of Notepad++ (you can see several other XML files there supporting different languages such as C), and make sure you have enabled auto-completion in Notepad++ (`Settings --> Preferences --> Backup/Auto-completion`). Open an R script and start typing a familiar function (e.g. `paste()`), you will see some candidates in a drop-down list like this:

![Auto-completion in Notepad++ for R script](https://db.yihui.org/imgur/LBY1C.png)

Hit the Enter key if the function name selected in the list is correct for you, then type `(` and you will see hints for parameters:

![Show parameters of R functions in Notepad++](https://db.yihui.org/imgur/Z8vwj.png)

The file `R.xml` contains almost all visible R objects in base R packages as well as recommended packages like **MASS**. You may create an extended XML file (containing keywords from other packages) by yourself after loading the packages you need into your current workspace, and run the R script above.

