---
title: 是莽撞人就来单挑：还世界一个轻量级 TeXLive
date: '2017-06-06'
slug: lightweight-texlive
---

> 2017/12/18 更新：这个问题我终于自己动手基本解决了，参见 [TinyTeX](/tinytex/)。它是一个特制版本的 TeX Live，在 macOS/Linux 下安装后的大小大约是 150 兆。

要把我最烦恼的软件问题排个名的话，我第一烦 Windows 下的字符编码问题，因为 UTF-8 明明可以一统江湖，在 Windows 下这个破问题却一直是一桶浆糊，永远杀不死；第二烦的就是 LaTeX 安装问题，因为这个问题明明有简化的可能，却也是一桶浆糊状态。Windows / Linux / macOS 各自打各自的江山，都是用的那种我最不喜欢的少数一两个人掌握核心权力的旧时代软件包分发办法。

我说 LaTeX 的安装可以简化是基于一个假设前提的：你不会没事用一些冷门包。我想解决的主要问题是：

- 统一 LaTeX 在各个系统下的安装方式，下载一个相对小的压缩包，调整一下 PATH，完事。现在 LaTeX 安装面临的一大矛盾是：你要么下载一个四五 G 的庞然大物，然后也许只用其中不到十分之一的包；要么下载一个精简版，随便编个文档都缺包，然后一脸懵圈不知道该如何找到缺失的包以及安装它。

    - Windows 下的 MikTeX 也许是最业界良心的打包了，它很贴心地提供了一个如果缺包就自动安装的功能，应该能应付多数初学者的困惑。
    
    - 对 macOS 下的 MacTeX，我有这么几点烦心的地方：一是它打包了一些对我来说毫无意义的应用，比如 TeXShop 和 TeXLive Utility，前者对 R Markdown 用户来说没用，后者的核心功能用两个命令行就可以替代，并没有那么恐怖（`tlmgr update --self --all` 和 `tlmgr install`）；二是它默认装在带有版本号的文件夹下，如 `/usr/local/texlive/2016`，这个问题站在软件本身的开发者角度容易理解，因为开发者通常需要测试自己的好几个版本的程序，但站在用户角度几乎毫无意义，谁特么没事安装三个版本的 TeXLive 玩儿？况且每个安装都巨大无比；关于这个版本号问题，我以前向 R 团队[上过奏章](https://stat.ethz.ch/pipermail/r-devel/2011-May/060820.html)请求移除安装路径中默认的版本号，但很快被大家打成了马蜂窝。
    
    - Linux 下的 TeXLive 是我最早头疼的东西。在早年间我还是 Ubuntu 用户的时候，我整天盼星星盼月亮希望打包的人能把 TeXLive 从五年前的版本升级到现在的版本，但那些 deb 包永远是那么老旧、那么巨大。我等了好几年，实在忍不了了，终于摆脱了 `apt-get install texlive-*` 的束缚，转向自己手动安装 TeXLive，然后发现整个世界顿时清静了。早知道安装这么方便，鬼才愿意仰仗那些 Debian 包的维护者呢。自己从源代码安装 TeXLive 最大的好处是有了命令行工具 `tlmgr`，至少以前这在 Debian 世界是被禁止的（尔等不可轻易用 `tlmgr` 管理尔的包，尔等只能用寡人给你打好的包集合）。
    
    说到底，这些打包的人不懂我的心：我没兴趣了解 LaTeX 如何工作，我也不喜欢一大坨没用的文件装在我的电脑上，我需要有自由决定安装或卸载任何包，别帮我把一大坨包绑在一起扯不开撕不烂。

- 默认安装包要尽量小，最好在 100M 的数量级，而不是好几个 G。如果用户需要安装包，他可以请求在默认安装包中添加这个包（方便后人），或者自己敲一行命令安装，关键是安装包无论在什么系统下有且仅有一个办法，所以不管用什么系统，用户只需要记住最轻量的步骤，而不必网上到处扒文档。这个默认包的打包过程在 Github 上公开，任何人都可以请求变更，就像史上最成功的软件包管理工具 Homebrew 一样，不要再依赖少数一两个人掌控打包及分发。

    其实 LaTeX 的安装之所以巨大，除了包太多之外，还有一个大问题是文档的体积太大。各位摸着良心说，你们这辈子在自己的电脑上打开过几次 LaTeX 的任何包的任何帮助文档？反正我从来都是放狗在网上搜，从来没打开过本地的文档，那些文档放在哪儿我都不太确定。所以，还是那句话，站在开发者角度来说，把文档打包进去合情合理，但在用户角度来说，文档几乎无用，就算普通用户打开了文档，一看满屏幕的反斜杠命令，立马也会嘤咛一声昏过去。我曾经[吐槽](https://twitter.com/xieyihui/status/792031983027101696)说很多 LaTeX 包做的事情很漂亮，但文档实在辣眼睛，要么短小精悍不知所云，[说半天一个例子也没有](http://ctan.sharelatex.com/tex-archive/macros/latex/contrib/threeparttable/threeparttable.pdf)，要么长篇大论贯彻 Knuth 的文学化编程理念：一坨代码加一坨文字解释这坨代码如何工作。我特么操这份心干什么？
    
    LaTeX 是世上最丑陋的语言，但又能生成最漂亮的文档。文学化编程是非常有趣的编程思想，却只有 TeX/LaTeX 忠心耿耿继承了这个思想，写出了世上最枯燥的文档。各位客官香菇不香菇？

废话少说，放码过来。

我们还是把希望寄托在 TeXLive 上，放弃那 MikTeX 和 MacTeX。姑且叫这个项目 SmallTeX 吧。我去年曾经在 Linux 上试过，完整的 TeXLive 中如果去掉文档和源代码，最终的压缩文件（tar.gz）大小在 1G 左右。我的安装代码[在此](https://gist.github.com/yihui/7ae1144e45063c4957e5c1f6f67039f4)，核心办法就是用一个 texlive.profile 文件实现自动化安装，这也是唯一的自动化安装 TeXLive 的办法。我把它装在用户根目录下，就是 `$HOME/texlive`。这个脚本是安装所有包，如果只想安装一部分包的话，可以挖我的 [ubuntu-bin](https://github.com/yihui/ubuntu-bin) 库，看看里面我如何安装 TeXLive 以及一部分[额外的包](https://github.com/yihui/ubuntu-bin/blob/master/TeXLive.pkgs)，那些额外的包来自我的血泪积累：我在跑 knitr 包的逆向检查时收集的某些 R 包中用到的一些怪异 LaTeX 依赖。相信有了这么些包之后，多数人应该能顺利编译多数 LaTeX 文档了。另外说一句，目前 Travis CI 上的 R 语言支持中的 LaTeX 安装其实就是基于我这项工作的，主要原因就是我提供了一个超小的安装包，几秒钟就可以下载完，而且覆盖了常见的包。

你也可以参考 LaTeX 的官方 Github 库中的 [texlive.sh](https://github.com/latex3/latex3/blob/master/support/texlive.sh) 脚本，它也是类似的办法，有一个 texlive.profile 文件，其中设定了安装最精简的包，然后再装更多的包。

这个 TeXLive 安装包可以通过 Travis 自动编译，然后通过 Github releases 自动发布，就像我的 ubuntu-bin 库所做的一样。注意发布的时候需要删除已有的文件，因为 Github 不支持在 Github releases 中覆盖文件，参见我生平唯一一个 [Python 脚本](https://github.com/yihui/ubuntu-bin/blob/master/delete.py)。

Travis 支持 Linux 和 macOS，不支持 Windows，不过 Windows 可以通过 AppVeyor 去编。不管什么系统，都要把 bin 路径放入系统的 PATH 变量中。Windows 下这个应该可以用脚本自动完成。\*nix 用户自己在 `~/.bash_profile` 中手工加一下也不是不行，当然也可以用 `sudo tlmgr path add` 自动把那些 LaTeX 的可执行文件以符号链接形式添加到系统的某个 PATH 路径下（`/usr/local/bin` 之类的）。

这个小项目让我来做也许要花三整天时间，主要是我对 Windows 下的 TeXLive 还没有经验。需要的技能：系统脚本语言、Travis/AppVeyor、Github 及其 API。欢迎死磕到底，挑战 LaTeX 世界无聊的（也许是无心的）专制。
