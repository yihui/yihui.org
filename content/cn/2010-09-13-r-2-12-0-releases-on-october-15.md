---
title: R 2.12.0将于10月发布
date: '2010-09-13'
slug: r-2-12-0-releases-on-october-15
---

看到这么一条：

* Directory ‘R_HOME/share/texmf’ now follows the TDS conventions, so can be set as a `texmf` tree (‘root directory’ in MiKTeX parlance).

八错八错，以后终于不用把Sweave的那些定义文件手工拷到MikTeX的texmf下去了。

最近看到CRAN上新出了个关于[可重复性研究的Task View](http://cran.r-project.org/web/views/ReproducibleResearch.html)，是个辉瑞公司的人写的，里面一共链接了二十多个R包，其中居然包含了我的[animation包](http://cran.r-project.org/package=animation)，善哉善哉。

又及：这两周R界又燃起了一场讨论，最开始是从多伦多大学一位教授开始，他发现了[R里面两个“令人惊奇”的地方](http://radfordneal.wordpress.com/2010/08/15/two-surpising-things-about-r/)（花括号比圆括号快、`a*a`乘法比`a^2`平方快），随后他又提供了一系列改进的patch发给了R core们，从邮件列表开始，这把火烧到不少牛牛那里去了，有人惊叹有人不屑。然后我惊奇地看到一些我从没见过的人都出来“灌水”了，像Duncan Murdoch、Ross Ihaka、John Maindonald等。牛。我作为一个计算机盲（相对而言），一直都没明白到底是什么因素导致了base R只能基于内存做计算，以及支持并行的的代码修改难度有多大（那些BLAS库都木有并行版的么）。Ross一直雄心勃勃想整一个新的软件，不知现在进展在哪一步，抑或期待哪个天才再次横空出世？Luke Tierney十几年来都在做并行和byte-code编译，也不知后话如何，老爷子这学期会时不时访问我们统计系，上次来只跟他喝咖啡听了些ASA的八卦，后来也没机会详聊。Duncan Temple Lang是个有趣的天才，有事没事发布个好玩的包，前一段时间又放出来一个[Rllvm](http://www.omegahat.org/Rllvm/)，是另一种形式的编译方式。R作为一种解释执行的语言，短时间内肯定还死不了（我是说十年二十年），毕竟这世上大多数人仍然处理小数据，但这么发展下去总不是长久之计。
