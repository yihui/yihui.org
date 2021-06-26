---
title: Yihui's TODO List
slug: todo
---

This page contains my TODO items, which I try to update every day. I guess I will never be able to finish all the work, so I will appreciate your help with any of the items on this page (fixing bugs, answering questions, or implementing features). Please feel free to let me know if you want to work on anything, and I will be happy to assist you.

Looking at these items, you may make a better decision on whether to ask questions on a public forum before [emailing me](/en/about/#contact-me), according to my current status below. Please feel free to email me anyway if you do not need a prompt response, and please forgive my slow response.

## Status

At the moment, I have **140** emails in my inbox to be dealt with (the earliest that I have not replied to was from _Nov 21, 2018_), **10** unread Github issues/PRs, and about **23** tabs open in my browser.

I'm on vacation from June 26 to July 13, 2021.

## TODO

1. A talk in the "My first useR" session at useR 2021 on July 4th, tentatively titled "My journey in writing books and blogging about R".
1. Revert inline CSS to `<style>`: https://github.com/rstudio/bookdown/issues/1170
1. Questions to be answered:
    - https://stackoverflow.com/q/67853909/559676 Why is the image not rendered?
    - https://community.rstudio.com/t/106550 Why shortcode doesn't work in `.Rmd -> .html`
    - https://community.rstudio.com/t/106243 How to read a chunk from an external Rmd? Perhaps I need to export the parser from **knitr**, although there is a **parsermd** package, which I haven't taken a close look yet
1. Read and probably respond to a few posts related to blogdown:
    - https://solomonkurz.netlify.app/post/2021-05-03-blogdown-updates-prompted-a-website-overhaul-these-are-my-notes/ Overhaul a blogdown site
    - https://www.jumpingrivers.com/blog/moving-to-hugo-tips-tricks-optimisation/ Hugo tips and tricks
    - https://shilaan.rbind.io/post/building-your-website-using-r-blogdown/ A blogdown guide
    - https://seth-dobson.github.io/r-blogging-on-a-chromebook/ Need to tell the author that Hugo could be installed inside the website project by setting [the global option `blogdown.hugo.dir`](https://bookdown.org/yihui/blogdown/more-global-options.html).
    - https://clauswilke.com/blog/2020/09/08/a-blogdown-post-for-the-ages/ Not sure if the author knows that blogdown no longer re-knits Rmd posts by default. Similarly, need to double check https://yutani.rbind.io/post/2017-10-25-blogdown-custom/.
    - https://sharleenw.rbind.io/2020/09/02/how-to-remake-a-blogdown-blog-from-scratch/ Need to learn more about her pain with blogdown.
    - https://portfolio.peter-baumgartner.net/2018/07/19/blogdown-using-themes/ Learn more about his lessons.
    - https://drmowinckels.io/blog/2020-05-25-changing-you-blogdown-workflow/ I guess most of her problems have been addressed in the latest version of blogdown, but needs to double check.
    - https://www.datalorax.com/post/new-website-theme/ Choosing themes.
    - https://www.garrickadenbuie.com/blog/add-a-generated-table-of-contents-anywhere-in-rmarkdown/ TOC
    - https://themockup.blog/posts/2020-08-01-building-a-blog-with-distill/ https://werk.statt.codes/post/2021-02-24-hellodistill/ Learn more about distill.
    - https://education.rstudio.com/blog/2021/02/distill-it-down/
1. Max's [SO question on highlighting inline code](https://stackoverflow.com/q/62629755/559676), which should be solvable via [**highr**](https://github.com/yihui/highr).
1. Replace sundown with **commonmark** in **markdown**: https://github.com/yihui/knitr/issues/1329
1. Optimize images automatically in blogdown
1. Fix relative paths in Hugo's RSS feeds: https://github.com/rstudio/blogdown/issues/384
1. Scrollama with blogdown/distill: https://github.com/yihui/rolldown/issues/14
1. Watch https://resources.rstudio.com/resources/rstudioglobal-2021/
1. A possible book: Presentation Ninja (xaringan, ioslides, slidy, revealjs, PowerPoint, beamer, shower, etc).
1. A possible book about pagedown and CSS.

## Done

This section is cleaned up from time to time.

1. Write out tinytex regexes to json: https://yihui.org/tinytex/regex.tar.gz
1. xaringan useR theme fixes: https://github.com/yihui/xaringan/pull/328
1. https://github.com/rstudio/rticles/releases/tag/v0.20
1. https://github.com/rstudio/pagedown/releases/tag/v0.15
1. https://github.com/yihui/xaringan/releases/tag/v0.22
1. Support fuse.js as the search engine for `bookdown::gitbook`: https://github.com/rstudio/bookdown/pull/1183
1. Don't disable vtangle if .Rout.save exists https://github.com/yihui/knitr/pull/2018
1. xaringan themes: https://github.com/yihui/xaringan/pull/322 https://github.com/yihui/xaringan/pull/323
1. https://github.com/yihui/xfun/releases/tag/v0.24
1. https://github.com/rstudio/rmarkdown/releases/tag/v2.9
1. https://github.com/yihui/tinytex/pull/315 Convert LaTeX warnings to individual R warnings to be emitted immediately.
1. https://stackoverflow.com/q/67977033/559676 Why the shortcode `blogdown/postref` didn't work.
1. Emit a message instead of warning when building Rmd vignettes without Pandoc: https://github.com/rstudio/rmarkdown/issues/2165
1. knitr `include_url()` error in RStudio: https://github.com/yihui/knitr/pull/2015
1. a note about custom blocks in bookdown: https://github.com/rstudio/bookdown/pull/1174
1. document the new syntax of bookdown theorem/proof environments: https://github.com/rstudio/bookdown/pull/1173

## Backlog

1. Support HTML widgets in **pagedown**: https://github.com/rstudio/pagedown/pull/87
1. A Hugo theme based paged.js? https://www.pagedjs.org
1. A Hugo layout for cards? https://apreshill.github.io/postcard/about.html
1. A possible book on small successes. https://www.tiffanymatthe.com/not-extraordinary <!-- https://docs.google.com/document/d/1of3Q0ufUGLQ5ZYoF939qFzBR6rW5XoNhPtVJwoHoGEk/edit# -->
1. Google doc to Markdown? <!-- Then we can even blog with Google doc -->
1. Read Miles's introduction to **drake** and include it in the R Markdown Cookbook: https://milesmcbain.xyz/the-drake-post/ (Update: Will said **targets** would be the new **drake**, so no need to introduce **drake**)
1. Record a video about [CSS selectors for R Markdown users](https://github.com/yihui/rmarkdown-cookbook/pull/239/files).

## Help Needed

If anyone is interested in any of the items below, please feel free to let me know. I'd be happy to explain more, or do a video chat with you.

1. How can users build and install their own version of TinyTeX? Short answer: install [`TinyTeX-0`](https://github.com/yihui/tinytex-releases), use `tlmgr` to install the packages they need, zip the TinyTeX installation directory, and publish it somewhere (e.g., Github Releases, or AppVeyor artifacts). To install this custom version of TinyTeX, I'll need to provide an environment variable to customize the URL in my installation scripts (e.g., not hard-coding yihui.org or github.com/yihui/tinytex-releases in [install-bin-unix.sh](https://github.com/yihui/tinytex/blob/master/tools/install-bin-unix.sh)), so they can be reused by others. 
1. Introduce the easier way to start a **bookdown** project using the RStudio IDE in the book: https://github.com/rstudio/bookdown/issues/225
1. Build **rggobi** on r-universe.dev: https://github.com/ggobi/rggobi/issues/7
1. More accessibility/navigation tags in `knitr::kable_html()`: https://github.com/yihui/knitr/issues/1747
1. Generate the Table of Contents for **xaringan** slides: https://github.com/yihui/xaringan/issues/217
1. How to render math expressions without MathJax? https://stackoverflow.com/q/57121846/559676 Alternative methods are listed here: https://pandoc.org/MANUAL.html#math-rendering-in-html
1. The pain of using **rmarkdown** on network drives: https://github.com/rstudio/rmarkdown/issues/1268
1. BibTeX references showing up twice in **bookdown**: https://github.com/rstudio/bookdown/issues/751
1. Make TinyTeX more portable: https://github.com/yihui/tinytex/issues/133
1. `xfun::numbers_to_words()` for numbers with decimal places: https://github.com/yihui/xfun/issues/18
1. Live code in xaringan: https://github.com/yihui/xaringan/issues/206 The implementation is not totally clear to me, but I imagine users can double click on a code block on a slide to edit the code, and the edit can be sent back to the RStudio IDE or executed.

## Blog

1. What does it mean to be generous? https://github.com/ropensci/targets/issues/503 I don't think I'm generous in this case.
1. https://statmodeling.stat.columbia.edu/2021/05/23/thinking-fast-slow-and-not-at-all-system-3-jumps-the-shark/ https://twitter.com/kjhealy/status/1394729017631285252 Sounds like this new book has got quite a bit of controversy, but I haven't read it.

## Reading

1. JavaScript for R https://book.javascript-for-r.com Seems to be an interesting book on the only two languages that I understand.
1. https://atrebas.github.io/post/2020-06-17-datatable-introduction/ https://martinctc.github.io/blog/comparing-common-operations-in-dplyr-and-data.table/

## 待办事项

1. https://yufree.cn/cn/2018/03/24/blogdown-rss/

## 私人事项

1. 一堆未读推特消息，从 2020/07/01 开始：<https://t.yihui.org>
1. 这位大人对 knitr 钻研似乎颇深，是个人才，也许可以拉来做点什么事：<https://stackoverflow.com/users/2706569/cl>
1. 家教有关的阅读
    - https://twitter.com/Idzie/status/1247946036733190145
    - https://www.thecut.com/2020/03/unschooling-your-kids-during-coronavirus-quarantine.html
    - https://qz.com/1828551/parents-who-didnt-choose-to-homeschool-this-is-an-opportunity/
1. https://josebrowne.com/on-coding-ego-and-attention/
1. https://fortelabs.co/blog/how-to-take-smart-notes
1. https://www.samuelthomasdavies.com/book-summaries/business/deep-work/
1. https://highexistence.com/5-reasons-modern-life-depression/
1. 黑客与画家 http://idlewords.com/2005/04/dabblers_and_blowhards.htm
1. [教养的迷思](https://book.douban.com/subject/26612510/) https://mp.weixin.qq.com/s/4XmMuUV2XbM-UMD4GJGUMQ
1. [家庭、私有制和国家的起源](https://www.marxists.org/chinese/engels/marxist.org-chinese-engels-1884-3.htm) https://en.wikipedia.org/wiki/The_Origin_of_the_Family,_Private_Property_and_the_State
1. Note-taking/todo app https://d.cosx.org/d/419756/10 https://noteplan.co https://everydaycheck.com https://twitter.com/OilGains/status/1085929376741556230
1. Stoicism: https://dailystoic.com/letters-from-a-stoic/ https://www.lettersfromastoic.net/letter-4/
1. ggplot 灰色背景：https://stats.stackexchange.com/q/25220/10946 https://twitter.com/WilliamsNeuro/status/1318419069968658432
1. 为 XD 和邻居架设网站
1. 用 `IntersectionObserver` 而不是 `scroll` 事件检测评论区是否滚到了当前视图下： https://blog.skk.moe/post/prevent-disqus-from-slowing-your-site/

## 随机事项

1. JS 生成声音：<https://github.com/R4meau/plink-plonk/blob/master/content.js> 暂时不知道用它干啥，但感觉要是跟 Shiny 鬼混在一起也许能玩出什么花样来。
1. https://two.js.org
1. https://github.com/seankross/postcards
1. https://github.com/etiennebacher/docsifier
1. https://twitter.com/Warreningshot/status/1379664918450905089 blogdown 复古主题？

<script>
document.querySelectorAll('.main a').forEach(function(el) {
  var t = el.innerText;
  if (!/^https:/.test(t)) return;
  el.innerText = t.replace(/^https:\/\/(www\.)?/, '')
    .replace(/#.*/, '')
    .replace(/^github.com\/([^\/]+)\/([^\/]+)\/(issues|pull)\/(\d+).*/, '$1/$2#$4')
    .replace(/^github.com\/([^\/]+)\/([^\/]+)\/(releases)\/tag\/([^\/]+).*/, '$1/$2@$4')
    .replace(/^stackoverflow.com\/q\/(\d+).*/, 'SO/$1')
    .replace(/^community.rstudio.com\/t\/(\d+).*/, 'RC/$1')
    .replace(/^twitter.com\/([^\/]+)\/([^\/]+)\/(\d+).*/, 'twitter/$3')
    .replace(/^github.com/, 'GH');
});
</script>
