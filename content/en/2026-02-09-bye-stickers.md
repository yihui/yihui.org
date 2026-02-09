---
title: Bye, Hex Stickers
date: '2026-02-09'
slug: bye-stickers
---

As one small sign of moving towards minimalism, I decided not to make a hex
sticker for the **litedown** package when I started writing it in 2024. To be
precise, I didn't want to make a sticker image (PNG or SVG). I did make
sticker-like ASCII art for the package, which you can find in [the README
file](https://github.com/yihui/litedown). It may look ugly (especially on
Windows), but it's tiny: only 55 bytes in total. I didn't need to use any image
editing software, and it only took me a few minutes to make.

I [used to like](/en/2017/10/the-blogdown-logo/) hex stickers, too, but as the
number of stickers grows over the years, I'm kind of tired of them now (visual
fatigue, aesthetic burnout, whatever you call it), and I'm happy to take one
thing off my list when creating a new package.

When I saw Charlie Gao's announcement of his **secretbase** package [on
Mastodon](https://mastodon.social/@shikokuchuo@fosstodon.org/116013178006345268),
I was amused to find that he also made [an ASCII art
"sticker"](https://shikokuchuo.net/posts/28-introducing-secretbase/) for his
package. High five, Charlie! And congrats on your new package "smaller than most
hex sticker PNGs"!

FWIW, if I remember correctly, Charlie was the first package author to use
**litedown** for package vignettes (e.g.,
[**mirai**](https://cran.r-project.org/package=mirai) and
[**nanonext**](https://cran.r-project.org/package=nanonext)). If anyone else
also prefers a small footprint for their package, **litedown** can significantly
reduce the package size if the package has **rmarkdown**-based vignettes (the
reduction will be particularly significant when a vignette doesn't contain many
images but is mostly plain text).
