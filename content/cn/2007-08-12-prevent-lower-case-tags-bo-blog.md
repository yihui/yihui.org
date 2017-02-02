---
title: Bo-Blog系统中Tags的大小写问题解决办法
date: '2007-08-12'
slug: prevent-lower-case-tags-bo-blog
---

在 Bo-Blog 博客系统中，Tags 默认都是被转化为小写形式的，不知道官方为何采取这种限定形式。我感觉大部分程序语言都是区分大小写（Case Sensitive）的，所以这种限制真是很奇怪。特别是有些专有名词根本就不能小写，看着 "odbc" "latex" "windows" 等写法我就会觉得不舒服。

这个问题也不难解决，花几秒钟Google一下，查出来PHP的大小写转换函数为 `strtolower()` 和 `strtoupper()`，再花几秒钟看看提交文章的这个表单（Form）中元素的 id（是 `$tags`），然后到 PHP 源文件中搜索一下 `$tags`，马上就找到了转换小写的地方：在 `admin/cp_edit.php` 的第344行有一句 `$tags_array=@explode(' ', strtolower(trim($tags)));`，把这里的小写函数去掉即可。

