---
title: Generate A Verbatim Code Chunk or Inline R Expression in knitr Output
date: '2017-11-22'
slug: knitr-verbatim-code-chunk
---

When you write a code chunk or inline expression in a **knitr** source document (e.g., R Markdown), and it is parsed and evaluated, you won't be surprised. That is what **knitr** is supposed to do. Then one day, you want to teach other people how to use **knitr** by writing a tutorial, you will suddenly realize a problem: how do I generate a verbatim code chunk or inline R expression that is _not_ parsed by **knitr**? In other words, how to show that "backtick-backtick-backtick-curlry-brace-little-r" thing or `backtick-r-backtick` thing in the output?

This question has been listed as the [**knitr** FAQ](/knitr/faq/) #7, but I want to explain the answer in greater detail in this post.

## Show a verbatim code chunk

As I mentioned in the FAQ, the key is to avoid **knitr** parsing the code chunk, so we need to make an invalid code chunk --- _invalid in the source, but valid in the output._ The trick is to add  `` `r ''` `` to the chunk header, which will be evaluated as an inline expression to _an empty string_ by **knitr**. For this example, the following "code chunk" in the source document

````md
`r ''````{r, eval=TRUE}
1 + 1
```
````

will be rendered as

````
```{r, eval=TRUE}
1 + 1
```
````

in the output. The inline expression is gone because it is substituted by an empty string.

However, that is only the first step. To show something verbatim in the output, the syntax in Markdown is to wrap it in a code block (indent by four spaces or use backtick fences). This will be the actual source if you want to see the output above:

`````md
````
`r ''````{r, eval=TRUE}
1 + 1
```
````
`````

Why four backticks? That is because you have to use at least N+1 backticks to wrap up N backticks.

## Show a verbatim inline expression

There are multiple ways to show a verbatim inline expression. I mentioned this trick for R Markdown documents in the FAQ:

```md
This will show a verbatim inline R expression `` `r
1+1` `` in the output.
```

The trick works due to two reasons (1) a single line break is often the same as a space to Markdown parsers (by comparison, two consecutive line breaks means starting a new paragraph); (2) **knitr** requires a space after `` `r `` to parse it; if the space is missing, it will not be treated as an inline expression. In the output document, you should see:

```
This will show a verbatim inline R expression `r 1+1` in the output.
```

Honestly I don't love these tricks. They are ugly only due to the fact that **knitr**'s parser is based on regular expressions, and it knows little about the specific syntax of a document language, such as LaTeX or Markdown, otherwise the solutions will be much cleaner, e.g., a verbatim code chunk would be

`````md
````
```{r, eval=TRUE}
1 + 1
```
````
`````

and a verbatim inline R expression would be

```md
This is a verbatim inline expression `` `r 1+1` ``.
```

It is just that **knitr** does not know anything about the context (e.g., am I inside a code block?).^[This leads to some unfortunate consequences, e.g., **knitr** is not aware of comments of the document language, so you cannot really comment out **knitr** code chunks at the moment; see [yihui/knitr#1363](https://github.com/yihui/knitr/issues/1363).] Ugly as these tricks are, I guess they are not too bad (at least not too much effort for typing).
