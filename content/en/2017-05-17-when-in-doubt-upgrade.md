---
title: When in Doubt, Try to Upgrade Your Software Packages
date: '2017-05-17'
slug: when-in-doubt-upgrade
---

I have said this many times in several Github issues and it is also the very first [FAQ](/knitr/faq/) of **knitr**. It is a little exaggerative and certainly not a universal rule, but it helps a lot if you could try to upgrade everything before you report a software issue. It is even more helpful if you could also install the development version of the software and see if the problem has gone. Although it sounds like a joke, [@ThePracticalDev](https://twitter.com/ThePracticalDev/) actually has a very good point:

[![](https://pbs.twimg.com/media/Cf7eHZ1W4AEeZJA.jpg)](https://twitter.com/ThePracticalDev/status/720257210161311744/)

You may replace "Changing Stuff" with "Upgrading Stuff" above.

A few notes from my personal experience just for your reference and also for my future self (_not meant to be a guide_):

- R and R packages: Unless you are a developer who cares a lot about different versions of R and has to install multiple versions of R,^[I guess the vast majority of R users always install and use a single version of R.] do not use or configure a _versioned_ library path for R packages. For example, when you set `R_LIBS_USER` in `~/.Renviron`, do not include the version number `%V` or `%v`. See more info on the help page `?R_LIBS`. This means all versions of R will use the same library path, e.g., `R_LIBS_USER=~/R`. This can cause you (serious) problems after you upgrade R because some old R packages can be broken (e.g. from R 3.3.x to 3.4.0), but don't worry, the solution is simple:

    ```r
    update.packages(ask = FALSE, checkBuilt = TRUE)
    ```

    I always recommend `checkBuilt = TRUE`. It is a conservative choice, which may waste you a few more minutes to reinstall packages that actually still work well under the new version of R, but I prefer safety over time.

- Homebrew: `brew upgrade && brew cleanup`. Homebrew is one of the two most important reasons why I switched from Linux to macOS a few years ago.^[The other reason was that [Joe](https://github.com/jcheng5) bought me a nice Thunderbolt display that wouldn't work with my Linux laptop. I tried for a long time, screwed up my system/BIOS a couple of times, and eventually gave up (and of course, blamed Joe secretly in my mind). In retrospect, I think macOS is the best choice for me as a software developer anyway, because it is easy to install Linux and Windows as virtual machines, whereas it is probably not worth installing macOS as a virtual machine in other systems. I don't know if it is even possible without a physical Mac machine.] It is so awesome and convenient, and is exactly how I expect how system package manager to work: allow the community to help manage packages via Github pull requests. I'm seriously looking forward to Jeroen's project on [building R packages with Homebrew](https://www.r-consortium.org/blog/2017/04/03/q1-2017-isc-grants). This is something I have waited for long, and I think the future of Homebrew R is brighter than the CRAN binaries of R and R packages.

- LaTeX: I think everybody knows that I dislike everything about LaTeX except the PDF output.^[On an irrelevant note, I love everything about StackOverflow except the toxic attitude towards newcomers. I'll write about this in a future post.] I dislike the installation, maintainence, syntax, and debugging process of LaTeX. Almost everything is painful on every platform.^[Comparing all these kinds of pain, installing MikTeX on Windows may be the only thing that is not painful.] I'm not going to rant more, but ~~just point out that updating LaTeX (and LaTeX packages) could be trickier than you imagined.~~ [TinyTeX](/tinytex/) has made it much easier compared to other LaTeX distributions: just use the R function `tinytex::tlmgr_update()`, or run the command line `tlmgr update --all --self`.

    - ~~For Linux users, I recommend installing TeXLive from source and either add the bin path to `PATH` or `sudo tlmgr path add`. Then you can enjoy (or suffer from) `tlmgr` instead of waiting for years for the official repo to have a recent version of TeXLive. For macOS users, MacTeX seems to be fine. When in doubt, `tlmgr update --self --all` (requires `sudo` on macOS). Still in doubt? Run `fmtutil-sys --all`, whatever it means (again, may require `sudo`, depending on where you installed LaTeX).~~

    - ~~For Windows users, [updating MikTeX](https://github.com/rstudio/bookdown/issues/375#issuecomment-288462901) may require you to update both LaTeX packages and refresh the filename database (whatever it means). Go to the Start menu, find MikTeX, and click any buttons that sound like "update me" (clicking buttons and seeing what happens).~~

Personally I prefer using the latest versions of software packages, and I upgrade whenever possible (kind of obsessive), because I don't want to run into old bugs that have been fixed. This is not necessarily a good choice or the right thing to do, and I don't have evidence about whether newer or older versions are better or worse in general. Newer versions may have new bugs or changes that you hate. All I want to express in this post is that when you are in trouble, you may try to upgrade first.

P.S. A list of issues solved simply by updating packages:

- [Leaflet tile not showing](https://github.com/rstudio/blogdown/issues/119)
- [Forbidden control sequence found when knitting the minimal example](https://github.com/rstudio/bookdown/issues/375)
- [Error in render_page(f) : Failed to render '2015-07-23-r-rmarkdown.Rmd'](https://github.com/rstudio/blogdown/issues/130)
- [Figures not referenced with consecutive numbers](https://github.com/rstudio/bookdown-demo/issues/17)
- [Kable with single column data frame ends up with no `<TABLE>` tag in generated HTML](https://github.com/yihui/knitr/issues/1423)
- [`new_site()` in blogdown causes error in editor](https://stackoverflow.com/q/46402910/559676)
- [Incompatible with Pandoc v2](https://github.com/rstudio/rmarkdown/issues/1244)
- [DT does not show up in Shiny after last upgrade](https://github.com/rstudio/DT/issues/489)
- [Blogdown Error: Couldn't Find Function "invalidUTF8"](https://stackoverflow.com/q/48523995/559676)
- [DT datatable callback function not working after update](https://github.com/rstudio/DT/issues/492)
- [imgur_upload fails](https://github.com/yihui/knitr/issues/1514)
- [Error with RMarkdown: `is_latex_output` is not an exported object from 'namespace:knitr'](https://github.com/rstudio/rmarkdown/issues/1272)
- [I'm trying to install hugo for the blogdown package but I get a fatal error stating that "R session Aborted, R encountered the fatal error"](https://twitter.com/pprabaka1/status/970841320783835136)
- [Getting failed to upload file error when reprex contains a plot](https://github.com/tidyverse/reprex/issues/168#issuecomment-367027374)
- [Allow `fun` in `stat_summary_2d` to return `data.frame`](https://github.com/tidyverse/ggplot2/issues/2519)
- [about the code run wrong in xaringan](https://github.com/yihui/xaringan/issues/131)
- [Problem rendering PDF on binder](https://github.com/yihui/tinytex/issues/47)
- [Invalid arguments when building PDF output with Pandoc2](https://github.com/rstudio/bookdown/issues/587)
- [Error while knitting a LaTeX file: could not find function “as”](https://stackoverflow.com/q/50834822/559676)
- [blogdown本地预览与netlify部署后的显示不一致](https://github.com/rstudio/blogdown/issues/316)
- [Incompatible with dev version of glue](https://github.com/rstudio/blogdown/issues/293)
- [chrome_print missing text in PDF, not with Google Chrome](https://github.com/rstudio/pagedown/issues/80)
- [Error when running serve_site(): "Error in as.vector(x, "character"): cannot coerce type 'environment' to vector of type 'character'"](https://github.com/rstudio/blogdown/issues/365)
- [tinytex::install_tinytex() can not work](https://github.com/yihui/tinytex/issues/112)
- [How do I force knitr to delete support directory (.png files) after HTML is knitted](https://stackoverflow.com/q/56278856/559676)
- [PeerJ output text appears cut](https://github.com/rstudio/rticles/issues/237)
- [error building theme](https://github.com/yihui/hugo-xmin/issues/38)
- [DT hanging with shiny/flexdashboard](https://github.com/rstudio/DT/issues/718)
- [Knit error in RStudio: pandoc conversion failed with error 23. Extension ascii_identifiers is not supported for markdown](https://stackoverflow.com/q/58999923/559676)
- [Table links don't work across R Markdown documents](https://github.com/rstudio/bookdown/issues/853)
- [knit pagedown html_resume to pdf with chrome_print produces error](https://stackoverflow.com/q/59845106/559676)
- [Rmarkdown not knitting to pdf ==> Fatal error occurred, no output PDF file produced](https://stackoverflow.com/q/59845679/559676)
- [version 1.18 not knitting to PDF due to `! Undefined control sequence. l.942 \file_get:nnN {unicode-math-table.tex} {} \l__um_mathtable_tl`](https://github.com/rstudio/rmarkdown/issues/1733)
- [The extension ascii_identifiers is not supported for markdown](https://github.com/yihui/knitr/issues/1814)
- [Pagedown: Not printing an element when kniting](https://github.com/rstudio/pagedown/issues/167)
- [include_graphics() does not work](https://github.com/yihui/tinytex/issues/183)
- [The extension SearchPanes does not exist](https://stackoverflow.com/q/60607052/559676)
