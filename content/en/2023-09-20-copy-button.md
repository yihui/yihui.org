---
title: Add a Copy Button to Any Element on a Web Page
date: '2023-09-20'
slug: copy-button
---

The three most desirable features for code blocks on web pages, in my opinion,
are syntax highlighting, code folding, and the copy button. Syntax highlighting
is way beyond my capability to implement, but the rest two are simple enough.
Yesterday I blogged about [folding code](/en/2023/09/code-folding/). Today let's
talk about the copy button.

## The Clipboard API

To implement a copy button, you need to know the Clipboard API in JavaScript (in
particular, [the `writeText()`
method](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)),
which is quite simple. The inner text of any HTML element can be accessed via
the `innerText` attribute, so basically what the copy button does is:

``` js
navigator.clipboard.writeText(el.innerText);
```

Here `el` is the target element from which you want to copy text.

## The button

You can create a button element using `document.createElement()`. It does not
have to be a `<button>`, but can be any element that accepts the `click` event
(e.g., `<a>` or `<span>`). The button can be added to the target element via the
`append()` method.

## The CSS

Usually you see the copy button at the top-right corner of the target element.
To achieve that, the target element needs to have `position: relative` and the
button needs `position: absolute; top: 0; right: 0` (increase `0` if you do not
want the button to touch the border of the target element, e.g., `5px`). The
rest of CSS is purely cosmetic (well, all CSS is cosmetic).

## A minimal implementation

First we add a button to each `<code>` element's parent `<pre>`:

``` js
document.querySelectorAll('pre > code').forEach(el => {
  const btn = document.createElement('span');
  btn.className = 'copy-button';
  btn.onclick = () => navigator.clipboard.writeText(el.innerText);
  el.parentNode.append(btn);
});
```

The button has the class name `copy-button`, on which we can define CSS rules,
e.g.,

``` css
pre {
  position: relative;
}
.copy-button {
  position: absolute;
  inset: 5px 5px auto auto;
  width: 1em; height: 1em;
  border: 1px solid;
  box-shadow: -3px 3px #999;
}
```

We have made the button a square with a box shadow
<span class="copy-button" style="position:static;display:inline-block;"></span>,
indicating that it is for copying because the shadow is a "copy" of the square.
You can certainly make it fancier if you desire (e.g., using an icon, which is
common practice).

## A general solution

I have written a script
[`copy-button.js`](https://github.com/yihui/misc.js/blob/main/js/copy-button.js)
and the corresponding CSS
[`copy-button.css`](https://github.com/yihui/misc.js/blob/main/css/copy-button.css),
which can be used via:

``` html
<script src="https://cdn.jsdelivr.net/npm/@xiee/utils/js/copy-button.min.js" defer></script>
<link href="https://cdn.jsdelivr.net/npm/@xiee/utils/css/copy-button.min.css" rel="stylesheet">
```

Note that I have made the button invisible by default in CSS, and it becomes
visible only when you mouse over the target element.[^1] If you want the button
to be always visible, you can define:

[^1]: This is to avoid unnecessary visual clutter on the screen, but it also
    makes it impossible for users on devices that do not have a mouse to reveal
    the button. I wonder how often readers would want to copy code when reading
    on mobile devices.

``` css
.copy-button {
  display: inline-block;
}
```

The JavaScript will automatically add `position: relative` to the target element
if this CSS attribute is not set. Depending on whether the copy was successful,
the button will be styled differently.

This is a general solution that can be applied to any element. You can provide a
`data-selector` option as an attribute of the `<script>`, which is [a
selector](https://www.w3schools.com/cssref/css_selectors.php) to select your
target elements. For example, you can select both code blocks and blockquotes:

``` html
<script src="path/to/copy-button.min.js" data-selector="pre > code, blockquote" defer></script>
```

Below is an example. If you move your cursor over the quote, you will see a copy
button on the top-right.

> Without a little madness, life is not worth living. Let us follow the guidance
> of our inner voice. Why should we fry each of our actions like a piece of cake
> on a sensible frying pan?
>
> ---Milan Kundera, "Immortal"

One button to copy them all. No more manual selection of text or
`Ctrl / Command + C`. Is that a great step forward for humankind?[^2]

[^2]: Personally I rarely copy a full piece of code from web pages. If I want to
    reuse a piece of code on a page, I tend to read and understand it first.
    Then I try to type out the code by myself. Therefore this copy button is not
    very useful to myself, and I do not care much about the tiny bit extra time
    required without the button.

<script src="https://cdn.jsdelivr.net/npm/@xiee/utils/js/copy-button.min.js" data-selector="pre>code,blockquote" defer></script>

<style type="text/css">
.single blockquote {
  background: lightyellow;
  padding: 1px 2em;
}
</style>
