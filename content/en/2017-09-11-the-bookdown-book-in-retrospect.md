---
title: The bookdown Book in Retrospect
date: '2017-09-11'
slug: the-bookdown-book-in-retrospect
---

When [the **bookdown** book](https://bookdown.org/yihui/bookdown/) was published in last December, my editor John Kimmel told me that I made a record in his career. This book was the fastest one he had ever published. It only took a couple of months from me signing the contract to the printed copies being available on the market. I want to share a few random memories in this process.

## Get it done before talking about it

I have to admit that I have failed to accomplish a lot of things that I promised over the years. This makes me feel really bad, and I can tell you that I constantly felt guilty especially in the years 2014 and 2015. Someday I'll write more about [my crisis](/en/2018/02/career-crisis/).

To avoid failing to keep my promises, I developed a special strategy when writing a book: I wouldn't talk to a publisher until I finish the first draft of the book. In particular, I won't send a book proposal to the publisher. Basically, I'll try to get the whole book done before I start to think about publishing it. Publishing the bookdown book was a much more comfortable process due to two reasons: I had finished the draft when I started to talk to John (not much burden left on writing), and the book was short (only a little over 100 pages).

## Forget about typos

In some of my previous talks, I have mentioned that I ignore my typos on purpose when I write. To some extent, I even hope I have some typos in the manuscript, so that readers can help a bit as they read the book. I have no evidence to support it, but I believe that when a reader realized she could help correct typos, she would probably read the manuscript more carefully. Evil me, but look at the merged [pull requests](https://github.com/rstudio/bookdown/pulls) to correct my typos.

## Automate as much as possible

I have published the **knitr** book with John in 2013 (and 2nd edition in 2015), and I'm fairly familiar with the LaTeX style of Chapman & Hall. I also know what the copy editors are mostly looking for. For example, I know how many blank pages I should leave before the preface, fonts should be embedded in PDF, and they will circle out the words that exceed the page margin. I also know they will ask me to make my syntax-highlighted code blocks black and white, so that I actually wrote a simple function in **bookdown**, [`rgb2gray()`](https://github.com/rstudio/bookdown/blob/347337a6b/R/latex.R#L288-L291), to convert colors to grayscale after I read a [Wikipedia article](https://en.wikipedia.org/wiki/Grayscale):

```r
rgb2gray = function(x, maxColorValue = 1) {
  rep(sum(c(.2126, .7152, .0722) * x/maxColorValue), 3)
}
```

Then I added an argument `highlight_bw` to the `bookdown::pdf_book()` format, so that I can easily turn my colored code blocks to grayscale using a single switch.^[On a side note, [Gavin Simpson thought](https://twitter.com/ucfagls/status/867455372843405312) "it (the lightgray background) looks like shit", but personally I'm happy with the background. Perhaps it has something to do with the printers. I'm comfortable as long as the background color is very light.]

## Acknowledgments

Although it sounds a little funny, my favorite part in writing a book is to write the section of [acknowledgements](https://bookdown.org/yihui/bookdown/acknowledgments.html). This is the only part in which the authors have complete freedom to say whatever they want to say. I have mentioned this in my company blog post when I [announced **bookdown**](https://blog.rstudio.com/2016/12/02/announcing-bookdown/).^[[...] thank your kids in the preface (without whom you should have finished the book two years earlier)...]

A month ago, Dean Attali suddenly (and happily) [discovered](https://twitter.com/daattali/status/897336328500674560) that I thanked him in this book. I love leaving surprises here and there, and let people discover them even a year later. I'm not sure if it is specific to the Chinese culture, but the joy of discovering a five-dollar bill in a book that you read long time ago (when you used the bill as the bookmark) is much stronger than getting five dollars directly from your parents. This is why many Chinese kids love reading (just kidding).

Don't underestimate the power of thanking people. As one example, my copy editors were very surprised and excited to see that I thanked them in the book. The second round of review from the copy editors came back on a Sunday (!) morning. I could feel they were trying their best to help me publish the book as quickly as possible. And I sent the revision back in that evening.

## The royalties

I have also mentioned multiple times when I gave talks on **bookdown** that I think books are generally too expensive. I didn't buy a single book when I was a graduate student. This is a hard problem to solve, but I hope **bookdown** can help a bit: I hope **bookdown** can make it really easy (technically) to write books, so there will be more and more books getting written, and the increase in supply may decrease the price. That is a long way to go, but now you can take a look at https://bookdown.org. The future is not completely dark there.

To make the **bookdown** book cheap, I waived my royalties and asked John to keep the price below $20. Thankfully, he and Chapman & Hall made it.

Actually I didn't take any royalties from the **knitr** book, either. I donated them to the Department of Statistics at Iowa State (my Alma Mater), to thank this department to help me when I first arrived in the US in 2009 with a personal misfortune.

I did this not completely out of goodwill. Two reasons include: (1) I'm a non-immigrant in the US and I don't have the freedom to make any money besides working for my employer; (2) 
I don't really need the royalties to be able to survive, thanks to my current generous employer.

## Conclusion

Writing a book is both fun and pain, but I think it is a very meaningful thing to do. I have tried to encourage many people to write something lengthy instead of spending too much time on social media and writing short sentences.

It is a totally different world.
