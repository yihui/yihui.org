---
title: The Second Pull Request Could be (Much) Better
date: '2018-03-07'
slug: second-pull-request
---

When considering pull requests on Github, we need to keep in mind that even if someone's first pull request is not 100% perfect, his/her second one could be much better (if he/she is willing to continue the contribution). I have observed this phenomenon several times, and that is one of the reasons why I want to carefully review and help with people's first pull requests. I'm looking at the future, instead of only the current pull request.

A fresh example is Leonardo Collado-Torres's [recent (and the second) pull request](https://github.com/rstudio/blogdown/pull/272) to the **blogdown** package, in which he brought a very useful RStudio addin that makes it really neat to upload and insert images to your blog posts:

![The insert image addin in blogdown](https://user-images.githubusercontent.com/2288213/37064786-4dd8f0ee-216c-11e8-950e-875b54338348.png)

This is useful because it saves users from the headache of understanding [the special `static/` directory](https://bookdown.org/yihui/blogdown/static-files.html) in the Hugo system. You just upload your image, and this addin will copy it to the right place and insert the right Markdown or HTML code in your post.

Actually his [first PR](https://github.com/rstudio/blogdown/pull/263) was also very helpful (it fixed a nontrivial bug), but I have to say the second PR looked so exciting to me when I first saw it. Now I miss nothing in WordPress. Many thanks to Leo, [the great hacker](/en/2018/02/bite-sized-pull-requests/).

![That... is... awesome!](https://slides.yihui.org/gif/finally.gif)

P.S. Leo has published [a more detailed blog post](https://lcolladotor.github.io/2018/03/07/blogdown-insert-image-addin/) about this addin.
