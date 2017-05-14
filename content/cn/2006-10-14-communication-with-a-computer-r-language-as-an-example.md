---
title: Communication with A Computer (R language as an example)
date: '2006-10-14T22:30:46+08:00'
slug: communication-with-a-computer-r-language-as-an-example
---

![](https://www.r-project.org/Rlogo.jpg)

Every now and then, some students ask me about the reason why their programs (e.g. **R**) cannot be executed and errors show up one after another. 

They'll be angry just because **R** doesn't know how to compute **9x** if x=2 (of course 9x equals to 18), **R** doesn't understand inequations like **a<x<b**, and an error will occur in **R** when they use conditions like **if (x=a)**, etc. 

Indeed they are frustrated. They cannot imagine that these _clever_ computers cannot understand so _simple_ words. They are amazed, somehow. 

However, there ARE differences between languages of human beings and computers, which is unavoidable. When we are learning a computer language, I think the teacher should emphasize this point. 

Consequently, there are rules to guide us. Usually we call these "rules" **SYNTAX**. When you understand the syntax of a computer language, you'd get to know why errors occur: **9x** doesn't mean **9*x**; **a<x<b** doesn't stands for **a<x & x<b**; in **if (x=a)**, the expression "x=a" won't generate a boolean value (but here "(x=a)" might return a boolean value using **R**, you may consider about the reason yourself). 

There are too many cases to show the misunderstandings toward computer languages. The other day, two classmates of mine asked me whether **R **can draw a plot for _Pareto distribution_. For me, this is an interesting question, because when they raise this question, I'm clear that they still don't understand a _general_ principle: _how does a program draw a plot?_ If they do, their problem would be just an apple pie because they've already know the pdf/cdf of Pareto distribution. Apparently what they want is just type a command (such as "plot pareto(a)"), then the program will generate a graph for them. 

I don't want write too much on this specified problem. In my opinion, there are some basic facts that we should know clearly about; for example: 

> Your program will **never** generate a real **continuous** object (variable, graph, etc) even though it _seems_ to be continuous. Therefore you may only generate a discrete sequence like seq(1, 10, 0.01), but to generate a continuous variable x on the interval [1, 10] is impossible.

Appendix: 

```r    
> x=2
> 9x

Error: syntax error in "9x"

> 1<x<3

Error: syntax error in "1<x<"

> if(x=2){print("hello")}

Error: syntax error in "if(x="

> 9*x

[1] 18

> 1<x & x<3

[1] TRUE

> if(x==2){print("hello")}

[1] "hello"
```
