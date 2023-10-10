---
title: Full-width Figures with Two Lines of CSS
subtitle: "`width: 100vw` and `margin-left: calc(50% - 50vw)`"
date: '2021-06-03'
slug: css-full-width
---

Nowadays it is rare to see a web page on which the body text occupies the full
width of the browser window on large screens, because that would be too wide to
read, and your eyes or head has to move across a large horizontal space.

However, sometimes we may wish to give an image more horizontal space when the
original image is very wide. Our eyes parse images differently than text, and we
may need more room to present more details in an image.

A couple of weeks ago, I saw a question on Stack Overflow. The OP asked [how to
allow plots to overhang the body text in R
Markdown](https://stackoverflow.com/q/67630290/559676). You may see my answer
there for details. The key is that you set the width of the plot to be wider
than its container, and move it to the left for a proper distance so that it can
be centered on the page, which corresponds to the [two
lines](https://twitter.com/xieyihui/status/1070927818920472577) of CSS:

``` css
 width: 100vw;
 margin-left: calc(50% - 50vw);
```

This idea of "using a large width and moving the element to the left" can be
applied to any HTML elements on any web page. For example, I'm showing a
full-width image below (you have to view it in my post instead of from RSS
readers or aggregators):

<style type="text/css">
.fullwidth-example {
  max-width: none;
  width: calc(100vw - 1em);
  margin-left: calc(50% - 50vw + .5em);
}
</style>

<img src="https://prose.yihui.org/post/2020/11/10/r-markdown-demo/index_files/figure-html/sunspots-1.svg" alt="A full-width figure example." class="fullwidth-example" />

Although the idea is general, the implementation details can be different from
one page or website to another, because the position of the container of the
image can be different. The above two lines of CSS can be applied to the cases
in which the image container is centered on the page, which is true for the
`html_document` output format of R Markdown, but not true for my website here (I
have a sidebar), so actually I had to adjust the `width` and `margin-left`
values to take the width and left margin of the image container into
consideration.

I hope you will find this CSS trick useful. There are multiple ways to achieve
the goal (e.g., CSS grid layout), but I have found this one particularly simple,
relatively easy to understand, and independent with CSS frameworks, so I really
love it myself.
