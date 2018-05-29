---
title: One-dimensional/Multi-dimensional numerical integration in R
date: '2007-04-14T23:54:37+08:00'
slug: one-dimensionalmulti-dimensional-numerical-integration-in-r
---

More than one members have asked such questions in [COS](https://cosx.org/), and they can be easily solved by the function integrate (pkg stats) and adapt (pkg adapt). For example:

```r
> fnorm = function(x) {
    1/sqrt(2 * pi) * exp(-x^2/2)
}

> integrate(fnorm, -Inf, 0)
0.5 with absolute error < 4.7e-05
> pnorm(0)
[1] 0.5
```
