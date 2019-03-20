---
title: Github Issue Guide
author: 'Yihui Xie'
date: '2019-03-04'
slug: issue
---

This is a guide expected to be read before anyone files an issue to a repository that I maintain on Github. Please help me help you.

## Got a question?

For general questions, please post them on Stack Overflow first: http://stackoverflow.com/questions/ask (typically you want to use at least the tags `r` and relevant R package names such as `knitr`, `rmarkdown`, `blogdown`, and so on). You can also ask in the RStudio Community: https://community.rstudio.com. Please come back to Github only if nobody answers your question there in at least 24 hours, and [let us know the URL](/en/2017/10/cross-posting/) of your post. There are several benefits of asking questions on popular public forums than asking a single developer ([see this post](/en/2017/08/so-gh-email/)).

## Bug reports

For bug reports, please provide [a minimal, self-contained, and reproducible example](/en/2017/09/the-minimal-reprex-paradox/) by reducing your example as much as possible right before the problem goes away. By doing this, you may be able to figure out what the problem really is before reporting to us.

If your example is a single plain-text file, post the content in the issue (be sure to format it as a verbatim block). If your example contains multiple files, please upload them as a zip file to the Github issue.

Please always provide `xfun::session_info()`. If the relevant package is not in the session info, you may pass the package name to this function, e.g.,

```r
xfun::session_info('rmarkdown')
```

Screenshots are often very helpful to illustrate your issues, but [please don't post code as screenshots](/en/2018/01/screenshots-vs-text/).

It will be helpful if you make sure [all your packages are up-to-date](/en/2017/05/when-in-doubt-upgrade/) before reporting issues. You should at least run:

```r
update.packages(ask = FALSE, checkBuilt = TRUE)
# please remember to restart R after updating packages
```

Even better if you could test the development version of the package, e.g. (taking **knitr** for example below),

```r
remotes::install_github('yihui/knitr', upgrade = TRUE)
```

If you are able to fix the bug by yourself, you are welcome to submit a pull request. When you feel the fix would require some substantial effort, please talk to us before doing all the hard work, because we want to make sure you would work on something that we would be willing to accept later. This also applies to feature requests.

## Please format your issue correctly

To include a verbatim chunk of arbitrary text, wrap it in a pair of three backticks. When any line of your text contains N backticks (N >= 3), use N + 1 backticks to wrap the text, e.g. use four backticks to wrap three:

`````
````
A sample document.

```{r}
1 + 1  # a line of code
```

Another paragraph.
````
`````

If it is just a chunk of R code (or other languages) and you want syntax highlighting, you may use three backticks to format it, e.g.

````
```r
rnorm(10)
```
````

That is often enough to know about the formatting problems. To know more about other common formatting issues, you may [read this post](/en/2018/05/github-issue-format/).

Usually your issue will be closed after it is fixed, but sometimes it is closed only because we are unable to offer any help. It does not mean your issue is not real or bad. You can propose a fix by yourself through a pull request. Your constructive feedback is always appreciated.
