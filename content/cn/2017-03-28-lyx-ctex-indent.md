---
title: LyX 下的 ctex.lyx 模板中摘要下方首行缩进的问题
date: '2017-03-28'
slug: lyx-ctex-indent
---

有细心的同学来信问：在你的 LyX 中文模板里，摘要下面第一个段落没有缩进是怎么回事？后面所有段落都有缩进两字符。

![段落没有缩进](https://db.yihui.org/images/lyx-ctex-indent-1.png)

嗯，我就喜欢这种眼神凌厉的客官。碰到 LyX 里的任何问题第一件事是看源代码到底怎么了^[这也是为什么我一直强调没有熟练掌握 LaTeX 前不要用 LyX 的原因。]。用菜单 `View -> Source Pane` 可以发现那个“下面开始正文”的段落前少了一个空白行，所以它可能是一个假的段落：

```tex
\begin{abstract}

这里是摘要内容。

\end{abstract}
下面开始正文。
```

然而 LyX 很傲娇以及有严重洁癖，空白行不是你想加，想加就能加。如果一行上没有内容，LyX 会把这一行删掉，所以不能简单地在“下面开始正文”之前敲回车，敲了回车也会给你去掉。一向不缺黑招的我，想了个办法，就是先插入一个幽灵符^[LaTeX专用术语，`\phantom{}` 命令的作用是按照它的参数的本来体积提供一块空白占位，读者不会看到参数的内容，所以就像一个隐形的幽灵藏在输出文档中。本文中没有提供任何参数，所以并没有用到 `\phantom{}` 的真正用途，纯属为了欺骗 LyX。]，然后在幽灵符后面敲回车，这样就可以产生新段落了：

![插入幽灵符](https://db.yihui.org/images/lyx-ctex-indent-2.png)

这样出来的 LaTeX 代码是：

```tex
\begin{abstract}
这里是摘要内容。
\end{abstract}
\phantom{}

下面开始正文。
```

![段落成功缩进](https://db.yihui.org/images/lyx-ctex-indent-3.png)

问题解决。
