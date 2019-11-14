---
title: Don't Use Spaces or Underscores in File Paths; Use Dashes Instead
subtitle: especially when you are working with LaTeX
date: '2018-03-15'
slug: space-pain
---

Recently I received a few bug reports about the PDF generation in R Markdown. Eventually I figured out one of the reasons: spaces in filenames. For example, in [rstudio/rmarkdown#1285](https://github.com/rstudio/rmarkdown/issues/1285), `xelatex` failed to compile the `.tex` file because there was a space in a folder name (but `pdflatex` succeeded). From this issue, you can also see how many replies it takes to get [a reproducible example](/en/2017/09/the-minimal-reprex-paradox/).

I had been bothered by spaces for long enough before (not only in LaTeX), so I had developed a habit of not using spaces in any of my filenames. When I need to separate words, I always use dashes (`-`) instead of other characters such as underscores (`_`) or dots (`.`). I have no idea why spaces are bad in file paths in LaTeX. In HTML, spaces in file paths are often encoded to `%20`. In command line, when a path contains spaces, it has to be quoted (e.g., `rm "abc def.txt"`). For underscores, they are special characters in LaTeX (e.g., in the math mode, an underscore indicates a subscript). By comparison, dashes are much safer everywhere, and they are not special characters in HTML or LaTeX.

For the same reason, I always recommend **knitr** and R Markdown users to use dashes in chunk labels instead of spaces or underscores, e.g., this is good:

````markdown
```{r, hello-world, fig.width=8}
```
````

These could be bad chunk labels:

````markdown
```{r, hello world, fig.width=8}
```

```{r, hello_world, fig.width=8}
```
````

Chunk labels will be used to name figure files (if any plots are generated in the code chunk), so you have to use more portable characters in the labels. Usually I only use letters a-z, A-Z, numbers 0-9, and dashes. If your code chunk won't generate any plots, it should not matter which characters you used in the label, and **knitr** itself puts no restrictions on that.

Sigh. Technology.

![Sigh. Technology.](https://slides.yihui.org/gif/dump-computer.gif)
