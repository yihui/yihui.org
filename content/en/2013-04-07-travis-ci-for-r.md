---
title: Travis CI for R?
date: '2013-04-07'
slug: travis-ci-for-r
---

I'm always worried about [CRAN](http://cran.r-project.org): a system maintained by FTP and emails from real humans (basically one of Uwe, Kurt or Prof Ripley). I'm worried for two reasons:

1. The number of R packages is growing _exponentially_;
2. Time and time again I see frustrations from both parties (CRAN maintainers and package authors);

I have a good solution for 2, which is to keep silent when your submission passes the check system, and say "Sorry!" no matter if you agree with the reason or not when it did not pass (which made one maintainer unhappy), but do not argue -- just go back and fix the problem if you know what is the problem; or use dark voodoo to hide (yes, _hide_, not solve) the problem if you are sure you are right. If you read the mailing list frequently, you probably remember that `if (CRAN)` discussion. The solution in my mind was `if (Sys.getenv('USER') == 'ripley')`.

The key is, do not argue. Silence is gold.

![You shall not pass](https://db.yihui.org/imgur/3mdv0k9.jpg)

The CRAN maintainers have been volunteering their time, and we should respect them. The question is, will this approach scale well with the growth of packages? Or who should be in charge of `R CMD check`?

We, the poor authors, cannot guaranttee that every time our packages can pass CRAN's machines due to all kinds of reasons. Some problems are actually easy to fix without a real human yelling at us. On the other hand, if the package fortunately passes `R CMD check`, we do not really need an email from a real human acknowledging "thanks, on CRAN now".

[Travis CI](https://travis-ci.org/) is an excellent platform for continuous integration of software packages. You do not need to interact with a real person by email -- each time you push to Github, your package will be automatically built and checked. If there are problems, you will be notified automatically.

A similar platform in the R world is [Bioconductor](http://bioconductor.org/checkResults/). It has the best two components in software development: version control (although sadly SVN) and continuous checking. I do not know if CRAN will catch up one day. I'm not very optimistic about it; perhaps a more realistic approach is to start a Google Summer of Code project on introducing R into Travis CI. I have no idea how difficult that will be, but I will definitely be thrilled if it comes true this year.

Anyone?

> Update on 04/16/2013: just to clarify, what Bioconductor does is not strictly continuous integration (yet) in the sense that it builds packages daily instead of immediately on changes.
