---
title: Code Pollution With Command Prompts
date: '2013-01-26'
slug: code-pollution-with-command-prompts
---

This is not the first time I have ranted about [command prompts](http://en.wikipedia.org/wiki/Command-line_interface#Command_prompt), but I cannot help ranting about them whenever I saw them in source code. In short, a piece of source code with command prompts is like a bag of cooked shrimps in the market -- it does not make sense, and an otherwise good thing is ruined. I like cooking raw shrimps (way more tasty).

The command prompt here refers to the characters you saw in commands as the prefix, which indicates "I'm ready to take your commands". In a Unix shell, it is often `$`; in R, it is `> ` by default. A shell example from the [GTK web page](https://live.gnome.org/GTK%2B/OSX/Building):

```bash 
$ jhbuild bootstrap
$ jhbuild build meta-gtk-osx-bootstrap
$ jhbuild build meta-gtk-osx-core
```

And an R example from [R and Data Mining](http://cran.r-project.org/doc/contrib/Zhao_R_and_data_mining.pdf):

```r 
> data("bodyfat", package = "mboost")
> str(bodyfat)
```

There are numerous examples like this on the web and in the books (sorry, GTK developers and Yanchang Zhao; I came to you randomly). Most people seem to post their code like this. I can probably spend half a day figuring out a problem in measure theory, but I cannot, even if I spend two years, figure out why people include command prompts when publishing source code.

> Isn't it too obvious that you are wasting the time of your readers?

Whenever the command prompts are present in the source code, the reader has to copy the code, _remove the prompts_, and use the code. Why there has to be an additional step of removing the prompts? Why cannot you make your code _directly usable_ to other people?

```bash 
jhbuild bootstrap
jhbuild build meta-gtk-osx-bootstrap
jhbuild build meta-gtk-osx-core
```

```r 
data("bodyfat", package = "mboost")
str(bodyfat)
```

I'm aware of the column selection mode in some editors. I just do not understand why the correct thing should not happen in the very beginning.

Some may argue the prompt helps typesetting, and it makes the code stand out because of the common prefix. In R, `+` means the last line is not complete, so `>` and `+` present the structure of the code, e.g.

```r 
> for (i in 1:10) {
+ print(i)
+ }
```

I believe the structure of code should be presented by the level of indentation, which does not hurt the source code. To make the code stand out, choose a background color (shading) for it. That is the only correct way for typesetting purposes.

So, please stop code pollution, and post usable code.
