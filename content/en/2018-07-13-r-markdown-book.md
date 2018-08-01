---
title: 'R Markdown: The Definitive Guide'
subtitle: How I spent the first half of my 2018
date: '2018-07-13'
slug: r-markdown-book
---

Shortly after I came back from the 2018 rstudio::conf in early February, I started writing the book "R Markdown: The Definitive Guide". This 300-page book was finished by the end of May. I [just announced](https://blog.rstudio.com/2018/07/13/announcing-the-r-markdown-book/) the book in the RStudio official blog, but want to write a personal blog post to reflect some personal thoughts, too.

![R Markdown: The Definitive Guide](https://bookdown.org/yihui/rmarkdown/images/cover.png)

## Happily eating my own dog food (for the third time)

I don't know other people's secrets on how to create successful software, but my experience is that if you create a software package that you like to use by yourself on a daily basis, it is likely to succeed and will be used by many other people, too. In other words, if even you don't enjoy your own dog food, how would you expect other people to eat it?

Before creating the **bookdown** package, I had written two long-form documents. One was my PhD thesis, and one was the **knitr** book. They were written in LaTeX (using LyX). You may think "two" is a small number, but it turned out to be big enough to me. I didn't want to bury myself in the LaTeX world again if I were to write anything longer than ten pages. LaTeX is great. The only problem is that I don't need so much power (i.e., it is too good to me).

I still love writing long documents. I just don't want to feel like a typesetter all the time.

This is the third book I have published with **bookdown**. Had I not worked on **bookdown** first, I don't know if I would be able to keep the momentum of "one book a year" (well, only since 2016 -- it is hard to tell how many more years I can keep going).

## Simple steps to writing a book

If you ask me if there are simple steps to write a book. The answer is "yes". The simple steps are:

1. Take a deep breath. Write Chapter 1.

1. Write Chapter 2.

1. ...

1. Write Chapter 19.

1. Write the Acknowledgements. Done. Lie on the couch, stare at the ceiling, and speculate about the meaning of life for a day.

That was pretty much what happened (except that I didn't lie on the couch or stare at the ceiling) if you [take a look at some of my GIT commit messages](https://github.com/rstudio/rmarkdown-book/commits/master?after=9868887b843de2e30596727fddba1a5902c7e6de+69) (like "add chapter 1", "add section 2.1 - 2.6", "add section 2.7", ...).

Of course you know I'm kidding. If you look for "simple steps" to do any nontrivial tasks, you are already losing. More often than not, you have no choice but bite the bullet, over and over again. You need to be prepared for that.

That said, I have to say that Step 1 is important, i.e., it is important to at least get started. A dreadful task is less dreadful after you actually start working on it, even if it is only 1% less dreadful.

## Managing distractions

I have said enough about managing distractions in [the acknowledgements section](https://bookdown.org/yihui/rmarkdown/acknowledgments.html) of the book. It is absolutely not fun. I ruthlessly turned down the invites to some meetings on my company calendar when I felt the meetings wouldn't be very productive (I preferred emails because emails could be async). I set my Slack status to "Writing a book: may not respond to messages" to inform my colleagues who may message me. Fortunately, my role in the company is relatively independent, and not many colleagues really rely on me heavily.

Managing distractions from others is one thing. Managing myself is another, and actually harder. I'm constantly drowning in Github issues, emails, and Stack Overflow questions, although I have been trying to ignore some of them. The problem is, these things are often more enjoyable than writing a book, mainly because each of them, individually, looks significantly easier than writing the book. It is tempting to put aside the book, and voluntarily jump into these small tasks. The fact is that even if I spend all my time on them, I still won't ever be able to finish them. Good news is that several people have started answering questions on Github and Stack Overflow before I see them.

During the four months, I had yet another source of distraction that I absolutely could (and should) not get rid of -- small kids. My younger boy was 6-mo old when I started writing this book. I almost thanked him in the book (like "[big thanks to my younger boy](https://blog.rstudio.com/2016/12/02/announcing-bookdown/), without whom I should have finished this book two months earlier"). Fortunately, he didn't deprive too much of my sleep, and quickly "agreed" not to take the bottle at night.

## This is a reference book

Just to set your expectation, I have to clarify that this is primarily a book for your reference. It is not a text book. If you read it from the beginning to end, you may feel exhausted or overwhelmed. It is meant to be a guide, and some chapters are not comprehensive (but should be good enough to get you started). You may need to read more about the specific R Markdown extension in its own full documentation (e.g., **blogdown**, **pkgdown**, and **learnr**).

## Once again, thanks to the Chapman & Hall team

Both our publisher Chapman & Hall and us have tried to make this book a little more affordable to readers. We have waived the royalties. We are allowed to keep the online version of this book, so readers can read it for free anytime.

Our editor John Kimmel and copy-editor Suzanne Lassandro were super fast, partly because we are familiar with each other now, I guess. When sending me the comments for a revision, Suzanne said "I'm not even going to set a deadline for you." She knew I'd return the revised manuscript the next day.

## What's next?

So what's next? I don't really know at the moment. As I said [in a previous post](/en/2017/12/busy-vs-productive/), I always have interesting ideas that I want to work on. It is hard to decide. On the other hand, as I maintain more and more R packages, perhaps it will be harder and harder for me to focus on larger projects. For example, [I just spent two good weeks](/en/2018/07/issue-zero/) on the **rticles** package.

Another book? An alternative to LaTeX? A fancy JS visualization library? Recording more video tutorials? There are just too many interesting projects. I'll need a quiet environment for such projects anyway, so first of all, I have to walk through all the chaos accumulated and left behind while I wrote the book, which I think can easily take me a month. Oh, by the way, I just noticed the other day that some rabbits managed to get into my garden and ate all my cilantro. I probably need to fix my garden fence, too. My hardware skills are extremely poor. Darn it.
