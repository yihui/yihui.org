---
title: Frequently (?) Asked Questions
date: '2017-12-02'
customCSS: ['utils/faq.css']
customJS: ['utils/faq.js']
---

This list of FAQs explain the technical details of TinyTeX for those who are curious, and alternative ways to install and use TinyTeX for those who are not sysadmins of their computers.

1. **Which version of TeX Live is installed?**

    By default, the latest working version on Windows, macOS, and Linux, and the latest version on other platforms (which may work or not). Here "working" means the version of TinyTeX has at least passed some basic tests by compiling a variety of R Markdown documents to PDF. If you have to install an older version, please read the next FAQ.

    Note that you can install the current latest version, and choose not to upgrade in the future if the version happens to be stable enough for you. However, this means you will not be able to install or update LaTeX packages after the current version of TeX Live is frozen (which happens annually).

1. **Do you provide prebuilt binaries of TinyTeX?**

    Yes, we have started to provide prebuilt binary packages for TinyTeX since September 2020, which can be found in the Github repo [`rstudio/tinytex-releases`](https://github.com/rstudio/tinytex-releases). This was made possible after two TeX Live developers explained the TeX Live license to me, which sounded complicated to me previously and made me hesitate to redistribute TeX Live as a binary package. After I knew it was okay to do so, I built the binaries and released them to Github Releases.

1. **What is the size of TinyTeX?**

    About 84MB on macOS and 66MB on Linux (gzipped), and 99MB on Windows (zipped). You may think it is still too big, but please consider that the size of [the BasicTeX installer](https://www.tug.org/mactex/morepackages.html) for macOS is about 80MB, and a [basic MiKTeX installer](https://miktex.org/download) for Windows is about 235MB.

    TinyTeX's small size can be very helpful if you install it on the cloud (e.g., for software testing purposes with Github Actions). The download and installation should take only a few seconds.

    Of course, the size of TinyTeX will grow as you install more LaTeX packages. You can certainly go to the extreme to install all packages (to avoid the possible need for figuring out which packages are missing). To do that, either run

    ```r
    tinytex::install_tinytex(bundle = 'TinyTeX-2')
    ```

    in R, or if you use the [Shell/Batch script](../#installation) to install TinyTeX, set the environment varialbe `TINYTEX_INSTALLER=TinyTeX-2` before you run the script.

    This may take quite a while since it needs to download and install about 2 GB of packages.

1. **How is TinyTeX created? How do you reduce the size of the gigantic TeX Live?**

    The best way to understand TinyTeX is to read the article "[TinyTeX: A lightweight, cross-platform, and easy-to-maintain LaTeX distribution based on TeX Live](https://tug.org/TUGboat/Contents/contents40-1.html)" in TUGBoat. Alternatively, you can [read the source](https://github.com/rstudio/tinytex/) under the `tools` directory. Basically, TinyTeX automates the TeX Live installation using a profile file named [tinytex.profile](https://github.com/rstudio/tinytex/blob/master/tools/tinytex.profile) (`./install-tl -profile=tinytex.profile`), which only specifies the `infraonly` scheme to be installed first. With this scheme, you cannot really compile any LaTeX documents, but it contains the most important utility `tlmgr` (TeX Live Manager). At this point, the total size is less than 1MB (on *nix).

    Then I use `tlmgr` to install a few more commonly used packages (defined in [pkgs-custom.txt](https://github.com/rstudio/tinytex/blob/master/tools/pkgs-custom.txt)). With these packages, you should be able to compile most R Markdown documents to PDF. The total size becomes about 61MB.

    The fact that I only included a small number of LaTeX packages in TinyTeX is one of the two reasons why TinyTeX is relatively small in size. The other reason is that I excluded the source files and documentation of packages. In `tinytex.profile`, you can see these two options:

    ```config
    option_doc 0
    option_src 0
    ```

    Why do I exclude source files? Because they are unlikely to be useful to end-users. Would you really read the source code of a LaTeX package? Probably not, unless you are a developer or advanced LaTeX user.

    Why do I exclude the documentations? Tell me honestly: how many times have you found a solution via [StackExchange](https://tex.stackexchange.com), and how many times have you tried to read the package documentation? Even with the full documentation installed, you probably don't even know where to find these documentation files on your computer. The documentation files take a lot of disk space, and I believe they are rarely read by an average user, so they are not included. The address bar of your web browser is the most convenient documentation: type and search.

    If you do want to obtain the source and documentation of packages, you may find them [on CTAN](https://ctan.org). Alternatively, you can reinstall the source and documentation of a package with the command `tlmgr installl --reinstall --with-doc --with-src <PKG>` (thanks to [the tip from Norbert Preining](https://github.com/rstudio/tinytex/pull/236#issuecomment-690789472)).

    The other major factor that affects the size of TeX Live is the font packages, which are usually much bigger than other LaTeX packages, but we cannot really do much about it, unless you do not use `pdflatex`, in which case you may further reduce the size of this small TeX Live distribution.

    You can use the command `tlmgr info --list --only-installed --data name,size` to obtain the sizes of all installed packages. If you have installed the R package **tinytex**, you can also use the function `tinytex::tl_sizes()`. For example, the size of the font package **lm** (Latin modern) is about 42MB!

1. **I'm a Linux system admin. How can I install TinyTeX for all users of a system?**

    First, add two options `--admin --no-path` to the installation script:

    ```sh
    wget -qO- "https://yihui.org/tinytex/install-unx.sh" \
      | sh -s - --admin --no-path
    ```
    
    This will install TinyTeX to `~/.TinyTeX`, and this step does _not_ require root privileges. Then you need to add symlinks to `/usr/local/bin` via `sudo`, so that all users of this system can use the TeX Live executables (e.g., `pdflatex`):
    
    ```sh
    sudo ~/.TinyTeX/bin/*/tlmgr path add
    ```

    [Some systems](https://github.com/rstudio/tinytex/issues/37) may set the permission of `~/.TinyTeX` to `700` by default, which means other users cannot really use TinyTeX (no permission to read, write, or execute anything in this directory). You may consider changing the owner or group of this directory using `chown`, and also granting write permission (plus execute permission on the subdirectory `bin`), e.g.,

    ```sh
    chown -R root:staff ~/.TinyTeX
    chmod -R g+w ~/.TinyTeX
    chmod -R g+wx ~/.TinyTeX/bin
    ```

    If you want to move `~/.TinyTeX` to a different location, see FAQ 8, and remember to run `tlmgr path add` with `sudo` after you move the folder, to make sure symlinks under `/usr/local/bin` point to the the new paths correctly.

1. **I'm a Linux admin. I used the above approach to install TinyTeX and added symlinks to `/usr/local/bin`. How can my users without root privileges install LaTeX packages by themselves?**

    Users without root privileges won't be able to install packages via a normal `tlmgr install` command, unless you have assigned them to a group that has write permissions to the TinyTeX root directory (by default, `~/.TinyTeX`, and note that `~` is _your own_ home directory), in which case these users are able to modify the system-wide installation of TinyTeX.
    
    For those who do not have write permissions to the TinyTeX directory, there is a [user mode](https://www.tug.org/texlive/doc/tlmgr.html#USER-MODE) in TeX Live that allows such users to manage a user-level texmf tree, e.g., a user can install packages to his/her home directory instead of a system directory. With TinyTeX, the user-level texmf tree is at `~/.TinyTeX/texmf-home` (in TeX Live's terms, this is the `TEXMFHOME` variable, and note that `~` is the _user's_ home directory).
    
    The first thing users have to do is to initialize the tree (create the `TEXMFHOME` directory if it does not exist). It only needs to be done once:
    
    ```sh
    tlmgr init-usertree
    ```
    
    Then when they install packages, they must always use the option `--usermode`, e.g.,
    
    ```sh
    tlmgr --usermode install koma-script xcolor
    ```
    
    For R users, the above commands are equivalent to:
    
    ```r
    tinytex::tlmgr('init-usertree')  # again, only do this once
    tinytex::tlmgr_install(c('koma-script', 'xcolor'), usermode = TRUE)
    ```
    
    However, the user mode of TeX Live can actually be quite complicated, and unfortunately it is not something that I can help with. A few known caveats:
    
    - The worst thing is that users cannot install all packages. For TeX Live, some packages are _relocatable_, and some are not. For example, packages containing executables are not relocatable (e.g., the **metafont** package contains the executable `mf`). If users have to use these packages, only the system admin can help. The good news is that the number of such packages is relatively small, so a conservative strategy is to let the sysadmin just pre-install all of them. The R function `tinytex:::tl_unrelocatable()` returns the names of all packages that are not relocatable, which is done through the call `tlmgr info --list --data name,relocatable`.
    
    - Some packages may require running [`updmap`](https://www.tug.org/texlive/doc/updmap.html) after installation (e.g., font packages for `pdflatex`). Good news is that users should be able to run `updmap-user`, and bad news is that whenever the system admin runs `updmap-sys`, users may have to run `updmap-user` again (if I understand the documentation correctly). For users, the conservative stragety is to run `updmap-user` again when they run into font problems that didn't exist previously (R users can run `system2('updmap-user')`).

1. **I'm a Debian/Ubuntu user. How do I prevent TeX Live from being installed when installing other packages that depend on TeX Live? I don't want (or need) both TinyTeX and the official TeX Live packages to be installed at the same time.**

    Yes, `apt-get install` might install certain `texlive-*` packages when they are dependencies of other packages (e.g., `apt-get install dvipng` will also install `texlive-base`). You can download and install [texlive-local.deb](https://travis-bin.yihui.org/texlive-local.deb) to "fool" `apt-get`.
    
    ```sh
    wget "https://travis-bin.yihui.org/texlive-local.deb"
    sudo dpkg -i texlive-local.deb
    rm texlive-local.deb
    ```
    
    This package was built by running [`equivs-build`](http://manpages.ubuntu.com/manpages/trusty/man1/equivs-build.1.html) on [debian-control-texlive-in.txt](https://github.com/scottkosty/install-tl-ubuntu/blob/master/debian-control-texlive-in.txt) (credits to Scott Kostyshak). Basically it pretends all `texlive` packages have been installed (which is not true), so that you can have the full freedom (and responsibility!) of choosing which LaTeX packages to install by yourself.

    Personally, I don't like the way that all LaTeX packages are distributed on Linux (e.g., Debian) as `texlive-*` packages, and each `texlive-*` package contains several LaTeX packages. That means you must install several other LaTeX packages even if you only need one. Imagine as an R user (or Python, or other languages): if someone prebuilds the more than 10,000 R packages on CRAN as 20 _collections_ of packages, what do you feel when you only need the **ggplot2** package but are forced to install all possible packages related to data visualization? Obviously the advantage of providing these collections is that you may not need to install missing packages over and over again (who knows), but I'd prefer a lean TeX Live distribution and install packages by myself (which is not difficult at all to me).

1. **Can I change the installation directory?**

    The directory path is hard-coded in the installation script, and you cannot change it from the command line when installing TinyTeX. I chose these directories for Linux, macOS, and Windows because they are hidden by default on these platforms. TeX Live should not need (cry for) your attention in most cases. If you really want to change the directory, there are a few ways:
    
    - You can download the installation scripts and modify them by yourself (in the spirit of open source).
    
    - If you are an R user, you can install the R package **tinytex**, and pass a custom directory name to the `dir` argument of `tinytex::install_tinytex()`.

    - Or install TinyTeX first, and move the installation folder to where you'd like it to be (you can even move it to a USB stick). That is because TinyTeX is essentially a _portable_ version of TeX Live. The tricky part of this way is to deal with the `PATH` variable. You need to run the command `tlmgr path add`, but `tlmgr` won't be on `PATH` if you have moved the default installation directory, so you have to execute `tlmgr` through its full path, e.g.,
    
        ```sh
        # assume you moved ~/.TinyTeX on Linux to /opt/tinytex
        /opt/tinytex/bin/*/tlmgr path add
        
        # assume you moved ~/Library/TinyTeX on macOS to /opt/tinytex
        /opt/tinytex/bin/*/tlmgr path add
        
        # assume you moved %APPDATA%\TinyTeX on Windows to C:\Software\TinyTeX
        "C:\Software\TinyTeX\bin\win32\tlmgr" path add
        ```
        
        You only need to do this once. If you installed TinyTeX using the approach in FAQ 5, you need `sudo` to run `tlmgr path add`.

1. **How can I use TinyTeX on a USB drive or other portable devices?**

    As I said, TinyTeX is a portable version of TeX Live, so you can simply copy it to a portable device. The only thing you need to do after you plug the device to another computer is run the command `tlmgr path add`. Again, you need the full path to `tlmgr` in your portable device (see the the previous FAQ). After you run this command and restart the application, you should be able to run `tlmgr` without its full path.

    If you are an R user, the above steps can be done with two functions:
    
    ```r
    # copy an existing TinyTeX installation (to your portable device)
    tinytex::copy_tinytex()
    # tell me where TinyTeX is on your device, and I'll run
    # tlmgr path add
    tinytex::use_tinytex()
    ```
    
    Note that TinyTeX installed on one platform will only work for the same platform, e.g., the Windows version only works for Windows. You cannot copy, for example, a macOS version of TinyTeX, and use it on a Windows machine.
    
    This is a great way to get rid of IT or system admins. You don't have to request them to install or upgrade LaTeX packages for you. You can do everything by yourself.

1. **Why doesn't the default installation path contain the year of TeX Live?**

    TeX Live installs itself to a directory named by the year by default (so does MacTeX), e.g., `/usr/local/texlive/2017`. I don't think it makes much sense to average users. Who would want multiple versions of TeX Live to be installed on the same computer except TeX Live developers? The full TeX Live is gigantic, and you probably do not want it to eat your disk space year by year.
    
    Again, if you want to change the installation path of TinyTeX, you certainly can.

    One TinyTeX user told me he was not aware of the fact that every year he actually installed TeX Live (MacTeX) to a different folder. If it were not for testing TinyTeX, he would never have discovered that he had got 15GB of TeX Live in several folders (like `/usr/local/texlive/2015`, `.../2016`, and `.../2017`, etc.). That confirmed my guess: users often do not know they installed a new version of TeX Live without uninstalling or overriding the installation from the previous year, so this monster just keeps growing every year. Yes, disk space is cheap nowadays, but that does not mean you have to waste it.

1. **How do I upgrade TinyTeX yearly after I had installed it in the previous year? I got a message like "tlmgr: Remote repository is newer than local (2017 < 2018)".**

    You can install TinyTeX again, as the installation script always installs the very latest version. However, the currently installed LaTeX packages will be lost. If you want to reinstall these packages, too, you may use the R function:
    
    ```r
    tinytex::reinstall_tinytex()
    ```
    
    If you do not use R, you can retrieve the list of packages and install them later:

    ```sh
    TL_INSTALLED_PKGS=$(tlmgr info --list --only-installed --data name | tr '\n' ' ')
    # Then reinstall TinyTeX using the script on the homepage.
    # After TinyTeX has been reinstalled, reinstall packages:
    tlmgr install $TL_INSTALLED_PKGS
    ```

1. **Which LaTeX packages do I need to use the R package tikzDevice?**

    To use the graphical device `tikzDevice::tikz()`, you need at these LaTeX packages:
    
    ```sh
    tlmgr install pgf preview xcolor
    ```

1. **I see a warning "not verified: gpg unavailable" every time when running `tlmgr`. How to get rid of this warning?**

    As the message indicates, your system does not have `gpg` (GnuPG):

    ```
    tlmgr: package repository http://example.org/.../tlnet (not verified:
      gpg unavailable)
    ```
    
    For TeX Live users on Windows and macOS, the easiest way to install `gpg` is probably http://www.preining.info/tlgpg/. The "one-time installation" suffices.

1. **How can I install TinyTeX and/or LaTeX packages through HTTP/HTTPS/FTP proxies?**

    You may create a `~/.wgetrc` file (`~` denotes your HOME directory), and add variables `http_proxy`, `https_proxy`, and/or `ftp_proxy` in it, e.g.,
    
    ```config
    http_proxy=http://user:password@proxy.example.com:8001/
    ```
    
    See [this page on tug.org](https://www.tug.org/texlive/acquire-netinstall.html) and [the documentation page of `wget`](https://www.gnu.org/software/wget/manual/html_node/Proxies.html) for more information.

1. **Can I use Homebrew to install TinyTeX on macOS?**

    Yes, but there are no obvious advantages, so I don't really recommend this approach:

    ```sh
    brew install -v yihui/tinytex/tinytex
    ```

    The formula is in the repo [yihui/homebrew-tinytex](https://github.com/yihui/homebrew-tinytex) on Github. If you must use this approach, here are two caveats that you should know:
    
    - Homebrew manages the symlinks of TeX Live (via `brew link tinytex`), and they are created under `/usr/local/bin`. You'd better not run `tlmgr path add` afterwards, because this command creates symlinks to the same location. When you install a TeX Live package (via `tlmgr install`) that contains binaries, such as **metafont** (which contains the executable `mf`), you should run:
    
        ```sh
        brew postinstall tinytex && brew unlink tinytex && brew link tinytex
        ```

    - After you update **tinytex** in Homebrew (e.g., via `brew update && brew upgrade`), the LaTeX packages that you previously installed by yourself will no longer be available, and you have to install them again. One solution is to `brew pin tinytex`, so that this formula won't be upgraded in the future (in fact, there should be no need to upgrade it). The other solution is to use the HEAD version of the formula:
    
        ```sh
        brew cleanup -s
        brew remove tinytex
        brew install -v --HEAD tinytex
        ```

    If you feel these issues are too complicated (yes they are), just follow the simpler way on the [homepage](/tinytex/) to install TinyTeX on macOS.

1. **How to open a command window (terminal) to execute the commands you mentioned?**

    I'm not going to answer this question for Linux users. For macOS users, `Command + Space` to launch the Spotlight Search, and type `Terminal`. The first result should be `Terminal.app`. That is it. For Windows users, right-click the Windows icon in the taskbar and choose `Windows PowerShell`.
    
    If you are an [RStudio](https://www.rstudio.com) user, it can be easier. RStudio (>= v1.1) has [built-in support for terminals](https://blog.rstudio.com/2017/08/11/rstudio-v1-1-preview-terminal/), and you can open a terminal right inside RStudio.
