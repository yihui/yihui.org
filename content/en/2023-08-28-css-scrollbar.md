---
title: A Simple CSS Trick to Deal with Horizontal Scrollbars in Code Blocks
date: '2023-08-28'
slug: css-scrollbar
---

The reading experience with horizontal scrollbars is often very bad. For most
reading devices, it's easy and natural to scroll vertically, but not so
horizontally. It's inconvenient and even annoying to have to scroll horizontally
back and forth to read multiple lines of content one by one.

I have thought about this problem several times before, especially when I want
style code blocks on HTML pages, but I didn't come up with a satisfactory
solution. Earlier this year I thought about it again, and decided to do the
following:

1.  Hard-wrap the content inside code blocks:

    ``` css
    pre, pre:hover {
      white-space: pre-wrap;
      word-break: break-all;
    }
    pre code {
      display: block;
      overflow-x: auto;
    }
    ```

2.  Cancel the hard-wrapping on larger screens:

    ``` css
    @media only screen and (min-width: 992px) {
      pre { white-space: pre; }
    }
    ```

    That is, on larger screens, you will still see the horizontal scrollbars by
    default when certain lines are too wide, but if you move your mouse over the
    content, it will be hard-wrapped (due to `pre:hover`'s CSS above). On
    smaller screens, the content is always hard-wrapped, which means there will
    never be horizontal scrollbars.

To be honest, both horizontal scrollbars and hard-wrapped lines of code look
ugly in my eyes. When I weigh the trouble in reading against the appearance, I
decided to always wrap the lines on small devices because usually you don't have
a mouse there, and wrap the lines on large devices only when necessary, which
saves vertical space by default, but readers can easily hover to view the full
content without scrolling horizontally. When you move your cursor over a code
block, it may be a good indicator that you are interested in reading it, and you
may be (hopefully positively) surprised that the code block is automatically
expanded for you so you can keep reading the full code.

Below is a simple demo. You can try to view it on a small device (e.g., your
phone), and also on a large device (e.g., your computer). For the latter case,
hover over the code block to see the horizontal scrollbar disappear.

``` css
code {
  font-family: 'DejaVu Sans Mono', 'Droid Sans Mono', 'Lucida Console', Consolas, Courier, 'Courier New', Monaco, monospace;
}
.draft {
  background: repeating-linear-gradient(135deg, white, white 30px, #ddd 32px, #ddd 32px);
}
```

I came up with this idea when designing the CSS for [a new HTML slide
format](https://cran.r-project.org/web/packages/markdown/vignettes/slides.html)
early this year. The code blocks are not wrapped by default, which can save me
vertical space on slides (space on slides is often limited). When I really need
to present the code to the audience, I can move my cursor over it.

I hope you will find this CSS trick useful, and I'm all ears to other ideas to
solve this problem.
