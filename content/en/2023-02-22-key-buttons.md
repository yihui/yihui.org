---
title: Style Keyboard Keys and Shortcuts on Web Pages
subtitle: with JavaScript and CSS
date: '2023-02-22'
slug: key-buttons
---

When writing keyboard shortcuts on web pages, we often use the `<code>` tag in
HTML, or equivalently, a pair of backticks in Markdown. As a result, these keys
are styled as code. I have been thinking of styling them as `<kbd>` instead,
which is more appropriate semantically, and `<kbd>` can have different visual
styles with `<code>`.

Yesterday I wrote a short piece of [JavaScript
code](https://github.com/yihui/misc.js/blob/main/js/key-buttons.js) to convert
`<code>Key</code>` to `<kbd>Key</kbd>` on HTML pages, and also a few lines of
[CSS code](https://github.com/yihui/misc.js/blob/main/css/key-buttons.css) to
style `<kbd>` as buttons. You can import the JS and CSS with:

``` html
<script src="https://cdn.jsdelivr.net/npm/@xiee/utils/js/key-buttons.min.js" defer></script>
<link href="https://cdn.jsdelivr.net/npm/@xiee/utils/css/key-buttons.min.css" rel="stylesheet">
```

## Demos

Below are some examples:

`Esc` `Tab` `Enter` `Space` `Delete` `Home` `End` `PrtScr` `PrintScreen`
`PageUp` `PageDown` `Up` `Down` `Left` `Right`

`Ctrl` `Control` `Shift` `Alt` `Cmd` `Command` `fn`

`Ctrl / Cmd + C`

`Ctrl / Cmd + Alt + I`

`Shift + Enter`

`Cmd + Shift + 9`

`fn + F`

`Alt + Click`

## How does it work?

Under the hood, the JS code first looks for `<code>` tags that are not children
of `<pre>`. For each tag, it uses heuristics to determine whether it looks like
a key or keyboard shortcut. For example, single keys like `<code>Esc</code>` and
`<code>PageDown</code>` are recognized and converted to `<kbd>` tags; for
keyboard shortcuts, they must start with one of the
`Ctrl / Cmd / Shift / Alt / fn` keys, followed by <kbd>/</kbd> or <kbd>+</kbd>.
The keys must be separated by <kbd>/</kbd> or <kbd>+</kbd> with one space at
each side of the separator, e.g., `Ctrl + Key` will be recognized, but
`F12 + C`, `Ctrl - V`, and `Ctrl+Key` will not. If a keyboard shortcut is
detected, each key is placed into a `<kbd>` tag, e.g., `<code>Ctrl + Key</code>`
is converted to `<kbd>Ctrl</kbd> + <kbd>Key</kbd>`.

The arrow keys and the Enter key are special cases: you write the key names in
`<code>`, e.g.,

``` html
<code>Enter</code>
<code>Up</code>

<!-- or in Markdown -->
`Enter`
`Up`
```

They will be converted to arrows (with tooltips, in case arrows are confusing):

``` html
<kbd title="Enter">↵</kbd>
<kbd title="Up Arrow">↑</kbd>
```

Currently, not all keys are supported. I wrote the script mainly for my own use,
and only included the keys that I would often use. If you need to support other
keys, please feel free to let me know in the comments below or [file an issue to
Github](https://github.com/yihui/misc.js). However, please also note that you
can always use the raw HTML tag `<kbd>` when a certain key is not supported,
e.g., `<kbd>F</kbd>` will be rendered as <kbd>F</kbd>. Raw HTML is often
supported in Markdown, so `<kbd>` is a workaround when a pair of backticks
(e.g., `` `F` ``) doesn't work. Below are some keys written in `<kbd>` tags:

<kbd>a</kbd> <kbd>b</kbd> <kbd>c</kbd> <kbd>d</kbd> <kbd>e</kbd> <kbd>f</kbd>
<kbd>g</kbd> <kbd>h</kbd> <kbd>i</kbd> <kbd>j</kbd> <kbd>k</kbd> <kbd>l</kbd>
<kbd>m</kbd> <kbd>n</kbd> <kbd>o</kbd> <kbd>p</kbd> <kbd>q</kbd> <kbd>r</kbd>
<kbd>s</kbd> <kbd>t</kbd> <kbd>u</kbd> <kbd>v</kbd> <kbd>w</kbd> <kbd>x</kbd>
<kbd>y</kbd> <kbd>z</kbd> <kbd>A</kbd> <kbd>B</kbd> <kbd>C</kbd> <kbd>D</kbd>
<kbd>E</kbd> <kbd>F</kbd> <kbd>G</kbd> <kbd>H</kbd> <kbd>I</kbd> <kbd>J</kbd>
<kbd>K</kbd> <kbd>L</kbd> <kbd>M</kbd> <kbd>N</kbd> <kbd>O</kbd> <kbd>P</kbd>
<kbd>Q</kbd> <kbd>R</kbd> <kbd>S</kbd> <kbd>T</kbd> <kbd>U</kbd> <kbd>V</kbd>
<kbd>W</kbd> <kbd>X</kbd> <kbd>Y</kbd> <kbd>Z</kbd> <kbd>0</kbd> <kbd>1</kbd>
<kbd>2</kbd> <kbd>3</kbd> <kbd>4</kbd> <kbd>5</kbd> <kbd>6</kbd> <kbd>7</kbd>
<kbd>8</kbd> <kbd>9</kbd>

## The CSS style

The `<kbd>` tag is styled as a button with round corners and a box shadow
(inspired by [keyboard-css](https://shhdharmen.github.io/keyboard-css/) and
[this
post](https://chrispennington.blog/blog/add-styling-to-keyboard-keys-css/)).
When you move your mouse over it, it will "sink" a little bit. Of course, you
can add more CSS rules or override my rules to change the style.

I think the transformation from `<code>` to `<kbd>` will make keyboard shortcuts
stand out, so readers can see them more clearly.
