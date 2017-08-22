---
title: Jump-start A Pull Request
date: '2017-08-22'
slug: jump-start-a-pull-request
---

Pull requests (PRs) is my favorite thing about Github.^[Well, I really do not appreciate the name "pull request". It is highly confusing from the perspective of contributors. GitLab has done it correctly: [**merge** request](https://docs.gitlab.com/ee/user/project/merge_requests/)!] I have created and merged numerous PRs over the years. If you are new to PRs and contributing to other people's packages, I strongly recommend you to read the following materials:

- The presentation "[Collaborative Coding](http://cwick.co.nz/talks/collab-code-user17/)" by Charlotte Wickham
- The blog post "[Contributing Code to the Tidyverse](http://www.jimhester.com/2017/08/08/contributing/)" by Jim Hester

Jim's post is certainly not limited to contributing to Tidyverse, but contains rules that can be generally applied to most other open-source projects. I don't have much to add to what he has said, but only one little thing: how to jump-start a pull request, especially for a project that has a relatively large codebase or contributors who are not familiar with your codebase.

Usually I encourage users to submit PRs and try my best to review and improve them if possible. To get them started when I'm busy, I often point out the critical lines of code where they can start hacking. Although it is not my most representative example, [yihui/knitr#1425](https://github.com/yihui/knitr/issues/1425) is the most recent one, in which I asked [@yutannihilation](https://github.com/yutannihilation) to try to fix the issue by himself, and later he came back with [hadley/evaluate#81](https://github.com/hadley/evaluate/pull/81), which I haven't had a chance to review yet.

A more recent and better example is [gohugoio/hugo#3825](https://github.com/gohugoio/hugo/pull/3825), which is my PR to Hugo. To be honest, I know nothing about the Go language, but when I reported the issue [gohugoio/hugo#3824](https://github.com/gohugoio/hugo/issues/3824), the current maintainer of Hugo [@bep](https://github.com/bep) told me the source file I should modify in the Hugo codebase. Fortunately, I know some JavaScript, so I came up with a PR about 20 minutes later, which was merged 3 hours later. This was [my third PR](https://github.com/gohugoio/hugo/pulls?q=is%3Apr+author%3Ayihui+is%3Aclosed) to Hugo.

So you do not really always have to understand a language or codebase to make a contribution. Some problems are small enough to be fixed with only a couple of lines of code, and you can probably do it by yourself before the busy core developers have the bandwidth to process your issues.

Again, please read Charlotte's presentation and Jim's post before making your first PR.
