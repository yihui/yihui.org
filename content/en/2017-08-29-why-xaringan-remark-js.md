---
title: Why xaringan / remark.js for HTML5 Presentations?
author: Yihui Xie
date: '2017-08-29'
slug: why-xaringan-remark-js
---

Last year I wrote an R package with a weird name "[**xaringan**](https://github.com/yihui/xaringan)". Although I have documented it, I have never explained why I preferred the underlying HTML5 presentation framework remark.js over other frameworks like dzslides, ioslides, Slidy, or reveal.js.

I started playing with HTML5 slides [in 2011](/en/2012/04/fancy-html5-slides-with-knitr-and-pandoc/), and rarely went back to LaTeX beamer ever since.^[Yes, I started with PowerPoint, like most people did. Then my brain was washed by LaTeX just like many people in academia.] To be honest, I was never truly happy with any of the Markdown-based slide generation tools until I saw remark.js. Prior to that, my personal favorite HTML5 presentation was still my [very first one](https://slides.yihui.org/2011-r-dev-lessons.html) based on a library named [keydown](http://infews.github.io/keydown/).^[I like the old version of keydown more than the current new version.] I loved it primarily because of the possibility of using fullscreen background images, which I think is critical to presentations. Fortunately, background images are dead easy with remark.js, and I found its feature set was just the right size for me: not too small, or too big.

## Why I love remark.js

I spent three days during the last Thanksgiving break on developing the prototype of the **xaringan** package. I saw remark.js about a month earlier, and I was so excited that I could not even stop thinking about it at night, but I was busy with **blogdown** at that time, so I waited for a few more weeks until the break. Below are the reasons why I fell in love with remark.js almost on the first sight:

1. Its "Hello World" example is really simple: https://github.com/gnab/remark/wiki. I'm familiar with the web stuff like CSS and JavaScript, so I was able to understand it in less than a minute.

    In **xaringan**, I have made it even simpler. Basically I abstracted away all the HTML stuff, and all you write is an R Markdown document. I will generate the HTML boilerplate for you behind the scenes.

1. I loved the choice of Google fonts in the example. To me, it seems that the best fonts are always the fonts I have never used by myself.

1. There are painfully many flavors of Markdown in the world, but I really only have belief in two flavors: Pandoc's Markdown, and remark.js'; I feel sad about most other flavors (Github's flavor is fine). I think the author of remark.js has done an excellent job of inventing a reasonable flavor of Markdown that is suitable for slides. For example, I'm always in bad need of `.center[]`, but often have to use the ugly raw HTML like `<div style="text-align: center;"></div>`. With remark.js' Markdown, you can add arbitrary CSS classes to elements using syntax `.className[elements]`, which is very handy compared to `<span class="className"></span>`.

1. There are several useful slide properties such as `class`, `background-image`, and `layout`. These are simple to write but can style individual slides in pretty much any way you want if you know a little bit CSS. Even if you don't know CSS, the built-in classes like `class: center, middle` are useful enough.

1. As I mentioned above, the background image property is my favorite one. A few weeks before I wrote the R package, Karthik [requested a feature](https://github.com/yihui/xaringan/issues/1) on Twitter that allows users to insert the Mustache Karl (TM) picture using an argument `yolo = TRUE`. I felt it was fun, so I [implemented](https://slides.yihui.org/xaringan/karl.html) it in **xaringan**. If you turn it on, you will see the happy Karl on a _random_ slide like this:

    ![Mustache Karl](https://github.com/yihui/xaringan/releases/download/v0.0.2/karl-moustache.jpg)

    This feature is actually extensible in the sense that you can specify `yolo = 3` to show Karl three times on three slides randomly. Or customize the image and the number of times [like](https://twitter.com/xieyihui/status/892896880530796544) `yolo = list(img = "kangaroo.jpg", times = 5)`.

1. Incremental slides can be incremental in any fashion you want. Typically you may want to show a full bullet list item by item, but you don't have to go that way. For example, you are free to show the first two bullets, then the third, and then the fourth to sixth. Just use two dashes to separate the incremental content.

1. You can write slide notes under three question marks `???`. These notes are only displayed in the presentation mode, and only the speaker can see these notes. This is very helpful when you want to give a talk but have too many things to remember, in which case you can look at your own screen and read the notes. The audience won't see the notes on the projector screen.

1. The keyboard shortcuts are fun, too. For example, you can open [**xaringan**'s documenation](https://slides.yihui.org/xaringan/) (written in remark.js, of course), and press keys like `P` (presentation mode), `C` (clone slides to a new window), `B` (black out), `M` (mirror the slide), and `H` (help), etc.

1. You can highlight certain lines in code blocks.

1. Since remark.js renders the Markdown content to HTML on the client-side (in your web browser), the HTML source of your slides is very lightweight and quite human-readable. Well, rendering Markdown in browser may not be a good idea in certain extreme cases. For example, I told [Jared Lander](https://www.jaredlander.com/) about **xaringan** on a bus at rstudio::conf 2017, and a couple of days later, he sent me a presentation that took over five minutes to load in the browser. That was because he wanted the slides to be self-contained (base64 encode all images), and as a result, the size of the HTML file was huge, mostly because of images encoded as data URI's and all kinds of fancy HTML widgets.

    This is the biggest disadvantage of **xaringan**, since it makes it difficult to generate self-contained HTML presentation files. Personally I don't care about it at all, since I never send my slides as a self-contained HTML file to other people. I always host my HTML slides on a web server, and send other people links to the slides instead. My remark.js slides are never self-contained, and all dependencies are hosted on the same server. This is not only more lightweight (not occupying too much space in email inboxes), but also gives me the freedom to update the slides anytime as necessary. In other words, I almost always pass _references_ instead of _values_ to other people. You can find links to all my presentations on my [vitae](/en/vitae/) page.

1. For most HTML5 slides, I find it painful to hit the Back button in the browser, because every page of the slides is an entry in the browsing history, and hitting the Back button will just bring you back in the slides page by page. Oftentimes I want to immediately go back to the page from which I visited the slides, instead of reading the slides in the reverse order again. remark.js did the right thing for me: if you hit the Back button, it returns to the previous web page instead of slide.

The name of this R package has a ninja flavor ([Sharingan](http://naruto.wikia.com/wiki/Sharingan)) because of the infinite possibility for customization via CSS. You have to be familiar with CSS if you don't want to use the default style. For example, you can use a two-column layout by adding the [CSS rules](https://github.com/yihui/xaringan/blob/32fd94f8f134c04f8dbd87bf49816564fbd461f3/inst/rmarkdown/templates/xaringan/resources/example.css#L47-L54) below:

```css
.pull-left {
  float: left;
  width: 47%;
}
.pull-right {
  float: right;
  width: 47%;
}
```

Then in your Markdown content, you can write:

```markdown
---

# Two-column Layout

.pull-left[
- a bullet
- another bullet
]

.pull-right[
- a bullet
- another bullet
]
```

Of course, you can easily change font styles of your text in slides via CSS, too. I believe you can also style your slides to make them look like PowerPoint slides if you really want (LaTeX beamer styles may be harder to reproduce via CSS, though).

## Why not reveal.js / ioslides / Slidy

It is mostly personal preferences, and I'm not saying these libraries are not great for everyone. If you love them, stick with them.^[Similarly, I don't want to convince everyone of using Markdown instead of LaTeX. There are people who are really comfortable with LaTeX, which is totally fine.]

To me, reveal.js is too complicated and shiny. It has way more features than what I need. Oh, the slide transition styles (even 3D rotations?)... I used reveal.js for a couple of my talks, and I found it was very easy to forget vertical slides. The Markdown support is kind of awkward in my eyes. JJ has written an R package [**revealjs**](https://github.com/rstudio/revealjs), which made it much more natural to write slides with \(R) Markdown. In short, reveal.js is too good to me.

For ioslides and Slidy, they are not very customizable. For example, you can see [Jared's hack](https://www.jaredlander.com/2017/07/fullscreen-background-images-in-ioslides-presentations/) on supporting background images in ioslides. Even though I'm reasonably familiar with JavaScript, I hate the fact that I have to hack like that. Also see [this pull request](https://github.com/rstudio/rmarkdown/pull/687) in the **rmarkdown** repo on Github (hacking at Lua writers for Pandoc). There is not much freedom of customizing CSS, either.

## A secret tool in xaringan

I have added several useful features in xaringan so that you do not have to know much about JavaScript or CSS to use them, such as the built-in MathJax support, the autoplay mode, the countdown timer, and printing to PDF from Chrome.

But there is one secret I didn't mention in the documentation. You have seen it if you have read the **xaringan** documentation, but you are probably not aware of its real power. It is the RStudio addin "Infinite Moon Reader", or equivalently, the `xaringan::inf_mr()` function. The secret is that this RStudio addin actually works with _any_ R Markdown documents as long as the output format is HTML (any HTML output formats, e.g., `html_document`, `ioslides_presentation`, `tufte::tufte_html`). It was designed for, but is not limited to the output format `xaringan::moon_reader` (which is an HTML format).

You can click this addin to preview an R Markdown documents in your web browser or the RStudio Viewer, and you can enjoy LiveReload, which means as soon as you modify the document and save it, it will be automatically rebuilt and refreshed in the browser. There is no need to click the Knit button over and over again!

The secret weapon is actually from [the **servr** package](https://github.com/yihui/servr), which is a tiny package I wrote a few years ago but didn't have time to talk about. 

## Other blog posts

I have seen a few blog posts about **xaringan** in the past, but unfortunately I didn't bookmark them. The only two that I currently have in my browser are:

- [Compose Slides in R with Xaringan Slides](https://www.johnlittle.info/post/compose-slides-in-r-with-xaringan-slides/) by John R Little. I was particularly glad that he wrote a CSS stylesheet that reflects the Duke color palette. That was a very good CSS exercise.

- [A guide to awesome slides](http://www.njtierney.com/post/2017/07/31/awesome-slides/) by Nick Tierney. This post was primarily about slide design rules, which are pretty good. Nick said:

    > [...] Not having all of the bells and whistles that keynote and powerpoint do forces you to present your work simply, and I think that when you do this properly, it is very powerful.

    Exactly. Less is more.
