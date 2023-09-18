---
title: Add Client-side Searching via Fuse.js to Static Sites
date: '2023-09-17'
slug: fuse-search
---

Normally web searching is performed on the server side. That is, when you send a
query with some keywords, the server will search its database that contains all
data of a website. Searching can also be performed on the client side, i.e., in
your web browser via JavaScript. Several JS libraries can do this job, such as
[lunr.js](https://lunrjs.com) and [fuse.js](https://www.fusejs.io). They are not
designed specifically for site searching but are more general-purpose---web
searching is just one possible application.

In this post, I will show three quick steps to support searching on a static
website. I'm using Hugo as the example, but the same code can be applied to any
static site generator as long as it can generate the JSON database described in
the first section below.

## The JSON database

A static site does not have a database backend. All pages are plain HTML files.
We need to write the content of these files to a JSON file that can be fed into
the JS searching library later. For Hugo sites, this can be easily achieved by a
template `layouts/_default/index.json.json`:[^1]

[^1]: This `layouts` folder can be under either the root directory of your Hugo
    project, or your theme directory. I recommend the former. If your theme has
    already provided this JSON template, you do not need to provide another
    copy.

``` go
[
{{- range $i, $p := .Site.RegularPages -}}
{{- if gt $i 0 -}},{{- end -}}
{{- dict "uri" $p.RelPermalink "title" $p.Title "content" ($p.Plain | htmlUnescape | plainify) | jsonify -}}
{{- end -}}
]
```

With the `range` loop, we can write the URL, title, and plain content of all
regular pages to a JSON file that looks like this:

``` json
[
  {"uri": "/foo/", "title": "Hi foo", "content": "This is foo."},
  {"uri": "/bar/", "title": "Hi bar", "content": "This is bar."}
]
```

## The output config

To tell Hugo to actually generate the aforementioned `index.json` file, you need
to specify the `outputs` field in your config file (`config.yaml` or
`hugo.yaml`):[^2]

[^2]: Similarly, if you use the TOML format instead of YAML, specify this in
    `config.toml` or `hugo.toml`:

    ``` toml
    [outputs]
      home = ["html", "rss", "json"]
    ```

``` yaml
outputs:
  home: ["html", "rss", "json"]
```

You can see [this Git
commit](https://github.com/yihui/hugo-paged/commit/c92de9e) for an example.

## The search page

Next you add a search page to your site, e.g., `search.md` under the `content/`
directory (or any subdirectory---the location does not matter). In the body of
this `.md` file, you include the following three pieces of code.[^3]

[^3]: Please note that you must turn on the `unsafe` option for the Markdown
    renderer in your site config file, e.g.,

    ``` yaml
    markup:
      goldmark:
        renderer:
          unsafe: true
    ```

    This is because we are writing raw HTML code in the Markdown file, and Hugo
    disallows HTML code by default.

### The HTML (UI)

First, we provide a search input with an ID `search-input`, and a container with
a class `search-results` to show the search results:

``` html
<input type="search" id="search-input">

<div class="search-results">
<section>
<h2><a target="_blank"></a></h2>
<div class="search-preview"></div>
</section>
</div>
```

Inside the container, we provide a template to display each result. This
template should be a single HTML element (e.g., a `<section>` above) that
contains at least two elements: `<a>` to provide links to result pages, and an
element with a class `search-preview` to display a short preview of the page
content. You can add other elements to the template freely if you want.

### The JavaScript

Next, we load the fuse.js library, and a JS script that I wrote to implement
site searching:[^4]

[^4]: If you want searching to work offline, you can download these scripts to
    the `static/` folder of your Hugo site project, and use relative URLs to
    include them, e.g.,

    ``` html
    <script src="/js/fuse.js" defer></script>
    <script src="/js/fuse-search.min.js" defer></script>
    ```

``` html
<script src="https://cdn.jsdelivr.net/npm/fuse.js@6.6.2" defer></script>
<script src="https://cdn.jsdelivr.net/npm/@xiee/utils/js/fuse-search.min.js" defer></script>
```

### Styling (optional)

Last, you may want to style your search input and results with CSS, although
this is optional. Below I'm making the input full-width, increasing its font
size, highlighting keywords in results (wrapped in `<b></b>`), and indenting the
preview text:

``` html
<style type="text/css">
#search-input {
  width: 100%;
  font-size: 1.2em;
  padding: .5em;
}
.search-results b {
  background-color: yellow;
}
.search-preview {
  margin-left: 2em;
}
</style>
```

You may see [this Git
commit](https://github.com/yihui/hugo-paged/commit/67605e4e) for an example that
includes the HTML, JS, and CSS.

Now you can visit this search page on your website and start searching. You can
include the link to this page in your [site
menu](https://gohugo.io/content-management/menus/) to make it easier to
discover. I added the link to the bottom menu of my site.

## Customization

Besides styling the HTML UI via CSS, there are a few more options for you to
customize the search behavior, which can be written as `data-` attributes in the
`<input>` element (all of them have default values):

-   `data-info-init`: the placeholder text of the input when the search index is
    being initialized, which happens as soon as the cursor is moved into the
    input;

-   `data-info-ok`: the placeholder text after the search index is successfully
    initialized;

-   `data-info-fail`: the placeholder text when the initialization fails;

-   `data-index-url`: the URL to `index.json`;

-   `data-text-length`: the length of the preview text;

-   `data-limit`: the maximum number of results to return;

-   `data-delay`: the delay (in milliseconds) after the last key is lifted
    before searching (this is to avoid searching too frequently when typing). On
    mobile devices, the searching is performed only after hitting `Enter`; on
    other devices, searching is done after a short delay while typing.

Below is an example:

``` html
<input type="search" id="search-input"
  data-info-init="Initializing... Please hold on."
  data-text-length=500 data-limit=100 data-delay=300>
```

You can also write more information on your search page, such as how to use the
search box (like [what I
did](https://github.com/yihui/yihui.org/blob/master/content/search.md?plain=1)).

Please feel free to fiddle with any of the code above if the existing options
for customization do not meet your need. Happy searching (your own site or
[mine](/search/))!

![Searching\...](https://slides.yihui.org/gif/look-hard.gif)
