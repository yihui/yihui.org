---
title: 'Snap Slides: a Lightweight HTML Presentation Framework'
subtitle: thanks to the CSS Scroll Snap module
date: '2023-09-21'
slug: snap-slides
---

I do not remember when or how I first encountered the CSS Scroll Snap technique,
but when I saw it, one thing came to my mind immediately: can we use this
technique to make slides? (Spoiler: the answer later [was
YES](https://cran.r-project.org/web/packages/markdown/vignettes/slides.html))

If you have not heard of it before, [here is a quick
introduction](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap/Basic_concepts)
on MDN to get you started. Basically, it enables elements to "snap" as you
scroll over them, which means as soon as you scroll onto an element, it will
just quickly jump into your view, instead of waiting for you to *continuously*
scroll over it. If you have used mobile devices to view photos, you should be
familiar with this user experience.

Slides give us a similar experience. If we have an HTML page with multiple
sections, we could make each section "snap" using this CSS technique. Then this
continuous page just becomes a series of "slides"!

## Three CSS properties

A new HTML5 presentation framework with simply three CSS properties? That sounds
awesome. No one can stop me from working on it.

``` css
html {
  scroll-snap-type: y mandatory;
}
.slide {
  min-height: 100vh;  /* occupy at least 100% viewport height */
  scroll-snap-align: start;
}
```

I ended up expanding these 7 lines of CSS into ~100 lines
([snap.css](https://github.com/rstudio/markdown/blob/master/inst/resources/snap.css))
to style several other common elements of slides, such as the table of
contents,[^1] slide titles, page numbers, timers, and special pages.

[^1]: No, usually you do not need an outline page in a talk. Nobody cares about
    it, and it simply wastes everyone's time. But... I promise that I have
    styled the table of contents beautifully. The audience should appreciate the
    aesthetics. Just kidding. It is tempting to spend too much time on this
    page. Move on.

## Organizing content as slide pages via JS

If the HTML code is well-organized as a series of sections (e.g.,
`<div class="slide">`), I probably would not need to write much JavaScript.
Eventually I wrote about 140 lines of JS
([snap.js](https://github.com/rstudio/markdown/blob/master/inst/resources/snap.js)).
One third of the code reorganizes content into slide pages, e.g., convert

``` html
<h2>First slide</h2>
<p>Content</p>
<hr>
<h2>Second slide</h2>
<p>More content</p>
<hr>
```

to

``` html
<div class="slide-container">
  <div class="slide">
    <h2>First slide</h2>
    <p>Content</p>
  </div>
  <div class="slide">
    <h2>Second slide</h2>
    <p>More content</p>
  </div>
</div>
```

The basic assumption is that you use horizontal rules (`<hr>`) to separate
slides, or each of your level-two section (`<h2>`) is a slide.

The rest of JS code deals with footnotes, page numbers, timers, slide
attributes, and keyboard shortcuts.

## Putting together the JS and CSS

If you are lucky (or I was smart enough when writing the JS code), you can turn
your HTML page into a slideshow after you add the JS and CSS to the page:

``` html
<script src="https://cdn.jsdelivr.net/gh/rstudio/markdown@1.8/inst/resources/snap.min.js" defer></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/combine/gh/rstudio/markdown@1.8/inst/resources/default.min.css,gh/rstudio/markdown@1.8/inst/resources/snap.min.css">
```

I'm using version 1.8 above. You can take a look at [the Git tags
here](https://github.com/rstudio/markdown/tags) to other versions (the minimal
is 1.6).

## Of course, you would rather write slides in Markdown instead of HTML

You may have frowned upon all the HTML/JS/CSS code and jargon above. The good
news is you can forget about them, and click a button to generate slides from
Markdown. I will introduce two methods below.

### Using the **markdown** package

You can install the **markdown** package (not **r**markdown). Then create a
`.md` file (or `.Rmd` if you need to use **knitr** code chunks) with the YAML
metadata:

``` yaml
---
title: "Snap Slides"
output:
  markdown::html_format:
    meta:
      css: [default, slides]
      js: [slides]
---
```

For the body, insert a horizontal rule between two slides like this:

``` md
## First slide

**Content**.

---

More _content_ on the next page.

---

## Third slide
```

If you edit the file in RStudio, click the `Knit` button to generate slides. If
you do not, you can call `markdown::mark_html()` on the `.md` file, or
`rmarkdown::render()` on the `.Rmd` file.

### Using Quarto

The JS/CSS code is not tied to the **markdown** package (although the code is
hosted in this package). You can definitely use it in Quarto documents. The key
is to set the option `minimal: true` and include the JS/CSS via
`include-after-body`:

``` yaml
---
title: "Snap Slides"
format:
  html:
    minimal: true
    include-after-body:
      text: |
        <script src="https://cdn.jsdelivr.net/gh/rstudio/markdown@1.8/inst/resources/snap.min.js" defer></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/combine/gh/rstudio/markdown@1.8/inst/resources/default.min.css,gh/rstudio/markdown@1.8/inst/resources/snap.min.css">
        <style type="text/css">header{text-align: center;}</style>
---
```

If you do not like loading the JS/CSS from the web (the jsdelivr CDN), you can
download a copy locally and include the local copy, which will make sure your
slides can work offline.

## Reasons why I like it

In 2017 I wrote about [why I loved remark.js
slides](/en/2017/08/why-xaringan-remark-js/).[^2] Compared to remark.js, most
features I liked are present in snap.js. The missing ones include:

[^2]: Will I create yet another HTML slides format in six years? I do not know.

1.  Incremental slides.
2.  Presenter notes.
3.  Highlighting specific lines of code.

None of them bother me much. I'm interested in implementing #2, and have a vague
idea how to do it (clone the window and use an `Intersection Observer` to sync
the two windows). Other than that, snap.js is feature complete to me.

One big advantage of using snap.js over remark.js/**xaringan** is that we can
use the RStudio Visual Markdown editor (or any visual editor that supports
Pandoc / CommonMark).

A possibly unique feature of this slides format is that one slide can be
arbitrarily long, in which case the scrolling behavior will become normal (i.e.,
continuous). If your content does not fit one slide, no worries.

The snap slides framework is very lightweight. That makes it ideal for open
source hackers to tweak its source code if they are not satisfied with anything,
although I think it should be the last resort---you can already customize many
things without touching the source. Want the `yolo = TRUE` Karl Broman again? No
problem (I will leave this exercise to you).

![yolo = TRUE](https://github.com/yihui/xaringan/releases/download/v0.0.2/karl-moustache.jpg)

So far I have only been bothered by a little problem: I cannot scroll very
quickly through slides no matter if I use my mouse or arrow keys, and I cannot
do anything about it (the limitation comes from the system). I can jump to the
first slide by pressing the `Home` key (or `Cmd + Up`), and last slide by `End`
(`Cmd + Down`). For the rest of slides, you can scroll to the next slide only
after the current slide has stopped snapping (which takes a short moment). The
overview mode of slides can help a bit, though.

## Demo and documentation

The package vignette in the **markdown** package,
[`vignette('slides', package = 'markdown')`](https://cran.r-project.org/web/packages/markdown/vignettes/slides.html),
can serve as both the demo and documentation of this slides framework. Enjoy!
