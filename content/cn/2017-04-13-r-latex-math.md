---
title: 是莽撞人就来单挑：用 R 语法简化数学公式？
date: '2017-04-13'
slug: r-latex-math
---

客官 Chen Yu [留言](/cn/2017/03/unix-philosophy/#comment-3250395275)问 LaTeX 数学公式能否从 LaTeX 里解放出来。这是一个贼好的问题。要不是他提醒，我都已经快忘了 R 里面的神器 `demo(plotmath)`，好久没在 R 图形里面写数学公式了。

我提到了 [AsciiMath](http://asciimath.org) 项目，它取了一个数学公式的子集，大大简化了语法，比如跟公式体积匹配的大括号 `\left( \right)` 不需要敲那么一大坨反斜杠和命令，用普通的括号 `()` 就可以了，这很有道理，请问谁写括号的时候会写成下面这个狗德行呢？

`$$\sum_{i=1}^n i^3=(\frac{n(n+1)}{2})^2$$`

当你敲这样的公式时，你几乎一定以及肯定是想输出成这样的：

`$$\sum_{i=1}^n i^3=\left(\frac{n(n+1)}{2}\right)^2$$`

所以，让用户简化一下输入，背后的程序保守一点对括号全都用上 `\left` 和 `\right` 命令，多数情况下应该也错不到哪儿去。

我应该重复过多遍了，LaTeX 的输出之漂亮无人能及，但 LaTeX 的语法之丑陋也是无人能及。CY 大人举了个例子，比如这个公式放眼望去是什么鬼：`\rho _{X,Y}={\frac {\operatorname {E} [XY]-\operatorname {E} [X]\operatorname {E} [Y]}{{\sqrt {\operatorname {E} [X^{2}]-\operatorname {[} {E}[X]]^{2}}}~{\sqrt {\operatorname {E} [Y^{2}]-\operatorname {[} {E}[Y]]^{2}}}}}`。

既然我们可以把 LaTeX 的大锅甩掉，背着 Markdown 盆轻装前进，那数学公式的锅是不是一样可以甩呢？CY 大人提到 R 里面的 `plotmath`，这朵奇葩^[不要误会，本文里的奇葩一律取褒义。]可能知道的人不太多，在 R 里面敲 `demo(plotmath)` 就知道了，R 的作图系统提供了一个相当冷僻的功能，它用 R 语法重新发明了很多 LaTeX 数学公式语法，比如 R 代码 `sqrt(x)` 可以被翻译为 `$\sqrt{x}$`、`x %+-% y` 出来是 `$x \pm y$`、`sum(x[i], i = 1, n)` 出来是 `$\sum_{i=1}^nx_i$`。这样，你可以用 R 的语法写 LaTeX 公式，而不必受 LaTeX 反斜杠的折磨。

目前这个冷僻功能只在作图系统中存在，不能被挖出来真的当做 LaTeX 公式的输入和翻译工具，但 R 的奇葩设计让它可以在语言操纵上有特异功能，比如把原生 R 语法直接翻译为 SQL 语句字符串。其实 Hadley 在 Advanced R 书中有一节讲[具体领域语言](http://adv-r.had.co.nz/dsl.html)（Domain-specific Language）已经对数学公式开了个头，虚左以待人来搬砖。

好了，莽撞人，我只能帮你到这儿了。我在 Github 上等你的 R 包。要是足够成功，我可以考虑在 knitr 中加入一个新的语法，比如行内代码语法 `` `tex ` `` （类似 `` `r ` ``）专门支持这个数学公式翻译功能。目测这个项目可以为全人类每年节省几亿小时的敲公式时间，保护成千上万人的左手小指和键盘 Shift 键。
