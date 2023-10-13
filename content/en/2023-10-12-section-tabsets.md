---
title: Create Tabsets from HTML Sections or Bullet Lists via JavaScript and CSS
date: '2023-10-12'
slug: section-tabsets
customJS: [utils/tabsets.js]
customCSS: [utils/tabsets.css]
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

Enough tabs? Let me show a tabset created from a bullet list instead of section
headings:

<div class="tabset"></div>

-   First bullet

    Hi, bullet!

-   Second bullet <!--active-->

    This is the initial active tab.

-   Third bullet

    Bye, bullet!

Okay, I'm done now.

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
    element. For example, a heading:

    ``` md
    ## Demo tabs {.tabset}
    ```

    or an empty `<div>`:

    ``` html
    <div class="tabset"></div>
    ```

2.  Below this element, write either a bullet list or a series of sections.

    -   If you write a bullet list, the first element of each bullet item will
        become the tab link, and the rest of elements will become the tab pane,
        e.g.,

        ``` md
        * Tab one

          Content of tab one.

        * Tab two <!--active-->

          Content of tab two.
        ```

        I'd recommend this method since it is easier and more natural to create
        a tabset. However, please make sure to indent the tab pane content
        properly in the bullet list (using the visual mode to write Markdown in
        RStudio can help a lot).

        To specify an initial active tab, add a comment `<!--active-->` to the
        bullet item.

    -   If you write sections, the first section heading level will be the level
        of headings to be converted to tabs, e.g.,

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

        One downside of using section headings to create a tabset is that the
        headings may be included in the table of contents of a page, which is
        why I do not recommend this method, unless you must specify an active
        tab manually.

3.  If you use sections to create a tabset, there are two ways to end the tabset
    (if you create a tabset with a bullet list, you do not need a special way to
    end it---it just ends where the list ends):

    1.  Either start a upper-level heading (e.g., level 2 for the previous
        example), e.g.,

        ``` md
        ## My tabs {.tabset}

        ### Tab one

        ### Tab two

        ## A new level-2 section

        The previous tabset will be ended before this section.
        ```

    2.  or write an HTML comment of the form `<!-- tabset:ID -->`, where `ID` is
        the ID of the element in Step #1, e.g.,

        ``` md
        ## My tabs {.tabset #my-tabs}

        ...

        <!-- tabset:my-tabs -->

        The previous tabset will be ended before this comment.
        ```

You can nest tabsets in other tabsets if you want, e.g.,

``` md
<div class="tabset"></div>

- Tab one

  Content

- Tab two

  Content

  <div class="tabset"></div>

    - Child tab one

      Content

    - Child tab two

      Content

- Tab three
```

I hope you can find this simple tabset implementation useful (it is not tied to
**blogdown** or Hugo). Please feel free to let me know if you have any
suggestions or comments.
