---
title: 用 R 创建网页服务器
date: '2018-09-27'
slug: r-web-server
---

在我写过的相对轻量级的 R 包当中，我最想展开说但又一直没空说的包是 [servr 包](https://github.com/yihui/servr)。这个包我自认为写得还算比较轻巧，代码抽象程度适中。昨天有人发邮件问我如何才能看懂这个包，我一时有些语塞，因为要彻底看懂它需要一些服务器方面的背景知识，比如我们常见的 404 页面中，404 究竟是什么意思。另一个基础知识是 [httpuv 包](https://github.com/rstudio/httpuv)，这也是一个很好玩并且很有用的基础包，它的诞生最初是为了给 [shiny 包](https://github.com/rstudio/shiny)服务的。说到这里，不免又要吐槽一番 R 核心团队那种办事总是缺最后临门一脚的风格，因为用 R 创建一个服务器在基础 R 包里早就实现了，只可惜他们没把这个接口开放出来，最终这么好玩的东西就只是为了单单一个 `help.start()` 函数使用，也就是打开网页版的 R 帮助文档，简直是暴殄天物^[又比如，`tools::md5sum()` 底层都写好了 C 代码，却偏偏把计算 MD5 码的功能限制在文件上；要是我能传给你一个字符串或原始码、请你跳过读文件这一步，那该多好，因为读写文件总是相对慢的操作。]。敝厂的首席技术官当年因为做 shiny 需要一个支持 WebSocket 和服务器功能的 R 包，刚开始他尝试了[别人写的一个包](https://github.com/rstudio/R-Websockets)，后来基本重写了一遍。当年 httpuv 和 shiny 的诞生是我头一次觉得有真本事的程序猿来蹚 R 的浑水了，改变了 R 是“统计学家为统计学家开发的软件”（by statistician, for statistician）的命运，即：终于有专业码农来为统计学家开发软件了。在这之前，你可以看看那些所谓的基于 R 的服务器产品都是何等的灰头土脸。当然，其中不乏聪明人，可惜伊太聪明（`help.start()` 的服务器就是他写的），不知道普通用户需要什么。这背景故事有点长，下面回正题。

我仍然没空把 servr 包的源代码解释一遍，但可以先给一个极简的例子。看懂了这个例子之后可以再看 servr 包中的 [`httd()` 函数](https://github.com/yihui/servr/blob/master/R/static.R)，它是创建一个本地服务器读取本地静态文件；看懂它之后再看 [`dynamic_site()` 函数](https://github.com/yihui/servr/blob/master/R/dynamic.R)，它是在静态服务器的基础上增加了 WebSocket 功能，有动态监听功能，让 R 和网页之间能有通讯。由于时间关系，我只解释一下极简例子。

创建一个网页服务器需要主机 IP、端口信息，然后要让 R 知道接收到网页端的请求之后该如何回应。这里的端口必须是系统中尚未被占用的端口，在 servr 包中我有一个函数 `random_port()` 来测出一个可用端口；下面的例子中我假设端口 `9102` 可用（如果碰巧不可用，请换别的端口）：

```r
httpuv::startServer('127.0.0.1', 9102, list(call = function(req) {
  list(
    status = 200L,
    headers = list('Content-Type' = 'text/plain'),
    body = paste(list.files(), collapse = '\n')
  )
}))
```

这样我们就创建了一个服务器，它要做的唯一一件事是把当前工作目录下的文件名列举出来。现在如果我们打开这个网址，就会看见一个文件名列表：

```r
browseURL('http://127.0.0.1:9102')
```

用 R 创建一个初级服务器就是这么简单。如果要深入了解服务器，那么就得知道更多细节了，最重要的有两个概念：请求和返回值。请求是上面的 `req` 对象，它里面包含了大量的信息，比如你可以根据请求的文件路径（`req$PATH_INFO`）给用户返回相应的页面信息。注意上面的例子里完全忽略了请求，所以不管你是打开 `127.0.0.1:9102` 还是 `127.0.0.1:9102/foo/bar.html`，返回的结果都完全一样。返回值则是那个处理完请求之后返回的三元素列表 `list(status = 状态码, headers = 头信息, body = 正文页面)`，浏览器收到这些信息之后会相应处理生成网页给用户看。学习服务器基本原理的最好搭档工具就是浏览器的开发者工具（Developer Tools），这一点我在 blogdown 书中的[附录 B](https://bookdown.org/yihui/blogdown/website-basics.html) 里略有提及（这里主要要看开发者工具的 Network 一栏）。

纯静态服务器搞清楚之后就可以玩 WebSocket 实现 R 与网页之间的通讯了。R 这边的服务器形如：

```r
httpuv::startServer('127.0.0.1', 9102, list(
  call = function(req) {
  
  },
  onWSOpen = function(ws) {
    ws$send(rnorm(1))  # 朝网页那边发送一个随机数
  })
}))
```

网页端用 JavaScript 监听 R 那边发来的消息，也可以根据发来的消息再发回去一个响应，让 R 执行特定操作。这个过程在 servr 包的 [`ws-reload.js` 文件](https://github.com/yihui/servr/blob/master/inst/resources/ws-reload.js)中有所体现。

虽然这玩意儿是如此之好玩，但估计多数 R 码农都不会走到这个偏僻的角落里来。我常常想要是更多人知道这个秘密花园的话，会不会诞生更多类似 shiny 的重量级应用？基础设施都在那儿了，剩下的就看你的想象力和执行力了。迄今为止，除了 [plumber](https://github.com/trestletech/plumber) 和 [fiery](https://github.com/thomasp85/fiery)，貌似我还没看到别的有一定牛力的作品。回到最初的跑题吐槽上，要是那位 R 核心团队成员当初能把服务器接口公开出来而不是一直紧紧捂在 `help.start()` 的口袋里，也许 shiny 还会提前好几年诞生。所以，我们得再好好想想，究竟[嘛叫开源](/cn/2017/12/homebrew-open-source/)、[嘛叫开源](/cn/2013/11/open-source-again/)呢？
