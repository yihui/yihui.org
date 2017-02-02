---
title: Eyeball Test to Identify An Unfair Coin (or A False Record)
date: '2008-09-23'
slug: eyeball-test-to-identify-an-unfair-coin
---

The results of two coins which are tossed 200 times respectively are:

    (A)
    11110000000000100000101100000100000101001111001100
    01111110010110110101101001111001100011011101100000
    10001001111110100100001011001011101101110001010010
    01100111111100011100101000101001110011100010100111

    (B)
    01110010010010100010011110010100010011010111001110
    01111011010111101101001000111001101011010101101001
    00101001110110100100001110101101101001110101100110
    01110011110110001110011010111001110011110010100111

Which is the unfair one (or a false record)? In the animation below, x1 denotes the first coin, while x2 is the record of the second coin. The plot in the middle is 1000 simulations from the Binomial distribution with `p = 0.5` and `size = 1`. An equivalent question to the hypothesis test is, which plot looks like the simulation more? Of course we should give a visual definition to "similarity" before comparison. Imagine if you are going to perform a test numerically, which statistic will you choose? For me, at least three options are available:

1. Number of heads (or tails): if too many/few heads (or tails) show up, the coin might be unfair
1. Maximum run length, i.e. maximum number of successive 0's or 1's (e.g. for coin A, there are ten 0's); don't take it for granted that ten successive 0's is a rare event in 200 tosses -- the probability is not `0.5^10`; if the run length is too long or too short, we may consider the coin as unfair
1. Number of changes from 0 to 1 or 1 to 0: if the coin changes too frequently from one side to the other side, it can be regarded as unusual too

Accordingly, we can present these statistics in a visual way. Plot the observed sequences and a simulated sequence as a reference, and compare observed graphs with the reference to see which one is unusual:

1. How many points are in the top (equivalently, bottom)
1. Length of the longest horizontal segment
1. Density of vertical lines

Now watch the Flash animation below ([Fullscreen Flash animation](http://animation.r-forge.r-project.org/swf/fair-coin.swf)):

<embed width="600" height="400" src="http://animation.r-forge.r-project.org/swf/fair-coin.swf" type="application/x-shockwave-flash" />
