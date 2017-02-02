---
title: FFmpeg果然挺强悍
date: '2010-09-15'
slug: awesome-ffmpeg
---

两年多前，我在考虑[animation包](http://cran.r-project.org/web/packages/animation/index.html)的时候曾经考虑过FFmpeg，但后来想了想，又不是做视频，于是作罢，没有仔细看下去。今日从土豆下载了[佐佐木爷爷的树木赞歌](http://www.tudou.com/playlist/playindex.do?lid=10008948&iid=58355793)，是f4v格式，想转mp3之类的常用格式，正好电脑里还有一份FFmpeg程序，于是打开命令行一句话就搞定了：

    
    ffmpeg -i zuozuomu.f4v zuozuomu.mp3


牛。

之所以电脑里有一份FFmpeg，是因为前一段时间有位童鞋来信，给我发了一些animation包的增强功能，其中有用FFmpeg的。这事儿过两天得处理一下，animation包要更新了。
