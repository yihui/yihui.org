---
title: Google Maps：我在什么地方？
date: '2007-08-13'
slug: my-location-in-google-maps
---

<div id="map" style="width: 100%; height: 400px"></div>

<script src="https://maps.google.com/maps?file=api&amp;v=2&amp;key=ABQIAAAAtD6iPO97YnS5U_uBnl9rThR4eWQKjiHdHzdupEhI_33gu1WDmxRjcAv_JMsytB5qG4_31-p1gI_OyA"type="text/javascript"></script><script type="text/javascript">if (GBrowserIsCompatible()) {var map = new GMap2(document.getElementById("map"));map.addControl(new GSmallMapControl());map.addControl(new GMapTypeControl());map.setCenter(new GLatLng(39.9705, 116.301827), 16);map.setMapType(G_HYBRID_MAP);function createMarker(point) {var marker = new GMarker(point);GEvent.addListener(marker, "click", function() {marker.openInfoWindowHtml("Hello, I'm here! -____-&#124;&#124;");});return marker;}}var point = new GLatLng(39.9705, 116.301827);map.addOverlay(createMarker(point));</script>

也可以直接到[Google Maps](http://bit.ly/vZUsgd)上查看地图；关于这幅图的生成，可以查看我的网页源代码。

