---
title: Terrible Functional Data Analysis?
date: '2007-12-20'
slug: terrible-functional-data-analysis
---

Today I read a Chinese paper about the "**Function Data Analysis**" and I was greatly surprised at what he described in the paper. Currently I'm not familiar with functional data at all, but he told us such a kind of "data" was just the result of applying a (some) smoothing function(s) to the original _discrete_ observations, so the sample points became _continuous_ (actually they became _functions_). These smoothing functions might either be Fourier transformations or B-splines.

I wonder whether there are some rules about the choice of smoothing functions, because if there aren't any, the functional data will be rather free, and I cannot believe such a kind of data can really represent information behind these discrete data points: who knows what happens between two observations?! Only my naive ideas... -_-//

