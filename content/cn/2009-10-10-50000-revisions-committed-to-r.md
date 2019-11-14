---
title: R的第五万次SVN修改：看看R大佬们的工作时间分布
date: '2009-10-10'
slug: 50000-revisions-committed-to-r
---

昨天Ripley教授向R提交了第50000次修改，Romain Francios对SVN的日志数据[做了一些简单分析](http://romainfrancois.blog.free.fr/index.php?post/2009/10/09/celebrating-R-commit-50000)，我个人一直关心Ripley是不是整天不用睡觉（你看这老爷子一天到晚都在邮件列表中出没），这次正好验证一下他是不是24小时工作，数据和R代码参见[50000 Revisions Committed to R](/en/2009/10/50000-revisions-committed-to-r/)。

![](https://db.yihui.org/imgur/1kSb7.png)

Ripley从1999年加入R核心团队，从上图可以看出，他显然是不需要睡觉的——每个小时都可能有commit。时间分布呈双峰：早上7点到10点、下午3点到6点。看看其他人的工作时间，很容易发现Martin倾向于早起干活，而Peter倾向于每天晚上12点之后干活。

Romain的博客中有SVN的日志数据可以下载，感兴趣的同志们可以继续分析R core的工作行为。

上周上课，我们老爷子又说SAS is extremely powerful，SAS很靠谱，就差明说SAS没有Bug了。我正在整理课程笔记，SAS的事情，我改天要去找老爷子好好谈一谈。R从不说自己能担保什么，大家拼命找bug，拼命改进，这是开源软件的共同特征——没有人付钱，但就是有一群疯子半夜3点还在写代码。商业软件一向说自己能保证什么，可是一个bug二十年都没人会去修正（[例](https://www.stat.math.ethz.ch/pipermail/r-help/2009-June/202220.html)），还好我们看不见源代码，要是能看见，后果不堪设想。
