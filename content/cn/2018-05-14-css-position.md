---
title: CSS 的位置属性以及如何居中对齐超宽元素
date: '2018-05-14'
slug: css-position
---

CSS 中的位置（position）属性可能是我[查阅文档](https://www.w3schools.com/css/css_positioning.asp)次数最多的一个属性，总记不住各种取值的含义。在我第五百次查文档之后，决定还是记个笔记，毕竟好记性不如烂键盘。

- `static`：没有特殊含义，该怎么放怎么放。它是默认值。

- `relative`：相对该元素本身应该在的位置，可以通过上下左右距离属性相对移动这个元素。

- `fixed`：在当前窗口的固定位置，不随页面滚动而移动。

- `absolute`：相对父元素的位置（可设置上下左右距离属性），父元素必须也有非默认的位置属性。

- `sticky`：元素在被滚出当前视图时，自动漂移出来，保持始终可见状态。如果没滚出视图，那么该在哪儿在哪儿。

数年来我一直有一个疑问，但没真正花精力去研究，就是如何居中对齐一幅超宽的图片或其它超宽的元素。用普通居中手段（`text-align: center;` 或 `display: block; margin: auto;`）是不行的，因为元素一旦超宽，默认情况下会是左边对齐，右边超出去，这样的元素无法在页面中居中对齐。前几天随意翻到一个叫 Kiera 的 Hugo 主题，发现里面[支持全宽图片](https://avianto.github.io/hugo-kiera/posts/image-content/)。于是我看了一眼它的 CSS，发现它是如此这般定义的：

```css
.full-image, figure.full img, img[src*="full"] {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}
```

拿起笔在纸上画了两个盒子之后明白了是怎么回事：总宽度为视窗宽度（100vw），先右移父元素一半的宽度（50%），此时它的左边线正好在页面正中，然后再左移视窗一半的宽度（-50vw），也就使得左边线正好靠视窗左边，于是这个元素便占满窗口。两个属性 `right` 和 `margin-right` 的定义有些冗余。

再一思索，觉得他把这事弄得过于复杂了，如果借助 `calc()` 函数（[鬼才会在乎 IE 10 以及更低版本的 IE 呢](https://caniuse.com/#feat=calc)），两行 CSS 就能搞定：

```css
.full-image, figure.full img, img[src*="full"] {
  width: 100vw;
  margin-left: calc(50% - 50vw);
}
```

这里不需要定义位置属性，因为 `margin-left` 对任意位置属性的元素都适用。

全宽元素是一个特例，因为我们已知元素宽度等于页面宽度，所以左右移动距离都容易算出来。那么任意宽度（尤其是超宽）的元素的居中对齐呢？这就必须知道元素自身的宽度了：向右移动父元素的一半宽度距离，再向左移动自身一半的宽度，它便居中了。CSS 单位中通常百分比都表示父元素的大小，但有一个特例是 `transform` 属性，它里面的百分比是元素自身大小的百分比。于是以下便是我[找了很久的答案](https://stackoverflow.com/a/41059954/559676)：

```css
img {
  margin-left: 50%;
  transform: translateX(-50%);
}
```

回到前面的 Kiera 主题，它里面让我更加眼前一亮的是 `img[src*="full"]` 这部分，这个黑魔法实在是高；我以前知道 CSS 有这种查询技能，但从没想过可以这样玩。它给 Markdown 世界倒是添了一种非常实用的可能性：除了 Pandoc 之外，几乎没有哪种 Markdown 转换工具支持定义图片的类属性，所以也就无法根据不同图片自定义不同样式；但如果用 `src` 属性去匹配图片，那么就可以给特定网址的图片配特定的样式。真正的黑魔法在于，如果网址中含有锚点，它并不会影响图片的提取（锚点除了页面内定位之外一般没有特殊含义），比如下面两个网址提取的都是同一幅图，第二个网址中的锚点 `#full` 对图片而言并没有任何意义：

```
https://slides.yihui.org/gif/roll-away.gif
https://slides.yihui.org/gif/roll-away.gif#full
```

但如果定义了 `img[src*="#full"]` 的样式，那么它就只会被用到第二幅图上。相应地，用 Markdown 语法写出图片就是：

```md
![普通图片](https://slides.yihui.org/gif/roll-away.gif)
![全宽图片](https://slides.yihui.org/gif/roll-away.gif#full)
```

当然，对于万能的 Pandoc，我们可以不必如此曲线救国，直接定义一个类属性即可：

```md
![全宽图片](https://slides.yihui.org/gif/roll-away.gif){.full}
```

看，玩网页是不是其乐无穷。
