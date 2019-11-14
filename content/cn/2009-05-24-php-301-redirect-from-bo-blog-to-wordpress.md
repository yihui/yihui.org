---
title: PHP的301重定向（从Bo-Blog搬家到Wordpress的后续工作）
date: '2009-05-24'
slug: php-301-redirect-from-bo-blog-to-wordpress
---

博客搬家之后不可避免会产生一大堆404错误，绝大部分原链接都失效了，不过好在动态网站系统的网址都是有规律的，因此把原来的网址重新定向也很容易，这里简单记录从Bo-Blog搬家到Wordpress的一些301重定向工作。PHP代码写得非常拙劣，各位看官见笑了，写出来为了将来要用到PHP的时候能找找自己以前写的例子。

# 1、RSS Feed：`feed.php`

对现代网民来说，RSS阅读器已经是看网页的必备工具，因此RSS种子的地址几乎是众多网址中最重要的一个。

> 插播不重要的通知：

> 1、本站的RSS地址已经更改为：_[http://yihui.org/cn/feed/](http://yihui.org/cn/feed/)_，评论RSS为：_[http://yihui.disqus.com/latest.rss](http://yihui.disqus.com/latest.rss)_，请Google Reader中的读者即时更换。英文博客也类似，把cn改成en就可以了。
> 2、如果你懒得换也行，反正我已经重定向了。

Bo-Blog的`feed.php`文件在不带参数的时候是博客正文的RSS，带参数`go`的时候可能是评论，也可能是分类目录的RSS，因此需要在WP根目录下建一个`feed.php`文件，里面对参数作简单的判断，把原来的RSS重定向到WP的RSS中。以下代码只是本博客的转向，具体怎么写要根据具体搬家结果分析。

> 我的博客搬家过程中，分类数字2不知为何被搬家程序略过了，因此当分类数字为2的时候特殊处理，否则从原来的`go`参数中提取分类数字，传给WP的`cat`参数。

```php
<?php
header("HTTP/1.1 301 Moved Permanently");

if(!isset($_REQUEST["go"])){
	header("Location: http://$_SERVER[HTTP_HOST]/cn/?feed=rss2");
} else {
	$tmp = $_REQUEST["go"];
	if ($tmp == 'comment') {
		header("Location: http://$_SERVER[HTTP_HOST]/cn/?feed=comments-rss2");
	} else if (stripos($tmp, '_')) {
		$tmp = end(explode('_', $tmp));
		if ($tmp == '2') {
			header("Location: http://$_SERVER[HTTP_HOST]/cn/?feed=rss2");
		} else {
			header("Location: http://$_SERVER[HTTP_HOST]/cn/?feed=rss2&cat=".$tmp);
		}
	}
}
?>
```

# 2、博客阅读页面：`read.php`

由于在Bo-Blog系统中我使用了链接地址优化（Rewrite），而搜索引擎收录的既有优化地址，也有动态地址，因此要判断一下地址究竟是哪种类型，然后把参数提取出来，传给WP。含有htm的地址是优化的地址，从中提取`.htm`之前的数字传给WP的`p`参数就可以到新的页面地址了。

> 英文博客搬家过程中，日志的数字ID和新系统对不上，那些ID>2的日志都被`+=1`了，所以中间对英文日志ID作了特殊处理。变量`$prefix`用来判断是中文还是英文站。

```r
<?php
header("HTTP/1.1 301 Moved Permanently");

$info = ($_SERVER["REQUEST_URI"]) ? $_SERVER["REQUEST_URI"] : $_ENV["REQUEST_URI"];
$prefix = substr($info, 1, 2);
$entry = array_keys($_REQUEST);

if(strpos($info, 'htm')) {
	$tmp = pathinfo($info, PATHINFO_FILENAME);
	if ($prefix == 'en') {
		if ($tmp > 2) {
			$tmp += 1;
		}
	}
	header("Location: http://$_SERVER[HTTP_HOST]/".$prefix."/?p=".$tmp);
} else {
	if(count($entry) > 0) {
		$tmp = $entry[0];
		if (stripos($tmp, '_')) {
			$tmp = end(explode('_', $tmp));
		}
		if ($prefix == 'en') {
			if ($tmp > 2) {
				$tmp += 1;
			}
		}
		header("Location: http://$_SERVER[HTTP_HOST]/".$prefix."/?p=".$tmp);
	} else {
		header("Location: http://$_SERVER[HTTP_HOST]/".$prefix."/");
	}
}
?>
```

# 3、标签页面：`tag.php`

我觉得如果没有标签的话，这世上的网页会减少一半。用`site:`命令在Google中一看就知道，一个小破站，却有几千个页面被搜索引擎收录，而真正的日志不过上百篇而已，那多出来的页面几乎都是各种导航页面，其中就包括标签导航。鉴于标签这么重要，原来的`tag.php`自然要加上、改写一下了。

> 在我原来的系统中，由于标签是空格分隔，导致我只好以下划线`_`把一些英文字句连起来，现在WP中是以逗号分隔，而且标签有别名（空格被替换为-），因此原来的标签中，下划线要被替换为-，所以用到了`str_replace()`函数。在重定向之前要严重注意`tag`参数已经被解码了，因此需要重新编码！（即：`urlencode()`）

```php
<?php
header("HTTP/1.1 301 Moved Permanently");

if(!isset($_REQUEST["tag"])){
	header("Location: http://$_SERVER[HTTP_HOST]/cn/");
} else {
	header("Location: http://$_SERVER[HTTP_HOST]/cn/?tag=" .
		urlencode(str_replace('_','-',$_REQUEST["tag"])));
}
?>
```

# 4、其它页面的重定向

我喜欢WP系统的一个重要原因就是它的各个文件分工非常明确，模板系统也是如此，所有的模板系统中都可以用一个`404.php`来出来404错误。除了上面三个重定向之外，大约还剩下70%的页面重定向没有完成（不要惊愕于这个工作的复杂性），如：按日期的归档、精华文章、评论页面、分类显示、附件下载和登录页面等等。由于这些页面一般都是被搜索引擎以静态地址收录的，所以不能像前面那样写PHP文件完成重定向，只能根据网址来逐个判断，把原地址转向新地址。其中有无数的细节要注意，如原来的星标日志对应新系统中的featured分类文章、两个系统的分类ID的对应关系等。综上，这个`404.php`便极度冗长。

> 怎么知道你的网站是否有404错误呢？在WP中，只需要在`404.php`文件中用`mail()`函数往你的邮箱发报告就可以了。我将不能成功重定向的页面都发到`404@yihui.name`了，看看`$_SERVER`变量，大概就知道是哪一页出错了，以及是活人点的链接还是搜索引擎的蜘蛛人在看我的页面。

```php
<?php
$info = $_SERVER['REQUEST_URI'];
$prefix = substr($info, 1, 2);

if (strpos($info, '/index')) {
	header("HTTP/1.1 301 Moved Permanently");
	header("Location: http://$_SERVER[HTTP_HOST]/".$prefix."/");
} else if (strpos($info, '/post/')) {
	header("HTTP/1.1 301 Moved Permanently");
	$tmp = current(explode('_', pathinfo($info, PATHINFO_FILENAME)));
	if ($prefix == 'en') {
		if ($tmp > 2) {
			$tmp += 1;
		}
	}
	header("Location: http://$_SERVER[HTTP_HOST]/".$prefix."/?p=".$tmp);
} else if (strpos($info, '/star')) {
	header("HTTP/1.1 301 Moved Permanently");
	$tmp = $prefix=='cn' ? 618 : 150;
	header("Location: http://$_SERVER[HTTP_HOST]/".$prefix."/?cat=".$tmp);
} else if (strpos($info, '/view')) {
	header("HTTP/1.1 301 Moved Permanently");
	header("Location: http://$_SERVER[HTTP_HOST]/".$prefix."/?feed=comments-rss2");
} else if (strpos($info, '/category')) {
	header("HTTP/1.1 301 Moved Permanently");
	$tmp = explode('_', pathinfo($info, PATHINFO_FILENAME));
	if ($prefix == 'cn') {
		if (count($tmp) > 1) {
			if ($tmp[1] == '2') {
				header("Location: http://$_SERVER[HTTP_HOST]/".$prefix."/");
			} else {
				header("Location: http://$_SERVER[HTTP_HOST]/".$prefix."/?cat=" .
				    $tmp[1]);
			}
		} else {
			header("Location: http://$_SERVER[HTTP_HOST]/".$prefix."/");
		}
	} else {
		$catmap = array('7' => 6, '8' => 7, '9' => 9, '0' => 117, '1' => 11, '2' => 147,
                                          '6' => 12, '10' => 148, '3' => 4, '4' => 8, '5' => 10);
		if (count($tmp) > 1) {
			if (array_search($tmp[1], array_keys($catmap)) !== false) {
				header("Location: http://$_SERVER[HTTP_HOST]/".$prefix."/?cat=" .
				    $catmap[$tmp[1]]);
			} else {
				header("Location: http://$_SERVER[HTTP_HOST]/".$prefix."/");
			}
		} else {
			header("Location: http://$_SERVER[HTTP_HOST]/".$prefix."/");
		}
	}
} else if (strpos($info, '/archive')) {
	header("HTTP/1.1 301 Moved Permanently");
	$tmp = explode('_', pathinfo($info, PATHINFO_FILENAME));
	if (count($tmp) > 2) {
		if (strlen($tmp[1]) == 1) {
			$tmp[1] = '0'.$tmp[1];
		}
		if ($tmp[2] < 2007 || $tmp[2] > 2009) {
			header("Location: http://$_SERVER[HTTP_HOST]/".$prefix."/");
		} else {
			header("Location: http://$_SERVER[HTTP_HOST]/".$prefix."/?m=".$tmp[2].$tmp[1]);
		}
	} else {
		header("Location: http://$_SERVER[HTTP_HOST]/".$prefix."/");
	}
} else if (strpos($info, '/showday')) {
	header("HTTP/1.1 301 Moved Permanently");
	$tmp = explode('_', pathinfo($info, PATHINFO_FILENAME));
	if (count($tmp) > 3) {
		if (strlen($tmp[2]) == 1) {
			$tmp[2] = '0'.$tmp[2];
		}
		if (strlen($tmp[3]) == 1) {
			$tmp[3] = '0'.$tmp[3];
		}
		if ($tmp[2] < 2007 || $tmp[2] > 2009) {
			header("Location: http://$_SERVER[HTTP_HOST]/".$prefix."/");
		} else {
			header("Location: http://$_SERVER[HTTP_HOST]/".$prefix."/?m=".$tmp[1] .
				$tmp[2].$tmp[3]);
		}
	} else {
		header("Location: http://$_SERVER[HTTP_HOST]/".$prefix."/");
	}
} else if (strpos($info, '/attachment')) {
	header("HTTP/1.1 301 Moved Permanently");
	$tmp = pathinfo(urldecode($info), PATHINFO_BASENAME);
	header("Location: http://$_SERVER[HTTP_HOST]/".$prefix."/wp-content/uploads/".$tmp);
} else if (strpos($info, '?tag=')) {
	header("HTTP/1.1 301 Moved Permanently");
	$tmp = '';
	if (isset($_REQUEST["tag"])) {
		$tmp = $_REQUEST["tag"];
	}
	header("Location: http://$_SERVER[HTTP_HOST]/".$prefix."/?tag=".$tmp);
} else if ($info == '/'.$prefix.'/tag/') {
	header("HTTP/1.1 301 Moved Permanently");
	header("Location: http://$_SERVER[HTTP_HOST]/".$prefix."/");
} else if (strpos($info, 'read.php')) {
	header("HTTP/1.1 301 Moved Permanently");
	header("Location: http://$_SERVER[HTTP_HOST]/".$prefix."/?p=" .
		pathinfo($info, PATHINFO_FILENAME));
} else if (strpos($info, 'links.php')) {
	header("HTTP/1.1 301 Moved Permanently");
	header("Location: http://$_SERVER[HTTP_HOST]/".$prefix."/");
} else if (strpos($info, 'cv_yihui')) {
	header("HTTP/1.1 301 Moved Permanently");
	header("Location: http://$_SERVER[HTTP_HOST]/cv/cv_yihui_".$prefix.".htm");
} else if (strpos($info, 'visit.php')) {
	header("HTTP/1.1 301 Moved Permanently");
	header("Location: http://$_SERVER[HTTP_HOST]/".$prefix."/");
} else if (strpos($info, 'securitycode.php')) {
	header("HTTP/1.1 301 Moved Permanently");
	header("Location: http://$_SERVER[HTTP_HOST]/".$prefix."/");
} else if (strpos($info, 'login.php')) {
	header("HTTP/1.1 301 Moved Permanently");
	header("Location: http://$_SERVER[HTTP_HOST]/".$prefix."/wp-login.php");
}

else {

//if(array_search($ext, array('gif', 'js', 'png', 'jpg', 'jpeg', 'css')) !== false) {
if (strpos($info, '/images/js') || strpos($info, '/images/lightbox')
		|| strpos($info, '/images/arrows') || strpos($info, '/template/fighting/')
		|| strpos($info, '/emot/thumbnail/') || strpos($info, '/editor/ubb/')
		|| strpos($info, '/images/r.css') || strpos($info, '/images/others')
		|| strpos($info, '/images/weather') || strpos($info, '/images/weather')
		|| strpos($info, 'jslang.js')) {
	header("HTTP/1.1 301 Moved Permanently");
	header("Location: http://$_SERVER[HTTP_HOST]/".$prefix."/");
} else {
	mail('404@yihui.name',
			"Invalid link: " . urldecode($info),
			'Request page: http://yihui.name' . $info . PHP_EOL .
			 'Referer: ' . $_SERVER['HTTP_REFERER']. PHP_EOL .
			  print_r($_SERVER, true),
			"From: Yihui Xie <xie@yihui.name>");
}

?>

<?php get_header(); ?>

<div id="wrapper">

	<div id="home_content">

		<div class="post">
		  <p>Sorry, I'm changing my blog system now; if the page you are looking for
		  doesn't exist, please visit
		  <a href="http://yihui.name/<?php echo $prefix; ?>/">http://yihui.name/
		  <?php echo $prefix; ?>/</a>.
		  I'll fix the original links soon. Thanks!</p>
		  <p><img src="<?php bloginfo('template_directory'); ?>/images/mal.jpg"
		  alt="a questioning duck" class="errorduck" />
	          </p>
		</div>

		<div class="main_meta">
			<ul>
				<li>Mal the Error Duck says, "Uh oh! 404! That means the page you are
				looking for doesn't exist, at least not anymore."</li>
			</ul>
    <h2>Latest <?php print(isset($getOptions["num_posts"])?$getOptions["num_posts"]:"10"); ?>
        articles</h2>
	<ul>
			<?php get_archives('postbypost',
				isset($getOptions["num_posts"]) ? $getOptions["num_posts"]:10,
				'', '<li>', '</li>'); ?>
	</ul>
		</div>

    </div>

</div>

<?php get_footer(); ?>

<?php } ?>
```

然后就每天看看邮件报告，有没有出现新的404错误，能解决的话就在上面的代码中加上一条`if`语句。

看看，搬个家容易嘛我。
