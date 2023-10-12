---
title: Substitute the magrittr Pipe `%>%` with R's Native Pipe Operator `|>`
date: '2022-04-28'
slug: magrittr-native-pipe
---

R 4.1.0 has added a native pipe operator `|>` to base R. If you are using the
**magrittr** pipe `%>%` and want to switch to `|>` in your R scripts (you do not
have to), I have a quick function `formatR::tidy_pipe()` that can help you
substitute `%>%` with `|>` in the RStudio editor. All you need to do is open the
R script in RStudio, and run `formatR::tidy_pipe()` in the R console. Then you
will see `%>%`'s are converted to `|>`:

``` r
'%>%' %>%
  c('->', '|>') %>%
  paste(collapse = ' ')
```

<script>
(function() {
  const pre = document.currentScript.previousElementSibling;
  if (pre.tagName === 'PRE') setInterval(function() {
    const el = pre.firstElementChild;
    const f = />%&gt;%</.test(el.innerHTML);
    el.innerHTML = el.innerHTML.replace(f ? />%&gt;%</g : />\|&gt;</g, f ? '>|&gt;<' : '>%&gt;%<');
  }, 2000);
})();
</script>

This function only works with the R script currently opened in the RStudio
editor, but it is definitely possible to remove this limitation (see the end of
this post).

You can also use the function `formatR::tidy_source()` to reformat code,
including substituting `%>%` with `|>`, e.g.,

``` r
formatR::tidy_source('your-code.R', pipe = TRUE)
```

Note that this function does a lot other reformatting, too. If you are not
familiar with it, you may take a look at [its documentation](/formatr/).

P.S. The word "tidy" in **formatR** has nothing to do with Tidyverse. It [came
from 2007](/en/2007/08/tidy-up-your-r-code/) and means reformatting.

## An exercise

If you are interested in helping with extending `formatR::tidy_pipe()`, below is
the basic idea about how it works [under the
hood](https://github.com/yihui/formatR/blob/942bff28/R/tidy.R#L293-L311):

1.  Use `getParseData(parse(text = code))` to get the data about the code.

    ```         
    > formatR:::parse_data(
        "'%>%' %>% c('->', '|>') %>% paste(collapse = ' ')"
      )

       line1 col1 line2 col2 id                 token      text
    1      1    1     1    5  1             STR_CONST     '%>%'
    2      1    7     1    9  2               SPECIAL       %>%
    4      1   11     1   11  4  SYMBOL_FUNCTION_CALL         c
    5      1   12     1   12  5                   '('         (
    ....
    ```

2.  Find the symbols `%>%` in the data, and their row/column indices.

3.  Substitute the `%>%` strings in the original code with `|>` using the
    indices.

The 3rd step can be a little tricky if you use `substr<-` but I have an idea to
make it work. Please feel free to open a pull request [on
Github](https://github.com/yihui/formatR) if you are interested in contributing
(it is okay if you are unable to figure out everything---we can talk on Github).
Thanks!

![Endless pipes](https://slides.yihui.org/gif/repeat-smoke.gif)
