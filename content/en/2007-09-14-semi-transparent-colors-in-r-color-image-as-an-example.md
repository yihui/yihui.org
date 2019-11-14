---
title: 'Semi-transparent Colors in R: Color Image as an Example'
date: '2007-09-14'
slug: semi-transparent-colors-in-r-color-image-as-an-example
---

There are many graphical functions offering the availability of the parameter `alpha` which is usually used to specify semi-transparent colors, however, such kind of colors can only be displayed in certain devices, as stated in the help of `rgb()`:

> Semi-transparent colors (`0 < alpha < 1`) are supported only on  some devices: at the time of writing only on the `pdf` and (on MacOS X) `quartz` devices as  well as several third-party devices such as those in packages **Cairo**, **cairoDevice**, **JavaGD** and **RSvgDevice**.

Here is an example illustrating semi-transparent colors in a `pdf()` device:

![Semi-transparent Colors in R: Color Image as an Example](https://db.yihui.org/imgur/U324z.png)

```r 
(tmp = file.path(tempdir(), "alpha.pdf"))
pdf(tmp) # open a pdf device in the temp dir
plot(rnorm(100), ylim = c(-3, 3), xlab = "x", ylab = "y",
   main = "Add a semi-transparent color image to a graph")
image(x = seq(1, 100, length = 20), y = seq(-3, 3,
   length = 20), z = matrix(rnorm(400), 20), col = heat.colors(20,
   alpha = 0.5), add = T) # here we set alpha = 0.5
dev.off()
```

You may try other devices such as `postscript()`, `jpeg()`, or `bmp()`, etc, and you will find `alpha` is not supported there.
