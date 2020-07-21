---
title: 料得少人知
date: '2019-08-10'
slug: secret-css
---

作为一名业余网站玩家，我的 CSS 知识有限，但偶尔学到一点冷门技能后，便会琢磨怎样把它以意想不到的方式使出来。这里举三个例子。第一个是我[前年捣鼓](https://cosx.org/2017/07/cos-new-site/)的统计之都网站样式，其中我最得意之处是顶部菜单的文字竖排：

[![统计之都网站横幅和菜单](https://user-images.githubusercontent.com/163582/62817358-ce76e700-bafa-11e9-87e0-9a4724ff2d62.png)](https://cosx.org)

统计之都的大图标太宽，单独放一行的话太浪费空间。竖线中的竖排文字既能很好地利用右边的大量空白区域，又有中文的古风美感。这种排列和布局在中文网站里似乎不太常见，但其实核心 CSS 非常简单，就是设定每一个菜单项的宽度为一字宽，然后断字方式为每个字后面都折断：

```css
li {
  width: 1em;
  word-break: break-all;
}
```

第二个例子是 bookdown 网站的书籍列表页面。每一张书卡形如：

[![bookdown 网站的书籍卡片](https://user-images.githubusercontent.com/163582/62817371-1f86db00-bafb-11e9-85b8-a7fce0644cf6.png)](https://bookdown.org/home/archive/)

每本书都有不同高度的背景色填充。自打去年我把这个网站捣鼓出来至今，还没有人问过我这些卡片的背景色有没有特殊意义。既然没人问，我只能自言自语交待了：背景色的高度大致指示了一本书的字数。比如背景色填充到顶的那些书的篇福通常比较长，而空白区域大的书通常只是个框架，可能没必要点开读。这里的渐变背景色用了一个 CSS 属性，形如：

```css
section {
  background: linear-gradient(to top, #75aadb, white 34.4%);
}
```

其中 34.4% 这样的数字是我用 R 爬书籍信息时预先计算出来的字数分位数。

第三个例子是去年年底我在 pagedown 中徒手设计一张 HTML 网页版海报时，想在每个标题下面加一条中间粗、两头尖的横线，形如：

[![HTML 海报](https://user-images.githubusercontent.com/163582/62817719-cfab1280-bb00-11e9-8630-716d95d3c35e.png#border)](https://pagedown.rbind.io/poster-jacobs/)

这个样式是我从 LaTeX 版的海报中看到的。我不想用图片的形式插入这条线（一来图片体积通常得上千字节，二来图片是外部依赖），所以琢磨了一下 CSS，最终想到一个办法，就是对一条矩形的粗水平线应用一个椭圆蒙版。这条线实质上是一个狭长的椭圆，它也是整张海报中我最得意的手笔。

```css
hr {
  border: 6px solid gray;
  clip-path: ellipse(50% 3px at center);
}
```

所以不会用 PhotoShop 之类的制图工具也未尝就是坏事，我们可以琢磨如何把手里有限的 CSS 牌打好。看似高级的视觉效果，背后 CSS 代码也就一两行。一般清意味，料得少人知。
