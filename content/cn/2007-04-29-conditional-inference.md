---
title: Conditional Inference
date: '2007-04-29T23:58:53+08:00'
slug: conditional-inference
---

It seems that we've never paid attention to the conditional inference (I mean most students and many teachers in our school). The idea is simple: re-randomize the data and perform tests again. Usually our inferences about data are based on certain distributions, or in other words, on the assumption of known characteristics of the population. Theoretical guys may love assumptions, but it's not the same with people who apply models and methods in practical life.

Re-randomization or permutation is, in my eyes, a strategic thought rather than a simple tactics -- the difference lies in the area of applications (a strategy is universal but a tactics is specific). Therefore we may apply this idea in many classical models and methods such as testing the equality of survival distributions in two or more independent groups in survival analysis, testing the independence of two numeric variables (similar to Spearman's correlation), and testing marginal homogeneity in a complete block design (similar to McNemar test in traditional statistics), etc.

I myself didn't recognize the importance of conditional tests (actually I didn't know there existed conditional tests!) until last winter holiday when I was reading the book "A Handbook of Statistical Analysis Using R" at home. And then I remembered a question raised by my teacher Jingping LI: how to perform a 2-sample location test when the variances of their populations are both unknown and unequal under the assumption of normality? She said she didn't know the answer then. I guess the reason why we feel such questions are difficult is that domestic textbooks of mathematical statistics almost never mention the wide application of conditional inferences.  
