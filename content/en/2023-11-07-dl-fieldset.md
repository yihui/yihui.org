---
title: Convert Definition Lists (`<dl>`) to Frames (`<fieldset>`)
date: '2023-11-07'
slug: dl-fieldset
---

When I suggested a department chair in 2019 that they may consider opening a
blog so that all students and faculty in the department can write together
(which sounded exciting to me), he expressed a concern that some readers might
remember authors' mistakes in the posts. Considering the reputation of the whole
department, that is a valid concern. However, to err is human (and to forgive is
divine). Everyone makes mistakes. I often [update my old
posts](https://github.com/yihui/yihui.org/commit/75cafe6) to correct mistakes or
write a note saying certain information is oudated after a few years.

My notes did not have a formal form. Sometimes a note may be a blockquote, and
sometimes it is just a normal paragraph. Today I was thinking how I could make
them more consistent. One constraint is that it would be nice if I could express
it in pure Markdown. Unfortunately, CommonMark does not support [fenced
Divs](https://pandoc.org/MANUAL.html#extension-fenced_divs), otherwise I would
use a fenced Div like:

``` md
::: Note
This post is outdated. Please ignore it.
:::
```

Eventually I decided to hack at [definition
lists](https://pandoc.org/MANUAL.html#definition-lists). A note will be like:

``` md
Update on 2023-11-09

:   Please ignore this post. The method no longer works.
```

This will render to the HTML tag `<dl>` (with `<dt>` and `<dd>` inside).

Next I started to think about styling, and recalled the `<fieldset>` tag that [I
learned sixteen years ago](/cn/2007/09/notes-on-firefox-ie-and-fieldset/).[^1]
With [a few lines of
JavaScript](https://github.com/yihui/misc.js/blob/main/js/dl-fieldset.js), I was
able to change `<dl>` to `<fieldset>`. Below is a demo:

[^1]: See? This is why you should blog---things you learned, no matter how long
    ago, will not be wasted.

Notice on 2023-11-07

:   Thank you for noticing this new notice!

    Your noticing it has been noted, and will be reported to the authorities.

If you want to use my JS code, you can load it via:

``` html
<script src="https://cdn.jsdelivr.net/npm/@xiee/utils/js/dl-fieldset.min.js" defer></script>
```

Then you only need to write Markdown:

``` md
Title

:   Content
```

which will be rendered to HTML:

``` html
<dl>
  <dt>Title</dt>
  <dd>Content</dd>
</dl>
```

Then my JS code will convert it to:

``` html
<fieldset>
  <legend>Title</legend>
  Content
</fieldset>
```

Mission complete.
