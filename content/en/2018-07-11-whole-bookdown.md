---
title: Write / Don't Write the Whole Book in bookdown
date: '2018-07-11'
slug: whole-bookdown
---

For any software package, there may be users who love it or hate it, which never surprises me. In the past two days, I noticed two tweets that said opposite things about **bookdown**. The other day, [tj mahr said](https://twitter.com/tjmahr/status/1016504012802322434):

> don't write your book from start to finish in bookdown. it's too easy to hit a bug, and it's impossible to interactively debug. also, today my figure captions stopped working.

The next day, [Matt Crump said](https://twitter.com/MattCrump_/status/1016727443716149250) (independently, I assume):

> write the whole thing in #bookdown compiles seamlessly to webook, pdf epub. Easy editing compared to latex. All source code in a github repo

Isn't that amusing?

Half an hour after tj mahr complained, he realized it was because [he didn't follow the documentation](https://twitter.com/tjmahr/status/1016512045284577280). So I'd like to [thank him again](/en/2017/11/thanks-tj-mahr/) for reading the documentation.

Should you write the whole book in **bookdown**? Well, if you ask me, the answer is of course yes, and I'm certainly biased as the author of this package. I have written three whole books in **bookdown**. The PDFs I generated from **bookdown** were directly ready for the publisher's printer (at least I didn't need to do anything else).

I guess the moral is, if you want to use Feature X of a software package, you may ignore its documentation for the first time. If everything goes well, great. But when you run into problems, it is probably a good idea to read the relevant documentation.

And don't panic.

![You can do it](https://slides.yihui.org/gif/you-can-do-it.gif)
