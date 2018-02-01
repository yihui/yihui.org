---
title: 一例逻辑异或比较
date: '2018-01-18'
slug: logical-xor
---

昨天在审阅谭显英壮士提交的[一个重要 DT 合并请求](https://github.com/rstudio/DT/pull/481/files)中的 JS 代码时，注意到这样一个 `if` 语句：

```js
if ((flagSel && !flagRowSel) || (!flagSel && flagRowSel)) {
  ...
}
```

好家伙，这是传说中的[圆环套圆环娱乐城](https://zh.wikipedia.org/wiki/%E4%B8%80%E4%B8%AA%E9%A6%92%E5%A4%B4%E5%BC%95%E5%8F%91%E7%9A%84%E8%A1%80%E6%A1%88)咩。每当涉及到两个逻辑变量的比较操作时，我都会在纸上画一个表格，来看清楚到底在比什么。比如上例何时会是 `true`：

\       | flagRowSel | true | false
:------:|:----------:|:----:|:----:
**flagSel** | **true**   |  x   |  √
 | **false**  |  √   |  x

这样就很清楚了：当 `flagSel` 和 `flagRowSel` 取值不同时，这个逻辑比较的结果便是 `true`。所以我们就可以把圆环套圆环娱乐城的墙拆了，简化为：

```js
if (flagSel !== flagRowSel) {
  ...
}
```

说白了，这就是一个异或（XOR）的比较，而异或说白了其实也就是看两个逻辑变量是否相异（必须一个 `true` 一个 `false` 才能得到 `true`）。由于逻辑变量的特殊性，取值的可能性只有两个，那进一步简化就是：

```js
function XOR(a, b) {
  return a !== b;
}
```

[最终我用的](https://github.com/rstudio/DT/commit/b5a735e9b3910798b99e8e4766d2004e7655a94a)是 `if (flagSel === flagRowSel)`，这里我事先把 `flagRowSel` 的取值反过来了，以使得它跟 `flagSel` 的意思相同，都代表 DT 表格中的一行是否没有被选中。感觉这样更通顺一些。

写代码跟说话一样，要是一串逆否条件，人就很容易晕掉。比如这样的表白神句：你是不是不承认你并不是没有喜欢我？

- 是？那你就是喜欢我喽！
- 不是？那你就是喜欢我喽！

战无不胜。
