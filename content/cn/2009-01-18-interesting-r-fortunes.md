---
title: R的那些事儿
date: '2009-01-18'
slug: interesting-r-fortunes
---

标题流俗一下，内容来自于R的fortunes包——关于R的语录。前些日子把每一条都看了一遍，现摘录个人认为比较搞笑的部分语录于此。从中可以体会到大家对SAS的Type III Sum of Squares的一致否定态度（隔三差五拿它开玩笑）；没想到Paul Murrell也是很幽默的人；(Brian) Ripley就像R-help的网管一样，其姓已变成了动词（其功效和我天朝的“和谐”有一拼）；Uwe Ligges就像版主一样拼命移帖、删帖，有时还要抱怨一番……玩笑是玩笑，里面也有很多值得学习的地方：


> If you imagine that this pen is Trellis, then Lattice is not this pen.

> -- Paul Murrell (on the difference of Lattice (which eventually was called grid) and Trellis)

> DSC 2001, Wien (March 2001)

> 'They' did write documentation that told you that Perl was needed, but 'they' can't read it for you.
> 
> -- Brian D. Ripley
> 
> R-help (February 2001)
> 
> Overall, SAS is about 11 years behind R and S-Plus in statistical capabilities (last year it was about 10 years behind) in my estimation.
> 
> -- Frank Harrell (SAS User, 1969-1991)
> 
> R-help (September 2003)
> 
> Andrew Thomas: ...and if something goes wrong here it is probably not WinBUGS since that has been running for more than 10 years...
> 
> Peter Green (from the back): ... and it still hasn't converged!
> 
> -- Andrew Thomas and Peter Green (during the talk about 'BRugs')
> 
> gR 2003, Aalborg (September 2003)
> 
> This is all documented in TFM. Those who WTFM don't want to have to WTFM again on the mailing list. RTFM.
> 
> -- Barry Rowlingson
> 
> R-help (October 2003)
> 
> It really is hard to anticipate just how silly users can be.
> 
> -- Brian D. Ripley
> 
> R-devel (October 2003)
> 
> So apparently you wish to report as a bug the fact that R 1.8.0 is different from R 1.4.0.
> 
> -- Douglas Bates
> 
> R-devel (October 2003)
> 
> I plan to fix this - the report is just in case I forget or get hit by a bus.
> 
> -- Ross Ihaka (reporting a bug in persp)
> 
> R-help (October 2003)
> 
> Thomas W. Blackwell: I just discovered to my surprise that I cannot define a function with an argument named 'break' or 'while'!
> 
> Brian D. Ripley: No, they are reserved names. [...] Most programming languages have reserved words, so I am surprised you are surprised.
> 
> -- Thomas W. Blackwell and Brian D. Ripley
> 
> R-help (November 2003)
> 
> I quit using SAS in 1991 because my productivity jumped at least 20% within one month of using S-Plus.
> 
> -- Frank Harrell
> 
> R-help (November 2003)
> 
> Jim Gustafsson: I would like to put my SAS-code into R. Could I do that, if yes, how?
> 
> Frank Harrell: Just reverse the procedure you use when you put R code into  SAS. ;)
> 
> -- Jim Gustafsson and Frank Harrell
> 
> R-help (February 2004)
> 
> Ivo Welch: Thanks. I will put in a suggestion that the docs refer to q() in 'see also' for 'stop'.
> 
> Brian D. Ripley: I don't think anyone else is confusing 'exit' with 'stop', though. I hope you don't when driving ....
> 
> -- Ivo Welch and Brian D. Ripley
> 
> R-help (March 2004)
> 
> To paraphrase provocatively, 'machine learning is statistics minus any checking of models and assumptions'.
> 
> -- Brian D. Ripley (about the difference between machine learning and statistics)
> 
> useR! 2004, Vienna (May 2004)
> 
> The documentation level of R is already much higher than average for open source software and even than some commercial packages (esp. SPSS is notorious for its attitude of "You want to do one of these things. If you don't understand what the output means, click help and we'll pop up five lines of mumbo-jumbo that you're not going to understand either.")
> 
> -- Peter Dalgaard
> 
> R-help (April 2002)
> 
> Can one be a good data analyst without being a half-good programmer? The short answer to that is, 'No.' The long answer to that is, 'No.'
> 
> -- Frank Harrell
> 
> 1999 S-PLUS User Conference, New Orleans (October 1999)
> 
> Some of us feel that type III sum of squares and so-called ls-means are statistical nonsense which should have been left in SAS.
> 
> -- Brian D. Ripley
> 
> s-news (May 1999)
> 
> I was profoundly disappointed when I saw that S-PLUS 4.5 now provides "Type III" sums of squares as a routine option for the summary method for aov objects. I note that it is not yet available for multistratum models, although this has all the hallmarks of an oversight (that is, a bug) rather than common sense seeing the light of day. When the decision was being taken of whether to include this feature, "because the FDA requires it" a few of my colleagues and I were consulted and our reply was unhesitatingly a clear and unequivocal "No", but it seems the FDA and SAS speak louder and we were clearly outvoted.
> 
> -- Bill Venables
> 
> 'Exegeses on Linear Models' paper (May 2000)
> 
> I use R. My company benefits from it. My clients benefit from it.
> 
> ...and I sleep just fine (when I do sleep)... :-)
> 
> -- Marc Schwartz, Medanalytics (about the 'costs' of free software)
> 
> R-help (June 2004)
> 
> /* some real insanity to keep Duncan sane */
> 
> -- Luke Tierney
> 
> in src/main/context.c (June 2001)
> 
> Uwe Ligges: Please stop sending unsensible bug reports! Those have to be handled manually in the bug repository!
> 
> Barry Rowlingson: Really? They seem to be being handled automatically and frighteningly well by the Uwe-bot at the moment.
> 
> Congratulations, you've passed the Turing Test.
> 
> -- Uwe Ligges and Barry Rowlingson (after several nonsensical mails to R-bugs)
> 
> R-devel (July 2004)
> 
> Ted Harding: But you can also do these with 'any' and 'all', e.g. any(v==TRUE).
> 
> Thomas Lumley: or any( (v==TRUE)==TRUE), or any( ((v==TRUE)==TRUE)==TRUE)... Or, perhaps, any(v). Lewis Carroll wrote a nice
> 
> piece on this theme.
> 
> -- Ted Harding and Thomas Lumley (about implementing an 'or' of a logical vector)
> 
> R-help (August 2004)
> 
> So it ***do not refuse*** to read the data. I do not expect some dwarf climbs out from your computer and says he will not
> 
> read your data. Or is he?
> 
> ?read.table gives you more details about how to read some data.
> 
> -- Petr Pikal (after a post that said read.table() refuses to read unbalanced data)
> 
> R-help (October 2004)
> 
> Firstly, don't call your matrix 'matrix'. Would you call your dog 'dog'? Anyway, it might clash with the function 'matrix'.
> 
> -- Barry Rowlingson
> 
> R-help (October 2004)
> 
> R is the lingua franca of statistical research. Work in all other languages should be discouraged.
> 
> -- Jan de Leeuw (as quoted by Matt Pocernich on R-help)
> 
> JSM 2003, San Francisco (August 2003)
> 
> Amer Siddique: looking for some thoughts on incorporating R functionality to create histograms of data stored in an informix db. im gonna write the app in .Net and will use a managed provider to access the data. what R libs might I have to package in the assemblies? (sorry my Q is general as Ive only just looked at wanting this yet)
> 
> Brian D. Ripley: Could you translate the question into English? My guess is that you are writing in a lower-cased version of
> 
> some Microsoft internal language, but you don't even mention that this is for Windows (if it is).
> 
> -- Amer Siddique and Brian D. Ripley (on using R in .NET apps)
> 
> R-help (November 2004)
> 
> There are companies whose yearly license fees to SAS total millions of dollars. Then those companies hire armies of SAS programmers to program an archaic macro language using old statistical methods to produce ugly tables and the worst graphics
> 
> in the statistical software world.
> 
> -- Frank Harrell
> 
> R-help (November 2004)
> 
> Robin Hankin: I'd say that without a tool like R you cannot learn statistics.
> 
> David Whiting: I believe Fisher and a few others managed to get by without it.
> 
> Peter Dalgaard: But think how far they could have got with R!
> 
> -- Robin Hankin, David Whiting and Peter Dalgaard (on teaching/learning statistics with R)
> 
> R-help (December 2004)
> 
> If you don't go with R now, you will someday.
> 
> -- David Kane (on whether to use R or S-PLUS)
> 
> R-SIG-Finance (November 2004)
> 
> Will Frank Harrell or someone else please explain to me a real application in which this is not fast enough?
> 
> -- Brian D. Ripley (announcing improved versions of read.table and write.table)
> 
> R-devel (December 2004)
> 
> Paul Gilbert: [code comparing speed of apply(z,2,sum) vs. rep(1,10000)%*%z)] which seemed completely contrary to all my childhood teachings.
> 
> Douglas Bates: Must have had an interesting childhood if you spent it learning about the speeds of various matrix multiplication techniques.
> 
> Paul Gilbert: [...] why is apply so slow?
> 
> Brian Ripley: 'so slow' sic: what are you going to do in the 7ms you saved?
> 
> -- Paul Gilbert, Douglas Bates and Brian D. Ripley (discussing 'the incredible lightness of crossprod')
> 
> R-devel (January 2005)
> 
> Just now I had an apparently insurmountable problem that's been bugging me for days, but phrasing my question in a form suitable for the R-help list enabled me to solve my own problem in two minutes flat.
> 
> Thanks everyone.
> 
> -- Robin Hankin
> 
> R-help (March 2005)
> 
> [...] (damn... my shift key just broke as well...)
> 
> bill venables.
> 
> -- Bill Venables (answering a message that lacked upper case letters)
> 
> R-help (April 2005)
> 
> Rene M. Raupp: Does anybody know any work comparing R with other (charged) statistical software (like Minitab, SPSS, SAS)?
> 
> [...] I have to show it's as good as the others.
> 
> Kjetil Brinchmann Halvorsen: Sorry. That will be difficult. Couldn't it do to prove it is better?
> 
> -- Rene M. Raupp and Kjetil Brinchmann Halvorsen
> 
> R-help (May 2005)
> 
> You're overlooking something like line 800 of the documentation for xyplot. [...] It's probably in the R-FAQ as well, since my original feeling was that this behaviour was chosen in order to confuse people and see how many people read the FAQ... :)
> 
> -- Barry Rowlingson (about the fact that lattice objects have to be print()ed)
> 
> R-help (May 2005)
> 
> Uwe Ligges: I just told nonsense, stepclass() does not make sense with randomForest(), obviously ... (wonder why nobody
> 
> shouted?).
> 
> Douglas Bates: Oh, we're just so used to you talking nonsense that we don't bother to point it out any more :-)
> 
> -- Uwe Ligges and Douglas Bates
> 
> R-help (July 2005)
> 
> The fact that some people murder doesn't mean we should copy them. And murdering data, though not as serious, should also be avoided.
> 
> -- Frank E. Harrell (answering a question on categorization of continuous variables in survival modelling)
> 
> R-help (July 2005)
> 
> Excellent, Berwin!
> 
> Specifically the part about why the bug never really triggers wrong behavior. Your mail should be saved in 'The Annals of R' ...
> 
> -- Martin Maechler (after Berwin A Turlach reported a buglet in 'spline_eval')
> 
> R-devel (July 2005)
> 
> You say yourself it wasn't reproducible. So it could have been anything that "crashed" your R, cosmic radiation, a bolt of lightning reversing a bit in your computer memory, ... :-)
> 
> -- Martin Maechler (replying to a bug report)
> 
> R-devel (July 2005)
> 
> Trevor Hastie: It would be great to have a 'clickable' digest, where the topics list is a set of pointers, and clicking on a topic takes you to that entry.
> 
> Jeff Gentry: I sincerely hope you don't mean that you wish HTML enabled content in the actual emails coming through the mailing list. People who send HTML in email text should be taken out back and shot :)
> 
> Peter Dalgaard: Pretty much what my spam filter does... Well, it kills the message, not the sender, although the latter would be a more permanent solution.
> 
> -- Trevor Hastie, Jeff Gentry and Peter Dalgaard
> 
> R-help (August 2005)
> 
> Does anyone know someone working in this area in France who is not a JARP (Just Another R Person)?
> 
> -- Jan de Leeuw
> 
> JSS mailing list (October 2005)
> 
> And the fear of getting Ripleyed on the mailing list also makes me think, read, and improve before submitting half baked questions to the list.
> 
> -- Eric Kort
> 
> R-help (January 2006)
> 
> Ole F. Christensen: Brain, Thank you very much for your help.
> 
> Peter Dalgaard: You seem to be using call-by-value semantics rather than call-by-name...
> 
> -- Ole F. Christensen and Peter Dalgaard (thanking *Brian* D. Ripley for help)
> 
> R-devel (January 2006)
> 
> Any doubts about R's big-league status should be put to rest, now that we have a Sudoku Puzzle Solver. Take that, SAS!
> 
> -- David Brahm (announcing the sudoku package)
> 
> R-packages (January 2006)
> 
> This list is impressive. People are knowledgable, opinionated, ready to help and to flame you for asking elementary question or asking how to use type III SSQ. So, speak softly and carry a beagle. Seriously, sometimes it would be quicker just to give
> 
> an answer, than to flame a poor soul.
> 
> -- Milos Zarkovic
> 
> R-help (January 2006)
> 
> Tom Backer Johnsen: I have just started looking at R, and are getting more and more irritated at myself for not having done that before. However, one of the things I have not found in the documentation is some way of preparing output from R for convenient formatting into something like MS Word.
> 
> Barry Rowlingson: Well whatever you do, don't start looking at LaTeX, because that will get you even more irritated at yourself for not having done it before.
> 
> -- Tom Backer Johnsen and Barry Rowlingson
> 
> R-help (February 2006)
> 
> Michael Watson: Hopefully this one isn't in the manual or I am about to get shot :-S
> 
> Peter Dalgaard: *Kapow*...
> 
> -- Michael Watson and Peter Dalgaard (question on axis())
> 
> R-help (February 2006)
> 
> Similarly to Brian, I'm much more reluctant to help people who don't exist -- who knows, maybe you're a computer program who has just passed the Turing test :-)
> 
> -- Martin Maechler (about postings with anonymous e-mail addresses and without real names)
> 
> R-help (March 2006)
> 
> (3 times
> 
> ...rrrrgh...) and why do you think the mailing list is called R-*packages* ???????????
> 
> Please do
> 
> for(i in 1:20) cat("It's a package!\n")
> 
> -- Martin Maechler (after a newly released *package* has been called *library* three times in its announcement on R-packages)
> 
> R-help (March 2006)
> 
> This has been discussed before in this list, and Ripley said "no, no!". I do it all the time, but only in secrecy.
> 
> -- Jari Oksanen (about replacing zero distances with tiny values for isoMDS())
> 
> R-help (April 2006)
> 
> 2-D pie charts are terrible. That makes 3-D pie charts terrible to the 3/2 power.
> 
> -- Frank Harrell
> 
> R-help (April 2006)
> 
> Yourexamplesmightactuallybereeadableifyouusedyourspacebar.
> 
> -- Brian D. Ripley (answering a question containing code without any spaces)
> 
> R-help (May 2006)
> 
> When talking about user friendliness of computer software I like the analogy of cars vs. busses: [...] Using this analogy programs like SPSS are busses, easy to use for the standard things, but very frustrating if you want to do something that is not already preprogrammed.
> 
> R is a 4-wheel drive SUV (though environmentally friendly) with a bike on the back, a kayak on top, good walking and running shoes in the passenger seat, and mountain climbing and spelunking gear in the back. R can take you anywhere you want to go if you take time to learn how to use the equipment, but that is going to take longer than learning where the bus stops are in SPSS.
> 
> -- Greg Snow
> 
> R-help (May 2006)
> 
> Jarek Tuszynski: At one company [...] I had to run all the licenses of all the software [...] through the legal department.
> 
> When they read the GNU Public License (GPL) their only comment was: We have no idea what that license means. Do not touch any software using it.
> 
> Rolf Turner: This is typical of lawyers' minds. If something is clear, rational, lucid, straightforward, unambigous, means what it says ... they can't understand it.
> 
> -- Jarek Tuszynski and Rolf Turner (in a discussion about the GPL and 'buying R')
> 
> R-help (May 2006)
> 
> Have you ever wanted to write a book, but not known where to start? Now is a very good time to jump in, because there is currently a very simple recipe for success: just put R in the title and you will have to beat the publishers off with a stick!
> 
> -- Paul Murrell
> 
> ASA Statistical Computing & Graphics Newsletter 17(2) (November 2006)
> 
> You must realize that R is written by experts in statistics and statistical computing who, despite popular opinion, do not believe that everything in SAS and SPSS is worth copying. Some things done in such packages, which trace their roots back to the days of punched cards and magnetic tape when fitting a single linear model may take several days because your first 5 attempts failed due to syntax errors in the JCL or the SAS code, still reflect the approach of "give me every possible statistic that could be calculated from this model, whether or not it makes sense". The approach taken in R is different. The underlying assumption is that the useR is thinking about the analysis while doing it.
> 
> -- Douglas Bates (in reply to the suggestion to include type III sums of squares and lsmeans in base R to make it more similar to SAS or SPSS)
> 
> R-help (March 2007)
> 
> Corinna Schmitt: How can I divide the number 0.285 with 2. I need a function.
> 
> Result: 0.285 / 2 = 0.1425
> 
> Gabor Csardi: Well, i think
> 
> half.of.0.285 <- function() {
> 
> 0.1425
> 
> }
> 
> would do the trick.
> 
> -- Corinna Schmitt and Gabor Csardi
> 
> R-help (April 2007)
> 
> RAM is cheap and thinking hurts.
> 
> -- Uwe Ligges (about memory requirements in R)
> 
> R-help (June 2007)
> 
> 3-D bar plots are an abomination. Just because Excel can do them doesn't mean you should.
> 
> (Dismount pulpit).
> 
> -- Berton Gunter
> 
> R-help (October 2007)
> 
> Apparently mathematical impossibility is not an impediment to parameter estimation in such cases.
> 
> -- Douglas Bates (about the abilities of SAS PROC MIXED)
> 
> R-help (December 2007)
> 
> memory problems (not me. my pc!)
> 
> -- Sara Mouro (subject line for an R-help request)
> 
> R-help (January 2008)
> 
> Happy families are all alike; every unhappy family is unhappy in its own way.
> 
> Leo Tolstoy
> 
> and every messy data is messy in its own way - it's easy to define the characteristics of a clean dataset (rows are observations, columns are variables, columns contain values of consistent types). If you start to look at real life data you'll see every way you can imagine data being messy (and many that you can't)!
> 
> -- Hadley Wickham (answering 'in what way messy data sets are messy')
> 
> R-help (January 2008)
> 
> I strongly suggest you collaborate with a local statistician. I can think of no circumstance where multiple regression on "hundreds of thousands of variables" is anything more than a fancy random number generator.
> 
> -- Berton Gunter
> 
> R-help (February 2008)
> 
> I recently read the small print on the academic license our site has for SAS. You have to:
> 
> 1 inform SAS of any taught courses that use SAS,
> 
> 2 inform SAS of any research projects using SAS,
> 
> 3 allow SAS to refer to your institution as a SAS user,
> 
> 4 allow SAS to review your taught courses,
> 
> 5 ensure your courses are taught using qualified personnel,
> 
> 6 give SAS your first-born male offspring.
> 
> I spoke to our site's licensing supremos and they say they've never heard of anyone complying with 1 or 2. Point 4 sounds like petty fiddling in our educational business, and point 5 left 'qualified' undefined. Point 6 doesn't bother me since I don't have kids.
> 
> -- Barry Rowlingson
> 
> R-help (February 2008)
> 
> In many cases a) often looks difficult, but on closer inspection turns out to be impossible.
> 
> -- Bill Venables (about calculating the negative log-likelihood from a non-independence model)
> 
> R-help (April 2008)
> 
> Basically R is reluctant to let you shoot yourself in the foot unless you are really determined to do so.
> 
> -- Bill Venables (about the warning hist() issues when being called with unequal interval widths and freq=TRUE)
> 
> R-help (May 2008)
> 
