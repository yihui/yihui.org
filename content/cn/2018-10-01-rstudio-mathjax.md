---
title: 一个网址的命名
date: '2018-10-01'
slug: rstudio-mathjax
---

继续说一个[命名](/cn/2017/07/naming/)的例子。这已经是去年上半年的事了，当时 MathJax [突然准备跑路](https://github.com/mathjax/MathJax/issues/1725)，搞得大家都措手不及。我们厂见此状况，私下跟他们洽谈无果（包括我们出钱赞助 MathJax），于是只好自己弄了个服务器存放 MathJax，以防以后再出现这种某个著名 JS 库跑路的状况。

问题是，厂里的同事为这一个库单设了一个域名，这个域名下只放这么一个库：

```
https://mathjax.rstudio.com/latest/MathJax.js
```

当时我看见连忙上书极力反对这个网址命名法，因为它不符合主流 CDN 资源的网址格式。主流格式都是主网址加库名加版本号，比如：

```
https://cdnjs.cloudflare.com/ajax/libs/remark/0.14.0/remark.js
```

如果违反这种主流命名法，那么可能会给别人带来麻烦，比如 Hugo 模板中就不方便做到让用户自定义 MathJax 的 CDN 服务商：

```html
<script src="{{ .Site.Params.MathJaxCDN }}/mathjax/{{ .Site.Params.MathJaxVersion }}/MathJax.js">
</script>
```

用这样一个网址会好得多：

```
https://cdn.rstudio.com/mathjax/latest/MathJax.js
```

这样做还有另外一个好处，就是万一将来又有一个重要的 JS 库跑路的话，我们只需要在我们自己的服务器下增加一个文件夹，把那个库放进来即可。按照当前我们的命名法，如果发生跑路的情况，我们又得再设置一个域名，还得捣鼓一遍域名配置、HTTPS 证书等一屁股琐事。

所以有时候码农之所以忙，纯粹就是因为以前的自己不注重可持续发展、而给现在的自己找的事。我的上书被忽略了，可能大家都觉得这是个芝麻大的事，不值得考虑。单论这事本身的话，它确实是个芝麻大的事，可永远向前多看一步这种思维方式我觉得还是很重要的。只盯着自己的脚趾头走路，难免摔跤、掉坑。
