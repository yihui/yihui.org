---
title: Some of My JS Tricks to Enhance the HTML Output of Markdown
date: '2018-11-09'
slug: md-js-tricks
---

Just because Markdown is so simple (well, "[simple](/en/2018/11/hard-markdown/)"), there will definitely be useful features missing. I want to share some of my relatively simple JS tricks to fill the gaps. Please note that I'm only talking about the HTML output, and the Markdown flavor can be arbitrary (it doesn't have to be Pandoc's Markdown). In fact, all tricks below are general-purpose and will work on any web pages, no matter if the pages are generated from Markdown or not. 

## How to work with MathJax

The MathJax support in most Markdown flavors is missing. The only exception is Pandoc's Markdown. If you use R Markdown (which is based on Pandoc), you can ignore this trick. I have explained my trick of making MathJax work with any flavors of Markdown in detail [in a previous post](/en/2018/07/latex-math-markdown/). The relevant JS code is in [math-code.js](https://github.com/rbind/yihui/blob/master/static/js/math-code.js) on my website. This is the most complicated trick in this post, although it is only 20 lines of code.

## How to make links open in new tabs (i.e., `target="_blank"`)

Most Markdown renderers translate `[text](url)` to `<a href="url">text</a>`, which means links will be opened in the current tab or window. I have explained my trick of [making links open in new tabs](/en/2018/09/target-blank/) in a previous post, too.

## How to add anchor links to section headings

When a page has mutiple sections, it can be very helpful to generate an anchor link for each section heading, because we can send other people the links to specific sections. Basically, we just need to add an `<a>` tag inside a heading with the attribute `href` pointing to the ID of the heading:

```js
(function() {
  var h, hs = document.querySelectorAll('h1, h2, h3');
  for (var i = 0; i < hs.length; i++) {
    h = hs[i];
    if (h.id === '') continue;
    h.innerHTML += ' <span class="anchor"><a href="#' + h.id +
      '">#</a></span>';
  }
})();
```

You can hide the anchor links by default, and show them only when the mouse is over a heading:

```css
.anchor {
  display: none;
}
:hover > .anchor {
  display: inline;
}
```

## How to generate tooltips for images

Images on the web often have an `alt` attribute, which stands for "alternate text". This is often invisible to readers _without_ vision problems, but important for users who have to use screen readers (such as blind people). Without the `alt` text, they will have no idea what an image means. The text is also displayed with the image cannot be loaded.

Since this attribute is invisible to users with the normal vision, it actually also has a problem. Sometimes you don't know what exactly the author tries to express just by looking at an image. You may have a better idea by reading the text. You could right click on the image, "Inspect Element", and look at the `<img>` tag in the source, but that's a bit hassle and not everyone knows how the use the Developer Tools of modern web browsers.

My trick is to add the `title` attribute to `<img>` (if not already specified), whose value is identical to the `alt` text. The `title` attribute will give you a tooltip, which you can read as you mouseover the image. XKCD is a typical example. The code [alt-title.js](https://github.com/rbind/yihui/blob/master/static/js/alt-title.js) is simple enough:

```js
(function() {
  var img, imgs = document.getElementsByTagName('img');
  for (var i = 0; i < imgs.length; i++) {
    img = imgs[i];
    if (!img.title) img.title = img.alt;
  }
})();
```

An example:

![Trying to figure out the possible reasons why my girlfriend is angry](https://db.yihui.org/images/thick-book.jpg)

Note that with Pandoc's Markdown, you can generate figure captions, so the tooltips may not be necessary. With other Markdown flavors, `![text](url)` is often translated to `<img src="url" alt="text" />`.

## How to center images in paragraphs

When an image (`<img>`) is the only child element of a paragraph (`<p>`), chances are you want to center it. Except with Pandoc's Markdown, you cannot really align images with Markdown syntax. I have written a JS script [center-img.js](https://github.com/rbind/yihui/blob/master/static/js/center-img.js) to automatically center images on web pages. It is slightly tricky because I considered both of these cases:

```html
<!-- Markdown: ![](...) -->
<p>
  <img src="..." />
</p>

<!-- Markdown: [![](...)](...) -->
<p>
  <a href="..."><img src="..." /></a>
</p>

```

I have also considered centering `<embed>` and `<object>`, although these elements are rarer in Markdown's output (no native Markdown syntax for them).

## How to right-align quote footers

If you need to use quotes in Markdown, everything will be left-aligned by default, but you may want the footer (the source of the quote or the person who said the words) to be right-aligned.

My trick, [right-quote.js](https://github.com/rbind/yihui/blob/master/static/js/right-quote.js), is to check the last paragraph of a quote. If it starts with the em-dash (---), I'll apply the CSS style `text-aligh: right;` to it. Here  is an example:


```md
> UNIX was not designed to stop its users from doing stupid things,
> as that would also stop them from doing clever things.

> --- Doug Gwyn
```

Output:

> UNIX was not designed to stop its users from doing stupid things,
> as that would also stop them from doing clever things.

> --- Doug Gwyn

I'm not a JavaScript expert. My code above may be naive and inefficient. I have found JavaScript a lot of fun to play with, even only with selectors like `document.getElementsByTagName()` or `document.querySelectorAll()` and simple for-loops. I used to think I couldn't live without fancy libraries like jQuery, but later realized vanilla JavaScript could actually do a lot of things. I hope these tricks could be useful to web amateurs like me.
