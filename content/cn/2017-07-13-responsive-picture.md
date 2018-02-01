---
title: 响应式图片的浏览器原生支持
date: '2017-07-13'
slug: responsive-picture
---

对普通青年来说，响应式的网页设计就是在 CSS 里加一个 `@media` 规则，规定在多大尺寸下元素用什么样式。例如：

```css
/* 普通样式 */
元素 {
  如此这般;
}
/* 页面最大宽度为 320像素时的样式 */
@media (max-width: 320px) {
  元素 {
    这般如此;
  }
}
```

对图片来说，其实有更便利的办法。只要你不是那种用微软 IE 浏览器拖全人类后腿的人，你可以用一个新标签 `<picture>` 结合 `<source>` 标签，指定在不同页面尺寸和硬件设备支持下用不同的图片。具体可参见 HTML5 Rocks 上的[这篇文章](https://www.html5rocks.com/en/tutorials/responsive/picture-element/)。要看你的浏览器是否支持响应式图片，可以测试一下[这个页面](https://googlechrome.github.io/samples/picture-element/)上的猫：把浏览器页面逐渐收窄，就可以看见猫在屏幕很宽的时候是躺着的，屏幕窄到一定程度会起来蹲着，更窄的时候会蜷起来。

新版的[统计之都网站](https://cosx.org)主题中，我便是用了这个功能。
