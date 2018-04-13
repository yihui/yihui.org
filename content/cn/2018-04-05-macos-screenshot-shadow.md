---
title: 去掉苹果系统截图里的窗口阴影
date: '2018-04-05'
slug: macos-screenshot-shadow
---

自打我 2015 年开始正式用苹果电脑以来，我就一直有一个困扰，就是所有窗口边缘都有阴影。平时自己用用也就罢了，每当到了写教程、写书需要屏幕截图的时候，我心里就有阴影了，我实在不想要这个窗口阴影特效。最近实在忍不了，就放狗搜了一下，发现了一个[部分解决方案](http://osxdaily.com/2011/05/23/disable-shadow-screen-shots-mac/)：

```sh
defaults write com.apple.screencapture disable-shadow -bool true
```

然后顺便发现一个我以前从没注意到的截图方法，也是我一直想找的，就是如何截取当前窗口。在 Windows 年代我知道怎么做，但 macOS 下从没研究过。今天才发现 Cmd + Shift + 4 之后按空格即可。我用的外置键盘，上面有截图键（PrtSc），所以是 Ctrl + PrtSc 然后空格。这下再也不用小心翼翼用鼠标拖拖拖。

之所以说上面的阴影解决方案是部分方案，是因为它只对独立窗口有效，对 RStudio 里的子窗口无效。不过这是 RStudio 的锅，因为 RStudio 整个界面实质上是一个网页浏览器，它弹出来的所谓子窗口都是假窗口，实质上只是一些 `<iframe>` 之类的 HTML 元素，并非系统窗口，而整个 RStudio 是个系统窗口。如果要截 RStudio 子窗口的图，仍然需要鼠标拖框，仔细选择区域，还是很烦人。
