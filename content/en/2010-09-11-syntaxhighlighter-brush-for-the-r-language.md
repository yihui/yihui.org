---
title: SyntaxHighlighter Brush for the R Language
date: '2010-09-11'
slug: syntaxhighlighter-brush-for-the-r-language
---

Tal Galili requested in the R-help mailing list for a [SyntaxHighlighter](http://alexgorbatchev.com/SyntaxHighlighter/) brush for the R language, so that Wordpress users can highlight their R code easily. I promised to contribute a few minutes on this task, and here is the result:

<script src="https://gist.github.com/1804862.js?file=shBrushR.js"></script>

Hopefully Tal can persuade the Wordpress.com manager to add support for R syntax highlighting, so these users do not need to worry much about the installation and configuration. For Wordpress users, there are a couple of choices to make use of SyntaxHighlighter, e.g. the SyntaxHighlighter Evolved plugin, but I find this plugin somehow out-dated because it is still using an old version of SyntaxHighlighter, and it looks not easy to add support for new languages. Therefore I decided not to use any Wordpress plugins, but to manually add the necessary HTML code in my header and footer; this approach works for any HTML pages.

You need to upload the latest version (3.0.83) of SyntaxHighlighter somewhere first (of course, with the R brush `shBrushR.js` added in the `scripts` directory), change the following paths accordingly and insert them before the `<body>` tag in your HTML page:

<script src="https://gist.github.com/1804862.js?file=brush-r-head.html"></script>

Then add these lines in the footer area (right before the `</body>` tag):

<script src="https://gist.github.com/1804862.js?file=brush-loader.html"></script>

Above is only my configuration; you may refer to the manual of SyntaxHighlighter [for more information](http://alexgorbatchev.com/SyntaxHighlighter/manual/api/autoloader.html). To add those HTML code in your pages, you may modify the theme files (typically the `header.php` and `footer.php`). To make use of highlighting, you need to assign a special CSS class to your `<pre>` tag, e.g.

<script src="https://gist.github.com/1804862.js?file=brush-r-usage.html"></script>

You may double-click on the code to select all of them, and copy them with normally (e.g. with `Ctrl + C`). The old version of SyntaxHighlighter uses a Flash file to copy the code to the clipboard and you have to select the line numbers as well when you only want to select the code; I do not like these features.

Finally, the JS brush file can be improved in a few aspects but in fact I'm not quite good at JS RegExp, so I leave these possible improvements to the readers:

1. highlight the function arguments -- loosely speaking, the pattern is: they are in parentheses `()` followed by `=`; the first argument follows `(` and others follow `,`.
1. highlight the variables -- those strings followed by `<-` or `=` when `=` is not in paretheses.

