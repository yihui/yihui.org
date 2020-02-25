---
title: Quick Notes on Some rstudio::conf(2020) Talks after I Watched the Videos
date: '2020-02-25'
slug: rstudio-conf-videos
---

Last week I finished watching the videos of talks that I was interested in but missed at rstudio::conf(2020). Now I'm writing down some quick notes and random thoughts. The list of talks below has no particular order.

- [**Open Source Software for Data Science - J.J. Allaire**](https://resources.rstudio.com/rstudio-conf-2020/rstudio-open-source-software-for-data-science-j-j-allaire)

    This talk triggered some of my thoughts. I have always been pround of RStudio for its deep commitment to open source. I feel one obvious thing that people often ignore is that open source developers need to eat and live---they are also humans. Open source is free as in both speech and beer. "Free as in beer" can be a substantial challenge to open source developers to make a living, which is perhaps why we often see open source projects are side jobs of developers in their spare time. In 2014 (when I was still very cynical), [I wrote on Twitter](https://twitter.com/xieyihui/status/449309622025740289):
    
    > "THOU SHALL NOT BECOME RICH", as if GPL had said.
    
    I don't remember whose or which tweet motivated me to say that. I guess it was a certain tweet of John Myles White (he also retweeted mine later). I said that because I felt some people were so unreasonable that they thought open source developers had to live a poor life, and were not allowed to earn money out of their work. That was unfair.
    
    I have been a long-time admirer of JJ. It is rare to see someone who is both a visionary entrepreneur and an excellent open source software developer. I'm very grateful that I have been given the chance to live a decent life while doing 100% open source. I'm excited that RStudio [has become a PBC](https://blog.rstudio.com/2020/01/29/rstudio-pbc/), which is a much stronger guarantee for our commitment to open source in the future.

- [**Styling Shiny apps with Sass and Bootstrap 4 - Joe Cheng**](https://resources.rstudio.com/rstudio-conf-2020/styling-shiny-apps-with-sass-and-bootstrap-4-joe-cheng)

    I watched this talk mainly because Joshua Goldberg said to me later that "Some people can try to be funny, while some people are inherently funny, and Joe is inherently funny." Then he repeated one funny conversation in the talk:
    
    > Audience: ...
    
    > Joe: Oh, increase the font size?
    
    > Audience: Thank you!
    
    > Joe: I didn't know if that voice was coming from inside my head. So thanks.
    
    > [Laughter]
    
    > Joe: Yes, mother?
    
    > [Laughter]

    Joe is very capable of making instant fun during a talk. I'm not very good at this. I need to prepare the fun. I can often think of a much better and funnier answer after the talk, and regret not having given the better version. For example, next time if someone asks me "What's UpDog?" again after [my talk](/en/2020/02/rstudio-conf-2020/), I'd answer "Not much, what's up with you? And by the way, I'm not a dog."

    Anyway, transitioning from Bootstrap 3 to 4 will be the next big thing in R Markdown, too. Joe and Carson have done a huge amount of work behind it. I really appreciate it.

- [**Becoming an R blogger - Rebecca Barter**](https://resources.rstudio.com/rstudio-conf-2020/rebecca-barter)

    I always strongly encourage people to build their personal websites (and write blog posts if possible), and I'd also recommend that you watch this lightning talk. I don't think I knew Rebecca before, but after I watched it, it suddenly occurred to me that Bin (Yu) once mentioned her to me. I dug out the email and it was her indeed.
    
    In her blog post "[Becoming an R blogger](http://www.rebeccabarter.com/blog/2020-02-03_blogger/)", she listed 4 reasons to start a blog, and a bonus reason---somone might send you a nice email. So I sent her a nice email after I read her post. Of course, she was absolutely correct.

- [**Making a tidy dress - Amelia McNamara**](https://resources.rstudio.com/rstudio-conf-2020/lightning-talk-dr-amelia-mcnamara)

    This lightning talk is an unusual one but also very interesting and inspiring. I wrote the **knitr** package, but I have no real knitting skills. It was refreshing to see how a dress was made. The hex logos is only one obvious highlight of the dress. The other highlight is that the dress has pockets!!

    In this talk, I learned the correct pronunciation of "sew" for the first time. It had [surprised Maëlle Salmon, too](https://twitter.com/ma_salmon/status/1229821025342324737). Then a few other people became interested in watching the talk just because they started to doubt if they knew how to pronounce "sew".

- [**R for Graphical Clinical Trial Reporting - Frank Harrell**](https://resources.rstudio.com/rstudio-conf-2020/r-for-graphical-clinical-trial-reporting-frank-harrell)

    I wish I'd be as good at embracing new technologies as [Frank](https://www.fharrell.com) when I'm his age. I know he has been almost a lifetime LaTeX user, but he also quickly adopted HTML output formats from R Markdown. I find it amazing that as the founding Chair of the Department of Biostatistics at Vanderbilt, he still often asks technical questions on Stack Overflow (just a few days ago I saw him ask a **blogdown** question here). I thought people in such high positions would no longer be interested in software problems.

- [**We're hitting R a million times a day so we made a talk about it - Heather Nolis & Jacqueline Nolis**](https://resources.rstudio.com/rstudio-conf-2020/we-re-hitting-r-a-million-times-a-day-so-we-made-a-talk-about-it-heather-nolis-dr-jacqueline-nolis)

    The next time when someone says R can't be used in production again, I'll send them this video.

- [**Flipbooks - Evangeline Reynolds**](https://resources.rstudio.com/rstudio-conf-2020/flipbooks-evangeline-reynolds)

    Simple yet creative idea. Great implementation. The **flipbookr** package inspired me of another idea, and I'll spend more time on thinking about it. It might become another exciting and useful R package.

- [**Using R to Create Reproducible Engineering Test Reports - Braulio Cuandon & Ana Alyeska Santos**](https://resources.rstudio.com/rstudio-conf-2020/using-r-to-create-reproducible-engineering-test-reports-braulio-cuandon-ana-alyeska-santos)

    I watched this talk both in awe and with sympathy---in awe because they did such an incredible job to make the Word output from R Markdown compliant to their company and FDA regulatory standards (by post-processing Word as XML documents), and with sympathy because the standards sounded incredibly strict. If I heard them correctly, some "standards" seemed to be purely cosmetic, which reminded me of the paper by LeBlanc et. al: [Scientific sinkhole: The pernicious price of formatting](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0223116).

- [**3D ggplots with rayshader - Tyler Morgan-Wall**](https://resources.rstudio.com/rstudio-conf-2020/3d-ggplots-with-rayshader-dr-tyler-morgan-wall)

    To me, this is the most visually appealing talk of the conference. Tyler also did [an awesome job](https://resources.rstudio.com/rstudio-conf-2019/3d-mapping-plotting-and-printing-with-rayshader) at the last year's rstudio::conf.

- [**`livecode`: broadcast your live coding sessions from and to RStudio - Colin Rundel**](https://resources.rstudio.com/rstudio-conf-2020/lightning-talk-colin-rundel)

    From the technical perspective, this was the talk that I loved the best. As I mentioned [in a post in 2018](/en/2018/01/back-to-dt/), I think **httpuv** is one of the most undervalued R packages. It was created mainly because of **shiny**, but its possible applications can be far beyond **shiny**. I was only aware of two substantial applications: **plumber** and **fiery**. Colin's **livecode** package was the fourth most interesting application of **httpuv** that came to my attention. I believe it will be extremely useful in teaching. As I mentioned to Colin [on Twitter](https://twitter.com/xieyihui/status/1230161301420347394), I felt some [hard dependencies](https://github.com/rundel/livecode/blob/master/DESCRIPTION) could be moved to "Suggests" to make this package more lightweight. For example, I don't quite believe **crayon** has to be a hard dependency, and am [still not convinced](/en/2018/11/dependency-winner/) that **glue** is superior than `paste()` or `sprintf()`.

- [**Object of type 'closure' is not subsettable - Jenny Bryan**](https://resources.rstudio.com/rstudio-conf-2020/object-of-type-closure-is-not-subsettable-jenny-bryan)

    A clever title, apparently. This talk resonated very well with me, and I encourage all R users to watch it. It will be tremendously helpful if you learn some basic debugging skills, and more importantly, learn how to report bugs appropriately. I think it resonated well with me because I'm a developer, and have gone through the pain of having too little information to answer a user's question or bug report for numerous times.

- [**Lessons about R I learned from my cat - Amanda Gadrow**](https://resources.rstudio.com/rstudio-conf-2020/lightning-talk-amanda-gadrow)

    Adorable, amusing, and useful. Let's thank Amanda's cat.
    
    ![Thank you, kitten!](https://slides.yihui.org/gif/cat-hands.gif)

- [**How to win an AI Hackathon, without using AI - Colin Gillespie**](https://resources.rstudio.com/rstudio-conf-2020/how-to-win-an-ai-hackathon-without-using-ai-colin-gillespie)

    Before you build the models and jump on AI, ask yourself again if you are solving the right problem. Do you want to predict a future leakage, or reduce the cost of repairing the leakage? They are different problems, and the latter probably doesn't really require AI.

- [**Of Teacups, Giraffes, & R Markdown - Desiree De Leon**](https://resources.rstudio.com/rstudio-conf-2020/of-teacups-giraffes-and-r-markdown-desiree-de-leon)

    Sophisticated yet cute. I watched this talk together with my two-year old. He was not even able to count to 20, not to mention standard deviations or histograms, but he cheered at every giraffe in the talk.

- [**RMarkdown Driven Development - Emily Riederer**](https://resources.rstudio.com/rstudio-conf-2020/rmarkdown-driven-development-emily-riederer)

    If you ever work on projects of moderate sizes that involve R Markdown, I highly recommend this talk. It teaches you a range of skills to manage projects of different sizes by incorporating software development best practices.

- [**The Glamour of Graphics - William Chase**](https://resources.rstudio.com/rstudio-conf-2020/the-glamour-of-graphics-william-chase)

    This title is perhaps even cleverer than Jenny's. It is a play on "The Grammar of Graphics." If you don't have much experience in (graphics) design like me, you will learn some simple and effective principles from Will. BTW, Will also has an amazing elegantly designed [personal website](https://www.williamrchase.com) that I recommend you to check out.

If you are interested in other talks from this conference, you may find all of them at https://resources.rstudio.com/rstudio-conf-2020.
