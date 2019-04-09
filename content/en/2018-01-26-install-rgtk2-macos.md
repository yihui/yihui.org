---
title: Install RGtk2 From Source on macOS
subtitle: 'How to fix the problem "fatal error: ''gdk/gdkx.h'' file not found"'
date: '2018-01-26'
slug: install-rgtk2-macos
---

> **Update on 2018-06-13**: Because this issue has bothered me over and over again, I decided to work on some pre-built binaries of R packages for the Homebrew version of R. If you are using the latest versions of R (from either CRAN or Homebrew Cask) and macOS, you can ignore this post, and just install **RGtk2** with:

> ```r
system('brew install gtk+')
install.packages(
  'RGtk2', type = 'binary',
  repos = 'https://macos.rbind.io'
)
```

> You no longer need to edit the Homebrew formula as suggested in the post below, which is too complicated, time-consuming, and hard to maintain. BTW, I have experimented with the idea of building binary packages for the Homebrew version of R. See [this post](/en/2018/07/cranextra-macos/) for more information.

While I'm doing my "favorite" thing in R (running `R CMD check` on thousands of reverse dependencies), I realized the **RGtk2** package was _just_ updated on CRAN yesterday. I have to install it from source again. My hair was turning gray... I have done this a couple of times before, and each time it was like hell, mainly because I use macOS.

## Pre-built binary R packages for Homebrew R?

I don't understand why things can be so complicated for an R developer on macOS. When can we have a similar package management system like Homebrew for R so that we won't have to go through the pain of building certain packages from source over and over again? I'm a firm believer in Homebrew (mainly because it is maintained by the community instead of a single person), but unfortunately there is apparently some more work to do before R packages can be easy to install against the Homebrew version of R. Currently if you `brew install r`, you will have to install all R packages from source, which means you may have to install several system dependencies, such as `brew install libxml2`. I vaguely remember I read somewhere that the ninja Jeroen Ooms was going to work on it (no matter who it was, I'll be thrilled if someday we can use Homebrew R seamlessly with R packages).

## Install RGtk2 if you are also an unfortunate believer in Homebrew

So you probably know you need `brew install gtk+` before you can install the R package **RGtk2**, but you will soon see an error message like this:

```
Rgtk.c:7:10: fatal error: 'gdk/gdkx.h' file not found
#include <gdk/gdkx.h>
^
1 error generated.
make: *** [Rgtk.o] Error 1
ERROR: compilation failed for package ‘RGtk2’
```

The default installation of `gtk+` does not include `gdk/gdkx.h`, and you have to customize the installation (use the options `--with-gdktarget=x11` and `--enable-x11-backend`). I mainly followed the steps written by Zhiya Zuo in [a Github gist](https://gist.github.com/zhiyzuo/a489ffdcc5da87f28f8589a55aa206dd), but changed his Step 4: I didn't want to modify `PKG_CONFIG_PATH` permanently in `.bash_profile`, so I just set the environment variable temporarily in R:

```r
Sys.setenv(PKG_CONFIG_PATH = paste(
  "/usr/local/lib/pkgconfig",
  "/usr/local/lib/pkgconfig/gtk+-2.0.pc",
  "/opt/X11/lib/pkgconfig", sep = ":"
))
install.packages("RGtk2")
```

Note that Zhiya Zuo was trying to install **rattle**, which depends on **RGtk2**. Of
course, you don't have to install **rattle** if you don't need it, and just use his solution to install **RGtk2**.

## I'm not an expert of building packages from \(C) source

This short post is mostly for my own record (in case I need to do it again in the future). I have no idea what I was talking about. I don't know what `PKG_CONFIG_PATH` means (well, kind of). I don't know the C language, and don't even know how C header files work. You have been warned.

I really hope someday I won't have to do this again. Someone please save poor users like me, and provide prebuilt binary R packages for the Homebrew version of R, so that everything can be fully automated, and no more pain with "fatal error: 'gdk/gdkx.h' file not found". I don't think there are a huge number of R packages that are so difficult to install on macOS like **RGtk2**. In fact, most R packages are written in pure R, and we don't need binaries for those packages, because they can be easily installed from source with no other system dependencies. Currently the macOS binaries on CRAN seem to be maintained by a single person, and I'm a little worried about it.
