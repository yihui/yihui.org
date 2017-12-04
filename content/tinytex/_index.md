---
title: TinyTeX
date: '2017-12-02'
subtitle: A lightweight and easy-to-maintain LaTeX distribution based on TeX Live
---

The installation and maintenance of LaTeX have bothered me for several years. Yes, there are MiKTeX, MacTeX, and TeX Live, but the common problems are:

1. You have to either install a basic version that is relatively small (several hundred MB) but basically doesn't work, because it is very likely that certain frequently used LaTeX packages are missing; or you install the full version that is several GB, but in your whole life, you probably will only use 1% of the packages.

2. The documentation for installation and maintenance is often way too long for beginners. For example, I doubt if anyone has the courage or patience to read [the `tlmgr` manual](https://www.tug.org/texlive/doc/tlmgr.html) (yes, it is very useful, thanks to the TeX Live team).

I hope to solve these problems by TinyTeX, a custom (and probably opinionated) LaTeX distribution based on TeX Live that is small in size but still functions well in most cases. Even if you run into the problem of missing LaTeX packages, it should be super clear to you what you need to do. The manual should be at most two pages long.

Please note that TinyTeX assumes that you are not afraid of using the command line. If you are, please use other popular LaTeX distributions instead. In fact, there is only one single command that you need to know: `tlmgr`. It is probably not too scary.

TinyTeX only provides an installation script that downloads and installs TeX Live over the network. This process may take less than 2 minutes on Linux and macOS, and more than 5 minutes on Windows, depending on your network speed. Before you install TinyTeX, I recommend that _you uninstall your existing LaTeX distribution_. Currently TinyTeX works best for R users, but it should not be too hard for other users to understand or use.
 
## For R Users

Installing and maintaining TinyTeX are easy for R users, since [the R package **tinytex**](/tinytex/r/) has provided wrapper functions.^[Note that when we say **tinytex** (lower case), we mean the R package. TinyTeX means the LaTeX distribution.] To install TinyTeX:

```r
devtools::install_github('yihui/tinytex')
tinytex::install_tinytex()
```

What `install_tinytex()` does will be explained later. If you need to uninstall TinyTeX, run `tinytex::uninstall_tinytex()`. To compile a LaTeX document to PDF, call one of these functions (depending on the LaTeX engine you want to use) in **tinytex**: `pdflatex()`, `xelatex()`, and `lualatex()`. If these functions detect LaTeX packages required but not installed in TinyTeX, they will automatically install the missing packages by default.

```r
tinytex::pdflatex('test.tex')
```

In the near future, we will add the **tinytex** support in the **rmarkdown** package, so that R users will rarely need to worry about LaTeX maintenance issues (missing packages will be automatically installed) and can really focus on writing.

## For Other Users

### Installation

For Linux users, TinyTeX will be installed to `$HOME/.TinyTeX` and symlinks of executables (such as `pdflatex`) are created under `$HOME/bin`, which should be on the `PATH` environment variable:^[If not, you know how to add it to `PATH`, just because you are a Linux user!]

```sh
wget -qO- \
  "https://github.com/yihui/tinytex/raw/master/tools/install-unx.sh" | sh
```

For macOS users, TinyTeX will be installed to `~/Library/TinyTeX`, and executables are symlinked to `/usr/local/bin`:

```sh
curl -sL \
  "https://github.com/yihui/tinytex/raw/master/tools/install-unx.sh" | sh
```

For Windows users, save the batch file [install-windows.bat](https://github.com/yihui/tinytex/raw/master/tools/install-windows.bat) (open this link and press `Ctrl + S`), and double click it.^[You anti-virus software might warn against certain `*.dll` files, and you may want to trust these files. However, I'm not a Windows expert, so I'll leave the decision to yourself.] Please note that it requires PowerShell. If your Windows version is too low and does not have PowerShell, follow [this article](https://docs.microsoft.com/en-us/powershell/scripting/setup/starting-windows-powershell-on-earlier-versions-of-windows) to install it. There might be an error dialog or two about `luatex.dll` during the installation ([like this](https://db.yihui.name/images/install-tl-win-lua.png)), but that does not seem to hurt, and I just clicked "OK". The installation directory is `%APPDATA%/TinyTeX`, where `APPDATA` is an environment variable that typically points to the path `C:\Users\Your Name\AppData\Roaming`.^[Click the Start menu, Run, type `cmd` to open a command window, and type `echo %APPDATA%` to figure out the actual path if you are curious.]

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

If you compile a LaTeX document and run into an error message like this:

```
! LaTeX Error: File `framed.sty' not found.

Type X to quit or <RETURN> to proceed,
or enter new name. (Default extension: sty)
```

It basically indicates a missing LaTeX package. Do not panic. Open a command window, and use the command `tlmgr search --global --file` followed by the filename,^[Add a forward slash before the filename for an exact match. Without the slash, other packages may be matched, e.g., `mdframed.sty`.] e.g.,

```sh
$ tlmgr search --global --file "/framed.sty"
framed:
        texmf-dist/tex/latex/framed/framed.sty
...
```

Find the package that contains the file with the exact name in the error log above. In this case, the missing package is `framed` (not `mdframed` or other packages), and we can install a package via `tlmgr install`, e.g.,

```sh
tlmgr install framed
```

If you still see error messages that you don't understand, you may update everything:

```sh
tlmgr update --self --all
tlmgr path add
fmtutil-sys --all
```

For R users, you can use the corresponding helper functions:

```r
library(tinytex)
tlmgr_search('/framed.sty')  # search for framed.sty
tlmgr_install('framed')      # install the framed package
tlmgr_update()               # update everything
```

That is all for an average user. Read [the FAQ page](/tinytex/faq/) if you wish to know more technical details about TinyTeX.
