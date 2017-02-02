---
title: 跨域提交表单的障碍
date: '2008-10-02'
slug: cross-domain-to-submit-form
---

看样子我前一篇日志里面提到的问题并不是一个简单问题，到现在我基本上已经放弃了向Rweb提交代码获取结果的想法了，原因是多数浏览器不允许跨域（cross domain）提交表单并获得结果，据说是有安全问题，我没空去仔细研究里面的细节。现在在尝试了



	
  1. jQuery + Form插件

	
  2. Ajax

	
  3. iframe + JavaScript


三种方法之后，我决定给明尼苏达大学的[Charles Geyer](http://www.stat.umn.edu/%7Echarlie)写信诉苦，我需要服务器支持以在网页上实时生成动画；仅凭我在客户端捣鼓，估计浪费一个星期时间也未必能捣鼓出来。
