---
title: The Best Way to Support LaTeX Math in Markdown with MathJax
subtitle: Protect math as code, and remove those code tags via JavaScript later
date: '2018-07-22'
slug: latex-math-markdown
---

Recle Etino Vibal [discovered a MathJax trick](https://twitter.com/recleev/status/1020134832519565312) I used early last year in the hugo-lithium theme to render LaTeX math in Markdown. However, it was not an elegant trick in my eyes, and I came up with a much better way later. I mentioned before that [Ian Lyttle asked me a question](/en/2018/01/ian-lyttle/) during rstudio::conf 2017, which was exactly the problem that Recle had. I believe a lot of Markdown users must have the same question, too, so I'll share my solution in this post.

If you use Pandoc or R Markdown, there is no need to read this post, because Pandoc supports LaTeX math very well. This post is only for plain Markdown users. If you understand Chinese, you may read [this post](/cn/2017/04/mathjax-markdown/) I wrote last year instead.

## The problem of LaTeX math expressions in Markdown

The biggest problem of Markdown is that it has way too many flavors that are not completely compatible with each other. One common problem, however, is that most of them do not properly support LaTeX math expressions (inline `$ $` or display style `$$ $$`). Even if the support exists, it is often awkward (e.g., in a flavor called [Mmark](https://github.com/miekg/mmark), you have to use double dollars to write inline math expressions, which is wrong LaTeX syntax).

There are two difficulties when you try to write LaTeX math with plain Markdown, as I mentioned in the [Appendix B.3 of the **blogdown** book](https://bookdown.org/yihui/blogdown/javascript.html).

1. You want to make sure the Markdown render will not touch your special characters, e.g., `$x_{i} + y_{i}$` should not be rendered as `$x<em>{i} + y</em>{i}$` (i.e., a pair of underscores should not mean italics).

1. MathJax does not treat a pair of single dollars as an inline math expression (only `\(` and `\)` work). You may force it to, but you may have false positives. For example, in a phrase "I have a $10 and $5 bill", the text between the two dollar signs is not math.

It is relatively easy to solve the first problem: you can put your math content in a pair of backticks to protect it as `<code></code>`. Most Markdown renders will not touch the characters in this case, but this will bring a new problem: MathJax does not parse LaTeX math in `<code>` tags. Again, you may force it to, but your math expressions will inherit CSS styles from the `code` tag. For example, if you defined

```css
code {
  background: lightgray;
}
```

your math expressions will have a light-gray background, too. It is possible to remove the background color, but it is relatively complicated.

Even if you use a pair of backticks, you still have the second problem above.

## The solution: pre-process `code` tags

I have mentioned and briefly explained the solution in the **blogdown** book, too. The basic idea is:

1. You write math expressions in pairs of backticks.

1. Use JavaScript to examine all `<code>` tags in HTML, and identify possible math expressions.

1. Remove the outside `<code></code>` tags if they contain math expressions, e.g., convert `<code>$$x + y$$</code>` to `$$x + y$$`.

1. Additionally, convert a pair of single dollars `$ $` to `\( \)`, so that MathJax can understand it without any special configurations.

My JavaScript solution is available at https://yihui.org/js/math-code.js. It is not very long (about 20 lines). After loading this script, you can include MathJax (even _asynchronously_):

```html
<script src="//yihui.org/js/math-code.js"></script>
<!-- Just one possible MathJax CDN below. You may use others. -->
<script async
  src="//mathjax.rstudio.com/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>
```

Then in Markdown, you can write math expressions as usual, e.g.,

```
Hi `$z = x + y$`.

`$$a^2 + b^2 = c^2$$`

`$$\begin{vmatrix}a & b\\
c & d
\end{vmatrix}=ad-bc$$`
```

Output (you can see the output on this page because I used the JavaScript code above):

> Hi `$z = x + y$`.

> `$$a^2 + b^2 = c^2$$`

> `$$\begin{vmatrix}a & b\\
c & d
\end{vmatrix}=ad-bc$$`

This is the best solution I could come up with to support LaTeX math expressions in Markdown if the Markdown renderer does not have native support for them like Pandoc.^[I used this trick in the **xaringan** package to support LaTeX math, because the Markdown renderer **remark.js** does not support LaTeX math.] If you are able to use Pandoc, I still suggest that you use Pandoc instead of my hack, because it is targeted only at HTML output.
