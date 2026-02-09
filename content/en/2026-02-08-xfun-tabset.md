---
title: Viewing Nested Lists with `xfun::tabset()`
subtitle: An interactive way to explore complex data structures in R and alternative to `str()`
date: '2026-02-08'
slug: xfun-tabset
customJS: [utils/tabsets.js]
customCSS: [utils/tabsets.css]
---

Complex nested lists in R can be difficult to explore and understand at a
glance. The `str()` function is helpful for examining structure, but large
nested lists can quickly become overwhelming.

While I was writing the [documentation for tabsets](/litedown/#sec:tabsets) in
**litedown**, I almost laughed at myself for the support for *nested* tabsets,
because I had no idea why anyone would want this feature. However, I suddenly
realized that it can be a very useful tool for exploring nested lists in an
interactive way, so I wrote a quick implementation: `xfun::tabset()`.

## Introduction

The `xfun::tabset()` function converts a (potentially nested) list into an
interactive tabset representation in Markdown format. The tab titles are derived
from the names of list members, and the tab content displays the values of those
members. When a list member is itself a list, it is represented recursively with
a child tabset, creating a hierarchical, interactive interface.

The hierarchy of tabs allows you to explore complex nested structures without
being overwhelmed by a long `str()` output. Each level of nesting gets its own
set of tabs, making it easy to navigate through the data. You only see one tab
at a time, and you can click through to explore deeper levels of the structure
as needed.

## Usage

You can pass any object to `xfun::tabset()`, e.g., the `penguins` dataset:

``` r
xfun::tabset(penguins)
```

And it will display the structure of the dataset in a tabbed format like this:

<div class="tabset fullwidth">

- `species`

  ```r
   Factor w/ 3 levels "Adelie","Chinstrap",..: 1 1 1 1 1 1 1 1 1 1 ...
  ```
- `island`

  ```r
   Factor w/ 3 levels "Biscoe","Dream",..: 3 3 3 3 3 3 3 3 3 3 ...
  ```
- `bill_len`

  ```r
   num [1:344] 39.1 39.5 40.3 NA 36.7 39.3 38.9 39.2 34.1 42 ...
  ```
- `bill_dep`

  ```r
   num [1:344] 18.7 17.4 18 NA 19.3 20.6 17.8 19.6 18.1 20.2 ...
  ```
- `flipper_len`

  ```r
   int [1:344] 181 186 195 NA 193 190 181 195 193 190 ...
  ```
- `body_mass`

  ```r
   int [1:344] 3750 3800 3250 NA 3450 3650 3625 4675 3475 4250 ...
  ```
- `sex`

  ```r
   Factor w/ 2 levels "female","male": 2 1 1 NA 1 2 1 2 NA NA ...
  ```
- `year`

  ```r
   int [1:344] 2007 2007 2007 2007 2007 2007 2007 2007 2007 2007 ...
  ```

- `attr(*)`

  <div class="tabset">

  - `row.names`
  
    ```r
     int [1:344] 1 2 3 4 5 6 7 8 9 10 ...
    ```
  - `class`
  
    ```r
     chr "data.frame"
    ```

  </div>
</div>

Note that if the object has attributes, they will be displayed in the last tab
titled `attr(*)` (e.g., names and classes).

By default, `tabset()` uses the `str()` function to display the structure of
bottom-level elements. This gives you a concise summary of what each component
contains. However, you can customize this display by passing a function to the
second argument, e.g.,

``` r
# show the full content of each element instead of the structure
xfun::tabset(penguins, dput)

# show the default print output of each element
xfun::tabset(penguins, print)
```

The power of `tabset()` really shines when working with deeply nested
structures. Consider a recorded plot object, which is the most complicated data
structure I can think of in base R:[^1]

[^1]: When I met Paul Murrell in 2024, I was surprised that he still looked so
    young. If I were to invent a data structure like this by myself, my hair
    would have turned gray long time ago.

``` r
plot(1:10)
p = recordPlot()
xfun::tabset(p)
```

## Generalization

I didn't spend much time on this function, but it definitely has the potential
to be generalized to display richer content in the tabs, such as tables, images,
or even interactive visualizations. As a quick example, we can use the following
function to display numeric vectors as stem-and-leaf plots and factors as
frequency tables:

``` r
xfun::tabset(penguins, function(x) {
  if (is.numeric(x)) stem(x) else {
    if (is.factor(x)) c(table(x)) else str(x)
  }
})
```

I'll leave this as an exercise for readers who are interested in exploring the
possibilities further. If you are curious about how `xfun::tabset()` is
implemented, you can check out its source code, which is actually quite
short.[^2]

[^2]: I love recursion as much as I hate it as much as I love it as... It's
    elegant and powerful, but also hard to wrap my head around at the beginning.

You may also need to read [the documentation on tabsets](/litedown/#sec:tabsets)
in **litedown** to understand the Markdown/HTML structure of tabsets, which is
the basis for this function.

Next time when you want to `str()`, you may consider giving `xfun::tabset()` a
try.
