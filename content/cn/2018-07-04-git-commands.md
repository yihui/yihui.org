---
title: 我用过的不常用 GIT 命令集合
date: '2018-07-04'
slug: git-commands
---

以前说过[我很少用 GIT 命令行](/cn/2017/06/git-add/)，多数时间我都用图形界面工具操作 GIT（现在主要用 RStudio 自带的 GIT 界面），我用的最多的命令大概是 `git rebase` 和 `git stash`。过去曾经遇到一些问题需要用到略生僻的命令行，现在汇总一下供自己参考：

- 合并从当前往前 N 条提交记录（这样会丢失提交消息）：

    ```bash
    git reset --soft HEAD~N
    ```

- [把前 N 条记录移动到一个新分支中](http://stackoverflow.com/a/1628584/559676)（实质上是新建分支，然后在当前分支中删除 N 条记录，这些记录会在新分支中被保留下来）：

    ```bash
    git branch newbranch
    git reset --hard HEAD~N
    git checkout newbranch
    ```

- 重命名分支：

    ```bash
    git branch -m old-branch new-branch  # 本地重命名
    # 然后在服务器端删除旧分支并提交新分支
    git remote -v
    git push origin :old-branch
    git branch --set-upstream origin/new-branch
    git push origin new-branch
    ```

- [重命名远端名](http://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes)：

    ```bash
    git remote rename old new
    ```

- 新建一个干净分支（无历史记录）：

    ```bash
    git checkout --orphan newbranch
    git rm -rf .
    ```

- [重命名标签](http://stackoverflow.com/q/1028649/559676)：

    ```bash
    git tag new old
    git tag -d old
    git push origin :refs/tags/old
    git push --tags
    ```

- [撤销上一次操作](http://stackoverflow.com/a/135614/559676)：

    ```bash
    # 先看操作日志，找到想退回的历史记录
    git reflog
    # 假设想退回到 HEAD@{5}，那么就重置到那里
    git reset --hard HEAD@{5}
    ```

- [删除没有进入版本控制的文件](https://stackoverflow.com/q/61212/559676)：

    ```bash
    # 先看一眼欲删除的文件列表
    git clean -n -x
    # 如果确定都可以删掉，那么
    git clean -f -x
    ```
