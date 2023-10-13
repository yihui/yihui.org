---
title: Create Tabsets from HTML Sections via JavaScript and CSS
date: '2023-10-12'
slug: section-tabsets
customJS: [js/tabsets.js]
customCSS: [css/tabsets.css]
---

As I wrote last month, code folding was the most requested feature in
**blogdown**, of which I have [given an
implementation](/en/2023/09/code-folding/). Today I will demonstrate an
implementation of [another top requested
feature](https://github.com/rstudio/blogdown/issues/69): tabsets.

## How a tabset works

The mechanism of tabsets is fairly simple. It boils down to a `click` event on a
tab link, which triggers the display of a corresponding tab pane. The user
interface in HTML is like this:

``` html
<div class="tabset">
  <div class="tab-link">Tab 1</div>
  <div class="tab-link">Tab 2</div>

  <div class="tab-pane">Pane 1</div>
  <div class="tab-pane">Pane 2</div>
</div>
```

If the first tab link is clicked, we can add a class, say, `active`, to both the
first link and the first pane.

``` html
  <div class="tab-link active">Tab 1</div>
  <div class="tab-pane active">Pane 1</div>
```

With some simple CSS, we can control the visibility of panes, and style the
clicked link differently, e.g.,

``` css
.tab-pane {
  display: none;
}
.tab-pane.active {
  display: block;
}
.tab-link.active {
  border: 1px solid;
}
```

## My implementation

There are several existing implementations of tabsets (e.g., in Bootstrap). The
problem is that they are usually not tailored to Markdown users, and you have to
prepare the appropriate HTML code by yourself. I have done an implementation
today that works for both Markdown and HTML users.

You can find the source code
[`tabsets.js`](https://github.com/yihui/misc.js/blob/main/js/tabsets.js) and
[`tabsets.css`](https://github.com/yihui/misc.js/blob/main/css/tabsets.css) in
my Github repo `misc.js`. For users, you certainly do not need to read the
source, but can use it directly:

``` html
<script src="https://cdn.jsdelivr.net/npm/@xiee/utils/js/tabsets.min.js" defer></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@xiee/utils/css/tabsets.min.css">
```

If you are not satisfied with the styling, you can provide your own CSS and do
not have to use my CSS.

## Demo tabs {.tabset}

Below is an example tabset.

### First tab

Hello world! Ciao!

### Second tab {.active}

Here is a table.

| x   | y   | z   |
|-----|-----|-----|
| 1   |     |     |
| 2   |     |     |
| 3   |     |     |

More text.

#### A level-4 heading

### Third tab

#### Nested tabs! {.tabset #nested-tabs}

##### Tab 1

Isn't it cool? Keep going!

##### Tab 2

Where am I now?

<!-- tabset:nested-tabs -->

You can also create a tabset using raw HTML:

<div class="tabset">
<div class="tab-link">Another 1</div>
<div class="tab-pane"><p>Div pane 1</p></div>
<div class="tab-link">Another 2</div>
<div class="tab-pane"><p>Div pane 2</p></div>
</div>

You can keep nesting but I'll stop here.

### Fourth tab

Enough tabs! Enough!

## Documentation

### HTML users

If you know HTML and prefer writing HTML, the required DOM structure has been
mentioned in the first section of this post. Basically, you provide a container
element with the class `tabset` (it does not have to be a `<div>`). Inside the
container, you have a number of elements with the class `tab-link`, and the same
number of elements with the class `tab-pane`.

When the *i*-th link is clicked, the *i*-th pane will be shown. You can set a
certain tab link to be active initially by adding the class `active` to its HTML
tag.

Note that you can have nested tabsets, e.g., a tabset inside a tab pane of a
parent tabset.

### Markdown users

If you prefer writing Markdown to be rendered to HTML by other tools (e.g., Hugo
or the R package **markdown**), here is how you create a tabset:

1.  Start with an element with the class `tabset`. This can be any type of
    element. For example, a heading or an empty `<div>`.

    ``` md
    ## Demo tabs {.tabset}
    ```

    ``` html
    <div class="tabset"></div>
    ```

2.  Below this element, write a series of sections of any heading level. The
    first section heading level will be the level of headings to be converted to
    tabs. For example:

    ``` md
    ### First tab (level-3)

    Some tab content.

    ### Second tab

    More tab content.

    #### A normal heading

    This is a level-4 heading, so it will *not* be
    converted to a tab.
    ```

    You can set a certain tab to be active initially by adding the class
    `active` to the heading, e.g.,

    ``` md
    ### Second tab {.active}
    ```

3.  To end a tabset, you can either start a upper-level heading (e.g., level 2
    for the previous example), or write an HTML comment of the form
    `<!-- tabset:ID -->`, where `ID` is the ID of the element in Step #1. For
    example:

    ``` md
    ## My tabs {.tabset}

    ### Tab one

    ### Tab two

    ## A new level-2 section

    The previous tabset will be ended before this section.
    ```

    ``` md
    ## My tabs {.tabset #my-tabs}

    ...

    <!-- tabset:my-tabs -->

    The previous tabset will be ended before this comment.
    ```

You can nest tabsets in other tabsets using either Markdown or raw HTML, e.g.,

``` md
## Parent tabs {.tabset}

### Tab one

### Tab two

#### Child tabs {.tabset #child-tabs}

##### Child one

##### Child two

<!-- tabset:child-tabs -->

Another child tabset:

<div class="tabset">
  <div class="tab-link">Tab 1</div>
  <div class="tab-link">Tab 2</div>

  <div class="tab-pane">Pane 1</div>
  <div class="tab-pane">Pane 2</div>
</div>

### Tab three
```

I hope you can find this simple tabset implementation useful (it is not tied to
**blogdown** or Hugo). Please feel free to let me know if you have any
suggestions or comments.
