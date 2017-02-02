---
title: Find Out Available Usernames with R
date: '2013-01-05'
slug: find-out-available-usernames-with-r
---

> Update on 2013/01/05: Xiao Nan in the comments pointed out that `apply(combn(letters, 2), 2, paste0, collapse = '')` was wrong for all two-letter usernames, and indeed it was. It is not a combination problem. Now I use his elegant `outer()` solution. One can also use `expand.grid(letters, letters)`.

Github [decided](https://github.com/blog/1302-goodbye-uploads) to take off their downloads service, and I was very unhappy with this decision. This means I have to migrate several files to other places, and update links accordingly. I saw [Bitbucket](https://bitbucket.org/) still provides the service, so I want to migrate my files there.

Sadly my name `yihui` was already taken on Bitbucket, so I hoped I could get a short name, which made me think how I could check the availability of a username via programming, and here was my solution with the **RCurl** package:

```r 
library(RCurl)
test_user = function(site = 'https://bitbucket.org/',
                     candidates = c(0:9, letters)) {
  for (i in candidates) {
    if (!url.exists(paste0(site, i))) message(i)
    Sys.sleep(runif(1, 0, .1)) # be nice
  }
}
# examples
test_user()
# two-letter names
test_user(candidates = as.vector(outer(letters, letters, 'paste0')))
# check github
test_user('https://github.com/')
```

As of the time of this blog post, there are no two-letter usernames left on Github, but some are still available on Bitbucket, e.g. `by` and `eq`, etc, and the number `4` is also available.
