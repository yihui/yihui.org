---
title: Getting Rid of the .DS_Store Crap
author: Yihui Xie
date: '2017-09-06'
slug: ds-store-crap
---

When browsing repositories on Github or reviewing pull requests, I often frown upon the `.DS_Store` file, the crap that macOS constantly generates under all folders that you have browsed, just like Windows generates the `Thumbs.db` crap. For myself, I have ignored it globally in GIT:

```sh
$ cat ~/.gitignore_global 
*~
.DS_Store
```

But I still hate it (out of OCD), so I actually set up a cron job to delete it recursively under my home directory:

```sh
$ crontab -l
@hourly find ~ -name ".DS_Store" -depth -exec rm {} \;
```

If you want to install this cron job, you need to type `crontab -e` in the terminal, paste the job, and have fun with the editor that [you cannot quit](https://twitter.com/iamdevloper/status/435555976687923200).
