---
title: A Four-Day knitr Issue/PR Backlog Sprint
subtitle: 11 years of tech debt (almost) cleared
date: '2026-09-20'
slug: knitr-backlog
---

After **knitr** v1.52 went to CRAN on 2026-09-06, I did something I don't do
often but have been hoping to do: I sat down and worked through the [GitHub
issue tracker](https://github.com/yihui/knitr/issues) more or less top to
bottom. Over the past four days, I went through the *whole* backlog (with AI
assistance). The issues and pull requests I fixed/merged/closed span more than a
decade---the oldest was filed in May 2015, older than my oldest son! I have to
admit that I've been exhausted by this sprint.

This post is a summary of the sprint, so you know what landed in the current
development version (to be v1.53 in future) and what to look forward to in the
next CRAN release. If you want to try any of it now, grab the development
version:

``` r
install.packages('knitr', repos = 'https://yihui.r-universe.dev')
```

Unless anything urgent comes up, the next CRAN release of **knitr** won't take
place until a few months later, so you should have enough time to test
everything mentioned in this post and give me feedback.

## By the numbers

Over these four days of backlog work:

-   123 issues closed
-   57 pull requests merged
-   31 new features and 18 bug fixes recorded in `NEWS.md`

A large share of the closed issues were questions, stale reports, or things that
had quietly been fixed years ago and just never got closed. Clearing those out
is not glamorous work, but a tidy tracker is a lot easier to reason about, and
it makes the genuinely open problems easier to see.

I did not, however, get all the way to zero. **knitr** still has a tiny number
of open issues, so once again I have to admit that [I can't beat Will
Landau](/en/2023/10/markdown-complete/) (even with AI).

## A small change, thirteen years in the making

Let me start with a minor one---not the most important thing that landed this
cycle, but the one with an interesting backstory. It's a tiny change in output,
and it took me thirteen years to make (of course, I didn't think of it every
day).

The idea: in a single code chunk, echo one line of code but show the *result* of
another. For example, show the reader `mtcars` in the source, but display the
output of `rmarkdown::paged_table(mtcars)` instead of the raw data frame:

```` md
```{r, echo=1, eval=2}
mtcars
rmarkdown::paged_table(mtcars)
```
````

Jared Lander first asked me for this (not these two lines of code but something
similar---I recall it was SQL-related) at the New York Strata conference in
2013. I remember thinking it was both a little tricky to implement and a little
like "cheating"---showing code you didn't actually run---so I quietly let it
sit. It came back as [#2129](https://github.com/yihui/knitr/issues/2129) in
2022, I said "okay, let's reconsider," and then... I let it sit again.

The `eval` option has long accepted a numeric vector to evaluate only certain
lines, but the lines that were echoed-but-not-evaluated got a `##` comment
prefix slapped on them, so you couldn't cleanly show them as real code. That
comment prefix is now gone: the un-evaluated lines are masked internally with a
sentinel comment (so `evaluate()` still skips them) that is stripped back out of
the echoed source. So `eval=2` echoes both lines verbatim and runs only the
second, and the example above echoes `mtcars` as-is while showing only the
`paged_table()` result.

Thirteen years for a two-character change in output. Sometimes the sitting is
the hard part. With that out of my system, below is a list of other (more
substantial) things done through the sprint.

## New features, grouped by theme

Thirty-one new features is a lot to list flat, so I've written up the
interesting ones in a handful of companion posts organized by topic:

-   [Tangling gets smarter](/en/2026/09/knitr-tangle/) --- `purl()` can now
    tangle non-R documents, read chunks from other documents, run option hooks,
    and more.
-   [A more capable cache](/en/2026/09/knitr-cache/) --- customize how objects
    are cached (great for **terra** and other external-pointer objects), and let
    cached chunks depend on uncached ones.
-   [Better tables with `kable()`](/en/2026/09/knitr-tables/) --- accessibility
    improvements, math-mode numbers, caption placement, and more.
-   [The `sql` engine grows up](/en/2026/09/knitr-sql/) --- multi-statement
    output, custom result functions, affected-row reporting, and finer control
    over execution.
-   [`spin()` improvements](/en/2026/09/knitr-spin/) --- spin scripts written in
    other languages, keep **roxygen2** blocks intact, and better round-tripping
    with `purl()`.
-   [Three new debugging aids](/en/2026/09/knitr-debugging/) --- clickable error
    locations, warning backtraces, and live logging of executing code.

## Major bug fixes

### `current_input()` returned the wrong filename under Quarto

Quarto hands **knitr** an intermediate `.rmarkdown` file, so `current_input()`
was reporting that instead of your actual `.qmd`. Code that keyed off the input
filename got confused:

```` md
```{r}
knitr::current_input()  # "report.rmarkdown" under Quarto, not "report.qmd"
```
````

It now returns the original `.qmd`
([#2384](https://github.com/yihui/knitr/issues/2384)).

### `purl()` choked on chunk options that referenced `params`

If your R Markdown document defined `params` in the YAML header and a chunk used
them in its options, tangling the document with `purl()` threw an error like
`object 'params' not found` and left the chunk out of the script, because
`params` wasn't available when the option was evaluated during tangling:

```` md
---
params:
  eval: true
---

```{r, eval=params$eval}
print(params$eval)
```
````

Now the YAML `params` are parsed (statically---no code is run) and made
available, so the option evaluates and the chunk is kept
([#1938](https://github.com/yihui/knitr/issues/1938)).

### `verbatim` chunks obeyed a global `echo = FALSE` and showed nothing

The whole point of a `verbatim` (or `embed`) chunk is to display its content
literally. But a document-wide `echo = FALSE`---common in slides, and the
default in Quarto's `revealjs` format---was hiding that content, which defeats
the purpose:

```` md
```{r, include=FALSE}
knitr::opts_chunk$set(echo = FALSE)   # hide all R source globally
```

```{verbatim}
This block should still be shown---but used to vanish.
```
````

A `verbatim` chunk now ignores a *global* `echo = FALSE` and always shows its
content; an `echo = FALSE` set on the chunk itself is still honored, so you can
hide a specific one when you want to. This came out of
[#2239](https://github.com/yihui/knitr/issues/2239), a running wishlist of
Quarto-support improvements that Christophe Dervieux has been keeping---several
items from it have now shipped.

### The `ffmpeg` animation hook swallowed failures

If `ffmpeg` exited with an error, **knitr** happily carried on and produced a
document pointing at a video file that was never created---and with caching on,
it could even cache the broken result:

```` md
```{r, fig.show='animate', animation.hook='ffmpeg'}
for (i in 1:10) plot(runif(20))   # produced a dead video link if ffmpeg failed
```
````

Now it errors out loudly, as it should have all along
([#2130](https://github.com/yihui/knitr/issues/2130)).

### `read_chunk()` could crash `purl()` on innocent-looking code

Detection of `read_chunk()` calls used to be a crude string match, so a closing
parenthesis inside a string argument could break tangling with a parse error:

```` md
```{r}
read_chunk(lines = ")")   # the ")" in a string used to crash purl()
```
````

It now parses the code and inspects the syntax tree, which also means functions
whose names merely end in `read_chunk` are no longer mistaken for it, and
namespaced calls (`knitr::read_chunk()`) are finally recognized
([#1753](https://github.com/yihui/knitr/issues/1753)).

### Multi-device chunks ignored your device settings

When you asked for more than one device, the plot was actually *recorded* on the
default `pdf` device with default arguments, so measurement-sensitive settings
like `pointsize` were quietly lost:

```` md
```{r, dev=c('cairo_pdf', 'svg'), dev.args=list(pointsize=8)}
plot(cars)   # pointsize=8 was ignored during recording
```
````

The first device (and its `dev.args`) is now used for recording
([#1323](https://github.com/yihui/knitr/issues/1323)).

### Centered subfigures across multiple rows were left-aligned in LaTeX

When you laid out subfigures over multiple rows inside a centered figure, the
rows were separated by `\newline`, which ignores the alignment and pins the
subfigures to the left:

```` md
```{r, fig.subcap=c('a','b','c'), fig.ncol=1, fig.align='center', out.width='30%'}
plot(1:10)
plot(cars)
boxplot(count ~ spray, InsectSprays)
```
````

The rows are now separated by `\\`, which centers them correctly. This one had
been open since 2020 ([#1907](https://github.com/yihui/knitr/issues/1907)).

### `include_graphics(dpi = ...)` did nothing outside HTML and LaTeX

For Word and other Pandoc formats, the `dpi` argument was ignored, so images
came out at whatever size Pandoc guessed:

```` md
```{r}
knitr::include_graphics("diagram.png", dpi = 150)  # dpi ignored for Word/ODT
```
````

The physical size is now computed from the pixel dimensions and emitted (e.g.,
`{width=2in}`), which Pandoc understands
([#2385](https://github.com/yihui/knitr/issues/2385)).

### Chunk references via `<<>>` didn't work everywhere

**knitr** lets you [reuse a chunk's code by
reference](https://bookdown.org/yihui/rmarkdown-cookbook/reuse-chunks.html):
write `<<label>>` on a line and the body of the chunk labelled `label` is
spliced in. Handy for showing the same code in two places, or building up an
example from named pieces. But there was a catch that tripped people up for
years: the reference had to occupy a whole line by itself. The moment you tried
to combine it with other code on the same line---most naturally, a pipe---it
silently failed to expand:

```` md
```{r, eval=FALSE}
mtcars %>%
  <<filter-cyl>> %>%
  <<filter-gear>>
```
````

The last reference (on its own line) would expand, but the one followed by `%>%`
would not, leaving a stray `<<filter-cyl>>` in your rendered output. Since
piping named steps together is exactly the sort of thing you'd want chunk reuse
for, this was a real papercut.

Now a reference can sit inline with other code, and a referenced chunk that
spans multiple lines is spliced in with its continuation lines indented to
match, so the pipeline above expands the way you'd expect
([#2034](https://github.com/yihui/knitr/issues/2034)).

## Everything else

A grab bag of smaller additions that didn't warrant their own post but might be
exactly what you need:

-   A code chunk returning a `shiny.tag` / `shiny.tag.list` (e.g., from
    **htmltools**) can now have a figure caption and be cross-referenced, just
    like an htmlwidget ([#1650](https://github.com/yihui/knitr/issues/1650)).
-   `fig.cap.command` lets you customize the LaTeX command used for figure
    captions, e.g., for figures in an appendix
    ([#1872](https://github.com/yihui/knitr/issues/1872)).
-   `fig.topcaption` (caption above the figure) now works for LaTeX/PDF, not
    just HTML ([#1990](https://github.com/yihui/knitr/issues/1990)).
-   The alt text embedded in a **ggplot2** object (via `labs(alt = ...)`) is
    picked up automatically as the default `fig.alt`
    ([#2001](https://github.com/yihui/knitr/issues/2001)).
-   An `Rcpp` chunk that reads its code from multiple files via the `file`
    option (e.g., `file = c("foo.h", "foo.cpp")`) now makes all the files
    available side by side and compiles the last `.cpp`/`.cc`, so a source file
    can `#include` its sibling headers
    ([#2367](https://github.com/yihui/knitr/issues/2367)).
-   Added a `ps` engine for PowerShell chunks; set
    `engine.opts = list(command = "pwsh")` for cross-platform PowerShell
    ([#1932](https://github.com/yihui/knitr/issues/1932)).
-   The `tikz` engine gained an `engine.opts` element `density` to control the
    DPI when rasterizing to PNG
    ([#2114](https://github.com/yihui/knitr/issues/2114)).

## Thanks

Big thanks to everyone who filed an issue, left a reproducible example, or sent
a pull request during this round: [\@ABSOD](https://github.com/ABSOD), Antonio
Canepa ([\@ajcanepa](https://github.com/ajcanepa)), Antoine Languillaume
([\@ALanguillaume](https://github.com/ALanguillaume)),
[\@alchemit](https://github.com/alchemit), alex hayes
([\@alexpghayes](https://github.com/alexpghayes)), Amar Al-Zubaidi
([\@amarz45](https://github.com/amarz45)), Amelia McNamara
([\@AmeliaMN](https://github.com/AmeliaMN)),
[\@AndhikaWB](https://github.com/AndhikaWB), Alison Presmanes Hill
([\@apreshill](https://github.com/apreshill)), Aren Cambre
([\@arencambre](https://github.com/arencambre)),
[\@aryoda](https://github.com/aryoda), Philipp Aschersleben
([\@aschersleben](https://github.com/aschersleben)), Aymeric Stamm
([\@astamm](https://github.com/astamm)), [\@atusy](https://github.com/atusy),
Anne-Wil ([\@AWKruijt](https://github.com/AWKruijt)), Angelo D'Ambrosio
([\@bakaburg1](https://github.com/bakaburg1)), Sebastian Meyer
([\@bastistician](https://github.com/bastistician)), Benjamin Smith
([\@benyamindsmith](https://github.com/benyamindsmith)),
[\@bergsmat](https://github.com/bergsmat),
[\@bersbersbers](https://github.com/bersbersbers), Bill Denney
([\@billdenney](https://github.com/billdenney)), Brian Diggs
([\@BrianDiggs](https://github.com/BrianDiggs)), Alex Reinhart
([\@capnrefsmmat](https://github.com/capnrefsmmat)), Christophe Dervieux
([\@cderv](https://github.com/cderv)), Claudiu Papasteri
([\@ClaudiuPapasteri](https://github.com/ClaudiuPapasteri)), Colin J. Brislawn
([\@colinbrislawn](https://github.com/colinbrislawn)), Connor P. Jackson
([\@connorp](https://github.com/connorp)), Carson Sievert
([\@cpsievert](https://github.com/cpsievert)), Michael Cysouw
([\@cysouw](https://github.com/cysouw)),
[\@DaniMori](https://github.com/DaniMori), David W. Body
([\@davidbody](https://github.com/davidbody)), David C. Norris
([\@dcnorris](https://github.com/dcnorris)), Peter DeWitt
([\@dewittpe](https://github.com/dewittpe)), David McArthur
([\@dmca-glasgow](https://github.com/dmca-glasgow)),
[\@dmurdoch](https://github.com/dmurdoch), Daniel Possenriede
([\@dpprdan](https://github.com/dpprdan)), Dr Andi Lowe
([\@DrAndiLowe](https://github.com/DrAndiLowe)), Elika Bergelson
([\@ebergelson](https://github.com/ebergelson)),
[\@edalfon](https://github.com/edalfon), Edwin de Jonge
([\@edwindj](https://github.com/edwindj)), Elio Campitelli
([\@eliocamp](https://github.com/eliocamp)), Iñaki Ucar
([\@Enchufa2](https://github.com/Enchufa2)), 饺子w (Yumechi)
([\@eternal-flame-AD](https://github.com/eternal-flame-AD)), Florian Detsch
([\@fdetsch](https://github.com/fdetsch)), Tamás Ferenci
([\@ferenci-tamas](https://github.com/ferenci-tamas)), Floris Vanderhaeghe
([\@florisvdh](https://github.com/florisvdh)), Francesco Tabaro
([\@ftabaro](https://github.com/ftabaro)),
[\@gavril0](https://github.com/gavril0),
[\@GitHunter0](https://github.com/GitHunter0), Gregor Sturm
([\@grst](https://github.com/grst)), Scott Rohde
([\@gsrohde](https://github.com/gsrohde)), Hadley Wickham
([\@hadley](https://github.com/hadley)), Doug Hemken
([\@Hemken](https://github.com/Hemken)), Henrik Bengtsson
([\@HenrikBengtsson](https://github.com/HenrikBengtsson)), Hongyuan Jia
([\@hongyuanjia](https://github.com/hongyuanjia)), David Hugh-Jones
([\@hughjonesd](https://github.com/hughjonesd)), Huanyuan Zhang-Zheng
([\@Hzhang-ouce](https://github.com/Hzhang-ouce)),
[\@iagogv3](https://github.com/iagogv3),
[\@ilia-kats](https://github.com/ilia-kats),
[\@iMarcello](https://github.com/iMarcello),
[\@JackCaster](https://github.com/JackCaster), Jakson Alves de Aquino
([\@jalvesaq](https://github.com/jalvesaq)), Jeroen Ooms
([\@jeroen](https://github.com/jeroen)), Jordan Mark Barbone
([\@jmbarbone](https://github.com/jmbarbone)), Joseph Guillaume
([\@josephguillaume](https://github.com/josephguillaume)), Jake Roden-Foreman
([\@jrf1111](https://github.com/jrf1111)),
[\@justanothergithubber](https://github.com/justanothergithubber), Brock
([\@katrinabrock](https://github.com/katrinabrock)), Kenneth C. Arnold
([\@kcarnold](https://github.com/kcarnold)), Kene David Nwosu
([\@kendavidn](https://github.com/kendavidn)), Kevin Ushey
([\@kevinushey](https://github.com/kevinushey)), Pavel N. Krivitsky
([\@krivit](https://github.com/krivit)), Kirill Müller
([\@krlmlr](https://github.com/krlmlr)), Kyle F Butts
([\@kylebutts](https://github.com/kylebutts)), Leonardo Gama
([\@leogama](https://github.com/leogama)), Lionel Henry
([\@lionel-](https://github.com/lionel-)), Louisa Smith
([\@louisahsmith](https://github.com/louisahsmith)), Maëlle Salmon
([\@maelle](https://github.com/maelle)), Dr. Ryan McShane
([\@math-mcshane](https://github.com/math-mcshane)), Max Held
([\@maxheld83](https://github.com/maxheld83)), Michał Bojanowski
([\@mbojan](https://github.com/mbojan)), Matthew Hall
([\@mdhall272](https://github.com/mdhall272)),
[\@mdingemanse](https://github.com/mdingemanse),
[\@mgacc0](https://github.com/mgacc0), Michael Chirico
([\@MichaelChirico](https://github.com/MichaelChirico)), Mine Cetinkaya-Rundel
([\@mine-cetinkaya-rundel](https://github.com/mine-cetinkaya-rundel)), Mark
([\@mrdowdeswell](https://github.com/mrdowdeswell)), Marcel Schilling
([\@mschilli87](https://github.com/mschilli87)), Martin Morgan
([\@mtmorgan](https://github.com/mtmorgan)), Marc Wouts
([\@mwouts](https://github.com/mwouts)), nassuphis
([\@nassuphis](https://github.com/nassuphis)), Nicholas Tierney
([\@njtierney](https://github.com/njtierney)),
[\@notfound4](https://github.com/notfound4), Olivier Meslin
([\@oliviermeslin](https://github.com/oliviermeslin)),
[\@olivroy](https://github.com/olivroy), Owen Jones
([\@owenjonesuob](https://github.com/owenjonesuob)), PKleka
([\@pa0](https://github.com/pa0)), Christopher Paciorek
([\@paciorek](https://github.com/paciorek)), Martin Nyolt
([\@PapaNappa](https://github.com/PapaNappa)), Paul Rougieux
([\@paulrougieux](https://github.com/paulrougieux)), Pawel Rucki
([\@pawelru](https://github.com/pawelru)), Eric Potash
([\@potash](https://github.com/potash)), Ramnath Vaidyanathan
([\@ramnathv](https://github.com/ramnathv)), Eric Stemmler
([\@rcst](https://github.com/rcst)), [\@rfenouil](https://github.com/rfenouil),
Ross Gayler ([\@rgayler](https://github.com/rgayler)), Robert Hijmans
([\@rhijmans](https://github.com/rhijmans)), Richard Mills
([\@Rich-F-G-Mills](https://github.com/Rich-F-G-Mills)), Richard Iannone
([\@rich-iannone](https://github.com/rich-iannone)), Rebecca Butler
([\@rkb965](https://github.com/rkb965)), Robert
([\@rnorberg](https://github.com/rnorberg)), Ruben C. Arslan
([\@rubenarslan](https://github.com/rubenarslan)),
[\@RussellSteele](https://github.com/RussellSteele), Sven
([\@sboge](https://github.com/sboge)), David Selby
([\@Selbosh](https://github.com/Selbosh)), Simone Giannerini
([\@sgiannerini](https://github.com/sgiannerini)), Shaun Nielsen
([\@Shaunson26](https://github.com/Shaunson26)), Taha Ahmed
([\@solarchemist](https://github.com/solarchemist)), Sören Nikolaus
([\@srnnkls](https://github.com/srnnkls)),
[\@StephenGerry](https://github.com/StephenGerry), Steve Condylios
([\@stevecondylios](https://github.com/stevecondylios)),
[\@stla](https://github.com/stla), Tim Florian Jaeger
([\@tfjaeger](https://github.com/tfjaeger)), Tim Mastny
([\@tmastny](https://github.com/tmastny)), Tom 2 Philippi
([\@tphilippi](https://github.com/tphilippi)), Felix Turbanisch
([\@turbanisch](https://github.com/turbanisch)), Robin Shannon
([\@vorpalvorpal](https://github.com/vorpalvorpal)), wikithink
([\@wikithink](https://github.com/wikithink)), Will Landau
([\@wlandau](https://github.com/wlandau)), [\@wuffi](https://github.com/wuffi),
[\@wzel](https://github.com/wzel), [\@youdie006](https://github.com/youdie006),
Zach Deane-Mayer ([\@zachmayer](https://github.com/zachmayer)), Achim Zeileis
([\@zeileis](https://github.com/zeileis)), and
[\@znmeb](https://github.com/znmeb).

The tracker is a lot cleaner now, but I guess new issues/PRs will slowly come
again. If you run into something, please [file an
issue](https://github.com/yihui/knitr/issues), and I'll see you after the next
decade! Just kidding---I'll process your issues when I have time.

## A word on sponsorship

A little while ago I wrote about [whether I should ask for
sponsorship](/en/2026/09/sponsorship/) now that I'm no longer paid to maintain
the R Markdown ecosystem. I went back and forth on it, and in the end listed a
few ways to support the work with, as I said then, zero expectation.

Zero expectation turned out to be the right frame. Since that post I've received
a total of 35 US dollars, plus 100 Chinese yuan (roughly 15 dollars), and a new
GitHub sponsor with \$5/month. These are not numbers that change anything
financially---but because I truly expected nothing, it is infinitely better than
my expectation. I sincerely thank the four kind sponsors.

I'm not surprised by how hard the sponsorship model is for individuals. Even
with whatever visibility I have after years in this community, the numbers are
what they are. And I'm one of the *lucky* ones: there are countless open-source
contributors with far less visibility than me, quietly maintaining things the
rest of us depend on, for whom getting sponsored at all would be dramatically
harder. If you have the means and the inclination to support open source, please
don't stop at the maintainers you've already heard of---the ones you haven't
heard of may need it more.
