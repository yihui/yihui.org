---
title: 谈谈英文网站的一个不规范之处
date: '2005-07-23'
slug: nonstandard-english-web
---

前两天浏览一些英文网站，一时心血来潮，想看看我们国内的一些所谓的大型英文网站怎么样，我专门选取了一个charset的“指标”来衡量（注1），先看看几个网站的meta部分（为了方便显示我在代码中加了一些适当的空格）——

People's Daily Online

```html
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
```

China Forum

```html
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
```

China Daily

```html
<META http-equiv="Content-Type" content="text/html; charset=gb2312" />
<META content="China News Business Information 中国日报" name="keywords" />
<META content="Chinadaily.com.cn is largest English portal in China, providing news, business info, BBS, learning materials and 中文国际新闻." name="description" />
```

再随便看一个国外的——

USATODAY.com

```html
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=iso-8859-1"/>
```

China Daily号称中国最大的英文门户，网站的keywords（关键词）和description（描述）中竟然还有中文字符，这是明显的不规范现象（注2），还有本文要说的字符集的问题，都是用的gb2312（简体中文），要是用英文操作系统来看的话，则可能会出现一些错误。人民日报的英文论坛也是同样的毛病，并且该论坛还有个问题就是英文字体用的是宋体，这一点也不恰当；不过人民日报英文版的字符集是对的。

在此没有贬低China Daily和人民日报的想法，但是我觉得至少可以看出，在国内缺乏比较合格的英文网站制作人才（我这种要求也有些苛刻）。或者说，我们的网站制作人员还需要多学点英文方面的网页知识。呵呵，说到这里，不禁又要嘲笑一次被我嘲笑了无数遍的中国的English Exams，考吧，考吧，看看有多大用处，看看培养出来的所谓的人才。考试观念亟待改革，这次的考试改革至少我不太看好。观念不变，形式再怎么变也是徒劳的，不过要改变中国人的“考试观”，难于上青天。

---

注1：所谓charset，顾名思义，就是字符集。不同语言的网站需要不同的字符集，否则可能出现乱码，比如英文网站要是用gb2312的字符集，则可能会出现有些字符显示不出来的情况（显示为“？”）。

注2：写到这里，突然想起杨柳同学，因为那次上调查技术课，她把我说得跟国家标准委员会的委员似的，心里怕怕的……
