---
title: My Trick of Deciding if a Link Should Open a New Browser Tab
date: '2018-09-20'
slug: target-blank
---

Albert Kim [just discovered one way](https://twitter.com/rudeboybert/status/1042418261596545027) to make links open in new browser tabs for R Markdown users: you can add an attribute `target="_blank"` after a link, e.g., `[example website](https://example.com){target="_blank"}`.

## You should thoroughly learn Pandoc's Markdown

[No matter how many times](/en/2017/11/thanks-tj-mahr/) I have recommended R Markdown users to read the _full_ Pandoc manual at least once, I still want to recommend it again. You won't really appreciate how powerful Pandoc's Markdown is until you read the full manual once. The [`link_attributes` extension](https://pandoc.org/MANUAL.html#extension-link_attributes) is just one of the many, many, many useful features of Pandoc's Markdown.

## What's `target="blank"`?

In Albert's case, however, you still won't know how to make a link open in a new browser tab unless you understand [what `<a target="_blank">` means in HTML](https://www.w3schools.com/tags/att_a_target.asp). The _two_ prerequisites, reading Pandoc's manual _and_ knowing HTML, is probably why many users couldn't figure out how to write a URL in Markdown to be opened in a new tab.

## The real tricky issue

Pure technical issues are often relatively easy to resolve. Things will become complicated whenever humans are involved.

As I expected, there will be people who hate links that always open in new tabs, such as [Bob](https://twitter.com/Bootvis/status/1042448271350943749) in the Twitter thread:

> Please don't decide for the user. If I want to open a link in a new tab, my browser makes it easy to do so, and if I want to go back to your document, I use the back button.

Without `target="_blank"`, readers can actually make the decision by themselves. If they do want the link to be opened in a new tab, they can right-click on the link and use the context menu "Open Link in New Tab", or hold a key while (left-)clicking the link (e.g., on macOS, hold `Command`). This is no big deal^[It might be tricky or impossible on mobile devices where you don't have a physical keyboard, though.]. If you force a link to be opened in a new tab, you may offend readers who would rather hit the Back button instead of closing a new tab when they want to leave the new tab.

The benefit of opening a link in a new tab is that _the state of the current page can be preserved_ while you read the page in the new tab. This is not something that the Back button can absolutely guarantee. Many of you may have been warned when you make payments online that you should not use the Back button (because you may end up paying twice). What happens when you hit the Back button is not necessarily just to bring you back to the previous page.

With that in mind, opening a link in a new tab may sound like a good idea (at least it never hurts technically), but as I mentioned in [a previous post](/en/2018/09/notebook-war/), it is easy to overdo good ideas. Users may hate it when too many new tabs/windows are opened from your web page.

## What on earth do new tabs indicate?

Let's back up a little from the technical stuff and think more about the core problem: what do new tabs mean, and when are you most likely to open a link in a new tab?

There may not be a universal answer that satisfies everyone, but to me, a new tab means _a new context_. Then the question becomes, which links are more likely to take the readers to new contexts? I tend to think that an _external_ URL indicates a new context. By "external URL", I mean a URL that takes you to a different website. Roughly speaking, two websites are different if their domain names are different.

## Open external links in new tabs automatically

Finally we are back to the technical world again. On my personal website, I use a few lines of JavaScript to automatically add `target="_blank"` to external links:

```js
(function() {
  var links = document.getElementsByTagName('a');
  for (var i = 0; i < links.length; i++) {
    if (/^(https?:)?\/\//.test(links[i].getAttribute('href'))) {
      links[i].target = '_blank';
    }
  }
})();
```

To fully understand the code above, you have to understand URLs. You may think URLs are simple, but they may not be. People [make mistakes](/en/2018/01/valid-url/) all the time. People [get confused](https://twitter.com/xieyihui/status/1040441928087683072) over and over again. Relative URLs? Absolute URLs? Absolute relative URLs? Protocol-free URLs? You may read my least favorite part of the **blogdown** book to know more: [Appendix B.1](https://bookdown.org/yihui/blogdown/html.html).

![I'm just going to shoot myself](https://slides.yihui.org/gif/shoot-myself.gif)

Long story short, when I add links to my web pages, I omit the protocol and domain in the URLs^[This makes the URLs more portable: when I change my domain name or protocol, I don't need to update these URLs.] if they are internal links to pages that are still on my website (under `https://yihui.org/`), e.g.,

```md
[the knitr website](/knitr/)
```

and I use full URLs for links to other websites, e.g.,

```md
[the rmarkdown website](https://rmarkdown.rstudio.com)
```

This way, I know that URLs starting with `https://` are supposed to be external links, hence I can detect them using the JS regular expression `/^(https?:)?\/\//`, which can match `https://`, `http://`, and `//`. Once I detect a link of which the `href` attribute points to an external URL, I add the attribute `target="_blank"` to it. So whenever you see a new tab after clicking a link on my website, it means you are being navigated to a different website (be prepared for the new context).

## Summary

I presented a way to make links open in new tabs without requiring the author of the web page to hard-code the `target="_blank"` attribute in links, and at the same time, without annoying readers too much (hopefully). The fundamental assumption of this approach is: a different tab == a different context == a different website. Is this a reasonable assumption for everyone? Of course, I'm not 100% sure.

Good software is never about coding alone. It is about coding plus psychology (thinking one step further to minimize the annoyance). Even trivially small problems are worth thinking.
