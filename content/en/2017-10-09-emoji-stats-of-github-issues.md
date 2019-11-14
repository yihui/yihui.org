---
title: Emoji Stats of Github Issues?
date: '2017-10-09'
slug: emoji-stats-of-github-issues
---

As I'm triaging more Github issues of the **rmarkdown** repo, I came across [a reply under rstudio/rmarkdown#1020](https://github.com/rstudio/rmarkdown/issues/1020#issuecomment-320504839) that was upvoted 22 times, which surprised me. I don't see this very often. Most of time I see only a couple of upvotes. I'm glad that so many people love the idea of rendering R Markdown notebooks on Github like Jupyter notebooks. We are at the mercy of Github, of course. Someone working for Github has to work with us for this to come true. So far we haven't got a response yet.

Anyway, that is not the topic I'm trying to write about in this post. I'm wondering if anyone has used the Github API to obtain statistics of emoji's in Github issues. I'm asking because we don't get notifications when users add reactions to Github issues. We have no idea about which issues users liked or disliked most.

I'd like to provide the Github repo name, and get the summary statistics of _reactions_^[Note I don't mean emoji characters used in text, but reactions only. Currently Github has only provided six possible reactions.] on Github issues (including those on replies). It is probably not that difficult (the [Github API](https://developer.github.com/v3/issues/) looks clear enough to me but I don't have the time). Anyone to help?

![Waiting for help](https://slides.yihui.org/gif/questions.gif)

> **Update on 2017/11/16**: Yang has prepared a [Github repo](https://github.com/yiluheihei/github_issues_reactions), and it worked well for me. Thanks, Yang!
