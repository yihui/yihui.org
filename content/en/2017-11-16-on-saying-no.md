---
title: On Saying No
subtitle: It is hard, but...
date: '2017-11-16'
slug: on-saying-no
---

A couple of years ago, I read the book [_Rework_](https://37signals.com/rework) by Jason Fried and DHH. I have forgotten most of the essays in the book, but I still remember "Say no by default". To be honest, it is just damn hard. Every time I say no, it hurts me, because I feel I'm hurting other people.

The only way to make myself a little more comfortable is to think about how many times other people have said no to me, but I was actually fine and could live with it (being refused was not the end of the world or even no big deal at all). Of course, it is sad that I have to use this method.

## I'm not alone

I'm certainly not the only person who does not have enough courage to say no. [Karl Broman also had the trouble](https://twitter.com/xieyihui/status/805898395231617024). In the past, I made a lot of promises on new responsibilities by saying yes, but failed to keep them in the end. One of them in 2015 made me felt extremely guilty, and I still feel ashamed about it today.

## Saying no as a software developer

Very occasionally I even feel confused whether it is a fortune or misfortune that many people use software packages I developed, when there are just endless new feature requests, and I can never [finish a project](http://250bpm.com/blog:50). The bad consequence is that I can never truly focus on my next new exciting project, and old projects keep dragging me back. I guess that is normal, though. Not many software projects can be really "finished".

![too many feature requests](https://slides.yihui.org/gif/cat-hands.gif)

On a bright day last year, I took a deep breath and showed Karl a few examples of me saying no, hoping myself to remember the courage.

- [Say no to a responsibility that should not be mine.](https://github.com/yihui/knitr/issues/1322) Amelia wanted **knitr** to check if she had git merge conflicts and warn her if she did. It was easy to say no in this case, because it was not something that **knitr** is supposed to do. I was not convinced that my warning would be louder than git's. I hope she enjoyed the GIFs and happily walked away.

- [Say no to LaTeX-specific features.](https://github.com/rstudio/bookdown/issues/259) I'm reasonably familiar with LaTeX, but LaTeX features are my least favorite. I love the PDF output from LaTeX, but sometimes I believe LaTeX's emphasis on typesetting has ruined the writing itself, and makes us forget what our real job should be, i.e., am I an author or a typesetter? If you find yourself worry too much about LaTeX in the R Markdown world, it will be an unfortunate failure of R Markdown.

- [Say no when I feel the package is going to become complex](https://github.com/rstudio/bookdown/issues/238) (also see [this example](https://github.com/rstudio/bookdown/issues/251)). As mentioned in the Zen of Python, [simple is better than complex.](https://en.wikipedia.org/wiki/Zen_of_Python). I can definitely see the usefulness of such new features, but I need to weigh the benefits against the cost. It won't make any sense if **bookdown** turns out to be "yet another LaTeX system" someday. I have to refuse some features, and the hard question is where/when to stop.

- [Say no when users can implement it at least as easily as me.](https://github.com/rstudio/rmarkdown/issues/1204) This time it was Jenny (aka "the single one person whom thou shall follow if thou newly joined Twitter"), and saying no was much harder because she is my colleague. I had to carefully think about the feature request, and explain why I wouldn't do it. Basically, the door is not closed, and users can easily achieve what they want without me officially supporting this new feature. She closed the issue after reading my arguments, although I was not sure if I should feel relieved or nervous.

- [Say no to cosmetic changes, especially when such changes can cause deeper problems.](https://github.com/rstudio/rmarkdown/issues/1205) In **rmarkdown** 1.7, I [changed](https://github.com/rstudio/rmarkdown/pull/1169) the meaning of `keep_md: true` (so that it does what its documentation says), but it introduced a cosmetic issue with the intermediate Markdown files on Github reported by my colleague (again) Mine. I thought about the two sides of the coin: the current behavior of `keep_md: true` only causes a cosmetic problem (if it is a problem at all), but the original behavior means the Markdown files are not the faithful output files from R Markdown. That can cause more serious problems, e.g., users just cannot keep fields other than `title`, `author`, and `date` in YAML. I think this consequence is more serious than the cosmetic issue to a specific Markdown vendor Github.

It is easy and very tempting to say yes, but the potential cost is unclear and sometimes unpredictable. You could end up with being "the good and helpful guy" in everybody's eyes, while leading a miserably busy life by yourself.

Do I wish myself to be helpful? Of course I do, and I have been trying hard (sometimes desperately hard) to be helpful, but on the other hand, I don't want my life to be completely defined by other people's requests. I only have 24 hours a day like everyone else, which means I must make decisions on priorities, and some requests have to be refused.

## Come to the dark side

Me: Say yes.

Me to me: How about saying no?

![the dark side of me](https://slides.yihui.org/images/me-to-me.jpg)
