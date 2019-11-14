---
title: price.ani()
subtitle: Stock prices of Vanke
date: '2017-04-04'
slug: price-ani
from_Rmd: yes
---
Demonstrate stock prices in animations

This function can display the frequencies of stock prices in a certain time
span with the span changing.
 

```r
library(animation)
## see more examples in ?vanke1127
price.ani(vanke1127$price, vanke1127$time, lwd = 2)
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/price-ani/demo-a.mp4" /><p>plot of chunk demo-a</p></video>
