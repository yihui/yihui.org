(function() {
  var img, imgs = document.getElementsByTagName('img');
  for (var i = 0; i < imgs.length; i++) {
    img = imgs[i];
    if (!img.title) img.title = img.alt;
  }
})();
