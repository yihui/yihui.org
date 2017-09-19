---
title: 'One Little Thing: knitr::fig_chunk()'
date: '2017-09-19'
slug: knitr-fig-chunk
---

During the dark days when I still enjoyed wrestling with LaTeX, I had a little problem when I was using **knitr** to generate figures automatically: I didn't want the plots to be placed in the middle of R source code (the default behavior of **knitr**), but in separate `figure` environments outside the code chunks. For example, for a code chunk below:

```r
plot(cars)
summary(cars)
```

I can only insert it in a `figure` environment in LyX if I also want to insert a figure caption in LyX (I can use the chunk option `fig.cap` but I prefer seeing captions in LyX). The default output after I compile the LyX document will look like this:

```tex
\begin{figure}

\begin{verbatim}
plot(cars)
\end{verbatim}

  \includegraphics{figure/cars.pdf}

\begin{verbatim}
summary(cars)
\end{verbatim}

  \caption{A scatterplot.}
\end{figure}
```

And what I really want is this:

```tex
\begin{verbatim}
plot(cars)
summary(cars)
\end{verbatim}

\begin{figure}
  \includegraphics{figure/cars.pdf}
  \caption{A scatterplot.}
\end{figure}
```

This problem could be solved if I could specify where exactly to insert the plot. I came up with a solution (`knitr::fig_chunk()`), but ended up not using it, since I came up with an uglier solution that was more automatic and required me to type less. You wouldn't believe [how ugly it was](https://github.com/yihui/knitr-book/blob/8e16b897243f8b0a6962b7d8d4ad8b1522c4d41d/DDR-Yihui-Xie-Chap1-3.Rnw#L61), but it worked well. Perhaps I'm the only one who can understand and use this solution.

The original solution remained unused [for three years](https://github.com/yihui/knitr/commit/b26ceacfc248d6a4e784e44b398ae35e4faa558e) until today, when I saw a [StackOverflow question](https://stackoverflow.com/q/46301117/559676) on **blogdown**. Basically the OP was asking how to place a figure inside a Hugo shortcode `{{< figure >}}` instead of the usual Markdown code `![]()` for images (or HTML code `<img>`). One possible way is to generate the plot but hide it from the chunk output, and retrieve its path later. That gives you the complete freedom to insert the plot anywhere you want in the document.
