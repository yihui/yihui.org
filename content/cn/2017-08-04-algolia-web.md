---
title: Algolia 的网页提速
date: '2017-08-04'
slug: algolia-web
---

瞄了一眼最近 [Algolia 的网页提速文章](https://blog.algolia.com/improving-web-performance-to-mirror-engine-speed/)，写得很是细致。里面提到他们扔掉了 jQuery 和 Underscore 库，这跟我最近的想法是一致的。我作为一个 JS 门外汉捣鼓了几年，一直觉得离开了 jQuery 就没法正常写 JS 代码。直到前一阵子有一天，我突然发现原来 `document` 对象本来就有 `querySelector()` 和 `querySelectorAll()` 方法，以前我一直以为只有 `getElementsByXXX()` 那一套。这个发现一下子就打垮了我对 jQuery 的信仰，在文档中查找对象再也用不着 `$()` 了。当然，我不是说 jQuery 没价值，它仍然很厉害，只是它的厉害之处已经不是我亟需的了。

另一件进一步打垮我的信仰的事情是 CSS3 渐变动画。原来 `transition` 属性如此简单。离了 jQuery，依靠浏览器原生支持就已经可以活得够好了，无依赖，绿色纯天然，加载速度还快。这么几毫秒的事儿，也是操碎了心。
