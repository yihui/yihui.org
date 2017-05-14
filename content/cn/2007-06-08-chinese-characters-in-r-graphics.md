---
title: Chinese Characters in R Graphics
date: '2007-06-08T23:59:22+08:00'
slug: chinese-characters-in-r-graphics
---

With the help of [Dr. Paul Murrell](http://www.stat.auckland.ac.nz/showperson?firstname=Paul&surname=Murrell), I seem to have solved 90% of the problem. Cheers!

Actually I've never noticed the problem of drawing Chinese characters in a pdf/postscript device until Sizhe LIU brought forward a solution using the package pictex of [MiKTex](http://miktex.org/). I even didn't know such a problem existed then because rarely have I used Chinese texts in R graphics.

In order to use (simplified) Chinese characters in pdf/postscript devices of R graphics system, we need to specify the argument "family" in the function pdf() or postscript(). For instance,

```r
pdf("d:/cn.pdf", family = "GB1")
plot(1, main = "你好")  # use Chinese characters in the main title
dev.off()

postscript("d:/cn.ps", family = "GB1")
plot(1, main = "你好")
dev.off()
```

Usually there'll be no problem with pdf files, but it's a little more complicated for postscript files. If we want to view the ps file normally, the next step is to edit a [ghostscript](http://www.cs.wisc.edu/~ghost/) file named "cidfmap" which exists in a directory like `C:\Program Files\CTeX\gs\gs8.51\lib\`. A line `/BousungEG-Light-GB << /FileType /TrueType /Path(C:/Windows/Fonts/gbsn00lp.ttf) /SubfontID 0 /CSI [(GB1) 2] >> ;` should be appended to that file in order that [ghostscript](http://www.cs.wisc.edu/~ghost/) knows how to find the font BousungEG-Light-GB, which needs to be downloaded and installed from <ftp://ftp.gnu.org/pub/non-gnu/chinese-fonts-truetype/> beforehand. After all these work has been done, we can view the ps file using ghostscript now.

Besides, if we want to include such eps files (for R there's no difference between eps and ps) in a LATEX document, there's nothing different with the case when we use English graphics except that the dvi files seem to be abnormal. However, we can first compile the document to dvi, then ps, then pdf.  

I'm indeed grateful to Dr. Paul Murrell for his great help.
