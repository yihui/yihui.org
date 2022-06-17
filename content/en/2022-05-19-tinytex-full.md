---
title: TinyTeX Users can Install the Full TeX Live Now (It's a few Gigabytes)
date: '2022-05-19'
slug: tinytex-full
---

As I mentioned in the [previous
post](/en/2022/05/tinytex-changes/#migrating-to-the-rstudio-org-on-github), we
planned to move the tinytex-related repositories from my personal account on
Github to `rstudio`, which is done now. In this post, I want to mention one
thing that has actually existed for a long time but never been publicly
mentioned: the full TeX Live bundle, as one of the [variations of
TinyTeX](https://github.com/rstudio/tinytex-releases/#releases).

As you may know, [TinyTeX](/tinytex/) was originally created as a *lightweight*
LaTeX distribution. That means we only include a small subset of LaTeX packages
in it, just enough to compile most R Markdown documents and projects to PDF. If
any LaTeX packages are still missing, the R package **tinytex** will try to
automatically install them on-the-fly. This approach has one significant
problem---it will not work when you do not have an Internet connection. For
example, you may be working on your flight (come on, why torture yourself like
that), or in a corporate environment that restricts your Internet connection.

To avoid the hassle, you (or your sysadmin) can install all possible LaTeX
packages, which will definitely take much more disk space, but you may prefer
the peace of mind. We have been building this "HugeTeX" for a while (known as
[the `TinyTeX-2`
bundle](https://github.com/rstudio/tinytex-releases/#releases)), which is
currently a little less than two Gigabytes when compressed and contains over
4000 packages. To install it via R:

``` r
# requires a version tinytex >= 0.40
install.packages('tinytex')

# increase the download timeout to 2 hours just in case the
# default 1 hour is not enough (you can further increase it)
options(timeout = 7200)

tinytex::install_tinytex(bundle = 'TinyTeX-2')
```

To install it via [shell and batch
scripts](https://github.com/rstudio/tinytex-releases/#installation), you can set
the environment variable `TINYTEX_INSTALLER=TinyTeX-2` before running the
script.

Happy TeXing with these 4000 packages!
