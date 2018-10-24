---
title: Rmd Files will No Longer be Rendered as Markdown on Github
date: '2018-10-19'
slug: rmd-github
---

Recently I requested Github to undo [the feature](https://github.com/github/markup/pull/343) of treating R Markdown as Markdown on Github, i.e., rendering R Markdown as if it were plain Markdown when you browse such files in a Github repo. I guess some users are going to hate me for this, so I want to explain the rationale in this post.

Four years ago, a couple of R users, [including Karthik](https://twitter.com/_inundata/status/510448862880727040), requested Github to add this feature. Since then, I have found it more bothersome than convenient, and [eventually thought it was a mistake](https://twitter.com/xieyihui/status/662332967532957700). There are rarely things that are absolutely good or bad. It is always about trade-offs. Rendering Rmd as Markdown has the one and only advantage: it makes the text of Rmd files more human-readable, because reading a rendered output file (an HTML page) is more pleasant than reading the (Rmd) source file.

The question is whether the disadvantages outweigh the advantage, and obviously I do think so. There are two drawbacks of rendering Rmd as Markdown on Github.

## R Markdown is not 100% Markdown

R Markdown is a source format, which looks like Markdown, but it is not equivalent to Markdown. The bottom line is that the source is the source. If it needs to be rendered (to HTML), it has to be rendered in the way that it is supposed to be rendered (via the R package [**rmarkdown**](https://rmarkdown.rstudio.com)). Rendering `*.Rmd` as `*.md` on Github loses critical information, which can be highly confusing. In particular, the code chunk headers are lost, and the chunk headers can be critical for the purpose of learning. For example, when you see a nice R Markdown output page somewhere, and you may want to know how it was generated. Then you go to the Github repo, open the `*.Rmd` source file, and you cannot see the full source code in the default normal view.

There have been people who struggled with trying to show other people the verbatim source Rmd file. One day I saw an instructor posted an Rmd example on Github, and tweeted about it with the Github raw link to the Rmd file. Then it seemed she was not happy with the raw link, because it pointed to a plain text page. Then she indented the whole content of the Rmd file by four spaces, which would make it easier for people to see the Rmd source from the normal Github view, but the Rmd source was essentially wrong. In short, between a nice view and the correct Rmd source, you could only choose one.

Later I emailed her and she told me her students were often confused, too:

> [...] that is sad! I was teaching R Markdown the other day with a github repository full of .Rmd solution files and someone pointed out that they don't get the solution precisely because of this! Quite a lot of people (especially beginners) don't know they can check "Raw" to see the raw content so it's quite a pity it's treated as a Markdown file now :(

I have many Rmd examples in the [knitr-examples](https://github.com/yihui/knitr-examples) repo, and I have always been worried that users don't know how to read the source of these Rmd files. The chunk options in these examples are vital in teaching them **knitr** features.

## Linking to specific lines of Rmd files

The other thing that deeply bothered me was that I could not link to specific lines in an Rmd file. For those who are familiar with Github, you know when you click the line numbers in a source file on Github, you can get a permanent link to a line or multiple lines like https://github.com/rstudio/blogdown/blob/44895dd/R/utils.R#L269. This feature is great because it saves you time to say something like "Hey, open the file `R/utils.R`, take a look at the line #269, and you'll learn a great thing". This is extremely useful for many purposes, such as teaching others a specific trick or reporting bugs. A simple link takes your audience to the specific destination. They don't need to clone or download your repo or follow the multiple-step instructions.

When Rmd is rendered as Markdown, I have to use a hack to obtain such links. That is, use the "Blame view" of the Rmd file. For example: https://github.com/yihui/xaringan/blame/master/inst/examples/lucy-demo.Rmd#L20. This view looks odd, because it also presents all commit messages in the history of this file in the left column. I don't know if beginners understand what "blame" means in GIT, or are aware of the "Blame" button.

## Apologies, and a solution to a new problem

Before requesting Github to undo this feature, I reached out to a few people who were originally happy with the feature, including Karthik. ~~I threatened them that we would no longer be friends if they would not allow me to contact Github to revert the change. Just kidding. I didn't do that.~~ They all agreed that displaying Rmd files verbatim rather than rendering them to HTML was a better idea. However, I understand that whenever something has an advantage, there will be a number of users feeling annoyed if it is gone. Please accept my sincere apologies you are one of these users.

Displaying Rmd verbatim on Github does bring one annoying disadvantage: (at least for now) Github does not soft-wrap lines in source files, so you'll have to use the horizontal scrollbar when the lines are too long. Yes, horizontal scrollbars on web pages are terrible! However, this problem is much easier to solve. We don't have to contact Github ([actually I have contacted them](https://github.com/github/markup/pull/1235)). If you hate anything related to CSS styles on the web, I'd recommend that you install a plugin or extension in your web browser and change the CSS by yourself. For example, I have installed the extension [Stylebot](https://chrome.google.com/webstore/detail/stylebot/oiaejidbmkiecgbjeifoejpgmdaleoha) in Google Chrome long time ago (there may be better and newer extensions now), and I have applied the following CSS to github.com:

```css
.type-rmarkdown .blob-code-inner {
  white-space: pre-wrap;
}
```

If you have installed Stylebot, you can click its icon (CSS) after opening any Github web pages, hit the "Edit CSS" button, and paste the above CSS code in it.

![Before applying the CSS in Stylebot](https://user-images.githubusercontent.com/163582/47231527-bcbd2b00-d392-11e8-8a77-193dc74a1d58.png#border)

Then you'll see the long lines nicely wrapped in Rmd files:

![After applying the CSS in Stylebot](https://user-images.githubusercontent.com/163582/47231528-bcbd2b00-d392-11e8-82df-a72f11dc1c29.png#border)

I hope I didn't hurt you too much by asking for this change on Github. If I have brought any unexpected annoyance, please feel free to let me know, and I'll try my best to make it up. Thanks for your understanding!
