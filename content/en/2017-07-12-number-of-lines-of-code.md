---
title: Number of Lines of Code
date: '2017-07-12'
slug: lines-of-code
---

> Measuring programming progress by lines of code is like measuring aircraft building progress by weight.

> --- Bill Gates

I just stumbled upon an article with a catchy title "[Kafka Elasticsearch Connect: From 9,071 to 1 Line of Code](https://blog.datasyndrome.com/kafka-elasticsearch-connect-from-9-071-to-1-line-of-code-33ca4a6e0f29)". Most of the time I find it silly to talk about the number of lines of code (LOC), because people who declare that they achieved something with an amazingly small number of LOC are often more or less cheating. One LOC often calls other code that is significantly longer. So the number of LOC actually is nonsense.  I quickly read this article, and indeed, the so-called "one LOC" was one line of bash code that chained several commands. The first command was... `bin/kafka_console_consumer.sh`.

WAT.

Occasionally I also brag about LOC. Recently I wrote my first Hugo theme [**XMin**](https://github.com/yihui/hugo-xmin), and I emphasized that it contains less than 150 LOC. I think I was relatively honest, because the theme is pretty much self-contained and does not use external code (like using one line of bash code to call another bash script).
