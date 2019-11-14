---
title: R Package Versioning
date: '2013-06-27'
slug: r-package-versioning
---

This should be what it feels like to bump the major version of your software:

![bump the major version](https://db.yihui.org/imgur/hfdOEsw.gif)

For me, the main reason for package versioning is to indicate the (slight or
significant) differences among different versions of the same package,
otherwise we can keep on releasing the version 1.0.

That seems to be a very obvious fact, so here are my own versioning rules,
with some ideas borrowed from [Semantic Versioning](http://semver.org/):

1. a version number is of the form `major.minor.patch` (`x.y.z`), e.g., `0.1.7`
1. only the version `x.y` is released to CRAN
1. `x.y.z` is always the development version, and each time a new feature or
  a bug fix or a change is introduced, bump the patch version, e.g., from
  `0.1.3` to `0.1.4`
1. when one feels it is time to release to CRAN, bump the minor version,
  e.g., from `0.1` to `0.2`
1. when a change is crazy enough that many users are presumably going to
  yell at you (see the illustration above), it is time to bump the major
  version, e.g., from `0.18` to `1.0`
1. the version `1.0` does not imply maturity; it is just because it is
  potentially very different from `0.x` (such as API changes); same thing
  applies to `2.0` vs `1.0`

I learned the rule #3 from Michael Lawrence (author of **RGtk2**) and I
think it is a good idea. In particular, it is important for brave users who
dare install the development versions. When you ask them for their
`sessionInfo()`, you will be aware of which stage they are at.

Rule #2 saves us a little bit energy in the sense that we do not need to
write or talk about the **foo** package 1.3.548, which is boring to type or
speak. Normally we say **foo** 1.3. As a person whose first language is not
English, speaking the patch version does consume my brain memory and slows
down my thinking while I'm talking. When I say it in Chinese, I feel boring
and unnecessarily geeky. Yes, I know I always have weird opinions.
