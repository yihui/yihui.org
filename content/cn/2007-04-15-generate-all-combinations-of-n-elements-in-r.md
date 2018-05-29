---
title: Generate All Combinations of n Elements in R
date: '2007-04-16T00:45:38+08:00'
slug: generate-all-combinations-of-n-elements-in-r
---

Yesterday a member of [COS](https://cosx.org/) asked how to generate all the elements of {_all sets consisting of arbitrary combinations of n elements_} in R and I didn't know the function _combn() _then, so after a while I constructed a simple loop to fulfill this function (later I found this was wrong because it didn't enumerate all possible combinations!):

```r
> x = 1:5    # as an example, you may change this vector
> n = length(x)
> for (i in 1:n) {
    if (i == 1) {
        for (j in 1:n) {
            print(x[j])
        }
    }
    else {
        for (j in 1:(n - i + 1)) {
            for (k in (j + i - 1):n) {
                print(c(x[j:(j + i - 2)], x[k]))
            }
        }
    }
}
```

The output is:

```    
[1] 1
[1] 2
[1] 3
[1] 4
[1] 5
[1] 1 2
[1] 1 3
[1] 1 4
[1] 1 5
[1] 2 3
[1] 2 4
[1] 2 5
[1] 3 4
[1] 3 5
[1] 4 5
[1] 1 2 3
[1] 1 2 4
[1] 1 2 5
[1] 2 3 4
[1] 2 3 5
[1] 3 4 5
[1] 1 2 3 4
[1] 1 2 3 5
[1] 2 3 4 5
[1] 1 2 3 4 5
```

Just now when I was reading the help text of the function _choose()_, I found that there had already been a function _combn()_ in the package utils, which is very appropriate for this situation. For example:

```r
> combn(x = 5, m = 3)
     [,1] [,2] [,3] [,4] [,5] [,6] [,7] [,8] [,9] [,10]
[1,]    1    1    1    1    1    1    2    2    2     3
[2,]    2    2    2    3    3    4    3    3    4     4
[3,]    3    4    5    4    5    5    4    5    5     5
```

So the problem in the beginning will be much easier.
