---
title: How to Put All Your Code in the Appendix in R Markdown
date: '2018-09-18'
slug: code-appendix
---

My previous long post on [the notebook war](/en/2018/09/notebook-war/) scratched the surface of literate programming in **knitr** and R Markdown. I don't often talk about the "literate programming" aspect of **knitr**, but it is very interesting. I guess people mostly use **knitr** for the purpose of report generation from a linear combination of text and code. The power of "_programming_ code chunks" is probably seriously underestimated. Note that here "program" is a verb.

![The force is strong!](https://slides.yihui.org/gif/git-push-force.gif)

## Why code in the appendix

Last week [Alex Hayes showed an interesting trick](https://twitter.com/alexpghayes/status/1039170310560464897) on how to put all your code in the appendix of a document. This can be very useful when you don't want to distract your readers with program code in the body of your report, but want to give those who care about the computational details a chance to know the details. An appendix will be the natural place to go for these code (especially when your output format is PDF or other formats to be printed).

## The magical ninja Alex's method

Alex combined the chunk option `code` with `knitr::purl()`:

````md
# Code Appendix

```{r code = readLines(knitr::purl("path/to/file.Rmd", documentation = 1)), echo = T, eval = F}
```
````

For those who don't know the `code` option well, it is one way to provide the content of the code chunk. For example, the code chunk

````md
```{r code=c('1 + 1', 'print("Hello woRld")')}
```
````

is equivalent to

````md
```{r}
1 + 1
print("Hello woRld")
```
````

So the `code` option can be highly useful when the code of a chunk is _dynamic_. For example, you can read the code dynamically from an external R script.

What `knitr::purl()` does is to extract all code chunks from a document and write them to an external file (an R script).

Then with chunk options `eval = F` (don't evaluate the code in this chunk again because the individual previous code chunks have been executed) and `echo = T` (display code of this chunk in the output document), you will have a code appendix.

In Alex's method, `path/to/file.Rmd` doesn't have to be hard-coded, and can actually be replaced by `knitr::current_input()`, which gives you the path to the current input file.

## The cool hacker Lucy's method

Although Alex's method definitely works, it is not very efficient, because every time you compile the document, **knitr** has to parse the document twice (once for `knitr::knit()` and once for `knitr::purl()`).

Among the replies to Alex's original tweet, the very cool hacker^[I wish I had time to write the "cool hacker" series of posts about those awesome R users.], Lucy D'Agostino McGowan, [pointed out the efficient way](https://twitter.com/LucyStats/status/1039178545715662848):

````md
```{r ref.label=knitr::all_labels(), echo = T, eval = F}
```
````

After **knitr** parses a document, all code chunks and their labels are stored internally. You have access to these labels via `knitr::all_labels()`. With the `ref.label` option, you can pull all code chunks into this code chunk.

## Another cool hacker in a parallel universe

(Ten months later.)

[Ariel Muldoon](https://twitter.com/aosmith16/status/1144669579630669829) independently discovered `all_labels()`, and also tried to filter the chunk labels programmatically:

````md
```{r getlabels, echo = FALSE}
labs = knitr::all_labels()
labs = labs[!labs %in% c("setup", "toc", "getlabels", "allcode")]
```

```{r allcode, ref.label = labs, eval = FALSE}
```
````

Clever! You got it.

## But calling a single function doesn't sound like _programming_...

Some people may say that the taste of programming in "literate programming" seems to be too light. Don't judge code by its length. Simplicity is definitely a merit. However, if your task is complicated enough, you can certainly program a **knitr** document in any way you like. The sky is your limit when you can program something.^[Practically, your toddler's mood is your limit. The sky doesn't matter at all.]

[Here is a slightly advanced example](https://stackoverflow.com/q/40735727/559676), in which you can extract certain attributes of code chunks, and print them in the end of a document. For example, you can create an appendix with the names of all theorems in your document.

The fact that **knitr**'s code chunk options are evaluated like function arguments (meaning that you can write arbitrary R code in chunk options) and **knitr** gives you a hook system (`knitr::knit_hooks`) to manipulate pretty much everything means infinite possibilities to those who want to customize and program **knitr** documents. There was only one thing upon which I hesitated when deciding whether I should give users the access. That is `knitr:::knit_code`. Here the triple-colon is obviously a danger sign. When you can even modify the content of a code chunk, I have no idea what can happen. Evil or creative? I'll leave it to you to think about.
