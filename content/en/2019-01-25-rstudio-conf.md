---
title: Back from rstudio::conf 2019
date: '2019-01-25'
subtitle: Observations, experiences, thoughts, and Q&A
slug: rstudio-conf
---

There was an obvious reason for me being quiet in my blog this month: the rstudio::conf(2019) took place last week. I (co-)taught a workshop and gave a talk there, so I needed a lot of time to make the preparation. In this post, I want to share some observations and experiences. Note that this is not a summary of the conference. Many others have blogged about the conference, and you can find those links in [Karl's Github repo](https://github.com/kbroman/RStudioConf2019Slides).

## Some people I met

Usually I don't have much interest in meeting anyone in person because the online connection seems to be good enough for me. Sometimes I feel there is no real need to physically meet someone. For example, the total time I have literally talked to Karthik Ram should be no more than five minutes, but I feel we just know each other so well and have been paying attention to each other's work over the years. That said, I definitely don't avoid meeting people deliberately.

At the R Markdown workshop, I met Stas Kolenikov and Josh Goldberg (for the first time, I think). I started to notice Josh since last year because of his several comments in my blog. If all students were of his level in **rmarkdown** and **knitr**, I'm afraid I wouldn't have much left to teach in the workshop. Stas seems to be active on Twitter, and [he actually suggested](https://twitter.com/StatStas/status/1042216743479914496) that I cover David Gohel's **officer** package in the R Markdown workshop. That was not on my original plan, but after Eric Nantz [offered to help](https://twitter.com/theRcast/status/1073441479257980928), I accepted the **officer** tutorial without hesitation, because I thought it would be great for the students to know the alternatives to R Markdown (and R Markdown is certainly not perfect for everything).

Of course, it was great to meet my co-instructor (and now colleague) [Alison](https://alison.rbind.io) for the first time in person. She is such a great and enthusiastic instructor! I admire her capability of learning things quickly and teaching them clearly. BTW, I think she is absolutely the top expert of the hugo-academic theme now. I don't remember if it was also the first time I had met our TA Jennifer Thompson. [I mentioned her](/en/2018/07/user-developer/) last year in a blog post. Apparently Alison did a great job at finding TAs for our workshop. Other awesome TAs include [Jiena Gu](https://www.jienamclellan.com), [Hao Zhu](https://haozhu233.github.io), and [Thomas Mock](https://twitter.com/thomas_mock). I asked Jiena to be TA because she had asked me a lot of questions about R Markdown and Shiny in the past. Many people ask me questions, but she is one of the few who can dig much deeper and work out amazing solutions by themselves after I provide my hints or even guesses. Hao is famous at least for his work on the **kableExtra** package. At JSM 2018, someone just called him "[the kable guy](https://twitter.com/haozhu233/status/1024346015774597120)".

One random person I happily and surprisingly bumped into was Suthira Owlarn during a lunch. It was a few minutes into our conversation that I realized she was the person who [mentioned my moon cake recipe](https://twitter.com/S_Owla/status/1062678377528786944) two months ago! Sitting on my left-hand side at the same lunch table was [Hiroaki Yutani](https://twitter.com/yutannihilat_en). I had never met him before, but I was actively looking for him at the conference. He had a poster but his flight was late, so I didn't find him in front of his poster. I have discovered several cool Japanese hackers on Github in these years, including Hiroaki. Last year I decided to give him write access to the **knitr** repo because I felt he was careful enough and knew well enough about the source code of **knitr**. He was actually the first person who gained write access to the **knitr** repo besides me. Personally I'm very interested in the Japanese culture, and I wish I could spend a few months living in Japan someday.

I met [Christophe Dervieux](https://github.com/cderv) for the second time at rstudio::conf. I cannot thank him enough for his active help with my Github issues almost on a daily basis. During the 2018 rstudio::conf, I talked to him briefly about automating the generation of the bookdown.org website, and he quickly finished what I planned to do, which has saved me at least one hour every week in maintaining this website.

At last year's rstudio::conf, an American lady talked to me in fluent Mandarin. I was so very impressed, but didn't remember her name, which had been a shame to me. Luckily, she came to this year's conference again. The first thing I did when I found her was to look at her badge and made sure I remembered the name, Amanda Johnson. However, I made the same mistake two days later when another lady came to me and told me she could also speak and read Chinese. It is kind of embarrassing for me to bend my neck to look at other people's badges while talking. Anyway, she asked me for permission to correct other people's pronunciation of my name. I was so touched! People were so kind and humble at this conference.

Ian Lyttle was still carrying [his notebook](/en/2018/01/ian-lyttle/) with him this year.

The list of amazing people I met could go on and on, but I'm just going to stop here.

## How do you pronounce it?

An extremely common topic I heard from all conversations was how to pronounce the name of a package or a certain term. For example, the most frequently asked question about the **xaringan** package is its pronunciation. Well, I have to make an official announcement that there is no official pronunciation of **xaringan**---just pronounce it in whatever way you like. If you are really curious about its authentic pronunciation, you can learn it from the video (at 01:04) on [the Sharingan page](https://naruto.fandom.com/wiki/Sharingan) of the Naruto wiki, or ask a Japanese friend to teach you.

Similar examples include **GGally** (GG-ally or G-Galy), **reprex** (re-prex as in "reproduce" or rep-rex as in "replicate"), and **memor** (like mem-er or memo-R).

Human names can be difficult to pronounce, too (e.g., my last name). The day before I gave my talk on **pagedown**, I asked Christophe, a native French, to record the pronunciation of the name "Romain Lesur" on my phone, and practiced it quite a few times in my room, so I could hopefully make my pronunciation of my collaborator's name close enough in my talk (I have never met or talked to Romain in person).

At a lunch, one person mentioned the "sword" sound in the **beepr** package, and I proudly told her that it was largely due to [my useR! 2014 talk](https://github.com/yihui/knitr-talks/tree/master/useR2014). Then we talked about the difficulties in the pronunciation of package and human names. I suggested that we record the authentic pronunciations and send pull requests to **beepr**, so that, for example, `beepr::beep(12)` tells us the pronunciation of "xaringan", and `beepr::beep(13)` is "Yihui Xie", etc. Would that be a good idea?

## Some of my experience in doing presentations

I asked Hiroaki if he also had a talk at the conference, and he said he was concerned about his English language. Although [I also struggle with English](/en/2018/11/english-is-hard/), I'm rarely worried about my language in presentations, because I'm sure native speakers will pretty much understand it regardless of all grammar or pronunciation problems. The requirement for English is much lower in a presentation than in a conversation, because a presentation is primarily a solo activity: you just keep talking on the stage. Given that rstudio::conf is a super friendly conference, presenters who are not native English speakers could have more confidence in themselves.

With the observation of Hiroaki's concern, I feel that perhaps we should offer some help to non-native speakers with their language if they prefer. I don't know how many people decided not to give a talk because of language problems.

In fact, non-native speakers have a special advantage. That is, idioms and jokes that are only familiar and popular to native speakers will sound particularly funny when said by a non-native speaker, because it is totally unexpected to them that you know such a joke or idiom. For example, someone (I believe it was an American) at the conference told me "your packages are very 666" (pronounced roughly as "leo-leo-leo" in Chinese). I guess no one knows what "[666](https://baike.baidu.com/item/666/17192634)" means in today's Chinese cyber culture (awesome/neat/slick) unless you are a young Chinese, so I had a good laugh when 666 was said from an American's mouth. He told me his Chinese friend taught him this, and apparently it was very effective.

Many people feel nervous on the stage. I'm rarely nervous there, but I do feel a little nervous in the few minutes before I walk onto the stage. My heartbeat quickens, too. That is very normal. I don't feel nervous while I give the talk because I'm usually extremely focused on my talk. I wouldn't notice it even if you pull an elephant into the room and walk it around while I'm giving the talk. FWIW, I failed the [selective attention test](https://www.youtube.com/watch?v=vJG698U2Mvo) the first time I saw it (I completely overlooked that animal).

At the useR! 2014 conference in LA, I told Kevin Ushey that the more people in the room, the more comfortable I would be to give my talk. He was surprised. To some degree, this is similar to "one death is a tragedy, and a million deaths is a statistic." When there are only a few people listening to your talk, you may feel the stare. When there are a thousand people in the audience, it really doesn't matter how an individual reacts to your talk, so you should just shift your focus from the audience to your talk. And your talk may not be as important as you thought...

> One of the symptoms of an approaching nervous breakdown is the belief that one's work is terribly important.

> --- Bertrand Russell

[![The room for my pagedown talk. Photo credit: Renata Gerecke on Twitter.](https://user-images.githubusercontent.com/163582/51764240-4c612c80-209a-11e9-9c92-ba35c4f0d802.jpg)](https://twitter.com/renatagerecke/status/1086305574696964098)

There is a special bonus of a large audience: jokes will work much better. Even mild jokes will make a fair number of people laugh. In all of my talks with a large audience, there are almost always a few people who laugh out so hard as if I paid them to laugh.

I'm good at creating strange and unexpected associations among seemingly unrelated things (such as [rmarkdown and the government shutdown](https://twitter.com/apreshill/status/1086305302964813827)), which often creates unexpected jokes. If anyone has a presentation that needs some flavor, I'll be happy to help. Actually, if you think more about your best jokes coming up in the talk, it will also help you relax on the stage.

Of course, being funny is not the goal. There are [many excellent talks](https://twitter.com/CMastication/status/959856196369793024) that don't sound funny at all. It feels satisfactory when the audience laugh out loud, but we need to keep in mind that the means is not the goal. I have heard negative feedback on at least one of my talks, and that person thought the talk didn't have much content, despite of the loud laughter. Perhaps I overdid it. I certainly want people to laugh and remember, instead of laughing and forgetting.

BTW, no matter how much you love the dark theme of your editor, switch to a bright theme (and increase the font size) when you show live code demos.

## Where do you get ideas for your next R package?

I was asked a few times how I found ideas for my new packages. First of all, I only work on one package each year in recent years, which has made the decision a little bit easier. Once I decide what to work on, I can ignore most of the news throughout the year. The amount of work that _could_ be done is always much bigger than what we _can_ actually do. You may need a long-term dream ([like mine](https://twitter.com/xieyihui/status/1022873179532996609)) to be able to focus.

I read the Hacker Newsletter regularly, although I feel most of the items in each newsletter are not relevant or useful to me. I learned Gitbook, remark.js, Hugo, and ReLaXed from there, which in turn gave birth to **bookdown**, **xaringan**, **blogdown**, and **pagedown**, respectively. That means I find one thing or two in the newsletter directly relevant to my new R packages every year, which is actually enough.

My other source of inspiration is Twitter. The **pagedown** package was finally born mainly because of [one of Romain's tweets about Paged.js](https://twitter.com/RLesur/status/1037126641846312967). Even though I was excited about ReLaXed, I really didn't want to introduce a Node package as the dependency of an R package. I saw a much brighter future from Romain's tweet. More importantly, I felt [the shared belief](/en/2018/07/in-html-i-trust/) between him and me, so I reached out to him and we started to work on **pagedown**.

## My personal favorite talks

There were three parallel sessions, so I only attended 1/3 of the talks. For those I attended, I especially loved these ones:

- Joe Cheng, Shiny in production

- Kara Woo, Box plots: A case study in debugging and perseverance

- Karl Broman, R/qtl2: Rewrite of a very old R package

- David Robinson, The unreasonable effectiveness of public work

Kara's talk showed an inspiring and detailed example of how to fix a bug in a famous (if not the most famous) R package. The R community needs more contributors like her. I love Karl's special humor. Sometimes I cannot even tell if it is humor or he is just nervous at the podium, because he often appears to be speechless (and emotionless at the same time). I asked him later, and it seemed he was just speechless at [the ridiculous examples](https://kbroman.org/blog/2011/08/17/the-stupidest-r-code-ever/) in his talk. I thought he needed some encouragement at the podium (come on, Karl, [you can do it](https://slides.yihui.org/gif/you-can-do-it.gif)). Anyway, there was a lady sitting in front me who laughed so loud and often, which made Karl's talk even more amusing. Dave gave the closing keynote, and I agree with everything he said (definitely not because he mentioned me twice in his talk). Yes, publicize your work.

## Jared Lander's annual feature requests

I meet Jared Lander roughly annually. Each time he would make certain requests to me. For example, the **bookdown** package was an response to his request in 2014 when we met at the Strata conference. This year he wanted self-contained **xaringan** slides. This is a tricky issue because Markdown is not processed through Pandoc, but I'll see what I can do. The next request was a talk at the [New York R conference](https://www.rstats.nyc). I absolutely love this conference, but I'm still waiting for my two little kids to grow (I cannot offer them six meals a day to let them grow twice as fast). If any R Markdown ninja volunteers to go, I'll be happy to help create a Yihui-style talk.

## A random idea: turn your Dropbox folder into a public website through **plumber** and **rdrop2**

On the first day of our R Markdown workshop, Hao told me my slides were no longer accessible, which scared me. I usually serve my slides through [Updog.co](https://updog.co). Unfortunately the service was down right before the workshop, but was recovered later that day. I came up with an idea of an alternative implementation of Updog.co after this incidence, and will leave it as an exercise to those who are interested:

In R, we have the [**rdrop2**](https://github.com/karthik/rdrop2) package to access a Dropbox folder. Then we also have the [**plumber**](https://www.rplumber.io) package to build simple web APIs. With these two pieces, it is enough to turn a private Dropbox folder into a public website. What the API does is simply read static files and return their content (i.e., [a static file server](https://www.rplumber.io/docs/routing-and-input.html#static-file-handler)). If you [host](https://www.rplumber.io/docs/hosting.html) the **plumber** API on a public server, you will be able to enjoy a similar service as Updog.

## The video recording of my talk

RStudio is currently uploading [all conference videos](https://resources.rstudio.com/rstudio-conf-2019). If you are interested, my talk is already there:

[![pagedown Creating beautiful PDFs with R Markdown and CSS - Yihui Xie](https://embedwistia-a.akamaihd.net/deliveries/f936ea9db9c32a27a3262d640ea1810fc319ddab.jpg?image_play_button_size=2x&amp;image_crop_resized=960x540&amp;image_play_button=1&amp;image_play_button_color=4287c7e0)](https://resources.rstudio.com/rstudio-conf-2019/pagedown-creating-beautiful-pdfs-with-r-markdown-and-css)

Many other people have written blog posts about this conference (again, see [Karl's repo](https://github.com/kbroman/RStudioConf2019Slides)). I have read most of them, and they are all beautifully written (I'm particularly impressed by Brooke Watson's hand-drawing skills). I feel very glad and proud to learn that people found this conference super friendly, inclusive, welcoming, and helpful. Many thanks to those who made this conference such a positive experience, and looking forward to rstudio::conf(2020) in San Francisco!
