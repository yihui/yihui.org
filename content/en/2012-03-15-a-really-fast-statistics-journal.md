---
title: Ideas on A Really Fast Statistics Journal
date: '2012-03-15'
slug: a-really-fast-statistics-journal
---

I was writing comments on the blog post [A proposal for a really fast statistics journal](http://simplystatistics.tumblr.com/post/19289280474/a-proposal-for-a-really-fast-statistics-journal), and I realized the comment box was too small to write down my ideas. I like the proposal a lot, and I feel really bad about the current model of submitting and reviewing papers: it is just too slow! We should not blame it on editors and reviewers; everybody is busy. The question is how to reduce unnecessary efforts in this process. My ideas are close to one possible actual implementation of Jeff's proposal.

There are a few silly rules in some journals that I hate, and I believe they are wasting the time of everybody, e.g.,

- File format of figures: some journals still require authors to use EPS (postscript) or WMF (Windows metafile);
- Double-spaced typesetting: oh, please stop killing trees! It makes no sense to typeset with a large line height, unless you mail the papers to reviewers and ask them to write reviews with a pen, then mail the review back to the author; you do not really do this, so why ask authors to use the ugly double-spaced typesetting?
- Leave figures/tables blank in the body of the paper (write _Insert Figure 1 Here_) and put them in other places.

I have to remind myself that this is the 21st century. These are actually not a big deal in terms of statistics papers. The more important problem is journals are operated by a very small group of people relative to the large number of authors. The even more important problem is reproducibility, which Roger Peng often mentions in their blog.

# An open-access journal

This journal is electronic like [JSS](http://www.jstatsoft.org/), and you can see everything on the website. For authors, LaTeX is too laborious, so we abandon LaTeX. For website maintainers, HTML is laborious as well, and we abandon HTML as the authoring language.

We turn to [Markdown](http://daringfireball.net/projects/markdown/). Why? It is simple. I hate writing a paper with `\documentclass{}` as my first line -- I want to start with the title directly in plain text, then write my first paragraph in a simple text editor. Who cares about `\title{}`? Similarly, when I write a webpage, I do not like starting with `<html>` as my first six characters.

My own website is built on [Jekyll](https://github.com/mojombo/jekyll)^[Correction: I have switched to [Hugo](https://gohugo.io) now, and it is still based on Markdown.], a blog engine based on Markdown files to build static HTML pages. The first few days of building this website might be hard, but once the design is done, the rest of the job becomes extremely easy. WordPress is good, but it is still too heavy compared to Jekyll. See my [blog source code](https://github.com/yihui/en), and this blog site is hosted on GitHub, which automatically compiles my Markdown files to HTML pages using Jekyll when I submit new posts or changes to the source repository.

With a good web designer, this journal website can be set up probably in a week. In the future, neither maintainers nor paper authors need to deal with HTML any more. Paper source code looks like:

```markdown
# Title

## Abstract

Here is the abstract.

## First section

Write write and write.

    ```{r}
    plot(1:10)  # code to generate figures
    ```

...
```

I will explain how we maintain this journal and talk about `plot(1:10)` later.

# Faster submission and review

I do not see much difference in submitting computer code and papers, so I'd like to use a version control model for papers as well. As I mentioned in my [last blog post](/en/2011/12/how-to-become-an-efficient-and-collaborative-r-programmer/), GIT and GitHub can make this process fast and easy.

We put the journal website under version control, and all the source code is on GitHub. Authors fork the journal repository and put their papers in the repository. Paper submission is through [pull requests](http://help.github.com/send-pull-requests/), which means the author wants to merge his/her changes (paper) back to the main repository.

Now the chief editor sees the request, and he/she writes a comment under the request like: `@jeff` and `@roger`, please review the new paper. Then Jeff and Roger start looking at the paper. If they want to make comments, they comment _right below_ the lines of the texts, because GitHub supports inline comments in your code. (So why should we continue writing double-spaced papers?)

After they are done, the editor asks the author to read the reviews, revise the paper, push more commits to the pull request, and the reviews can easily see what was changed in the revision, because GIT gives you full history of the revision. You see that the reviewers do not need to re-read the whole paper -- they just look at the revision history. If the problems of the paper are too serious, reviews can write bug reports (GitHub issues) in the author's repository and ask the author to fix these "bugs".

This process can go back and forth, until the editor decides to accept the pull request. Once the new paper is pulled in, Jekyll will recompile the website automatically.

Besides the designated reviewers, all other people can see and comment on the pull request as well, so the paper can be essentially under public review like open source software! If the two reviewers are busy, there might be other good public reviewers helping the review.

You may doubt on the "quality" of public review, but just think about the quality Linux and open source software. If we only rely on Linus Torvalds or Richard Stallman to write code, you can imagine how the open source world looks like today.

The journal can find plenty of good and _active_ reviewers automatically after a while -- they come as a result of _natural selection_; this is better than requesting someone to be a reviewer because it is the "internal force" that drives the public reviewers. In the current journal model, reviewers may feel it is a _job_ to review papers, so incentive is a problem.

# Reproducible papers

I'm quite interested in reproducible research, and I'm all for reproducible results in papers. Well, if you are a statistician, R and Sweave have probably come into your mind. Sweave is great, and the idea of literate programming is awesome. It is just a shame that great ideas were implemented with a narrow vision. I can understand Sweave was tied to LaTeX, but that is a narrow choice. I feel painful to introduce Sweave to other people because I have to teach them LaTeX first.

I do not need to repeat [my motivations](https://github.com/yihui/knitr#readme) to write another R package [knitr](/knitr/) to replace Sweave. The relevant point is reproducible research should be easier for the general public, and LaTeX is not the way to go. Again, Markdown is better. You will never be trapped in all sorts of weird TeX errors. Open a notepad (can be literally Windows Notepad or other text editors), write the text you want, then the code; compile this text file, you get your paper/report. This should be the case if we want to popularize reproducible research. If you have spent many hours on writing a TeX document and carefully embedding R code in it, then compile it...

- Boom! TeX errors!
- Boom! Figures too wide/narrow!
- Boom! Figures floating away!
- Boom! Editors ask you to use EPS instead of PDF figures!
- Boom! R errors!
- ...

The **knitr** package supports Markdown naturally. You can see a [hello-world example](https://github.com/yihui/knitr/blob/master/inst/examples/knitr-minimal.md) and [a real example](http://t.co/eBcm59sW).

I'm not yet very confident about working with Markdown and **knitr** because I have not started using this combination. In the past few months, I have been focusing on the LaTeX support, but I'll start eating my own Markdown dog food soon.

People keep on telling you LaTeX frees your mind, because you only focus on writing and do not worry about styles, and that is a beautiful lie. You worry about styles all day long, and the tricks about styles are usually gory. I would rather say CSS frees you.

OK, this journal only accepts simple Markdown files. No more argument. As I showed you, you can embed R code in Markdown files to compile your papers dynamically. In the future, the server of the journal may compile the papers periodically as well to check if they are still valid. It is easy for reviewers to validate the results too. All authors are required to provide datasets associated with the paper, or at least access to the datasets (e.g. URL's).

We use web pages to present papers. No PDF. A careful design of CSS can beat LaTeX/PDF and give us beautiful web pages. If readers have strong objections to this, we use [pandoc](http://johnmacfarlane.net/pandoc/) to convert Markdown papers to PDF. Math expressions? No problem! Use [MathJax](http://www.mathjax.org/). There are no page limits, and all figures are inserted in appropriate places (they will not float and readers do not need to turn the pages desparately to find your "Figure 7").

If we do everything in web pages, there are yet more possibilities.

- Use SVG graphics or PNG (**knitr** supports more than 20 formats, and it is easy to switch). Let EPS and WMF die.
- Feel R plots are ugly? Want animations? Interactive graphics? No problem! How about using [D3](http://mbostock.github.com/d3/)? How about [Processing.js](http://processingjs.org/)?
- Want to talk to authors? No problem! Leave a comment under the paper just like you comment on blog posts.
- Want to rate a paper? Yes, hit the "Like" button. We do not only let reviewers of the journal rate papers.
- Web statistics about a paper? Yes, we have page views and other statistics. We no longer use the number of times that a paper is referenced to evaluate a paper; we see how many times it has been read. People may add references for various reasons (not necessarily related to the paper).

# Summary

We have been in the age of Web 2.0 for a few years, but journals rarely make good use of the "crowd". We build the world on a small group of people. Our good papers are used to fill in the shelves of libraries and collect dust, when bad articles are occupying the web (like my blog posts) and being discussed actively. We make all sorts of rules to tie the hands of authors, and we wait, wait and wait for the anonymous reviewers, like [waiting for Godot](http://en.wikipedia.org/wiki/Waiting_for_Godot).

