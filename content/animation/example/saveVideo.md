---
title: saveVideo()
subtitle: Convert a sequence of images to a video by FFmpeg
date: '2017-04-04'
slug: saveVideo
from_Rmd: yes
---


This function opens a graphics device to record the images produced in the
code `expr`, then uses FFmpeg to convert these images to a video.

This function uses `system` to call FFmpeg to convert the images
to a single video. The command line used in this function is: `ffmpeg -y -r <1/interval> -i <img.name>\%d.<ani.type> other.opts video.name`

where `interval` comes from `ani.options('interval')`, and
`ani.type` is from `ani.options('ani.type')`. For more details on
the numerous options of FFmpeg, please see the reference.

Some linux systems may use the alternate software 'avconv' instead of 'ffmpeg'. The package will attempt to determine which command is present and set `ani.options('ffmpeg')` to an appropriate default value. This can be overridden by passing in the `ffmpeg` argument. 
 

```r
library(animation)
oopts = if (.Platform$OS.type == "windows") {
  ani.options(ffmpeg = "D:/Installer/ffmpeg/bin/ffmpeg.exe")
}
## usually Linux users do not need to worry about the ffmpeg
## path as long as FFmpeg or avconv has been installed

saveVideo({
  par(mar = c(3, 3, 1, 0.5), mgp = c(2, 0.5, 0), tcl = -0.3, 
    cex.axis = 0.8, cex.lab = 0.8, cex.main = 1)
  ani.options(interval = 0.05, nmax = 300)
  brownian.motion(pch = 21, cex = 5, col = "red", bg = "yellow")
}, video.name = "BM.mp4", other.opts = "-pix_fmt yuv420p -b 300k")
# higher bitrate, better quality

ani.options(oopts)
```
