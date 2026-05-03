---
title: Reflections on AI-assisted Programming
date: '2026-05-03'
slug: ai-reflections
---

My former colleague [Nan](https://nanx.me) kept telling me early last year that
I should try Cursor, but I felt I didn't need AI assistance at that time, since
I knew pretty well what I wanted to do and how. Plus, I'm generally frugal and
would hesitate to purchase anything extra for myself.

GitHub has offered the Copilot Pro plan (300 premium requests per month) to me
for free since last year because I maintain several popular repositories, but I
had rarely used it until this year, when I kept hearing that Claude Opus 4.6 was
amazing. Well, I thought to myself, since I didn't need much assistance in my
major programming language (R), perhaps I could give AI a try in a language
unfamiliar to me. In a couple of days, I was able to create [the **tinyimg**
package](/en/2026/03/tinyimg/), which is a Rust-based R package.

## Initial experience

The interesting thing about the creation of the **tinyimg** package is that the
initial version was written entirely with GitHub Copilot on GitHub, and I didn't
even clone the repository to my local computer before I felt the initial version
was ready. All I did was keep telling Copilot what I wanted. This may sound
simple, but I can tell you that it was actually very exhausting. If you are
interested, you may view [the pull request
history](https://github.com/yihui/tinyimg/pulls?q=is%3Apr), which contains
lengthy conversations and reviews. You can't simply tell AI that you want an R
package for optimizing images using Rust crates and hope it will be done in the
next hour. There are tons and tons and tons of details that you need to clarify
and refine in the process.

But I was still quite impressed. There is no way I could write a Rust-based R
package in just a couple of days. Even the simple `src/init.c` [could kill
me](https://d.cosx.org/d/419431) for a day. AI is really, really, really good at
the boring routine work.

One reason I decided to try GitHub Copilot first instead of Cursor, Claude Code,
or Codex was that I could set up GitHub Actions and let Copilot push commits and
wait for action jobs to finish before it ends a conversation. These action jobs
often run on multiple platforms (Windows, macOS, and Ubuntu) with different
configurations (e.g., R versions). I tell Copilot that if any job fails, it must
read the logs and fix the problem until all jobs are green. Another reason was
that Copilot runs on the cloud, so I didn't need to keep my computer on.

## Always on

When I realized that AI could continue working while I'm asleep, I, like pretty
much everyone else, couldn't resist assigning tasks to it before going to bed in
the hope that I'd get something exciting finished the next morning.

This AI co-worker is not only tireless and can work for 24 hours a day, but is
very knowledgeable. For years, I've wished to learn Rust or Lua (because I often
felt the need to write small tools that can run as standalone executables).
Every time I sat down with a tutorial, I couldn't make it past 30 minutes and
would quickly forget everything I learned. I don't think I'm a language person.
Beyond R and JavaScript, all languages seem hard for me. However, I often know
what I want and can describe it clearly. As a slow thinker, I'm not good at
speaking but I like writing.

Whenever I think of this knowledgeable always-on co-worker, I feel both excited
and exhausted. I'm excited because I have had tons of ideas on my mind that I
haven't been able to implement due to the lack of skills. Now the barrier seems
to be gone (or at least has become much lower). The impossible dreams suddenly
appear to be within reach. For example, why should I tolerate Jupyter and LaTeX
anymore? Why should I tolerate those bloated "buy one, get a thousand (features)
free" software packages anymore? Why is there still no journal that allows and
even encourages interactive graphics and computing right inside the papers?...

Skill-wise, most software developers, as long as they are willing/able to pay
for AI assistants, are on the same page now. Working with computers is always
the easiest (now the game has even become more or less "shut up and take my
money"), and working with humans is always the hardest. If a software package
doesn't satisfy us or meet our needs, why should we tolerate or wait anymore?

Going forward, I think the future will be filled with software abundance, or,
more accurately, I'd call it "software proliferation". That is, centralized
development will be history. Software will be highly personalized, especially
for open source software. Everyone can have their own personalized code
formatter, linter, IDE (will IDE still be a thing? AI doesn't need an IDE),
programming language, and Linux distro.

## Addiction

Again, I have mixed feelings about this. Sure, I'll be happy with completely
personalized software (I assume AI will be smart enough to take care of the
maintenance), but on the other hand, I know this will be yet another "infinite
game" to play, because customization has no end for most people. The tool you
are happy with today is likely to need further customization tomorrow. AI can be
always on, but you need to sleep.

The first three words that babies learn at daycare centers are usually: 1) No!
2) Mine! 3) More, more (with a special hand gesture---if you have raised kids,
you should be very familiar with [that sign
language](https://babysignlanguage.com/dictionary/more/)). It's very tempting to
tell AI "more, more" like a baby.

I have to confess that I feel very addicted to the use of AI in developing
software. I don't know what drug users feel like after using drugs, but I guess
the addiction may be similar. Let me give you an example. Data visualization has
been my long-time interest. It was the very first reason that brought me into R.
Even the base R graphics fascinated me back in 2006 (by the way, I must mention
here that [**tinyplot**](https://github.com/grantmcdermott/tinyplot) has made
base R graphics great again since 2024, and kudos to its authors!). Interactive
graphics was supposed to be my main PhD research topic but destiny led me astray
to reproducible research later and I chose to submerge myself in various \*down
packages for more than a decade.

After I tasted the power of AI, I thought to myself, how about revisiting my
original dream? The initial outcome shocked me in two ways:

1.  UNMC (University of Nebraska Medical Center) invited me to give a talk last
    month, and I listed a package that didn't exist at the time in the abstract
    of my talk. I started developing the package on Monday and gave the talk on
    Friday morning. The package is tentatively named **gglite**:
    <https://github.com/yihui/gglite>. To be fair, I had been thinking about
    this for several months and reading the documentation of the underlying
    JavaScript library before I started creating this package, so I can't simply
    say that AI created a dream package for me from nowhere in four days. But
    this experience was shocking to me nonetheless. [My own best
    record](https://slides.yihui.org/2015-htmlwidgets-LA-Yihui-Xie.html) was to
    start creating a presentation after lunch and give the talk after dinner the
    same day (which shocked Joe Cheng). The AI monster beat me ten miles into
    the ground single-handedly.

2.  It was hard to go to bed before 2am. I couldn't wait to see what AI would
    produce, and often had to force myself to leave my computer. In the old age
    of handcrafting code, I could also be excited by the achievements, but the
    huge mental effort could also make me tired enough to take a rest. Now, it's
    like a hallucinated man watching a hallucinated AI agent at midnight. The
    man is tired as before, but with the hallucination that he invests much less
    effort than before and can expect much higher returns after every prompt.

When I gave the talk at UNMC, they live-streamed the talk, and I saw the top of
my forehead on the screen in front of me because the camera in the room was on
the ceiling. For the first time in my life, I had seen the top of my head. I was
not sure if it was because I burned too much midnight oil this year, but the
hair on my forehead was sparser than I imagined. I know I'll become bald one day
like my father and I have no problem with that, but I didn't know it was already
happening.

What's the next step for **gglite**? Should I create a lightweight version of
Jupyter by [rewriting **litedown** in
Rust](https://github.com/yihui/litedown/issues/48)? How about [reinventing LaTeX
in HTML](https://bugzilla.mozilla.org/show_bug.cgi?id=286443)? Why not
[establish a journal](/en/2012/03/a-really-fast-statistics-journal/) that
supports HTML as the first-class citizen? How about [burning Markdown and
embracing Djot](https://github.com/jgm/djot) instead? And a visual editor for
Djot? Great tables without bloat, or a new "grammar" of tables?...

[Or should I quit tech, too?](https://ky.fyi/posts/ai-burnout)

I have no answers to these questions. I'm sure there are endless exciting
projects that I can work on, but I need to reflect on whether I should move on.

## The total amount of money I've spent on AI: \$0

I don't know how other people work with their \$500/month subscriptions. For me,
I haven't paid a single cent for AI so far. The aforementioned GitHub Copilot
Pro plan offered to me for free is worth \$10 a month. Most of the time, I'm
using the cheap Claude Sonnet 4.6 (4 cents per request) instead of the more
powerful Opus models. With each request, I often ask Copilot to do several
things, and sometimes it can run for an hour (which is the limit), but the cost
is still 4 cents.

Although I'm frugal, I don't really mind paying 20 or 50 bucks a month (I
sponsor other people on GitHub every month far more than this amount). I think
AI assistance is well worth the money. My problem is that I don't know what I'm
going to do after the limit is raised. For the past few months, I've never been
able to use all 300 requests and I've already had a lot of work done (far more
than I could imagine). If I'm offered 3000 requests, I don't think it would make
me 10x more productive.

Another reason why I intentionally avoid spending money on AI is my personal
health. I just do whatever I can do with these 300 requests. After that, I
reclaim my time and freedom, and live an AI-less life. Unfortunately, I'll have
a new challenge soon: I was given access to Claude Code in one of my contract
jobs this week, and I have yet to decide how I should make use of this (almost)
unlimited privilege. Honestly, my first reaction was, I'm going to use Opus 4.7
for everything! The seduction approaches quickly like this...

Actually, the most important reason for zero expenditure on AI is that I want to
force myself to spend more time thinking. Perhaps someday (maybe soon) AI will
completely learn my taste and preferences, but at the moment, it can't give me
one-shot implementations yet. I still have to spend a lot of time on planning,
giving instructions, and reviewing the code. I can afford more money, but can't
afford more time. I can only review this many pull requests each month.

I hope GitHub's significantly more frequent outages this year were not due to me
torturing Copilot like this. While I hear people [complain about the frequent
outages](https://mitchellh.com/writing/ghostty-leaving-github) and find it
annoying, perhaps we can take these chances to break ourselves free from the
otherwise inescapable tech world for a moment.

## Whose code am I stealing?

As powerful as AI models are, I can't get rid of this question on my mind when
using code generated by AI. I wouldn't have this question if AI's abilities came
from nowhere but pure computing, like AlphaZero. But we all know that's not
true. AI models were, at least initially, trained on data and knowledge from
humans, e.g., public web resources like Wikipedia and the source code of
open-source software. Perhaps they used my GitHub repositories and blog posts,
too. Within that huge magical machine-learning black box, no one has a clear
idea how each line of AI-generated code was produced.

To some degree, we (software developers using AI-generated code) are thieves. We
steal code in an extremely abstract way. The fact that we have paid subscription
fees doesn't make us any less like thieves. Normal thieves simply steal, and we
pay to steal.

Then there comes the question of licensing. If the new soup we get from AI is
based on 30% GPL, 65% MIT, and 5% CC0, how should we license this new soup? How
do we attribute the original authors if attribution is required?

I think using AI for developing open-source software can mitigate the sin
(stealing and sharing), but the question of licensing remains unanswered. If the
generated code has a GPL component, you can't just license your software under
MIT (GPL in, GPL out). If it has a component that requires attribution, you
should dig out its original authors and attribute them. These are daunting (if
not impossible) tasks.

We owe a debt, not to companies like Anthropic, OpenAI, or Google, but to the
authors of the free public raw materials that were used to train AI. How should
we pay? I don't know.

## Abusing ourselves to death

I never run out of creativity. I used to think this was a blessing. In the AI
age, I can no longer tell if it is a blessing or a curse. In the past, the
strong desire to create something new could be held by my limited skills and
knowledge. Oftentimes I know what I want to create but just don't know how. With
AI assistance, I think I'll be able to set a lot of my creativity free, but on
the other hand, I'll be busier than ever, falling victim to the [Jevons
paradox](https://en.wikipedia.org/wiki/Jevons_paradox). The boost in
productivity can never catch the boost in desire.

Sometimes I try to imagine an alien from outer space looking at me: at 2am, this
Earth guy is still trying to figure out how to change the default plot symbol
from a circle to a solid point; the hollow circle bothers him so much that he
can't sleep, and he follows AI into the million-line TypeScript codebase... And
the alien thinks: Oh my ggsus (i.e., the Lord of Grammar of Graphics), on our
planet, no one draws plots anymore except for entertaining purposes... Why is
this guy still developing a plotting package instead of feeding the machine with
raw data and waiting for discoveries... What a waste of their eyes...

Then the alien turns to the next guy. He is having fun with Typst's live
preview. Obviously, the technology is more interesting than the paper itself.

And the next guy has just experienced his midlife crisis, since he just
discovered that `curl` and `curl.exe` are totally different in PowerShell. The
alien smiles in silence: good boy, how lucky you were not to type `R` in
PowerShell to run R, otherwise you'd be able to save a flush in the restroom
since you'd have enough tears to flush the toilet.

I'll stop my fantasy here. If I ever quit tech, the first thing I really want to
try is HaaS (Humor as a Service) or HaaaaaaaS (Hahahaaaaa Shut up). For that, I
don't need to rely on AI at all. I wish to amuse other people to life instead of
abusing myself to death.

## What's real?

[One of Dave Tang's
posts](https://davetang.org/muse/2026/02/06/state-of-the-blog/) has stayed in my
browser for a few months now. Compared to all technological advances today (yes,
they are amazing), his blog makes me feel the meaning of life better, even
though I don't really know him. I feel it's a blessing that he and his readers
(who also feel very real) live on the same planet as me---they still value
authentic and original work created by humans so much, no matter how weak, slow,
and fragile humans are (compared to AI).

I have no doubt that AI will (perhaps has already) surpass me as a software
developer soon. New software packages will be created by AI at scale. The blog
posts for announcing these packages will be written by AI at scale (and AI has
to pretend that it is excited every single time). Documentation and llms.txt
will be written at scale. Social media posts will be fully automated for sure.
Breaking news everywhere. Breaking changes nowhere (AI is told to silently fix
them).

What should we direct our poor eyes at? What's real then? Where can we find a
sign of human beings?
