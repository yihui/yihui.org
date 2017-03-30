---
title: ani.options()
subtitle: Set or query animation options
date: '2017-03-29'
slug: ani-options
---

To set and restore animation options later, you have to store the current options.

Here is an example of using the PDF device. Remember to set `ani.type` accordingly.

```r
library(animation)
oopt = ani.options(
  ani.dev = 'pdf', ani.type = 'pdf', ani.height = 5, ani.width = 7
)

# use the Cairo PDF device
# if (require('Cairo')) {
#     ani.options(ani.dev = CairoPDF, ani.type = 'pdf',
#                 ani.height = 6, ani.width = 6)
# }

# don't loop for GIF/HTML animations
ani.options(loop = FALSE)

# don't try to open the output automatically
ani.options(autobrowse = FALSE)

# it's a good habit to restore the options in the end
ani.options(oopt)
```

In most cases, plots are automatically recorded. If you want to save plots by yourself, you may make use of the option `img.fmt`, e.g.,

```r
saveHTML({
  png(ani.options('img.fmt'))
  for(i in 1:5) plot(runif(10))
  dev.off()
}, img.name = 'custom_plot', use.dev = FALSE, ani.type='png',
   description = "Note how we use our own graphics device in 'expr'.",
   htmlfile = 'custom_device.html')
```
