---
title: Search | 搜索
disable_comments: true
disable_sidenotes: true
---

The search is [performed via fuse.js](/en/2023/09/fuse-search/).[^1] For the search keywords, white spaces act as the `AND` operator, and `|` acts as the `OR` operator. To match an exact phrase, double quote it. For example, `R Markdown` matches articles that contain both `R` and `Markdown`, `R | Markdown` matches articles that contain `R` or `Markdown`, and `"R Markdown"` matches articles that contain the whole phrase `R Markdown`.

<style type="text/css">
.main {
  width: 100%;
}
.title, .toc-line > a {
  font-style: initial;
}
.single .main a, .single .main h2 {
  border-bottom: none;
}
.main h2 {
  text-align: initial;
}
#search-input {
  width: 100%;
  font-size: 1.2em;
  padding: .5em;
}
.search-results {
  font-size: .9em;
}
.search-results b {
  background-color: yellow;
}
.search-preview {
  margin-left: 2em;
}
.footnotes {
  margin-top: 4em;
}
</style>

<input type="search" id="search-input">

<div class="search-results">
<section>
<h2 class="toc-line"><a target="_blank"></a><span class="dots"></span><span class="page-num small"></span></h2>
<div class="search-preview"></div>
</section>
</div>

<script src="https://cdn.jsdelivr.net/npm/fuse.js@6.6.2" defer></script>
<script src="https://cdn.jsdelivr.net/npm/@xiee/utils/js/fuse-search.min.js" defer></script>

[^1]: If you are not satisfied by the search, you may use alternative search engines such as Google or DuckDuckGo, and add the filter `site:yihui.org` after your keywords, e.g., `R Markdown site:yihui.org`.
