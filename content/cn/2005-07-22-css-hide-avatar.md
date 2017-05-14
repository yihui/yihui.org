---
title: CSS的应用——去除日志评论中的头像
date: '2005-07-22'
slug: css-hide-avatar
---

很简单，只是把这段代码添加到单篇文章的CSS中就搞定了。

```css
div.operation img{
  display:none;
}
```

这是利用了CSS样式继承的特点。由于评论前面的头像是处于层div（operation样式）中，于是img标签设置为不显示（display:none;）那么就可以把评论中的所有图片都隐藏了。现在的页面，没了手拉手，没了一大块一大块的头像，真是干净多了……
