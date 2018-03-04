---
title: How to Pretend Typing Super Fast in RStudio
subtitle: A blog post written during my presentation at rstudio::conf 2018
date: '2018-02-02'
slug: typing-fast
disable_mathjax: true
---

Right now I'm giving a talk at the RStudio Conference in San Diego. In my talk, I told the audience that I was going to write a blog post at the podium during my presentation. I only had 20 minutes in total for my presentation. Apparently it was impossible to type out a nontrivial post. But I want to show them my workflow of writing and publishing blog posts, so I cheated using the **rstudioapi** package to automatically "type" the post in RStudio for me.

## The rstudioapi package

The key idea is to use the function `rstudioapi::insertText()` to insert text in the RStudio source editor, and the editor context can be obtained from `rstudioapi::getSourceEditorContext()`. The rest of things to do is a plain `for` loop, in which you insert characters one by one, and use `Sys.sleep()` to pause occasionally (and randomly), otherwise it will be obviously bogus.

Below is a prototype of the function to automatically "type" a character vector into your RStudio source editor:

```r
rstudio_type = function(x) {
  ctx = rstudioapi::getSourceEditorContext()
  x = paste(x, collapse = '\n')  # concatenate by \n
  x = unlist(strsplit(x, ''))    # split into individual characters
  for (i in x) {
    rstudioapi::insertText(text = i, id = ctx$id)
    Sys.sleep(rbeta(1, 1, 9)/10)  # make delay time right-skewed
  }
}
```

## xfun::rstudio_type()

I polished up the code and included it in the **xfun** package as the function `xfun::rstudio_type()`. I added a few arguments to the function to make it feel more like a real human typing. In particular, the `mistake` argument controls how frequently you make mistakes (insert random strings that will be deleted shortly). Currently you have to install the development version of **xfun** to use this function:

```r
devtools::install_github('yihui/xfun')
```

## How did it work when I gave the talk?

I typed `go` in my R console, and hoped nobody saw it. The object `go` was created from a delayed assignment:

```r
delayedAssign('go', {
  Sys.sleep(3)
  xfun::rstudio_type(
    readLines('content/en/2018-02-02-typing-fast.md'),
    pause = function() rbeta(1, 1, 9)/60, mistake = .001, save = .005
  )
})
```

You may ask why not define a normal function, like `go = function() { ... }`? I didn't want to type `go()` in my console, because that would look suspicious to the audience whose eyes are really good, and they might know I called a function to do something. If I just type `go`, even if they saw it, I don't think they would so quickly think of delayed assignments in R, and they might think I was trying to print a certain object in R, but didn't see its value for some reason after I press Enter.

**Update on 2018-03-04**: The video of the talk is freely available [on the RStudio website](https://www.rstudio.com/resources/videos/create-and-maintain-websites-with-r-markdown-and-blogdown/).

[![Create and maintain websites with R Markdown and blogdown – RStudio](https://embedwistia-a.akamaihd.net/deliveries/3a89d37534901d8aea63adaa722e644c547345ce.jpg?image_play_button_size=2x&image_crop_resized=960x540&image_play_button=1&image_play_button_color=4287c7e0)](https://www.rstudio.com/resources/videos/create-and-maintain-websites-with-r-markdown-and-blogdown/?wvideo=zvnt290yte)

## Appendix: Does `yolo: true` work in blogdown?

Brandon Hurr asked me this question [on Twitter](https://twitter.com/bhive01/status/958543255955693574) a couple of days ago. Well, `yolo: true` in the **xaringan** package is essentially the Mustache Karl picture inserted on random slides. I can certainly make it work for **blogdown** (i.e., insert Karl's picture randomly in your blog posts), but I'd prefer not to, since **xaringan** is pretty much a personal package, and **blogdown** is not. I don't wish to push it too far.

That said, you have full freedom on your personal blog, so let met tell you the secret weapon. There is an unexported function `yolo()` in **xaringan**, and you can call it in an R code chunk, e.g.,

````markdown
```{r}
xaringan:::yolo()
```
````

It should give you what you want:

![Moustache Karl (TM)](https://github.com/yihui/xaringan/releases/download/v0.0.2/karl-moustache.jpg)
