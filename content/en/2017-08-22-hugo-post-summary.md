---
title: Generate A Summary for A Post in Hugo
date: '2017-08-22'
slug: hugo-post-summary
---

While I love Hugo for a lot of things, there are a few that I think can still be improved. For example, the default Disqus template bothered me for a long time. I'm very familiar with Disqus, so I know how to set it up correctly and reasonably using my custom template, but Hugo's default Disqus template could be very confusing to beginners before [version 0.25](https://github.com/gohugoio/hugo/releases/tag/v0.25). Eventually I could not stand explaining it over and over again, so I sent a [pull request #3639](https://github.com/gohugoio/hugo/pull/3639) to Hugo and changed its default template.

Hugo's [content summaries](https://gohugo.io/content-management/summaries/) is another thing that I was not satisfied from the beginning: neither the automatic nor the user-defined summary (`<!--more-->`) looks good in my eyes. I think it can be easily improved with a few little tricks. After I commented on the **blogdown** [issue #92](https://github.com/rstudio/blogdown/issues/92), I think it may be a good idea to explain how I create a summary for a post in Hugo, and the idea can be generalized to other site generators, too. Below is the code to be inserted to a Hugo template (e.g. [_default/list.html](https://github.com/yihui/hugo-xmag/blob/master/layouts/_default/list.html)) where you want to display the summary:^[I broke the 4th line into several shorter lines for readability. You should not actually break this line in Hugo.]

```
{{ with .Description }}
  {{ $.Scratch.Set "summary" (markdownify .) }}
{{ else }}
  {{ $.Scratch.Set "summary"
    ((delimit (findRE "(<p.*?>.*?</p>\\s*)+" .Content) "[&hellip;] ") |
      plainify |
      truncate (default 200 .Site.Params.summary_length)
        (default " &hellip;" .Site.Params.text.truncated ) |
      replaceRE "&amp;" "&" | safeHTML) }}
{{ end }}
{{ $.Scratch.Get "summary" }}
```

It uses an intermediate variable `summary` in [`$.Scratch`](https://gohugo.io/functions/scratch/)^[Why `$.Scratch`? Because you cannot do things like `{{ if cond }}{{ foo := 1 }}{{ else }}{{ foo := 2 }}{{ end }}` in Hugo due to variable scoping issues.] to store the summary. Although we often want to use automatic summaries, there may be cases in which user-defined summaries are more desirable. That is what `{{ with .Description }}` does: if you provide a field named `description` in the YAML metadata, it will be used as the post summary. The automatic summary computed from the 4th line looks a little complicated, but the ideas are:

1. Find all consecutive blocks of paragraphs `(<p>.*</p>)+` from the content, which is an HTML fragment. If there is anything else between two blocks of paragraphs, fill in with "[...]" (i.e., `[&hellip;]`).

1. Strip HTML tags by `plainify`.

1. Truncate the text to 200 characters by default, and this number is configurable throught the site parameter `summary_length` in config.toml, e.g.,

    ```toml
    [params]
        summary_length = 300
    ```

1. If the text is more than 200 characters, append "..." (similarly, this is configurable).

1. `replaceRE "&amp;" "&"` is a hack that I don't know if I should explain. I just want to preserve HTML entities.

I think this approach is better because it only generates the summary from paragraphs, and paragraphs are often more readable as plain text than other HTML elements like headings, code blocks, or bullet lists. All these elements will be substituted by "[...]". The other major advantage is that the length of a summary is fixed, and this is important when you want to show summaries on a grid layout, since all boxes will be approximately of the same size.

I happily came up with this approach when I was designing the [Hugo XMag](https://github.com/yihui/hugo-xmag) theme, and I hope it can be useful to other Hugo users, too.
