---
title: '"I thought it was obvious to you," he said. "No."'
date: '2017-10-13'
slug: not-obvious
---

When I talked about [the minimal reproducible paradox](/en/2017/09/the-minimal-reprex-paradox/) in a previous post, I meant an example that other people can run or compile. That is one way to tell other people how to reproduce an issue, and it is also the easier way, because everything is contained in one example, and hopefully the issue can be reproduced in a single step. The other way is to clearly state the steps for reproducing an issue, such as [this report](https://github.com/rstudio/blogdown/issues/197). This requires more work of the reporter, but is also an effective way.

One common mistake, however, is that users often provide insufficient information when describing the steps to reproduce an issue. They do not intentionally omit the information, but assume the missing information is "obvious". For example, this morning I tried hard to investigate the issue [rstudio/bookdown#474](https://github.com/rstudio/bookdown/issues/474), because it looked so weird to me. My instinct told me this issue could not possibly happen, because it definitely should not be the default behavior of the function. I had a hard time thinking about possible reasons ([sort of like this](http://heeris.id.au/2013/this-is-why-you-shouldnt-interrupt-a-programmer/)), and tried to reproduce the issue following his steps. But I could not reproduce it.

Eventually I was told that he changed the value of a default argument, which I could not possibly figure out from the verbal description of how to reproduce the issue. Then all mysteries in my mind were gone.

So he thought it should be obvious to me that the argument took a different value. No, it was not. Please do not make this assumption when filing issues.

![How to draw an owl](https://slides.yihui.org/gif/draw-an-owl.jpg)

To clarify, I'm not blaming this user. I can totally understand it. Many users do the same thing. The problem is that there are so many possibilities for software to screw up, so you have to describe everything clearly to eliminate as many possibilities as possible.
