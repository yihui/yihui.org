---
title: Pull Requests as A Teaching Tool
date: '2017-09-15'
slug: pull-requests-as-a-teaching-tool
---

Amelia [quoted Feynman on Twitter](https://twitter.com/xieyihui/status/880484692893585408) a while ago, "What I cannot create, I do not understand." I replied, "To me 'create' means 'create a minimal example'." One of my examples was the first Hugo theme I had ever written, [hugo-xmin](https://github.com/yihui/hugo-xmin).

## Motivation

As I mentioned in the [announcement](https://blog.rstudio.com/2017/09/11/announcing-blogdown/) of the **blogdown** package, the **blogdown** book was quite painful for me to write. The chapter on Hugo was particularly painful, because it is impossible to fully introduce Hugo in a single chapter, and I don't want this chapter to be a comprehensive introduction to Hugo, either (not to mention that I'm not a Hugo expert). I struggled for a few weeks, and finally said to myself, "Forget it! Let me just simplify it to the simplest form." I want a really minimal Hugo theme, so that I can explain the basic ideas of Hugo. I thumbed through the existing Hugo themes, and the "minimal" themes were not minimal enough.

## An amateur

I have never designed a theme before, and I didn't have the confidence to do it. I always thought a theme must be designed by a professional. I had some experience in HTML, CSS, and JavaScript, but was far from being professional. For example, I kind of understand how responsive CSS works, but I never dared to write the CSS by myself.

The hugo-xmin theme was my icebreaker. I'm still not professional, but I'm brave enough to design a theme now. In fact, I have designed three so far: hugo-xmin, hugo-xmag, and hugo-ivy. The theme of [the RStudio blog](https://blog.rstudio.com) is actually based on hugo-xmin, after I heavily extended it. The point is that once you can get a minimal thing to work, you can polish and extend it later, and you will learn every single little thing along the way. That is the power of a minimal example.

## An unusual usage of Github pull requests

I knew for sure that users wouldn't be fully satisfied with this minimal theme, but I made a conscious and firm decision that I wouldn't make this theme more complicated. That said, I also want to show how one could implement a new feature and add to this theme. In other words, I want to give users a minimal fish, but I also want to teach them how to fish. The latter can be more important, since at some point, you have to go on your own and I cannot do everything for you.

I came up with the idea of using Github pull requests. You can find example pull requests at https://github.com/yihui/hugo-xmin/pulls. These pull requests are _not meant to be merged_, but show you the changes to be made if you were to implement a new feature. For example, you can take a look at the tab of diffs of the [pull request #2](https://github.com/yihui/hugo-xmin/pull/2/files), which shows you how you can add the categories and tags info to a post:

```diff
diff --git a/layouts/_default/single.html b/layouts/_default/single.html
index 3dfda29..21f87e0 100644
--- a/layouts/_default/single.html
+++ b/layouts/_default/single.html
@@ -3,6 +3,13 @@
 <h1><span class="title">{{ .Title }}</span></h1>
 {{ with .Params.author }}<h2 class="author">{{ . }}</h2>{{ end }}
 {{ if .Params.date }}<h2 class="date">{{ .Date.Format "2006/01/02" }}</h2>{{ end }}
+<p class="terms">
+  {{ range $i := (slice "categories" "tags") }}
+  {{ with ($.Param $i) }}
+  {{ $i | title }}: {{ range $k := . }}<a href="{{ relURL (print "/" $i "/" $k | urlize) }}">{{$k}}</a> {{ end }}
+  {{ end }}
+  {{ end }}
+</p>
 </div>
 
 <main>
diff --git a/static/css/style.css b/static/css/style.css
index 0edd168..9da8998 100644
--- a/static/css/style.css
+++ b/static/css/style.css
@@ -14,6 +14,7 @@ body {
   padding: 5px;
   border-radius: 5px;
 }
+.terms { font-size: .9em; }
 .menu, .article-meta, footer { text-align: center; }
 .title { font-size: 1.1em; }
 footer a { text-decoration: none; }
 ```

You can add, delete, or modify the lines displayed in the diffs to obtain a specific feature, or if you are familiar with GIT, you can merge the branch.

## Conclusion

GIT is often introduced as a tool for version control, and a major benefit is that you preserve the full history of changes, but to me, the equally (perhaps more) important thing about version control is the diffs between the current version and the possible future version (i.e., changes that are not committed). When I try to implement features and fix bugs (especially in a large project), it is tremendously helpful to look at the diffs, because I don't need to go through the full codebase. It is much easier to reason about the code when I see a relatively small number of lines of changes.

With one pull request implementing one feature based on a minimal example, it should be clearer to users how the implementation actually works.
