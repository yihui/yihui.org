---
title: MathJax 与 Markdown 的究极融合
date: '2017-04-07'
slug: mathjax-markdown
---

有时候芝麻大点事我会琢磨好几个月甚至几年（当然不会一直琢磨），解决起来可能会花一整天或者好几天。这回说说 MathJax 与 Markdown 的故事。注意我要说的是纯 Markdown，不是 R Markdown。

Markdown，简单。MathJax，简单。两个搁一块儿，说简单也可以简单，说复杂可以逼死我这样的强迫症。问题是什么呢？问题就在于，现今除了伟大的 Pandoc，多数 Markdown 引擎都并不支持数学公式，所以 `$X_i + Y_i$` 在这些引擎眼中并没有什么特殊含义，只是普通的 Markdown 文本。这就麻烦大了，因为数学公式里的某些字符对 Markdown 来说可能是特殊语法，例如下划线可能是表示斜体，那前面这个公式可能会被翻译为 `$X<em>i + Y</em>i$`。垮了噻。

为了保护公式的内容不被 Markdown 引擎翻译掉，我们只有一条出路，就是把公式保护在代码标签中，也就是前后加两个反引号，例如 `` `$X_i + Y_i$` ``，这样公式内部的字符不会被当做 Markdown 文本，而是会被原样输出，如生成 `<code>$X_i + Y_i$</code>`。那么问题接踵而至：

1. MathJax 默认不检查 `<code>` 标签内部的数学公式。它在查找公式时会跳过一些 HTML 标签，如 `<pre>`、`<code>`、`<script>` 等，因为这些标签里一般不会有人需要渲染数学公式。当然，这些需要跳过的标签是可以自定义的，你可以把 `<code>` 排除在需要跳过的标签之外。

    ```html
    <script type="text/x-mathjax-config">
    MathJax.Hub.Config({
      tex2jax: {
        skipTags: ['script', 'noscript', 'style', 'textarea', 'pre']
      }
    });
    </script>
    ```

1. MathJax 默认也不会把单美元符号识别为行内公式，因为单美元符号可能表示货币。例如一句话中要是包含 `$50, $100`，那这里的 `50,` 算不算数学公式？从上下文看可能不算。为了避免误判，MathJax 默认采取保险策略，只把这个奇怪的语法包含的内容当做数学公式：`\( \)`。其实也不能算奇怪，因为它就是合法的 LaTeX 语法，在 LaTeX 中跟一对单美元符号基本上等价，只不过多数人嫌麻烦，都敲一对单美元符号而已。如果你想大胆启用单美元符号作为数学公式的标识，当然也不是不行：

    ```html
    <script type="text/x-mathjax-config">
    MathJax.Hub.Config({
      tex2jax: {
        inlineMath: [['$','$'], ['\\(','\\)']]
      }
    });
    </script>
    ```

    问题是如果你真的想写一对美元符号，而不想让 MathJax 把它们当做数学公式标识的话，你得再用一招给自己擦屁股，就是配置选项 `processEscapes: true`。它意味着你可以用反斜杠引导一个美元符号，好让它变成真正的美元符号。Mathjax 的文档我过去看过很多遍了，但不知道为什么直到今天才注意到这一点。于是：
    
    ```html
    <script type="text/x-mathjax-config">
    MathJax.Hub.Config({
      tex2jax: {
        inlineMath: [['$','$'], ['\\(','\\)']],
        processEscapes: true
      }
    });
    </script>
    ```

