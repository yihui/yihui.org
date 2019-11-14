---
title: Make the Right / Positive Things Easier to Do than Wrong / Negative Things
subtitle: A thought on making Stack Overflow more welcoming
date: '2018-05-02'
slug: right-easier-than-wrong
---

Last week I saw a fantastic post written by Jay Hanlon from Stack Overflow titled "[Stack Overflow Isn't Very Welcoming. It's Time for That to Change](https://stackoverflow.blog/2018/04/26/stack-overflow-isnt-very-welcoming-its-time-for-that-to-change/)". I wanted to stand up in front of my computer and applaud for five minutes after reading this post. It is great that Stack Overflow was admitting the problem publicly and showing the intention to fix it.

First of all, I should make it clear that I do love Stack Overflow, use it almost every day, and truly appreciate its value, despite of my previous rants. I ranted just because I care a lot about this site and I wish it continued success for a really long time.

## The two sides

In this post, I want to share a single thought on how to make Stack Overflow more welcoming, which I feel is ignored in the current design / model of Stack Overflow. That is, so far it has been almost equally easy to make Stack Overflow welcoming and unwelcoming. I think this is problematic.

## Upvoting vs downvoting, and voting to close questions

Take voting for example. Upvoting and downvoting are equally easy, but the levels of love and hurt felt are definitely not the same. It hurts much more after your question/answer is downvoted than how much you feel encouraged after you get an upvote, probably because of the pain of losing something is more overwhelming than the joy of gaining something. A downvote on Stack Overflow is pretty much like someone gives you a thumbs-down in public. It could cause shame or anger. A downvote without an explanation is even worse. I'd suggest that downvoting must be accompanied with explanations.

Putting questions on hold has the same problem. It takes the equal number of people (five) to vote to close/hold and open a question. Requiring more people to vote to close a question than re-opening a question may be a better idea. If that does not sound fair, I think it definitely makes sense to at least require evidence of expertise before a user can vote to close a question. For example, if you have never answered a single question related to any of the tags of the current question, you should not be eligible to close a question. Currently anyone can vote to close any questions, which was the main reason of my previous rants ([first one](/en/2017/12/so-bounties/), [second one](/en/2018/02/closed-so-question/)). In these cases, I don't believe they really knew what they were doing when they voted to close a question (they might be really kind people trying to help Stack Overflow, but the outcome was really bad). I even believe some people just blindly follow other people to vote. To prevent this kind of blind voting, Stack Overflow should let users vote _independently_, i.e., do not show previous votes. I believe if five users independently voted to close a question, there is a much higher chance that it is a truly bad question or simply spam.

## Feelings matter

Building a welcoming online community without losing the quality is definitely not easy, especially for a community of the scale of Stack Overflow. I have been running a Q&A web forum for more than ten years. I have seen many times how moderators unintentionally treat beginners poorly, although these moderators have contributed a lot in the past and are often helpful. Many people just forget what it feels like to be a beginner after they become experts. When they make you feel the hostility, they may not really mean it. However, as Jay wrote in his post:

> [...] Feelings have no "technically correct." They're just what the feeler is telling you. When someone tells you how they feel,  you can pack up your magnifying glass and clue kit, cuz that's the answer. You're done. And a lot of devs feel like Stack Overflow is an intimidating, unwelcoming place. We know because they tell us.

No matter what you really mean, if users have got the bad feelings, there is a problem. I don't think [a $10,000 challenge to prove the Stack Overflow toxicity](https://medium.com/dunder-data/10-000-stack-overflow-toxicity-challenge-75951a739993) makes much sense (but this is really another topic).

## Easy but wrong, vs harder but correct

I'm going to finish this post with a recent example to illustrate the point of "people tend to avoid doing the right things if they are harder, and will do wrong things if they are easier." Five users have voted to close the recent post "[Graphs don't show when Rmarkdown posted to blogdown on shiny server](https://stackoverflow.com/q/50084663/559676)". Let me show you what it looks like when it was first posted:

![No one bothers to edit the post](https://db.yihui.org/images/so-no-edit.png#border)

The OP, Rain Wei, was apparently a completely beginner on Stack Overflow. His (apologies if I guessed the gender wrong) reputation point was one. What happened to this post in two hours?

1. Someone (not the one who first commented) downvoted it, without an explanation.

1. Five people voted to close it, and they succeeded. I encourage you to look at the profile pages of these five people, and will let you judge whether they are experts of Shiny Server or **blogdown**.

Actually these are not the main problem I want to mention. The main problem is, one person downvoted the question, five people voted to close the question, but... but none of them bothered to edit the post to show the images! Why is that? My guess is _voting is much easier than editing a post_. However, the question would be much clearer, had anyone with the editing privilege edited it, because these screenshots were actually very informative!

For those who are not familiar with Stack Overflow, users with only one reputation point cannot post images. That is why the OP could not show the images. The post had been viewed more than 20 times before I saw it, yet no one wanted to help. I edited the post (twice, because the OP, as a beginner, overrode my first revision) to show the images. How much effort it really is? Adding four exclamation marks (turn `[]()` to `![]()`).

I think it is a valid question after the screenshots are displayed (so I upvoted it), but it will require substantial expertise about Shiny Server to answer the question. I doubt it will ever be answered, but I don't think it should be closed.

## An old but relevant thought about reproducible research

Well, an old thought just came to my mind, so I decided to add another section. I think everyone will agree that reproducible research is a great idea and the right thing to do, even twenty years ago. Knuth invented literate programming in 1984, which happened to be a really nice foundation for reproducible research (probably not what he expected). However, I have always believed it is not wise to tie the implementation to TeX/LaTeX when it comes to writing reproducible reports (especially for data analysis). Reproducible research is the correct thing to do, but LaTeX is relatively hard. To make reproducible research easier and more popular, we have to choose a popular authoring format, which should not be LaTeX. I'm not saying LaTeX is bad. It can be a great tool for experts. I just don't think it is worth the time when your goal is sharing knowledge instead of typesetting. Obviously you all know I'm implying Markdown is a better choice for average users. Markdown is a weak language, but it makes the right thing, reproducible research, easier (and sometimes even enjoyable) to do than the wrong thing (point-and-click and/or cut-and-paste data analysis). That's it.
