---
title: Do You Have to Use FontAwesome or Other Libraries for Web Symbols?
subtitle: Have you considered HTML character entities?
date: '2018-07-11'
slug: character-entity
---

As a software developer, I prefer lightweight stuff and avoid dependencies when possible. Over the years, I have been leaning more and more towards "frugality". I used to be big fan of libraries like jQuery and FontAwesome, but now I rarely use them any more. I started to write vanilla JavaScript after I suddently discovered `document.querySelector()` one day (before that, I thought `$()` was the only way to select a node in the world).

Similarly, I stopped using special libraries such as FontAwesome for icons and symbols after I looked through the full list of [HTML character entities](https://dev.w3.org/html5/html-author/charref). Yes, this list of symbols is much shorter than that in FontAwesome, but I often refrain from using fancy symbols, so this list is rich enough for me.

Most of the time, I only need a couple of symbols, so I really don't want to import a full external JS/CSS library. For example, yesterday I wanted to add icons after those external links on [the **rmarkdown** website](https://rmarkdown.rstudio.com), to indicate that they will be opened in new windows. Eventually [I found and added the entity `&boxbox;`](https://github.com/rstudio/rmarkdown/commit/02a87d69bf) (double boxes &boxbox;), which was a perfect symbol for my purpose.

Last year, when I was designing [the hugo-xmag theme](https://xmag.yihui.org) for Hugo, I also got an inspiration from the list of HTML entities: I realized I could easy turn a letter into a Blackletter, e.g., `&Afr;` is &Afr;, and `&Bfr;` is &Bfr;, etc. So the default site name is generated in Blackletter in the hugo-xmag theme. It looked cool to me, and didn't need any third-party dependencies.

Certain HTML entities may not work in all web browsers, but I don't really care. For my personal websites, I have no intention to support legacy browsers.
