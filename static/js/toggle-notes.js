(function(d) {
  if (!d.body.classList.contains('has-notes')) return;
  const h = d.querySelector('.title > hr');
  if (!h) return;
  h.classList.add('toggle-notes');
  h.onclick = function(e) {
    const s = d.body.classList.toggle('hide-notes');
    try { sessionStorage.setItem('hide-notes', s); } catch (e) {};
  };
  const s = sessionStorage.getItem('hide-notes');
  if (s !== null) d.body.classList.toggle('hide-notes', s === 'true');
})(document);
