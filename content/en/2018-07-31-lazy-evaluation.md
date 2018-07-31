---
title: Two of My Use Cases of Lazy Evaluation
date: '2018-07-31'
slug: lazy-evaluation
---

This is a short follow-up post on Colin Fay's [follow-up post](https://colinfay.me/lazyeval/) on Thomas Lumley [follow-up post](https://notstatschat.rbind.io/2018/07/30/quoting-and-macros-in-r/) on Miles McBain [post about quotation](https://milesmcbain.xyz/the-roots-of-quotation/). Yeah, I just cannot help it when I see this streak.

I'm not an expert of quotation or lazy evaluation. I just happen to have used them occasionally. I'm going to talk about two use cases of lazy evaluation.

## Executing R code --- the ninja way

In two of my talks, I used delayed assignments to execute R code for no good reasons except that I just wanted to confuse the audience. After making a delayed assignment like this in advance:

```r
delayedAssign('command', {
  # some R code
})
```

I can simply type `command` in the R console to actually execute the code. Of course, you could go with the normal way:

```r
command = function() {
  # some R code
}
command()
```

But that will be boring, right?

I used this trick in my talks at [useR! 2014](https://github.com/yihui/knitr-talks/blob/master/useR2014/2014-knitr-ninja-Yihui-Xie.R) and [rstudio::conf 2018](/en/2018/02/typing-fast/).

## Lazy-loading the cache database in **knitr**

The caching system in **knitr** [uses lazy-loading](https://github.com/yihui/knitr/blob/89b34a661/R/cache.R#L59) by default (the chunk option `cache.lazy = TRUE`). Lazy-loading means the results you cached will not be loaded in memory unless they are actually used later. This is very similar to the LazyData mentioned in Colin's post. To those hackers, you may make a lazy-load database using the _internal_ function `tools:::makeLazyLoadDB()` (again, it is an internal function, so no guarantee in the future), and load the database using `lazyLoad()`.

I don't quite remember how I discovered this. Chances are I found it by reading the source code of Roger Peng's **cacheSweave** package in 2012.
