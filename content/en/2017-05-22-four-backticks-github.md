---
title: Finally, Four Backticks on Github
date: '2017-05-22'
slug: four-backticks-github
---

It is always the little things... Over the years, I have been totally happy with almost everything about Github, but I have also been waiting for one little thing:^[Actually I have also been waiting for another feature ([commenting in the source file view](https://github.com/isaacs/github/issues/211)), but it does not bother me as much.] I wish we could enclose text that contains N backticks with a pair of N + 1 backticks in Github issues/comments, i.e.,

`````markdown
````
```{r, echo=TRUE}
1 + 1
```
````
`````

so that we could show a literal R code chunk like this:

````markdown
```{r, echo=TRUE}
1 + 1
```
````

In the past, we had to indent the code chunk by four spaces to show it verbatim:

````markdown
    ```{r, echo=TRUE}
    1 + 1
    ```
````

This is what used to drive me crazy, because you cannot easily indent text in a textarea on Github. Your only choices are:

- Type the text in a text editor that supports indenting a chunk of text, e.g., in RStudio, select the text, hit TAB (perhaps twice), copy the text, and paste back to Github; or

- Bang bang bang bang; then bang bang bang bang; and then bang bang bang bang...

Sometimes I need to write verbatim R code chunks on Github to show other people examples, and sometimes I ask users to provide examples. This four-space thing has annoyed me for a couple of years. You may not think it is big deal, but let me just show you two numbers: the [**knitr**](https://github.com/yihui/knitr) repo has got about 1400 issues over the years, and [**rmarkdown**](https://github.com/rstudio/rmarkdown) has got about 1000. You could try to sit here still and simply count the numbers from 1 to 1000. Then feel my despair of bang bang bang bang once every few days.^[I have edited almost every single issue/comment from users that didn't properly format R code chunks.]

![I love technology](https://slides.yihui.org/gif/dump-computer.gif)

I have a Github issue template for **knitr**, and hopefully anyone who opens a new issue should see the instructions on four spaces, but I feel most users simply ignored it. I don't think it is the problem of these users, but it is just too much hassle to indent the text.

Finally, Github embraced CommonMark and announced [a formal spec for GitHub Flavored Markdown](https://github.com/blog/2333-a-formal-spec-for-github-flavored-markdown). I just loved it.

I love everything about Markdown except the fact that the Markdown world is so fragmentized with many different flavors of Markdown. I very much believe in Pandoc's Markdown and truly appreciate John McFarland's effort on "standardizing" Markdown along with other contributors of CommonMark. Some of you may still remember John Gruber's tweet "['Standard Markdown' is neither](https://twitter.com/markdown/status/507341395137658880)" in 2014. I was quite upset by these words from the mouth of the Markdown's inventor. Anyway, "Standard Markdown" was renamed to "CommonMark" later. Whatever the name is, I love it.

So I [revised](https://github.com/yihui/knitr/commit/d7d59633302d35e9d244490112ba94ecbcd8f281#diff-1a1c3dd142f76a5fad803a0c52839881) the Github issue template, and it is much easier to type a pair of four backticks than many four-spaces.

The next time when you post a new issue or comment on Github that contains an R Markdown example, please keep this haiku in mind and show other people something that they can copy and run directly:^[Usually there have been enough straws on the camels' back. Your effort will be appreciated if you could even reduce one single straw.]

> To include three cool backticks,  
> 　use a cozy pair of four backticks,  
> 　　or I will kill you.^[Credits to Joe Cheng, who wrote the haiku "Keep your side-effects, out of reactives, or I will kill you". I don't remember the exact words but I guess I hate poorly formatted Github issues as much as he discourages side-effects in Shiny reactives.]

`````markdown
````
---
title: My Document
---

Hello world.

```{r}
1 + 1
```
````
`````
