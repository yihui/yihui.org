---
title: Let Your Markdown Breathe!
subtitle: Remember to insert blank lines between different Markdown elements
date: '2021-06-03'
slug: markdown-breath
---

Last year I came across [a wonderful post by Shannon
Pileggi](https://www.pipinghotdata.com/posts/2020-09-07-introducing-the-rstudio-ide-and-r-markdown/),
in which she demonstrated a large number of super useful tips about R Markdown
with GIFs. One of them caught my attention especially, which is,

> Let your markdown **breathe**!

She meant that you may try to add blank lines into your Markdown text when
something does not look right. This is a common, yet very subtle problem in
Markdown. In general, you should use blank lines to separate different elements
to avoid ambiguity. For example, without a blank line, the Markdown parser may
not be sure if `#` means a header below:

``` text
For the R language, the character
# indicates a comment.
```

There will be no ambiguity if you separate the two lines:

``` md
A paragraph.

# A header
```

I have emphasized this problem in [Section 11.11 of the R Markdown
Cookbook](https://bookdown.org/yihui/rmarkdown-cookbook/results-asis.html)
(中文客官可[移步至此](/cn/2017/05/blank-line/)). You would rather add blank
lines excessively (which will not hurt) than not using enough blank lines,
otherwise you could run into surprising problems that are very hard to debug
([see Dale's
example](https://twitter.com/Dale_Masch/status/1153416573840850944)).

Ever since I read Shannon's post, [I have been pinging her every
time](https://github.com/rstudio/rmarkdown/issues/2158#issuecomment-854176451) I
found a problem caused by the lack of blank lines ("look, your wisdom shined
again").

BTW, if you use the RStudio [Visual Markdown
Editor](https://rstudio.github.io/visual-markdown-editing/), you will not run
into this problem. The visual editor will guarantee that blank lines will be
inserted where appropriate.

## An anecdote

The first time when I read Shannon's post, I told her a story. At the [2019
Uncoast Unconference](/en/2020/02/uncoast-unconf/), I saw that a presenter did
not have blank lines between different Markdown elements, which caused problems
in the HTML output (e.g., bullet lists were not rendered as lists but
paragraphs). After his presentation, I walked up to him, and apologized for the
lack of space between him and me since I was standing embarrassingly close to
him. I told him that he would benefit from a few more blank lines in the
Markdown source, and if it would help him memorize it better, I could apologize
with a deep bow, hitting his chest with my head.

I was kidding about the bow. I hope I did not appear rude.
