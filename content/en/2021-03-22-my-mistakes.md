---
title: A List of Mistakes that I Have Made in My Software Engineering Career
date: '2021-03-22'
slug: my-mistakes
---

This post is a collection of mistakes that I have made in my career of software
development. I want to maintain such a list and reflect on them occasionally, so
I can avoid making the same mistakes again. The list is definitely incomplete
and will be updated from time to time. If there are any additional mistakes of
mine that you remember, I will truly appreciate it if you could remind me in the
comments (or email me).

1.  I had a wrong and outdated belief in BibTeX, which was corrected by Nick
    Bart in the [bookdown PR](https://github.com/rstudio/bookdown/pull/772). He
    first pointed out my mistakes in the issue
    [#754](https://github.com/rstudio/bookdown/issues/754). In particular, he
    thought that my assessment of `pandoc-citeproc` was both "factually
    inaccurate and needlessly disparaging". I admit my ignorance and really
    appreciate Nick's correction.

    Lessons learned:

    > Do not judge tools that I'm not really familiar with. If I have to assess
    > them, do more research or ask experts for input, to avoid spreading
    > misinformation or unfair assessments. It still surprises me that the
    > *Chicago Manual of Style* [calls
    > for](https://library.ship.edu/c.php?g=21703&p=127136) inverting the first
    > and last name of only the first author when there are multiple authors in
    > a bibliography entry. This has been such a weird style to me that I
    > thought it was a bug of `pandoc-citeproc`, but I was completely wrong.

2.  Cropping PDF figures in **knitr** requires both `pdfcrop` and `ghostscript`.
    Originally I only checked the existence of `pdfcrop` and assumed that users
    would read its documentation to figure out that they would also need to
    install `ghostscript`, but it turned out that my assumption was not
    appropriate. The problem of the missing `ghostscript` has confused multiple
    users. Five years after the [**knitr**
    issue](https://github.com/yihui/knitr/issues/954) was reported, I finally
    realized that this problem was too difficult for average users to debug, so
    I made changes in **knitr** and **rmarkdown** to disable this feature by
    default when `ghostscript` is not available.

    Lessons learned:

    > When the changes I need to make in the code are relatively simple, I
    > should make the changes, instead of requiring users to read the
    > documentation of a third-party software package.

3.  In 2013, [Jared Lander reported](https://github.com/yihui/knitr/issues/492)
    that the tilde was too high in the code blocks of PDF output generated from
    `.Rnw` documents. I was rather impatient at that time and said the rude
    words "This is where I absolutely hate LaTeX." Eight years later, [Berry
    Boessenkool reported](https://github.com/yihui/knitr/issues/1992) the same
    issue again. This time I calmly assessed the problem, and decided to provide
    a fix instead of simply hating LaTeX. The fix turned out to be simple
    enough. LaTeX is an amazingly powerful typesetting system. To be honest, I
    still do not prefer authoring documents with it, because the typing effort
    is too high to me and I often find LaTeX commands distracting in the
    document body (to be equally honest, I even find the Markdown syntax
    distracting sometimes, especially the hyperlink syntax `[text](url)`).
    However, I think it is unfair to say I hate LaTeX simply because of a high
    tilde. The tilde problem is surprising and annoying, but it is just a small
    annoyance that could be solved automatically. I should not deny the whole
    LaTeX system because of this problem, especially when solutions exist.
    Besides, there might be a historical reason why the tilde is too high. Its
    author might regret it now but it is too late. As a software engineer
    myself, do I have regrets in my work that are too late to change? Of course
    I do.

    Lessons learned:

    > Be tolerant of small annoyances in large software systems. Let him who is
    > without sin cast the first stone. Unfortunately, I was [still making this
    > mistake in 2020](/en/2020/02/rstudio-conf-2020/) (mocking at LaTeX, Word,
    > PowerPoint, and beamer, etc.).

4.  When I started writing and promoting the **knitr** package in late 2011, I
    highlighted the improvements compared to Sweave too much, and shouted out
    loud my frustrations with Sweave publicly for too many times. In retrospect,
    I appeared to be ungrateful to Sweave and its authors (especially Friedrich
    Leisch). Unfortunately, it took me nearly ten years to realize how deeply
    hurtful this could be, after a similar thing happened to myself. I have
    revised some of my web pages to treat Sweave more fairly, and credit where
    credit is due. Now I just wish Fritz could forgive me someday. To be fair,
    Sweave was a quite clever and novel implementation of Literate Programming
    (LP), and is still probably one of the very few faithful implementations of
    LP (no, [I still do not
    think](/en/2018/09/notebook-war/#literate-programming-for-real-for-software-development)
    IPython or Jupyter is a true implementation of LP, despite its extreme
    popularity).

    Similarly, [my wording was also too
    aggressive](https://github.com/rstudio/tinytex/commit/2714e926) about TeX
    Live when promoting TinyTeX from 2017. Thankfully, Karl Berry and Norbert
    Preining have been forgiving to me, and Karl even invited me to write an
    article about TinyTeX [in the
    TUGBoat](https://tug.org/TUGboat/Contents/contents40-1.html)!

    Lessons learned:

    > Recognize the second-mover advantage. Show respect and be grateful to the
    > pioneer in the field. As the second mover, I get the pioneer's ideas and
    > work for free (which is especially true for free and open source
    > software), and the hands of the pioneer are often more tightly tied than
    > mine, since the second mover does not have any historical debt. It is
    > often easier to start afresh than to maintain an existing package.

5.  In 2017, after supporting **tinytex** in the R Markdown ecosystem, I started
    to think about [using **tinytex** for Rnw
    documents](https://github.com/rstudio/tinytex/issues/10) when users click on
    the Knit button in RStudio. Rnw documents could already take advantage of
    **tinytex** if they are compiled via `knitr::knit2pdf('test.Rnw')`, i.e.,
    `knitr::knit2pdf()` will call `tinytex::latexmk()` to compile the
    intermediate `.tex` to `.pdf`, which means missing LaTeX packages will be
    automatically installed. However, I suspected that most RStudio users might
    be used to the Knit button, which did not use `tinytex::latexmk()` at that
    time, so I filed [a feature
    request](https://github.com/rstudio/rstudio/issues/2788) to the RStudio IDE.
    My colleague Kevin Ushey finally implemented it. Two things surprised me in
    this process:

    -   I got 17 thumb-ups in my feature request in the rstudio repo on
        Github---originally I thought few people would care about it, e.g., I
        did not know that [Nick still uses
        Rnw](https://github.com/rstudio/rstudio/issues/2788#issuecomment-514501986).

    -   Emmanuel Charpentier appeared to be uncomfortable with me saying "I
        don't think Rnw is still widely used today," and argued that Rnw and
        LaTeX were still used and indispensable.

    For some reason, Emmanuel misunderstood me. I intended to help Rnw users,
    but he thought I was going to kill Rnw. How come my helping hand (in my
    eyes) became the hand of a murderer? I just could not understand the
    misunderstanding, until I was hurt by a "helping hand" a few years later,
    and the helping hand could not understand how it actually pushed me into a
    hell.

    Lessons learned:

    > Be aware of asymmetric power dynamics. R Markdown is likely to be on the
    > more powerful side now, and LaTeX is on the less powerful side in the R
    > community. If I want to support the latter better, I should just go ahead
    > and do the work, and should not have brought up "popularity" in the mean
    > time. "Popularity" is a sensitive and dangerous topic to be mentioned, and
    > worse yet, often irrelevant. Remember, influenza is also "popular," but
    > you probably do not want to get it because of its popularity. How do I
    > know R Markdown is not flu? I cannot really tell.
    >
    > How many Rnw users are there today? I still do not know. Since I do not
    > have data, I'm not entitled to say "Rnw is not widely used today" or "R
    > Markdown is more popular." As an R Markdown developer, I'm definitely
    > biased.

6.  I have hoped to learn more about Jeroen's [**curl**
    package](https://github.com/jeroen/curl) for a long time, because many web
    services provide APIs now; **curl** is rather low-level, but sometimes I'm
    just interested in learning low-level stuff (except for the C language).
    Finally I got an incentive---I received a notice from CRAN, which
    recommended package authors to stop using `ftp://`. I used it in
    `xfun::upload_win_builder()`. I have been wondering if it is possible to
    automate the upload via
    [https://](https://https://win-builder.r-project.org/) instead. Then I
    discovered `curl::handle_setform()` and `curl::form_file()`. Problem solved.

    Then I became more ambitious, and wanted to tackle a problem that I had
    never completely understood before---calling an API with authentication. I
    had a vague sense that the authentication info should be included in a HTTP
    request header, but I did not know the format or how to add the info. It did
    not take me long to discover `curl::handle_setheaders()`. Since I also need
    to send a file in the request, I tried `curl::curl_upload()`, but this
    function does not support setting headers directly. It was quite
    straightforward to add the support, so I sent the PR
    [jeroen/curl#243](https://github.com/jeroen/curl/pull/243). Then Jeroen told
    me I could just use the `httpheader` argument, which is equivalent to using
    `handle_setheaders()`. I was glad to learn this simple solution, but when I
    tried it, it did not work.

    I tried to make a minimal reprex but was not able to reproduce the problem
    in simpler cases. After a couple of hours of investigation, it turned out
    that I accidentally typed the colon in `Authorization: blabla` with my
    Chinese input method turned on, which gave me a full-width colon. It was
    hard to tell the difference between `Authorization：blabla` and
    `Authorization: blabla`. How did I discover it eventually? Well, I copied
    the header from the working example, and compared it with the the header in
    my failing code. I was taken aback by the result:

    ``` r
    > 'Authorization：blabla' == 'Authorization: blabla'
    [1] FALSE
    ```

    I could not believe my eyes. I read every single letter, A, u, t, h, o, r,
    i, z, ..., to make sure I did not misspell anything. Why were the two
    strings different? Once again, Sherlock Holmes was right:

    > When you have eliminated the impossible, whatever remains, however
    > improbable, must be the truth.

    I compared every single letter, but omitted the colon.

    Lessons learned:

    > It is unbelievable that this simple mistake took me more than two hours to
    > fix. Part of the reason was that I was a little skeptical of what Jeroen
    > told me: `handle_setheaders()` worked perfectly for me, whereas
    > `httpheader` did not---how could they be equivalent? I was misled by the
    > "fact" that I observed, and even spent some time on reading the source
    > code to check if they are really equivalent. I was simply wasting my time.
    > I should never doubt Jeroen again about his own packages! When two things
    > look apparently identical, they may not be. When in doubt, use `==`
    > instead of my eyes.

7.  I clearly knew from the very beginning of the **blogdown** development that
    users would hate the fact that they could not [click on the Knit button to
    compile a post](/en/2021/05/blogdown-knit-save/). That was due to a
    technical limitation that I thought was impossible to conquer, after a
    communication with a colleague. After another communication three years
    later (because it was such a painful problem), I realized that I
    misunderstood the limitation and overestimated the difficulty to remove it.
    By that time, I had suffered a lot from it as the developer, and so did
    **blogdown** users.

    Lessons learned:

    > When a pain is foreseeable, try harder to fix it directly (which may
    > involve trying harder to communicate), instead of trying to provide a
    > non-intuitive workaround.

8.  [I made a change in **knitr**](/en/2021/10/unbalanced-delimiters/) that
    should have been made right in the beginning ten years ago. In hindsight, it
    is obvious that I should require the backticks in chunk delimiters to match,
    but this requirement had not existed in the ten years. I thought few people
    would have unbalanced chunk delimiters in their R Markdown documents, but [I
    was wrong](https://github.com/yihui/knitr/issues/2057) and there were all
    sorts of unbalanced delimiters in the wild. I made two mistakes here: 1) I
    made the change too quickly, and ended up patching **knitr** on CRAN
    immediately on the next day; 2) I did not work hard enough on the error
    message---originally when the chunk delimiters are not balanced, users will
    run into an obscure error:

    ```         
    Error in parse(text = x, srcfile = src) : 
      attempt to use zero-length variable name
    ```

    I bet no one understands this error. Later I made the error message much
    clearer, telling users exactly which lines in the R Markdown document
    contain unbalanced chunk delimiters.

    Lessons learned:

    > Be more patient with testing reverse dependencies of a package. The
    > breakage does not happen often, but when it happens and I fail to realize
    > it in advance, I'd be in a great hurry to put out the fire. Work harder to
    > avoid obscure error messages.

To be continued...
