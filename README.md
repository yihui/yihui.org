This is a repo to host the (Markdown) source files of [my personal website](https://yihui.org), including my Chinese and English blogs, as well as several project websites (such as [**knitr**](https://github.com/yihui/knitr).) The content of all pages is licensed under [CC BY-NC-SA 4.0](http://creativecommons.org/licenses/by-nc-sa/4.0/).

You are welcome to post comments on my site. To do so, you need to log in using your Github account at the bottom of a page. If you have any other feedback, comments, or questions, please post them to [my Github discussion board](https://github.com/yihui/yihui.org/discussions).

## A technical note

To build the website locally, you must clone this repo with its submodule (use the `--recursive` argument), e.g.,

```bash
git clone --recursive git@github.com:yihui/yihui.org.git
```

The website is built via the R package [**blogdown**](https://github.com/rstudio/blogdown). Please read its documentation for how to use it.

I don't recommend you to study how my website is built, because it is complicated. In particular, the way I manage images is fairly complicated.
