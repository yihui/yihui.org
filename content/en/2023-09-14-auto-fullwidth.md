---
title: Make HTML Elements Full-width Automatically via JavaScript and CSS
date: '2023-09-14'
slug: auto-fullwidth
---

I mentioned [a simple CSS trick](/en/2021/06/css-full-width/) to generate
full-width figures in 2021. I was thinking the other day if I could make
certainly elements automatic, so I do not need to manually specify them to be
full-width. Finally, I wrote [some JS
code](https://github.com/yihui/misc.js/blob/main/js/fullwidth.js) to deal with
three types of elements automatically:

1.  Code blocks (`<pre><code>`).

    If the `scrollWidth` is greater than `offsetWidth`, it means the code block
    has a horizontal scrollbar, and we may want to make it full-width.

2.  Tables (`<table>`).

    If its `offsetWidth` is greater than its parent's `offsetWidth`, it is too
    wide.

3.  Table of contents (an element that has the ID `TableOfContents`, e.g.,
    `<nav id="TableOfContents">`).

    If any TOC item has multiple rectangles on the layout
    (`getClientRects().length > 1`), it means the item is wrapped, and the TOC
    may benefit from more space.

The JS code will add a class name `fullwidth` to elements that need more space.
Users can define CSS rules for this class, e.g.,

``` css
.fullwidth {
  width: 100vw;
  margin-left: calc(50% - 50vw);
}
```

On my website, I do not really use the full screen width, but only the body
width. It's up to you how wide you want your `.fullwidth` elements to be. You
can load the JS from the jsdelivr CDN:

``` html
<script src="https://cdn.jsdelivr.net/npm/@xiee/utils/js/fullwidth.min.js" defer></script>
```

The above code block is also an example of an automatic full-width element. If
you view it on a large screen such as your computer screen, it should take the
full body width.

