/* ============================================
   公考真题库 · 页面交互脚本
   ============================================ */

/* ---------- 题库试做数据 ---------- */
var BANK = [
  {
    name: '常识判断',
    type: 'choice',
    source: '2026年国考（副省级）· 常识判断 第3题',
    stem: '根据我国宪法规定，下列关于土地所有权的表述，正确的是：',
    options: [
      '城市的土地，属于集体所有',
      '宅基地和自留地、自留山，属于国家所有',
      '农村和城市郊区的土地，除由法律规定属于国家所有的以外，属于集体所有',
      '国家征收土地的，按照被征收土地的原用途给予赔偿'
    ],
    answer: 2,
    analysis: '《宪法》第十条规定：城市的土地属于国家所有，A 项错误；农村和城市郊区的土地，除由法律规定属于国家所有的以外，属于集体所有，C 项正确；宅基地和自留地、自留山，也属于集体所有，B 项错误；国家为了公共利益的需要，可以依照法律规定对土地实行征收或者征用并给予"补偿"（而非"赔偿"），D 项错误。'
  },
  {
    name: '言语理解',
    type: 'choice',
    source: '2025年省考联考 · 言语理解与表达 第21题',
    stem: '依次填入下列横线处的词语，最恰当的一组是：新媒体的发展，不仅改变了信息的____方式，也深刻影响着人们的阅读习惯。碎片化阅读在带来便利的同时，也使人____于浅层思考。',
    options: [
      '传播　沉迷',
      '传递　专注',
      '传播　专注',
      '传递　沉迷'
    ],
    answer: 0,
    analysis: '第一空，"传播信息"是固定搭配，且强调信息的扩散范围，比"传递"更贴合新媒体语境；第二空，由"碎片化阅读的消极影响"可知，横线处应填含贬义色彩的"沉迷"，"专注"为褒义词，与语境不符。故选 A。'
  },
  {
    name: '判断推理',
    type: 'choice',
    source: '2026年国考（地市级）· 判断推理 第78题',
    stem: '某单位新来了甲、乙、丙、丁四名员工。关于籍贯有如下说法：（1）如果甲是江苏人，那么乙是浙江人；（2）只有丙是山东人，甲才是江苏人；（3）甲和丙中至少有一人是江苏人；（4）乙不是浙江人。若四句话中有两句为真、两句为假，则以下判断必然为真的是：',
    options: [
      '甲是江苏人，乙不是浙江人',
      '甲不是江苏人，丙是山东人',
      '甲是江苏人，丙是山东人',
      '甲不是江苏人，丙不是山东人'
    ],
    answer: 0,
    analysis: '假设（1）为假，则"甲是江苏人且乙不是浙江人"成立，此时（4）为真。再看（2）（3）：由甲是江苏人可知（3）为真，故（2）必为假，即"甲是江苏人且丙不是山东人"。验证：四句话恰好两真两假，假设成立。因此甲是江苏人、乙不是浙江人，选 A。'
  },
  {
    name: '申论',
    type: 'subjective',
    source: '2025年省考联考 · 申论（乡镇卷）第一题',
    stem: '根据给定资料，概括 S 市推进"15分钟政务服务圈"建设的主要做法。（20分）',
    material: [
      '依托社区党群服务中心设立自助服务终端，1400 余项高频事项实现"就近办、马上办"。',
      '选派 300 余名业务骨干下沉社区，为老年人等特殊群体提供帮办代办服务。',
      '打通部门数据壁垒，推行"一表申请、并联审批"，申请材料压减 60%，办理时限压缩 50%。'
    ],
    analysis: '参考要点：①延伸服务网点——依托社区阵地布设自助终端，推动高频事项就近办理；②充实服务力量——选派业务骨干下沉社区，提供帮办代办服务；③再造办事流程——打通数据壁垒，推行"一表申请、并联审批"，压减材料、压缩时限。'
  }
];

var LETTERS = ['A', 'B', 'C', 'D'];
var tabsEl = document.getElementById('quizTabs');
var bodyEl = document.getElementById('quizBody');
var current = 0;
var answered = false;

function renderTabs() {
  BANK.forEach(function (q, i) {
    var btn = document.createElement('button');
    btn.className = 'tab-btn' + (i === 0 ? ' active' : '');
    btn.type = 'button';
    btn.setAttribute('role', 'tab');
    btn.textContent = q.name;
    btn.addEventListener('click', function () { selectTab(i); });
    tabsEl.appendChild(btn);
  });
}

