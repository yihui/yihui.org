---
title: With Quarto Coming, is R Markdown Going Away? No.
date: '2022-04-29'
slug: quarto-r-markdown
---

So you have heard of [Quarto](https://quarto.org), a new tool based on Pandoc
for technical publishing. When you first see a `.qmd` document (Quarto), it
looks quite similar to an `.Rmd` document (R Markdown), which can easily confuse
R Markdown users. Questions can arise naturally: Why invent a new system? Why
cannot you just add the new features to the existing R Markdown ecosystem? Is R
Markdown going to be retired? I will share some thoughts in this post. For those
who prefer reading a shorter official FAQ, please visit [the Quarto
website](https://quarto.org/docs/faq/rmarkdown.html) and you can skip my post.

## Is R Markdown going away?

Let me answer the most important and urgent question first: R Markdown is not
going away. Rest assured that we will still actively maintain it. This is still
an important part of my job. That said, we will probably not try to backport
Quarto features into R Markdown (unless it is fairly straightforward and takes
little effort). That means it is unlikely that you will be too excited about a
certain future release of a package in the R Markdown ecosystem that we maintain
(I cannot say this for other package maintainers but only ourselves).

## Should you switch?

Should you switch to Quarto? Not necessarily. If you find R Markdown meets your
needs, you can definitely stay there. It is not imperative to switch. Quarto's
goal is to cover most features of R Markdown eventually, but it may be
impossible to become a strict superset of R Markdown. For example, it is by
design that each Quarto book chapter file is rendered in a new session (i.e.,
**bookdown**'s
[Knit-and-Merge](https://bookdown.org/yihui/bookdown/new-session.html)
approach), and there is no support for **bookdown**'s Merge-and-Knit approach.
This means if your later book chapter needs to reuse objects from a previous
chapter, you will have to come up with your own solution.

Speaking of my own work based on R Markdown, I do not have a plan to switch yet.
Personally, I'm most interested in the Quarto book format. I will try it if I
write a new book in the future. R Markdown and Quarto have a lot in common in
most output formats. I want to mention the two things that have distinct
foundations below: one is slides (**xaringan** is an outlier based on remark.js
instead of Pandoc), and the other is websites (**blogdown** is primarily based
on Hugo, and Pandoc can be optional). By comparison, Quarto is built exclusively
on top of Pandoc.

For slides, I will stay with **xaringan** because it is powerful enough to me
and I'm a minimalist. Quarto's revealjs presentation is amazingly powerful, but
most of the time all I need on my slides is really just a slide title plus a bullet
list. Actually I'm interested in creating a minimal presentation package that is
more lightweight and much less powerful than **xaringan**. Yes, [I still
want](https://bookdown.org/yihui/rmarkdown/xaringan.html) to create a
presentation package that will not accidentally become popular (if I fail this
time, I might just resort to presenting with a `.txt` file someday).

For blogs and websites, I'm impressed by the beauty of Quarto websites, but I
will definitely stay with **blogdown** myself (of course I'm biased). Following
the tips from `blogdown::check_site()`, you can almost be sure that your site
will remain stable for years. For example, I'm still using a rather old version
of Hugo (0.25.1), and it has been working well for five years. The theme does
not use any fancy or advanced technologies. Hugo's unbeatable speed is also
important to me because I have thousands of posts on this site. Continuous
deployment and PR preview with Github/Netlify/Vercel are awesome, mature, and
indispensable to me. Other than resisting the recurring urge to tweak CSS or
even change the theme, there is little I need to do in terms of maintaining the
site. I found Rakhim's webcomic below in 2020 and it resonated well with me.
That is, we tend to spend too much time on setting up a blog or learning or
teaching how to set up one, instead of choosing one tool, sitting down, and
writing for 10 years. My journey before Hugo was quite long, too (I had used
several PHP-based frameworks and Jekyll), and I think I have settled down since
2017.

[![Blogging vs. blog setups](https://rakhim.org/images/honestly-undefined/blogging.jpg)](https://rakhim.org/honestly-undefined/19/)

If you are a **distill** user, however, I think it makes more sense to switch to
Quarto (like [Danielle Navarro
did](https://blog.djnavarro.net/posts/2022-04-20_porting-to-quarto/)), since a
**distill** website is much more similar to a Quarto website. By comparison, a
Hugo site is usually much more flexible and complicated, and the theme can be
totally different, so you cannot just throw your source files into Quarto and
expect a similar site to be generated.

As a technical note, one nice thing about Quarto is that it is a single
self-contained binary like Hugo, so hopefully someday it will be supported by
Netlify or Vercel and we will get the same nice workflow like Hugo and other
static site generators. Similarly, since it is a single binary, it is possible
to pin your project to an older version of Quarto. This is often hard for other
software packages because they have other dependencies, which means you will
have to manage all the dependencies.

## Why invent a new tool instead of improving R Markdown?

When seeing a new tool, you may think of this [XKCD](https://xkcd.com/927/)
cartoon:

![Standards (xkcd)](https://imgs.xkcd.com/comics/standards_2x.png)

Yes, we have already got R Markdown and Jupyter. Both are great. Even though
both support multiple computing languages, I feel as if R Markdown's birth
certificate had a letter "R" stamped on it, and Jupyter had a "Python" stamp. It
may feel odd to tell Python users that they absolutely can run Python code in an
R Markdown document (and it is awesome that [Python and R can
interoperate](https://rstudio.github.io/reticulate/)), but... but they have to
install R in the first place in order to use... Python.

Quarto has made R optional to Jupyter users, and Python optional to R users. You
can [choose between the
two](https://quarto.org/docs/computations/execution-options.html#engine-binding)
(but have to choose one). For R users, Quarto uses the same backend as R
Markdown, i.e., the **knitr** package.

[![R Markdown workflow](https://bookdown.org/yihui/rmarkdown-cookbook/images/workflow.png)](https://bookdown.org/yihui/rmarkdown-cookbook/rmarkdown-process.html)

[![Quarto workflow](https://quarto.org/docs/get-started/hello/images/rstudio-qmd-how-it-works.png)](https://quarto.org/docs/faq/rmarkdown.html)

The main technical difference between Quarto and R Markdown is that Quarto makes
heavy use of Pandoc's Lua filters. One example is the implementation of figure
cross-references. I have to admit that I never liked my own implementation in
**bookdown**, which was hackish. That's why I have never ported this important
and useful feature back into **rmarkdown**. Using Lua filters to process the
Markdown document is more robust, and can make one feature available in multiple
output formats.

Another benefit of Quarto is that it tries to bring all nice things into one
software package. Well, I'm not sure if everyone would agree that this is a
benefit. Some people may prefer smaller pieces of software instead of a
monolithic package. In the current R Markdown ecosystem, you have to use a
dedicated package (sometimes among several competing packages) for a particular
task. If you have already been familiar with these individual packages, it is
totally fine that you continue to use them.

We have learned a lot from developing R Markdown, and I think it's great to let
a wider audience (e.g., the Jupyter community) benefit from our learning.[^1]
For this reason, it can be easier that Quarto is developed as a single package
instead of a dozen command-line utilities, because newcomers from other
communities would face less [paradox of
choice](https://en.wikipedia.org/wiki/The_Paradox_of_Choice).[^2]

[^1]: One example is [TinyTeX](/tinytex/) and the R package **tinytex**. Quarto
    has basically rewritten `tinytex::latexmk()` using TypeScript so that
    everyone can enjoy the benefits of this original R function.

[^2]: But is Quarto itself, as a new tool, contributing to the paradox? That
    sounds like a good question. I cannot really say no.

## Summary

Quarto is an attempt to generalize the R Markdown ecosystem, so that all useful
features for authoring and publishing technical content can be made available to
a larger world outside R. Quarto's heavy investment in Pandoc Lua filters means
that it is not tied to a specific backend that generates the `.md` (Markdown)
output file. In case a new tool (oh God, no thanks) like **knitr** and jupyter
is invented, Quarto can integrate with it, too.[^3]

[^3]: Quarto is mainly written in TypeScript, not R or Python.

At this point, I think the benefits for other communities to try Quarto are more
significant than R users. R Markdown will continue to exist and be maintained
(bug fixes and relatively small enhancements). I do not think R Markdown users
need to hurry to switch. Another thing that may give you some peace of mind
is that Quarto can render `.Rmd` documents without any modification, too, so you
can continue to write `.Rmd` instead of `.qmd`. If you like Quarto's rendering,
great. If not, the door is still wide open for you to come back.

Disclaimer: I have to admit that I'm far from a Quarto expert yet, although I
have been watching Quarto grow. My contribution to Quarto is still quite limited
(mainly from the **knitr** side). My thoughts here may not be accurate. When in
doubt, please consult the official documentation at <https://quarto.org>.
