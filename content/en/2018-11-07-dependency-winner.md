---
title: Winners Take All in the Dependency World (or Hell)
date: '2018-11-07'
slug: dependency-winner
---

Yesterday I read [a tweet on the marketing of software](https://twitter.com/sarah_edo/status/1059616001937960960), which encourages software engineers to promote their good software packages. It seems to be reasonable at the first glance. The problem, in my opinion, is that we are now living in this miserable age in which we are deeply manipulated by the [attention economy](https://en.wikipedia.org/wiki/Attention_economy).^[So deeply manipulated that [you don't even know it when one of your friends died](https://twitter.com/Hellchick/status/942863353403150336).] At the same time, there are just so many great software packages. As a result, marketing more or less depends on [how loud you can shout out](https://twitter.com/tslumley/status/950806599232192512) and whether you are able to keep raising your voice in a room that has already been fairly loud (or [using more emojis](https://twitter.com/JJ_Emerson/status/945830711503634432)).

That was one of the main reasons I have pretty much stopped marketing since a few years ago, at least on social media. The other reason is that I consider myself to be famous [enough](https://m.signalvnoise.com/enough-1d48019c7335), and people can hear me even if I'm just murmuring to myself in my own world (like what I'm doing right now). There is a problem (or side-effect) of being famous and influential: people tend to trust and use everything you do based on your past good track record. That is natural and understandable, because our brain tends to simplify the process of evaluation and judgement and avoid the effort of collecting more information for strict objectivity.

All software developers know the problem of the dependency hell: your package may be broken if any of your upstream packages is broken. The more packages you depend on, the higher the risk of breakage is.^[Speaking of the number of dependencies, I suddenly recalled the first time when I was surprised by the number. It was in 2010 when Barret Schloerke, who was an undergraduate at Iowa State at that time, presented an amazing package named [**helpr**](https://github.com/hadley/helpr). It was totally magic to me. When I tried to install it by myself, I was kind of terrified because R kept downloading other packages for a while and I thought something went wrong. That was the first time I had seen an R package could depend on more than ten other packages.] However, this definitely does not mean you should absolutely avoid dependencies. Not many people can live the [life in the woods](https://en.wikipedia.org/wiki/Walden) like Thoreau. The meaningful question is, what are the cost and gain of introducing a dependency?

Actually that is not what I want to talk about in this post. The dependency hell problem has been discussed many times by many people. The observation that I want to share here is that I discovered a phenomenon of "winners take all" in the world of dependencies. That is, if a package (or its author) is extremely famous, other users tend to depend on it unconditionally. I have seen such examples several times, and will give one below (with my apologies to Patrick Schratz and Miles McBain in advance---I don't mean to judge your code, but show how tempting it is to introduce dependencies).

Recently the cool hacker Patrick Schratz sent a pull request to **xaringan** to create PDFs from **xaringan** slides, in which he [initially introduced two dependencies](https://github.com/yihui/xaringan/pull/177#discussion_r227974726), **glue** and **PBSmodelling**. I could definitely see the advantages of **glue** (including the fact that it has [zero depedencies](https://github.com/jimhester/presentations/blob/26056248/2018_07_13-Glue_strings_to_data_with_glue/2018_03_28-Glue_string_to_data_with_glue.Rmd#L133)), but in this case, the feature introduced in the PR didn't seem to be essential to me (i.e., it is a "nice-to-have" feature). On the other hand, there is no essential gain by using `glue::glue()` instead of `sprintf()` or `paste()` in base R:

```r
function(p1, p2) {
  glue::glue("docker run ... {p1} {p2}"
}
```

It could be well written with `sprintf()`:

```r
function(p1, p2) {
  sprintf("docker run ... %s %s", p1, p2)
}
```

or `paste()`:^[I hope nobody will notice this footnote, but I actually wrote a function named [`knitr::knit_expand()`](https://cran.rstudio.com/web/packages/knitr/vignettes/knit_expand.html) in 2012, which has some similarities with `glue::glue()`, but using `knit_expand()` here is definitely an overkill, too. BTW, **knitr**'s dependencies are too heavy, which is one of the things I don't like about it, but some dependencies are [really hard to get rid of](https://github.com/yihui/knitr/pull/1552).]

```r
function(p1, p2) {
  paste("docker run ...", p1, p2)
}
```

The dependency on the **PBSmodelling** is even heavier with a marginal gain, which was not worth it in my eyes.

Yesterday Romain Lesur^[At some point this year or early next year, I will write a post about this amazing hacker. I don't usually collaborate substantially with other people, and made his acquaintance only recently, but he has been _the_ most wonderful collaborator with whom I have ever worked in my career on software projects.] told me a truly amazing package developed by Miles McBain. By "truly amazing", I mean it is the kind of packages that can make me sleepless at night (together with my one-year old). When I started looking at its source code, I saw it used `glue::glue()` [multiple times](https://github.com/MilesMcBain/chradle/blob/295705f12d3423010f5a454a03e064e19d0b7db2/R/chradle.R#L25). This case is actually better than the previous case, since at least the dependency has been used multiple times, and in my opinion, it demonstrated one benefit of `glue::glue()`, which is the human-readability of the string template, e.g., the readability of

```r
glue('The total is {total}.')
```

is better than

```r
sprintf('The total is %f.', total)
```

or

```r
paste0('The total is ', total, '.')
```

These examples are by no means to imply that **glue** should never be a dependency of any packages (apologies to my colleague and the author of **glue**, Jim Hester, if readers are misled by my post). Remember, I'm [a desiccated baseR-er](/en/2017/10/base-r-broman/), so the force on the other side must be strong enough to pull me over, and popularity is not a strong force to me.

So is "winners take all" truly bad? Actually I don't think so. Winners should be awarded (by more people depending on them). I don't think there is a solution to eliminate the side-effect of popularity.^[Yes, there exist problems that can be solved by simple linear regressions but some people always (ab)use deep learning or AI techniques anyway.] Overall I think the main effect is beneficial enough to most people, so that we can ignore the relatively minor side-effects. If you could stop and weigh the cost against the gain of every dependency you introduce, that will certainly be cool. If you don't bother, I think that's fine, too.
