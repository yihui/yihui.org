---
title: Manipulate SVG Plots with JavaScript in R Markdown
date: '2023-02-07'
slug: manipulate-svg
---

The graphics format SVG is essentially XML. You can generate SVG plots easily
with the **knitr** chunk option `dev = 'svg'` (or `'svglite'` or other SVG
devices). However, they are embedded in the HTML output document with the
`<img>` tag, which means you cannot manipulate them even if they are XML. I have
wished to embed the raw XML for years, so that SVG plots can be manipulated. I
didn't have a strong enough motivation, although I felt this could be
potentially useful.

In July last year, JooYoung Seo filed [a feature
request](https://github.com/yihui/knitr/issues/2152) to **knitr**, and I finally
got the motivation! For people who are visually impaired or blind, they could
use JavaScript to interact with an SVG plot so that they can hear the
information in the plot. I don't really have much experience in this regard, but
I'm sharing a simple example in this post to reveal the potential.

The key is to set the option `options(knitr.svg.object = TRUE)` to let **knitr**
embed SVG plots as raw XML in your HTML output document. Once an SVG plot is an
HTML node, you can select this node and its child nodes. Then you can use any
JavaScript technology to manipulate them.

Below is an R Markdown example that shows you how to raise a bar in a barplot
and beep at the same time when you move your mouse over the bar.

```` markdown
---
title: "Manipulate SVG plots"
---

```{r setup, include=FALSE}
options(knitr.svg.object = TRUE)
```

Draw a barplot with an ID `my-plot` and the SVG format.

```{r dev='svg', out.extra='id="my-plot"'}
barplot(1:10)
```

Add `mouseover` events on all bars.

```{js}
document.querySelectorAll('#my-plot #surface4 path').forEach(el => {
  // beep for 500 milliseconds
  // code adapted from https://stackoverflow.com/a/29641185/559676
  function beep() {
    const ctx = new AudioContext();
    var osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 800;
    osc.connect(ctx.destination);
    osc.start(); 
    setTimeout(() => { osc.stop(); }, 100);
  }
  el.addEventListener('mouseover', e => {
    this.event.target.style.transform = 'rotateX(15deg)';
    beep();
  });
  el.addEventListener('mouseout', e => {
    this.event.target.style.transform = '';
  });
});
```
````

You can knit this document to HTML and move your mouse over each bar to see the
effect, or just [visit a published demo of
mine](https://rpubs.com/yihui/manipulate-svg). To hear the sound, you may need
to click on the page at least once (because browsers may not allow for playing
sounds without user interaction).

The JavaScript code `document.querySelectorAll('#my-plot #surface4 path')`
selects all bars in the plot. For each bar, the `mouseover` event will trigger a
beep and a CSS transform to raise the bar a little bit (`rotateX(15deg)`). For
the `mouseout` event, the transform is undone.

This feature of embedding SVG as XML in HTML output documents was first
introduced in **knitr** 1.40 (released on Aug 24, 2022). I hope you will find it
useful and fun. Special thanks to JooYoung for the motivation!
