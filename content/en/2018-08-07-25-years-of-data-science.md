---
title: Reflections on 25+ Years of "50 Years of Data Science"
author: Anonymous
date: '2018-08-07'
slug: 25-years-of-data-science
---

**Note**: This is a guest post and _not_ written by Yihui. Its author desires to remain anonymous. If anyone would like to contact the author, please contact me (Yihui). And if any statistical sleuths out there determine the author's identity, please refrain from revealing it. Thank you.

---

> _When I was a child  
I caught a fleeting glimpse  
Out of the corner of my eye  
I turned to look but it was gone  
I cannot put my finger on it now  
The child is grown  
The dream is gone  
I have become comfortably numb_

> --- "Comfortably Numb" by Pink Floyd (1979)

## Introduction

I was lucky to attend the RStudio Conference this year, and even luckier to be invited to an impromptu Iowa State University Statistics alumni dinner on Saturday, February 3. Full disclosure: I am not an ISU alumnus, but Di Cook granted me that privilege for the night. During the dinner, I wanted to mention something from the 2016 useR! Conference at Stanford, and I asked Yihui Xie if he was there. My intended benign conversation starter raised a sore point that Yihui explained in his post [My Early Career Crisis (2014 - 2015)](/en/2018/02/career-crisis/). Yes, I am that guy, that "Someone at the table recalled that I missed the useR! 2016 conference at Stanford due to visa issues." The next day, Yihui emailed me to ask me to think about posting my anecdotes on famous statisticians. And now, more than six months later, I'm finally able to put some of my thoughts on paper. Maybe there will be others posts someday too.

## David Donoho 

