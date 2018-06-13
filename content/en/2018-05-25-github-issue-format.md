---
title: One (Perhaps Surprising) Reason Why I may Silently Ignore a Github Issue
subtitle: Is it incorrectly formatted?
date: '2018-05-25'
slug: github-issue-format
---

Sam Tyner [posted an issue](https://github.com/yihui/xaringan/issues/142) to the **xaringan** repo on Github this afternoon. It was a great issue, and I appreciated that she took the time to write such a detailed issue, so I tried to reply the issue as quickly as I could. However, if this issue were posted from someone I don't know, I would be likely to delay the reply significantly (if a reproducible example were not provided, I'd just ignore the issue). I know this sounds unfair to many people, but with only two hands and 24 hours a day, I have no choice but to skip certain issues.

What made me hesitate when looking at this issue was the incorrect format of the reproducible example. Here is what it looks like:

````markdown
---
title: "Presentation Ninja Headache"
author: "Sam Tyner"
....
---

\```{r setup, include=FALSE}
options(htmltools.dir.version = FALSE)
\```

....

---
class: primary 
# Slide with bg image and  "too much" code

Here is some code 

\```{r}
x <- rnorm(100)
summary(x)
y <- rgamma(100,shape = 1)
summary(y)
summary(x+y)
\```

....
````

Did you notice the backslashes before three backticks? The reason that Sam put in these backslashes was because she forgot [the four-backtick rule](/en/2017/05/four-backticks-github/), which I had blogged about before, and frequently referenced in my Github replies. The rule is quite simple but many people don't know it:

> If you want to show N verbatim backticks in the Markdown output, you have to enclose them in at least N+1 backticks.

Without knowing this rule, users will find it hard to post a reproducible example in R Markdown that contains code chunks, because R Markdown's code chunks use three backticks. Sam put the backslashes in front of the three backticks to prevent the text below from being rendered as code blocks in the output. However, what this means to me, as someone who plans to investigate the issue, is that I will have to copy this example, remove the backslashes, and run the example.

Note the additional step of removing the backslashes. Sometimes that could be [the last straw to break the camel's back](https://en.wikipedia.org/wiki/Straw_that_broke_the_camel%27s_back). If I cannot simply copy an example and run it, I may ignore the issue and move on to the next 30 unread issues.

You may call me inconsiderate, but before I wrote this blog post, I have edited hundreds of Github issues as well as Stack Overflow posts over the years to correct their formatting problems. This three-backtick problem is only one of them. Other common problems include:

1. Do not use verbatim code blocks, e.g., R comments are displayed as section headers because of the `#` character, or YAML metadata looks funny because `---` is interpreted as the second-level section header.

1. Use the blockquote environment for a verbatim code block, i.e., `>` instead of ```` ``` ````. That is wrong. The Markdown content in the "blockquote" may look funny when it contains special characters, e.g., a line starting with `+` could become a list item. Unless you really intend to quote some words, always use the syntax for verbatim code blocks. If you are not sure if it should be a quote or a code block, use a code block.

1. Do not indent the content nested within a list item. I guess many people don't know the four-space rule, either. I wish my eyes were not picky of such formatting issues...

1. Do not put HTML tags in a pair of backticks. Because Github will ignore some HTML tags if you do not show them verbatim, the issue can look highly confusing to me. I remember once someone was talking about the `<meta>` tag, and I had no idea what the issue meant until I hit the edit button to edit his issue.

Now I have reached to a point where I feel tired of editing issues to correct the formats. I guess we could blame it on the surprising Markdown syntax, but anyway, now if I see an incorrectly formatted issue, I tend to^[Only "tend to". Exceptions usually include: 1) I'm familiar with you; 2) It is clearly a serious bug of my software; 3) You have made substantial effort in other aspects, such as providing a reproducible example and other information.] keep calm and quietly move on.

BTW, if your reproducible example really requires external files, I strongly recommend you to compress all files into a zip archive, and upload it to the Github issue. I have also seen issues in which all files are provided as verbatim text blocks in the issues, with filenames indicated above the blocks. In such cases, what I will have to do is to copy these code blocks and save them as the associated filenames to my disk, then run the example. That is also too much work compared to downloading a zip archive and decompressing it. In short, if it is a single file, show the content in the issue; if the example consists of multiple files, use a zip archive.
