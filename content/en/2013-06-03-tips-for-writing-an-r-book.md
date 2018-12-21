---
title: A Few Tips for Writing an R Book
date: '2013-06-03'
slug: tips-for-writing-an-r-book
---

I just finished fixing (hopefully all) the problems in the [knitr book](http://amzn.com/1482203537) returned from the copy editor. David Smith has kindly [announced](http://blog.revolutionanalytics.com/2013/05/two-forthcoming-r-books.html) this book before I do. I do not have much to say about this book: almost everything in the book can be found in the online documentation, questions & answers and the source code. The point of buying this book is perhaps you do not have time to read through all the two thousand questions and answers online, and I did that for you.

[![the knitr book](https://images.tandf.co.uk/common/jackets/crclarge/978148220/9781482203530.jpg)](http://amzn.com/1482203537)

This is my first book, and obviously there have been a lot for me to learn about writing a book. In retrospect, I want to share a few tips that I found useful (in particular, for those who plan to write for Chapman & Hall):

1. Although it sounds like shameless self-promotion, using `knitr` made it a lot easier to manage R code and its output for the book; for example, I could quickly adapt to R 3.0.1 from 2.15.3 after I came back from a vacation; if I were to write a second edition, I do not think I will have big trouble with my R code in the book (it is easy to make sure the output is up-to-date);

1. I put my source documents under version control, which helped me watch the changes in the output closely; for example, I noticed the source code of the function `fivenum()` in base R was changed from R 2.15.3 to 3.0.0 thanks to GIT (R core have been updating base R everywhere!);

1. (opinionated) Some people might be very bored to hear this: use LyX instead of plain LaTeX... because you are writing, not coding; LaTeX code is not fun to read...

1. for the LaTeX document class `krantz.cls` (by Chapman & Hall):
    - to solve the only stupid problem in LaTeX (i.e., floating environments float to silly places by default), use something like this:

        ```tex
        \renewcommand{\textfraction}{0.05}
        \renewcommand{\topfraction}{0.8}
        \renewcommand{\bottomfraction}{0.8}
        \renewcommand{\floatpagefraction}{0.75}
        ```
    
    I'm aware of the `float` package and the `H` option, and options like `!tbp`; I just do not want to _force_ LaTeX to do anything -- it may or may not be happy at some point.

    - put `\usepackage{emptypage}` in the preamble to make empty pages really empty, as required by the copy editor.
    - the document class `krantz.cls` does not work with the **hyperref** package, meaning that you cannot create bookmarks in the PDF; I have posted [the solution here](http://tex.stackexchange.com/q/86005/9128).
1. for authors whose native language is not English like me, here is a summary of my problems in English:
    - when you want to use `which`, use `that` instead, unless there is a comma ahead, or you really want to emphasize a very specific object; e.g.,
    
        > "here is a package _that_ is helpful" (correct)

        > "here is a package _which_ is helpful" (wrong)

        > "we will introduce an extremely important technology next, which has revolutionized the life of poor statisticians"
    - it is "A, B, and C" instead of "A, B and C"
    - do not forget the comma in other places, either: "e.g.,", "i.e.,", "foo and bar, respectively"; actually, try to use the comma whenever possible to break long sentences into shorter pieces
1. for the plots, use the `cairo_pdf()` device when possible; in **knitr**, this means the chunk option `dev = 'cairo_pdf'`; the reason for the choice of `cairo_pdf()` over the normal `pdf()` device is that it can embed fonts in the PDF plot files, otherwise the copy editor will require you to embed all the fonts in the final PDF file of the book; normally `pdflatex` will embed fonts, and if there are fonts that are not embedded, it is very likely that they are from R graphics;
1. include as many figures as possible (I have 51 figures in this 200-page book), because this will make the number of pages grow faster (I'm evil) so that you will not feel frustrated, and the readers will not fall into the hell of endless text, just pages after pages;
1. prepare an extra monitor for copyediting;
1. learn a little bit about `pdftk`, because you may want to use it finally, e.g., replace one page with a blank page in the frontmatter;
1. learn these [copy editing symbols](http://biostatmatt.com/uploads/ProofreadSymbols.pdf) (thanks, Matt Shotwell);

One thing I did not really understand was the punctuation marks like commas and periods should go _inside_ quotation marks, e.g.,

> I have "foo" and "bar."

This makes me feel weird. I'm more comfortable with

> I have "foo" and "bar".

There was also one thing that I did not catch by version control -- one figure file went wrong and I did not realize it, because normally I do not put binary files under version control. Fortunately, I caught it by my eyes. Karl Broman mentioned the same problem to me a while ago. I know there are tools for comparing images (ImageMagick, for example), and I was just too lazy to learn them.

I will be glad to know the experience of other authors, and will try to update this post according to the comments.
