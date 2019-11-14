---
title: 'Structural Equation Modeling: Where Are Advantages?'
date: '2008-01-11'
slug: structural-equation-modeling-where-are-advantages
---

![SEM spaghette](https://db.yihui.org/space/spaghette.gif)

Personally I don't believe structural equation models (SEM) at all. I have been fighting against this modeling technique for quite a long time, but it seems that SEM is becoming more and more popular _outside_ the discipline of statistics. It's indeed strange. Yesterday I received an email asking me about the SEM, and I listed some reasons for my objection to such a kind of modeling in my reply as follows:

> Hi,
>
> The most obvious disadvantage, I believe, just lies in the critical modeling technique it adopted at the beginning: constructing models to fit the sample COVARIANCE instead of the sample values themselves. I insist that such an idea has almost destroyed our valuable data. You know, the covariance is just one of the TOO MANY characteristics of the data, therefore if we only focus on this simple information (covariance), other information will be dropped (e.g. mean, kurtosis, skewness, ...). And a very natural question is, what does the covariance stand for? Can it represent all of the original information? The answer is certainly NO!
>
> The second disadvantage in my eyes is the complexity of this model. In statistics, rarely have I ever met models more complex than SEMs. Even the simplest SEMs will include tens of parameters, as there are several parameter matrices in a SEM. The direct consequence it brings is the computational complexity. You can easily calculate the minimum of f(x)=x^2+1, but do you know how to calculate the minimum of `f(a, b, c, d, e, f, g, ...) = a * b^4 / (2 * c + d^14 * a) - f / g * c^d + ...`? Actually the target function for SEM to optimize is much more complex than this one! It involves with the multiplication, inverse and determinant of huge matrices... Just tell me, can you trust the software to correctly find the GLOBAL optimum for such a complex function? Personally I cannot, as I know there are too many "stories" behind this problem. It's very likely that your software only tells you a LOCAL optimum WITHOUT warnings.
>
> The third reason comes from a philosophy: you may regard SEM simply as a process of hypothesis testing. I think you surely know the null hypothesis. In the end, you can ONLY REJECT your model but you can NEVER accept it (or say, ah, my model is correct!). In other words, you can never find the truth, although there are many measures (Chi-square, GFI, ...) to tell you how "good" you models are. The basic philosophy of hypothesis testing in statistics is that null hypothesis can only be rejected (because in most cases you can only know the risk of rejecting; you cannot know the risk of accepting it). If we are unable to accept a SEM, why bother to construct it? (If you declare this SEM is correct, other people can naturally doubt whether there are other alternative models.)
>
> I spent about only half a year on SEM, so my words might be incorrect. My advice is never believe anyone (including me) unless you really understand it, especially the mathematical and statistical theories! I really hate those textbooks avoiding maths, because to some degree, they are just cheating the readers by hiding the most important part of a technique.
>
> There are still a couple of reasons but I don't have enough time to list all of them out here.
>
> You may judge from my above words that I have been fighting against this model for quite a long time. Once a statistician said, "All models are wrong, but some models are useful", and I'd like to say that SEM is surely not among these "some models". I'd be very glad to hear from you about the "successful" applications of SEM if you have any cases in this aspect. I've inquired such cases of many people who wrote me emails asking about the SEM but I have not got any till today, which ensured me even more of my impression that SEM is a useless technique.
>
> Regards,
> Yihui

