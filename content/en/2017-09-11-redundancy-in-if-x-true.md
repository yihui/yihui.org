---
title: Redundancy in "if (x == TRUE)"
date: '2017-09-11'
slug: redundancy-in-if-x-true
---

Last year when I was at JSM, I attended an excellent talk by Nicholas Horton and later [nitpicked](https://twitter.com/xieyihui/status/759863505357012996) his R code:

```r
ifelse(dest == "ORD" | dest == "MDW", TRUE, FALSE)
```

There is no need to use `ifelse()` here. The code above is equivalent to:

```r
dest == "ORD" | dest == "MDW"
```

I have a feeling that some people are not comfortable when they think about Boolean values without literally seeing the values `TRUE` or `FALSE`. I think this is understandable. Personally I try to avoid redundancy, unless I'm explicitly thinking of the [Department of Redundancy Department](http://tvtropes.org/pmwiki/pmwiki.php/Main/DepartmentOfRedundancyDepartment).

I also often see people write code like `if (x == TRUE)`. The `== TRUE` part is redundant in my eyes: `if (x)` is enough. I think there is a slight visual benefit of explicitly comparing `x` with `TRUE`, though. That is, when glancing at the code, you can quickly know there is a Boolean comparison here, because the keyword `TRUE` is visually prominent.

A few minutes ago I saw yet another example of redundancy in the article "[Flawed code served as icing on the cake for Prime Minister's social agency launch](http://www.nzherald.co.nz/nz/news/article.cfm?c_id=1&objectid=11918297)". The last line of the R code on the cake was like:

```r
minister_greeting = ifelse(welcomeSpeech == TRUE, "....")
```

This line was quite interesting in several aspects:

1. It is flawed because the third argument of the `ifelse()` function was missing (with no default).

1. Again, there is redundancy in `welcomeSpeech == TRUE`: `ifelse(welcomeSpeech)` suffices. However, I think this redundancy is understandable since the cake is for someone who (I assume) do not really know much about R, and `ifelse(welcomeSpeech == TRUE)` may make the code a little more readable to them.

1. The author of this piece of code used the left arrow `<-` for assignments on all previous lines, but changed to the equal sign `=` on the last line. As you all probably know, I use the euqal sign all the time (except when I collaborate with someone who insists on using the arrow), so I'd like to say "Welcome to the dark side and long live the equal sign!"

1. Similarly, the author used [snake_case](https://en.wikipedia.org/wiki/Snake_case) everywhere, and suddenly changed to [camelCase](https://en.wikipedia.org/wiki/Camel_case) when naming the variable `welcomeSpeech`. Consistency is hard.
