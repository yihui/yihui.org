---
title: 得意程序侦察另一则
date: '2011-08-21'
slug: proud-debugging
---

作为半个码农，有两次程序侦察工作窃以为得意。一次是[统计之都网站改版时的豆腐块对齐工作](/cn/2010/12/fighting-like-a-pig/)，这已经说过了；另一次是今天琢磨LyX与Sweave的时候，又碰到一个非常隐蔽的问题，但还是把它揪了出来。

论坛上[一次](https://cosx.org/cn/topic/104960)又[一次](https://cosx.org/cn/topic/104787)有人抱怨Sweave中使用中文的问题，而这也是我自己写书必须要用的工具，所以在这里面投入了不少精力。过去我一直用得好好的，昨天突然发现我的也用不了中文了，相当郁闷。注意到从LyX里面启动R的时候有这么一项警告：

    13:30:28.553: /bin/bash: warning: setlocale: LC_ALL: cannot change locale (en_US)
    13:30:28.624: During startup - Warning messages:
    13:30:28.625: 1: Setting LC_CTYPE failed, using "C" 
    13:30:28.626: 2: Setting LC_COLLATE failed, using "C" 
    13:30:28.626: 3: Setting LC_TIME failed, using "C" 
    13:30:28.626: 4: Setting LC_MESSAGES failed, using "C" 
    13:30:28.627: 5: Setting LC_PAPER failed, using "C" 
    13:30:28.627: 6: Setting LC_MEASUREMENT failed, using "C"

后面接着有警告说某些字符无效，显然这是编码或区域设置（locale）的问题了：Sweave无法正常读写文档。因为最近R曾经升级过，而我的LyX也一直用的源代码编译版，所以麻烦就在于不知道到底是谁的问题（昨天看樱桃小丸子，发现连丸尾都懂得confounding的道理，当时就震惊了）。

捣鼓了半天编码设置，如`options('encoding')`之类的，发现无效。我的locale应该是`en_US.UTF8`才对，到底是谁把它弄成`en_US`了呢？幸好英文文档还可以正常编译，于是在Sweave中插入一句`as.list(Sys.getenv())`看看所有的环境变量，发现环境变量`LC_ALL`很可疑。于是怀疑LyX修改了这个变量，正常的R启动之后`LC_ALL`是空字符串。那么LyX在哪里修改的？试着把LyX的语言修改为默认语言，再跑一遍LyX/Sweave，发现`LC_ALL`正常了，变成了空字符串，中文文档也可以正常读写了。真相大白——（暂时）不要人工设置LyX的语言。这可能是一个bug，[我一边报告，一边自己找到了临时解决办法](http://www.lyx.org/trac/ticket/7741)。

环境变量就是恶魔啊。比如PATH就是码农最需要但又最痛恨的环境变量之一，痛恨它主要是因为（至少对我来说原因是）[在Windows下得走很远才能找到它](https://cosx.org/2011/05/write-r-packages-like-a-ninja/)，常常让人没有耐心向不懂的人解释，而大多数人可能这辈子也不会意识到系统中有这些小恶魔的存在。

回到LyX与Sweave：因为重头开发者度假去了，所以恐怕对Sweave的完美支持在近两个月内又不太可能了。
