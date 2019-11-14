---
title: x[matrix(ncol = 2)]
subtitle: Do I really know base R?!
date: '2017-11-02'
slug: matrix-indexing
---

Karl Broman [was surprised](http://kbroman.org/blog/2013/04/02/xc53/) that `x[[c(5, 3)]]` in R was the same as `x[[5]][[3]]`. And it was in 2013. It reminded me of a similar thing that surprised me a couple of months ago. I have used R for more than 10 years, and for the first time I had discovered that for a matrix `x` and a two-column integer index matrix `i` (each row of `i` is a pair of row and column indices to index `x`), `x[i]` returns the vector `c(x[i[1, 1], i[1, 2]], x[i[2, 1], i[2, 2]], ..., x[i[n, 1], i[n, 2]])`. Actually I had been searching for this way of indexing for years, and I didn't know it was this simple! In the past, I was using an awkward loop like:

```r
n = nrow(i)
y = numeric(n)
for (k in seq_len(n)) {
  y[k] = x[i[k, 1], i[k, 2]]
}
y
```

That was both ugly and inefficient. After someone asked me this question again a couple of months ago, I came up with a slightly more elegant solution but perhaps even more inefficient:

```r
diag(x[i[, 1], i[, 2]])
```

The perfect answer is `x[i]`, both elegant and efficient. I learned this from another person's answer to the same question. Then I looked at the help page ``?`[```, and realized it was well-documented:

> When indexing arrays by `[` a single argument `i` can be a matrix with as many columns as there are dimensions of `x`; the result is then a vector with elements corresponding to the sets of indices in each row of `i`.

The example I gave above was just a special case: `x` could be an array of more than two dimensions, and does not have to be a matrix (a matrix is a special case of an array).

R help pages have too much hidden power. You have to carefully unfold and read them.

![The help page is really powerful](https://slides.yihui.org/gif/annoying-paper.gif)
