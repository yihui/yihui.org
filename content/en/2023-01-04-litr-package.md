---
title: 'litr: Write an R Package Entirely with an R Markdown Document'
date: '2023-01-04'
slug: litr-package
---

A few months ago I came across a package named **litr**, which seemed quite
interesting to me. It allows you to create a whole R package by rendering a
single R Markdown document. That means you get a package after you click the
`Knit` button in RStudio. I was interested because I had a similar idea and a
proof-of-concept (i.e., [the **rlp** package)](/rlp/) in 2014, which was also
mentioned in [the documentation of
**litr**](https://faculty.marshall.usc.edu/jacob-bien/litr/docs/). I'm happy
that the authors of **litr** have taken a further step to make a solid
implementation!

I saw the talk announcement of Jacob Bien (the main author of **litr**) in
October last year in the statistical graphics group at Iowa State, marked it on
my calendar, but missed it unfortunately on that day. Jacob didn't know that I
was still lurking in the group (I was still subscribed to their mailing list),
and kindly emailed me later about this package, together with the slides of his
talk.

I have said enough about the advantages of this approach on the [**rlp**](/rlp/)
page, so I'm not repeating here. If you intend to document/explain your code
extensively when writing a package, you may give
[**litr**](https://github.com/jacobbien/litr-project) a try.

P.S. While reading **litr**'s documentation, I discovered a person named Matt
Pharr since Jacob mentioned the Academy award. I've never heard of him before,
but it's funny to know that we had similar sentiments about Twitter in 2017
([his post](https://pharr.org/matt/blog/2017/12/29/goodbye-twitter),
[mine](/en/2017/12/twitter-shaped-us/), and
[mine](/en/2017/08/twitter-threads-vs-blogging/)).

P.P.S. I remember there was another R package that did the similar thing but my
google search failed me. Later I learned that it was **fusen**:
<https://thinkr-open.github.io/fusen/> (nice job, Sébastien Rochette!)
