---
title: Merge Consecutive Blockquotes in Markdown
date: '2023-09-14'
slug: merge-blockquotes
---

Older versions of Hugo use a library named Blackfriday to convert Markdown to
HTML, which is not compliant with CommonMark (unlike Goldmark in newer versions
of Hugo). One problem with Blackfriday is that blank lines inside blockquotes
are treated as part of the blockquotes. For example,

``` md
> One

> Two
```

will be converted to:

``` html
<blockquote>
  <p>One</p>
  <p>Two</p>
</blockquote>
```

With the CommonMark specs, it should be converted to two blockquotes because of
the blank line:

``` html
<blockquote>
  <p>One</p>
</blockquote>
<blockquote>
  <p>Two</p>
</blockquote>
```

To generate a single blockquote, the blank line must also start with `>`.

A lot of my old posts have this problem. I guess it might be solved by a Pandoc
(Lua) filter, but I do not need rigor, so I wrote an R function to process my
Markdown files instead ([like last time](/en/2023/02/markdown-footnotes/)):

``` r
# add > to empty lines to merge consecutive blockquotes
merge_bq = function(x) {
  if ((n <- length(x)) < 3) return(x)
  
  r = '^(>( >)* ?)(.*)$'
  i = grep(r, x)
  if (length(i) < 2) return(x)

  # exclude consecutive lines that start with >
  i = i[c(diff(i) > 1, TRUE)]
  if ((n <- length(i)) < 2) return(x)
  
  for (k in 1:(n - 1)) {
    i1 = i[k]; i2 = i[k + 1]
    # from line #i1 on, a line should not be blank unless
    # the rest of lines are all blank till line #i2
    i3 = (i1 + 1):(i2 - 1)
    b = xfun::is_blank(x[i3])
    if (any(b) && !all(tail(b, -which(b)[1]))) next

    p = sub(r, '\\1', x[i1])  # '> ' (or nested '> > ...')
    p = sub(' *$', ' ', p)    # ensure trailing space
    x[i3] = paste0(p, x[i3])
  }
  
  x
}
```

The code is nowhere near elegant or easy to understand. I'm leaving a record
here nonetheless because I have written a lot of dumb code like this in my
career. I do not want to pretend that I'm always writing elegant code. On the
contrary, most of code I write is perhaps quite dumb and boring.

Recently I talked with Peng Liu at JMP about our software development career
since he was hoping to organize a JSM session on this topic (which did not work
out, unfortunately). Although I did not plan to attend JSM, I thought for a
while what I could share if I were to give a talk. One thing that came to my
mind was how much formal training in computer science we need to be a successful
software engineer. I was thinking about this because I did not receive any
formal training, and I do not really know much about algorithms. If I were to
look for a software development job, I guess I'd be immediately rejected due to
my poor knowledge in computer science.

But I can write `for` loops (with care and patience) and use regular
expressions. I feel I have been making a living on them (thankfully the
[impostor syndrome](https://en.wikipedia.org/wiki/Impostor_syndrome) cannot beat
me). Usually I write code very slowly because my brain is slow. The above `for`
loop took me nearly two hours. On my mind, I was just wrestling with a few lines
of text---some start with `>`, and some are blank.

Some quick tests:

``` r
merge_bq(c('> a', '', '> b'))
```

```         
> a
> 
> b
```

``` r
merge_bq(c('> a', 'c', '', '> b'))
```

```         
> a
> c
> 
> b
```

``` r
merge_bq(c('> a', '', 'c', '> b'))
```

```         
> a

c
> b
```

``` r
merge_bq(c('> a', '', '> > c', '', 'd', '', '> b'))
```

```         
> a
> 
> > c

d

> b
```

``` r
merge_bq(c('> a', '', '> > c', 'd', '', '', '> b'))
```

```         
> a
> 
> > c
> > d
> > 
> > 
> b
```

All seem good, so I batch processed all my posts:

``` r
# process all writable [R]md files
files = blogdown:::list_rmds(pattern = blogdown:::md_pattern)
files = files[file.access(files, 2) == 0]  # writable
for (f in files) xfun::process_file(f, merge_bq)
```

Thanks to Git, I could do a manual check on [the
changes](https://github.com/yihui/yihui.org/commit/123dd76) before I commit them
(I did revert a few changes because blank lines actually meant to be blockquote
separators).
