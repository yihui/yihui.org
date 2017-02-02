---
title: animation更新1.1-5，及彻底删除Git文件历史记录的办法
date: '2010-12-25'
slug: animation-update-1-1-5
---

圣诞节上传了animation v1.1-5到CRAN FTP，不过估计管理员都度假去了，要等一阵子才能放出来了。这次更新主要有两个变化：一是增加了命名空间（NAMESPACE），这玩意儿是我以前没太搞明白的东西，现在明白它的优势了（控制哪些对象是对用户可见的）；二是把`saveLatex()`函数大幅度改写了一下，尤其是用“黑魔法”让它能自动应付Sweave，如果它探测到自己是在Sweave环境中，那么会自动根据代码段的标签和前缀生成动画文件并插入LaTeX文档，而且有选项`overwrite=TRUE/FALSE`控制是否重画动画（可以看作是最初级的“缓存”方法）。从此以后，在Sweave文档中动态生成动画就方便了，如此一来，也算不辜负这个包被收录在[ReproducibleResearch](http://cran.r-project.org/web/views/ReproducibleResearch.html)的CRAN Task View中。至于怎么在Sweave中生成动画，若有人感兴趣，我也可以下次在统计之都主站上介绍一下，这东西应该对一些人有用。

我一直在找如何在Git中永久删除某些文件（包括它们的历史记录）的办法，这个问题也是花费我时间最多的一个Git问题，所幸最后终于在GitHub的帮助页面“[Removing sensitive data](http://help.github.com/removing-sensitive-data/)”中找到了答案。尽管我并不完全明白工作原理，但好歹这个办法管用了：

    
```bash
## 注意Windows下用双引号
git filter-branch --index-filter 'git rm -r --cached --ignore-unmatch path/to/your/file' HEAD
git push origin master --force
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now
git gc --aggressive --prune=now
```


当时从SVN迁到Git的时候犯了个错误：把整个库都迁过来了（我应该只迁一个子目录），但实际上很多文件都是我不想放到这边来的，比如那些二进制图片文件。它们让整个库的体积增大了太多，而版本控制工具的特点就是记录你对文件的所有操作，包括删除，即使在当前版本中删除了，Git也会在历史记录中记下这些文件，以便随时可以恢复回去。对于这些几十兆的大文件我一直“耿耿于怀”，现在[GitHub上的库](https://github.com/yihui/animation)终于轻松了，大小只有1M了。

