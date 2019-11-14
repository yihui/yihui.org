---
title: 关于网页的小笔记：Firefox、IE和JavaScript
date: '2007-10-10'
slug: notes-on-firefox-ie-and-javascript
---

昨天半夜被一个JavaScript的问题迷惑了好一阵子，然后才反应过来，这又是IE和Firefox的差别。主要问题是，Firefox对`document.all["id"]`这种获取页面内元素的方式并不太支持，而最好通过`document.getElementById("id")`这种更严格的方式来引用页面内的对象；对于IE而言，两种方式都可以。

之所以涉及到这个问题是因为我想在HTML页面中直接实现动画展示，省得还要费尽苦心去研究GIF文件格式然后读写GIF文件以便生成GIF动画文件，通过JavaScript的方式生成动画比研究GIF要容易多了，只需要调用Java脚本改变一幅图的src属性就足够了，然后用一个循环让图像“动”起来。示例参见：<https://r.yihui.org/misc/java.htm>页面底部（点击按钮观看布朗运动）

