---
title: 'ICERM Reproducibility Workshop: Day 1'
date: '2012-12-10'
slug: icerm-reproducibility-workshop-day-1
---

I'm attending a workshop on reproducibility at [ICERM](http://icerm.brown.edu/tw12-5-rcem) (Brown University) this week. I really appreciate this great opportunity offered by ICERM, [Randy](http://faculty.washington.edu/rjl/) and [Victoria](http://www.stanford.edu/~vcs/).

It is pretty exciting to meet people that you only knew before through indirect ways. One coincidence was that I met [Fernando](http://fperez.org) here (for the first time)! We did not know each other before I wrote the [IPython post](/en/2012/11/ipython-vs-knitr/) back in November, and I did not expect that we would meet each other so soon. Anyway, it is great to see this extremely energetic guy in person. Nerdy as I am, I immediately asked him (did I even say hello?) how IPython saves and displays plots, and he quickly showed me on the whiteboard.

Some simple notes as bullet points:

- One big question about reproducible research is, _where is the reward system_? e.g. why should young researchers spend more time on making papers reproducible instead of publishing more papers? There seems to be no immediate reward (although some [argue](https://plus.google.com/u/0/112929796403983408632/posts/3Ts7zpmnQ8T) that papers with data/code available have higher citation rates)
- You should look at the Fortran code blackened out in [Bill Rider's slides](http://icerm.brown.edu/materials/Slides/tw-12-5/What_does_it_take_to_do_reproducible_computational_science%3F_What_stands_in_our_way%3F_%5D_Bill_Rider,_Sandia_National_Laboratories.pdf); it is not that people do not want to share...
- Victoria has a nice [historical review](http://icerm.brown.edu/materials/Slides/tw-12-5/A_brief_history_of_the_reproducibility_movement_%5D_Victoria_Stodden,_Columbia_University.pdf) of reproducible research
- I learned [MacTutor](http://www-history.mcs.st-and.ac.uk/) from Jon Borwein's talk, which seems to be a good old website like Wikipedia (for Math)
- I enjoyed the talk by David Donoho most; they wrote a paper "Deterministic Matrices Matching the Phase Transitions of Gaussian Random Matrices", and what is truly amazing is that this paper was done through "crowd sourcing"; guess who is the "crowd"? His Stat330/CME362 students (as well as the TA)! They used Dropbox, GIT, [runmycode](http://www.runmycode.org/CompanionSite/site.do?siteId=190) and clusters. The three big points:
  - Math as science: mathmaticians should learn science and scientific publication (emphasis on publishing empirical results)
  - Research as teaching: teaching can be turned into research; see the above paper
  - Code development as science: I especially resonate with this point -- code development actually has mature models and practices for a long time, which should be the ideal (or standard) paradigm of doing science; it is rare to see an open source software package published with one single final version; instead we often see versions (version control and semantic versioning) which mark the progress of the package, and we have a full history of how it was written, but papers almost always only have one version
- I learned [HOL light](http://www.cl.cam.ac.uk/~jrh13/hol-light/) from Tom Hales' talk, which is a computer program for proving theorems (does it help me write my PhD thesis?)
- David Bailey talked about [High-Precision Computation and Reproducibility](http://icerm.brown.edu/materials/Slides/tw-12-5/High-Precision_Computation_and_Reproducibility_%5D_David_Bailey,_Lawrence_Berkeley_National_Laboratory.pdf); I'm not familiar with this area but the talk is very interesting, e.g. a change in the float-point library can lead to different observations of particles in physics (some particles might have "gone" after you replace the library); I did not realize numeric precision has such a profound influence

Keep an eye on the [workshop website](http://icerm.brown.edu/tw12-5-rcem) if you are interested.

BTW, to follow up David's crowd sourcing, my advisor Di Cook did something similar earlier this year but less seriously: the students who took Stat585 at Iowa State collaborated on Github for [a fiction in statistics](https://github.com/dicook/stat585) when we were learning GIT in that class, which was actually a lot of fun...
