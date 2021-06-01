---
title: 'blogdown: Knit on Save, or Save on Knit?'
date: '2021-05-30'
slug: blogdown-knit-save
---

One of the hardest decisions in **blogdown** that I had to make was whether to
make "Knit on Save" or "Save on Knit" the default behavior. I chose the former,
to which everyone seemed to object. In this post, I will explain my rationale.

Before I start, I want to take this opportunity to
[reemphasize](https://blog.rstudio.com/2021/01/18/blogdown-v1.0/) the most
important thing to remember about **blogdown**, even if it is irrelevant to this
post: [**when in doubt, run
`blogdown::check_site()`!**](https://bookdown.org/yihui/blogdown/a-quick-example.html#when-in-doubt-run-blogdowncheck_site)
I'll save this for another blog post in the future, but it is so important that
I [repeat it
everywhere](https://twitter.com/xieyihui/status/1397321215694540801) this year.
If you still experience any major pain with **blogdown** (e.g., the Hugo version
pain) and `blogdown::check_site()` does not help you fix it, I will be happy to
write you a check. Seriously.

## Knit on Save, and Save on Knit---What do they mean?

When you edit an R Markdown post in a **blogdown** site project, "Knit on Save"
means blogdown will automatically (re)compile your post as soon as you save the
post, and "Save on Knit" means your R Markdown post is saved (and also knitted)
as soon as you click on the Knit button in RStudio.

Before I explain the rationale, let me emphasize that the default behavior can
be easily changed via a global option `blogdown.knit.on_save`. If you do not
like the current default behavior, you can set this option to `FALSE`. Please
see the Section "[Global
options](https://bookdown.org/yihui/blogdown/global-options.html)" in the
**blogdown** book for details.

## 1. Backward compatibility

The Knit button in RStudio never worked for **blogdown** until
[v0.21](https://github.com/rstudio/blogdown/releases/tag/v0.21). That means the
alternative option "Save on Knit" was not really available in the three years,
and users had to use "Knit on Save," which was not good, but I thought I had no
choice until I was told that the Knit button could work. I was well aware of
this problem and wished that the Knit button could work from the beginning of
**blogdown**. I asked the question back then, but did not push hard enough.
Three years later I asked again, and it turned out the problem was simple enough
to fix.

The good news made me struggle on whether the default behavior should be
changed. Every team member suggested that it should, but I was worried about
backward compatibility. I really did not know if I would be killed sooner by
users who found that the Knit button suddenly started working (because I made
them wait for so long), or users who found that the Save button suddenly stopped
working (because I had trained them for so long).

## 2. Consideration of non-RStudio users

I did not want to assume or recommend that everyone uses RStudio. If you do not
use RStudio, you do not have the Knit button to click on. In this case, your
only option is probably "Knit on Save," because every text editor must have a
Save button (or a keyboard shortcut) to save a file. Well, that is not really
the only option, but you would have to run
`blogdown::build_site(build_rmd = "path/to/post.Rmd")` over and over again in R,
which is a tedious task.

## 3. Clicking on the Knit button works now

Even with the default "Knit on Save," the Knit button actually still works fine
if you click on the Knit button. More importantly, if you have not set the
option `blogdown.knit.on_save`, this option will be automatically set to `FALSE`
when you click on the Knit button for the first time, with a message in the
console telling you why it was set to `FALSE`. The option is set only
temporarily for the current R session, and the message also tells you how to set
it permanently for future R sessions if you really mean to only use the Knit
button to compile R Markdown posts. With this option set to `FALSE`, your R
Markdown post will no longer be automatically compiled when you save the post.
That means when you click on the Knit button, we guess that you are probably a
"Knit person" and set the right option for you. This guess may not always be
correct, but again, the message should explain the situation, and the guess only
takes place when you have not already set the option by yourself.

## 4. Consistent behavior with `.md` posts

Thanks to Hugo's LiveReload feature, you can live preview Markdown posts (`.md`
files) as soon as you save them, i.e., "Preview on Save." It is unnecessary to
click on the Knit button to preview `.md` posts. If you click on the button
anyway, it does nothing behind the scenes in addition to saving the post. Once
the `.md` post is saved, Hugo will show you the preview almost instantly.
Choosing "Knit on Save" as the default in **blogdown** makes the authoring
experience consistent between `.Rmd` and `.md` posts.

Note that **blogdown**'s default post type is `.md` (which can also be easily
changed to `.Rmd` via [the global option
`blogdown.ext`](https://bookdown.org/yihui/blogdown/global-options.html)). I
have found for several times that people use `.Rmd` even when they do not have
any R code chunks in the post, or have a few R code chunks but all are marked
with the option `eval = FALSE` (i.e., no code chunks are to be evaluated). In
these cases, it will be much cleaner and faster to use `.md` instead. I guess
I'm not a typical user of **blogdown** myself, because I rarely write `.Rmd`
posts. I'm too used to "Preview on Save."

## Downsides of "Knit on Save" as the default behavior

The default behavior may not be desirable to a lot of users, but again, it is
fairly easy to change via a global option. The main downsides of this behavior
are:

-   Users may feel deprived of the freedom to decide exactly when to compile the
    post. By comparison, the "Save on Knit" mode offers this freedom.

-   When a post contains time-consuming chunks, it is often undesirable for the
    compilation to occur automatically when the post is saved. This is also true
    for code chunks that are still incomplete.

For the first one, I cannot defend myself. For the second one, I wonder how
common it is for an average blog post to contain intensive computing (probably
not very common), but I understand that it could be annoying that **blogdown**
starts to compile the post when a code chunk is still being developed.

## Conclusion (or no conclusion)

As I said in the beginning, this was a hard decision to make. Even to this
point, I'm not totally sure I should change the behavior. If **blogdown** were
less than one year old, I would change it without much hesitation. Now I just
wish users who have had to set `options(blogdown.knit.on_save = FALSE` in their
`.Rprofile` could forgive me for this hassle...
