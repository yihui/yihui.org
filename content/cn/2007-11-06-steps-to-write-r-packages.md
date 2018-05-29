---
title: 编写R程序包的基本步骤和注意事项[简略版]
date: '2007-11-06'
slug: steps-to-write-r-packages
---

> 本文已经过期，请参考统计之都上的最新文章：[开发R程序包之忍者篇](https://cosx.org/2011/05/write-r-packages-like-a-ninja/)。

这两天在忙着写一个R程序包“`animation`”，因此被迫得学习R包的基本写法，粗略看了看"Writing R Extensions"这本Manual，现提供大致步骤如下：

1. 系统准备工作：对于Linux系统来说就基本没什么需要准备的了，但Windows用户必须首先安装一系列的“[Windows Toolset](http://www.murdoch-sutherland.com/Rtools/)”，详细情况参见"R Installation and Administration"的Appendix E；其中[Rtools](http://www.murdoch-sutherland.com/Rtools/Rtools.exe)是必须的，但是为了能顺利编译LaTeX文档（帮助文件以及Vignette等），系统最好也装上[MikTeX](http://www.miktex.org/)。安装这些软件的时候尽量按照默认目录安装，否则你必须明白“环境变量”是什么意思（主要是其中的PATH）。安装完成之后可以打开一个Command窗口（开始-->运行：`cmd`）测试一下，例如Linux下的命令`ls`等能否在Windows的Command窗口（类似Linux的“终端”）正常运行，`ls`命令类似Windows的`dir`命令；关于LaTeX，可以用`latex -help`测试是否可以正常运行。
2. 装好软件之后如果上面的测试命令无法正常运行，那就得检查环境变量的PATH中是否包含相应的路径（有一些路径是在安装Rtools之后就会被自动添加的）。“我的电脑”-->“属性”-->“高级”-->“环境变量”-->“系统变量”-->PATH，这个里面应该包含诸如`c:\Rtools\bin; c:\Rtools\perl\bin; c:\Rtools\MinGW\bin;` 等一系列路径；为了`R CMD INSTALL`等命令能正常运行，`C:\Program Files\R\bin` 这样的路径也是应该包含在这里（取决于R安装在什么位置，这里是我安装的位置）。到这里基本的准备工作就够了。
3. R自身提供了一个构建包的框架的函数：`package.skeleton()`；这个函数对于写包来说非常方便，因为它会自动帮你把包的架子搭好，你要做的工作只是：写函数的源程序（*.R）和帮助文档（*.Rd）；函数用法参见我这篇Blog“[用R编写自己的Package](/cn/2007/09/writing-r-packages/)”，主要是参考R帮助，自己看吧。需要注意的是path参数，否则构造了一个框架自己都找不着放到哪儿去了（如果不指定path参数，那么构造的框架放在`getwd()`下面）。打包的函数会把你的functions放在R文件夹下，把data（如数据框）放在data文件夹下。
4. 包中的函数怎么写我就不说了。写好一系列函数（可能还有数据）之后，用`package.skeleton()`搭好架子，就可以在该文件夹下面开始修改、补充包的详细内容了。（1）DESCRIPTION文件，里面是关于你这个包的基本说明，包括版本、作者、版权、维护者、相关包等，里面需要看文档的可能只是Depends, Imports, Suggests, Enhances等那几项，稍有点费脑子；（2）帮助文档，这个在man文件夹下面，以Rd作为扩展名（R documentation），刚才的`package.skeleton()`函数已经把基本的项目都自动生成好了，我们需要把相应的内容填上，比如函数说明、参数说明、详细说明、返回值、示例、关键词（在R提供的关键词中选择）等。这些文本里面可以用链接\link{}、字体修饰\emph{} \code{}等，具体参见R-exts文档。
5. 修改好了之后就可以开始编译了；打开一个Command窗口，`cd`到你的包源文件所在的文件夹，比如你的包写在`C:\pkg`这里，那么就`cd C:\`，然后用`R CMD`系列命令，如检查包是否有错误：`R CMD check pkg`；编译包：`R CMD build pkg`（需要编译为binary的话就加上相应选项`--binary`）；安装包：`R CMD install pkg`；如果你的包有任何错误，在check的时候会给出提示。

这样一个R包就基本上完成了，build出来的`*.tar.gz`（或者binary形式的`*.zip`）就可以交给别人使用了（前提是check完全通过）。进一步可以为你的包写vignette，也就是PDF说明文档，类似一篇文章的形式。如果要写vignette的话，最好会用Sweave，这在R-exts中有相应的介绍，总体说来它的大致用途就是把LaTeX文档和R code结合起来，你可以在LaTeX文档中仅仅放R code，不必把code的输出（文本或者图形）事先准备好，Sweave文档在编译的时候会自动执行你的R代码生成相应的输出并插入到LaTeX文档中，这实在是太方便了——动态生成报告。Vignette文档（`*.Rnw`）放在包的`inst/doc`目录下，在build包的时候这个文档会被自动编译生成PDF（实际上是转换给LaTeX编译的），安装包的时候这个文档会被装到doc目录下。关于Sweave的用法也可以参见COS论坛上这篇帖子：<https://cosx.org/cn/topic/8434>，momozilla对Emacs、ESS和Sweave比较熟悉，可以向他请教。

编写包的过程中不妨参考一下别人的源文件，看大概是怎么写的。

注意事项：

1. 写代码的时候不要把TRUE/FALSE简写为T/F，虽然它们基本是等价的，但是这样写的话在编包的时候会给出警告和错误信息！我费了半天心思才琢磨明白这一点。
2. 注意LaTeX语法，在写帮助文件的时候有些符号如下划线_是不能直接用的，因为LaTeX语法要求这样的字符必须由\引导。如果Rd文件不符合LaTeX语法，build的时候也会报错。之所以提到下划线，是因为`package.skeleton()`生成的**数据文件**的Rd文件中包含下划线（不知道是否应该给R Core写邮件说明一下），这些下划线应该删掉。