The anecdotal story I wanted to tell at the dinner was meeting [David Donoho](https://en.wikipedia.org/wiki/David_Donoho) at the 2016 useR! Conference Welcome Reception on Tuesday, June 28, 2016. I was trying to overcome my INTJ Myers-Briggs Type Indicator and "work the room" as best as possible for a math-stats geek with the aid of wine, when I crossed paths with what appeared to be a younger wavy blond-haired, tanned skin California surfer dude-type - not quite [Jeff Spicoli](https://en.wikipedia.org/wiki/Fast_Times_at_Ridgemont_High), but maybe one of the guys in the van - wearing a blue suit and glasses, and I was struck by the apparent dichotomy. Then I looked at his name tag and saw "David Donoho" and immediately made the connection to the paper "50 Years of Data Science" (2015-09-15 version), which I devoured the moment I found it posted online. I had no idea who David Donoho was, but I [loved the paper](http://paperswelove.org/), mainly because it referenced landmark data science papers by four of my statistical heroes:

1. John Tukey: "The Future of Data Analysis" (1962)

2. John Chambers: "Greater or Lesser Statistics: A Choice for Future Research" (1993)

3. Leo Breiman: "Statistical Modeling: The Two Cultures" (2001)

4. William S. Cleveland: "Data Science: An Action Plan for Expanding the Technical Areas of the Field of Statistics" (2001)

So, I just had to corner Donoho, tell him how much I liked his paper, and try to play a game of 20 Questions. As I recall, my opening question was: did you talk to Tukey, Chambers, Breiman, and Cleveland before writing the paper to get their input or perspective? Donoho's reply was something like, "I've known them for years and worked with them." This dumbfounded me - how could a guy who looked so much younger than me possibly work with that generation of statisticians, whose work I studied in grad school nearly 30 years earlier? I just had to pry and asked him how that was even possible [as soon as I could check Wikipedia, I learned that Donoho is 7 years OLDER than me - Palo Alto water must spring forth from the Fountain of Youth]. The details are fuzzy at this point, but Donoho explained that he went to Princeton for his undergraduate degree and worked as a statistical programmer for John Tukey and so was able to work with John Chambers and Bill Cleveland at Bell Labs. I tried to articulate my fan-boy admiration of the Princeton-Bell Labs-Institute for Advanced Study [innovation cluster](https://hbr.org/1998/11/clusters-and-the-new-economics-of-competition), but I'm afraid the wine and warm, dry air were too good. Then I asked how he knew Leo Breiman, and Donoho told me he worked at the University of California at Berkeley while Breiman was there. And then he told me an anecdote that blew my mind: he was sitting in a Berkeley wine bar with [Ross Ihaka](https://en.wikipedia.org/wiki/Ross_Ihaka) and said to him something like: "You know what you should do - rewrite S using a Lisp dialect, like Scheme."

Dang! Not only did Donoho personally know and work with the statisticians whose papers, books, and methods I've read and utilized for nearly 30 years, he put in motion thoughts that led to the creation of R, which I use almost every day! While I certainly didn't know Tukey, Chambers, Breiman, and Cleveland personally like Donoho did, they were key inspirations over my 25+ years of "50 Years of Data Science".

## John Tukey

From what I can determine, [John Tukey](https://en.wikipedia.org/wiki/John_Tukey) spent his entire career simultaneously at Princeton and Bell Labs, and, as his Wiki page attests, his influence on both world-class institutions and the rest of the world was amazing. The more I think about it, the more impressed I am that a very young David Donoho was able to work for John Tukey while attending Princeton in the mid-1970s - was that due to happenstance or planned? I never even heard of Tukey until his name kept popping up in my grad school classes, especially in my Design Of Experiments (DOE) and Exploratory Data Analysis (EDA) classes. My EDA course was based on two books:

1. *Applications, Basics, and Computing of Exploratory Data Analysis* (ABCs of EDA) by Paul F. Velleman and David C. Hoaglin

2. *Graphical Methods for Data Analysis* (GMDA) by John M. Chambers, William S. Cleveland, Beat Kleiner, and Paul A. Tukey (all Bell Labs staff)

The ABCs of EDA was dedicated to John W. Tukey, and both Velleman and Hoaglin were PhD students of Tukey's at Princeton. To implement Tukey's techniques, the book was filled with Basic code and Fortran code, which I knew fairly well at the time - along with Pascal - from my undergraduate studies; however, for the sake of expedience we were able to use Minitab and Minitab macros to do the examples and exercises. 

GMDA was dedicated to "To our parents," while its Preface stated:

> *Without the influence of John Tukey on statistics, this book would probably never have been written. His many contributions to graphical methods, his insights into the role good plots can play in statistics and his general philosophy of data analysis have shaped much of the approach presented here. Directly and indirectly, he is responsible for much of the richness of graphical methods available today.*

So, the name Tukey was ubiquitous for me during that period of my life, and I kept asking myself, "Who is this guy?" It was only later that I learned that the creator, head, and adviser for my statistics program was one of Tukey's PhD students at Princeton, so maybe that explains some of it. Somewhere along the way, I acquired copies of two of Tukey's books *Exploratory Data Analysis* (1977) and *Exploring Data Tables, Trends and Shapes* (1985) edited by David Hoaglin, Frederick Mosteller, and John Tukey, which I use as references from time to time. I even made attempts to reproduce examples using S-PLUS and R, but those attempts kept getting derailed. But I hope someday, maybe in retirement, I can work through those two books cover-to-cover.

Donoho marks the birth of Data Science with the publication of Tukey's "The Future of Data Analysis" paper in 1962, I assume because Tukey implored statisticians to reduce their focus on statistical theory and engage with the entire data analysis process. True confession: this was similar to my thinking when I decided to attend a relatively unknown applied statistics graduate program that offered an industrial co-op position instead of well-known theoretical graduate programs (and likely a Research Assistant or Teaching Assistant position), after being demotivated by theory without application as an undergraduate. Then Tukey reviewed three tools that I don't recall encountering in books or classes:

- Full Normal Rejection (FUNOR)

- Full Normal Modification (FUNOM)

- Freeing Interaction Line from the Error Term (FILLET)

Are there R packages for these?

I think the best part of the 67 page paper is near the end, which I believe is worth repeating for today's Data Scientists, so they can be confident they have the right attitudes, unlike when I was initially learning and practicing statistics:

1. We need to face up to more realistic problems

2. We need to face up to the necessarily approximate nature of useful results in data analysis

3. We need to face up to the need for collecting the results of actual experience with specific data-analytic techniques

4. We need to face up to the need for iterative procedures in data analysis

5. We need to face up to the need for both indication and conclusion in the same analysis

6. We need to face up to the need for a free use of ad hoc and informal procedures in seeking indications

7. We need to face up to the face that, as we enter into new fields or study new kinds of procedures, it is natural for indication procedures to grow up before the corresponding conclusion procedures do so

8. We must face up to the need for a double standard in dealing with error rates, whether significance levels or lacks of confidence

9. We must face up to the fact that, in any experimental science, our certainty about what will happen in a particular situation does not usually come from directly applicable experiments or theory, but rather comes mainly through analogy between situations which are not know to behave similarly

10. We need to give up the vain hope that data analysis can be founded upon a logico-deductive system like Euclidean plan geometry (or some form of the propositional calculus) and to face up to the fact that data analysis is intrinsically an empirical science

## John Chambers

[John Chambers](https://en.wikipedia.org/wiki/John_Chambers_(statistician)) worked at Bell Labs, was one of the original authors of S, and later moved to Stanford. As mentioned in the previous section, I first encountered the name John Chambers from *Graphical Methods for Data Analysis* (GMDA) in my EDA class. GMDA showcased the S language's graphical methods, and our class used Minitab and S on a Unix server to work through the examples and exercises, so this was my first exposure to the S language. This book turned me on to solving problems by visualizing the data. For example, years later I taught a basic statistics class for my employer, and I encouraged students to bring their own data for live problem-solving sessions (I called it "Stump the Chump, er, Statistician," daring them to challenge me in front of the class). One student had a vexing factory problem, and I recommended a simple normal probability plot, which exhibited several vertical lines of data points, indicating the same values to 6+ decimal places were occurring, a statistical impossibility. I asked him to check if they were successive values, and sure enough they were, suggesting the same value was stuck in the buffer and subsequent values were ignored. This simple graph solved the problem in a few minutes that no one else had solved after collecting data for a long period of time. This was just one of many examples of solving problems by organizing and visualizing the data, without requiring any statistical modeling or Design Of Experiments (often after I was really hoping to take the next step and design and analyze a complex DOE).

GMDA became one of those "go to" books where the pages are marked up with pencil scribblings and highlighting, the spine is broken, and pages are about to fall out if I'm not careful. Its methods were especially useful when encountering "real world" data - some from Bell Labs and others used for S, S-PLUS and R examples - that never seemed to follow the normal distribution, unlike the data sets in most other statistics textbooks. Concurrent with my studies, I was lucky to have a co-op assignment that gave me access to an AT&T 3B2 Unix box, so I took advantage of it and wrote some programs with S and Ratfor (Rational Fortran - Fortran with curly braces).

After I graduated I joined a SAS shop for two years. Unlike the wide variety of statistical tools and computing systems available at grad school and my co-op job, we only had two ways to do statistics: mainframe SAS and PC SAS. Still, it had a role in my S journey. My supervisor had budget money left over near the the end of the fiscal year and asked me for ideas on how to spend it, explaining that if he didn't spend it, his budget might get cut. I told him that as a co-op, I used software called STAR (Statistical Reliability Analysis), developed at Bell Labs by Bill Meeker, a professor at Iowa State University and world-renowned reliability statistics expert. Based on Meeker's reputation and desperate to spend money fast, my boss told me to order it. Because I put in the order, AT&T Bell Laboratories sent me a complimentary copy of *The New S Language: A Programming Environment for Data Analysis and Graphics* by Becker, Chambers, and Wilks (1988) with a thank you letter dated 06/19/1990 and a tape drive containing the software. Well, I couldn't install software from a tape; this required IT support. I put in a request. Nothing. No response, not even an estimate of when they might get to it. But we met the objective: spend our entire budget before the end of the fiscal year.

After two years of being a frustrated SAS programmer and mastering the SAS macro language - purely to reduce the amount of SAS code for trivial, repetitive tasks and hand it off to administrative staff - and never getting STAR installed, I left to join a much smaller firm. We didn't have much data, and when we did, I had no statistical software to analyze it and struggled writing statistical programs in C. I heard that S was ported from Unix to Windows and renamed S-PLUS, so I purchased a copy. With the purchase of S-PLUS, I received a second copy of *The New S Language* (now softcover) and a copy of *Statistical Methods with S*, edited by Chambers and Trevor Hastie. Chambers also wrote or co-wrote chapters 1-5 and appendix A. Later I attended a 1-week training course at StatSci, the creator of S-PLUS, in Seattle, WA in 1993. And I have been using S-PLUS and R ever since, but not as continuously as I hoped. I'm still using *Statistical Methods with S* as a reference, and I also purchased Chamber's *Programming with Data: a Guide to the S Language* (1998) and *Software for Data Analysis: Programming with R* (2008). I briefly met Chambers at the 2014 useR! Conference at UCLA and asked about how to obtain data sets from *Statistical Methods with S*, but he told me they are now property of TIBCO, the current owners of S-PLUS - blocked again! [Strangely, at least to me, while cleaning up files on my PC, I found artifacts from the 2001 S-PLUS conference I attended in Philadelphia, PA, and I discovered that John Chambers was an invited speaker, but I have no recollection of that.]

Many years later, finding and reading "Greater or Lesser Statistics: A Choice for Future Research" (1993) based on Donoho's inclusion in "50 Years of Data Science," a theme emerged of dividing statistics into two groups:

1. Greater Statistics: everything related to *learning from data*, from the first planning or collection to the last presentation or report

2. Lesser Statistics: the body of specifically statistical methodology that has evolved with the profession - roughly, statistics as defined by texts, journals, and doctoral dissertations

This puts a name on Tukey's 1962 recommendation to reduce focus on theory - Lesser Statistics - and increase focus on the entire data analysis process - Greater Statistics. Chambers cautioned, "If statisticians remain aloof, others will act. Statistics will lose." This is happening now.

## Leo Breiman

[Leo Breiman](https://en.wikipedia.org/wiki/Leo_Breiman) was referenced in "50 Years of Data Science" for his 2001 paper "Statistical Modeling: The Two Cultures." This paper has been continually referenced in Internet posts since it was published. Breiman was a professor at UCLA, then a consultant, then a professor again at UC Berkeley, where he worked with Donoho. As I recall, I first heard his name in 1988, when I was a co-op statistician and assigned to a cube that had the 1984 book *Classification and Regression Trees* (CART) by Breiman, Friedman, Olshen and Stone sitting on its shelf. I scanned the book and was fascinated by its potential to use the data itself to discover relationships hidden in multivariate data. So I asked around and learned that the company received the book when they purchased the CART software. I investigated how to run it on a time share computer, tried to recreate an example with available data, but nothing happened - I received no output or feedback on errors or file location. So I called IT support, explained the situation, and was mentally crushed after being told they didn't support the software and could not help me. I was beginning to spot a trend: whenever statistical software was involved, there was rarely support from IT. So I had to learn to figure out how to install statistical software myself or give up if I didn't have system administration rights. I needed a Statistician's [Serenity Prayer](https://en.wikipedia.org/wiki/Serenity_Prayer).

Around ten years after discovering CART and being blocked from using it, a former professor of mine recommended *Modern Applied Statistics with S* (MASS) by Bill Venables and Brian Ripley. I immediately bought it (Second Edition at that time), and it quickly become my 'Bible,' and I bought the Third and Fourth Editions as soon as they were published. Because of MASS, I learned about the `tree` method and cross-validation to do something similar to CART. I started using `tree` whenever I could to see if it would identify explanatory variables or interactions. I also learned about Alternating Conditional Expectations (ACE) by Breiman from MASS, and I often applied it, along with the Additivity And Variance Stabilization (AVAS) method, to messy data sets to find transformations that provide a better fit to the data. Due to a great deal of luck, involving the reputation of Bill Meeker at Iowa State University being one of the keynote speakers, I was able to attend the 2001 S-PLUS conference in Philadelphia, PA. As soon as I received authorization to register, I signed up for Brian Ripley's Data Mining tutorial, and took advantage of the opportunity to pick his brain about topics in MASS. When I started to ask about `tree`, he said, "Don't use that - it's flawed. Use `rpart` instead." 

The very next day, I attended a tutorial by Frank Harrell and met Beth Atkinson, the co-developer of `rpart` with Terry Therneau. Even today, the CRAN page for `rpart` states it is, "An implementation of most of the functionality of the 1984 book by Breiman, Friedman, Olshen and Stone." Based on Ripley's advice, I have used `rpart` ever since, and I think it's fair to say I've used CART for the last 17 years, but I wish it was longer.

When "Statistical Modeling: the Two Cultures" was published in 2001 and kept popping up in Internet posts, I knew I had to read it. I learned that Breiman was involved in the development of several other techniques, like Bagging and Boosting. But I assume Donoho included this paper in "50 Years of Data Science" because Bremen recommend statisticians focus less on theory and more on data, like Tukey did 40 years earlier. But Breimen was far more explicit than Turkey when he stated "98% of all statisticians" belong to the Data Modeling Culture (similar to Chamber's Lesser Statistics) and "2% of statisticians, many in other fields" belong to The Algorithmic Modeling Culture (similar to Chamber's Greater Statistics), and that imbalance resulted in three major opportunity costs:

1. Led to irrelevant theory and questionable scientific conclusions

2. Kept statisticians from using more suitable algorithmic models

3. Prevented statisticians from working on exciting new problems

I found ["A Conversation with Leo Breiman"](https://projecteuclid.org/euclid.ss/1009213726), and he was even more explicit when asked to give advice to students studying statistics:

> *I'm torn in a way because what I might even tell them is, "Don't go into statistics," My feeling is, to some extent, that academic statistics may have lost its way... but probably in the end, I would say, "Take statistics, but remember that the great adventure of statistics is in gathering and using data to solve interesting and important real world problems."*

Sure sounds like Data Science to me.

## Bill Cleveland

Like John Chambers, I was introduced to [Bill Cleveland](https://en.wikipedia.org/wiki/William_S._Cleveland) from *Graphical Methods for Data Analysis* (GMDA) and *Statistical Models with S*, where he co-wrote Chapter 8: Local Regression Models. And his papers were often referenced in Edward Tufte's visualization books with respect to pie charts and small multiples. I emailed him sometime after 2001 to ask about data sets to reproduce examples in GMDA. He didn't have the data sets available but recommended his other books *Visualizing Data* (1993) and *The Elements of Graphing Data* (1994), where the data sets were available on his web page. So I purchased them both and read *The Elements of Graphing Data* cover-to-cover, thanks to Andrew Gelman making his [Communicating Data and Statistics course syllabus](http://andrewgelman.com/wp-content/uploads/2017/06/communication_course_outline.pdf) available online. And as a S-PLUS user since 1993, I used Trellis graphics whenever base graphics were insufficient and then used the **lattice** version after switching to R (but I use `ggplot2` for most graphics now). And I use loess/lowess all the time, especially now with **ggplot2** `geom_smooth()` making it so easy.

Cleveland worked at Bell Labs with Tukey, Chambers and Donoho (as an undergrad student at Princeton), then he moved to Purdue University, which I only discovered when I was wandering the halls of their statistics department circa 2012, and found him in his office. I made it a point to check if he was available every time I visited Purdue for a project I managed there and had a few face-to-face conversations. Around the same time I attended the 2012 useR! Conference at Vanderbilt University in Nashville, TN, and attended the RHIPE tutorial. Cleveland was gracious with his time and offered support to help me use RHIPE on a Linux cluster, but once again, I was blocked by IT.

Cleveland's paper "Data Science: An Action Plan for Expanding the Technical Areas of the Field of Statistics" was published in 2001, like Breiman's "Statistical Modeling" paper. The title alone qualifies it as landmark paper in the evolution of the term "Data Science." I must have read it around the time it was published, because I found it in a folder of my 2001 S-PLUS conference artifacts while cleaning up file cabinets around 2010. But since I had no recollection, the term must not have resonated with me at that time; however, I had already re-read it several times before "50 Years of Data Science" was published. More than helping to establish the term *Data Science*, the paper's six technical areas and recommended time allocations define the discipline better than other sources, which mostly list skills, not tasks:

1. Multidisciplinary Investigations: data analysis collaborations in a collection of subject matter areas (25%) 

2. Models and Methods for Data: statistical models; methods of model building; methods of estimation and distribution based on probabilistic inference (20%)

3. Computing with Data: hardware systems; software systems; computational algorithms (15%)

4. Pedagogy: curriculum planning and approaches to teaching for elementary school, secondary school, college, graduate school, continuing education, and corporate training (15%)

5. Tool Evaluation: surveys of tools in use in practice, surveys of perceived needs for new tools, and studies of the processes for developing new tools (5%)

6. Theory: foundations of data science; general approaches to models and methods, to computing with data, to teaching, and to tool evaluation; mathematical investigations of models and methods, of computing with data, of teaching, and of evaluation (20%)

All of my Data Scientist job responsibilities can be mapped into those six areas, and I have used them to define my goals and time allocations whenever possible (still a work in progress). So in that respect, it has greatly influenced my life, surely more than any other paper, book, class, conference, tutorial, or workshop.

##  Closing Comments

Data Science - I could not put my finger on it until I read "50 Years of Data Science." In retrospect, it was my reasoning for studying math and statistics instead of "hard core" sciences, hypothesizing that solving future, complex problems would require analysis of large, multivariate data sets, not just theory and logic; however, I could never fully articulate my thoughts to myself, let alone others. And "50 Years of Data Science" helped me realize that my Data Science journey parallels my statistical programming journey from S to S-PLUS to R over the last 30 years - with excursions for Pascal, Fortran, Ratfor, SAS, C, VBA for Excel, Minitab, and Statistica. For me, Data Science and S/S-PLUS/R are intertwined, inseparable.

Around 20 years ago, I attended a seminar by a well-known industrial statistician whose main message was that to be a better statistician, one should learn more about other fields. I took that advice to heart - maybe too much - and spent years and years learning more about engineering, business, and finance, hoping that would help me "get my foot in the door" and apply statistics to a wider variety of problems, or, as Tukey put it, get [to play in everyone's backyard](http://ww2.amstat.org/about/statisticiansinhistory/index.cfm?fuseaction=biosinfo&BioID=14). But that never happened (a topic for another post?). And given my limited time and attention span, I neglected continuing to learn what I really enjoyed: math, statistics, and programming. In retrospect, this was bad advice, at least for me. I now realize I should have learned MORE math, statistics, and programming, and that would have enabled me to contribute more to other fields by applying advanced statistical techniques to solve problems, rather than knowing more about other fields and applying generic, basic statistical techniques. I now wish I had learned that about myself much, much sooner. 

Data Science is not a fad; it is a long evolution of statistical practice, what statistics should have been if "we" listened to Tukey 50 years ago. It took 50 years for Tukey's ideas to become mainstream. And because the statistics community did not lead, as Chambers warned in 1993, others have assumed control. I saw this coming based on my experiences with Total Quality Management (TQM) and Six Sigma, and I hoped Data Science would be different, but it seems to be too late. Personally, however, it has been a huge benefit. When I was a child, I caught a fleeting glimpse of the future out of the corner of my eye. With so many distractions, bad advice, and being blocked by Information Technology, I often just gave up and coasted along. Thanks to Data Science, I have new motivation and renewed energy to purse what I enjoy - and avoided becoming comfortably numb.
