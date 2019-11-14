---
title: 'Help Me: xaringan / remark.js CSS Themes?'
date: '2017-10-03'
slug: xaringan-themes
---

Since I have been fearing that too many people will use the same style for [**xaringan**](https://github.com/yihui/xaringan)-based slides, which will make **xaringan** a boring package, I'm looking forward to more user-contributed CSS themes. Currently, the `css` argument of the output format `xaringan::moon_reader` takes a default theme, and I hope to bundle more themes in this package, so that users can easily choose a theme they prefer. This is similar to [LaTeX beamer themes](https://hartwork.org/beamer-theme-matrix/).

In a previous post "[Why xaringan](/en/2017/08/why-xaringan-remark-js/)", I mentioned John Little created a Duke theme, which is a good example of what I'm looking for. I hope such CSS themes could be provided by **xaringan** (under the directory [inst/rmarkdown/templates/xaringan/resources/](https://github.com/yihui/xaringan/tree/master/inst/rmarkdown/templates/xaringan/resources)) so that a user can specify something like `css: duke` to change the default theme.

I know this will [at least help Mine](https://twitter.com/minebocek/status/915045598956580865).

Anyone?

![Waiting for volunteers](https://slides.yihui.org/gif/questions.gif)

P. S. If you really want to kill time, see if you can "reproduce" a Microsoft PowerPoint style with CSS, or LaTeX beamer. The latter may be more challenging. I'll be waiting for pull requests on Github.

## Appendix: Technical Instructions for Contributors

Before you work on a new theme, please install the development version of **xaringan**:

```r
devtools::install_github('yihui/xaringan')
```

Unless you want to overhaul the default theme ([default.css](https://github.com/yihui/xaringan/blob/master/inst/rmarkdown/templates/xaringan/resources/default.css)), I recommend you to build your theme on top of it. That is, only change a (small) subset of `default.css`, and submit the new CSS rules in your pull request. For example, in `default.css`, the color of links is red(dish):

```css
a, a > code {
  color: rgb(249, 38, 114);
}
```

If you want to contribute a theme with a different link color, your CSS file only needs to include this rule. For example, Alison [contributed](https://github.com/yihui/xaringan/pull/76) the `rladies` theme (`rladies.css`), in which she defined the color to be purple:

```css
a, a > code {
  color: #88398a;
}
```

For users, they can use `rladies.css` to override the link color in `default.css`, e.g., the R Markdown output format settings can be:

```yaml
output:
  xaringan::moon_reader:
    css: ["default", "rladies", "rladies-fonts"]
```

In general, I recommend that you use two CSS files `foo.css` and `foo-fonts.css` to define a theme, where `foo` is your theme name. In `foo.css`, you define all styles except the font styles, and apparently, `foo-fonts.css` is for fonts. This is to make it easier for users to customize fonts, because we often use Google web fonts via `@import`, e.g.,

```css
@import url(https://fonts.googleapis.com/css?family=Yanone+Kaffeesatz);
```

If this is included in the theme base CSS file but users do not want to use the font, it is just a waste of bandwidth (the font will be downloaded every time). For example, you may like the colors of the `rladies` theme, but want to use a different Google web font, you can provide your own CSS file:

```yaml
output:
  xaringan::moon_reader:
    css: ["default", "rladies", "other-fonts.css"]
```

where `other-fonts.css` is a local CSS file that you prepared. Of course, if your theme does not import web fonts, it is totally okay to only use one CSS file.
