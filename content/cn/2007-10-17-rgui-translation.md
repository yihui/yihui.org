---
title: 翻译R的菜单和消息
date: '2007-10-17'
slug: rgui-translation
---

因为R Translation Teams中文组的负责人Fei Chen在国外呆的时间太久，导致中文用得不太好，因此我想花点时间把R的中文菜单和消息重新翻译一下。过去那些版本的翻译确实有点看不过去，比如菜单"View"只翻译为一个字“看”，显然这是不合适的。

编辑工具很简单，从<http://developer.r-project.org/Translations.html>看了一下，Linux下用gettext，Windows用户可以用poEdit；先把R的源代码下载下来，里面有一个po文件夹，放的就是一些各种语言的翻译，当然zh\_CN的就是简体中文了。用poEdit打开，修改之后保存，默认就编译生成`*.mo`文件了，复制到`R-*.*.*/share/locale/zh_CN`下面，则万事大吉了。

[Ripley](http://www.stats.ox.ac.uk/~ripley/)那边已经打好招呼了，没准儿几个月后R发布下一个版本时，谢某的拙作就可以呈现给R中文用户了。吼吼。

