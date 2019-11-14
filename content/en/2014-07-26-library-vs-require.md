---
title: library() vs require() in R
date: '2014-07-26'
slug: library-vs-require
---

While I was sitting in a conference room at UseR! 2014, I started counting the number of times that `require()` was used in the presentations, and would rant about it after I counted to ten. With drums rolling, David won this little award (sorry, I did not really mean this to you).

{{< tweet 484476578416455680 >}}

After I tweeted about it, some useRs seemed to be unhappy and asked me why. Both `require()` and `library()` can load (strictly speaking, _attach_) an R package. Why should not one use `require()`? The answer is pretty simple. If you take a look at the source code of `require` (use the source, Luke, as Martin Mächler mentioned in his invited talk), you will see that `require()` basically means "_try_ to load the package using `library()` and return a logical value indicating the success or failure". In other words, `library()` loads a package, and `require()` tries to load a package. So when you want to load a package, do you load a package or try to load a package? It should be crystal clear.

One bad consequence of `require()` is that if you `require('foo')` in the beginning of an R script, and use a function `bar()` in the **foo** package on line 175, R will throw an error _object "bar" not found_ if **foo** was not installed. That is too late and sometimes difficult for other people to understand if they use your script but are not familiar with the **foo** package -- they may ask, what is the `bar` object, and where is it from? When your code is going to fail, fail loudly, early, and with a relevant error message. `require()` does not signal an error, and `library()` does.

Sometimes you do need `require()` to use a package conditionally (e.g. the sun is not going to explode without this package), in which case you may use an `if` statement, e.g.

```r 
if (require('foo')) {
  awesome_foo_function()
} else {
  warning('You missed an awesome function')
}
```

That should be what `require()` was designed for, but it is common to see R code like this as well:

```r 
if (!require('foo')) {
  stop('The package foo was not installed')
}
```

Sigh.

- `library('foo')` stops when **foo** was not installed
- `require()` is basically `try(library())`

Then `if (!require('foo')) stop()` is basically "if you _failed_ to _try_ to _load_ this package, please _fail_". I do not quite understand why it is worth the circle, except when one wants a different error message with the one from `library()`, otherwise one can simply load and fail.

There is one legitimate reason to use `require()`, though, and that is, "require is a verb and library is a noun!" I completely agree. `require` should have been a very nice name to choose for the purpose of loading a package, but unfortunately... you know.

If you take a look at the [StackOverflow question](http://stackoverflow.com/q/5595512/559676) on this, you will see a comment on "package vs library" was up-voted a lot of times. It used to make a lot of sense to me, but now I do not care as much as I did. There have been useRs (including me up to a certain point) desperately explaining the difference between the two terms _package_ and _library_, but somehow I think R's definition of a _library_ is indeed unusual, and the function `library()` makes the situation worse. Now I'm totally fine if anyone calls my packages "libraries", because I know what you mean.

Karthik Ram [suggested](https://twitter.com/_inundata/status/493481266365607936) this GIF to express "Ah a new _library_, but _require_? [Noooooo](http://nooooooooooooooo.com)":

![](https://db.yihui.org/imgur/wygGyI1.gif)

Since you have read the source code, Luke, you may have found that you can abuse `require()` a bit, for example:

```r 
> (require(c('MASS', 'nnet')))
c("Loading required package: c", "Loading required package: MASS",
  "Loading required package: nnet")
Failed with error:  ‘'package' must be of length 1’
In addition: Warning message:
In if (!loaded) { :
  the condition has length > 1 and only the first element will be used
[1] FALSE

> (require(c('MASS', 'nnet'), character.only = TRUE))
c("Loading required package: MASS", "Loading required package: nnet")
Failed with error:  ‘'package' must be of length 1’
In addition: Warning message:
In if (!loaded) { :
  the condition has length > 1 and only the first element will be used
[1] FALSE

> library(c('MASS', 'nnet'), character.only = TRUE)
Error in library(c("MASS", "nnet"), character.only = TRUE) : 
  'package' must be of length 1
```

So `require()` failed not because **MASS** and **nnet** did not exist, but because of a different error. As long as there is an error (no matter what it is), `require()` returns `FALSE`.

One thing off-topic while I'm talking about these two functions: the argument `character.only = FALSE` for `library()` and `require()` is a design mistake in my eyes. It seems the original author(s) wanted to be lazy to avoid typing the quotes around the package name, so `library(foo)` works like `library("foo")`. Once you show people they can be lazy, you can never pull them back. Apparently, the editors of JSS (Journal of Statistical Software) have been trying to promote the form `library("foo")` and discourage `library(foo)`, but I do not think it makes much sense now or it will change anything. If it were in the 90's, I'd wholeheartedly support it. It is simply way too late now. Yes, two extra quotation marks will kill many kittens on this planet. If you are familiar with *nix commands, this idea is not new -- just think about `tar -z -x -f`, `tar -zxf`, and `tar zxf`.

One last mildly annoying issue with `require()` is that it is noisy by default, because of the default `quietly = FALSE`, e.g.

```r 
> require('nnet')
Loading required package: nnet
> require('MASS', quietly = TRUE)
```

So when I tell you to load a package, you tell me you are loading a package, as if you had heard me. Oh thank you!

![](https://db.yihui.org/imgur/4ojz1sG.gif)
