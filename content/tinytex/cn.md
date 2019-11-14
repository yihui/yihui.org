---
title: TinyTeX 中文文档
date: '2017-12-03'
---

TinyTeX 是一个瘦身版的 [TeX Live](https://tug.org/texlive/)。TeX Live 的庞大体型问题[困扰我多年](/cn/2017/06/lightweight-texlive/)，在 2018 年之前我终于抽出一周时间来解决这个问题，其实方案很简单：把对普通用户毫无用处的源代码和文档去掉即可。具体技术细节参见[常见问题](/tinytex/faq/)，总体而言就是利用了 TeX Live 的自动化安装方式，配置文件中设置不要安装源文件和文档。

TinyTeX 假设你不惧怕或反感使用命令行，但其实需要的命令行指令并不复杂，常见任务都可以通过一行命令搞定。如果不清楚如何打开系统命令行窗口，请参见常见问题。

## 安装

TinyTeX 的安装和维护对 R 用户来说最简单，两行 R 代码加上两到六分钟的等待时间：

```r
devtools::install_github('yihui/tinytex')
tinytex::install_tinytex()
```

安装 TinyTeX 之前建议卸载系统中已有的 LaTeX 套件，如 TeX Live、MiKTeX、MacTeX 等。一个系统中最好不要有两个 LaTeX 套件同时存在，否则可能会产生冲突。

对其它用户，请参阅[首页](/tinytex/)上的脚本安装方式，通常就是打开命令行窗口，运行一行命令即可。该命令会自动下载 TeX Live 的安装脚本并自动安装，由于是从网络下载安装 TeX Live，所以具体等待时间取决于网速。Unix 系统应该不会超过两分钟，Windows 系统可能需要五分钟左右（其间可能会弹出两次[错误对话框](https://db.yihui.org/images/install-tl-win-lua.png)，点确定即可；如果杀毒软件弹出警告，请允许修改）。

## 维护

TinyTeX 的主要维护工作应该是安装 LaTeX 包以及更新。如果编译 PDF 时出现缺失 LaTeX 包的错误信息，可以用命令行 `tlmgr search` 根据缺失文件名搜索包名，并用 `tlmgr install` 安装缺失的包；命令 `tlmgr update --self --all` 可以更新整个 TeX Live 系统。R 用户可以使用 [R 包 **tinytex**](/tinytex/r/) 中的相应函数，如：

```r
library(tinytex)
tlmgr_search('framed.sty')  # 搜索包含 framed.sty 文件的 LaTeX 包
tlmgr_install('framed')     # 安装 framed 包
tlmgr_update()              # 更新 TeX Live
```

在 **tinytex** 包中还有一系列函数用来编译 LaTeX 文档，核心函数是 `latexmk()`，它主要是为了模拟 LaTeX 工具 `latexmk`，即：重要的 LaTeX 文档默认编三遍。如果你不懂这句话，那么恭喜你，不懂更好，不要在它上面浪费时间。还有另一个非常有用的功能，就是模拟 Windows 上 MiKTeX（当然现在 MikTeX 似乎并不局限于 Windows 了）：编译 LaTeX 文档过程中默认自动检测并安装缺失的 LaTeX 包。能自动化的都自动化，不必费劲去跑 `tlmgr search` 或 `tlmgr install` 之类的命令。

具体调用时，你可能会根据你需要的 LaTeX 引擎使用 **tinytex** 中的这三个函数之一： `pdflatex()`、`xelatex()`、`lualatex()`。看函数名应该就知道各自分别使用哪个 LaTeX 引擎。

## R Markdown 用户

**rmarkdown** 包从版本 1.9 开始，编译 R Markdown 为 PDF 时会调用 **tinytex**，这样一来，R Markdown 用户的 LaTeX 世界应该就安静了：因为对 R Markdown 用户来说，编译 PDF 的头号出错可能就是缺失 LaTeX 包（Pandoc 翻译 Markdown 为 LaTeX 代码时，几乎不太可能产生 LaTeX 语法错误），而可怜的 R 用户哪能明白那错误消息是什么意思。

## 结语

时间有限，中文文档只能写这么长；若有疑问，请参考首页以及常见问题。

LaTeX 排版很美丽，但它常让我们忘了自己的身份特么到底是作者还是排版工人；它就像一个永远长不大的孩子，没日没夜呼唤你的注意（唉哟，人家找不到 `framed.sty` 文件啦；哎呀，人家没法编出参考文献列表啦，请你看看你的 `.aux` 文件好不）。但愿这个 TinyTeX 套件以及 R 包 **tinytex** 能让它消停会儿。
