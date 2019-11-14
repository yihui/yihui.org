---
title: 'One Little Thing: knitr::combine_words()'
subtitle: Combine objects into a phrase for human-readability
date: '2018-06-18'
slug: knitr-combine-words
---

When you want to output a character vector for humans to read, you probably don't want something like `[1] a b c`, which is the normal way to print a vector in R. Instead, you may want a character string `"a, b, and c"` (Oxford comma FTW!). In 2014, I gave a guest lecture in a course at Iowa State. I prepared an example in which I wanted to output the names of some genes dynamically with an inline R expression in a **knitr** document. In the beginning, I didn't want to spend too much time on this task, so I just used `` `r paste(x, collapse = ', ')` ``, which would output a character string like `"a, b, c"`. This did not feel natural in the context (e.g., "We identified genes a, b, c.").

Driven by perfectionism, I decided to write a function, which ended up in the **knitr** package as `knitr::combine_words()`. The implementation was actually quite simple. Basically, for a single word, it will just return this word; for two words A and B, it return `"A and B"`; for three or more words, it returns `"A, B, C, ..., Y, and Z"`. The function also has a few arguments that can customize the output. For example, if you want to output the words in pairs of backticks, you may use ``knitr::combine_words(x, before = '`')``:

```r
knitr::combine_words(LETTERS[1:5], before = '`')
# output: `A`, `B`, `C`, `D`, and `E`
```

Since then, I have used this function by myself several times. Today I saw [a Stack Overflow question](https://stackoverflow.com/q/50899805/559676) that asked about the same thing, so I thought it might be a good idea to reveal this little function in **knitr**, although I'm relatively sure someone else must have also implemented it independently in other packages.

P.S. On an only marginally related note, here is a cat trying to demonstrate the importance of the "Oxford comma" (the Oxford cat?):

![Meerkat, meerkat, the Oxford cat, and meerkat](https://slides.yihui.org/gif/camouflage-3.jpg)
