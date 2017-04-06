---
title: 是莽撞人就来单挑：用 R Markdown 做海报
date: '2017-04-05'
slug: r-markdown-poster
---

去年有个机构想用 R Markdown 输出 LaTeX 海报。我说要是哪个周末我有空可以给你们整个包来干这事，一直也没时间，于是再发一张莽撞贴，看哪位莽撞人有兴趣把这事办了。本来我是想着我做个 R 包，让他们送我一张乒乓球桌（抠门如我，就这样出卖了自己的灵魂），现在我把这个奖励转让给能做出来的人。

我觉得这事应该不会太复杂，但只是我觉得。我这么觉得是因为我熟悉 knitr 和 rmarkdown 的各种黑暗面。捡重点说：

1. LaTeX 模板。Overleaf 网站上有一大堆[海报模板](https://www.overleaf.com/gallery/tagged/poster)，找两个学习一下大致的语法。

1. 大致上来说，可以基于 `rmarkdown::beamer_presentation` 构造这个海报输出格式。关键难点在于生成那些 LaTeX 环境。比如 `\begin{block}` `\begin{column}` 之类的。当然，你可以说 Pandoc 接受 LaTeX 环境啊，所以直接敲这些命令不就好了。问题是：

    1. 源代码看起来丑。
    
    1. 环境内部不能用 Markdown。如果要问为什么的话，请看[这里](https://github.com/jgm/pandoc/issues/2453)。不能用 Markdown 语法那还说个毛线，比如敲个列表又要用丑丑的 `\item`。整个人生都失去了意义。

    所以呢，黑招藏在 knitr 的 [block2 引擎](https://github.com/yihui/knitr/blob/master/R/engine.R)里。这个引擎是我在开发 bookdown 时想出来的，它没有任何技术文档，只有简略的[表面介绍](https://bookdown.org/yihui/bookdown/custom-blocks.html)，所以读源代码吧少年，源代码很短，套路却相当之深。它的目的是在 bookdown 文档中创建自定义环境，让这些环境能在 LaTeX 和 HTML 输出中通用，而且环境内部还要能支持 Markdown 语法。

如果你打通了这两关，那么剩下的事情就是语法包装了。一个海报文档看起来大约是这样的：

    ---
    title: Unnecessarily Complicated Research Title
    author: John Smith, James Smith and Jane Smith
    institute: Department and University Name
    output: mdposter::pdf_poster
    ---
    
    ```{alertblock, latex.options = '{Objectives}'}
    Lorem ipsum dolor sit amet, consectetur, nunc tellus pulvinar tortor,
    commodo eleifend risus arcu sed odio:
    
    - Mollis dignissim.
    - Sed aliquet luctus lectus, eget aliquet leo ullamcorper consequat.
    - Nascetur ridiculus mus.  
    - Euismod non erat.
    ```

这里面还有一个我没有现成答案的难点，就是嵌套环境。block2 引擎只适合单个的环境，你不能用一个 block2 块嵌套另一个 block2 块。可能需要发明额外的黑招。如果需要灵感，可以参照 bookdown 的 [PDF 格式源代码](https://github.com/rstudio/bookdown/blob/master/R/latex.R)，核心思想就是后期处理 .tex 文件，这里是正则表达式的天堂。

等你把乒乓球桌搬回家。
