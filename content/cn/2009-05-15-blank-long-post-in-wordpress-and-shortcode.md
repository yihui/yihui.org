---
title: 超长文章在Wordpress中不能显示的解决办法（与shortcode有关）
date: '2009-05-15'
slug: blank-long-post-in-wordpress-and-shortcode
---

> 2009-06-14更新：自从WordPress 2.8开始，这里的正则表达式又变了，经本人测试，`'(.?)\[('.$tagregexp.')\b([^\[\]\r\n]*?)(?:(\/))?\](?:(.+?)\[\/\2\])?(.?)'` 是有效的。

这两天捣鼓Wordpress，遇到了无数的问题，估计Google不下百次，有些问题实在诡异，不过幸好都让我找到了答案。例如，昨天被这个问题搞得几乎崩溃：有的帖子在更新发布之后就变成空白了，刚开始我以为是数据库连接问题，后来在phpMyAdmin中检查了一遍又一遍，甚至直接更改数据库，都没法让文章显示出来，于是又去查codex，看`the_content()`等函数，依旧无果。最后在千般尝试下，发现把文章删除一部分文字之后就可以显示出来了，于是我意识到这与被删的文字有关，但从未听说Wordpress系统对文章内容有审查啊，所以应该不是关键词过滤的问题，我于是一句一句话地删除，看删到哪里之后文章就发不出了，最后统计了一下字节数，但这个数字对解决问题根本没用，因为不能因此就避免长文章。

我想来想去，想到了可能是插件的问题，由于需要“头文字”效果，我安装了TinyCode插件，它的内部用到了WP的shortcode。在将TinyCode禁用的情况下，长文章可以显示，问题便找到了：出在shortcode上。继续Google，发现几个月前有人出现了类似的问题，一位德国高手提供了解决方案，修改`/wp-includes/shortcodes.php`文件。找到：

```php
function get_shortcode_regex() {
  global $shortcode_tags;
  $tagnames = array_keys($shortcode_tags);
  $tagregexp = join( '|', array_map('preg_quote', $tagnames) );
  
  return '\[('.$tagregexp.')\b(.*?)(?:(\/))?\](?:(.+?)\[\/\1\])?';
}
```

将正则表达式替换为：

```php
  return '\[('.$tagregexp.')\b([^\]]*?)(\/)?\](?:(.+?)\[\/\1\])?';
```

这样问题便解决了。Wordpress这么完善的系统也会有Bug……
