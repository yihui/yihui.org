---
title: On Cache Invalidation
subtitle: Why is it hard?
date: '2018-06-22'
slug: cache-invalidation
---

Many people must have heard this quote (by Phil Karlton) many times: _There are only two hard things in Computer Science: cache invalidation and naming thing._ Two days ago, Nick Tierney mentioned it again in his post "[Naming Things](http://www.njtierney.com/post/2018/06/20/naming-things/)". Since he said he was not sure what cache invalidation meant, and I have a tiny bit experience here, I want to write this short post to explain why cache invalidation is hard from my experience.

## Why caching?

First of all, the main purpose of caching is speed. The basic idea is simple: if you know you are going to compute the same thing, you may just load the result saved from the previous run, and skip the computing this time. There are two keywords here: "the same thing", and "the saved result". The latter means you are essentially trading (more) storage space for (less) time. That is the price to pay for caching, and also an important fact to be aware of when you use caching (i.e., caching is definitely not free, and sometimes the price can be fairly high).

The tricky thing is "the same thing". How do you know that you are computing the same thing? That is all "cache invalidation" is about. When things become different, you have to invalidate the cache, and do the (presumably time-consuming) computing again.

## A toy example

Implementing caching without considering the invalidation is often simple enough. Here is a simple example of turning a normal function to a function that supports caching:

```r
greet = function(person) {
  switch(person,
    Nick = {
      # fast and smart
      Sys.sleep(3); 'Hello!'
    },
    Yihui = {
      # slow and shy
      Sys.sleep(15); '你好！'
    }
  )
}
```

I used `Sys.sleep()` only to pretend the function was time-consuming. In the `greet()` function, Nick is fast and will say "Hello", and Yihui is slow, speaking Chinese. If we have to call this function many times, there is no need to wait if we can save what Nick and Yihui say. We will need a database to store their words, and keys to retrieve the results.

```r
greet_cache = local({
  
  # a caching database (in-memory only; could be on disk, too)
  database = list()
  
  function(person) {
    res = database[[person]]
    # if found in database, just return the cached result
    if (person %in% names(database)) return(res)
    # not found? compute and save it
    res = greet(person)
    database[[person]] <<- res  # note the double arrow here
    res
  }

})
```

The first time you run this function, it will be slow, but for the second time, it will be instant.

```r
greet_cache('Nick')  # 3 seconds
greet_cache('Nick')  # immediately returns

greet_cache('Yihui')  # 15 seconds
greet_cache('Yihui')  # no time
```

The toy example shows the basic idea of implementing caching: turn your input into a key, use this key to retrieve the output in a cache database if it exists, otherwise do the computing and save the output to the database with the key.

## When to invalidate the cache?

Of course, toy examples often cannot represent the reality. If Nick goes to Japan, he may speak Japanese. When Yihui is in the US, he should speak English. We need to update the cache database in these cases (invalidating the previously saved results).

Now let me talk about a real example in **knitr**'s caching, which should sound similar to the case of Nick being in Japan (or Yihui in US). For those who care about technical details, **knitr** caches results using [these lines of code](https://github.com/yihui/knitr/blob/2b3e617a700f6d236e22873cfff6cbc3568df568/R/block.R#L60-L81) and invalidate the cache [here](https://github.com/yihui/knitr/blob/2b3e617a700f6d236e22873cfff6cbc3568df568/R/block.R#L283).

The basic idea of **knitr**'s idea is that if you did not modify a code chunk (e.g., did not modify chunk options or the code), the result will be loaded from the previous run. The key of a code chunk is pretty much an MD5 hash (via `digest::digest()`) of the chunk options and the chunk content (code). Whenever you modify chunk options or the code, the hash will change, and the cache will be invalidated.

That sounds about correct, right?

I have heard unhappy users curse **knitr**'s caching. Some thought it was too sensitive, and some thought it was dumb. For example, when you add a space in an R comment in your code chunk, should **knitr** invalidate the cache? Modifying a comment certainly won't affect the computing at all (but the text output may change if you show the code in the output via `echo = TRUE`), but the MD5 hash will change.^[Actually you can use the chunk option `cache.comments = FALSE` to prevent cache invalidation when only comments were changed in a code chunk. This can be useful when `echo = FALSE`.]

Then an example to explain why people thought **knitr**'s caching was dumb: if you read an external CSV file in a code chunk, **knitr** does not know whether you have modified the data file. If you happen to have updated the data file, **knitr** won't re-read it by default if you didn't modify chunk options or the code. The cache key does not depend on the external file. In this case, you have to explicitly associate the cache with the external file, e.g.,^[You could also use `file.mtime()` instead of `tools::md5sum()` if you want the cache to depend on the modification time of the CSV file.]

````md
```{r import-data, cache=TRUE, cache.extra=tools::md5sum('my-precious.csv')}
d = read.csv('my-precious.csv')
```
````

Since the chunk option `cache.extra` is associated with the CSV file, cache will be invalidated when the file is changed (because the cache key will be different).

Another example is one code chunk using a variable created from a previous code chunk. When the variable is updated in the previous chunk, this chunk's cache should be invalidated, too. This leads to the topic of the dependency structure of code chunks, which can be complicated, but there are some helper functions such as `knitr::dep_prev()` and `knitr::dep_auto()` to make it a little easier.

When a code chunk is extremely time-consuming, **knitr** should be more conservative (not to invalidate the expensive cache unless there have been critical changes). When a code chunk is only moderately slow (e.g., 10 or 20 seconds), the caching probably should be more sensitive.

The tricky thing is, it is hard to find the balance. Either direction can offend users.

## The hidden cost that is often ignored

I said above that the obvious price to pay for caching is storage (either in memory or on disk). However, to make caching work perfectly for you, there is a hidden cost. That is, the cost to understand caching. This is similar to a situation in our daily life: we may spend a lot of time and energy to save some money. We can only see the money we saved, but ignore the cost of time and emotion. If you don't analyze the two costs, the money you saved may not really be worthwhile.

If you don't fully understand how caching works and the conditions for its invalidation, caching could be too sensitive or dumb, and may not serve you well. Some users may be able to quick understand it, and some may not. If you want to speed, you'd better know the traffic rules first, otherwise you may be pulled over.

The full documentation of **knitr**'s caching is in the **knitr** book "_Dynamic Documents with R and knitr_ (2nd ed)". If you don't have this book, there is  [a page on **knitr**'s website](https://yihui.org/knitr/demo/cache/) that contains more information.

I don't know what was on Phil Karlton's mind when he said those words, but the above is my experience about caching. The ultimate suggestion I often give to users is that if you feel **knitr**'s caching is too complicated, it is totally fine to use a much simpler caching mechanism like this:

```r
if (file.exists('results.rds')) {
  res = readRDS('results.rds')
} else {
  res = compute_it()  # a time-consuming function
  saveRDS(res, 'results.rds')
}
```

In this case, you clearly understand how your caching works. The one and only way to invalidate the cache is to delete `results.rds`, which is no longer hard at all.
