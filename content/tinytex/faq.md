---
title: Frequently Asked Questions
date: '2017-12-02'
---

TinyTeX is still a relatively new project, so these are only potential FAQs.

1. Which version of TeX Live is installed?

    The (very) latest. Using the very latest version of a software package can be risky. You have been warned. On the other hand, however, let's not pretend we haven't run into problems using the "stable" versions of TeX Live.
    
    Latest or stable? Your call. If you are not comfortable with the latest version, you should not consider TinyTeX.

1. Do you provide prebuilt binaries of TinyTeX?

    No. Technically it is easy, but I don't really understand the implications of [the TeX Live license](https://www.tug.org/texlive/LICENSE.TL). Specifically, the license says:
    
    > [...] TeX Live has neither a single copyright holder nor a single license covering its entire contents, since it is a collection of many independent packages.  Therefore, you may copy, modify, and/or redistribute software from TeX Live only if you comply with the requirements placed thereon by the owners of the respective packages.

    That sounds complicated to me.

1. What does the installation script do exactly? How do you reduce the size of the gigantic TeX Live?

    The best way to understand TinyTeX is to [read the source](https://github.com/yihui/tinytex/) under the `tools` directory. Basically, TinyTeX automates the TeX Live installation using a profile file named [texlive.profile](https://github.com/yihui/tinytex/blob/master/tools/texlive.profile) (`./install-tl -profile=texlive.profile`), which only specifies the `infraonly` scheme to be installed first. With this scheme, you cannot really compile any LaTeX documents, but it contains the most important utility `tlmgr` (TeX Live Manager). At this point, the total size is about 80MB.
    
    Then I use `tlmgr` to install a few more commonly used packages (defined in [pkgs-custom.txt](https://github.com/yihui/tinytex/blob/master/tools/pkgs-custom.txt)). With these packages, you should be able to compile most R Markdown documents to PDF. The total size becomes about 150MB.
    
    The fact that I only included a small number of LaTeX packages in TinyTeX is one of the two reasons why TinyTeX is relatively small in size. The other reason is that I excluded the source files and documentation of packages. In `texlive.profile`, you can see these two options:

    ```config
    option_doc 0
    option_src 0
    ```

    Why do I exclude source files? Because they are unlikely to be useful to end-users. Would you really read the source code of a LaTeX package? Probably not, unless you are a developer or advanced LaTeX user. In fact, this also explains why I don't provide prebuilt binaries of TinyTeX: some open-source licenses may require that you provide source files when you redistribute the open-source software. TinyTeX does not redistribute TeX Live, but only provides a custom installation script.

    Why do I exclude the documentations? Tell me honestly: how many times have you found a solution via [StackExchange](https://tex.stackexchange.com), and how many times have you tried to read the package documentation? Even with the full documentation installed, you probably don't even know where to find these documentation files on your computer. The documentation files take a lot of disk space, and I believe they are rarely read by an average user, so they are not included. The address bar of your web browser is the most convenient documentation: type and search.

1. I'm an R package developer. Are the default LaTeX packages included in TinyTeX enough for me to develop an R package?

    No, you need a few more: **metafont**, **mfware**, **inconsolata**, and **tex**, mainly because `R CMD check` needs to build manuals to PDF. You can install these packages through either the command line:
    
    ```sh
    tlmgr install metafont mfware inconsolata tex
    tlmgr path add
    ```
    
    or via the R function:
    
    ```r
    tinytex::tlmgr_install(c('metafont', 'mfware', 'inconsolata', 'tex'))
    ```
    
    Another important thing to do is add R's texmf tree to TeX Live. This is not easy to explain, but I have provided a function `tinytex::r_texmf()` to do it. Just do it. See the help page `?tinytex::r_texmf` if you are curious about the technical details.
    
    Although it is irrelevant to TinyTeX, you may also need to install [**texinfo**](https://www.gnu.org/software/texinfo/) (not a LaTeX package), since `R CMD check` may also require it. For macOS users, you can install it via Homebrew: `brew install texinfo`.

1. I'm a Linux system admin. I want to install TinyTeX for all users.

    Just add an option `--admin` to the installation script:

    ```sh
    wget -qO- \
      "https://github.com/yihui/tinytex/raw/master/tools/install-unx.sh" | \
      sh -s - --admin
    ```
    
    During the installation, it will ask your for password, because it will call `sudo tlmgr path add` to add symlinks of TeX Live binaries to `/usr/local/bin`. Without this option, binaries are symlinked to `$HOME/bin` instead.

1. Can I change the installation directory?

    The short answer is no. The directory path is hard-coded in the installation script. I chose these directories for Linux, macOS, and Windows because they are hidden by default on these platforms. TeX Live should not need (cry for) your attention in most cases. If you really want to change the directory, there are two ways:
    
    - You can download the installation scripts and modify them by yourself.
    
    - Or install TinyTeX first, and move the installation folder to where you'd like it to be (you can even move it to a USB stick). That is because TinyTeX is essentially a _portable_ version of TeX Live. The tricky part of this way is to deal with the `PATH` variable. You need to run the command `tlmgr path add`, but `tlmgr` won't be on `PATH` if you have moved the default installation directory, so you have to execute `tlmgr` through its full path, e.g.,
    
        ```sh
        # assume you moved ~/.TinyTeX on Linux to /opt/tinytex
        /opt/tinytex/bin/*/tlmgr path add
        
        # assume you moved ~/Library/TinyTeX on macOS to /opt/tinytex
        /opt/tinytex/bin/*/tlmgr path add
        
        # assume you moved %APPDATA%\TinyTeX on Windows to C:\Software\TinyTeX
        "C:\Software\TinyTeX\bin\win32\tlmgr" path add
        ```
        
        You only need to do this once.

1. Why doesn't the default installation path contain the year of TeX Live?

    TeX Live installs itself to a directory named by the year by default (so does MacTeX), e.g., `/usr/local/texlive/2017`. I don't think it makes much sense to average users. Who would want multiple versions of TeX Live to be installed on the same computer except TeX Live developers? The full TeX Live is gigantic, and you probably do not want it to eat your disk space year by year.
    
    Again, if you want to change the installation path of TinyTeX, you certainly can.

1. Can I use Homebrew to install TinyTeX on macOS?

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
