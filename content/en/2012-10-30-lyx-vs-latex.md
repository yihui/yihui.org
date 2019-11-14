---
title: Can We Live Without Backslashes?
date: '2012-10-30'
slug: lyx-vs-latex
---

Two months ago [there was a discussion](https://stat.ethz.ch/pipermail/ess-help/2012-August/subject.html) in the ESS mailing list about Emacs/ESS started by [Paul Johnson](https://stat.ethz.ch/pipermail/ess-help/2012-August/008067.html), who claimed "Emacs Has No Learning Curve". While this sounds impossible, he really has some good points, e.g. he encourages beginners to look at the menu. I think this is a good way to learn Emacs. In the very beginning, who can remember `C-x C-f`? If one finds it hard even to open a file, how is one supposed to move on? (I taught my wife Emacs/ESS, unfortunately, in the wrong way)

Then [I went off-topic](https://stat.ethz.ch/pipermail/ess-help/2012-August/008084.html) by discussing Emacs vs [LyX](http://www.lyx.org) as the editor for LaTeX, and I quoted [an example](http://cmenzel.org/LyXvsEmacs.pdf) by Chris Menzel. This is LyX:

![LyX for LaTeX](https://db.yihui.org/imgur/nvbqz.png)

And this is Emacs:

![Emacs for LaTeX](https://db.yihui.org/imgur/0Uswf.png)

The difference is obvious. I find it difficult to understand why there are so many people who enjoy reading LaTeX code, which makes my eyes bleed. My experience of promoting LyX was often unsuccessful, and I feel some people were born to hate GUI. [Paul Thompson](https://stat.ethz.ch/pipermail/ess-help/2012-August/008109.html), the last person in that discussion thread, wrote these final comments:

> There is no such thing as LaTeX without `\`

> Sorry, folks, but that whole idea is whack. Totally whack. It's like onions without tears. Onions have good qualities, but there is a cost. LaTeX has good qualities. The cost is `\`.

> If you want formatting without `\`, use Word. You don't see a single `\` but you don't see anything of any value.

> The whole POINT of a markup language is to see the markup. If you don't want to see the markup, use a WYSIWYG editor like Word.

> Editors which do LaTeX hiding the markup are just another WYSIWYG 3rd order approximation.

Frankly speaking, I agree with none of the above comments. LaTeX is excellent, but that does not mean I must read the backslashes for the rest of my life. LyX has done a wonderful job of hiding `\` while giving us full power of LaTeX. If there is anything that cannot be done with GUI in LyX, we always have the ERT (Evil Red Text), i.e. we can input raw LaTeX code in LyX (`Ctrl + L`). LyX gives us a human-readable interface to LaTeX without sacrificing anything. The whole point of a markup language is not to read the source. If we are to see anything, we see the output. For example, we read a web page instead of its HTML code.

It is undeniable that sometimes we need to read the source code for other purposes such as debugging. LyX has a menu `View => View Source` to allow one to view the LaTeX source of the current document, which is something I often do. I appreciate the importance of source code, but LaTeX is an exception in my eyes. With LyX, I do not have to start every single LaTeX document with `\documentclass{}` and remember all the gory commands about the **geometry** or **hyperref** package (top margin, inner margin, outer margin, page width, bookmarks, etc etc). That is why I managed to write the documentation of my R packages quickly (e.g. [**knitr**](https://github.com/yihui/knitr/tree/master/inst/examples), [**formatR**](https://github.com/yihui/formatR/tree/master/inst/doc) and [**Rd2roxygen**](https://github.com/yihui/Rd2roxygen/tree/master/inst/doc), etc).

Finally, I do not recommend LaTeX novices to try LyX. It is a bad idea in general to use GUI if you do not really understand it.

I know this promotion for LyX is, as usual, not going to help. People simply walk by.

![](https://forgifs.com/gallery/d/171709-3/Cat-ignores-girl-like-a-boss.gif)

Image [via](http://researchinprogress.tumblr.com/post/34403093418/how-i-feel-at-poster-presentations). Also see [Changing just a tiny little bit in my LaTeX tabular](http://researchinprogress.tumblr.com/post/34692517685/changing-just-a-tiny-little-bit-in-my-latex-tabular).

![](https://db.yihui.org/imgur/uarWJuS.gif)
