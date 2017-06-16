---
title: Testing R Packages
date: '2013-09-30'
slug: testing-r-packages
---

This guy th3james claimed [Testing Code Is
Simple](http://th3james.github.io/blog/2013/09/25/testing-code-is-simple/),
and I agree. In the R world, this is not anything new. As far as I can see,
there are three schools of R users with different testing techniques:

1. tests are put under `package/tests/`, and a `foo-test.Rout.save` from `R
  CMD BATCH foo-test.R`; testing is done by comparing `foo-test.Rout` from
  `R CMD check` with your `foo-test.Rout.save`; R notifies you when it sees
  text differences; this is typically used by R core and followers
1. **RUnit** and its followers: formal ideas were borrowed from other languages
  and frameworks and it looks there is a lot to learn before you can get started
1. the **testthat** family: tests are expressed as `expect_something()` like
  a natural human language

At its core, testing is nothing but "tell me if something unexpected happened".
The usual way to tell you is to signal an error. In R, that means `stop()`. A
very simple way to write a test for the function `FUN()` is:

```r 
if (!identical(FUN(arg1 = val1, arg2 = val2, ...), expected_value)) {
  stop('FUN() did not return the expected value!')
}
```

That is, when we pass the values `val1` and `val2` to the arguments `arg1` and
`arg2`, respectively, the function `FUN()` should return a value identical to
our expected value, otherwise we signal an error. If `R CMD check` sees an
error, it will stop and fail.

For me, I only want one thing for unit testing: I want the non-exported
functions to be visible to me during testing; unit testing should have all
"units" available, but R's namespace has intentionally restricted the objects
that are visible to the end users of a package, which is a _Very Good Thing_ to
end users. It is less convenient to the package author, since he/she will have
to use the triple colon syntax such as `foo:::hidden_fun()` when testing the
function `hidden_fun()`.

I wrote a tiny package called [**testit**](https://github.com/yihui/testit)
after [John Ramey](http://ramhiser.com) dropped by my office one afternoon while
I was doing intern at Fred Hutchinson Cancer Research Center last year. I
thought a while about the three testing approaches, and decided to write my own
package because I did not like the first approach (text comparison), and I did
not want to learn or remember the new vocabulary of **RUnit** or **testthat**.
There is only one function for the testing purpose in this package: `assert()`.

```r 
assert("1 plus 1 is equal to 2",
  1 + 1 == 2
)
```

You can write multiple testing conditions, e.g.

```r 
assert("1 plus 1 is equal to 2",
  1 + 1 == 2,
  identical(1 + 1, 2),
  (1 + 1 >= 2) && (1 + 1 <= 2), # mathematician's proof
  c(is.numeric(1 + 1), is.numeric(2))
)
```

Equivalently, you can write the conditions in `{}`, and each condition should be wrapped in `()`:

```r 
assert("1 plus 1 is equal to 2", {
  (1 + 1 == 2)
  (identical(1 + 1, 2))
  ((1 + 1 >= 2) && (1 + 1 <= 2)) # mathematician's proof
  c(is.numeric(1 + 1), is.numeric(2))
})
```

There is another function `test_pkg()` to run all tests of a package using an
empty environment with the package namespace as its parent environment, which
means all objects in the package, exported or not, are directly available
without `:::` in the test scripts. See the [CRAN
page](http://cran.rstudio.com/package=testit) for a list of packages that use
**testit**, for example, my [**highr**](https://github.com/yihui/highr) package,
where you can find some examples of tests.

While I do not like the text comparison approach, it does not mean it is not
useful. Actually it is extremely useful when testing text document output. It is
just a little awkward when testing function output. The text comparison approach
plays an important role in the development of **knitr**: I have a Github
repository [knitr-examples](https://github.com/yihui/knitr-examples), which
serves as both an example repo and a testing repo. When I push new commits to
Github, I use Travis CI to test the package, and there are two parts of the
tests: one is to run `R CMD check` on the package, which uses **testit** to run
the test R scripts, and the other is to re-compile all the examples, and do `git
diff` to see if there are changes. I have more than 100 examples, which should
have reasonable coverage of possible problems in the new changes in **knitr**.
This way, I feel comfortable when I bring new features or make changes in
**knitr** because I know they are unlikely to break old documents.

If you are new to testing and only have 3 minutes, I'd strongly recommend you to
read at least the first two sections of Hadley's [**testthat** article](http://journal.r-project.org/archive/2011-1/).
