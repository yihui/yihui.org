---
title: Insert Google Adsense Code in bbPress Forum
date: '2009-06-04'
slug: insert-google-adsense-code-in-bbpress-forum
---

Currently I haven't found a good plugin to insert Google Adsense code into the bbPress forum (for the `plugin adsense-for-bbpress`, I don't like the idea of posting Adsense code as if it were a post), so I opened the template file `post.php` and manually inserted the code as:

```php 
<div class="threadpost">
	<div class="post">
	<?php
	if ($bb_alt['post'] == '0' || (is_int($bb_alt['post']/2)) && rand(0, 20) == 10) {
	?>
		<span style="float:right;padding-left:1em;">
		<script type="text/javascript"><!--
		google_ad_client = "pub-2679974521646557";
		/* 200x200 @ EN */
		google_ad_slot = "0041982581";
		google_ad_width = 200;
		google_ad_height = 200;
		//-->
		</script>
		<script type="text/javascript"
		src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
		</script></span>
	<?php } ?>
	<?php post_text(); ?>
	</div>
	<div class="poststuff"><?php printf( __('Posted %s ago'), bb_get_post_time() ); ?>
	<a href="<?php post_anchor_link(); ?>">#</a> <?php post_ip_link(); ?>
	<?php post_edit_link(); ?> <?php post_delete_link(); ?></div>
</div>
```

The variable `$bb_alt['post']` has recorded the order of a post as 1, 2, ..., n. My code above makes sure that the adsense code will appear

1. in the top post with probability 100%; (guaranteed by `$bb_alt['post'] == '0'`)
2. randomly in those posts of even-order (`is_int($bb_alt['post']/2)`) with probability 1/21≈5% (`rand(0, 20) == 10`), but this probability depends on the RNG in PHP;

To a statistician, everything is random :-)

