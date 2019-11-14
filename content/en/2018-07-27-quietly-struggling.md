---
title: Quietly Struggling (with Software)
date: '2018-07-27'
slug: quietly-struggling
---

Recently I was kind of amused by two instances of quiet yet long-time struggles with software. Struggles are not inherently amusing,^[Not sure if there is an equivalent version in the western culture, but we sometimes joke in Chinese: "What made you so unhappy? Come on! Tell us, to make us happy." Again, this is only a joke. We are not really that evil.] but when you discover that you are not the only one struggling with a problem, [you may feel relieved](https://twitter.com/darokun/status/1062618033078915078) and even amused (phew, I'm probably not totally an idiot).

## rJava

One instance was [Julia Silge crying over **rJava**](https://twitter.com/juliasilge/status/1021931066460794882). Oh rJava... RJAVA! Let me count the number of ways you could fail and the number of hours I have spent on your installation...

![Crying together](https://db.yihui.org/images/gaocheng-wuliuyi.jpg)

There may well be good reasons for our frustrations. I don't know. I know nothing about Java. I don't use **rJava** myself. I just tried to install it because I need to check the reverse dependencies of some of my R packages, which happened to use **rJava**.

Anyway, if a software package seems to try to turn an average user into a sysadmin, that is probably not a good sign. Ummm...

- R CMD javareconf?

- clang: error: unsupported option '-fopenmp'? [What does `-fopenmp` mean?](https://stackoverflow.com/a/43943631/559676)

- Library not loaded: /Library/Java/JavaVirtualMachines/jdk-9.jdk/Contents/Home/lib/server/libjvm.dylib?

- Java 8? 9? JDK 10?

- sudo?

![Tired](https://slides.yihui.org/gif/tired.gif)

Actually I did figure out how to install it, but it was a long way... I was afraid that I would have to go through this again in the future (like I did for a few times in the past), so I chose not to touch it again.

## D3

Okay, D3. Seriously, it is awesome. But somehow it seems to have something in common with LaTeX: if you look at the output, it is often amazingly beautiful and elegant, but when you start to learn the source code, it starts to hurt (I have to say I'm much more comfortable with JavaScript than LaTeX, though).

I'm sure if I learn it seriously and step by step, I wouldn't struggle much. I kind of know JavaScript and SVG, but my brain has been poisoned by R graphics. D3 is even more low-level than base R graphics. I don't want to spend too much time on learning it, so to some extent, I just deserve my failures.

So I wanted to create a simple bubble chart after seeing [the beautiful official example](https://bl.ocks.org/mbostock/4063269). It turned out that [it took me about six hours](https://twitter.com/xieyihui/status/1022231125970903041), which made [Tracy Shen](https://twitter.com/JiaShenTracy/status/1022463247440601091) and [Joshua Goldberg](https://twitter.com/GoldbergData/status/1022318653306548224) feel relieved. The last time when I touched D3 was six years ago, and I still remember the examples of three dots.

## Conclusion?

Is there anything we can learn from these two examples? One obvious lesson is that it can be very normal for one to struggle with something, even if one is an expert in other areas. Another lesson is that you may soothe other users if you share your secret struggles.

While I was writing this post, an idea came to my mind: How about editing a contributed book on all our failed attempts or struggles in installing/using software packages? I think it can be valuable because it will show the average users' perspectives. From the perspective of software authors, everything may be obvious and easy, and they may not even be able to imagine the possible ways in which users can fail. One challenge for this book, however, is to avoid turning it into a book of complaints.
