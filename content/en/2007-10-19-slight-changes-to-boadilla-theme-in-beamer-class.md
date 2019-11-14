---
title: Slight Changes to Boadilla Theme in Beamer Class
date: '2007-10-19'
slug: slight-changes-to-boadilla-theme-in-beamer-class
---

`Boadilla` is a quite plain theme in beamer class; I like plain styles, but I also want a headline in the top indicating the sections so that I can know where I am when I'm giving a speech. Thus I gave some slight changes to this plain theme: the `default` headline has been replaced with `infolines`, while the definition of the _outer theme_ `infolines` has also been modified as I don't have any _subsections_.

The original headline:

```tex 
\ifbeamer@secheader\else\setbeamertemplate{headline}[default]\fi
```

![Slight Changes to Boadilla Theme in Beamer Class](https://db.yihui.org/imgur/PCdOk.png)

The modified version:

```tex 
\ifbeamer@secheader\else\setbeamertemplate{headline}[infolines]\fi
```

![Slight Changes to Boadilla Theme in Beamer Class](https://db.yihui.org/imgur/wmecm.png)

You may visit the post [Jokes in Statistics](/en/2007/10/jokes-in-statistics-a-talk-to-be-given-in-cueb/) to see the effects of my modifications.

