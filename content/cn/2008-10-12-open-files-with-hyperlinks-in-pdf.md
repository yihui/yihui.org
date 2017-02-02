---
title: 利用超级链接直接打开文件
date: '2008-10-12'
slug: open-files-with-hyperlinks-in-pdf
---

我一直在想，怎样在文档中建立一个超级链接，只要点击就可以打开链接的文件。在Office中基本没什么障碍，但用LaTeX就不能直接通过链接文件地址达到目的了。今天Michael Friendly在邮件中告诉我一个小技巧：只要超级链接的地址前加上`run:`就可以了。例如，用`hyperref`宏包的`href`命令创建一个链接打开一个文件`some.file`就可以用`\href{run:path/to/some.file}{some link}`。

这样的话，我们就可以直接在PDF中点击链接打开文件，而不必先切换界面再去点文件了。其实`run`跟`http`、`ftp`等一样，都是协议。
