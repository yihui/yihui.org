---
title: CSS 弹力盒子
date: '2017-07-12'
slug: css-flexbox
---

现代网页布局中，Flexbox 简直不能更方便。我经历了旧时代的 `float: left;` 和 `clear: both`，所以能深切体会 Flexbox 的便利。一旦碰了 float 属性，就像一脚踏进地狱，你会有擦不完的屁股。更别说什么响应式设计了。

![万劫不复](https://slides.yihui.org/gif/fountain.gif)

Flexbox 好像还没什么中文翻译，我索性译为超级弹力盒子好了，Q 可 Q，非常 Q。如果找它的资料，第一个应该会是 [CSS Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) 网站。我作为前端界的草履虫，平时捣鼓 CSS 基本就指着这个网站和[爆栈网](https://stackoverflow.com)活了，有时候也看看 W3CSchools，虽然它被很多仁波切吐槽。若要严肃认真，我也会看看 [MDN](https://developer.mozilla.org)。

最近两天因为给统计之都新网站设计主题，需要多栏排版，所以放狗搜到了这个页面 [Responsive Multi-Column Lists with Flexbox](https://www.fourkitchens.com/blog/article/responsive-multi-column-lists-flexbox/)，碰巧解决了我长久以来的关于格子布局的一个难题。我一直不知道如何让 N 个盒子（N >= 3）在同一行上等间距分布，并且第一个盒子贴左侧边，最后一个盒子贴右侧边，每两个盒子之间都留一定空白间距。简单设置每个盒子的左边距或右边距是不行的，因为那样会导致要么第一个盒子不贴边，要么最后一个盒子不贴边。这个页面告诉了我，把这些盒子的父元素向左移动 X 像素（比如 `margin-left: -10px`），然后每个盒子的左边距设置为 X 像素即可（比如 `margin-left: 10px`），这样第一个盒子正好贴左侧边。就这么简单。终于了却了豆腐块爱好者的一个夙愿。

这个页面也介绍了如何把弹力盒子和响应式设计结合起来，解释地非常好。 我的 [Hugo 杂志主题](https://github.com/yihui/hugo-xmag)的响应式设计就靠它做出来的。
