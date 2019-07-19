---
title: 咱跑这么快终于被 Karl Berry 发现了
date: '2019-02-28'
slug: karl-berry
---

去年我说在 LaTeX 问题上[咱跑这么快咱直接拿个锤子砸了直接拿跑就是了](/cn/2018/01/brutal-force/)。当时李阿玲大侠提了一个我本来不认识的名字：Karl Berry。时光荏苒岁月穿梭，到了今年，突然有个自称来自 TeX Live 团队的 Karl 在我的 tinytex 库下[留言问了个问题](https://github.com/yihui/tinytex/issues/77#issuecomment-466584510)。我看这姓名怎么有点眼熟，跑到 TeX Live 主页上扒了一下，哦，原来是带头大哥之一啊。大驾光临，有失远迎。

我不知道他是怎么扒拉到我这个角落里来了。事情本来是这样，去年十月份的时候我费了牛鼻子劲在一堆我看不懂的 Perl 代码里找到了一个奇怪的代码缺陷，它导致 tlmgr 无法在 Docker 里安装或卸载 LaTeX 包。因为构造一个可重现的环境需要用到 Docker，所以我想了想还是没向官方团队报告这个问题，只是用最暗黑的 `sed` 把那句有问题的代码从 Perl 源代码中强行删掉了。这显然不应该是正规解决问题的办法，但限于我的时间和能力，我也只能走这一步了。

然后 Karl 发现了这个暗黑修正，问我为啥要这么整。我说我也不知道详细原因，总之我发现这里的 `die()` 是误报。他回去琢磨了一下，发现还真是。我长舒一口气，没想到我瞎比划的乱拳还真打到了老师傅。

老师傅请我给 TUGboat 写篇文章介绍一下 TinyTeX，还说这是 *nix 系统上他唯一知道的能自动安装缺失 LaTeX 包的 LaTeX 发行版（我有点不太相信，难道号称跨平台的 MiKTeX 在 *nix 上不能自动安装吗）。嘿嘿嘿嘿，过奖过奖。我这就给您写文章，只不过我不写纯 LaTeX 已经好几年，反斜杠已经打不利索，所以还是[用 Markdown 写吧](https://github.com/yihui/tinytex/tree/master/TUGboat)。

这个跑这么快的故事跑了一年到此算是[落幕了](http://tug.org/TUGboat/Contents/contents40-1.html)。
