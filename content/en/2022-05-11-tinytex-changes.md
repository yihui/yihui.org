---
title: Two Upcoming Changes in TinyTeX and tinytex
date: '2022-05-11'
slug: tinytex-changes
---

Recently I received an email from CRAN, from which I learned about an accident
related to [TinyTeX](/tinytex/). CRAN requested me to make a change to avoid
such accidents in the future, and I'd like to mention this change and also
announce another upcoming change in this post.

## Preventing accidental installation of TinyTeX

For the sake of convenience, the R function `tinytex::install_tinytex()` would
not ask for user's confirmation before installing TinyTeX. I assume that users
know what they are doing when calling this function, just like calling
`install.packages()` would install R packages without confirmation. I knew this
could be problematic since the beginning, because users might call this function
inadvertently, and there is not a straightforward way to prevent the
installation.

I have enjoyed more than four years' peace... until someone called this function
somewhere in his/her package (presumably inadvertently since this is definitely
against the CRAN policy), which installed TinyTeX on CRAN's machines. What a
horror story!

In the next version of the R package **tinytex**, `install_tinytex()` will
prevent the automatic installation in the following two cases:

1.  The environment variable `TINYTEX_PREVENT_INSTALL` is set to `true`. This
    gives the sysadmin a way to disable the installation altogether, and
    `install_tinytex()` will simply throw an error.
2.  Another LaTeX distribution is detected. In this case, if the R session is
    `interactive()`, users will be asked if they want to continue the
    installation anyway; if the R session is not interactive,
    `install_tinytex()` will throw an error telling users that if they are sure
    they want to install TinyTeX anyway, they can use
    `tinytex::install_tinytex(force = TRUE)`.

I guess this change should not affect too many people, but it will affect
existing users who install TinyTeX via `install_tinytex()` in a non-interactive
R session (e.g., via the command `Rscript -e 'tinytex::install_tinytex()`) when
there already exists a LaTeX distribution in the system. You would have to use
the argument `force = TRUE`. That may be a minor inconvenience, but the gain is
that there should be much fewer accidents like the one I mentioned above.

If you want to check if this change affects you, you may install the dev version
of **tinytex** now:

``` r
remotes::install_github('rstudio/tinytex')
```

And see what happens to `tinytex::install_tinytex()`.

If you have any feedback on this change, please feel free to let me know.
Currently, I plan to submit the new version to CRAN next week.

## Migrating to the rstudio org on Github

We plan to migrate the two Github repositories,
<https://github.com/yihui/tinytex> and
<https://github.com/yihui/tinytex-releases> to the `rstudio` organization next
week (May 16, 2022). That is, they will become
`https://github.com/rstudio/tinytex` and
`https://github.com/rstudio/tinytex-releases`, respectively. We hoped to migrate
the two repositories from my personal account to `rstudio` to make it safer to
build and install TinyTeX, and also easier to manage future contributions to
this project.

In theory, this should not affect anyone, because Github will automatically
redirect the old links to the new ones, including links to the precompiled
TinyTeX binaries in Github Releases. Anyway, I want to announce this in advance
so that you can be better prepared. If you run into any problems with installing
TinyTeX next week, please do us a favor [file a
report](https://github.com/rstudio/tinytex/issues) immediately. Thanks!

[![TinyTeX logo](/images/logo-tinytex.png)](/tinytex/)
