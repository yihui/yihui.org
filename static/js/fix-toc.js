(function() {
  var toc = document.getElementById('TableOfContents');
  if (!toc) return;
  var li, ul = toc.querySelector('ul');
  if (ul.childElementCount !== 1) return;
  li = ul.firstElementChild;
  if (li.tagName !== 'LI') return;
  // remove <ul><li></li></ul> where <ul> only contains one <li>
  ul.outerHTML = li.innerHTML;
})();
