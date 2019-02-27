(function() {
  var h, hs = document.querySelectorAll('article h1, article h2, article h3');
  for (var i = 0; i < hs.length; i++) {
    h = hs[i];
    if (h.id === '') continue;
    h.innerHTML += ' <span class="anchor"><a href="#' + h.id + '">#</a></span>';
  }
})();
