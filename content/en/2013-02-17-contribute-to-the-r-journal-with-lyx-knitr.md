---
title: Contribute to The R Journal with LyX/knitr
date: '2013-02-17'
slug: contribute-to-the-r-journal-with-lyx-knitr
---

(This paragraph is pure rant; feel free to skip it) I have been looking forward to the one-column LaTeX style of [The R Journal](http://journal.r-project.org/), and it has arrived eventually. Last time I [mentioned](/en/2013/01/code-pollution-with-command-prompts/) "it does not make sense to sell the cooked shrimps"; actually there is another thing that does not make sense in my eyes, which is the two-column LaTeX style. I just hate it. Two-column may save a little bit space in typesetting compared to one-column, but it brings huge inconvenience to the readers who do not have a big enough screen. For each single page, you have to scroll down to read the left column, scroll back and up to read the right column, then scroll down... So you just scroll up and down, up and down, ... until you are bored by this PITA.

![A sample R Journal article in LyX/knitr](https://db.yihui.org/imgur/39xfw02.png)

I have ported the new `RJournal.sty` to [LyX](http://www.lyx.org), and you can find the relevant files in my [lyx repository](https://github.com/yihui/lyx). To write articles in LyX with **knitr**, check out or [download](https://github.com/yihui/lyx/archive/master.zip) the repository and follow these steps:

1. Find out what is your `User directory` from the LyX menu: `Help --> About`
1. From my repository, copy the `layouts` folder to your user directory;
3. Download `RJournal.sty` from the [R Journal website](http://journal.r-project.org/submissions.html) and put it in your `texmf` tree so that LaTeX can find it (this might be the most challenging step if you do not know enough about LaTeX, and I do not want to explain this painful topic);
4. (For Windows users only) make sure R is in your `PATH` (again this is a painful topic that I hate to explain) and `install.packages('knitr')` in R;
5. From LyX, click `Tools --> Reconfigure` and restart LyX;

Now you should be able to open `templates/RJournal.lyx` and compile it. I have made [a quick video](http://www.screenr.com/BqZ7) of the process below:

<iframe src="https://www.screenr.com/embed/BqZ7" width="600" height="365" frameborder="0"></iframe>

So you have no execuse to escape reproducible research! It is even easier than writing in Word to contribute a reproducible article to The R Journal now.

P.S. I will try to submit this new layout file `RJournal.layout` as well as the template `RJournal.lyx` to the LyX development team if I do not hear any problems from users.
