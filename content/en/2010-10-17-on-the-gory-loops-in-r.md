---
title: On the Gory Loops in R
date: '2010-10-17'
slug: on-the-gory-loops-in-r
---

This blog post is mainly for [Stat 579](http://www.public.iastate.edu/~hofmann/stat579/) students on [the homework for week 7](http://www.public.iastate.edu/~hofmann/stat579/homework/week7-functions.html), since I received too many "gory" loops in the homework submissions and I think it would help a bit to write my thoughts on R loops for beginners. The immortal motto for newbies in programming is:

> If you want to make an apple pie from scratch, **you must first create the universe**.
>
> --- Carl Sagan

There have been endless wars on which programming language is better than others, but my view point is, that is nothing but the _balance_ between the code performance and the amount of work for programmers. In an extreme sense, almost all languages give you the ability to create the universe, but you do not really have to if you just want to make an apple pie.

R was born after S, a language which was invented _to turn ideas into software, **quickly** and **faithfully**_ and received [the ACM Software System Award](http://cm.bell-labs.com/cm/ms/departments/sia/S/) in 1998. Before the S language, statisticians often had to write "gory" low-level computing routines to do data analysis and statistical computation, including those "gory" loops, of course. For example, imagine what you have to do to compute the correlation coefficients in C.

R has wrapped a lot of common tasks in lower-level programming languages (mainly C and Fortran) to make it easier to call and faster to compute (R's (explicit) loops are generally slower than low-level languages), which frees statisticians from paying too much attention to the gory details in computation. However, the consequence is we have got too many tools in our hands, of which we are often unaware. I have no quick solution on this problem -- we have to learn more about the capability of R through many ways, e.g. reading the R-help mailing list, asking experts, doing daily work with R, reading the source code of R functions and playing with the examples in help pages, etc.

Being specific on this homework, I saw most submissions were using long loops, which is absolutely OK, since that was what we learned in class, and it is important to know how to write loops. Some loops are inevitable, but some are not. The rule of thumb is, functions do exist in R if you natural reaction to a problem is "why does not R have this common functionality?". For example, several students used this function to concatenate all elements of a vector into a single string:

```r 
to.string <- function(x) {
  string <- x[1]
  for(i in 2:length(x)) {
    string <- paste(string, x[i], sep="")
  }
  return(string)
}
```

But in fact you will get a neat solution if you take a closer look at the help page of `paste()`:

```r 
to.string(1:10)
# [1] "12345678910"
## equivalently but more elegantly
paste(1:10, collapse = "")
# [1] "12345678910"
```

This is one of the thousands of stories in which we created the universe to make an apple pie without knowing there was a perfect apple pie machine. Sometimes the feeling that we have to power to create the universe is so strong that we do so even we know the existence of the apple pie machine, e.g. here is a function to count the number of 0's and 1's in a vector:

```r 
freqTable01 = function(x) {
  ## initial frequencies are 0; add by 1 in the loop
  count1 = 0
  count0 = 0
  for (i in c(1:length(x))) {
    if (x[i] == 1) {
      count1 = count1 + 1
    }
    else {
      count0 = count0 + 1
    }
  }
  ## create a factor with count1 TRUE's and count0 FALSE's
  xf = factor(rep(c("TRUE", "FALSE"), c(count1, count0)))
  ## return the frequency table
  return(table(xf))
}
```

The loop is pretty much like low-level languages like C/Fortran: we assign initial values to a recording variable, do the loop and collect the result. But frequency tables are so common in statistics that it is hard to exclude such a functionality in R, `table()`, as we see in the last but one line of the code above.

Now I give my solutions as promised:

```r 
## break a vector into pieces of length M
break_vec = function(x, M) {
  n = length(x)
  if (M > n)
    stop("the block size M = ", M, " is greater than length of x (",
      n, ")")
  x0 = 1:(n - M + 1)
  substring(paste(x, collapse = ""), x0, x0 + M - 1)
}
## Q2: return a frequency table of blocks of length M; M = 1 for Q1
freq_block = function(x, M) {
  if (!(all(x %in% c(0, 1)))) stop("not a binary sequence")
  table(break_vec(x, M), dnn = NULL)
}
## Q3: the function rle() is exactly what we need; see ?rle
## Q4: match a pattern and return the frequency
pattern_match = function(x, pattern) {
  sum(break_vec(x, length(pattern)) == paste(pattern, collapse = ""))
}
```


There are no explicit loops above. Instead, all loops are implicit, i.e. let the more efficient low-level languages do the loops for R. This is called _vectorization_. We can benefit a lot from vectorization -- it is not only a matter of less heavier coding jobs, but also a huge improvement in terms of efficiency (speed) in general. If we write the above functions with loops, it will look like this (for Q2 only):

```r 
break_vec1 = function(x, M) {
  n = length(x)
  if (M > n)
    stop("the block size M = ", M, " is greater than length of x (",
      n, ")")
  res = character(n - M + 1)
  for (i in 1:length(res)) res[i] = paste(x[i + (1:M) - 1],
    collapse = "")
  res
}
```

A simple timing test shows that it is much slower than my first version:

```r 
x2 = c(1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
  1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1,
  1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0,
  1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0)
## break the vector into 40-bit blocks for 1000 times
system.time(replicate(1000, break_vec(x2, 40)))
#   user  system elapsed
#   0.99    0.00    0.98
## for-loops are 15 times slower
system.time(replicate(1000, break_vec1(x2, 40)))
#   user  system elapsed
#  15.43    0.00   15.46
## the two functions return identical results
identical(break_vec(x2, 40), break_vec1(x2, 40))
# [1] TRUE
```

A few output examples:

```r 
freq_block(x2, 2)
# 00 01 10 11
# 14 15 16 18
freq_block(x2, 3)
# 000 001 010 011 100 101 110 111
#   6   8   7   8   8   7   9   9
freq_block(x2, 4)
# 0000 0001 0010 0011 0100 0101 0110 0111 1000 1001 1010 1011 1100 1101 1110 1111
#    3    3    5    3    4    3    3    5    3    5    2    5    4    4    5    4
rle(x2)
# Run Length Encoding
#   lengths: int [1:32] 2 2 1 4 2 4 3 1 4 1 ...
#   values : num [1:32] 1 0 1 0 1 0 1 0 1 0 ...
pattern_match(x2, c(1, 0, 1))
# [1] 7
```

So remember the pain of struggling with this homework -- the same pain of the statisticians before the S language was invented. And begin to breathe the fresh air in the R empire with vectorization!
