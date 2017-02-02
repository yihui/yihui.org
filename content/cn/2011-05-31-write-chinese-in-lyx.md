---
title: 在LyX中使用中文
date: '2011-05-31'
slug: write-chinese-in-lyx
---

一个多月以前，我向LyX官方提交了三个基于ctex宏包的layout文件（见[#7495号“传票”](http://www.lyx.org/trac/ticket/7495)），分别用来写中文论文、书籍和报告，熟悉ctex的一看就明白这是什么意思。这些新的layout将在2.0.1中被收录，顺利的话，六月份（可能是下旬）会发布出来。到时候，只要你的LaTeX中安装了ctex宏包，LyX文档设置中就会出现三个类：

- article (CTeX)
- book (CTeX)
- report (CTeX)

如果你用模板新建文档（Ctrl+Shift+N），那么将会看到一个模板文件：
	
- ctex.lyx

用模板的好处在于可以省去一些繁琐设置，对中文文档来说，这些设置包括：

- UTF8编码（推荐），包括Class Options中的Custom一栏填入UTF8（这个选项将传送给ctex宏包），另外，还要把语言修改为简体中文，语言的编码设置为`XeTeX (utf8)`
- 如果用Adobe中文字体并且用pdflatex编译，那么上面的Custom一栏还需要填入`,adobefonts`，此处不解释，我假设你熟悉ctex宏包；否则要用XeTeX字体并用XeTeX编译
- 语言包的设置最好清空（设置为Custom，填入`%`），据我所知，LyX采用的babel宏包对中文文档完全是累赘（多出来一些`\selectlanguage{}`的命令，很讨厌）
- 导言区可能需要加入 `\DeclareRobustCommand\nobreakspace{\leavevmode\nobreak\ }`，我不知道这是谁的bug

最重要的是第一项设置，就是编码，如果出错，再看后面三项。

如果你等不及LyX 2.0.1的发布，也可以直接在导言区调用（此时文档类仍然用普通的article）：

```tex
\usepackage{ctexcap}
```

或者如果你用Linux并且不需要使用ctex的字体配置，那么可以用（但此时你要么用XeTeX字体，要么用adoblefonts选项并且安装相关Adobe中文字体）：

```tex
\usepackage[nofonts]{ctexcap}
```

这和使用上面提到的layout的途径几乎没有差别。

本文假设你对ctex和LaTeX熟悉，如果不熟，务必啃ctex的文档（有PDF）和LaTeX入门手册（那份所谓的不太简短的什么什么手册，也是我的入门材料）。

