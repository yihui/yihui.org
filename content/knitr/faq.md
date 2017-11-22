---
title: Frequently Asked Questions
date: '2017-02-17'
---

This FAQ is compiled from the [issues](https://github.com/yihui/knitr/issues) and messages I received from blog posts and emails, etc. Personally I'm not big fan of FAQ's, and I believe sometimes FAQ's are nearly bugs. Software package authors should think why users ask some questions so frequently (it is unlikely that users are always stupid). At least I'm not patient enough to read, say, 128 FAQ's one by one, so I won't let you do it, either.

1. **knitr** does not work...
    - Please first update all your R packages (use `update.packages()`) and probably R itself ([what is the current R version?](https://cran.rstudio.com)), then see if it works; if not, please file an [issue](https://github.com/yihui/knitr/issues) to me with a minimal reproducible example and the output of `library(knitr); sessionInfo()`.

1. What is the best place to ask questions when the package website is not helpful?
    - Depending what you want to ask, you may use these tools (I keep track of the first two more frequently):
        - (Recommended) [StackOverflow](http://stackoverflow.com/questions/tagged/knitr): general questions (more experts and quicker answers there). Don't forget to use both the tags `r` and `knitr`.
        - [Github issues](https://github.com/yihui/knitr/issues): bug reports and feature requests only.
        - [knitr mailing list](https://groups.google.com/group/knitr) or [R-help](http://www.r-project.org/mail.html) list: general questions and feedback via email in public.
        - Private emails [are not recommended](/en/2017/08/so-gh-email/) unless there are really private issues.
        - Twitter ([@xieyihui](http://twitter.com/xieyihui)) if you really believe it is a simple question.

1. What is the best editor for writing **knitr** source documents?
    - For beginners, perhaps [RStudio](https://www.rstudio.com); **knitr** is also supported in [LyX](/knitr/demo/lyx/), [Emacs/ESS](http://ess.r-project.org/), WinEdt, Tinn-R and a variety of [editors](/knitr/demo/editors/).

1. Where are those prompt characters `>` and `+`? I feel uncomfortable reading R output without them.
    - They are removed by default, because [I believe they make no sense](/en/2013/01/code-pollution-with-command-prompts/). This is the reason why I dislike books on R which used `>` and `+`; they twist my mind and make my eyes bleed when I read the R code in the books. For those who really want to read R code like `> 1+1` instead of `1 + 1`, you have the [chunk option](/knitr/options/) `prompt`.

1. What is the working directory? Can I change my working directory in my code chunks?
    - You'd better not do this. Your working directory is always `getwd()` (all output files will be written here), but the code chunks are evaluated under the directory where your input document comes from. Changing working directories while running R code is a bad practice in general. See [#38](https://github.com/yihui/knitr/issues/38) for a discussion. You should also try to avoid absolute directories whenever possible (use relative directories instead), because it makes things less reproducible.  If you do still decide to use `setwd` in a code chunk, beware that the new working directory will only apply to that specific code chunk, and any following code chunks will revert back to use the original working directory.

1. The gray (shading) box is too narrow for my output.
    - No, it is not because the box is too narrow (the box uses the current line width); it is because your output is too wide. Use a smaller `width` option to avoid text output exceeding the page margin, e.g. `options(width = 60)` (see [example 038](https://github.com/yihui/knitr-examples/blob/master/038-output-width.Rnw)).

1. How can I write a literal / verbatim code chunk? i.e., write a code chunk that is not parsed (which can be useful for tutorials).
    - You need to destroy the chunk header, e.g., add an empty string before or after the chunk header like ```` ```{r}`r ''` ```` ([#443](https://github.com/yihui/knitr/issues/443)), or add a [zero-width space](http://en.wikipedia.org/wiki/Zero-width_space) into the chunk header; see [example 065](https://github.com/yihui/knitr-examples).
    
        ````
        ```{r, eval=TRUE}`r ''`
        1 + 1
        ```
        ````
    - For inline R code, you may use the function `knitr::inline_expr()` (available in knitr >= v1.8). If you are writing an R Markdown document, you can use a trick: break the line _right after_ `` `r `` (no spaces after it), and wrap the whole inline expression in a pair of double backticks, e.g.,

        ```
        This will show a verbatim inline R expression `` `r
        1+1` `` in the output.
        ```

        See [this post](/en/2017/11/knitr-verbatim-code-chunk/) for explanations if you are curious.

1. What can I do for you?
    - You can donate to me if you want ([paypal](https://paypal.me/YihuiXie)), [tweet](https://twitter.com/xieyihui) funny GIF animations to me, or fork the **knitr** repository on Github and contribute code.
    - Cite the package and the [knitr book](http://amzn.com/1498716962); see `citation('knitr')` in R.

1. How can I submit a documentation fix or other minor changes?
    - To fix anything in the R package: navigate to the file within the [repository](https://github.com/yihui/knitr); click the Edit button on the top-right toolbar; make the necessary changes; add a descriptive commit summary, click on **Propose file change**, and submit the pull request.
    - To fix anything or propose changes on any page of this website, please click on the menu `Edit this page` on the left of the page, and follow the same steps on Github.
