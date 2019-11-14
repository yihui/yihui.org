---
title: The First Notebook War
date: '2018-09-10'
subtitle: So Joel Grus doesn't like Jupyter notebooks. Here are some of my thoughts on notebooks, IDE, and R Markdown.
slug: notebook-war
show_toc: true
---

Last week I learned about an interesting JupyterCon talk given by Joel Grus titled "[I Don't Like Notebooks](https://docs.google.com/presentation/d/1n2RlMdmv1p25Xy5thJUhkKGvjtV-dkAIsUXP-AL4ffI/preview#slide=id.g362da58057_0_1)". I'd applaud the open-mindedness of the conference committee to invite Joel to give such a talk to (presumably so many) notebook lovers. I agree with Joel that criticizing a popular tool is not "an unhelpful way to spend time" (see slide #4). I wish there were more criticism to popular tools in the R world, and personally I'd welcome criticism and complaints about my own work.^[It doesn't mean you have to be harsh. For example, this post "[What is hard about blogdown?](https://community.rstudio.com/t/8108)" by Alison is a good one. I'm always interested in knowing the possible pain you have with tools that I created.]

Joel's talk triggered a lot of discussions on Twitter (come on, people, let's get off Twitter whenever there is something worth a deep discussion). For example, [Hilary Parker doesn't like notebooks](https://twitter.com/hspter/status/1034511489632067584), either. Philip Guo [declared](https://twitter.com/pgbovine/status/1034626381735317504) that the summer 2018 ended with "the first great notebook war". "A war between whom and whom?" You may ask. I guess it was a war between notebooks and editors/IDEs.

Before I start this post, I want to mention that I know little about Python (I have written one short Python script in total in my life), and I don't use Jupyter myself. In fact, I also rarely use any notebooks, including R Markdown notebooks. That is mainly because I'm a software developer (engineer). For this reason, I think I can understand Joel's complaints about notebooks pretty well. My main point is that if you use notebooks for _software engineering_, you are probably using the wrong tool, no matter how popular it is. I'm not sure if Joel would agree with me, but if I were to give this talk, that would be my main message to the audience.

While reading Joel's critiques on Jupyter notebooks, I couldn't help thinking whether they apply to R Markdown notebooks, or R Markdown documents in general, so I'll mention how some of the problems have been addressed in the R Markdown ecosystem in this post, too.

## The two cultures: the R vs Python culture, or data analysis vs software engineering culture

I feel a major difference between the R culture and Python culture is that Python users seem to _create_ code more often, whereas R users often _use_ code. There seems to be a strong atmosphere of software engineering in the Python world: in the beginning was the custom _class_ (with methods). For R users, in the beginning was the _data_.

I think notebooks are more suitable for a world where the data analysis culture is stronger than the engineering culture. Joel insists that even if you are only experimenting or prototyping, you should follow good software engineering rules (slides #46-49). I tend to disagree, because prototyping is prototyping, and engineering is engineering. Good software engineering is important, but I don't think it is necessary to write unit tests or factor out code at the prototyping stage. It is fine to do these things later, but again, I agree with Joel that if you are going to develop software seriously later, you'd better leave the notebook and use a real editor or IDE instead (e.g., to write reusable modules or packages).

How about doing data analysis in notebooks? Is "good software engineering" relevant? I'd argue that it is not highly relevant, and it is fine to use notebooks. Analyzing data and developing software are different in several aspects. The latter is meant to create generally useful and reusable products, but the former is often not generalizable---you only analyze a specific dataset, you want to draw conclusions from the specific data, and you may not be interested in or have the time to make your code reusable by other people (or it may not be possible). When the analysis is done, it is done (pretty much). Of course, if you happen to discover any parts that could be potentially reusable and useful, you could factor them out into a package, but I think this should be relatively rare---how many packages like [**dplyr**](https://dplyr.tidyverse.org) have been abstracted or distilled from the process of data analysis? Not many.

How would you write unit tests for data analysis? I feel it will be both tricky and unnecessary. For a function/method, if you defined it, you know what its expected output should be. For data, you often don't know what exactly to expect in the output. For example, when you subset a dataset, how do you know the result is correct?

```r
mtcars2 = dplyr::filter(mtcars, hp > 100)
```

That is probably not something you, as a data analyst, need to worry about. It is the responsibility of the package author (the software engineer) to write enough unit tests in the package that you are using.

On the other hand, data analysts often do tests in an informal way, too. As they explore the data, they may draw plots or create summary tables, in which they may be able to discover problems (e.g., wrong categories, outliers, and so on). Notebooks are great for these inline output elements, from which you can make quick discoveries.

## What do notebooks and spreadsheets have in common?

Or ask it another way, why are notebooks so popular? My answer is that they make the (typically boring and abstract) program code much more _tangible_. You can see the output of each snippet of source code right below the snippet of source code. Although Joel's #1 complaint about notebooks is that it is hard to reason about the output due to the possible out-of-order execution of cells, I think being able to see the output inside the source document can actually help you reason about the code better. Yes, you can use the traditional way of running code line by line, and see the output in the console, but the distance between source and output is much longer. Imagine you create ten plots in ten snippets of code, it will be quite messy to have ten separate plot windows floating around on your screen, and it is hard to know which piece of code created which plot. It will be worse if a plot doesn't have a title, in which case you may not even remember what story a particular plot is supposed to tell.

I think notebooks are popular for the same reason that explains the popularity of spreadsheets such as Excel. I haven't met a single software engineer who loves Excel. [Everyone hates it and makes fun of it](https://twitter.com/brookLYNevery1/status/1037462991015432195), but why do so many users still use it? Again, Excel makes things tangible. You can touch the data (although it is usually a very bad idea), and draw graphics in a sheet that contains the source data (bad idea again). It makes you feel everything is well under your control: oh here is my data, and here is a graph next to it; oh I should use that column to draw the graph instead, so let me change it and I can see the updated graph immediately.^[I have to say that Excel is one of the best examples of reactive programming in my eyes. No matter how hard you laugh at Excel, the reactivity through formulas and cell references is genius.] You can do everything in a single place, and the short distance between the source (data) and the output is ace.

Excel makes things tangible at the price of making things messy (e.g., it may contain manually edited data that is hard to keep track of, or merged cells or graphs that make it hard for other software to read the data). By comparison, although notebooks can mess up the state, but that is only an intermediate problem. At its core, it is still relatively clean and encourages the reproducibility principle, i.e., you shall use code to generate results automatically instead of manually copying and pasting results in your report. If you are concerned about the state, you can restart the session and recompile the whole notebook from scratch. Spreadsheets are often hopeless here---you cannot easily restart your brain and redo exactly the same things.

## Things Joel likes about notebooks

Joel mentioned two things he liked about notebooks: well-documented code (and the idea of mixing Markdown and code) and inline plots. I want to expand the first thing a bit. The idea should be attributed to literate programming, a _programming_ paradigm invented by Donald Knuth. Knuth probably didn't expect its popularity in tools for data analysis decades later, but I absolutely love the idea of writing narratives in a specialized authoring language (such as Markdown or LaTeX) instead of the traditional code comments. Using an authoring language makes the narratives easier to read. By comparison, code comments are always boring plain text with no structure or rich-text elements. Literate programming is more suitable in the data analysis culture.

## Joel's complaints about notebooks

If I have read Joel's slides carefully enough and counted it correctly, he mentioned the following 11 problems about Jupyter notebooks.

### 1. Hidden state and out-of-order execution

I agree when this happens, the output can be highly confusing, but I think the biggest issue brought forward from his arguments against notebooks is the lack of mentioning the serious problem of hidden state in all those "notable tutorials", "definitive guide", and "comprehensive beginner's guide". I care a lot about reproducibility, so does RStudio, and we have made a decision on Day One that R Markdown documents should be compiled in new R sessions, which will (mostly) get rid of the problems of hidden state and out-of-order execution. Although many users have complained about it and wanted to run R Markdown documents in the current R session instead, we have never changed the decision. After we created R Markdown notebooks, we have also been constantly alerting users about the potential problems of notebooks. For example, in our book "R Markdown: The Definitive Guide", [we emphasized this issue](https://bookdown.org/yihui/rmarkdown/compile.html) over and over again:

> [...] Again, for the sake of reproducibility, you will need to compile the whole document eventually in a clean environment.

Joel admitted that "the ipython console has plenty of hidden state, too" (slide #26) but he "can scroll back and see the command history to reason about the state" (slide #27). Jupyter provided the `%history` magic to print the command history, and Joel thought it was too much hassle and counterintuitive. I want to mention that this isn't a problem for R Markdown notebooks. When you run cells (we call them "code chunks" in the R world), you can always see the history in the "History" pane in RStudio, e.g., I ran the second cell before the first one, and you can tell it from the right pane below:

![Command history of R Markdown notebooks in RStudio](https://user-images.githubusercontent.com/163582/45166263-379ffd00-b1bc-11e8-9ade-ceeaeef7b594.png)

Anyway, I think as long as Jupyter users are educated well enough to develop the habit of recompiling the whole notebook from scratch in the end instead of just leaving the results from out-of-order execution as the final product, Jupyter is probably fine.

### 2. Notebooks are difficult for beginners

This (slides #33-43) is essentially a corollary of the above hidden state issue. Joel suggested that the (beginner's) tutorials scream out loud "DON'T RUN YOUR CELLS OUT OF ORDER YOU FOOL". I can see the point, but honestly this is not strictly true. Some cells may be independent and do not introduce (hidden) state, and they could be run in arbitrary order, which is sometimes a benefit (you can work on a small part of the notebook a time). Allowing users to run cells in an arbitrary order doesn't necessarily mean giving them enough rope to hang themselves. Even when you script in a text editor or IDE, I don't believe you always run the code in the linear order from beginning to end---you may still need to focus on or iterate certain parts from time to time.

### 3. Notebooks encourage bad habits

Joel mentioned three bad habits encouraged by notebooks:

1. Unnamed notebooks like `Untitled24.ipynb`, `Untitled25.ipynb`, etc. I don't believe this problem is specific to Jupyter notebooks. Everyone must have a bunch of these files (`Untitled.docx`, `Untitled.pptx`, `Untitled23.R`, `Untitled5.Rmd`, ...). Sometimes it is just that the file is not worth saving, and sometimes the user is just [too busy](https://twitter.com/hadleywickham/status/959806329693941760) or lazy to name a file, which is completely understandable.

1. Notebooks don't encourage users to follow good software engineering rules. I tend to agree with the person (whose name was blacked out on slide #46) that data science is not about creating software. However, Joel's "data science" might involve more "creating software" than others. After all, who knows what "data science" really means...^[I only know that real sciences don't have the word "science" in the names, such as chemistry, physics, and biology. They don't call themselves "chemical science", "physical science", or "biological science".] Of course, if your data science is about creating software, you should definitely follow software engineering rules.

1. Notebooks encourage users to import notebooks instead of writing modules or libraries. Joel's complaint here (slides #50-53) makes perfect sense to me.^[Joel mainly criticized a blog post by Adrien Lina, originally titled "[Present Your Data Science Results in a Jupyter Notebook, the Right Way](https://blog.sicara.com/present-data-science-results-jupyter-notebook-import-into-another-108433bc8505)". Oh, this post title was... was so... so... Forget it. You know what I was going to say. After Joel's talk, the author removed "the Right Way" in the title (what does that mean?), but it is still such a general and broad title, which sounds like the title of a 300-page book. Why not using an explicit and clear title "How to import one Jupyter notebook into another" (which is currently the subtitle)? To quote Andrew Gelman, "[Could you say that again less clearly, please?](https://andrewgelman.com/2018/05/13/say-less-clearly-please-general-purpose-data-garbler-applications-requiring-confidentiality/)" The enthusiasm of writing tutorials is great, precious, and will be appreciated, but if you decide to use an attractive title, you should take the responsibility of providing relevant, correct, and solid content, which eyeballs and page views will naturally follow, if you care about this sort of things.] If you want to import code, import code (instead of a notebook). That's it.
    
    Importing a notebook in another is not necessarily a totally bad idea, if you actually import the whole thing (not only the code but also text). This feature is known as "[child documents](https://yihui.org/knitr/demo/child/)" in the R Markdown world (actually in the broader **knitr** world). I think this is a very useful feature, because you can break a giant notebook into smaller ones, on which you can work individually. In the end, you can compile the master notebook, which will run the child notebooks.

### 4. Notebooks discourage modularity and testing

As I said earlier, if you use notebooks to develop software, you are probably using the wrong tool.

### 5. Jupyter's autocomplete, linting, and way of looking up the help are awkward

Again, don't use notebooks to develop software. However, autocomplete and linting are also very helpful even when you are not developing software. I cannot say anything for Jupyter, but for R Markdown notebooks, you get autocomplete and linting "for free" from the RStudio IDE, e.g.,

![Variable defined but not used](https://user-images.githubusercontent.com/163582/45172761-e7c93200-b1cb-11e8-83ad-b19be396526b.png)

For the help info of a function, you will see the hint as you type the function name. And when you type the parentheses, you will see hints about arguments, too. To see the full help page, you can press F1.

![Looking up the help info of a function in RStudio](https://user-images.githubusercontent.com/163582/45173275-4fcc4800-b1cd-11e8-8f83-124ce7fac529.png)

RStudio doesn't care whether you are writing a pure R script or an R Markdown document. Most tools for helping you write code work anywhere. I know it is unfair to compare Jupyter with an fully functional IDE, but using an IDE gives you access to many features that a notebook alone cannot easily provide.

### 6. Notebooks encourage bad processes

Joel thinks it is an extremely bad idea for two notebooks to share state. I agree that sharing state can make things complicated (and introduce potential security risks), but Joel didn't answer the question on slide #75: if the data is huge, reading it once in one notebook and letting another notebook have access to it may be a good idea (or perhaps the only way to go, given the memory limit or time constraint). I think this is fine as long as the user knows clearly what he/she is doing.

Note that when we run scripts in an editor environment, we usually also use a shared process when different scripts are executed interactively in the same console. This is not necessarily bad when doing exploratory data analysis.

### 7. Notebooks hinder reproducible + extensible science

Joel quoted another person on slide #78 that "poorly factored code is bad science". Again, it sounds like he was talking more on the software engineering side. I have no doubt that notebooks are not a great medium to distribute reusable and extensible code.

But... the particular example (the Github repo using neural network to generate music) he used is not very convincing to me. Some problems in the example (slide #84) are completely irrelevant to using notebooks, such as the hard-coded paths, hard-coded parameters, and lack of comments. These problems are very common outside the notebook world, too. As you gain more experience in software engineering, you will surely know that hard-coded paths and parameters are very bad, and you shall comment your code, but these things really take time to learn. The mindset of writing code that can be easily used by others is even harder to obtain. Practically, the authors may not just have the time and only want to get things done for themselves. I don't believe it is the notebook that _encouraged_ these poor practices. On a side note, I actually think notebooks encourage commenting, but it cannot force the user to write enough narratives about the code.

In my opinion, the valid points in his arguments are:

1. If you use notebooks as the only medium to distribute software, you will force other people (who want to reuse your code) to use notebooks, too. This is pretty bad.

1. Jupyter doesn't offer a way to manage requirements (`requirements.txt`).

    I have a question, though. Should it be the responsibility of the notebook tool (such as Jupyter) to manage requirements? Not necessarily. There may be third-party solutions. I don't know enough about Python (maybe `virtualenv` or conda environments?). In R, there are multiple solutions, one of which is [**packrat**](https://rstudio.github.io/packrat/). As you might have guessed, RStudio has integration with **packrat**, which works for any RStudio projects (the project doesn't have to contain notebooks). Again, this is something an IDE can give you for free but may be too much for a notebook tool to offer.
    
    ![Enable packrat in an RStudio project](https://user-images.githubusercontent.com/163582/45180674-af345300-b1e1-11e8-8199-9c81fe0ec64d.png)

Except for these two points, I wouldn't attribute the problems Joel mentioned to notebooks. If there is anything to blame, I guess we have to blame the popularity of notebooks---so popular that people even use them to write software (perhaps they are just victims of the [law of the hammer?](https://en.wikipedia.org/wiki/Law_of_the_instrument)).

### 8. Notebooks make it hard to copy and paste into Slack/Github issues

The main lesson I learned from this part of Joel's slides (#91-102) is that users often don't know how to create [_minimal_ reproducible examples](/en/2017/09/the-minimal-reprex-paradox/). If you know how to minimize an example, you can probably completely get rid of the notebook and provide pure code when asking questions (unless your problem is actually caused by the notebook itself). Debugging code in a notebook is certainly less pleasant than debugging pure code.

On slide #102, I'm curious since Joel doesn't like notebooks, why did he use the notebook format himself to file [the Github issue](https://github.com/chimpler/pyhocon/issues/171)? Did he just file the issue for someone else who passed a notebook to him? I didn't get the point of this slide (maybe I should watch the video recording if it exists somewhere).

Anyway, Jupyter notebooks are not easy to copy and paste because they are not plain text. Well, they are, but they are essentially JSON and feel more like Word (essentially XML) instead of the plain text in the sense of `.txt`. By comparison, R Markdown documents are true plain text (in the sense of `.txt`), so you can easily `Ctrl + C` and `Ctrl + V` (or `Command + C/V`).

### 9. Errors will always halt execution

...unless you install a certain notebook extension. The installation seems to be too much work for Joel and users with whom he wants to share the notebook.

In R Markdown, you just set the chunk option `error = TRUE`, and errors will be shown in the output without halting the process. This is very convenient and useful for people who write tutorials to demonstrate errors on purpose. For example:

````md
```{r, error=TRUE}
1 + "a"
```
````

Then in the output document you will see the error message:

```
Error in 1 + "a" : non-numeric argument to binary operator
```

By default (`error = FALSE`), errors will halt the R process.

### 10. Notebooks make it easy to teach poorly

I feel the problem is more about "the notable Jupyter tutorials are bad" than "notebooks are bad for tutorials". Joel is strongly against the "Ctrl-Enter" type of tutorials. He didn't mention what type of tutorials were good in the slides, but I guess besides the interactive way of running code in notebooks, there are pretty much only two other types of tutorials:

1. Code that you can only stare at. A typical example is hardcopies of books. You cannot easily copy code from paper.

1. Code that you could copy and run by yourself, but you are strongly discouraged to do so. Instead, you are recommended to type out the code by yourself. That is what is advocated by the "[Learn X (Language) The Hard Way](https://learnpythonthehardway.org/python3/intro.html)" series of books.

Yes, notebooks can make the learner lazy (code is given and ready to run), and other types of tutorials force the learner to be diligent. My question is, is it definitely a good thing for everyone to type out the code line by line when learning a programming language? Honestly I have learned a great deal from "copying and pasting from Stack Overflow" (I don't mean [that book](https://www.quora.com/Does-reading-Copying-and-Pasting-from-Stack-Overflow-make-you-a-better-developer); I mean I do copy and paste code from Stack Overflow from time to time). Of course, I don't blindly copy code. I only copy code after I read and fully understand it.

In my opinion, notebooks can save learners time (which may or may not affect the quality of learning, depending on whether the code is worth typing). One unique advantage of notebooks for learning is that learners can modify the code and run it again. This is a great way of learning---[changing stuff and seeing what happens](https://twitter.com/ThePracticalDev/status/720257210161311744/).

### 11. Notebooks make it hard to teach well

By "hard to teach well", Joel meant Jupyter notebooks make it hard for him to write two types of code:

1. Code that is split across multiple cells, and each cell contains an incomplete snippet (slides #114-123).

1. Code that is not meant to be actually executed (slide #124).

For the second problem, if you use R Markdown, the chunk option `eval = FALSE` is all you need, e.g.,

````md
```{r, eval=FALSE}
stopwords_list = c("a", "an", "at", hundreds_of_other_words, "yet", "you")
```
````

The three existing solutions to the first problem in Jupyter are all awkward: `%%add_to dog`, `class MyClass(MyClass)`, and `Table.update = update`. Again, this is not a problem in the **knitr**/R Markdown world. You can write arbitrary incomplete code in code chunks, and compose code chunks freely. _This_, I believe, is the true spirit of literate programming, but is often overlooked by software authors who implement software products using the idea of literate programming. Literate programming is a _programming_ technique. It does not simply mean mixing code and text in a linear order.

Below is a toy example of R Markdown, in which we create a function in three parts in three code chunks respectively:

````md
We define a function to add one to a number:

```{r, func-def, eval=FALSE}
add_one = function(x) {
```

It is a very simple function: it just returns `x + 1`.

```{r, func-body, eval=FALSE}
  return(x + 1)
```

And we are done!

```{r, func-end, eval=FALSE}
}
```
````

None of the above code chunks are meant to be executed individually, so I used the chunk option `eval=FALSE`. I also labeled the code chunks, so I can reference them later in a code chunk that is to be actually executed:

````md
```{r, func-full, ref.label=c('func-def', 'func-body', 'func-end')}
```
````

which will be automatically parsed (by **knitr**) to a complete code chunk like this:

````md
```{r, func-full}
add_one = function(x) {
  return(x + 1)
}
```
````

If you don't want to display the R source code of the chunk `func-full` in the output document (because you have already displayed the three parts before), you can add the chunk option `echo=FALSE`, e.g.,

````md
```{r, func-full, echo=FALSE, ref.label=c('func-def', 'func-body', 'func-end')}
```
````


The code chunk `func-full` can appear _before_ the three code chunks in the document if you want. For example, in a tutorial, you may want to run the function and show your readers the results before you explain each part of the function.

You can even reference other code chunks in the body of a code chunk. For example, if you decide to check if `x` is numeric before computing `x + 1`, you can do:

````md
```{r, func-full-more}
<<func-def>>
  if (!is.numeric(x)) stop("The argument 'x' must be numeric")
<<func-body>>
<<func-end>>
```
````

I guess although R Markdown is very popular in the R world, not many users are aware of these ways of composing code chunks, which is understandable to me, because not many users actually need to explain a long piece of code by parts. Joel is a book author, and happens to want this feature badly.

Joel ended up with copying and pasting code (and explaining each part) in Markdown to his book, as most people do traditionally. I'd argue that this traditional way may actually hinder reproducibility, because it is hard to verify if your code always works after it is pasted into the book. There might be human errors introduced in the process of copy-and-paste. When writing tutorials or books, I believe literate programming is the safest way to go. The problem is just that Jupyter's implementation of literate programming seems to rather limited in Joel's case.

## How you could win Joel over

Jake VanderPlas proposed a "reproducibility mode" for Jupyter notebooks (slide #130), in which

1. Code cells are read-only once executed;

1. New code cells cannot be inserted above previously executed cells;

1. No cell can be executed until all previous cells are executed.

Joel said this would alleviate a lot of his complaints, but as far as I can see, this mode will only address the first problem in the above 11 problems he mentioned in the talk. I'm not sure if this means the rest 10 problems do not matter much to Joel.

Anyway, personally I feel this mode will be a very, very bad idea. It reminds me of a paradox mentioned by Charlie Munger in the book "Poor Charlie's Almanack":

> It's not the bad ideas that do you in, it's the good ideas. And you may say, "That can't be so. That's paradoxical." What he [Graham] meant was that if a thing is a bad idea, it's hard to overdo. But where there is a good idea with a core of essential and important truth, you can't ignore it. And then it's so easy to overdo it. So the good ideas are a wonderful way to suffer terribly if you overdo them.

Out of question, reproducibility is a good idea, but you shouldn't push it so far as to let users suffer.^[The best strategy is to let people "fall into the pit of success" if possible.] Here are my specific comments to the proposal:

1. Code cells are read-only once executed;

    _Who can write the correct code in a single pass? What should users do if they make mistakes in a cell? What if they change their mind?_

1. New code cells cannot be inserted above previously executed cells;

    _Who can plan everything in advance in a data analysis? What should users do if they want to add another model to analyze the data but show it earlier? What shoudl they do if they want to introduce another dataset to be merged into the current dataset?_

1. No cell can be executed until all previous cells are executed.

    _What if a later cell doesn't depend on previous cells, but previous cells are very time-consuming to run? Should the user just sit there and wait?_

The ideal solution in my opinion is very simple, and I have mentioned it earlier in this post when talking about the out-of-order execution problem: just let users do whatever they want in the notebook, but alert them loudly that they shall not fully trust the results until they restart the session and recompile the whole notebook in the linear order. Even when you do serious software engineering, I believe this may be what you do routinely---you may execute different parts of your scripts in the console not in the strictly linear order as you develop the software, you may modify the code after you have executed it, you may insert new code, and so on. In the end, when you build the library, everything will be executed in the linear order in a new session. So why must we make the life of notebook users so different and hard?

Likewise, software engineering rules are certainly good, but I feel we will be overdoing the good idea if we force data analysts to follow these rules. For example, for a data analyst who doesn't write a single function but only uses functions in an existing package to analyze the data, how should she write unit tests? What should she test? Different people have different priorities and constraints.

Joel even wished Jupyter to force people to name new notebooks (slide #131). Naming a file is a good idea, but to force naming is bad. I don't know if Visual Studio Code (the IDE that Joel uses) forces users to give meaningful names to new files.

In conclusion, I don't think we will be able to win Joel over to Jupyter, because he seems to be looking for an IDE to develop software, but Jupyter is not an IDE.

BTW, the last slide (#138) is my favorite. I find vertical slides in reveal.js ridiculous, too. That is a good example of "people are often preoccupied with what they _can_ do and don't think about whether they _should_ do it".

## How about R Markdown notebooks?

Jupyter notebooks are notebooks. Jupyter is the product. R Markdown notebooks are just plain text R Markdown documents. The "notebook" is only [a special execution mode](https://twitter.com/JennyBryan/status/1034629338275016704) of R Markdown documents (as we mentioned in the book "R Markdown: The Definitive Guide"). Or you may treat it as a by-product instead of a product. If you like it, use it; if you don't, use the original R Markdown mode, i.e., the batch mode---click the `Knit` button to compile the whole document in a new R session every time. We don't lock you in the notebook (you can check out anytime and you can _always_ leave).

The other unique thing about R Markdown notebooks is the RStudio IDE support. Autocomplete, linting, and documentation tooltips---they all come from the IDE. When you stand on the shoulders of an IDE, your life with notebooks can be much easier. However, please note that we don't lock you in the RStudio IDE, either. You can compile notebooks through command line or other editors, too (the underlying R packages and Pandoc are all open-source).

Among the 11 problems above, #1 is real for pretty much all notebooks including R Markdown notebooks, but in general I don't think it is a big problem (remember: restart your session and recompile the whole notebook). The RStudio IDE has even explicitly provided a menu for you to restart R and run all code chunks:

![Restart R and Run All Chunks](https://user-images.githubusercontent.com/163582/45199046-66a38680-b22f-11e8-80de-ea639ea32f82.png)

Joel seems to have helped Jupyter users debug many painful problems due to the hidden state and out-of-order execution issues. For some reason, I have never heard such problems from an R Markdown notebook user. Perhaps R users are just too shy to ask or they quietly give up.

For problems #3, #4 and #7, I have argued that notebooks are not suitable for software engineering, and you should consider using a true IDE. For R Markdown users, there is an obvious IDE for you to use. Problem #5 is also solved by the IDE.

Problem #6 is not necessarily bad in my eyes, although it also exists in R Markdown notebooks.

Problem #8 doesn't exist in R Markdown. Problem #9 is trivially easy to solve in R Markdown.

I have no conclusion for problem #10. I don't really know being able to run cells by `Ctrl + Enter` is good or bad for learning. I feel it is not necessarily a bad thing, but I don't have data to support it.

Problem #11 doesn't exist in R Markdown.

Overall I guess Joel's life would be a little easier if he were an R user. Well, actually [R Markdown does support Python](https://twitter.com/xieyihui/status/1035727684524040194) through the [**reticulate**](https://rstudio.github.io/reticulate/) package. In my (biased, of course) opinion, the support is reasonably good, although I guess the RStudio IDE is unlikely to satisfy hardcore Python users looking for features like autosuggest based on the static analysis of type annotations (slide #65). Besides, if you are interested in writing books, you can check out [the **bookdown** package](https://bookdown.org), which is an R Markdown extension. Your life as a book author could be even easier.

## Should we rename "Notebook" to "Scratch Pad"?

I read through some comments on Twitter (e.g., threads started by [Hilary Parker](https://twitter.com/hspter/status/1034511489632067584), [Roger Peng](https://twitter.com/rdpeng/status/1034606358237245440), and [Jenny Bryan](https://twitter.com/JennyBryan/status/1034626933961572352)). My major impression is that those who don't like notebooks feel notebooks are messy, and they are messy in two aspects:

1. The state can be messy, which is exactly the Problem #1 above. Interestingly enough, I found that a fair amount of R Markdown users [didn't seem to know](https://twitter.com/kierisi/status/1034633407299559424) what R Markdown notebooks really are (repeat: a notebook is only _one possible execution mode_ for R Markdown). As a result, they have never suffered from this problem, because they have always been using the batch mode instead of the notebook mode. For those who know what notebooks are, [they just switch to](https://twitter.com/raphg/status/1034642407034314752) the traditional batch mode, which is exactly what we expect them to do.

    Note that we (R Markdown developers) released R Markdown with the batch mode first, and introduced the notebook mode about four years later. That probably explains why the state problem seems to be rare in the R Markdown world.

1. The content can be messy. This point was brought forward by Hilary, and I tend to agree. A notebook encourages you to dump experimental and even random things in it. To quote Hilary:

    > [...] I think they [notebooks] encourage people to write crummy analyses. They're usually not much more than a stream-of-consciousness narrative, like raw model output, then some insufficient comment on it, then a plot, then insufficient comments... etc.

    To quote Roger Peng:
  
    > I think notebooks encourage putting everything into a single document, but that goes against clear communication and developing a coherent narrative of an analysis.

    Do these words remind you of something I mentioned earlier?...
    
    Yes, Microsoft Excel. In Excel, you put raw data, raw output, and everything in a single sheet, with insufficient comments (actually often no comments at all).

Notebooks do encourage experimenting and prototyping. That is why the content can be messy. With that in mind, I feel "scratch pad" would be a more appropriate name practically than "notebook" (and [some people](https://twitter.com/deronaucoin/status/1034513653452746752) do use notebooks as scratch pads).

Can notebooks be used to write a well-structured, thoughtful, and reproducible (data analysis) report? I believe they surely can. Nothing stops you from extracting the useful parts from the scratch pads to write a formal document.

What was the real problem above? I think it is that the expectation of going from a notebook to a sophisticated analysis in a single pass is wrong. In most cases, you cannot skip experimental or exploratory analysis. You don't have to use notebooks for exploratory data analysis, but they are just one possible way to do it. You can, for example, use pure R scripts to do it, too, but you probably will never publish the raw output of all these R scripts as is.

In short, chances are your first notebook will/should not be your final product (e.g., a customer report).

## `xaringan::inf_mr()`, another (lesser-known/unpopular) solution to the out-of-order execution problem

I mentioned four ways to compile an R Markdown document [in the Definitive Guide book](https://bookdown.org/yihui/rmarkdown/compile.html):

1. click the `Knit` button in RStudio;

1. call the function `rmarkdown::render()`;

1. use the notebook mode;

4. or run `xaringan::inf_mr()` (here `inf_mr` stands for [Infinite Moon Reader](http://naruto.wikia.com/wiki/Infinite_Tsukuyomi)).

Only the notebook mode can suffer from the out-of-order execution problem. For the other three ways, the first two have a tiny problem, which may or may not bother you: they require a manual operation each time you recompile the document (click a button, or type a function call).

The fourth way may sound odd but it is also pretty cool. At least [one person has been excited about it](https://twitter.com/cantabile/status/1034216497634131971) for quite a while. It doesn't have the out-of-order execution problem, yet it gives you a pseudo-notebook experience. Essentially it is similar to the first two ways, i.e., it compiles the whole R Markdown document, but it features LiveReload. That is, when you modify the R Markdown source and save the file, the output page will be automatically refreshed after the R Markdown document is recompiled. More importantly, the previous scroll position is preserved after the page is refreshed. This means if you were looking at a code chunk (in the RStudio editor) and its output (in RStudio Viewer) side by side previously, they will still be side by side after you make changes to the source document.^[If you are editing an R Markdown source document of which the output format is `xaringan::moon_reader`, the slide page number will be preserved after refreshing. For example, if you were looking at page #25, the slides will still be on page #25 after they are recompiled.] However, please note that there is no mechanism of synchronizing the scroll positions of the source and output file. They are scrolled independently. Anyway, I think it is helpful that the document can be recompiled automatically on save.

This way can suffer from the state problem, because it compiles R Markdown in the current R session, which means anything in your workspaces is available to the R Markdown document, and anything created by the R Markdown document will be exposed in your workspace. They can pollute each other. This is not necessarily a bad thing (repeat: when in doubt, restart and recompile), and sometimes can be beneficial. For example, if you have a huge data object that takes time to read, you only need to read it once in the current R session, and you can keep using it until the session is ended or you intentionally delete it.

```r
# read the data only if it has not been read
if (!exists('MY_HUGE_DATA')) MY_HUGE_DATA = read_the_data(...)
```

Besides, you can freely examine any objects created in your R Markdown document in the R console. For example, you can draw different plots using the object `MY_HUGE_DATA` in the console before you decide which plot you want, and write the code in R Markdown. This can save you a lot of effort and time, since you don't have to recompile the whole document in a new R session after every single change to see the output. The reproducibility principle is important, but you can leave it to a later stage. Worrying about it in every single minute in your data analysis is costly (in terms of your mental power and time).

## Literate programming, for real (for software development)

As I mentioned in Problem #11 above, you can use the literate programming technique for programming. I have prepared [a concrete example](/rlp/) a couple of years ago. You can see how you could write code in small (incomplete) pieces in different chunks and compose them to a complete package. When reading that example, I strongly recommend that you also read its [R Markdown source document](https://github.com/yihui/rlp/edit/master/vignettes/LP-demo1.Rmd) on Github to know how it actually works.

So yes, you _can_ develop software using literate programming and R Markdown (notebooks). The natural question is whether you _should_. To be honest, I will probably never use this technique to develop software. "Haha, Yihui, so you are only kidding us?" You may ask. No, I'm not. I still believe this technique has its unique advantage that cannot be found in traditional programming methods. That is, the rich documentation (narratives) to explain the code. The narratives can be infinitely _rich_ and _granular_: rich because you can write anything that the authoring language (e.g., Markdown) allows you to write (images, videos, and math equations, etc.), and granular because your can break your long code into any number of smaller units and explain each unit.

Literate programming is unbeatable when you need to explain your code very clearly. Note that Knuth's original implementation was base on TeX (the authoring language) and Pascal (the computing language). To my knowledge, only a few people in the TeX community have adopted this technique---they use literate programming to explain TeX code.^[Is that because TeX code is particularly difficult to understand? I don't know. I don't understand TeX well.] The vast majority of programmers just use comments to explain code in software.

## What if I'm standing at the intersection of software engineering and data analysis?

I'll only answer this question for R users since I'm not familiar with the Python ecosystem. There isn't a clear borderline between software engineers and data analysts. It is likely that sometimes data analysts do need to factor out code and write functions. In this case, should you use the IDE or notebook?

My answer is, if your project is small enough, it is fine to write a few external R scripts and `source()` them in the notebook, otherwise you may consider using the IDE to write an R package, and include your notebooks as _package vignettes_. To quote [Carl Boettiger](https://twitter.com/cboettig/status/1034665522904723457):

> I think a good .Rmd notebook acts like an #rstats vignette: complex code belongs in functions in a package, (with docs and tests if appropriate); the notebook part merely ensures code underlying the narrative & results are reproducible.

Yes, if you have complex code, considering putting them in a package, instead of throwing a thousand lines of code in a notebook.

Although I'm a statistics PhD, I didn't read many papers during my training, but I did read "Statistical Analyses and Reproducible Research" by [Gentleman and Temple Lang (2004)](https://biostats.bepress.com/bioconductor/paper2/). This 14-year old^[The only thing that I'd strongly disagree with the authors is the suggested use of XML. XML would be a terrible authoring language in my opinion. You can see that 14 years later, Markdown has pretty much dominated all plain-text authoring languages.] paper basically proposed that we use the R package structure to manage the data analysis of research projects, because this structure has pretty much everything you need: you can have a `data/` folder, the `R/` and `src/` source folders, the `tests/` folder, and the `vignettes/` folder, etc. You can write good software (yes, please do write unit tests now) and do good data analysis in different folders.

Then after `R CMD build`, you get both a reusable R package that can be distributed to others, as well as data analysis reports that are reproducible.

## Reasons why you don't like R Markdown (notebooks)?

Okay, I'm looking for the Joel Grus in the R Markdown world, and I'd like to know what you don't like about R Markdown and R Markdown notebooks. I saw a few comments on Twitter, like [Roman Luštrik's](https://twitter.com/romunov/status/1034659703173914626):

> I stopped using notebooks because in RStudio, they don't allow a `browser()` call, but otherwise very helpful.

which doesn't seem to be true, though. Perhaps it is because I'm using [a newer version of RStudio](https://www.rstudio.com/products/rstudio/download/preview/). I tried to run the code chunk in the following minimal example, and `browser()` works as expected.

````md
---
title: "R Notebook"
output: html_notebook
---

```{r}
f = function() {
  x = 1:10
  browser()
  x + 1
}
f()
```
````

What else? Please feel free to pour out your thoughts (also feel free to email me if you prefer a private conversation).

## Summary

This is a long post. It took me four full days to write. I like writing and I hope writing can help me think deeply on things of importance. In this case, R Markdown is important to me, so I used Joel Grus as my "mirror". Although he was criticizing Jupyter, I wondered if the criticism could also apply to R Markdown. My overall conclusion is that R Markdown has a relatively solid base and enough deep roots in literate programming to defend itself. That said, I'll be excited if someone plans to give a talk "I don't like R Markdown" at the next [RStudio Confernce](https://www.rstudio.com/conference/).

- In this post, I first talked about the two cultures, namely the data analysis culture, in which people often use code, and the software engineering culture, in which people often create code. I believe notebooks are great for exploratory data analysis, but bad for software engineering.

- Then I tried to explain why notebooks become so popular by an analogy to Excel: people love seeing immediate output that is close to its source, and love putting everything in a single place, so they don't have to constantly switch from one tool or one window to another. Reproducibility introduced by notebooks is more or less merely a coincidence, and users are not attracted by the reproducibility principle but convenience instead. Notebooks cannot guarantee reproducibility, especially when you run cells in a weird order, but they are much better than Excel in terms of reproducibility due to the fact that you always use scripts to do tasks.

- Joel's #1 complaint (hidden state and out-of-order execution) is real but not the end of the world in my eyes. Users have to be better educated on this problem. Problems related to software engineering are better to be solved by an IDE instead of the notebook itself. Jupyter is not an IDE, and that is probably why Joel struggled so much. The rest of problems seem to be the real limits of Jupyter itself. Fortunately, in the R world, the "IDE + Notebook" combo has made a lot of things easier.

- Notebooks encourage experimenting and prototyping, which can lead to crummy analyses, because users simply dump a lot of raw content (such as raw model output) to a notebook. Such a notebook is unlikely to be a proper final data analysis product or report. Don't send this to your boss or customer.

- If you want the notebook feel but absolutely hate the possible out-of-order execution, you may try `xaringan::inf_mr()` (or equivalently, the RStudio Addin "Infinite Moon Reader") on your R Markdown document.

- If you want to use the literate programming technique to develop software, you can, but chances are you don't want to.

- If you do both software engineering and data analysis heavily in a project, consider using an IDE to develop an R package, instead of stuffing your poor notebooks with thousands of lines of code.

Okay, I'm done. If you have made it to the end not through a quick scroll, congratulations! We now live in an age in which [we have forgotten how to read](https://www.theglobeandmail.com/opinion/i-have-forgotten-how-toread/article37921379/), and in fact, also generally lost the ability to do [deep work](http://calnewport.com/books/deep-work/). You can actually forget about those wars in technologies,^[Facepalm! Sorry, I wrote a lengthy post on a technological war and wasted your time. The war itself is not important, but I hope some of my thoughts can be helpful to you.] if you still have the ability to focus on reading one thing for even an hour. That ability is much more important and precious than technology.
