---
title: Brownian Motion Using Google Visualization API and R
date: '2008-11-05'
slug: brownian-motion-using-google-visualization-api-and-r
---

Yesterday I took a look at the Google APIs for visualization; the gallery is poor for data visualization, I think. Anyway, an idea came to my mind -- to make use of the MotionChart to demonstrate the Brownian Motion. Random numbers can be generated from R and read into JavaScript (the `DataTable` object in Google API). Here is an example:

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
	chart.draw(data, {width: 600, height: 500});", "      }
</script>

<div id="chart_div" style="width: 600px; height: 500px;"></div>
```

I have added the R function `g.brownian.motion()` to the [animation](http://cran.r-project.org/package=animation) package.