1. 至此，非强迫症应该觉得任务已经完成了。我还有什么不满呢？我的不满来自于数学公式在代码标签 `<code>` 中，它让我设置起代码标签的 CSS 样式时很为难。一般来说，我喜欢行内代码标签背后稍微带一点背景色，以凸显它跟别的元素不一样（码农眼中代码总是要受到特殊待遇）。要是我给代码标签加了背景色，那数学公式也带背景色了！这怎么能忍？于是我想了个办法，把所有MathJax 识别的数学公式找出来，然后把它们头上的 `<code>` 标签移除。以下用了 jQuery：

    ```html
    <script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
    <script>
    MathJax.Hub.Queue(function() {
      var jaxs = MathJax.Hub.getAllJax();
      for (var i = 0; i < jaxs.length; i++) {
        var $jax = $(jaxs[i].SourceElement());
        if ($jax.parent().is('code')) $jax.unwrap();
      }
    });
    </script>
    ```
    
    这个解决方案凑合能用，但又有两个逼死强迫症的问题：
    
    1. 加载 MathJax.js 的那个 `<script>` 标签不能用 `async` 属性，也就是说不能异步加载，因为我下一段 `<script>` 里马上就要用 `MathJax.Hub` 对象。如果 MathJax.js 异步加载的话，就无法保证下面的代码能运行（运行下一段时上一段不一定加载完成了）。不能异步加载意味着页面初始加载速度会变慢，因为要活生生等着 MathJax.js 被完全下载下来。
    
    1. 初始情况下所有数学公式仍然都在 `<code>` 标签中，所以第一眼看去的时候其实还是能看见背景色的，等下面那段代码运行完了那些公式的背景色才会去掉。就这少说几十毫秒多则几秒的显示背景色的时间，也不能忍。
    
    肿么破？必须先去掉数学公式的代码标签，后渲染数学公式，因为后者显著地慢，得后做。于是今天[再想了个办法](https://github.com/yihui/hugo-lithium-theme/blob/master/static/js/math-code.js)，在加载 MathJax 之前就自行识别数学公式，把代码标签去掉：

    ```js
    (function() {
    var i, text, code, codes = document.getElementsByTagName('code');
    for (i = 0; i < codes.length;) {
      code = codes[i];
      if (code.parentNode.tagName !== 'PRE' &&
          code.childElementCount === 0) {
        text = code.textContent;
        if (/^\\\((.|\s)+\\\)$/.test(text) ||
            /^\$(.|\s)+\$$/.test(text) ||
            /^\\begin\{([^}]+)\}(.|\s)+\\end\{[^}]+\}$/.test(text)) {
          code.outerHTML = code.innerHTML;  // remove <code></code>
          continue;
        }
      }
      i++;
    }
    })();
    ```

    大意就是找出所有代码标签，一个个检查：如果里面的文本内容看起来像数学公式，就把代码标签去掉。当然还有一些其它限制条件，如不要处理 `<pre>` 标签里的代码，也不要处理含有别的标签的代码标签。`code.outerHTML = code.innerHTML` 是我从 StackOverflow 上找来的神来之笔，简直太聪明。
    
    然而写这段代码的时候我掉进了一个大坑，琢磨了好半天才明白怎么回事，被 JavaScript 的强力活性坑了不止一次了但还是没记住。上面的 `for` 循环看起来有点不同寻常，普通青年也许会跟我刚开始一样这样写：

    ```js
        for (i = 0; i < codes.length; i++) {}
    ```

    然后我发现有些数学公式没被处理掉。数来数去，页面里的 `<code>` 标签数量比上面代码处理的标签数量少一些，最终发现，`codes = document.getElementsByTagName('code')` 这对象竟然是个活的！也就是说，我每删掉一个 `<code>` 标签，它里面都会自动少一个元素（尽管我在循环之前就已经对 `codes` 赋值了）。所以，我每删一个 `<code>` 标签，都**不能**把 `i` 增加 1 。比如删掉了第 9 个标签之后，原本的第 10 个标签就变成第 9 个标签了。只有一个标签没处理的时候，才需要 `i++`。这上哪儿说理去……

总而言之，这段代码运行完之后数学公式脱离了代码标签，然后就可以异步加载 MathJax 渲染公式了，为自己和广大人民群众省下了好几毫秒的时间！

这一则故事告诉我们，尽管 Markdown 有很多种实现，但多数 Markdown 引擎的作者并不在乎科技论文写作，他们都没穿裤子在 Markdown 海中游泳。只有 Pandoc 对 Markdown 是真爱。如果你用基于 Pandoc 的 R Markdown，那么我上面说的所有一切都毫无意义：你可以正大光明用单个美元符号写公式，不必担心什么代码标签。对 blogdown 而言，用 R Markdown 的唯一缺点就是每个 Rmd 会生成一个 HTML 文件，这样会使得源代码库不那么干净（副产品也出现在源代码库中了），但就 Markdown 语法来说，Pandoc 绝对是无人能及。各路诸侯的野路子 Markdown 引擎，互相不那么兼容，也不那么严谨，真叫人无奈。

这就是一个给人擦屁股的强迫症的自白。以上。

哦，还有，之所以今天又捣鼓起 MathJax 来，是因为 MathJax CDN [要跑路了](https://www.mathjax.org/cdn-shutting-down/)。感觉简直世界末日。我们有辣莫多的产品都用了这个 CDN 地址，却只有不到一个月的时间去调整。[别介啊](https://github.com/mathjax/MathJax/issues/1725)。
