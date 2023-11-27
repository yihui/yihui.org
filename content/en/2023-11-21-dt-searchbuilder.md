---
title: 'Help Needed: Making SearchBuilder Work in the Server Mode in DT'
date: '2023-11-21'
slug: dt-searchbuilder
---

Three years ago, Xianying Tan [helped](https://github.com/rstudio/DT/pull/881)
me add the `SearchBuilder` extension of DataTables to the **DT** package. This
extension did not exist when I first started developing **DT**, otherwise I
would not have spent countless hours on creating a variety of filters in **DT**
by myself and make them work in both the client and server modes. This extension
is much, much more flexible than my clumsy "homemade" filters.

Yes, `SearchBuilder` has been made available to **DT** three years ago, but the
problem is that it only works on the client side. That is, if you render a table
in Shiny, you cannot `DT::renderDT(server = TRUE)` and can only do
`server = FALSE`. The filtering logic is not implemented on the server side.

Users have been asking how to make it work in the server mode, and one [asked
again](https://github.com/rstudio/DT/issues/1069#issuecomment-1812854482) last
week. Unfortunately [I do not really have time](/en/2023/05/dt-status/) for this
task, but I think it is an interesting little project, so I'm sharing tips on
how it could be possibly implemented, in the hope that someone could pick it up
and get it done. I do not think it is technically hard, but it definitely
requires some focus time.

Basically, you need to inspect the object `q` during debugging the internal
function `DT:::dataTablesFilter`, and you will see parameters sent from
`SearchBuilder` in `q$searchBuilder`. You need to implement the filters by
dealing with these parameters with R code. Here is how you can get started:

``` r
debug(DT:::dataTablesFilter)

library(shiny)
shinyApp(
  fluidPage(DT::DTOutput('foo')),
  function(input, output) {
    output$foo = DT::renderDT(
      data.frame(
        a = sample(26), b = letters,
        c = factor(rep(c('a', 'b'), 13)),
        d = Sys.Date() + 1:26,
        e = Sys.time() + 1000 * (1:26)
      ),
      options = list(dom = 'Qlfrtip'),
      extensions = c('SearchBuilder', 'DateTime')
    )
  }
)
```

In `DT:::dataTablesFilter`, you can see how I implemented searching, pagination,
and sorting with R code. Similar things need to be done for parameters in
`q$searchBuilder`.

Please let me know if you need more guidance. I'm sure at least a few users will
be grateful if this could be done, and so will I.
