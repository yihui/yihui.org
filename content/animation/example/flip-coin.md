---
title: flip.coin()
subtitle: Probability in flipping coins
date: '2017-04-04'
slug: flip-coin
from_Rmd: yes
---


This function provides a simulation to the process of flipping coins and
computes the frequencies for `heads` and `tails`.

If `faces` is a single integer, say 2, a sequence of integers from 1 to
`faces` will be used to denote the faces of a coin; otherwise this
character vector just gives the names of each face.

When the `\(i\)`-th face shows up, a colored thin rectangle will be added to
the corresponding place (the `\(i\)`-th bar), and there will be corresponding
annotations for the number of tosses and frequencies.

The special argument `grid` is for consideration of a too large number
of flipping, in which case if you still draw horizontal lines in these
rectangles, the rectangles will be completely covered by these lines, thus we
should specify it as `NA`.

At last the frequency for each face will be computed and shown in the header
of the plot -- this shall be close to `prob` if `ani.options('nmax')` is large enough.

This animation has provided a simulation of flipping coins which might be helpful in understanding the concept of probability.
 

```r
library(animation)
ani.options(interval = 0.2, nmax = 100)
## a coin would stand on the table?? just kidding :)
flip.coin(faces = c("Head", "Stand", "Tail"), type = "n", prob = c(0.45, 
  0.1, 0.45), col = c(1, 2, 4))
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/flip-coin/demo-a.mp4" /><p>plot of chunk demo-a</p></video>


```r
flip.coin(bg = "yellow")
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/flip-coin/demo-b.mp4" /><p>plot of chunk demo-b</p></video>


