---
title: Self-contained xaringan Slides
subtitle: A Four-year Old Feature Request
date: '2021-06-01'
slug: self-contained-xaringan
---

Colin and Jared were [talking about the LaTeX
headache](https://twitter.com/jaredlander/status/1308156166204198912) on
Twitter. I was surprised because the problem of missing LaTeX packages was still
bothering them. In particular, the **inconsolata** package had been bundled into
[TinyTeX](/tinytex/). Why did they still run into that problem?

It is understandable that it could be too scary for Jared to switch a LaTeX
distribution such as MiKTeX, which had been working well most of the time. [I
had tested on his
computer](https://github.com/rstudio/rmarkdown/issues/1733#issuecomment-582165621)
that when MiKTeX failed to work, TinyTeX worked fine. Anyway, he said that he
would install TinyTeX after he orders his new computer. That was Feb 2020.

## A random challenge

Seven months later, there came the aforementioned LaTeX headache on Twitter. On
that day, it happened that I was considering [a 4-year old **xaringan** feature
request](https://github.com/yihui/xaringan/issues/3#issuecomment-626205629) that
he was also interested in, i.e., self-contained **xaringan** slides. I thought
it would be fun to encourage Jared to order the new computer and try TinyTeX, so
I hinted to him that I could probably have implemented the **xaringan** feature
before he orders the new computer. [Jared
said](https://twitter.com/jaredlander/status/1308830926500229120):

> If that (ordering the new computer) gets me self-contained slides, I'll order
> it right now.

I'd love to compete with his shipping carrier and see whether self-contained
**xaringan** slides or his new computer would arrive first. I might have lost
the game without [Susan VanderPlas's PR
\#207](https://github.com/yihui/xaringan/pull/207).

## The technical difficulty

Thanks to Pandoc, most HTML output formats in R Markdown support the
self-contained mode. That is, all external resources in the HTML file, such as
images, can be embedded right in the HTML file as base64 data. Why is
**xaringan** different?

It is because **xaringan** does not *fully* use Pandoc to render slides. More
precisely speaking, the body of the slides is not rendered by Pandoc, but by the
JS library remark.js. That means external resources in the body cannot be
embedded, except for plots automatically generated in R code chunks (I had dealt
with this special case but not other cases).

To fix this problem, I'd have to parse the body, which is Markdown text, by
myself, and embed the external resources found. In theory, this cannot be done
completely reliably in R, because I cannot access remark.js's Markdown parser in
R, but a few regular expressions (I know you are frowning upon this now) can
deal with the most common cases, such as `![]()` and `<img src="" />`. That is
what Susan did when we met at the [2019 Uncoast
Unconference](/en/2020/02/uncoast-unconf/).

## The speed trick

Actually, finding out external resources and encoding them as base64 data in the
body is not enough. The problem is still due to the fact that the Markdown body
is rendered to HTML by remark.js in real time in the web browser. Having too
much base64 data (which is usually big) will make it extremely slow for
remark.js to render the slides. Jared [once told
me](/en/2019/01/rstudio-conf/#jared-lander-s-annual-feature-requests) that it
could take five minutes to render his slides after he opens the HTML file in the
web browser. That is definitely unbearable.

[My solution to this
problem](https://github.com/yihui/xaringan/pull/207#issuecomment-700033352) was
to store the base64 data outside of the Markdown body, and add them back to the
body after remark.js has finished rendering Markdown, so remark.js actually
never sees the humongous base64 strings. This has made it much faster for
remark.js to render the slides, since it no longer has to read or render
megabytes of Markdown text.

## The live preview

Base64 encoding often takes nontrivial time, therefore I have turned off the
self-contained mode during the live preview of slides (i.e., the [Infinite Moon
Reader](/en/2019/02/ultimate-inf-mr/)). You will see a message in the R console
telling you that the self-contained mode has been temporarily turned off when
you live preview slides with `self_contained: true`.

To get fully self-contained slides, you have to click the Knit button in RStudio
to compile the Rmd document, or equivalently, call the function
`rmarkdown::render()`.

## Conclusion

Finally, you can have a single self-contained `.html` file for your **xaringan**
presentation that you can freely upload to any web server or send by email, and
it will not require Internet connection to read.

``` yaml
---
output:
  xaringan::moon_reader:
    self_contained: true
---
```

Once again, many thanks to Susan for the initial effort, and Jared for the trust
and persistence!
