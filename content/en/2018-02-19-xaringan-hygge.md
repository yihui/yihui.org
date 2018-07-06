---
title: A Twist of Hygge in xaringan
date: '2018-02-19'
slug: xaringan-hygge
---

Claus recently contributed an interesting CSS file to the **xaringan** package. Through his [pull request](https://github.com/yihui/xaringan/pull/113), I learned a lovely new word, "hygge". For those who don't know it, the flavor of Markdown in remark.js, on which **xaringan** is based, supports the syntax `.foo[text]` (translated to `<span class="foo">text</span>`, or `<div>...`), which is very neat. This is the first time a user has contributed some CSS making use of this syntax. I loved his design.

This "theme" (not really a theme) is available with the name "hygge" in the [development version](https://github.com/yihui/xaringan) of **xaringan**, which should be on CRAN soon (v0.6). To enable it, add `hygge` to the `css` option, e.g.,

```yaml
output:
  xaringan::moon_reader:
    css: ["default", "default-fonts", "hygge"]
```

A few screenshots provided by Claus (and [a full example](http://biostatistics.dk/presentations/xaringan/ghoul.html)):

![colored content boxes](https://user-images.githubusercontent.com/6160801/36378678-ffd093f8-157b-11e8-9718-7e4a9faef007.png#border)

![fancy picture effects](https://user-images.githubusercontent.com/6160801/36378683-03114d14-157c-11e8-9646-fe778db21a99.png#border)

I called for help with new CSS themes in **xaringan** [last time](/en/2017/10/xaringan-themes/), and have received a few interesting contributions. Big thanks to those who helped ([Alison for rladies](https://github.com/yihui/xaringan/pull/76), and [Patrick for metropolis](https://github.com/yihui/xaringan/pull/86), etc)!
