---
title: I Hate Microsoft Internet Explorer!
date: '2007-10-13'
slug: i-hate-microsoft-internet-explorer
---

NND，花了我六七个小时的时间，就为一个缓存问题，换了四五种方法（JavaScript、CSS方法都用过了），但在IE中始终解决不了。

为了让动画在网页中显示地更流畅，必须要先将动画的所有帧预先下载下来，否则等开始显示动画的时候就很可能会卡。Firefox可以顺利地将图片先放在缓存中随时供调用，而IE这个笨蛋在每次调用图片的时候都要**重新下载**，这样的话根本没办法流畅显示动画。

具体例子可以参见：<https://r.yihui.org/misc/java.htm>（最底端，点“Begin”开始，可以调整动画速度）

各位也不妨用不同的浏览器帮我测试一下，谢谢。也没准儿是我个人IE的问题……

