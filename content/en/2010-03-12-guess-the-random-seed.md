---
title: Guess the Random Seed
date: '2010-03-12'
slug: guess-the-random-seed
---

Stephanie asked in 511 today if we were able to get the random seed which was set by `set.seed()` but we were only given the random numbers (without knowing the seed). This kind of "hacker" questions sound interesting. One dirty solution should be the brute-force method, e.g:

```r 
# x: the random vector;
# FUN: the function that generates random numbers with the first argument
#      being the length of random numbers
# seed: candidate seeds to be tried one by one
# ...: other arguments to be passed to FUN
find.seed = function(x, FUN = rnorm, seed = 0:10000, ...) {
  res = NULL
  for (i in seed) {
    set.seed(i)
    rx = FUN(length(x), ...)
    # all() can be changed to all.equal() to obtain a rough solution
    #     allowing a little bit numeric errors
    if (all(x == rx)) {
      res = i
      break
    }
  }
  res
}
```

Of course it is not a good solution, although it might work:

```r 
> set.seed(1)
> test = rnorm(30)
> find.seed(test)
[1] 1
> set.seed(1234)
> test = rnorm(30)
> find.seed(test)
[1] 1234
> set.seed(987)
> test = runif(30, min = -1, max = 2)
> find.seed(test, runif, min = -1, max = 2)
[1] 987
```

Beside the probably very long computation time, the other disadvantage is we need to know the range of the seed. This could be obtained by some "prior" information. For instance, we may guess Dr Nettleton will not set a random seed greater than one million or less than 0.

Usually the random seed is obtained from a certain state of the computer such as the system time. I have an old example in this post: [Random Number Generation on the Glasses (A Natural RNG)](/en/2008/05/random-number-generation-on-the-glasses/).
