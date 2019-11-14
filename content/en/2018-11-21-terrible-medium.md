---
title: Isn't Medium an Obviously Terrible Platform for Blogging?
date: '2018-11-21'
slug: terrible-medium
---

Last week I read an article on Medium.com [criticizing Medium.com](https://medium.com/@nikitonsky/medium-is-a-poor-choice-for-blogging-bb0048d19133) (the fact that it was published on Medium sounded quite amusing to me). I have never truly understood the huge success of Medium. When it was born, it seemed to be "yet another WordPress.com or Blogger.com or MSN Space" in my eyes, with two major differences. One is its fresh-looking style. The other is the tools for user/reader engagement.

## The three CSS attributes

I guess the following three CSS attributes can explain half of Medium's success:

```css
p {
  font-family: medium-content-serif-font,Georgia,Cambria,"Times New Roman",Times,serif;
  font-size: 21px;
  line-height: 1.58;
}
```

That is, Medium uses a custom typeface `medium-content-serif-font` (and will fall back to Georgia and other serif fonts), a large font size that is not too commonly seen on the web (21px), and a large line height.

- As I have said a few times in my **blogdown** talks, the best font is always the font you have never used or seen. Our eyes have already been deeply bored by Georgia, Cambria, Times New Roman, Arial, Helvetica, Verdana, and all classical fonts. I'm pretty sure that in a year or two, everyone will be bored by this new `medium-content-serif-font`, too, no matter how fresh it looks right now.

- The font size of 21px is 30% larger than Chrome's default (16px). A larger font size can make readers feel comfortable and easier to focus. A side-effect (not sure if it is good or bad) is that an article will look longer. In my eyes, most modern web pages are too crowded with dense information or distracting elements, and it is becoming harder to read the actual body of a page. Is a larger font size an effective antidote? I don't know. I just feel it is kind of ironic, as if there were a silent yet furious war among different elements on web pages to get our attention.

- The large line height has the same effect as the large font size. I also use a larger line height myself, to make it easier for my eyes to find the next line after finishing reading the previous line. A smaller body width can also help in this regard (which is why I actually like LaTeX's default narrow page width).

## Claps

Claps may explain the other half of Medium's success. Traditional social media platforms invented the thumb-ups and like buttons. Medium invented claps. I'm waiting for the next platform to invent hat-off claps, bows, hugs, or maybe even blow kisses.

Think about it. Thumb-ups, likes, favorites, red hearts (Twitter, you won, at least before Medium came), claps. It seems we are making a certain kind of progress to show stronger and stronger emotions. The only problem is, they are all virtual, and require little physical effort---any fingers, fat or not, can do it.

I'm not saying these reactions are useless, or authors should absolutely get rid of their vanity (I haven't). What I want to express from my observations are:

1. We might be [drinking poison to quench our thirst](https://en.wikipedia.org/wiki/Zhenniao). Social media has made it much easier for people to connect with each other, which is great. At the same time, it has also created the irresistible thirst for attention. Initially, the thirst was easy to quench. For example, you might feel excited when three friends liked your post, because you don't often hear three friends literally say in real life that they like what you did. Then the bar kept raising, and ten likes might feel like nothing. Then there came the bots, and you have no idea _who really_ liked you. Then there came the claps, and you have no idea _how much_ they liked you---the platform has tried to give you an illusion that your audience is expressing stronger emotions, but who knows? You just sit there, and keep clearing up the blue or red dot that indicates new reactions received on the app or page. Note that [their system might cheat](https://twitter.com/revodavid/status/1070118237478772737) for the sole purpose of getting your attention by constantly sending you notifications.

1. There is an obvious way to provide solid feedback: _typing_, instead of _tapping_. I'm not sure if it is a real trend or not, but over these years, I have seen fewer and fewer readers write comments on blogs.^[The only exception that I know is Andrew Gelman's blog. That is probably because it is well-known that Andrew Gelman doesn't use Twitter.] Maybe it is because social media has trained us well enough to find the like button to hit and then run off. Maybe it is because there is just too much to read and digest on the web, and we don't have time to write comments when there are dozens of other articles waiting for us ahead.

    Coincidentally, Disqus recently launched a "Reactions"module in the comment area, which seems to encourage you to tap (the like buttons) instead of typing:

    ![Disqus's new Reactions](https://user-images.githubusercontent.com/163582/49538527-46687f80-f891-11e8-9733-4fe4dfb1d5a2.png#border)

    Personally I don't like Disqus, but I haven't found good alternatives yet. This "reactions" module makes me feel even more uncomfortable. Thankfully, it can be turned off, so I immediately turned it off when I saw it on my sites.

I don't mean you should stop liking my posts or things I did. I do appreciate the likes, if only they were not addictive. I don't mean you must write down comments, either, but I do appreciate those who have done so, because those comments constantly give me different perspectives and inspiration, as I mentioned [in the **blogdown** book](https://bookdown.org/yihui/blogdown/personal-experience.html).

The general problem with the web today is that there are too many candies to engage both authors and readers, and too few carrots to protect our teeth and maintain a balance in our nutrition.

## Where to blog, then?

[The Medium post](https://medium.com/@nikitonsky/medium-is-a-poor-choice-for-blogging-bb0048d19133) didn't give recommendations on the alternative platforms for blogging. I don't intend to recommend **blogdown** here because it is not the key. The only key is that you should have enough control over your platform. For example, you should be able to decide whether to put ads or banners on your blog, which theme you want to use (if not totally satisfied, you should be able to modify its CSS freely), and how to distribute your content (RSS? Mailing list? Twitter?).

Basically, I recommend hosting a website by yourself, and I believe static sites are far easier now (at least they are becoming easier). When you use a third-party service, even if it is free, there is a potential problem: they might be selling you and your content indirectly.

![You are not the customer of Facebook. You are their product being sold.](https://db.yihui.org/images/facebook.jpg)

## P.S. The Consequence of the Death of Google Reader

I cannot help missing Google Reader whenever thinking about this world of social media, in which industry leaders have always been trying to [manipulate us with means](https://techcrunch.com/2017/09/08/meet-the-tech-company-that-wants-to-make-you-even-more-addicted-to-your-phone/) that human beings can never counterattack and even cannot notice. The reason I miss Google Reader is that it was a service with which we could actively choose the content we want to read. After Google Reader died, RSS almost died (I switched to Feedly). The infinite scrolling replaced RSS.

Infinite, scrolling.

It is bottomless. You no longer have control over what you want to read. The app or the website will keep pushing new content to you. If you don't like the content, they are able to make you like it soon (partly because you have submitted your data of personal preferences to them _for free_ by hitting the like buttons). Even when you don't like a presidential candidate, they may be able to change your mind because they control what you see on the web.

I guess Google shut down Google Reader not because "the product had a declining following", but because it gave users full control of what they wanted to read, which means there was no way to push irrelevant content to users. Then Google went to the social media battlefield and bet on Google+. Thank goodness that Google+ eventually died. No one seemed to miss Google+ at all, whereas [tons of people still miss Google Reader](https://gcemetery.co) like me.

By shutting down Google Reader, the "Don't Be Evil" Google essentially destroyed our good online reading habit. Since then, we have been trained to embrace noise and distractions. Reading is no longer a private process primarily driven by oneself. Someone else decides what you should read, and motivates you to motivate the content generators (whom we used to call "authors").

Medium's RSS is a mess, as indicated by [the aforementioned post](https://medium.com/@nikitonsky/medium-is-a-poor-choice-for-blogging-bb0048d19133). I guess that is because Medium just doesn't want you to read an article quietly by yourself in your RSS reader: you ought to go to the bazaar, see what other people highlight or quote or tweet, hear what other people say, be engaged in the interactions, and clap your paws.
