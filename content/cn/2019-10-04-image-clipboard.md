---
title: 是莽撞人就来单挑：从剪贴板读取图片并保存
date: '2019-10-04'
slug: image-clipboard
---

前两天在看一个[爆栈网帖子](https://stackoverflow.com/q/55541345/559676)的时候，稍微琢磨了一下如何从剪贴板读取图片。动机是这样：网页上的图片我们都可以点右键复制，然后可以粘贴到别的地方，如 Word 文档，或者在苹果系统的 Preview 应用中从剪贴板新建图片。问题是如此这般复制的图片无法直接粘贴到 R Markdown 文档中。也许[将来 RStudio 会支持](https://github.com/rstudio/rstudio/issues/4038)，那在编辑器支持它之前我们是否有办法先尝试实现它呢？根据我的研究，有两种可能的办法。

在说这两个办法之前，我先说一下我失败的尝试。我知道 R 支持从剪贴板读取数据，如 Windows / Linux 下可以直接 `readLines('clipboard')`，macOS 下可用管道 `pipe('pbpaste')` 访问剪贴板，这在帮助文档 `?file` 中有详细说明。问题只是，图片是二进制数据，而前面说的办法只能读纯文本数据，比如我们无法使用

```r
file('clipboard', mode = 'rb')
```

所以此路不通。Windows 下还有个特有的函数 `readClipboard()`，它可以读入二进制数据，问题只是那个数据如果保存为图片还是个谜，可能还得细究 Windows 文档，我可没那个耐心。两种绕弯的路分别是：

1. Windows 下可以通过 **magick** 包（也就是 ImageMagick 移植到 R 包的版本）的函数读取剪贴板的图片：`magick::image_read('clipboard:')`，有了图片数据之后就可以保存到文件了。Linux / macOS 下的 ImageMagick 不支持读取剪贴板，但可以通过外部工具 [`xclip` 将剪贴板中的图片保存为文件](https://unix.stackexchange.com/a/145134)。在 macOS 中可以简单通过 `brew install xclip` 安装它，Ubuntu 下也就是 `apt install xclip`，而且这个软件非常轻量级，所以这个依赖问题不大。问题只是它不够智能，需要先检测剪贴板数据格式（MIME 类型），然后再以指定格式保存文件，这个两步过程的第一步可以通过 `system2('xclip', ..., stdout = TRUE)` 完成（此处有个小坑）。MIME 类型确定后可以通过 R 包 **mime** 反查扩展名。

1. 另一种办法是[借用 HTML5 的 `paste` 事件和 `event.clipboardData` 获取图片数据](http://jsfiddle.net/viliusl/xq2aLj4b/5/)然后通过 Shiny 把数据读到 R 里面，在 R 里面通过 base64 解码，最后保存图片。这里的 Shiny 可以是一个 [RStudio 插件](https://rstudio.github.io/rstudioaddins/)形式的 [miniUI](https://cran.rstudio.com/package=miniUI) 界面。在 **blogdown** 包中有个 [Insert Image 插件](https://bookdown.org/yihui/blogdown/rstudio-ide.html)，如果前述实现能和这个插件捆绑，那就太完美了，因为用户既可以选择文件上传，也可以直接 `Ctrl + V` 粘贴图片到这个插件界面中。这条路我不确定是否走得通，主要是我没试过 RStudio 界面里是否支持粘贴事件和剪贴板数据。

只要上面有一条路能走通，剩下的事就是请用户指定一个图片路径，然后我们把剪贴板中的图片保存到这个路径下。这个也可以通过 RStudio 插件实现（类似一个对话框）。

费这么大劲，省下多少力气呢？我们分析一下两种最常见的应用场景：

1. 从网页复制图片。它节省不了多大工夫，因为网页上的图片点右键既可以复制，又可以直接另存为本地文件。我们上面绕这么大一圈似乎不值得。

1. 截屏到剪贴板。Windows 下用 `Alt + PrtScr`、macOS 下用 `Cmd + Shift + Ctrl + 4` 可将屏幕截图存到剪贴板，然后按上述办法保存为图片文件。如果不这么做，截屏其实也可以直接生成文件，唯一的麻烦就是要重命名并移动图片文件。

回到最初的那个爆栈网帖子。作者真正想节省的似乎是两件事：一是命名文件，二是往 R Markdown 文档中敲 `![](图片路径)` 的代码。前者他用了自动的文件命名，后者也是自动生成的，所以往文档中“粘贴”图片被简化成了一次插件点击。我们上面绕弯的办法相比起他的实现来说，优势在于去掉了 Python 依赖，但如果用方法一的话还要引进 xclip 的依赖，无论是 xclip 依赖还是 **magick** 依赖，都是比较容易安装的。

实际应用中，我个人一般不会用自动文件名，而是会倾向于手工指定一个[有意义的文件名](/cn/2017/07/naming/)，所以他感觉到的便利对我个人的用处可能并不大。所以这个莽撞人项目写出来就当是供路过的客官们练手了。结合 **magick** 包以及 Shiny 来搭界面玩的话，没准还可以搞出一个简单的 PhotoShop 来哦。
