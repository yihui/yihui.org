---
title: 'Numbers: What You Think Is Not What You Get'
date: '2007-05-07T23:59:22+08:00'
slug: numbers-what-you-think-is-not-what-you-get
---

For example:

```r
> 0.02 / 0.00000000001 - 2000000000
[1] 2.384186e-07
> 1000 * (.15 + .3) - 450
[1] -5.684342e-14
> 0.02/0.00000000001 == 2000000000
[1] FALSE
> 1000*(.15 + .3) == 450
[1] FALSE
```

Yes, this is too old a topic.
