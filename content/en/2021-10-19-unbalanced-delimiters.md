---
title: An Upcoming Breaking Change in knitr on Unbalanced Chunk Delimiters
date: '2021-10-19'
slug: unbalanced-delimiters
---

Life is like a box of Github issues. Hiroaki reported a bug
([#1621](https://github.com/yihui/knitr/issues/1621)) in **knitr** in 2018,
which was finally fixed by Atsushi last month in his PR
[#2047](https://github.com/yihui/knitr/pull/2047).

> Two issues appeared on Github, and I---  
> I merged the PR that looked obviously correct,  
> And that has made all the difference.

## The change

I plan to make a breaking change in **knitr**, but have not decided the timeline
and would appreciate your feedback. I do not know how many users will be
affected by this change. Basically, I'm hoping to make the chunk delimiters
```` ```{r} ```` and ```` ``` ```` match more strictly in R Markdown documents:

1.  The numbers of backticks in the opening and closing delimiters must be
    identical. For example, if you open a code chunk by four backticks, you have
    to also close by four. The following examples will no longer be valid code
    chunks:

    `````` text
    Open by four backticks and close by three:

    ````{r}
    1 + 1
    ```

    Open by three and close by five:

    ```{r}
    2 + 2
    `````
    ``````

2.  If you indent or quote the opening delimiter, you must indent or quote the
    closing delimiter accordingly, too. For example, the following chunk

    ```` text
      ```{r}
      3 + 3
    ```
    ````

    should be corrected to:

    ```` text
      ```{r}
      3 + 3
      ```
    ````

    or if you do not intend to indent the chunk, remove the leading spaces in
    the opening delimiter.

    Similarly, the following quoted chunk

    ```` text
    > ```{r}
    3 + 3
    ```
    ````

    should be corrected to:

    ``` text
    > ```{r}
    > 3 + 3
    > ```
    ```

It should be unlikely for this change to affect you if you have been using the
keyboard shortcut `Ctrl / Cmd + Alt + I` to insert code chunks into R Markdown
in RStudio, and do not indent or quote code chunks. However, if you have been
manually typing the backticks, chances are you may have extra backticks or
spaces in the chunk delimiters.

To verify, you may install the development version of **knitr** and compile your
R Markdown documents:

``` r
remotes::install_github('yihui/knitr')
```

If you have problematic code chunks, you will see a warning or error message
like this:

> The closing backticks on line 292 (````` "````" `````) in foo.Rmd do not match
> the opening backticks ```` "```" ```` on line 285. You are recommended to fix
> either the opening or closing delimiter of the code chunk to use exactly the
> same numbers of backticks and same level of indentation (or blockquote).

Then you can find the problematic lines in your document and fix them.

## The original bug

The bug #1621 was twofold. For the code chunk below:

````` text
````{r}
x <- "
```
"
````
`````

It did not work in **knitr** because

1.  **knitr**'s parser would incorrectly treat the 3rd line ```` ``` ```` (three
    backticks) as the token to end a code chunk, which should have been the 5th
    line ````` ```` ````` (four backticks). This is because **knitr**'s parser
    did not match the numbers of backticks in the opening and closing delimiters
    of a code chunk in the past. It should have done that. As a result, it would
    think this is a code chunk, which is wrong:

    ```` text
    ````{r}
    x <- "
    ```
    ````

2.  Even if the code chunk is correctly parsed, the output would still be
    problematic, because **knitr**'s output hooks did not take full
    consideration of the possibility of more than three backticks in the output,
    and the raw (Markdown) output would be:

    ```` text
    ```r
    x <- "
    ```
    "
    ```
    ````

    This is incorrectly formatted Markdown output, and it should have been:

    ````` text
    ````r
    x <- "
    ```
    "
    ````
    `````

    That is, **knitr** should have used four backticks to wrap up the output
    that contains three backticks.

Atsushi fixed both problems in the PR. I thought it was great, and did not know
why I had never paid attention to the first problem before. Perhaps it was rare.
Anyway, "obviously" the chunk delimiters should match in the numbers of
backticks, so I continued to tighten Atsushi's work, not only to make the
numbers of backticks match, but also the levels of indentation match (if the
code chunk is indented).

After I finished checking the strong reverse dependencies of **knitr**, I
discovered two packages in which their vignettes contain malformed code chunks
like this:

```` text
 ```{r}
```
````

The opening delimiter should not have been indented, and it may have been
indented by accident. I notified the two package authors, applied a hack in
**knitr** to not break these two packages on CRAN, and made a new release of
**knitr**.

## Sleepless in Omaha

At 11:00pm that night, I received an email from another package author, who had
worked under pressure for several days to fix a problem in his package to meet
CRAN's deadline, and found a check warning about a package vignette appeared in
his newly released package on CRAN since he made the release just several hours
before me. Understandably, he was not happy about this **knitr** release,
because I failed to discover the problem.
<!--# https://github.com/Rdatatable/data.table/issues/5181 -->

I did realize that there would be a problem. As I mentioned above, I discovered
two packages that would be affected. I just underestimated the impact, and did
not check the soft reverse dependencies (packages that "Suggests" **knitr**).
His package was among these reverse dependencies.

More precisely speaking, I underestimated the chance for people to type extra
backticks or spaces or tabs in the chunk delimiters. Anyway, it was all my
fault. I quickly patched **knitr**, made another release at 1am, explained to
CRAN maintainers that this release was a urgent one, and waited until 3am
because CRAN also had to check the reverse dependencies, which could take a few
hours. At 5am, one CRAN maintainer approved it.

## Not the end yet

The patch release allowed for unmatched indentation of chunk delimiters, which
suppressed the error in the aforementioned package author's vignette. I naively
thought people would only type spaces by accident. Two days later, I received an
email from a CRAN maintainer telling me that the latest release of **knitr**
seemed to have caused warnings in 38 additional packages.

After investigation, I realized that it was also common for people to type extra
backticks. By the next morning when I got up, CRAN had notified these package
authors and requested them to fix the issues. I did not expect to cause the
trouble, and was thinking of making another patch release to suppress the
warnings temporarily. But since these issues have to be fixed someday, and CRAN
had sent out the notifications, I did not make the patch release, but took the
time to fully investigate how many CRAN packages contain unbalanced chunk
delimiters.

I found 82 (out of 6500+) in the next few days, and notified their maintainers
about this upcoming change. You may take a look at [all these unbalanced chunk
delimiters](https://github.com/yihui/knitr/issues/2057), and I bet all extra
characters (spaces or backticks) are by accident. For packages that I could
easily find the source repositories on Github, I have sent pull requests to fix
the problems. This is definitely not the end, because there are probably
millions of R Markdown documents in the wild, and some of them may have the same
problems.

## The deeper motivation

This change was not purely for cosmetic purposes but had a deeper motivation.
That is, I was hoping that any number of backticks could freely appear in code
chunks, which was not possible before, because as soon as **knitr** sees three
or more backticks on a line, it would treat this line as the ending of a code
chunk.

With the new constraint imposed on the chunk closing delimiters (i.e., they must
match the opening delimiters), [**knitr**'s language
engines](https://bookdown.org/yihui/rmarkdown-cookbook/other-languages.html) can
be more powerful and useful. For example, in the current development version of
**knitr**, I just added a `comment` engine, so that you could comment out
arbitrary content in R Markdown, e.g.,

````` text
````{comment}
Arbitrary content to be commented out.

```{r}
1 + 1
```

The above code chunk will not be executed.
Inline code like `r pi * 5^2` will be ignored, too.
````
`````

This was not possible before. Note that the comment content contains three
backticks, so the `comment` engine has to use at least four backticks.

Currently I'm also thinking of providing a `verbatim` engine in **knitr** so
that you can write verbatim R Markdown content more conveniently and will not
need to [apply dirty
hacks](https://bookdown.org/yihui/rmarkdown-cookbook/verbatim-code-chunks.html).
Again, this would not be possible without the new constraint on the closing
delimiters.

## Deprecating unbalanced code chunks

At this point, I'm trying to signal a warning if unbalanced chunk delimiters are
detected, but they still work fine. In the case of `R CMD check` not running on
CRAN, I will throw an error instead, so package authors can fix this problem
before they submit to CRAN. I hope this strategy is acceptable to users and
package developers. If not, please feel free to let me know.

![](https://slides.yihui.org/gif/camouflage-3.jpg)

I will truly appreciate it if **knitr** and R Markdown users could take the
coming year to correct the unbalanced chunk delimiters, so we could unlock more
power from **knitr**.

## Appendix: A gallery of unbalanced chunk delimiters

### A firing handgun

```` text
````{r}
```
````

### A lion looking at you and ready to leap

````` text
```{r}
````
`````

### Someone turning a tank

```` text
```{r}
  ```
````

### That guy parked the tank, climbing down

```` text
  ```{r}
```
````

### You'd better hurry... your enemy is shooting an arrow at you

```` text
> ```{r}
```
````

### A window cleaning crane lifting a man

```` text
``````{r}
```
````

### A man standing on a bulldozer 

``````` text
```{r}
``````
```````

### It must be extremely windy that day...

```` text
                ```{r}
    ```
````

You are welcome to submit more for exhibition.
