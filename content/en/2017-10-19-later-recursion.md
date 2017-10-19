---
title: Schedule R Code to Be Executed Periodically
date: '2017-10-19'
slug: later-recursion
---

A couple of months ago, while I was trying to implement an alternative approach for LiveReload in **blogdown** ([Section D.2](https://bookdown.org/yihui/blogdown/livereload.html)) using Hugo's built-in server, I played with Joe's **later** package for a little while, and my colleague Gabor gave me an interesting, useful, and elegant tip. I thought it might be useful to other people, too, so I'm writing it down here.

## Motivation

The original problem I wanted to solve was this: Hugo's server can automatically rebuild the site and refresh the web page in the browser when any source files are changed. This is great, and as usual, lightening fast. What is missing, however, is the ability to recompile Rmd files. Of course, Hugo knows nothing about Rmd, so I have to start another process to watch changes in Rmd files and rebuild them.

I can certainly use an infinite loop like `while (TRUE) { watch_and_rebuild() }`, but the problem is that an infinite loop will block the user's R session, i.e., you cannot do anything else in the R console after you start the loop. How can I check for changes in Rmd files periodically and rebuild them when necessary without blocking the R console?

## Recursive `later()`

The solution is `later::later()` + recursion. `later::later()` can schedule a task and run it later. Before the task is executed, you can still use the R console to do other things. The problem is that this task is only executed once. How to execute it periodically? The answer is recursion. Below is a simple example, in which we print the time in the R console every 10 seconds.

```r
print_time = function(interval = 10) {
  timestamp()
  later::later(print_time, interval)
}

print_time()
```

This function will keep running until the R session is terminated or restarted. Every time `print_time()` is called, the current time is printed, and the same task is scheduled again.

![penguins stumbled](https://slides.yihui.name/gif/penguin-stumble.gif)

## Caveats

I don't want to mislead users who do not read the documentation of **later**, so I want to repeat this in [its documentation](https://github.com/r-lib/later):

> [...] scheduled operations only run when there is no other R code present on the execution stack; i.e., when R is sitting at the top-level prompt.

Basically this means you cannot expect the task will be executed precisely every N seconds (e.g., N = 10 in the above example), especially when there is another task that has occupied the R console. This is not a deal breaker in my original problem. I don't need the time to be precise.

## Further reading

If you want to run a job in a new background process, you should definitely try Gabor's [**processx**](https://github.com/r-lib/processx) package. It is extremely powerful. In my own case, I wanted to run the job in the current R process, so I didn't use **processx** directly.
