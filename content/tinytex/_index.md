---
title: TinyTeX
date: '2017-12-02'
subtitle: A lightweight, cross-platform, portable, and easy-to-maintain LaTeX distribution based on TeX Live
---

TinyTeX is a custom LaTeX distribution based on TeX Live that is small in size (150Mb on macOS/Linux and 220Mb on Windows) but functions well in most cases, especially for R users. If you run into the problem of missing LaTeX packages, it should be super clear to you what you need to do (in fact, R users won't need to do anything). _You only install LaTeX packages you actually need._

![The TinyTeX logo; designed by Hao Zhu @haozhu233](/images/logo-tinytex.png)

TinyTeX only provides an installation script that downloads and installs TeX Live over the network. It may take a couple of minutes, depending on your network speed. Currently TinyTeX works best for R users. Other users can use it, too---it is just that missing LaTeX packages won't be automatically installed.

Installing or running TinyTeX _does not_ require admin privileges, which means you no longer need `sudo` or your IT. You can even run TinyTeX from a Flash drive.

## For R Users

Installing and maintaining TinyTeX is easy for R users, since [the R package **tinytex**](/tinytex/r/) has provided wrapper functions (N.B. the lowercase and bold **tinytex** means _the R package_, and the camel-case TinyTeX means _the LaTeX distribution_). You can use **tinytex** to install TinyTeX:

```r
install.packages('tinytex')
tinytex::install_tinytex()
# to uninstall TinyTeX, run tinytex::uninstall_tinytex() 
```

To compile an R Markdown document to PDF, there is nothing else you have to know.

To compile a LaTeX document to PDF, call one of these functions (depending on the LaTeX engine you want to use) in **tinytex**: `pdflatex()`, `xelatex()`, and `lualatex()`. When these functions detect LaTeX packages required but not installed in TinyTeX, they will automatically install the missing packages by default.

```r
# writeLines(c(
#   '\\documentclass{article}',
#   '\\begin{document}', 'Hello world!', '\\end{document}'
# ), 'test.tex')
tinytex::pdflatex('test.tex')
```

That is all an average R user needs to know. If you are a developer, you may want to install [some more packages](https://github.com/yihui/tinytex/blob/master/tools/pkgs-yihui.txt) via `tinytex:::install_yihui_pkgs()`. This function installs packages that I need for building PDF vignettes of many CRAN packages, and may save you some time for searching for them [by yourself](https://github.com/yihui/tinytex/issues/135).

If you do not use R, you need to know one more thing: the `tlmgr` command.

## For Other Users

TinyTeX assumes that you are not afraid of using the command line. If you are, please use other popular LaTeX distributions instead. In fact, there is only one single command that you need to know: `tlmgr`. It is probably not too scary.

### Installation

For Linux users, TinyTeX will be installed to `$HOME/.TinyTeX` and symlinks of executables (such as `pdflatex`) are created under `$HOME/bin`, which should be on the `PATH` environment variable:^[If not, you know how to add it to `PATH`, just because you are a Linux user!]

```sh
wget -qO- "https://yihui.org/gh/tinytex/tools/install-unx.sh" | sh
```

For macOS users, TinyTeX will be installed to `~/Library/TinyTeX`, and executables are symlinked to `/usr/local/bin`:

```sh
curl -sL "https://yihui.org/gh/tinytex/tools/install-unx.sh" | sh
```

For Windows users, save the batch file [install-windows.bat](https://yihui.org/gh/tinytex/tools/install-windows.bat) (open this link and press `Ctrl + S`), and double click it.^[Your anti-virus software might warn against certain `*.dll` files, and you may want to trust these files. However, I'm not a Windows expert, so I'll leave the decision to yourself.] Please note that it requires PowerShell ([at least version 3.0](https://docs.microsoft.com/en-us/powershell/scripting/setup/starting-windows-powershell-on-earlier-versions-of-windows)). If your Windows version is too low and does not have PowerShell, follow [this article](https://docs.microsoft.com/en-us/powershell/scripting/setup/starting-windows-powershell-on-earlier-versions-of-windows) to install it. There might be an error dialog or two about `luatex.dll` during the installation ([like this](https://db.yihui.org/images/install-tl-win-lua.png)), but that does not seem to hurt, and I just clicked "OK". The installation directory is `%APPDATA%/TinyTeX`, where `APPDATA` is an environment variable that typically points to the path `C:\Users\Your Name\AppData\Roaming`.^[Click the Start menu, Run, type `cmd` to open a command window, and type `echo %APPDATA%` to figure out the actual path if you are curious.]

To uninstall TinyTeX, simply delete the folder from your file manager/browser, or use command line:

```sh
# Linux
tlmgr path remove
rm -r "~/.TinyTeX"

# macOS
tlmgr path remove
rm -r "~/Library/TinyTeX"

# Windows
tlmgr path remove
rd /s /q "%APPDATA%\TinyTeX"
```

Compare the way to uninstall TinyTeX with the ways to uninstall other LaTeX distributions, and you may appreciate how much simpler it is to get rid of TinyTeX than other LaTeX distributions. That is because TinyTeX is just a self-contained folder.

### Maintenance

This section is only for those who are _not_ R Markdown users --- everything is automatic for R Markdown users, and you don't need to manually search for or install missing LaTeX packages.

If you compile a LaTeX document and run into an error message like this:

```
! LaTeX Error: File `times.sty' not found.

Type X to quit or <RETURN> to proceed,
or enter new name. (Default extension: sty)
```

It basically indicates a missing LaTeX package. Do not panic. Open a command window, and use the command `tlmgr search --global --file` followed by the filename,^[Add a forward slash before the filename for an exact match. Without the slash, other packages may be matched, e.g., `chemtimes.sty`.] e.g.,

```sh
$ tlmgr search --global --file "/times.sty"
psnfss:
        texmf-dist/tex/latex/psnfss/times.sty
...
```

Find the package that contains the file with the exact name in the error log above. In this case, the missing package is `psnfss`, and we can install a package via `tlmgr install`, e.g.,

```sh
tlmgr install psnfss
```

If you still see error messages that you don't understand, you may update everything:

```sh
tlmgr update --self --all
tlmgr path add
fmtutil-sys --all
```

For R users, you can use the corresponding helper functions. Some examples:

```r
library(tinytex)
tlmgr_search('/times.sty')   # search for times.sty
tlmgr_install('psnfss')      # install the psnfss package
tlmgr_update()               # update everything
```

If you see an error message "Remote repository newer than local", it means it is time for you to upgrade (reinstall) TinyTeX manually:

```r
tinytex::reinstall_tinytex()
```

If you see a message like below, don't panic. Just wait for a couple of months and prepare for reinstalling TinyTeX.

> TeX Live 2018 is frozen forever and will no longer be updated.  This happens in preparation for a new release.

> If you're interested in helping to pretest the new release (when pretests are available), please read https://tug.org/texlive/pretest.html. Otherwise, just wait, and the new release will be ready in due time.


That is all for an average user. Read [the FAQ page](/tinytex/faq/) if you wish to know more technical details about TinyTeX.

## Motivation

The installation and maintenance of LaTeX have bothered me for several years. Yes, there are MiKTeX, MacTeX, and TeX Live, but the common problems are:

1. You have to either install a basic version that is relatively small (several hundred MB) but basically doesn't work, because it is very likely that certain frequently used LaTeX packages are missing; or you install the full version that is several GB, but in your whole life, you probably will only use 1% of the packages.

2. The documentation for installation and maintenance is often way too long for beginners. For example, I doubt if anyone has the courage or patience to read [the `tlmgr` manual](https://www.tug.org/texlive/doc/tlmgr.html) (yes, it is very useful, thanks to the TeX Live team).

Fortunately, there is a nice way out based on TeX Live. TeX Live is great: it is cross-platform (yes, it works on Windows, too), and it _can_ be portable. We just need to make it lightweight, and easier to maintain, so here comes TinyTeX.

## Acknowledgements

I'd like to thank the TeX Live team for the great work, without which TinyTeX wouldn't be possible. I'm particularly grateful that they offered the options to remove source code and documentation from the installation.

I cannot thank [Peng Zhao](http://www.pzhao.org) and [Miao Yu](https://yufree.cn) enough for their extremely careful and patient [testing](https://d.cosx.org/d/419672) as well as the very useful feedback. Several other users also helped test the beta version, including [Carl Boettiger](https://www.carlboettiger.info), [TC](http://tc.rbind.io), [Ce Gao](https://github.com/gaocegege), and [Xiangyun Huang](https://github.com/XiangyunHuang). The hex logo was designed by [Hao Zhu](https://github.com/haozhu233).
