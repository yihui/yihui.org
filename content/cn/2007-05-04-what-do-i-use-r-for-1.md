---
title: What Do I Use R for? (1)
date: '2007-05-04T22:56:58+08:00'
slug: what-do-i-use-r-for-1
---

I decide to write down some interesting daily work I do with R from today on. In the past, there've been many times that I wanted to get _a file list_ containing all the files in a certain directory (folder), but I find it difficult without a special software. Actually it's extremely easy in R; just use the function _list.files()_, e.g.

```r
> list.files("C:\\Documents and Settings\\Yihui Xie\\Desktop")
....
[3] Copula Structure Analysis Based on Robust and - Extreme Dependence Measures.pdf 
[4] Copulae and Their Uses (2002).pdf 
[5] Copulas and Credit Models (2001).pdf 
[6] Correlation--Pitfalls and Alternatives (1999).pdf 
[7] Correlation And Dependence In Risk Management--Properties And Pitfalls (1999).pdf 
[8] Estimation Of Copula Models For Time Series Of Possibly Different Lengths (2001).pdf 
[9] Estimation Procedures for a Semiparametric Family of Bivariate Copulas.pdf 
[10] Financial Risk and Heavy Tails (2002).pdf
....
```

Sure we may write the result into a file. (Use _write.table()_, _write.csv()_, etc.) For Windows users, _choose.dir()_ might be a helpful function to get the path of a folder, so we may as well use _list.files(choose.dir())_.
