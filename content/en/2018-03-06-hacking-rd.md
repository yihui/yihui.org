---
title: Hacking the R (HTML) Help Pages
date: '2018-03-06'
slug: hacking-rd
---

Early in January this year, the curious Colin Fay [discovered with great surprise](https://twitter.com/_ColinFay/status/951819899248283651) that someone managed to insert Clippy (the classic Office Assistant) to the R help page of `writexl::write_xlsx()`!

![Clippy on an R help page](https://pbs.twimg.com/media/DTWLBfhW4AACZGd.jpg:large)

Well, whenever I see hacks that are funny or unbelievable, I'd first guess it would be either Jeroen Ooms or Romain Francois --- who else could be more creative than them in the R community in terms of hacking skills? :) This time [it was the ninja Jeroen](https://github.com/ropensci/writexl/blob/49985cb9ad/man/write_xlsx.Rd#L24-L28). The key was to use `\if{html}{}` to insert _arbitrary_ HTML code to an R help page.

This morning I learned another amazing hack from Noam Ross, and the hack was even deeper and darker, which used `\Sexpr{}` inside `\if{html}{}`. He actually [inserted an HTML widget](https://discuss.ropensci.org/t/1078) (via **DT**) to an R help page!

![Oh my... You hackers are so awesome](https://slides.yihui.org/gif/slow-applaud.gif)

**Update on 2018-08-01**: I discovered [yoni sidi's `<details>` hack](https://twitter.com/yoniceedee/status/1024740274495528960).
