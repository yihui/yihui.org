---
title: R.I.P., Tomas Kalibera
date: '2026-04-14'
slug: tomas-kalibera
---

I hate writing yet another RIP post, but the other day, I learned on
[Bluesky](https://bsky.app/profile/r-foundation.bsky.social/post/3mjehbdittc2z)
that Tomas Kalibera had passed away. I don't really know Tomas well, and have
never met him in person, but I just to write down a couple of things while I
remember them.

My first interaction with Tomas was a small pull request to my **testit**
package in 2016: [yihui/testit#3](https://github.com/yihui/testit/pull/3). He
found that **testit** did not work with the byte-code compiler, and submitted a
fix. He also sent me an email to explain the problem in more detail:

``` md
On Mon, Sep 5, 2016 at 4:22 AM Tomas Kalibera <***@***> wrote:
Hi Xie,

I found that testit does not work with the byte-code compiler (e.g.
when running tests for leaflet). The problem is that the byte-code
compiler requires that packages run with top-level environment set
to the package namespace (this is how it normally happens). I
submitted a pull request for testit which solves this, by using a
customized version of `sys.source()` (**testthat** does a similar
thing to solve this problem).

https://github.com/yihui/testit/pull/3

I am happy to provide more details if needed, and if you wanted to
solve this differently I can give details on how to debug/see the
issue.

Thanks  
Tomas
```

Honestly, my first reaction when I saw the email and PR was: Who is this guy?
How could he find such a deep issue? It turned out I was talking to an R core
member. Wait, an R core member sent me a pull request on GitHub?! [^1]

[^1]: For the record, he beat [Martin](https://github.com/yihui/xfun/pull/66) by
    6 years.

...

As an R user whose native language is Chinese, I especially appreciate his work
on multibyte character encodings on Windows. For me, one of the most exciting
pieces of R news in recent years was the [UTF-8 support on
Windows](https://blog.r-project.org/2020/07/30/windows/utf-8-build-of-r-and-cran-packages/).
I guess many users who mainly work in English may not fully feel what this
meant, but for users whose native language contain multibyte characters, Windows
encoding problems had tortured us for decades.

Tomas was also very responsive on the mailing lists. I remember a thread titled
["R-4.3 version `list.files()` function could not work correctly in
Chinese"](https://stat.ethz.ch/pipermail/r-devel/2023-August/thread.html#82797),
where a Chinese user reported a very bad bug in R 4.3. It was eventually fixed
by Tomas. I was super grateful for his quick action. Again, this was the kind of
work that many people may never notice unless they were directly bitten by the
bug, but it mattered a lot.

I had also meant to reach out to him one day and ask about his experience with
**blogdown**, since the R Project blog is based on **blogdown** and he has been
a prolific author there. I felt he might be happier switching to **litedown**
for writing posts, but now that little thought will remain just a thought.

I do not think I can write a big portrait of Tomas here. What I can say is that,
from my limited interactions with him, he always struck me as deeply competent,
generous with his time, and serious about solving real problems for users. The R
community has lost an important contributor, and users like me have lost someone
we had quietly depended on for a long time without even realizing how much.

Rest in peace, Tomas.
