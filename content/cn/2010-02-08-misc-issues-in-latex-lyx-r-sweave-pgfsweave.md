---
title: 关于LaTeX + LyX + R/Sweave + pgfSweave + PDF图形的若干中文问题
date: '2010-02-08'
slug: misc-issues-in-latex-lyx-r-sweave-pgfsweave
---

> 2013/02/05更新：本文已经严重过期。pgfSweave包基本上已经进入不维护的状态，我的[knitr包](/knitr)已经可以完全替代它；LyX已经有大规模更新，本文提到的问题都已经在官方版本中解决，所有暗黑招数都已经没有必要。参见[以下视频](http://www.screenr.com/embed/SvL8)：

> <iframe src="https://www.screenr.com/embed/SvL8" width="550" height="335" frameborder="0"></iframe>

我不确定这是不是R和Sweave能达到的最漂亮的境界：[一份由pgfSweave生成的人模狗样的动态文档](https://bitbucket.org/stat/www/downloads/lyx-pgfsweave.pdf)。

这两天花了点时间，把跟LaTeX、LyX、Sweave有关的一系列中文问题从头到脚翻了个遍，目前为止，明白并解决了如下问题（基于带有MikTeX 2.8的CTeX 2.8.0.125、LyX 1.6.5、R 2.10.1、R包pgfSweave 1.0.3，操作系统Win XP，从头到尾一直用UTF-8编码）：

1. （**LaTeX说中文了**）LaTeX生成可复制粘贴的中文PDF文档：由于我的惰性，还用着N年前的CTeX，那个老版本CTeX中的MikTeX貌似一直有问题，比如无法更新LaTeX宏包，更不必说那些`dvipdfmx`之类的程序了，估计人家作者都已经更新了无数个版本我还不知道。在我陈旧的印象中，要用LaTeX生成可复制粘贴的中文只有一种办法，就是用`dvipdfmx`把dvi转为pdf，而我陈旧的印象又记得dvi文件只能由`latex`命令生成，并且用`latex`编译的文档必须用EPS图形，这一直让我觉得很不爽，因为我实在不爱用EPS，比如R的`postscript()`设备（可生成EPS图形）不支持半透明色，而且图形中要用中文字符的话配置非常麻烦（N年前我请教了Paul Murrell，虽然搞明白了，但心里仍有疙瘩）。我的偏好是用`pdflatex`命令编译文档，图形也用PDF格式（`pdflatex`默认支持PDF和PNG图形），用R生成PDF图形也方便、漂亮，所以配合Sweave很容易生成一篇干净利索的PDF文档；但`pdflatex`命令直接编译生成的中文文档中，中文字符是不能复制粘贴的，因为复制出来就是乱码。所以呢，我陈旧的知识让我的这个“麻烦问题”一直没有得到解决。

    现如今，发现CTeX已经把MikTeX更新到2.8了（其实早注意到了，就是懒得卸载几百兆的程序然后再下载几百兆的家伙装上），吭哧吭哧下下来发现自己的老问题早已不存在了……虽然我不清楚ctex宏包的细节，但总归是pdflatex可以编译生成可复制粘贴的中文文档了。

    ```tex
    \documentclass[twoside,UTF8]{ctexart}
    \usepackage[T1]{fontenc}
    \usepackage{CJKutf8}
    \usepackage[letterpaper]{geometry}
    \usepackage{esint}

    \makeatletter
    \usepackage{Sweave}

    \makeatother

    \begin{document}
    \begin{CJK}{UTF8}{}%

    \title{你好，中文}
    \author{我是作者}
    \maketitle

    \setkeys{Gin}{width=.8\linewidth}

    <<setup>>=
    pdf.options(family='GB1')
    @

    我是正文。

    \begin{figure}
    \begin{center}
    <<rnorm,fig=TRUE>>=
    rnorm(10)
    plot(rnorm(25), pch=1:25, main='中文字符',
         xlab='$\\alpha + \\beta$', ylab='$\\gamma$')
    @
    \end{center}
    \caption{一幅pgfSweave图}
    \end{figure}
    \end{CJK}
    \end{document}
    ```

    于是，中文文档可以嵌入PDF图形了，Sweave文档也可用中文编写了。我们要大力感谢`ctex`宏包的作者们为我们解决了各种中文配置问题。

    有客官也许要问，可复制粘贴的中文文档有那么重要么，一份中文文档可以正常阅读不就可以了么？是滴是滴，可复制粘贴很重要，我的关注点是放在网上的中文文档能否被搜索引擎正确收录。要是它本质上都是乱码，别人就无法通过搜索引擎找到你的东西了。这年头，平民百姓自个儿的网站的访问来源大部分都是来自于搜索引擎，别人要是搜不到你的东西，咋可能来敲门呢。不来敲门，咋会有后面更多的机会呢？

2. （**LyX基于LaTeX说中文了**）LyX使用ctex系列的layout：ctex宏包提供了三种基本的文档类，即论文、书籍和报告，这让我们写中文文档更符合中文习惯，一些英文名称比如Figure会变成“图”、Abstract会变成“摘要”，等等，让我们省去了大量的重命名工夫。

    我大约用了三四年时间LaTeX，辛辛苦苦敲代码啊敲代码，直到有一天发现了LyX。可以说大多数有界面的文本编辑器都跟MS Word一个德行，为了所见即所得，大大牺牲了质量，用了LaTeX的人大多会“中毒”，看别的什么排版都是垃圾，但LyX绝对是个例外，它聪明地提供了导入导出LaTeX的功能，虽说它也算是所见即所得，但它自己不干排版的事情，而是把这事儿交给LaTeX去办，排版质量当然没得说了。

    要在LyX中能够通过界面点选使用`ctex`的文档类的话，得自己先写几个`*.layout`文件放在`Resources/layouts/`目录下，比如要用`ctexart`类：

        #% Do not delete the line below; configure depends on this
        #  \DeclareLaTeXClass[ctexart]{article (CTeX)}

        # Read the definitions from article.layout
        Input article.layout

    存为`ctex-article.layout`，然后Reconfigure一下LyX，重启，就可以在`Document-->Settings`中选择这个类了，记得把语言设置为中文。这样，在LyX中就可以直接编译生成可复制粘贴的中文文档了。

3. （**Sweave基于LaTeX和LyX说中文了**）联合ctex宏包直接用LyX写中文Sweave文档：[CRAN上有关于如何配置LyX使之支持Sweave](http://cran.r-project.org/contrib/extra/lyx/)，所以很容易模仿一个新的layout文件，让LyX支持中文Sweave文件，比如就叫`ctex-article-sweave.layout`吧。

        #% Do not delete the line below; configure depends on this
        #  \DeclareLaTeXClass[ctexart, Sweave.sty]{article (Sweave CTeX)}

        # Read the definitions from literate-article.layout
        Input literate-article.layout

    现在，我们就可以在菜单中选文档类为`article (Sweave CTeX)`了，当然我们要首先保证`ctexart.cls`和`Sweave.sty`都能被LyX找到（可以采取任何手段把R目录下的texmf下的Sweave.sty复制到LaTeX宏包的目录中去），否则这个选项会显示为unavailable。

    接下来，我们就要遇到点麻烦了：这里的看官的Windows系统恐怕都是中文环境，codepage是936，而Sweave读文件时需要正确的编码参数，你要是直接把中文的Rnw文件扔给它，它会把所有多字节字符转化为空白或者NA。所以呢，我们要稍微配置一下R的启动选项，比如在`Rprofile.site`文件中加上`options(encoding = "UTF-8")`，这样Sweave就能正确读入UTF-8编码的文件了（实际上这影响的是`readLines()`）。

4. （**动态的R图形基于Sweave、LyX和LaTeX说中文了**）R的`pdf()`图形设备是可以支持中文字符的，只不过要设置`family = "GB1"`参数，比如：

    ```r
    pdf(family = "GB1")
    plot(1, main = "我是中文，哇哈哈哈", xlab = "顶楼上的！")
    dev.off()
    ```

    这个参数可以用`pdf.options()`函数事先设定，因为我们无法用Sweave的选项去指定`pdf()`设备的family参数。

    然而，悲剧就在于这种方式生成的R图形中，英文字体很难看，瘦高瘦高的。所以我们需要对PDF图形进行某种处理。

5. （**动态的R图形基于pgfSweave、LyX和LaTeX说漂亮的中文了**）pgfSweave包提供了一种解决方案，就是把PDF图形转化为tikz格式（不甚了解，应该类似于pictex吧），然后插入LaTeX文档，这样图形中的所有文本都会被当做原始的LaTeX代码处理，其后果就是PDF图形中的文本格式将会LaTeX文档完全一致，包括数学公式！！比如我最开头的那段Sweave代码中，标签用了LaTeX数学公式，这些东西会被转化为原汁原味的LaTeX公式。

    要想让LyX支持pgfSweave，目前我只能通过暴力修改Sweave的converter，定义为 `R --verbose --no-save --no-restore -q -e "library(pgfSweave); pgfSweave('$$i', compile.tex=FALSE)"`，这样pgfSweave负责运行R代码并生成tex文档，然后LyX会自动将tex编译为PDF。

    至此，我们能够在ctex、LaTeX、R和pgfSweave的支持下用LyX创建**可复制粘贴中文的、动态的、能使用带有中文字符和原生LaTeX数学公式的PDF图形的**PDF文档。显然，这路途颇有些曲折，不过一番周折之后，想想以后写中文的东西只需要点几下鼠标，就能用R生成漂亮的PDF文档，心里还是很舒坦的。我写东西很是受排版影响——只要版式漂亮，俺就有无穷的写作动力。

几点附注：

1. 我用UTF-8编码的原因是它比较通用，尤其是这次论坛搬家，要是没有颜林林想出办法解决了从GB2312到UTF-8编码的转换，我真是被编码问题愁死了。打这以后，能用UTF-8一律用UTF-8，管它占用空间大小呢。再者，后面我还想大规模使用GitHub，那网站也是UTF-8的，为了源文件在网站上能正确显示，也必须用UTF-8编码。
2. CRAN上关于LyX的配置（literate-scrap.inc）被我拿来修改了，主要是更改了Scrap的定义，我很不喜欢原作者关于换行符的定义，必须用Ctrl+Enter，使得老夫在LyX中敲R代码很不爽，而且没法跟别的编辑器互相复制粘贴，现在我可以自由自在地敲R代码了。
3. Sweave到pdfLaTeX的转换器从`R CMD Sweave $$i`改为了`cp $$r/*.{r,txt,pdf} ./ & R --verbose --no-save --no-restore -q -e "library(pgfSweave); pgfSweave('$$i', compile.tex=FALSE)"`，原因是LyX会把文档复制到一个临时目录下编译，这一点我觉得挺不好的，尤其是写动态文档时，有些数据文件或者R代码需要在文档中使用，但LyX不会把它们全都复制过去，所以R代码运行时会出错，所以我人为加入了复制*.r/*.txt/*.pdf文件到编译的目录中去的命令，然后用命令行的方式执行R，执行的内容是 `library(pgfSweave); pgfSweave('$$i', compile.tex=FALSE)`，这段代码可以用-e参数传给R；设定compile.tex=FALSE的原因是pgfSweave默认会编译LaTeX文档，而我们只需要让它走到生成LaTeX文档那一步就够了。
4. Sweave不支持给每一幅图形设定宽度，只能通过`\setkeys{Gin}{width=}`的方式统一设定文档中所有图形的宽度，这一点也让人很不爽，哪有文档能保证所有图形宽度都一样呢，因此我们让Sweave.sty不要统一设定宽度：`\usepackage[nogin]{Sweave}`；然后在每一段R代码块中分别设定width，这样pgfSweave可以根据这些宽度相应设定图形宽度。这一点也反映在对`literate-scrap.inc`文件的修改上了。
5. pgfSweave包默认有命令行执行的方式：`R CMD pgfSweave`，但这个方式是基于Rscript的，它在执行的时候并不会等程序真的运行完了才退出，而是一扫而过，该运行的程序还在后台默默运行。这一点会让LyX昏了头，LyX以为Sweave代码已经执行完毕，可以启动`pdflatex`编译了，但事实上tex文档压根儿就还没生成出来。因此我采用了`R -e`的方式，让LyX老老实实等待R运行结束再编译。
6. 本文的配置对部分客官来说简单，对不常用命令行的客官可能还有好几步路要走，比如把R的bin路径放到系统的PATH环境变量中，以及阅读CRAN上关于LyX+Sweave的配置等等，装LaTeX宏包fancyvrb等（Sweave.sty依赖于它，否则layout在LyX中显示unavailable，尽管Sweave.sty存在）。
