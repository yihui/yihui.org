---
title: 'Impact: Depth or Breadth?'
date: '2018-08-29'
slug: influence-depth-or-breadth
---

Last year someone invited me to give a talk to early career researchers at [an ISCB conference](https://iscbasc2018.com/early-career-researchers-day/) in Australia. I didn't go since it wouldn't be practical for me to travel that far in the next couple of years, but there was one thing I hoped to talk about if I were to talk to those early career researchers on choosing research topics (disclaimer: _I'm not a researcher_ so you probably shouldn't listen to me): whether you should pursue depth or breadth of the impact of your research.

My principle is depth first. The broad impact may be a natural by-product.

Actually [I briefly mentioned this](https://slides.yihui.org/2017-rstudio-conf-rmarkdown-Yihui-Xie.html#34) in an R Markdown tutorial I gave at rstudio::conf 2017. I said (as a software developer):

> Make one person extremely happy first. Do not aim at making everybody (even mildly) happy.

Of course, I'd love to see people excited about my software packages, but I prefer a small number of people (could even be only one person) feeling extremely excited over a large number of people only slightly nodding. A couple of recent examples:

- A while ago, Charles T. Gray discovered that `xaringan::inf_mr()` works on any Rmd documents (as I documented [in the R Markdown book](https://bookdown.org/yihui/rmarkdown/compile.html)). And [her excitement was still not over yesterday](https://twitter.com/cantabile/status/1034216497634131971) (which started [in December 2017](https://twitter.com/cantabile/status/947622766857150467)). I created the **xaringan** package in late 2016, but didn't mention the secret of `xaringan::inf_mr()` in public [until the August of 2017](/en/2017/08/why-xaringan-remark-js/). I knew it was a cool feature, and I use it all the time. I just want users to discover it slowly by themselves. I always feel highly motivated by the occasional ecstasy from individual users like Charles. This has been a sustainable source of power for me.

- Yesterday, [Zhian N. Kamvar discovered](https://twitter.com/ZKamvar/status/1034494397126197249) that the **tinytex** package can automatically install missing LaTeX packages when compiling LaTeX documents. Yeah, [I feel all your pain with LaTeX](/tinytex/pain/). Sometimes people are just comfortably numb with the pain (why do you have to waste time in installing LaTeX packages when this could largely be automated?). I love seeing the pain going away, little by little, and from [one user](https://twitter.com/nj_tierney/status/941126710602301441) after [another](https://github.com/yihui/tinytex/issues/7).

If you can impact a few people deeply, they will just shout from the rooftops for you. The breadth of the impact will be a matter of time, i.e., it will come eventually. You won't need to invest your own precious time in marketing. "No marketing" has been my own marketing strategy for years (I mean I usually avoid active marketing by myself, and I thank those who have been shouting out for me). That was a deliberate choice of mine. I trust the organic growth of impact, although I know it is slow, and sometimes unbearably slow. The impact two years later is worth waiting for. Looking ahead, two years sounds long, but looking back, it is nothing.

Needless to say, impact should not be your goal. Impact itself is also a by-product. It should be based on usefulness or helpfulness, which in turn depends on the "pain level" of an existing problem. The more painful a problem is, the more useful the solution will be. Note that such problems are not necessarily difficult to solve. Some problems are not terribly painful on their own, but if you run into them every day, they become super annoying, and will be worth fixing. For early career researchers, problems that are not too technically challenging yet frequently and mildly annoying may be good starting points of your career. It will be even better if there is such a problem that [deeply annoys yourself](https://twitter.com/mxcl/status/1006363200277942275), because your product, provided that you can work it out, will deeply impact yourself (e.g., significantly improving your own efficiency).

How many times have I mentioned that the **knitr** package was first created for myself to write my own homework at Iowa State more easily? And reproducible research... was not my goal back in 2011. To some extent, I was quite lucky.

Don't try to win the whole world in the beginning. Win one person (even yourself), and win him/her deeply. The world may follow later.
