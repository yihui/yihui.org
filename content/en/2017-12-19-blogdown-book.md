---
title: Another Year, Another R Package, Another Book, and Endless Joy
subtitle: An easy summary of my 2017
date: '2017-12-19'
slug: blogdown-book
---

Last year when I finished the **bookdown** package and the companion book "[bookdown: Authoring Books and Technical Documents with R Markdown](https://bookdown.org/yihui/bookdown/)", I summarized my 2016 as "[One year, one package, one book, and endless joy.](https://twitter.com/xieyihui/status/804732609171517440)"

This year, the summary is pretty much the same: another year, another R package (**blogdown**), [another book](https://bookdown.org/yihui/blogdown/), and still endless joy. The **blogdown** book is [available for purchase now](https://www.crcpress.com/p/book/9780815363729). I'm not writing this post to urge you to buy the book (it is free to read online, and even if you buy it, I won't get a penny in my pocket), but share some stories and thoughts behind the book and the package. There isn't a particular order below.

## How the blogdown project got started

After I finished the sketch version of **bookdown** in early 2016, I started to think about the next project. I never lack ideas on what to work on, so basically it means I have to choose one that interests both my employer (RStudio) and me. One blessing of working for RStudio is that my choice is almost always respected.

At that time, I was mainly thinking about two possible projects. One was to build websites using R Markdown (which became **blogdown** later), and the other was a data visualization package. I have been hoping to do both things for long. I chose to work on websites just because I felt the work would be easier and more generally useful. I'll come back to data visualization someday.

The plan for the R Markdown ecosystem has been very clear in my mind: I hope to be able to write single reproducible documents and reports with R Markdown, which is what the **rmarkdown** package does and the first step. I also hope to create presentations and posters, build websites, author books, write journal papers, and collaborate on contributed books, etc., with R Markdown. We have made some progress, but I'm not totally satisfied. There is certainly plenty of room for improvements. That said, I can only focus on one thing at a time, so I wanted to add websites to the R Markdown ecosystem.

Originally we were thinking of completely reinventing the wheels of static websites using R, but when I finally started to work on it in October 2016, I realized the wheels were too big for me. If I were to take that route, this project would probably take me three years (remember, I'm a mediocre programmer).

![The initial plan](https://slides.yihui.org/gif/rpress.jpg)

## The shoulders of giants

Within a week or two, I decided to stand on the shoulders of giants, just like what I often do (and I'm good at it). Now everyone knows the giant is Hugo. I first learned Hugo from Hacker News (long before I started to work on **blogdown**), but didn't pay close attention to it. I spent a few days on reading its documentation, and my conclusion was that Hugo was awesome, although its documentation was a little far from being perfect. I have to say that its documentation still needs quite a bit of improvement even today.

Two things made me decide to use Hugo instead of other static website generators: it is a single binary without dependencies, and it is fast. I have been tortured by these two problems for long, e.g., Jekyll is definitely in the dependency hell, and is slow (for me). I know nothing about the Go language, but that doesn't really matter (I even contributed three pull requests to Hugo).

## On "getting started"

I was familiar with static websites (I used Dreamweaver a couple of years when I was an undergraduate), so Hugo's documentation was not a big obstacle to me. When I first looked at Hugo, its "Quick Start" guide consisted of 12 steps (now it has 5). Twelve steps as a quick start guide? I smiled to myself, and wrote a wrapper function `blogdown::new_site()` to reduce the 12 steps to one single step. It is very common that software developers do not think in the shoes of beginners, and it is also very, very tempting to show too many technical details in the beginning. If it is not dead easy to get started, users may just quickly give up, even if it is actually a great piece of software. For example, I seriously tried Emacs several times before I finally managed to understand the basics, so I won't expect Emacs to become a "mainstream" text editor (feel free to laugh at me, but I use `nano` when I have to use a command-line text editor).

## Create a new post easily

An important but often missing component of static website generators is an intuitive way to create a new post or page. You may feel I'm kidding or too lazy, but I just don't want to write anything if the first thing I have to do is the command `hugo new foo.md`, or create a new text file manually and type all the YAML metadata by myself. Although I'm no longer a fan of WordPress and other blogging platforms, I love how simple it is to create a new post. Static website generators are often command-line tools, and there isn't a GUI for us to create new posts.  For that reason, I wrote an RStudio addin named "New Post" to help create new posts.

[![New Post in blogdown](https://bookdown.org/yihui/blogdown/images/new-post.png)](https://bookdown.org/yihui/blogdown/rstudio-ide.html)

This little addin is the most important reason why I started to blog again this year. It removed my initial psychological barrier. I have a lot of things that I wish to write about, but I just don't want to create that text file by hand.

## Sigh, TOML

Hugo seems to favor TOML (Tom's Obvious, Minimal Language), although it supports YAML and JSON, too. I feel that is unfortunate. YAML is bad enough, and now here comes TOML. It is funny that people just keep inventing new languages for configurations. Personally I don't enjoy the TOML syntax, and I'd rather use JSON if I must make a choice (note that **blogdown** does not support JSON). YAML is tolerable to me.

## Netlify, I have been waiting for you for years

Many people love Github Pages, include the past me. I still love the idea of pushing Markdown to Github and letting Github automatically render the website. As I became unsatisfied with Jekyll, I started to look for a similar service that supports Hugo natively, and I found Netlify. I couldn't be happier with it. It has solved several critical issues, and the free plan has included so many awesome features. For example, free HTTPS for custom domains, [301/302 redirects](/en/2017/11/301-redirect/), free CDN, and continuous deployment from Github with a static site generator of your choice (including Hugo and Jekyll). Basically it has done pretty much everything correctly in my eyes, and it is simple to use.

I think many people use Amazon S3 buckets for static websites. I tried S3 a few times, and honestly I feel it is not very friendly to beginners. It exposed too many technical details to users. Actually the whole Amazon AWS console looks complicated to me.

Netlify has made it very intuitive and convenient to deploy websites. No more `ssh` or `rsync -zrvce`.

## Hugo-XMin, the first website theme I have designed

When I was writing the chapter on Hugo in the **blogdown** book, I scratched my head for a long time, and I was not very productive in that period. Eventually, I decided to create a minimal example to explain how Hugo works. As Feynman said, if you cannot explain something in the simplest form, you don't understand it well enough.

One unique feature of the hugo-xmin theme is that I used [pull requests to teach you how to implement certain website features](/en/2017/09/pull-requests-as-a-teaching-tool/). The theme itself is minimal (150 lines of code), and I showed how you could add new features incrementally. I'm very happy with this theme, and if you want to customize your Hugo-based website, you probably [should study the hugo-xmin theme first](/en/2017/11/tweak-blogdown-site/).

## You might miss `blogdown::build_dir("static")`

I guess some readers can miss an important feature in [Section 2.7](https://bookdown.org/yihui/blogdown/static-files.html), which allows you to build arbitrary Rmd documents in a Hugo website. The output formats are not limited to HTML pages. You can host PDF, presentations, or other formats on your website. I think it is very useful, but unfortunately I didn't find a better place for it.

## Offers that Simply Statistics and Karl Broman cannot refuse

When I started working on Chapter 4 (migrating existing websites to Hugo), I made an offer to [Simply Statistics](https://simplystatistics.org) and [Karl Broman](http://kbroman.org), respectively. I spent four hours on converting Simply Statistics from Jekyll to Hugo/**blogdown**, and one hour on [Karl's WordPress site](http://kbroman.org/blog/2017/08/03/yay-yihui/).

You may feel it was easy to me. It was not. What I didn't tell you is that I spent a whole week (seven days) on converting my personal website from Jekyll to Hugo, and three days on converting blog.rstudio.com (previously using WordPress). I had accumulated a lot of experience before I reached out to my guinea pigs.

I offered free help because I liked their websites, and I also wanted to test if my R scripts were generally useful. It turned out that a few readers of the **blogdown** book actually used the scripts I wrote to convert their WordPress sites to Markdown, and I was very glad to know that.

## My headache in the appendix 

The **blogdown** book was not easy to write because there are too many technologies involved under the hood. It is fine if you don't know all of them, but they can be very helpful. The Appendix B and C may look too technical, but once you understand them, you can constantly benefit from them in the future. In particular, I strongly encourage you to learn the basics of HTML, CSS, and JavaScript. They will open a door to a new and fun world. I learned all these stuff by myself when I was an undergraduate (my major was statistics). I'm still an amateur, and I have no desire to become a pro.

Some technical details drove me nuts when I tried to explain them. For example, I felt desperate when I was writing the last part of Appendix B.1: you cannot imagine how confusing URLs could be. Will the Markdown text `[Link](www.example.com)` generate a valid link? Chances are it will not. At least it will not generate the link you expected: the link will not take you to the website `www.example.com`, because `www.example.com` is a relative URL.

I also recommend you to learn a bit about DNS. You should consider registering your own domain, and setting up your personal email accounts (like mine, `xie@yihui.org`). You can simply use email aliases on Migadu for free.

## Make a plan! Yes, make, a, plan!

I'm not a person with strong self-discipline, and writing a book is never as simple as "keep writing from the beginning to end". A lot of random things can happen, not to mention the distractions. When you write a book, other things like emails, Github issues, StackOverflow questions, and social media won't automatically stop and wait for you. They will continue to pour in, making it really, really hard for me to focus. That is how Internet works. I cannot hang a sign on my door saying "Please do not disturb".

The most important lesson I learned was to make a plan, and stick firmly to it. I think everyone knows the importance and how to make a plans, but the difference between those who can get things done and those procrastinators is that the former group of people will actually execute the plan. A plan is the minimal tool needed to move you from E (Entrepreneurial) to P (Purposeful); you understand what this means if you have read the book "[The One Thing](https://www.the1thing.com)" (not really a great book in my eyes, but the point "from E to P" is critical).

After a couple of months, I started to feel very anxious and guilty when I reported my progress to Tareef (president of RStudio), and the progress was often "not much progress". I really hate this feeling. I'm not a lazy guy. I just often seem to be busy with things that are not on the plan.

Eventually I started to make a weekly plan in [a Google doc](https://docs.google.com/a/rstudio.com/document/d/1jVUUkjc-n1o6iwDIJkGVpRXU7VVmqyz5iAHdu2O5_0k/edit?usp=sharing). I stuck with it for two months, closed the Gmail tab in my browser in the daytime, quit Slack, logged out Twitter, and got the first draft done. I wrote and documented the hugo-xmin theme during this period. It was my most productive moment.

## I don't really know my co-authors in person

As I mentioned in the preface, I have never met my co-authors. I discovered them only because I saw their excellent **blogdown** tutorials. The biggest blind spot of software developers is often the failure to stand in the shoes of beginners. Because we are too familiar with the software we developed, we tend to think everything is easy, obvious, and straightforward: "simply" do this and this, and after 12 steps, you'll get it.

That is why I care a lot about tutorials about my software packages written by other people. I want to see what my software looks like in their eyes. Do they emphasize the same things as me? Do they recommend the same usage? Do they miss important features that I hope users can find out?

I asked Amber to join me when I saw her patiently explain how to set up GIT and Github, which showed she really cared about beginners. Later, she turned out to be a great tester, too. She didn't know everything about **blogdown**, but she read the manuscript, tested a lot of things I mentioned in it, and gave me very detailed feedback.

Amber's tutorial was written very early (before the **blogdown** book existed) and based on Github Pages. Alison's tutorial appeared later when the book was still incomplete, and was based on Netlify. I was impressed by the super clear workflow she introduced. It was exactly what I expected **blogdown** users to follow.

I didn't know them before and still haven't met them in person. As an introvert, I don't care if I have met (or will meet) someone or not. I'm more interested in whether I can learn something from another person (in particular, whether the person can clear some of my blind spots).

## The helpful proofreaders and editor

This is the third book I have published with Chapman & Hall. I have always been happy working with John Kimmel. He is a very helpful editor, and care deeply about authors. Usually it is easy for me to work with him: I send him a manuscript, and he sends me a contract and arranges reviewers/proofreaders. That is pretty much it. As I mentioned in [a previous post about the **bookdown** book](/en/2017/09/the-bookdown-book-in-retrospect/), I tend to finish the manuscript before talking to the publisher, because I hate writing a book proposal (the time can be better spent on writing the book) and setting a deadline. If I set a deadline, I'm almost surely miss it.

I have already mentioned my proofreader Becky [in a previous post](/en/2017/11/becky-proofread/). She is professional, helpful, and fast. I enjoyed reading her comments and corrections. Due to the incredible speed of Becky and the production manager Suzanne Lassandro, this book made another record according to John: "No other books are getting published this fast."

## Let's talk about money (thank Chapman & Hall and my co-authors)

![Man of honor never talks about money but he needs food](https://db.yihui.org/images/junzi-money.jpg)

In the past, a few readers told me they bought my books to put some money in my pocket. That was very kind of them, and I feel grateful. I have written three books, and the total amount of money I have made is, zero. I intentionally chose not to make money from my books because I didn't want money to become a stimulator in my brain. I write mainly because I enjoy writing (although sometimes it can be really painful), and I hope what I write can be useful. If I feel I'm paid to write, the experience will be totally different. I won't love it. If you happen to have got a hard copy or [PDF copy](https://bookdown.org/yihui/blogdown/blogdown.pdf) of the book, you will see I wrote this on the dedication page:

> Life is short. Write for eternity.

I also wrote a poem in Chinese there (apologies to English readers), which was another way to express this.

Because this time I have two co-authors, I cannot make the decision all by myself. Thankfully, both Amber and Alison agreed to waive the royalties, so none of us will make a single penny out of this book. We did this to make the book cheaper, and John Kimmel also convinced Chapman & Hall of not making money from this book, which further lowered the price. What's more, John also persuaded Chapman & Hall of letting us host a free online version of the **blogdown** book (we did the same thing for the **bookdown** book). I have to say that is very generous of our publisher. If you have a chance, you may want to thank [John](https://www.crcpress.com/go/from-your-editors) for these things (the holiday season is coming, so it is great time to write a thank-you email). Of course, you should also thank [Amber](https://amber.rbind.io) and [Alison](https://alison.rbind.io).

Talking about money, I was heavily influenced by this quote from "Poor Charlie's Almanack", which is said to be from Epictetus (but I didn't find it on [WikiQuote](https://en.wikiquote.org/wiki/Epictetus)):

> Wealth consists not in having great possessions, but in having few wants.

Put it another way, the more you want to possess, the poorer you may actually be. Unless I'm going to starve or my family is going through hardship, I don't want to take the money that I don't really need. You may go to read [the single FAQ](https://bookdown.org/yihui/bookdown/faq.html) of **bookdown** again. It is the same idea. Less is more.

## See you at rstudio::conf 2018

I'm glad that I got the R package and the book done in 2017. I'll give a talk on **blogdown** again at [rstudio::conf](https://www.rstudio.com/conference/). Hopefully I'll do a better job than last time. As a typical procrastinator, I won't have an idea about what I'm really going to talk about until the night before. If you have any cool ideas, applications, or anything you want to learn about **blogdown**, please let me know. As I said at the last rstudio::conf, RStudio somehow uses the "conference-driven development model". We will think and work hard before conferences. FWIW, I wrote the initial version of the "New Post" addin for **blogdown** while I was listening to Hilary Parker's talk at rstudio::conf 2017, because my talk was after hers, and I demo'ed the addin in my talk. Isn't "conference-driven" fun?

Currently I don't have anything magical about **blogdown** on my mind, but we will see.
