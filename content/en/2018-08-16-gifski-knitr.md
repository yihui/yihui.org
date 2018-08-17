---
title: Create GIFs with gifski in knitr Documents
date: '2018-08-16'
slug: gifski-knitr
---

Last month Jeroen announced [the **gifski** package](https://ropensci.org/technotes/2018/07/23/gifski-release/), which looked pretty cool to me. While thinking about improving the **gganimate** support in **knitr** (per [Thomas's request](https://twitter.com/thomasp85/status/1021456429855780865)), I learned a little more about **gifski**. The usage seems to be quite straightforward to me, so I wrote a hook function in **knitr** today to support this package, which means you can easily create a GIF animation from a code chunk now if you have installed **gifski**, and at least version 1.20.14 of **knitr**:

```r
install.packages('gifski')
if (packageVersion('knitr') < '1.20.14') {
  remotes::install_github('yihui/knitr')
}
```


## Basic usage

To make use of **gifski**, you may set the chunk option `animation.hook='gifski'`. Below is an R Markdown example:

````md
```{r, animation.hook='gifski'}
for (i in 1:2) {
  pie(c(i %% 2, 6), col = c('red', 'yellow'), labels = NA)
}
```
````

This will produce the "Pac man" below (assuming the output format is HTML):

![A gif animation of Pac man](https://user-images.githubusercontent.com/163582/44246516-30c93000-a1a4-11e8-8aa5-8876e51a227f.gif)

## Customization

The main things you may want to tweak for the GIF animation are perhaps the dimension (controlled by `fig.width` and `fig.height`, or `fig.dim`), and `interval` (the delay between frames), e.g.,

````md
```{r, animation.hook='gifski', interval=0.2, fig.width=4}
for (i in 1:2) {
  pie(c(i %% 2, 6), col = c('red', 'yellow'), labels = NA)
}
```
````

There are other options that you can customize, but I guess you probably don't care (e.g., `dpi`). Note that the graphical device must produce PNG images since **gifski** only supports PNG at the moment, which means the chunk option `dev` must be a PNG device (e.g., `'png'` or `'CairoPNG'`).

## FFmpeg also works

You can also use [FFmpeg](https://ffmpeg.org) to create a GIF animation, e.g.,

````md
```{r, animation.hook='ffmpeg', ffmpeg.format='gif', dev='jpeg'}
for (i in 1:2) {
  pie(c(i %% 2, 6), col = c('red', 'yellow'), labels = NA)
}
```
````

Without setting `ffmpeg.format='gif'`, you will get a video instead (the default format is WebM). Gifski claims to be "the fastest GIF encoder in the universe", and the package **gifski** does not have system dependencies (you don't need to install external software like FFmpeg), so if you want to create a GIF, it is probably the best way to go.

## Please test it yourself

Please help me test the development version of **knitr**, and I'll appreciate your feedback. Many thanks to the R ninja Jeroen Ooms for the **gifski** package! For **gganimate** users, I guess a tighter integration between **knitr** and **gganimate** should be coming soon. [Please stay tuned](https://github.com/thomasp85/gganimate/issues/134).
