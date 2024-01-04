---
title: Bye, RStudio/Posit!
subtitle: After writing all these "*down" packages for these years, here I am to announce "Yihui-down"
date: '2024-01-03'
slug: bye-rstudio
---

Who is down? Me. After more than 10 years at RStudio/Posit, the time has come
for me to explore other opportunities. A little over two weeks ago, I was told
that I was laid off and my last day would be 2023-12-31. Frankly speaking, I was
quite surprised but only for a short moment. I fully respected Posit's decision,
and quickly accepted the conclusion that my contribution no longer deserved a
full-time job here. The end of a relationship often does not imply anything
wrong or a failure of either party. Instead, it can simply indicate a mismatch,
which is normal. People just change. With these amazing years in mind, I left
mostly with gratitude in my heart.

``` r
# number of days I worked at RStudio/Posit
as.Date('2023-12-31') - as.Date('2013-08-26') + 1
```

Anyway, I guess this news may surprise some people in the R community and bring
up questions or puzzles, so I want to write a blog post to address a few
potential questions. If you have more, please feel free to ask me either by
comments below or by email.

## Acknowledgments

Despite the separation, I hold and value a lot of good memories about RStudio,
which I could easily expand into another lengthy blog post, but I will save it
for now since I got sick last week and am still recovering. In short, I would
like to thank [JJ](https://www.linkedin.com/in/jjallaire/) for offering me my
first ever full-time job and trusting me for so many years. I thank
[Joe](https://www.linkedin.com/in/jcheng/) and
[Tareef](https://www.linkedin.com/in/tareefk/) for the long-time mentorship (as
well as friendship, I should say). I thank [Hadley](https://github.com/hadley)
particularly for the guidance on the **bookdown** project from 2015 to 2016. I
cannot say how much I appreciate [Christophe](https://github.com/cderv)'s help
over the years (even a few years before he joined RStudio).

Really, there are too many people that I want to thank in the past ten years.
Okay, I will write another post on this in the future after I settle down. As
always, I am deeply grateful to the entire R and open source community for their
belief and investment in the tools that I have been fortunate to work on.

## No, those R packages will not be orphaned

At Posit, I felt blessed to work with super talented and committed engineers,
and I believe that our collective work (in particular, [R
Markdown](https://bookdown.org/yihui/rmarkdown/)) has helped make R and
reproducible research more accessible to the community and hopefully to the
world as a whole.

After my departure from Posit, we are not going to drop these efforts. Posit has
generously provided funding for me to continue, as a contractor, to support and
extend **knitr**, **rmarkdown**, and various packages in this ecosystem. I look
forward to continuing my collaboration with the Posit team on our shared areas
of interest.

So please do not panic---our existing R packages will still be maintained. The
only exception is the **DT** package, which is not included in the contract, and
Posit plans to find a new maintainer for it. Before that happens, I might still
be able to help (time permitting), but I cannot promise.

## A minimalist has been growing inside me

Over the past three years, I have spent more time thinking and exploring a
different approach to building software that is more minimalist and handcrafted
than the larger projects like Shiny and Quarto, on which Posit is currently
focused. I have become more interested in developing smaller software tools that
do fewer things.

To a large extent, I'm leaning towards the "Less is More" or "[Worse is
Better](https://en.wikipedia.org/wiki/Worse_is_better)" philosophy, and I find
[stoicism](https://en.wikipedia.org/wiki/Stoicism) and the
[wabi-sabi](https://en.wikipedia.org/wiki/Wabi-sabi) concept very appealing. I
do not mean my choice is correct or better. All choices are about a series of
tradeoffs. I just happen to find a certain choice fits me better. Will I stick
to it forever? I do not know.

This philosophical change of mine is not only about software development, but
also my daily life. As a result, many friends find it hard to understand me when
I ask them not to bring anything but an empty stomach when visiting me---perhaps
someone who has visited me before can confirm it in the comments below.

## What's next?

Since I'm no longer a Posit employee, I'm facing some uncertainties now. I need
to learn and figure out a few things that are new to me before I can come back
to work again. Hopefully this will not take more than a couple of weeks.

The contract work I mentioned above is not enough for me to make a living (well,
definitely enough for this minimalist guy but not for the family), so I'm also
looking for opportunities that will give me the freedom and flexibility to
continue to contribute to the R ecosystem and open source in general. If anyone
has a job opening or is interested in my skills, I will be happy to chat, and
please feel free to email me.

For now, I have not decided yet whether I want to take a full-time job next or
just take this chance to become an independent contractor. It depends on the
opportunities that I can get in the next few months.

I have never asked for financial support from the community before, because I
have never felt the need (thanks to Posit). Now the situation has become
different, and I'm a little concerned about the mortgage number in my account.
For the first time, I'm mentioning my Github sponsorship page in my blog:
<https://github.com/sponsors/yihui>. I will be very grateful if anyone could
support me for a few months before I transition into the next stable phase of
life. I will notify you when I do not need the sponsorship any more so you can
cancel it if you are on a monthly tier. I will be happy to offer some casual
help in return just as tiny side jobs. For example:

-   Answer your questions (technical or non-technical);

-   Help you optimize your website, or more importantly, cultivate a habit of
    writing so you can keep writing for the years to come;

-   Advise on how to make your presentation entertaining (but I refuse to sell
    my precious 20-year old GIF collections);

-   Share my experience on cooking, gardening, badminton, or even setting up a
    simple Karaoke system at home (now you are highly skeptical if this
    so-called minimalist gentleman is genuine);

-   As a "down" expert, write a letter to cheer you up if you are down for some
    reason (since the pandemic, I seem to have become much better at writing
    letters).

[We don't say goodbye](https://youtu.be/WdYaGt_sm3Q). So actually this is not a
"bye" to anyone, but a "hi" to an unknown new journey. I have enjoyed the past
decade, and I'm in full curiosity about the future.
