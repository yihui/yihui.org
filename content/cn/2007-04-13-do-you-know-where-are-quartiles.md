---
title: Do you know where are quartiles?
date: '2007-04-13T23:52:16+08:00'
slug: do-you-know-where-are-quartiles
---

This is a very simple question but it's interesting too. In some very influential domestic textbooks of statistics (e.g. Jia Junping, 2004), the definition for quartiles are not appropriate. I didn't notice this point until a member of [COS](https://cosx.org) raised a question about how to compute quartiles in M$ Excel; he just doubted the results computed by the formula QUANTILE() of Excel according to those famous textbooks: the lower and upper quartiles are respectively defined at (n+1)/4 and 3*(n+1)/4. While I believe [(n+1)/2 + 1]/2 and [(n+1)/2 + 1]/2 are better.

Actually when I made some tests in [R](http://www.r-project.org), Excel, SPSS, Stata and Statistica, I found that all these statistical packages computed quartiles in the latter way except SPSS, which adopted the former way. Just use five numbers from 1 to 5 to test the results: if the lower quartile is 2, then the latter way is used, otherwise 1.5 means the former.

My another interesting finding in SPSS is that it computes quartiles in the former way but draws boxplots in the latter way. Again we may use 1, 2, 3, 4, 5 to confirm it. The quartiles presented in the boxplot are 2 and 4, whereas computed by "Frequencies" are 1.5 and 4.5.  

