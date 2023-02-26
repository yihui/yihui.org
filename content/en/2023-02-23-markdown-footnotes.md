---
title: Convert Inline Footnotes to Regular Footnotes in Markdown
date: '2023-02-23'
slug: markdown-footnotes
---

After using [Hugo 0.25.1](https://github.com/gohugoio/hugo/releases/tag/v0.25.1)
for my personal website for nearly six years, I have finally decided to upgrade
it. I'll explain the reasons later. One problem I encountered was that I had to
convert [inline
footnotes](https://pandoc.org/MANUAL.html#extension-inline_notes) in Markdown to
[regular footnotes](https://pandoc.org/MANUAL.html#footnotes) (because Hugo
0.25.1 supported the former but Hugo no longer supported it since a certain
later version). That is, I need to convert

``` markdown
text^[this is a footnote]
```

to

``` markdown
text[^1]

[^1]: this is a footnote
```

I could use Pandoc to do it, but since I have a few thousand posts, I don't want
to let them all go through a Pandoc conversion, to avoid accidental breakage.
Instead, I just wrote a little R script to help:

``` r
files = list.files('.', '[.]R?md$', recursive = TRUE, full.names = TRUE)
for (f in files) {
  x = xfun::read_utf8(f)
  r = '\\^\\[([^]]+)\\]'  # eyes bleeding...
  if (length(grep(r, x)) == 0) next
  fn = NULL
  m = gregexpr(r, x)
  regmatches(x, m) = lapply(regmatches(x, m), function(z) {
    if ((n <- length(z)) == 0) return(z)
    z2 = sprintf('[^%d]', length(fn) + seq_len(n))
    fn <<- c(fn, gsub(r, '\\1', z))
    z2
  })
  fn = sprintf('[^%d]: %s', seq_along(fn), fn)
  x = c(x, rbind('', fn))
  xfun::write_utf8(x, f)
}
```

Basically, it reads a `.md` (or `.Rmd`) file, detects all footnotes of the form
`^[text]` in the text, replaces them with `[^n]` (where `n` is the footnote
number), appends new footnotes `[^n]: text` to the text, and writes out to the
original file. Since my files are under version control, I can manually inspect
[the GIT changes](https://github.com/yihui/yihui.org/commit/f518a9a) to confirm
the script did what I expected.

It did help me a lot, and I only had one special case---footnotes that contain
`]`, e.g., `^[this is a [footnote](url)]`. Fortunately, I didn't have too many
posts that had this type of footnote, so I manually corrected them.

Why upgrade Hugo? I didn't really have strong reasons. One reason is that I'm
tired of [having to use `.Scratch`](/en/2017/08/hugo-post-summary/) due to the
old version of Hugo. Another reason is that as the maintainer of the
**blogdown** package, I want to keep an eye on newer versions of Hugo. For
normal users, usually I don't recommend upgrading Hugo, as long as a certain
version works fine for you.
