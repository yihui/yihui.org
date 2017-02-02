---
title: Tidy up your R code
date: '2007-08-12'
slug: tidy-up-your-r-code
---

> Update on 2012/03/04: later the idea was turned into a package [**formatR**](http://cran.r-project.org/package=formatR) and many details have been enhanced there. See the [wiki page](https://github.com/yihui/formatR/wiki) for demos.

In the past I used to make use of `source(my_source_file, echo = TRUE, prompt = "")` to "tidy up" my code because it's not convenient for me to type every space between operators, what's more, I have no fixed rules to break a line or make a proper indent. Thus I need a function to automatically "tidy up" my code.

After I read the source code of the function `source()`, I quickly found that the actual workhorse is `parse()`, which can turn your code file into neat expressions, and the rest work is just to extract substrings. Here is a proof of concept:

```r 
tidy.source = function(file = choose.files()) {
   exprs = parse(file)
   for (i in 1:length(exprs)) {
       dep = paste(deparse(exprs[i]), collapse = "\n")
       dep = substring(dep, 12, nchar(dep) - 1)
       cat(dep, "\n")
   }
}
```
