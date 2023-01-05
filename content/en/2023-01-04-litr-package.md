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
