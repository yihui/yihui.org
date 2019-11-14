---
title: 'Romain Lesur: The Most Wonderful Collaborator I Have Ever Worked With'
date: '2019-07-16'
slug: romain-lesur
---

In the footnote #4 of [a blog post](/en/2018/11/dependency-winner/) from last year, I said that Romain Lesur was *the* most wonderful collaborator with whom I had ever worked with in my software career. [I meant to write a blog post about it](https://twitter.com/jozefhajnala/status/1089607705289990144) but it was so hard to find time this year. Finally I have uploaded [the **rolldown** package](https://github.com/yihui/rolldown) to CRAN, and can take a brief break now.

## The birth of pagedown

Romain first came to my attention in September last year when [he tweeted about Paged.js](https://twitter.com/RLesur/status/1037126641846312967). Now I don't remember how I noticed this tweet. Perhaps it was because Christophe Dervieux, Heather Turner, or Nicolas Roelandt liked it, and Twitter figured out I liked these people (I do), so Twitter recommended it to me. Perhaps it was because it contained the `#bookdown` hashtag by chance.

Anyway, I happened to be thinking of something similar around that time, because I had always [believed in HTML and web technologies](/en/2018/07/in-html-i-trust/) in terms of typesetting. I saw [ReLaXed](https://github.com/RelaxedJS/ReLaXed) earlier and was excited about it (especially the incredible examples made out of CSS and HTML). Everything looked perfect and beautiful, but there were two problems: 1) One couldn't write the full content in Markdown naturally (there was Markdown support, but the full document had to be HTML or Pug); 2) ReLaXed was a Node.js package. Of course, I was looking for something that could work best with R and R Markdown without an external system dependency. Then Romain's tweet opened a door for me just in time. Since Paged.js is a JavaScript library, we can easily integrate it into R through the HTML Widgets framework. Problems solved.

One week later, I emailed Romain:

> On Thu, Sep 13, 2018 at 8:34 AM Yihui Xie \<???@gmail.com> wrote:

> > Hi Romain,

> > I have been looking at [your **weasydoc** package](https://github.com/RLesur/weasydoc) and thanks again for bringing Paged.js to my attention. I have been very excited, and am still learning more about it. I have to say you opened a new door through which I feel I'll be able to fulfill [one of my life dreams](/en/2018/07/in-html-i-trust/).

> > I'm going to devote some serious time in this, and I hope we can collaborate on it (unless you have finished all the work :).

> > Regards,  
Yihui

## What made Romain a great collaborator of mine

[I have admitted that](/en/2018/02/career-crisis/) I'm a terrible person to collaborate with. Usually I tend to do most of the work on my own, and do not collaborate with other people substantially. I have reviewed and merged many pull requests on Github, but these projects typically have only one absolute owner (me). I think **pagedown** is the first project in which I have communicated with a co-author frequently and haven't made all the decisions only by myself. There are a few reasons why I regarded Romain as a great collaborator to me:

1. His skill set complements mine perfectly. I know R Markdown and HTML Widgets well, and he knows Paged.js and Pandoc Lua filters. Since he joined me in the work of **pagedown**, I lost the motivation to learn more about Paged.js and Pandoc filters. Besides, he read the Chrome Developer Protocol and [single-handedly wrote](https://github.com/rstudio/pagedown/pull/30) the wonderful `pagedown::chrome_print()` function. I confess that this is still a mystery to me, and I'm unable to reach the depth in these technologies as Romain did. He has submitted [many other pull requests](https://github.com/rstudio/pagedown/pulls?q=is%3Apr+author%3ARLesur) to **pagedown**, and I often merged them with awe (e.g., [#16](https://github.com/rstudio/pagedown/pull/16), [#21](https://github.com/rstudio/pagedown/pull/21), [#43](https://github.com/rstudio/pagedown/pull/43), and [#48](https://github.com/rstudio/pagedown/pull/48)). In particular, my jaw dropped when I saw he reinvented the Chapman & Hall/CRC book style and the Journal of Statistical Software style with CSS. Epic magic! That was perfect timing for [my rstudio::conf(2019) talk](https://resources.rstudio.com/rstudio-conf-2019/pagedown-creating-beautiful-pdfs-with-r-markdown-and-css).

1. His debugging skills are amazing. Debugging requires extreme attention to details, which Romain has clearly manifested. I'm often surprised by his simple and elegant fixes to bugs that looked complicated in my eyes.

1. He is a very creative hacker and knows how to take advantage of existing tools to solve a hard problem in an novel way. [This Stack Overflow question](https://stackoverflow.com/q/50946083/559676) asked by Colin Fay (also an excellent hacker) and answered by Romain is a great example to show what an expert of WebSockets Romain is. I, for one, also love hacking the RStudio Viewer. The fact that the RStudio IDE is essentially a web browser can bring forward many fun possibilities.

1. He is exceptionally humble---so humble that I have to remind him a few times that his role is a co-author and I'm not qualified to lead him as the "[leading author](https://twitter.com/xieyihui/status/1110978126618771458)". Anyway, in the first few months of **pagedown**, he had always submitted his work via pull requests instead of pushing to the master branch directly (although I had granted him write access), to make sure he wouldn't break anything and had respected my coding style. That was both careful and considerate.

Somehow he also established a personal connection with the Paged.js developers, which turned out to be very important for the **pagedown** package, because sometimes bugs came from the Paged.js library and we could talk to Paged.js developers to get them fixed quickly. Apparently, both the Paged.js developers and the Shuttleworth Foundation noticed his talent soon. Later he was awarded a grant from the foundation.

## Romain's other contributions

Besides **pagedown**, I have seen Romain help me in several other Github repositories that I maintain, although I didn't ask him to. To be clear, I do need help, and always do. Below is an incomplete list of Github issues with which Romain has helped recently:

- [rstudio/bookdown#733](https://github.com/rstudio/bookdown/issues/733) (Margin/div bug when rendering gitbook). Multiple users had confirmed the bug, but I was too busy and lazy to install both Pandoc 2.7.2 and 2.7.3 to test it by myself. Romain did the vast majority of the debugging work, identified the root cause, and made it trivially easy for me to fix the issue.

- [rstudio/rmarkdown#1577](https://github.com/rstudio/rmarkdown/issues/1577) (HTML tabsets don't work with shiny runtime). Similarly, this bug was confirmed by multiple users. I suspected it was a really bad bug, but I didn't have a clue off the top of my head. I didn't know how long it would take me to figure it out. Romain carefully examined the problem, identified the cause, and submitted a perfect pull request [rstudio/rmarkdown#1587](https://github.com/rstudio/rmarkdown/pull/1587), in which he fixed not only the original issue but also two additional potential issues. His explanation and minimal examples were so clear.

- [rstudio/bookdown#683](https://github.com/rstudio/bookdown/issues/683) (MathJax info shown in references). This was a really weird bug in my eyes. I said I was able to reproduce it but didn't have time to fix it. Romain saw my reply and took a stab at it. He made a minimal reproducible example [rstudio/rmarkdown#1593](https://github.com/rstudio/rmarkdown/issues/1593), and submitted a simple fix [rstudio/rmarkdown#1594](https://github.com/rstudio/rmarkdown/pull/1594).

Romain's first pull request to packages that I maintain was [rstudio/rmarkdown#1243](https://github.com/rstudio/rmarkdown/pull/1243), created on Jan 14, 2018. I didn't know him back then, but the pull request showed his kindness to help and also his humbleness ("Sorry, I'm not a CSS expert!").

## Summary

To sum it up, Romain has exactly the skills that I don't have but definitely need, has a creative mind as a hacker, shares the same belief in the web, is able to sense my headache in Github issues, and often actively helps me in a way that really minimizes the work on my shoulders. I know he is [currently on vacation](https://github.com/rstudio/pagedown/issues/120#issuecomment-511243498), and probably won't see this post until three weeks later, but anyway, I want to thank him so much for being such a wonderful collaborator as well as all the help along the way!

![A wonderful collaborator](https://slides.yihui.org/gif/duiyou-4.gif)
