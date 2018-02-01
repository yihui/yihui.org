---
title: 合并请求的心理学
date: '2017-08-22'
slug: pr-psychology
---

我一直大力鼓吹合并请求（Pull Request，简称 PR），是因为我觉得它实在是非常有效的合作工具。统计之都主站改版的意义之一就是要拉近潜在贡献者和编辑部之间的距离，不要再在暗地里投稿审稿。那些有能力有兴趣写稿子的人，完全可以通过 Github 自由投稿，一句废话也不必跟编辑部讲；编辑部的门永远是敞开的。

我觉得 PR 有一种迷之成就感，这一点小小的心理利用好了之后可以有源源不断的正能量涌出来，让贡献者欲罢不能。比如[这位](https://github.com/cosname/cosx.org/pulls?q=is%3Apr+author%3Aszcf-weiya) Wang Lijun 少侠[修正我们的文章](https://github.com/cosname/cosx.org/pull/705)就仿佛停不下来。他谁呀？我母鸡啊。又比如战立侃的[这篇投稿](https://github.com/cosname/cosx.org/pull/702)，完全是自愿发来的，编辑部老实审稿就够了。过去十年，我们的文章都是夺命连环催，我觉得这种模式虽然带来了很多稿件，但不是自由恋爱，而是属于包办婚姻，作者和编辑双方都累。当然，就目前这个阶段，我也不指望这种自愿的 PR 能带来多少稿件，这个过程肯定会很漫长，大家需要熟悉这个路数。

要想让 PR 尽快被合并，还得了解一下开发者的心理。这方面我推荐两份阅读材料：

- Hadley 大人的妹妹 Charlotte Wickham 今年在 useR! 会议上的报告 "[Collaborative Coding](http://cwick.co.nz/talks/collab-code-user17/)"
- 敝厂职工 Jim Hester 的日志文章 "[Contributing Code to the Tidyverse](http://www.jimhester.com/2017/08/08/contributing/)"

简言之，从尽可能简单的 PR 做起（比如修改错别字），千万不要第一次贡献 PR 就来五百行代码修改。他人即地狱，他人的代码更是地狱。要是上来就是很复杂的 PR，开发者需要很大的勇气才能开始审阅；对那些忙人，看到这样的 PR 可能就打退堂鼓了。我说的尽量简单就是要尽量减少差异，一定要牺牲自己的代码习惯，比如千万不要去动人家的空格（比如把两个空格缩进改成四个，或添加一些无谓的空行），甚至把等号改成箭头（我会跟你拼命的啊我跟你讲）。我给 Hugo 提交过几个 PR，我的[第一个 PR](https://github.com/gohugoio/hugo/pull/3639) 我特意克制了我的 JavaScript 魂，就是为了减少差异量；等它被合并之后我才提交[第二个 PR](https://github.com/gohugoio/hugo/pull/3655) 放浪形骸之外。第一个 PR 是核心改动，所以我要让它以最大概率被合并，不要用非实质性的改动骚扰 Hugo 维护者；尽管我看着那一坨 JS 代码并不开森，但还是要忍住；第二个 PR 基本上只是形式上的改动，是否被合并我不是特别在意。然而有了第一个 PR 破冰，第二个很快也被合并了。后来又有了[第三个 PR](https://github.com/gohugoio/hugo/pull/3825)。其实我根本就不懂什么狗语言（Go），但这并不妨碍我为一个狗项目做贡献。

去年 Matloff 老爷子宣布他入驻 Github 并发布 regtools 包的时候，我就[留言说](https://matloff.wordpress.com/2016/11/07/my-regtools-package-is-now-on-cran/)“您竟然有四个没合并的简单 PR”（言下之意这有点令人发指），但他对 PR 并没有像我这样看重，他以为我的生活是很单线程的，所以我有闲工夫去看 PR。嗨，现在这时代，还能找到几个单线程的人。谁有勇气学高德纳呀。我正是因为太忙，才要发展贡献者，而 PR 就是播种的最好机会。有时候我盯着屏幕看半天也看不明白一个 PR，只能忍痛砍掉，自己动手；比如[这个谢轮眼的 PR](https://github.com/yihui/xaringan/pull/54)，我觉着实在有点难懂，只好讲一声对不住然后自己[简化实现之](https://github.com/yihui/xaringan/commit/398525e2)。这里讲对不住很关键，因为关 PR 是很能打击人热情的事件，得小心处理。能不关的 PR 尽量不关，实在想不好关不关，不妨先留着，以后在脑子里多转几圈，实在觉得不能接受，解释一下再关掉。