function selectTab(i) {
  current = i;
  answered = false;
  var btns = tabsEl.querySelectorAll('.tab-btn');
  btns.forEach(function (b, idx) { b.classList.toggle('active', idx === i); });
  renderQuestion();
}

function renderQuestion() {
  var q = BANK[current];
  var html = '<p class="quiz-source">' + q.source + '</p>';
  html += '<p class="quiz-stem">' + q.stem + '</p>';

  if (q.type === 'choice') {
    html += '<div class="options">';
    q.options.forEach(function (opt, idx) {
      html += '<button type="button" class="option" data-idx="' + idx + '">' +
        '<span class="letter">' + LETTERS[idx] + '</span><span>' + opt + '</span></button>';
    });
    html += '</div>';
    html += '<div class="quiz-feedback" id="quizFeedback"></div>';
  } else {
    html += '<ul class="material">';
    q.material.forEach(function (m) { html += '<li>' + m + '</li>'; });
    html += '</ul>';
    html += '<button type="button" class="btn-toggle" id="showAnalysis">查看参考要点</button>';
    html += '<div class="quiz-feedback" id="quizFeedback"><h4>参考要点</h4><p>' + q.analysis + '</p></div>';
  }

  bodyEl.innerHTML = html;

  if (q.type === 'choice') {
    bodyEl.querySelectorAll('.option').forEach(function (btn) {
      btn.addEventListener('click', function () { chooseOption(+btn.dataset.idx); });
    });
  } else {
    document.getElementById('showAnalysis').addEventListener('click', function () {
      var fb = document.getElementById('quizFeedback');
      var show = !fb.classList.contains('show');
      fb.classList.toggle('show', show);
      this.textContent = show ? '收起参考要点' : '查看参考要点';
    });
  }
}

function chooseOption(idx) {
  if (answered) return;
  answered = true;
  var q = BANK[current];
  var fb = document.getElementById('quizFeedback');

  bodyEl.querySelectorAll('.option').forEach(function (btn) {
    var i = +btn.dataset.idx;
    btn.disabled = true;
    if (i === q.answer) btn.classList.add('correct');
    else if (i === idx) btn.classList.add('wrong');
  });

  var right = idx === q.answer;
  fb.className = 'quiz-feedback show ' + (right ? 'ok' : 'no');
  fb.innerHTML = '<h4>' + (right ? '回答正确！' : '回答错误，正确答案是 ' + LETTERS[q.answer]) + '</h4>' +
    '<p>' + q.analysis + '</p>';
}

renderTabs();
renderQuestion();

/* ---------- 倒计时 ---------- */
var EXAM_DATE = new Date('2026-11-29T09:00:00+08:00');
function tickCountdown() {
  var diff = EXAM_DATE - new Date();
  var label = document.getElementById('cdLabel');
  if (diff <= 0) {
    label.textContent = '2027 国考笔试已开考，全力冲刺！';
    document.getElementById('cdDays').textContent = '0';
    document.getElementById('cdHours').textContent = '0';
    document.getElementById('cdMins').textContent = '0';
    return;
  }
  var mins = Math.floor(diff / 60000);
  document.getElementById('cdDays').textContent = Math.floor(mins / 1440);
  document.getElementById('cdHours').textContent = Math.floor((mins % 1440) / 60);
  document.getElementById('cdMins').textContent = mins % 60;
}
tickCountdown();
setInterval(tickCountdown, 30000);

/* ---------- 数字滚动 ---------- */
function animateCount(el) {
  var target = +el.dataset.count;
  var suffix = el.dataset.suffix || '';
  var duration = 1200;
  var start = null;
  function step(ts) {
    if (!start) start = ts;
    var p = Math.min((ts - start) / duration, 1);
    var eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased).toLocaleString() + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ---------- 滚动进入动画 ---------- */
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    var el = entry.target;
    el.classList.add('visible');
    el.querySelectorAll('b[data-count]').forEach(animateCount);
    io.unobserve(el);
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

/* ---------- 顶部导航 ---------- */
var header = document.getElementById('siteHeader');
window.addEventListener('scroll', function () {
  header.classList.toggle('scrolled', window.scrollY > 10);
});

var menuBtn = document.getElementById('menuBtn');
var nav = document.getElementById('nav');
menuBtn.addEventListener('click', function () { nav.classList.toggle('open'); });
nav.querySelectorAll('a').forEach(function (a) {
  a.addEventListener('click', function () { nav.classList.remove('open'); });
});
