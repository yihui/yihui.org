---
title: A Change in the TinyTeX Installation Path on Windows
subtitle: 'Did you run into the error "no appropriate script or program found: fmtutil"?'
date: '2023-11-17'
slug: tinytex-path
---

Since about a month ago, I have been receiving [error
reports](https://github.com/yihui/yihui.org/discussions/1089) from TinyTeX users
saying
"`TinyTeX\bin\windows\runscript.tlu:864: no appropriate script or program found: fmtutil`"
or "`` I can't find the format file `pdflatex.fmt'! ``", which I do not
understand.

For the last few days, I scratched my head, banged against the wall, did some
research, asked R and LaTeX experts in mailing lists, got reminded of
"*\[\[alternative HTML version deleted\]\]*" again (and apologized, of course),
dug out an old Windows laptop, proudly created a new user account with my
authentic Chinese name for the first time of my life (instead of using Pinyin),
went through trial and error, learned a variety of bizarreness of Windows batch
scripts as well as the Stack Overflow cures, summoned all Chinese students in my
alma mater to test their own Windows machines and the Windows servers in their
department, and meditated on the meaning of life for three seconds. Finally I'm
happy to announce that I have found a fix and applied it to **tinytex** (the R
package) v0.49.

## TLDR; The fix

If you have run into the above errors when rendering R Markdown or Quarto or
LaTeX documents to PDF, you can install the latest version of **tinytex** [from
CRAN](https://cran.r-project.org/package=tinytex):

``` r
install.packages('tinytex')
```

Please remember to restart R after installation. Then make sure
`packageVersion('tinytex') >= '0.49')`.

## The problem

If your Windows username does not contain spaces or non-ASCII characters, this
problem should not affect you.

``` r
Sys.getenv('APPDATA')
xfun::is_ascii(.Last.value) && !grepl(' ', .Last.value)
```

Although I have used LaTeX for nearly two decades, I have learned for the first
time ([from Akira
Kakuto](https://tug.org/pipermail/tex-live/2023-November/049634.html)) that TeX
Live does not work on Windows when its installation path contains non-ASCII
characters. By default, TinyTeX is installed to the path defined by the
environment variable `APPDATA`, which is of the form
`C:\Users\username\AppData\Roaming`. The problem comes from the `username` in
this path, which can contain multibyte characters, and cause TeX Live to fail
with a lot of error messages like below:

```         
! warning: kpathsea: configuration file texmf.cnf not found in these directories: 
....
! ...s\username\AppData\Roaming\TinyTeX\bin\windows\runscript.tlu:941: ...s\username\AppData\Roaming\TinyTeX\bin\windows\runscript.tlu:864: no appropriate script or program found: fmtutil
! Running the command C:\Users\username\AppData\Roaming\TinyTeX\bin\windows\fmtutil-user.exe

! kpathsea: Running mktexfmt pdflatex.fmt

! The command name is C:\Users\username\AppData\Roaming\TinyTeX\bin\windows\mktexfmt
```

In theory, `username` containing spaces should be fine, because a space is an
ASCII character. However, I have received reports that [spaces can be
trouble](https://github.com/rstudio/tinytex/issues/420), too. I do know why (is
[this recent bug fix](https://github.com/wch/r-source/commit/ab97b0) in base R
relevant?).

## The change

With **tinytex** v0.49, when your `APPDATA` path contains spaces or non-ASCII
characters:

-   If you run `tinytex::install_tinytex()` to install TinyTeX for the first
    time on a computer, it will install TinyTeX to the path defined by the
    environment variable `ProgramData`, which is typically `C:\ProgramData`.
    This path has no spaces or non-ASCII characters, but note that it is hidden
    by default (which is harmless). In addition, this folder is shared by all
    users in the system. If you have multiple users, this could be a problem.
    For example, other users can change or override your installation. If this
    is a concern, you can specify a different path via the `dir` argument of
    `install_tinytex()`. Remember this path should not contain special
    characters, either.

-   If TinyTeX has already been installed to `APPDATA`, you will get a warning
    message telling you how to move it to `ProgramData` (you can also move it to
    another place if you want---just specify a different path to the `to`
    argument below). You may have to restart R or even the system after moving
    TinyTeX.

``` r
tinytex::copy_tinytex(to = Sys.getenv('ProgramData'), move = TRUE)
```

The installation script
[`install-bin-windows.bat`](https://github.com/rstudio/tinytex/blob/main/tools/install-bin-windows.bat)
has also been updated accordingly.

## A potential flaw

The above fix is based on the assumption that `ProgramData` is writable, which
appears to be true according to various tests that I asked for from some
students. If it is not true, you will have to specify your own installation path
in `tinytex::install_tinytex()`, or if you use the Windows batch file, you can
set the environment variable `TINYTEX_DIR` (which defaults to `APPDATA` or
`ProgramData`).

## Quarto users

The command `quarto install tinytex` [is also
impacted](https://github.com/quarto-dev/quarto-cli/issues/7620) by this problem
on Windows, and I have submitted a similar fix to Quarto. Before it is applied,
moving TinyTeX by yourself can also fix the problem. The only issue is that for
non-R users, there is not an automatic solution like calling an R function, and
you will have to move it manually (then run `tlmgr path add` and also
`tlmgr postaction install script xetex` if you use XeLaTeX).

If any Windows users run into any issues when installing or moving TinyTeX to
the `ProgramData` folder, please feel free to let me know. Thanks!
