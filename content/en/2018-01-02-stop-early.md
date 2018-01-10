---
title: stop() / return() Early for Shorter Code
subtitle: Why not if (cond) { } else { stop() }
date: '2018-01-02'
slug: stop-early
---

One little interesting programming habit I developed a few years ago was to `stop()` or `return()` as early as possible in a function. The main reason for this is to reduce the number of lines of code and white spaces for indentation. A few quick examples (for illustration purposes only):

```r
sqrt2 = function(x) {
  if (x >= 0) {
    sqrt(x)
  } else {
    stop("x must be non-negative")
  }
}
```

I'd stop early to reduce the number of lines of code from 7 to 6, and save 8 spaces:

```r
sqrt2 = function(x) {
  if (x < 0) {
    stop("x must be non-negative")
  }
  sqrt(x)
}
```

Actually if the error message is short enough, I'll remove curly braces:

```r
sqrt2 = function(x) {
  if (x < 0) stop("x must be non-negative")
  sqrt(x)
}
```

Basically when you write code like `if (cond) {} else { stop() }`, there is no need to use `else`.

Similarly, you can make the code shorter if you `return()` early. For example:

```r
abs2 = function(x) {
  if (x < 0) {
    -x
  } else {
    x
  }
}
```

I'd write it as:

```r
abs2 = function(x) {
  if (x < 0) return(-x)
  x
}
```

In this toy example, you may not see obvious advantages, but when the expressions in the `if-else` statement are lengthy, you will be able to save a large amount of white spaces. I tend to return early for simpler conditions, and handle more complex conditions later. This also make the code easier for me to reason about: I think from the easier parts to more difficult parts as I go through the code.

I tend to make code a little dense (e.g., not to indent excessively) so that when I read the code, I don't have to scroll up and down, and move my eyes over a long distance.
