(function() {
  function fix_footnote(tagName) {
    var tags = document.getElementsByTagName(tagName), i, tag, tag2, n = 1, href;
    for (i = 0; i < tags.length; i++) {
      tag = tags[i];
      if (tagName === 'sup') {
        if (tag.className !== 'footnote-ref' || tag.id !== 'fnref:-') continue;
        tag.id += n;
        if (tag.children.length === 1) {
          tag2 = tag.children[0];
          href = tag2.getAttribute('href');
          if (tag2.nodeName === 'A' && href === '#fn:-') {
            tag2.setAttribute('href', href + n);
          }
        }
      } else if (tagName === 'li') {
        if (tag.id !== 'fn:-') continue;
        tag.id += n;
        tag2 = tag.lastChild; href = tag2.getAttribute('href');
        if (tag2.nodeName === 'A' && href === '#fnref:-') {
          tag2.setAttribute('href', href + n);
        }
      }
      n++;
    }
  }
  fix_footnote('sup'); fix_footnote('li');
})();
