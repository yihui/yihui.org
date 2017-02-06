(function() {
  var i, cls, code, codes = document.getElementsByTagName('pre');
  for (i = 0; i < codes.length; i++) {
    code = codes[i];
    if (code.children.length !== 1) continue;
    code = code.children[0];
    if (code.tagName !== 'CODE') continue;
    cls = code.className;
    if (cls === '' || cls === 'hljs') {
      code.className = 'nohighlight';
    } else if (/^language-/.test(cls) && !/hljs/.test(cls)) {
      code.className += ' hljs';
    }
  }
})();
