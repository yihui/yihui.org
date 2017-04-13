---
title: 自动化监控 Twitter 关键词
date: '2017-04-13'
slug: watch-twitter
---

这件事情我本来想作为第三个莽撞人项目的，但昨天操起键盘开了个头，然后不小心就给做完了。

事情是这样：有时候我想看看某些关键词在 Twitter 上的讨论，但我又不想费劲每次都去搜索，因为头一天搜和第二天搜的结果可能是一样的，这期间没有人讨论它。比如最近有没有人狠狠表扬我之类的。思路和工具链如下：

- 用户提供一个关键词向量。

- 用 [rtweet](https://mkearney.github.io/rtweet/) 包去搜索（`search_tweets()` 函数）。

- 数据有了之后，把数据按天汇总转化为 Markdown 文件。比如

    ```yaml
    ---
    title: "Messages on 2017/04/11"
    date: "2017/04/11"
    ---
    ```
    ```markdown
    # bookdown
    
    > Author1, [Message1](Link1), ExtraInfo1
    
    > Author2, [Message2](Link2), ExtraInfo2
    
    > ...
    
    # blogdown
    
    ...
    ```

- Markdown 文件按日期命名，如 `2017-04-11.md`。

- 在 Github 上建一个简单的 Hugo 网站库，在 Travis 上运行上面的 R 代码，把 Markdown 文件写入 `content/post/` 文件夹，再推回到 Github 库里。

- 把 Github 跟 Netlify 连起来。每当 Github 库有更新，Netlify 自动重新编译网站。

- Travis 有一项新功能尚在测试中，就是周期任务（cron），也就是可以定义每过多久重新跑一遍 Travis 脚本。比如可以定义每天跑一遍。这样我就不必每天亲自去 Twitter 上看消息了，只需要订阅我自己的 RSS 种子，通过 RSS 阅读器看就够了。节省了我好几分钟时间。

最后的成品在 Github 库 [twitter-blogdown](https://github.com/yihui/twitter-blogdown) 中。可以看见 R 代码并不长，才 40 行，但这整个问题的难点在于工具链。每个单个的工具都不复杂，就是需要在脑子里能把它们都串联起来，还需要看每个工具的相关文档，比如 Twitter REST API（例如为什么要用 `since_id` 参数）和 Travis 的周期任务文档，还要知道基本的 Hugo 网站怎么搭建、Netlify 跟 Github怎么连、用 Github 的个人访问令牌（Personal Access Token）如何向 Github 库推送内容、域名怎么设置。

这种组装感觉就像 UNIX 命令的管道组装一样，每个命令做什么都很清楚，掌握单个命令的用处很有限，但把这一条条神龙召唤到一起，就能引发 [lollapalooza 效应](https://en.wikipedia.org/wiki/Charlie_Munger)。

好了，下面轮到莽撞人出场了。Twitter 的我做了，渣浪微博有没有戏？
