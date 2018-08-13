---
title: Write a Book with bookdown and Publish with Chapman & Hall
date: '2018-08-06'
slug: bookdown-crc
---

My editor John Kimmel told me that many authors showed interest in **bookdown** at JSM 2018 in Vancouver last week. I was very glad to know that. In this post, I want to briefly explain how to publish a book with Chapman & Hall/CRC. Actually I [blogged about it](/en/2013/06/tips-for-writing-an-r-book/) five years ago after I published my first book, but at that time, I was still in the LaTeX (LyX) world, and this time I want to talk about R Markdown instead. I have also written about my experience with [the **bookdown** book](/en/2017/09/the-bookdown-book-in-retrospect/) and [the **blogdown** book](/en/2017/12/blogdown-book/) previously.

## The minimal template `bookdown-crc`

While I was working on [the **bookdown** book](https://bookdown.org/yihui/bookdown) in 2016, I created a minimal book example on Github in the repository https://github.com/yihui/bookdown-crc. This repository contains the LaTeX class file `krantz.cls` as well as many LaTeX tricks that I copied and pasted from Stack Overflow (e.g., how to print the page numbers in the correct format---you'll need `\frontmatter`, `\mainmatter`, and `\backmatter`). Hopefully they will save you a lot of time. Basically you can just start writing the content of your book after you clone or download this repository.

![The front page of the bookdown-crc example](https://user-images.githubusercontent.com/163582/43736420-218f56ec-9983-11e8-8740-ec0a1fce660f.png#border)

## Get started

The first file you may edit is `index.Rmd`, in which you should change at least the title and author in the YAML metadata. You should update the `github-repo` field if your book source is available on Github, otherwise just delete this field.

The `index.Rmd` is the preface of your book. It usually contains unnumbered sections (the syntax is `{-}` after a section header), such as "Why read this book" and "Acknowledgements".

You can edit/rename existing chapters (e.g., `01-introduction.Rmd`), or add new chapters. When you need an appendix, you need a special header `# (APPENDIX) Appendix {-}`, which you can find in `90-more.Rmd` in the example. Any chapters after this chapter will be in the appendix.

If you need an index at the end of your book, currently you have to use the raw LaTeX command `\index{}` in Markdown. When building your book to PDF, an index page will be generated automatically. Please note that you have to escape special LaTeX characters in `\index{}`, e.g., `\index{bookdown::pdf\_book}` (the underscore should be escaped).

## Customization

I have talked about the possible options to customize the PDF in [Section 6.3](https://bookdown.org/yihui/bookdown/publishers.html) of the **bookdown** book. You are free to use any typeface you like. I have used Alegreya, Palatino, and Source Code Pro myself. When choosing fonts for your code blocks, I suggest you use either a relatively narrow font or reduce the font size (e.g., I use 70%), because your code can easily exceed the page margin when printed on a book (the paper size is roughly B5, which can hold about 55 characters on a line of code).

I think the typeface should be the only thing you may want to customize. Other things are trivialities and not worth too much time. Don't be preoccupied with customizing the appearance of your PDF (at least don't do this too early). I guess the No.1 reason that authors fail to publish their books is not because the PDF does not look good, but they just cannot get the book done. Think about what is essential, and what are cosmetic issues.

## Need more examples?

The above example is a minimal one. If you want full examples, you can find a few more from https://bookdown.org (e.g., the three of my books, and Hadley's "Advanced R"). They will be more complicated, but may be useful if you want to learn a particular trick, such as how to place two figures side by side.

## Open source and public access are totally possible

To me, the most exciting change brought by **bookdown** regarding publishing books with Chapman & Hall is that there has been a trend for authors to make the source of books and the web versions of the full books freely available online. Now Chapman & Hall only asks for the right for printing and selling the books. Authors can keep the free online versions. I consider one of my life dreams fulfilled.

I have believed there are multiple ways of tearing down the paywall. Personally I want to choose a way that does not really hurt the publishers but benefits the readers nonetheless. I feel it is really unfortunate that some people think authors/readers and publishers must be enemies of each other, and we should either kill the publishers (by pirating) or (literally) kill ourselves. Sometimes we really need a little more patience and understanding.

Anyway, I'm looking forward to more exciting books! You don't have to publish with Chapman & Hall. I just happened to choose them after hearing good words about John Kimmel from a random friend. You can certainly use **bookdown** to write books with Springer or O'Reilly (there are examples on bookdown.org).
