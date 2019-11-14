---
title: Markdown or LaTeX?
date: '2013-10-19'
slug: markdown-or-latex
---

> What happens if you ask for too much power from Markdown?

> ![Duck bites](https://db.yihui.org/imgur/vGwGF7s.gif)

R Markdown is one of the document formats that **knitr** supports, and it is
probably the most popular one. I have been asked many times about the choice
between Markdown and LaTeX, so I think I'd better wrap up my opinions in a
blog post. These two languages (do you really call Markdown a _language_?)
are kind of at the two extremes: Markdown is super easy to learn and type,
but it is primarily targeted at HTML pages, and you do not have fine control
over typesetting (
[really?](http://cran.r-project.org/web/packages/knitr/vignettes/docco-classic.html)
[really?](http://cran.r-project.org/web/packages/knitr/vignettes/docco-linear.html)),
because you only have a very limited number of HTML tags in the output;
LaTeX is relatively difficult to learn and type, but it allows you to do
precise typesetting (you have control over anything, and that is probably
why a lot of time can be wasted).

## What is the problem?

What is the root problem? I think one word answers everything: **page**! Why
do we need pages? **Printing** is the answer.

In my eyes, the biggest challenge for typesetting is to arrange elements
properly with the restriction of pages. This restriction seems trivial, but
it is really the root of all "evil". Without having to put things on pages,
life can be much easier in writing.

What is the root of this root problem in LaTeX? One concept: _floating
environments_. If everything comes in a strictly linear fashion, writing
will be just writing; typesetting should be no big deal. Because a graph
cannot be broken over two pages, it is hard to find a place to put it. By
default, it can float to unexpected places. The same problem can happen to
tables (see the end of [a previous post](/en/2012/10/lyx-vs-latex/)). You
may have to add or delete some words to make sure they float to proper
places. That is endless trouble in LaTeX.

There is no such a problem in HTML/Markdown, because there is no page. You
just keep writing, and everything appears linearly.

## Can I have both HTML and PDF output?

There is no fault being greedy, and it is natural to ask the question
whether one can have both HTML and PDF output from a single source document.
The answer is maybe yes: you can go from LaTeX to HTML, or from Markdown to
LaTeX/PDF.

- [pandoc](http://johnmacfarlane.net/pandoc/) can convert Markdown to almost anything
- [many tools](http://enc.com.au/docs/latexhtml/) to convert LaTeX to HTML

But remember, Markdown was designed for HTML, and LaTeX was for PDF and
related output formats. If you ask for more power from either language, the
result is not likely be ideal, otherwise one of them must die.

## How to make the decision?

If your writing does not involve complicated typesetting and primarily
consists of text (especially no floating environments), go with Markdown. I
cannot think of a reason why you must use LaTeX to write a novel. See
Hadley's new book [Advanced R programming](http://adv-r.had.co.nz) for an
excellent example of Markdown + **knitr** + other tools: the typesetting
elements in this book are very simple -- section headers, paragraphs, and
code/output. That is pretty much it. Eventually it should be relatively easy
to convert those Markdown files to LaTeX via Pandoc, and publish a PDF using
the LaTeX class from Chapman & Hall.

For the rest of you, what I'd recommend is to think early and make a
decision in the beginning; avoid having both HTML and PDF in mind. Ask
yourself only one question: must I print the results nicely on paper? If the
answer is yes, go with LaTeX; otherwise just choose whatever makes you
comfortable. The book [Text Analysis with
R](http://www.matthewjockers.net/2013/09/03/tawr/) authored by [Matthew
Jockers](http://www.matthewjockers.net/) is an example of LaTeX + **knitr**.
Matt also asked me this question about Markdown vs LaTeX last week while he
was here at Iowa State. For this particular book, I think Markdown is
probably OK, although I'm not quite sure about a few environments in the
book, such as the chapter abstracts.

It is not obvious whether we must print certain things. I think we are just
too used to printing. For example, dear professors, must we print our
homework? (apparently [Jenny](http://www.stat.ubc.ca/~jenny/STAT545A/) does
not think so; I saw her grade homework on [RPubs.com](http://rpubs.com)!) Or
dear customers, must we submit reports in PDF? ... In this era, you have
laptops, iPad, Kindle, tablets and all kinds of electronic devices that can
show rich media, why must you print everything (in black and white)?

For those who are still reading this post, let me finish with a side story:
Matt, a LaTeX novice, taught himself LaTeX a few months ago, and he has
finished the draft of a book with LaTeX! Why are you still hesitating about
the choice of tools? Shouldn't you just go ahead and get the * done?
Although all roads lead to Rome, some people die at the starting line
instead of on the roads.
