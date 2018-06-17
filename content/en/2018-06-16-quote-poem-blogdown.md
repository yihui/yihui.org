---
title: 'One Little Thing: Quote a Poem with blogdown'
date: '2018-06-16'
slug: quote-poem-blogdown
---

One of the most frequent topics on which I blog in recent years is Chinese literature (of course, only in my Chinese blog). In particular, I often quote poems in my posts. To quote a poem in Markdown, you have to add two trailing spaces after every line of the poem. Two trailing spaces means a hard line break in Markdown. A line break in the Markdown source does not mean a line break in the output (usually white spaces are not meaningful in Markdown).

I have been tired of manually adding the trailing spaces (also `>` to the beginning of every paragraph) . Finally [I wrote a tiny function `quote_poem()`](https://github.com/rstudio/blogdown/commit/ad8be3ffb5) in **blogdown** to do this. The function was not exported, but that should be fine, because I also provided a corresponding RStudio addin named "Quote Poem". Currently this feature is only available in the [development version of **blogdown**](https://github.com/rstudio/blogdown/). The usage of the addin is simple: just select the poem in the RStudio source editor, and click the addin. For example, if you paste a poem in RStudio:

```
Like Barley Bending
　by Sara Teasdale

Like barley bending
　In low fields by the sea,
Singing in hard wind
　Ceaselessly;

Like barley bending
　And rising again,
So would I, unbroken,
　Rise from pain;

So would I softly,
　Day long, night long,
Change my sorrow
　Into song.
```

You can select it, and click the addin, which will generate the expected output below:

> Like Barley Bending  
　by Sara Teasdale

> Like barley bending  
　In low fields by the sea,  
Singing in hard wind  
　Ceaselessly;

> Like barley bending  
　And rising again,  
So would I, unbroken,  
　Rise from pain;

> So would I softly,  
　Day long, night long,  
Change my sorrow  
　Into song.

I guess **blogdown** users might be surprised by this function/addin the first time they see it. Poems... and **blogdown**?  How can _an R package_ be possibly related with _poems_?!

Yes, I just care that much about blogging, and want to improve at least my own writing experience by one little function at a time.
