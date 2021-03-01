(function() {
  var s = document.currentScript;
  if (!s) return alert('抱歉，本程序不支持您的古董浏览器，请尝试使用 Chrome/Firefox/Edge 等现代浏览器');
  document.querySelector('.arith') || s.insertAdjacentHTML('afterend', '<style type="text/css">' +
    '.arith{border:none}.arith tr:nth-child(even){background:none;}' +
    '.arith.correct *{color:forestgreen;}.arith.wrong *{color:orangered;}' +
    '.arith thead{font-size:3em;text-align:center;}#number-ans{width:4em;padding:.1em;}' +
    '#arith-go{padding:.1em .2em;vertical-align:middle;font-size:0.8em;}' +
    '#arith-type{padding:.2em;}.arith input[type="number"]{padding:.2em;width:3em;}</style>' +
    '<table class="arith"><thead><tr><td><span id="number-1">?</span></td>' +
    '<td><span id="number-op">+</span></td>' +
    '<td><span id="number-2">?</span></td>' +
    '<td><span>= </span><input type="number" id="number-ans" /></td>' +
    '<td><button type="button" id="arith-go">开始</button></td></tr></thead>' +
    '<tbody><tr><td><label for="digit-1">位数</label></td>' +
    '<td><label for="arith-type">运算</label></td>' +
    '<td><label for="digit-2">位数</label></td><td>成绩</td><td>正确率</td></tr>' +
    '<tr><td><input type="number" id="digit-1" min="1" value="1" /></td>' +
    '<td><select id="arith-type">' +
    '<option value="+">+</option><option value="-">-</option>' +
    '<option value="×">×</option><option value="÷">÷</option>' +
    '</select></td>' +
    '<td><input type="number" id="digit-2" min="1" value="1" /></td>' +
    '<td id="arith-score">?</td><td id="arith-pct">?</td></tr></tbody></table>');
  var d = document.querySelector('.arith'), v1, v2, N = 0, R = 0,
    op = d.querySelector('#number-op'), score = d.querySelector('#arith-score'),
    type = d.querySelector('#arith-type'), res = d.querySelector('#number-ans'),
    n1 = d.querySelector('#number-1'), n2 = d.querySelector('#number-2'),
    d1 = d.querySelector('#digit-1'), d2 = d.querySelector('#digit-2'),
    bt = d.querySelector('#arith-go'), pc = d.querySelector('#arith-pct');
  // 从 0 到 n - 1 的随机数
  function randN(N) {
    return Math.floor(Math.random() * N);
  }
  // 生成给定位数的随机数
  function genNum(n) {
    var a = 10 ** (n - 1);
    return a + randN(9 * a);
  }
  function addQuiz() {
    var w1 = +d1.value, w2 = +d2.value;
    if (w1 <= 0) d1.value = w1 = 1;
    if (w2 <= 0) d2.value = w2 = 1;
    v1 = genNum(w1); v2 = genNum(w2);
    var t = type.value;
    // 如果减数大于被减数，则把两个数字换一下顺序
    if (t === '-' && v2 > v1) {
      var v = v2; v2 = v1; v1 = v;
    }
    // 保证能整除，不保证第一个数字能符合位数设定
    if (t === '÷') {
      var v = Math.ceil(v1 / v2) * v2;
      v1 = v.toFixed(0).length === +d1.value ? v : (Math.floor(v1 / v2) * v2);
    }
    n1.innerText = v1; n2.innerText = v2;
    op.innerText = type.value;
    d.classList.remove('correct', 'wrong');
    res.disabled = false;
    res.value = '';
    res.focus();
  }
  // 点击按钮出新题
  bt.addEventListener('click', function(e) {
    addQuiz();
    ++N;
  });
  var lb = ['继续', '再来', '加油', '好的', '走你', '嘿哟', '挺住', '瞄瞄', '汪汪', '服了'];
  // 输入答案后验证是否正确
  res.addEventListener('change', function(e) {
    var t = type.value, ans = t === '+' ? v1 + v2 : (
      t === '-' ? v1 - v2 : (
        t === '×' ? v1 * v2 : (
          t === '÷' && v1 / v2)));
    d.classList.add(ans === +res.value ? (++R, 'correct') : 'wrong');
    score.innerText = '对 ' + R + ' / 错 ' + (N - R) + ' / 总 ' + N;
    pc.innerText = Math.round(R / N * 100) + ' %';
    res.disabled = true;
    bt.innerText = lb[randN(lb.length)];
    bt.focus();
  });
})();
