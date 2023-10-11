---
title: An Example of Simplifying a Decade-Old Piece of JavaScript
date: '2023-10-11'
slug: simplify-javascript
---

Ten years ago, I wrote a piece of JS code to add a button to toggle the
visibility of all R code blocks on a HTML page, which partially implemented [the
code-folding
feature](https://bookdown.org/yihui/rmarkdown/html-document.html#code-folding).
The original code was this:

``` javascript
function toggle_R() {
  var x = document.getElementsByClassName('r');
  if (x.length == 0) return;
  function toggle_vis(o) {
    var d = o.style.display;
    o.style.display = (d == 'block' || d == '') ? 'none':'block';
  }

  for (i = 0; i < x.length; i++) {
    var y = x[i];
    if (y.tagName.toLowerCase() === 'pre') toggle_vis(y);
  }
}

document.write('<button type="button" onclick="toggle_R();" style="position: absolute; top: 0; right: 0;">Hide/Show Source</button>')
```

When [I was thinking about](/en/2023/09/code-folding/) code-folding again a few
weeks ago, I dug out the above code, and felt it was worth commenting after a
decade. [The rewritten
version](https://github.com/yihui/knitr/commit/bc29a3d78015873617db7c559d953b39037572d7)
of the above code can be found at the end of this post.

## Bye, jQuery! Hi, vanilla JS!

As a JS amateur, my biggest change over these years was that I stopped using
jQuery. Because I was an amateur, I thought jQuery was the "right" way to write
JS. A lot of code that I saw was using the magical `$()`, which made me believe
the only way to select elements on the page was `$()`. I was aware of methods
like `document.getElementById()` and `document.getElementByClassName()`, but
sometimes I wanted a more flexible method to select elements (not just by their
IDs or class names). You can see in the above code that I first try to get all
elements by the class name `r`:

``` javascript
x = document.getElementsByClassName('r');
```

and then check if the tag name of an element is `pre`:

``` javascript
for (i = 0; ...) {
  if (x[i].tagName.toLowerCase() === 'pre') ...
}
```

That was awkward.

It was quite a few years later that I discovered the `document.querySelector()`
and `document.querySelectorAll()` methods in vanilla JS. At that moment, I could
not believe it was *that* simple. You can use CSS selectors to select elements!
Want to select `<pre>` with the class `r`?

``` javascript
document.querySelectorAll('pre.r');
```

That's it. So straightforward.

In retrospect, I'd blame it on [the Internet
Explorer](https://caniuse.com/?search=querySelectorAll) (IE) for the lack of
support, especially IE6, which I had used for several years. Ironically, I
remember how excited I was when I first saw IE6 came out: it looked pretty on
the pretty Windows XP! Today I still think XP was pretty, but IE? IE wasted my
life. Again, ironically I remember how excited I was when I figured out how to
[support file uploads](https://github.com/rstudio/shiny/pull/598) for Shiny in
IE8/9, but why did I have to spend time on that in the first place when all
other web browsers did not require this special care?

Anyway, it is a relief that IE has pretty much died now.

To be fair, jQuery is a nice abstraction and has many merits. The problem is
that they are rarely what I need now, so I'd rather not take this dependency
(otherwise I will have to pay attention to its updates). Vanilla JS is often
good enough for me. If you miss the terse dollar sign, I just learned yesterday
(!) that you could create one by yourself, e.g.,

``` js
const $ = document.querySelectorAll.bind(document);
$('pre.r');
```

It is not equivalent to jQuery's `$`, but can be a nice and useful shorthand
anyway. Chrome has done something similar to this in the Developer Tools (`$()`
is basically `document.querySelector()`, and `$$()` is
`document.querySelectorAll()`).

BTW, it took me a few more years to realize that the `querySelector()` method
could be used on any DOM elements, not just `document`. I have been this slow in
learning.

## Bye, `for` loops! Hi, `.forEach()`!

I was too used to writing `for` loops in JS, and there had been a pattern like
this:

``` js
for (i = 0; i < x.length; i++) {
  y = x[i];
  // more work on y
}
```

There is no need to use a loop or create `y` (or the looping index `i`) when `x`
is an array and you want to deal with its elements one by one. The `forEach()`
method is much cleaner.

``` js
x.forEach(y => {
  
});
```

When `x` is not an array but an array-like object such as the returned value of
`getElementsByTagName()`, you can convert it to an array first using the `...`
operator, e.g.,

``` js
[...document.getElementsByTagName('pre')].forEach(() => {});
```

If you read the code in the beginning of this post carefully, you may notice
that I actually created a global variable `i` inadvertently: I should have used
`for (var i = 0)` instead of `for (i = 0)`. Using the `forEach()` method can
avoid this problem.

To be clear, I still use `for` loops nowadays, but just not that often. Loops
have their [advantages](/en/2022/12/disqus-to-giscus/#the-for-loop), e.g., you
can `break` a loop early when necessary.

## Bye, `function() {}`! Hi, `() => {}`!

I use `=>` to create functions now because it is shorter and still easy enough
for me to read. This is purely a cosmetic preference.

I still use the `function` keyword when the function is meant to be called in
several places. I prefer the `=>` shorthand when I want to create a function to
be used once somewhere (e.g., an anonymous function to be used as an event
handler).

## Bye, `document.write()`! Hi, `.insertAdjacentHTML()`!

I do not know why `document.write()` was prevalent when I started learning JS.
Perhaps I learned through some fake tutorials. To add some HTML code to the DOM,
I'd use the `insertAdjacentHTML()` method now. One problem with
`document.write()` is that if you run it in the JS console of the browser, it
can overwrite the full HTML code of the page, and you certainly do not wish to
destroy the whole page.

Normally I'd avoid inserting raw HTML code, but sometimes I'm just too lazy to
`document.createElement()` and append it with the `.before()` or `.after()`
methods.

## No global variables if possible

Creating global variables means potential clashes and pollution of the global
namespace. In my original code, I create a global function `toggle_R()`, because
I wanted to call it in the `onclick` event of the button. Now I'd not write the
event handler to the `onclick` attribute of the `<button>`, but select the
button in JS and attach the event to it instead. The latter way will not create
a global variable.

## Simplifying a conditional expression

Toggling the visibility of an element can be achieved by changing its `display`
property in CSS. For a code block, `display: none` means to hide it, and
`display: block` means to show it. Originally my code was like this:

``` js
el.style.display = (el.style.display === 'block' || el.style.display === '') ? 'none' : 'block';
```

Now I'd write:

``` js
el.style.display = (el.style.display === 'none') ? 'block' : 'none';
```

They are equivalent based on the assumption that `display == ''` means the block
is shown, which is not strictly true but true most of time. If we compare the
`display` value against `none` first, we can get shorter and simpler code than
when we compare `display` against `block` or an empty string.

## From 15 lines of code to 8: shorter, safer, and easier to reason about

Below is the "modernized" version of the code:

``` javascript
(d => {
  d.insertAdjacentHTML('beforeend','<button style="position:absolute;top:0;right:0;z-index:2;">Toggle Source</button>');
  d.lastElementChild.onclick = () => {
    d.querySelectorAll('pre.r').forEach(el => {
      el.style.display = (el.style.display === 'none') ? 'block' : 'none';
    });
  };
})(document.body);
```

The construct `(d => {})(document.body)` may feel like ninja code, but it is
just because I'm lazy to write:

``` js
(() => {
  const d = document.body;
})();
```

We added the button the last of the document, so `d.lastElementChild` is the
button, and we attached a `click` event to it. If you run the code, you should
see a button at the top-right of the page. If you click on it, it should toggle
R code blocks on the page (if there are any).

I guess JS experts may find it funny that I used to think I could not live
without jQuery, and my discovery of `querySelectorAll()` changed my way to use
and write JavaScript. I find it funny, too. In programming, abstraction
libraries are often nice, but sometimes if we look closer, we may find that all
we need is actually a tiny core feature that has existed for a long time in the
base, and for some reason, we have missed it for years.
