---
title: 'One Little Thing: knitr::imgur_upload()'
date: '2017-09-15'
slug: knitr-imgur-upload
---

Earlier this year, Nick Tierney wrote a blog post titled "[Magic reprex](http://www.njtierney.com/post/2017/01/11/magic-reprex/)". I strongly recommend to you to read it. The credit mostly goes to [Jenny Bryan](http://www.github.com/jennybc) (for the excellent **reprex** package), but I think this post is worth reading because it shares the joy of discovering little things, which is extremely valuable in my eyes.

Nick mentioned the function `knitr::imgur_upload()`, and this is one of the many little functions that I feel proud of in my packages. I love these little functions because they were relatively simple for me to write (at least the source code is usually very short), but can be surprisingly useful. This function can be used to upload an image file to imgur.com, and it returns the URL of the image.

Jenny discovered this function and made good use of it: when you prepare a reproducible example (reprex), your plots in the example will be automatically uploaded, which makes it really hassle-free to prepare a reprex.

After Jenny finished the **reprex** package, she discovered my `formatR::tidy_eval()` function, which actually used the similar idea as **reprex**. I wrote it a few years ago but just like other little functions, I rarely actively promote them, so unless you read the documentation very carefully, you probably won't notice them. I plan to write more posts in the "One Little Thing" series in the future.

P.S. I wrote the `imgur_upload()` function in early 2012 (a few days after **knitr** was first released to CRAN), when my only choices was the packages **RCurl** and **XML**. If I were to write it today, I'd probably use **httr** or **curl** and **xml2** instead. ~~If you want to rewrite it using these "modern" packages, please feel free to submit a pull request [on Github](https://github.com/yihui/knitr).~~ [Christophe Dervieux has done it](https://github.com/yihui/knitr/pull/1433). Thank you!
