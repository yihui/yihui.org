---
title: StackOverflow First, Github Issues Second, and Emails Last
subtitle: Public by Default, and Private Only When Necessary
date: '2017-08-24'
slug: so-gh-email
---

Everyone understands the importance of [an uninterrupted block of time](http://heeris.id.au/2013/this-is-why-you-shouldnt-interrupt-a-programmer/), especially to programmers. To me, the #1 source of distraction is emails.^[I can handle social media well. I limit my time on Twitter to be 10 minutes per day. I pretty much don't use Facebook or other social media websites or apps at all.] When I really need to get some serious work done, I have to close the Gmail tab in my browser, otherwise I cannot help looking at new emails, even though I still have other emails that I have not replied. I think I reached the goal "Inbox Zero" once a couple of years ago, and usually I have about 40 emails left in my inbox.

## TL;DR

Ask a question directly to me (by email or Github), and I'll be like this:

![Busy me](https://slides.yihui.org/gif/repeat-smoke.gif)

Ask a question in the community, there may be a lot of helpful hands:

![A lot of love](https://slides.yihui.org/gif/cat-hands.gif)

## Why Emails Are Bad

On my [About](/en/about/) page, I mentioned that I don't prefer private emails about open-source packages, and I recommend you to ask questions on StackOverflow first. Not many people followed my suggestion, probably because they have never seen this on my website. I have a strong belief that knowledge should be public by default, and private emails are terribly inefficient in sharing knowledge, because no matter how hard I try, I can only help one person at one time. In the future, I may have to repeat what I have emailed before to a different person. If you ask the question in the public, everyone else can see it, which has two important consequences:

1. Someone else may answer it before I dive in, which can save me time, and more importantly, it means less distraction to me. In fact, you may not have to wait for me to reply to your email, and it can save you time, too.

1. If nobody answers it in a few days, I can take a look and answer it if my time permits (of course, provided that I know the answer).

## Two StackOverflow Examples

I have pushed people to StackOverflow many times in the past, and I'd say most of the time it worked pretty well. For example, Stéphane Laurent asked me a question in a Github issue and I asked him to post it on StackOverflow instead, although I felt that I actually knew the answer at that time. [He did it](https://stackoverflow.com/q/45409750/559676). Half an hour later, CL (I don't know his real name) answered it, which was exactly an answer that I'd type out. As a token of appreciation that he read the source code of **knitr**, I rewarded him 500 points.

This morning I received an email about a **knitr** question. I was very happy that the sender read my email policy before. Actually she posted [the question](https://stackoverflow.com/q/44656046/559676) on StackOverflow two months ago, and waited till today to email me with the link to the post. I very much appreciate her patience. Again, as a sign of appreciation, I answered the question a few minutes later. It is actually a good question. Had this question come to my inbox first, I'd probably have ignored it.

> **Update on 2017/08/25**: This post reminded [Tim Appelhans](https://twitter.com/TimSalabim3/status/900962571024441345) of a [StackOverflow question](https://stackoverflow.com/q/17502050/559676) that he posted four years ago. That was an interesting question, and I guess few users would be able to find the answer without reading the **knitr** source code, so I'd be very glad to answer this kind of questions.

## Github Issues

Similar to emails, Github issues should not be used as the first tool to ask questions (it is appropriate to file bug reports and feature requests there). It is often the core developers of a Github repo who closely watch all Github issues, and their time is often limited. 

As an example, @DRManager asked a question using [a Github issue](https://github.com/rstudio/bookdown/issues/468) first, and I suggested him try StackOverflow instead. Although I was still very busy, I answered his question on StackOverflow just to thank him for his understanding. Below are other similar examples (thanks to all who listened):

- [rstudio/rmarkdown#1091](https://github.com/rstudio/rmarkdown/issues/1091) and the [StackOverflow post](https://stackoverflow.com/q/46666212/559676)

- [rstudio/DT#391](https://github.com/rstudio/DT/issues/391) and the [StackOverflow post](https://stackoverflow.com/q/36071460/559676)

## Conclusion

So it is not that I don't want to help you when I don't reply emails. It is just both impractical and inefficient to me.

Just to give you an idea about how much time and effort I spend on questions: there have been nearly [4000 questions](https://stackoverflow.com/questions/tagged/knitr) on StackOverflow about **knitr**, which is only one of the over 20 R packages that I maintain (**knitr** is probably the most popular one, though). I certainly cannot answer all of them, but I can assure you that I have at least read _every single one of them_. There have been about [1700 Github issues](https://github.com/yihui/knitr/issues) in the **knitr** repo, and I have also read them all. Usually I spend more time on a Github issue than a StackOverflow post. Sometimes it may take a whole day or even longer to fix a certain issue or implement a new feature. I have got numerous inspirations from Github issues and StackOverflow questions, which is also why I still actively spend time on them. For that, I thank those who filed these issues and asked the questions.

I don't want to disappoint you when your emails or Github issues seem to be unattended. Please consider asking questions in the public first, so that I won't be buried in emails and have time for exciting new projects. I think this applies to other developers, too.
