---
title: I Don't Always Offer Bounties on StackOverflow. When I Do...
subtitle: I almost always offer the maximum 500 points. Let me explain why.
date: '2017-12-30'
slug: so-bounties
---

Reputation points (on which karma is based) is a common means to encourage users to contribute in online communities, such as web forums. Usually, the more points you earn, the more privileges you will have. Like many other people, I pursued these points in early years to win virtual awards / badges.

## The Stanford prison experiment

Eventually I gave up the pursuit after reading about the [Stanford prison experiment](https://en.wikipedia.org/wiki/Stanford_prison_experiment), because I observed something similar in people who have (extremely) high reputation points. I feel they often do not treat beginners fairly and tend to abuse their power. I guess this post is going to offend plenty of people, so I have to clarify first that I very much believe these people do not mean hostility. It is the power that corrupted their mind. They forgot the days when they were beginners, and sometimes use their power only because they can. They feel they just have to actively and constantly fight against beginners. This will lead to subtle changes in psychology as time goes by.

This is the only thing that bothers me deeply on StackOverflow. I absolutely love everything else about StackOverflow, and have benefited enormously from this site many times (yes, sometimes I also use [the "StackOverflow-Driven Development" model](https://twitter.com/thepracticaldev/status/705825638851149824)).

I have seen several times that people vote to close questions too quickly, and when I look at their profiles, they do not seem to be experts of any of the tags of the questions. For example, a `python` person may vote to close an `r` question when this person has made little contribution to questions tagged with `r` before (well, I know this does not mean he/she is not an R expert). While I broadly agree with Jeff Atwood on "[Optimizing for pearls, not sand](https://stackoverflow.blog/2011/06/13/optimizing-for-pearls-not-sand/)", I think when the idea is executed, it should put some limits on the power of people who vote to close questions, e.g., you must have made contributions to the tags before you can close a question with these tags.

## A recently closed question

Below is a recent example, in which I couldn't help ranting.

[![A StackOverflow question on hold](https://db.yihui.org/images/so-on-hold.png)](https://stackoverflow.com/q/47990152/559676)

Again, I believe the good intention of the people who voted to close the question. They want to keep StackOverflow free of bad questions. But... Among these five people, only one of them has answered one `bookdown` question before (which was not directly related to `bookdown` but `knitr` instead). One seems to be a Python expert, one is a Spark expert, and one is a PHP expert.

They closed the question because it was "unclear what you are asking". Of course, it was unclear to you: you probably don't use `bookdown`, and I doubt if any of you write Chinese in LaTeX. What really made me unhappy was that Andrew T, the poster, provided a minimal reproducible example, but it seems none of these people bothered to reproduce the issue, and closed the question in such a hurry. It is [so rare](/en/2017/10/501st-reminder/) for people to provide reproducible examples, so whenever I see a reproducible (and minimal!) example, joyful tears will roll down my face. Besides, Andrew also provided a screenshot to show the problem! That is also rare from beginners. I'd be 100% happy with such a question.

However, when I saw the question, it was already put on hold and I could not answer it, even though I happened to know the answer. FWIW, the question has been voted to be reopened (many thanks to those who voted), and I have posted my full answer.

## Kill my own reputation by offering big bounties

I hope to avoid the illusion of "reputation" or karma, and I prefer staying in the world of "beginners" without a lot of privileges. One thing I have been trying over the years is [to offer the maximum possible bounties](https://stackoverflow.com/users/559676/yihui-xie?tab=bounties&sort=offered) whenever I see good answers. That means I almost always offer 500 points. There were a few exceptions in my history. The 300-point one was because I didn't have a lot of points back then. The 50-point and 100-point ones were because I didn't have time to answer those questions, and I offered bounties only to help the posters to attract other people, such as this one:

[![50 points to attact people to answer the question](https://db.yihui.org/images/so-bounty.png)](https://stackoverflow.com/q/47840392/559676)

The poster asked me the same question [on Github](https://github.com/rstudio/bookdown/issues/499), and I was not very motivated by issues related to the Internet Explorer, so all I could do was offer the bounties on his StackOverflow question, and hope someone else could figure out a solution.

## Don't forget that there are no pearls without sand

While I can understand StackOverflow's aggressive closing of questions (thousands of poor questions appear every day), I think it should also build an encouraging culture to convert sand to pearls. Deleting and closing poor questions is one way to go, and converting is another. To repeat myself: don't forget the days when you were a beginner. There are two types of users: those who can be converted to great question askers, and those who cannot. My experience is that positive energy works better in the long run (e.g., encourage a beginner to improve the question), and negative energy works better in the short run (e.g., close a question right away to stop those who really do not care about asking questions in an effective way).

Basically it boils down the assumption you want to make about the beginners: do you think he/she has the potential to become a good asker? Sadly, I tend to believe the answer at the moment is "No" in most cases, which is why I said StackOverflow's position was understandable. However, I think there is also a chicken and egg problem here. We don't often see great question askers probably because not many people cared about cultivating beginners (instead, beginners feel hostility more often). Why don't we care? Because it takes a lot of time and patience, and oftentimes it does not work, so it is easy to give up and start pouring out negative energy (it is especially difficult to control temper when you are in a virtual world).

I know some people may argue that closing a question does not mean hostility. I can completely understand that, because I'm no longer a beginner. Again, think about the days when you were a beginner: when you ask a question, and it is closed after a few hours (the reason being "unclear what you are asking"), what would you think? I guess you feel either angry or shameful. It is not very possible to have any "positive" energy in your mind at this moment.

## A few crazy ideas

I think it will be great if StackOverflow can have these policies:

- Questions can only be closed by relevant users. Don't let users who have no clue about the tags close the question, even if they have high reputation.

- Give a 24 hour window to the poster to improve the question or explain why it is a valid question. Closing a question in 5 hours seems to be too soon in my opinion, unless the question is obvious spam.

- Require a written reason when users downvote a question or answer, or make it slightly more difficult to downvote than upvoting. This is because I believe most people won't feel comfortable with their questions or answers being downvoted. From my experience, people rarely explain why they downvote, and downvoting is a source of negative energy (leading to anger or shame). For example, an important figure in the R community, Carson Sievert, stopped contributing to StackOverflow a long time ago [after his answer was downvoted](https://twitter.com/cpsievert/status/936651099653787648). I'm very cautious about downvoting, and up to today, I have [downvoted one answer](https://stackoverflow.com/users/559676/yihui-xie?tab=votes&sort=downvote) in total (when I vote to close a question, most of time it is because it is a duplicate).

- Actually I wish StackOverflow could empty everyone's reputation annually, but this is certainly impossible. Most users would be mad to lose their precious virtual points.

Sometimes my 500-point bounties are awarded to people who do not have a lot of points yet, only to hope they can grow more quickly to help more people (such as [this one](https://stackoverflow.com/a/47292093/559676), [this one](https://stackoverflow.com/a/47109231/559676), and [this one](https://stackoverflow.com/a/46988443/559676)). Of course, I don't wish them to become prison officers someday. I'm not entirely sure if what I did was correct, although I had good intentions. Good intentions don't necessarily lead to good outcome.

P.S. If you think there are any answers worth bounties on StackOverflow, please let me know. I'll be more than happy to make the offers.
