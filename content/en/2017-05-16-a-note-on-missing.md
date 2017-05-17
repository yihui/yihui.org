---
title: A Note on missing()
date: '2017-05-16'
slug: a-note-on-missing
---

I had misunderstood the function `missing()` for several years. Originally I thought it only applies to an argument that does not have a default or user-specified value. For example, this is fairly easy to understand:

```r
f = function(x) {
  missing(x)
}
f()  # should be TRUE
```

One day I was surprised to find that this also returned `TRUE`:

```r
f = function(x = 1) {
  missing(x)
}
f()
```

What?! `x` does have a default value `1`; why is it considered missing? Then I realized `missing()` really meant "argument/value not passed" (to the function call).

Below is a yet more surprising fact that I discovered:

```r
f = function(x) {
  missing(x)
}
g = function(y) {
  f(y)
}
g()  # still returns TRUE
```

I was surprised because when `g` calls `f(y)`, `y` does not exist, yet it still worked. It _looks_ like we did pass `y` (whatever it really is) to `f()`, but `f()` sees nothing. Sounds like fun of lazy evaluation or something.

Anyway, I don't recommend using `missing()`. It is fragile and you may break it unintentionally. Per its help page:

> `missing(x)` is only reliable if `x` has not been altered since entering the function [...]

What I often do is to set the defautl value to `NA` or `NULL`, and use `is.na()` / `is.null()` to test if the default value was explicitly changed by the user. Of course, this has a different meaning with `missing()`, but it is more robust. In particular, `NA` works better when the function is used in a vectorized call, e.g., `mapply()`.
