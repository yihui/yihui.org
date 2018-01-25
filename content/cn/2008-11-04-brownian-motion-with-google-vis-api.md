---
title: 利用Google可视化API展示布朗运动
date: '2008-11-04'
slug: brownian-motion-with-google-vis-api
---

今天大致浏览了一下Google可视化API，说实话现在Google在可视化方面开发的库还太贫乏了，寥寥几种可视化方法，对统计数据展示来说还相当不够用。下面我用它的MotionChart库结合R的正态随机数做了一个布朗运动展示，这个展示比我的animation包中那个布朗运动要更平滑，这也一直是我想达到的目的。

由于涉及到繁重的加载数据过程，所以JavaScript运行起来会很慢，使用IE的客官耐心等待20秒至半分钟左右（Firefox比较快）。以下是示例代码：

```html
<script type="text/javascript" src="http://www.google.com/jsapi"></script>
<script type="text/javascript">
  google.load("visualization", "1", {packages:["motionchart"]});
  google.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = new google.visualization.DataTable();
    data.addRows(750);
    data.addColumn('string', 'point');
    data.addColumn('number', 'year');
    data.addColumn('number', 'X');
    data.addColumn('number', 'Y');
    data.setValue(0, 0, "01");
    data.setValue(0, 1, 1901);
    data.setValue(0, 2, 1.24);
    data.setValue(0, 3, -0.37);
    data.setValue(1, 0, "02");
    data.setValue(1, 1, 1901);
    data.setValue(1, 2, 0.12);
    data.setValue(1, 3, 0.48);
    data.setValue(2, 0, "03");
    data.setValue(2, 1, 1901);
    data.setValue(2, 2, -1.5);
    data.setValue(2, 3, -1.21);
    ....
    data.setValue(748, 0, "14");
    data.setValue(748, 1, 1950);
    data.setValue(748, 2, 1.73);
    data.setValue(748, 3, -2.24);
    data.setValue(749, 0, "15");
    data.setValue(749, 1, 1950);
    data.setValue(749, 2, 2.38);
    data.setValue(749, 3, 16.65);
    var chart = new google.visualization.MotionChart(document.getElementById('chart_div'));
    chart.draw(data, {width: 600, height: 500});
  }
</script>

<div id="chart_div" style="width: 600px; height: 500px;"></div>
```

话说今日有一印度小经理给我发个邮件，让我LaTeX排版给他开个价，我晕，从哪儿看见我是干这行的了？
