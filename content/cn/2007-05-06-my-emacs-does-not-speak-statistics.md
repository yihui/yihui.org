---
title: My Emacs Does Not Speak Statistics :-(
date: '2007-05-06T23:57:41+08:00'
slug: my-emacs-does-not-speak-statistics
---

After more than three hours' efforts I have to give up the complicated configuration of Emacs and ESS. I just downloaded R 2.4.0 again in order to use the function source() which is convenient for "tidying up" my codes. For example, below are my source codes (which look ugly):

```r
y=.1+runif(20,.2,1)
xx=c(1,1:20,20)
yy=c(0,y,0)
plot(xx, yy,type='n',xlab='x',ylab='y')
for (i in 255:0){
  yy=c(0,y-(1-i/255)*min(y),0)
  polygon(xx,yy,col=rgb(1,i/255,0),border=NA)
  Sys.sleep(.05)
}
```

When I use _source()_ in R 2.4.1, they look like:

```r
> source("D:\\Yihui\\R\\gradient.r", echo = T, max = 1000)
> y = 0.1 + runif(20, 0.2, 1)
> xx = c(1, 1:20, 20)
> yy = c(0, y, 0)
> plot(xx, yy, type = "n", xlab = "x", ylab = "y")
> for (i in 255:0) {
    yy = c(0, y - (1 - i/255) * min(y), 0)
    polygon(xx, yy, col = rgb(1, i/255, 0), border = NA)
    Sys.sleep(0.05)
}
```

We can also prevent `>` by setting the parameter `prompt = ""`. From R 2.5.0, the function has stopped tidying up my codes. That's a pity.
