---
title: Creating Tag Cloud Using R and Flash / JavaScript (SWFObject)
date: '2009-06-10'
slug: creating-tag-cloud-using-r-and-flash-javascript-swfobject
---

Tag cloud is a bunch of words drawn in a graph with their sizes proportional to their frequency; it's widely used in blogs to visualize tags. We can observe important words quickly from a tag cloud, as they often appear in large fontsize. Tony N. Brown asked how to [graphically represent frequency of words in a speech](https://stat.ethz.ch/pipermail/r-help/2009-June/200645.html) the other day in R-help list, which is actually a problem about the tag cloud:

> I recently saw a graph on television that displayed selected words/phrases in a speech scaled in size according to their frequency. So words/phrases that were often used appeared large and words that were rarely used appeared small. [...]


Marc Schwartz mentioned that [Gorjanc Gregor](http://ggorjan.blogspot.com/) has done [some work](http://www.bfro.uni-lj.si/MR/ggorjan/software/R/index.html#tagCloud) years ago using R (in grid graphics). The obstacle of creating tag cloud in R, as Gorjanc wrote, lies in deciding the placement of words, and it would be much easier for other applications such as browsers to arrange the texts. That's true -- there have already been a lot of mature programs to deal with tag cloud. One of them is the `wp-cumulus` plugin for WordPress, which makes use of a Flash object to generate the tag cloud, and it has fantastic 3D rotation effect of the cloud.


# 1. Arranging text labels with `pointLabel()`

Before introducing how to port the plugin into R, I'd like to introduce an R function `pointLabel()` in **maptools** package and it can partially solve the problem of arranging text labels in a plot (using simulated annealing or genetic algorithm). Here is a simulated example:

![Simulated Tag Cloud with R function pointLabel in maptools](https://db.yihui.org/imgur/dnWDx.png)

```r 
library(maptools)
set.seed(123)
x = runif(19)
y = runif(19)
w = c("R", "is", "free", "software", "and", "comes",
    "with", "ABSOLUTELY", "NO", "WARRANTY", "You", "are", "welcome",
    "to", "redistribute", "it", "under", "certain", "conditions")
par(ann = FALSE, xpd = NA, mar = rep(2, 4))
plot(x, y, type = "n", axes = FALSE)
pointLabel(x, y, w, cex = runif(19, 1, 5))
```

I was fortunate to get a very neat graph with no labels overlapping, but I don't think this is a good solution, as it doesn't take care of the initial locations of the words. My rough idea about deciding the initial locations is to sample on circles with radii proportional to the frequency, i.e. let x = freq * sin(&theta;) and y = freq * cos(&theta;) where &theta; ~ U(0, 2&pi;). In this case, important words will be placed near the center of the plot.

# 2. Creating tag cloud in a Flash movie using R

The problem becomes quite easy with a Flash movie [tagcloud.swf](http://www.roytanck.com/2008/05/19/how-to-repurpose-my-tag-cloud-flash-movie/) and a JavaScript program [swfobject.js](http://blog.deconcept.com/swfobject/). The mechanism, briefly speaking, is that the tag information is passed to the Flash object by JavaScript, and the Flash object will read the variable `tagcloud` where the sizes, colors and hyperlinks of tags are stored. Finally the tags are visualized like rotating cloud.

It's not difficult to pass the tag information to JavaScript in pure text. The function `tag_cloud()` in the **fun** package can create an HTML page with a tag cloud Flash movie inside it.

The main argument is `tagData` which is a data.frame containing at least three columns (`tag`, `link` and `count`) and looks like:

```r 
> head(tagData)
                tag                                        link count
1 2D Kernel Density http://yihui.org/en/tag/2d-kernel-density/     1
2         algorithm         http://yihui.org/en/tag/algorithm/     1
3         Animation         http://yihui.org/en/tag/animation/    11
4           AniWiki           http://yihui.org/en/tag/aniwiki/     2
5            Arcing            http://yihui.org/en/tag/arcing/     1
6          arrows()            http://yihui.org/en/tag/arrows/     1
```

Additional columns `color` and `hicolor` will be used if they exist (hexadecimal numbers specifying RGB), e.g.

```r 
> head(tagData)
                tag                                        link count  color hicolor
1 2D Kernel Density http://yihui.org/en/tag/2d-kernel-density/     1 2163bb  f0763d
2         algorithm         http://yihui.org/en/tag/algorithm/     1 9f0f38  d825b1
3         Animation         http://yihui.org/en/tag/animation/    11 800130  5b8d6a
4           AniWiki           http://yihui.org/en/tag/aniwiki/     2 7ce1df  6607b0
5            Arcing            http://yihui.org/en/tag/arcing/     1 df4e4a  f5cdf2
6          arrows()            http://yihui.org/en/tag/arrows/     1 31f5fb  19d50d
```

# 3. Example

Here is an example on visualizing my blog tags.

```r 
library(fun)
tagCloud(tagData)
```

The above code will generate an HTML page. You can adjust the parameters as you wish.

# 4. Other issues

There is still one more step to answer Tony's original question, namely splitting the speech into single words and computing the frequency. This can be (roughly) done by `strsplit(..., split = " ")` and `table()`.

Encoding problems may exist in the above code, but `URLencode(tagXML)` could be of help.

Only Latin characters are supported, but there's possibility to modify the Flash source file to support other languages. See [Roy Tanck's post](http://www.roytanck.com/2008/03/15/wp-cumulus-released/) for more information.

Other R resources I know so far:

- The R package [`R4X`](http://r-forge.r-project.org/projects/r4x/) by [Romain Fran?ois](http://romainfrancois.blog.free.fr): you can generate an HTML page containing the tags with _dynamic_ classes attached to the `<span>` tags (install the package and read its vignette: `install.packages('R4X', repos='http://r-forge.r-project.org'); vignette('r4xslides', package='R4X')`)
- The R package [`snippets`](http://www.rforge.net/snippets/) by [Simon Urbanek](http://simon.urbanek.info/): there is a function `cloud()` to create word cloud; words are arranged from top to bottom and left to right. See the 23rd reply below for an example (thanks, Emilio).

