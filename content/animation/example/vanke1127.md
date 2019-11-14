---
title: vanke1127()
subtitle: Stock price of Vanke
date: '2017-04-04'
slug: vanke1127
from_Rmd: yes
---
 
Barplots of the stock prices of Vanke Co. Ltd on 2009/11/27 


```r
library(animation)
tab.price = table(vanke1127$price)
plot(as.numeric(names(tab.price)), as.numeric(tab.price), type = "h", 
  xlab = "price", ylab = "frequency")
```

```r
ani.options(interval = 0.5, loop = FALSE, title = "Stock price of Vanke")

price.ani(vanke1127$price, vanke1127$time, span = 15 * 60, lwd = 2)
```

<video controls loop autoplay><source src="https://assets.yihui.org/figures/animation/example/vanke1127/demo-a.mp4" /><p>plot of chunk demo-a</p></video>
