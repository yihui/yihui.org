---
title: 关于网页的小笔记：Firefox和IE、fieldset标签
date: '2007-09-06'
slug: notes-on-firefox-ie-and-fieldset
---

做网页时比较头疼的事情之一就是要不停地考虑兼容问题：一方面考虑不同的分辨率下的效果（1024 x 768、1280 x 1024等），另一方面就是浏览器的兼容（Internet Exporer、Mozilla Firefox等）。在我做网站的初期，我比较重视前者，因此做网页时经常换分辨率，那时候还特别重视800 x 600的分辨率，如今觉得这种小显示器可能已经只是少数了吧，因此还是以1024 x 768为中心设计网页的宽度（980px左右），保证在1024 x 768下面把屏幕基本填满，而在1280 x 1024下面看着也不觉得太窄就行；后来开始用Firefox时，发现IE和Firefox对HTML的解析有很多区别，因此开始琢磨浏览器的兼容问题。

昨天花了好半天时间把这个Blog的模板自己重新改写了一遍，这个过程中曾经对层（div）的对齐问题恼火了一阵子，因为设置body的文本对齐为居中之后，里面的div在Firefox下死活都不肯居中对齐，后来才明白，必须得设置div的左右边距为`auto`才行。总体感觉Firefox对HTML的解析还是好一些，比如本页右边的那些方框中的列表项我都设置了强制不换行（`white-space: nowrap;`）、隐藏多余的部分（`overflow: hidden;`），可是当鼠标移上去的时候，IE就会把多余的部分又给显示出来，而Firefox就不会。这一点我想了半天都没找出好办法解决，于是就那样扔着吧，不管了。

其实这次改模板的主要目的是想应用`<fieldset>`和`<legend>`这两个标签，顺便把灰色的背景改为白色、把引用`<blockquote>`和代码`<pre>`的样式重新设置一下。一段时间之前我曾经看到过一个叫[Planet PHP](http://www.planet-php.net/)的国外Blog站，当时特别喜欢它那种像Visual Basic里面Frame控件的格式，也就是这样的：

<fieldset style="padding: .5em; border: 1px solid red;"><legend>Here is the title</legend>The FIELDSET element defines a _form control group_. By grouping related form controls, authors can divide a form into smaller, more manageable parts, improving the usability disaster that can strike when confronting users with too many form controls. The grouping provided by FIELDSET also helps the accessibility of forms to those using aural browsers by allowing these users to more easily orient themselves when filling in a large form.</fieldset>

因此看了看它的网页源码，发现用的是`<fieldset>`和`<legend>`标签，本来之前觉得挺神奇，还以为是用CSS+表格作出来的，看了源码才知道原来这么简单。于是乎，我这个Blog页面也就改造成这样了。

关于引用和代码的样式，其中“引用”采用了一个“引号”的图片作为背景放在左上位置，而“代码”采用了上下两条水平虚线作为分界标志，这两种样式的字号都缩小为11px，不过在IE下面看不出11px和12px汉字的区别，但在Firefox下英汉的11px字号都确实被缩小了。

