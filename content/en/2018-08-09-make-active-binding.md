---
title: 'makeActiveBinding(): The Most Magical Hidden Gem in Base R'
date: '2018-08-09'
slug: make-active-binding
---

Of course, this is a follow-up post on my previous follow-up post on [lazy evaluation](/en/2018/07/lazy-evaluation/). One commenter (Michael---I believe I know this Michael) of that post pointed out the function `makeActiveBinding()` in base R. I have almost forgotten it. It was once the most magical function in my eyes, and was the foundation of one of my only two academic papers, "[Reactive Programming for Interactive Graphics](https://projecteuclid.org/euclid.ss/1408368571)" (Xie _et al_ 2014).

![Figure 2 in the paper](https://user-images.githubusercontent.com/163582/43879425-a5818b36-9b69-11e8-98d8-51db61c66a2f.png#border)

Basically `makeActiveBinding()` binds a function to a symbol in an environment. The magic is that, when you try to _get_ the value of this symbol, the function is executed without arguments, and when you try to _set_ the value of the symbol, the function is executed with the value as its argument.

## A toy example

That may be difficult to understand if you have just heard of this function for the first time. Let me give an example by rewriting the "sword" sound effect I used in [my useR! 2014 talk](https://github.com/yihui/knitr-talks/blob/master/useR2014/2014-knitr-ninja-Yihui-Xie.R) (a few of you might still remember [that](/en/2014/07/a-few-notes-on-user2014/)):

```r
xfun::pkg_load2('beepr')  # install beepr if necessary

makeActiveBinding('sword', function(i) {
  if (missing(i)) i = sample(1:11, 1)
  beepr::beep(i)
  i
}, globalenv())
```

Now if you type `sword` in the R console and hit Return, you should hear a random beep. If you assign a number to `sword`, you should hear the beep corresponding to that number, e.g.,

```r
sword = 11  # sword
sword = 7   # shotgun
```

When you try to _get_ the value of `sword`, the argument `i` of the function will be missing. Basically the test `if (missing(i))` inside the function tells you whether you are trying to get or set the value of `sword`.

## A toy implementation of Shiny

Active bindings can be a lot of fun to play with, simply because a function is executed no matter if you try to obtain or set the value of an object. When you have a function, you have the full control of the world. I have shown an example of brushing a scatterplot in the paper I mentioned in the beginning of this post. Next I'm going to show a super naive implementation of [Shiny](https://shiny.rstudio.com) based on active bindings.

```r
input  = new.env()
output = list()
# a dependency table, e.g. list(input1 = c('output1', 'output2'))
deps = list()
# name of the current output being rendered
output_cur = NA
```

A new input in the system is an active binding in the `input` environment. When we need to get the value of the input element, we try to connect it with the output element that actually uses this input value, and store this information in the dependency table `deps`, so that we know which output elements to render when the input element is changed later.

```r
add_input = function(ID, init = 0) {
  makeActiveBinding(ID, local({
    val = init
    function(new) {
      if (missing(new)) {
        # figure out which outputs use my value
        if (!is.na(output_cur)) {
          deps[[ID]] <<- unique(c(deps[[ID]], output_cur))
          output_cur <<- NA
        }
        return(val)
      }
      # if value not changed, do nothing
      if (identical(val, new)) return()
      # trigger changes in relevant outputs
      val <<- new
      for (i in deps[[ID]]) output[[i]]()
    }
  }), input)
}

add_input('slider', 0)
add_input('toggle', TRUE)  # not used this example
```

Then we provide a couple of output elements. One uses the value `input$slider`, and one does not.

```r
output$render_value = function() {
  message('The slider value is ', input$slider)
}
output$render_random = function() {
  message('A random value is ', rnorm(1))
}
```

Finally, we generate all outputs to build the dependency table.

```r
# figure out which output depends on which input
local(for (i in names(output)) {
  output_cur <<- i
  output[[i]]()
  output_cur <<- NA
})
```

Now our system should know that when `input$slider` is modified, `output$render_value()` should be called (but not `output$render_random()` since it does not depend on `input$slider`).

Imagine you are dragging a "slider" to modify its value (we just directly assign values to the "slider" below):

```r
input$slider = 5
#> The slider value is 5
input$slider = 5  # nothing happens
input$slider = 100
#> The slider value is 100
```

So the above "Shiny" system written in 40 lines of code actually works. The real Shiny framework is certainly far more complicated than that (thousands of lines of R and JS code), but the toy implementation has shown the possibility of automatically executing a function (mostly for side-effects) when you modify an object.

## R objects as "command aliases"

The reason that Michael pointed out `makeActiveBinding()` was because Baptiste Auguie wanted a shortcut for `system('open .')`. Here is how you could do it:

```r
makeActiveBinding('open', function() {
  system('open .')
  invisible(getwd())
}, globalenv())
```

Then when you type `open` in the R console, your current working directory should be opened in your file viewer. This example only works on macOS. For other OSes, you need other commands (perhaps `xdg-open` for Linux, and `shell.exec()` for Windows).

The object can be viewed as an alias of a function, in which you can run arbitrary commands. The only advantage of using active bindings in this case is that it saves you a pair of parentheses, because typically you would define a function instead: `open = function() system('open .')`, and call `open()`. Perhaps being cool is also an advantage.

## Appendix: choose a type of pizza

Colin Fay wrote a blog post on [active bindings (and pizza)](https://colinfay.me/ractivebinfing/) last year, which I believe is a much better tutorial than my post here. I recommend you to read that post, too.
