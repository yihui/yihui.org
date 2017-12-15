---
title: One Little Thing To Consider When Naming Things (Software)
subtitle: Is it easy to type?
date: '2017-12-13'
slug: typing-names
---

Everyone knows that naming is hard (the other hard thing is cache invalidation). There is a little thing that I guess people often forget to consider when naming things: is the name easy to type?

I have had difficulties with typing a few software package names, and the two most impressive ones are "TeX Live" and "ReporteRs".

For TeX Live, I really wished there were not a space between "TeX" and "Live", i.e., "TeXLive" instead of "TeX Live". The three uppercase letters, T, X, and L, are enough trouble. With an extra space, what you have to do is: press `Shift + t`, release `Shift`, press `e`, press `Shift + t`, release `Shift`, hit the `Space` bar, press `Shift + l`, then finish up `ive`. You see that you hold and release the `Shift` key several times. Without the space, you can type `XL` without releasing `Shift`, which makes it a little easier to type.

Same thing for "ReporteRs". Oh my, the second `R`... It kills me every time. What makes it worse is that there is a lowercase `s` after `R`, so you have to _very quickly_ release `Shift` before typing `s`. I'm so glad that David named the next generation of ReporteRs as "[officer](https://cran.r-project.org/package=officer)".

Last year [I wondered why](https://twitter.com/xieyihui/status/793513354199310337) so many people wrote "LaTeX" as "LaTex", because the latter makes me feel so uncomfortable (even "Latex" will be better). I think [Karl's explanation](https://twitter.com/kwbroman/status/793521169471123456) was very reasonable: it is too much work!

I hesitated for a while before I decided to use the name "[TinyTeX](https://github.com/yihui/tinytex)", but used it anyway because of the strong tradition in the (La)TeX world. Then guess what? [Carl immediately tripped on this name](https://github.com/rocker-org/rocker-versioned/issues/59#issuecomment-349997655), twice. The R package name **tinytex** is all lowercase, though.
