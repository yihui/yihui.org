---
title: A Quick Note On Large 2D Data
date: '2012-10-03'
slug: on-large-2d-data
---

Two months ago I was told [one of](/en/2008/09/to-see-a-circle-in-a-pile-of-sand/) my old blog posts was borrowed to this post: [Finding patterns in big data with SAS/GRAPH](http://blogs.sas.com/content/sastraining/2012/07/27/finding-patterns-in-big-data-with-sasgraph/). I wrote [my blog post](/en/2008/09/to-see-a-circle-in-a-pile-of-sand/) four years ago just for fun. The over-plotting issue is pretty boring to me now, but what caught my attention were:

1. alpha-transparency was a new feature in SAS 9.3 (I found this hard to believe);
2. the SAS code was so much longer (not surprising to me);

Well, I do not care and do not intend to start the boring war. If I were to write that post again, I would add the hexagon plot as yet another alternative.

```r 
library(hexbin)
with(x, plot(hexbin(V1, V2)))
```

![hexbin of the random normal + circle data](https://db.yihui.org/imgur/e5d0J.png)

---

Two personal announcements:

1. I'll be attending the Infovis Week at Seattle from Oct 14 to 17;
2. I'll pay a visit to the Department of Biostatistics at Johns Hopkins from Oct 23 to 24;

I'm happy to meet people nearby during these days. My Seattle schedule is pretty much empty; just let me know.
