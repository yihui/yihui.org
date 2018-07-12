---
title: 'One Little Thing: Embed a File in the HTML Output of R Markdown'
subtitle: Want to embed data or source files in HTML output? No problem!
date: '2018-07-11'
slug: embed-file
---

Sometimes it is even hard for myself to believe how long it would take for me to implement a simple feature. Last year, when I saw Steven Fazzio's [**blogdown** feature request](https://github.com/rstudio/blogdown/issues/106) on Github (to embed the Rmd source file in the HTML output so readers can download it), I had an idea how to implement it. I knew it wouldn't be hard.

Actually two years ago, Noam Ross sent [a pull request](https://github.com/rstudio/rmarkdown/pull/708) to the **rmarkdown** repo, which was related to Steven's request. I felt the implementation could be easier.

## xfun::embed_file()

While deciding the issues/features for [the next release](https://github.com/rstudio/rmarkdown/projects/1) of **rmarkdown**, I revisited the **rmarkdown** PR and the **blogdown** issue. At one late night, I finally [typed out the two lines of code](https://github.com/yihui/xfun/commit/d8199f86dbf06) to implement it in the **xfun** package, so now you can embed an arbitrary file, or multiple files, or a whole directory, in the HTML output of an R Markdown document. For now you need the development version of **xfun**:

```r
devtools::install_github('yihui/xfun')
# embed_file() requires a few more packages
xfun::pkg_load2(c('base64enc', 'htmltools', 'mime'))
```

Basically, you can use one of the functions `xfun::embed_file()`, `xfun::embed_dir()`, or `xfun::embed_files()` in an R code chunk to embed one or multiple files or an entire directory in the HTML output, e.g.,

````md
```{r echo=FALSE}
# a single file
xfun::embed_file('source.Rmd')

# multiple files
xfun::embed_files(c('source.Rmd', 'data.csv'))

# a directory
xfun::embed_dir('data/', text = 'Download full data')
```
````

You can also provide the list of files programmatically, e.g.,

```r
# embed all Rmd and csv files
xfun::embed_files(list.files('.', '[.](Rmd|csv)$'))
```

For multiple files, they are first compressed to a zip file, and the zip file will be embedded. These functions return a link, which a reader can click on the HTML page to download the embedded file.

## The trick `<a href="base64 data" download="filename">`

Under the hood, `xfun::embed_file()` simply generates a link of the form `<a href="base64 data" download="filename">text</a>`, where `"base64 data"` is the file encoded as a base64 string. If you are using a modern web browser (you are fine if it is not IE), it should be able to decode the base64 string into the file and download it when you click the link.

## When to use these functions? 

If your project is public, for example, on Github, there is no need to embed files in the HTML output: just give other people the address of the repo. If you are using **blogdown**, [it is also possible](https://github.com/rstudio/blogdown/issues/106) to automatically generate a link on each page pointing to the corresponding source file on Github (e.g., on my website, you can click the link "Edit this page" to edit the source files of most pages). 

If you project is completely private, you may compress the whole directory as a zip file and send it via email. That is common and fine, but you may not want to manually compress the directory every time you update any files in it. These `embed_*()` functions can automatically read and embed files in your HTML output, so all you need to do is knit the Rmd source document again, and you will only need to email an HTML file.

If the source project is private, but the output is expected to be public, that is when you may also consider embedding certain files on the output page, e.g., your Rmd source file, and/or data files. Readers who are interested in reproducing your results or analyzing the data differently can download the necessary files. This way, you only need to publish a single HTML file.
