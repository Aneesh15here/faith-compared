/* Faith, Compared — shared journey interactions (router, quiz, form, etc.) */
(function () {
  const i18n = window.FC_I18N || {};

  // ---- comparison matrix column toggles ----
  const toggles = document.querySelectorAll('#toggles .toggle');
  function refreshCols() {
    const active = new Set([...toggles].filter(t => t.classList.contains('active')).map(t => t.dataset.col));
    document.querySelectorAll('#matrixTable [data-col]').forEach(cell => {
      cell.classList.toggle('col-hidden', !active.has(cell.dataset.col));
    });
  }
  if (toggles.length) {
    toggles.forEach(t => t.addEventListener('click', () => {
      const activeCount = [...toggles].filter(x => x.classList.contains('active')).length;
      if (t.classList.contains('active') && activeCount === 1) return;
      t.classList.toggle('active');
      refreshCols();
    }));
    refreshCols();
  }

  // ---- deep dive tabs ----
  const tabs = document.querySelectorAll('#ddTabs .tab');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById(tab.dataset.panel);
    if (panel) panel.classList.add('active');
  }));

  // ---- kinetic heading ----
  document.querySelectorAll('h1.kinetic').forEach(h => {
    [...h.childNodes].forEach(node => {
      if (node.nodeType !== Node.TEXT_NODE || !node.textContent.trim()) return;
      const frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(chunk => {
        if (!chunk) return;
        if (/^\s+$/.test(chunk)) { frag.appendChild(document.createTextNode(chunk)); return; }
        const span = document.createElement('span');
        span.className = 'kw';
        span.textContent = chunk;
        frag.appendChild(span);
      });
      node.replaceWith(frag);
    });
    h.querySelectorAll('.kw').forEach((el, i) => el.style.setProperty('--i', i));
  });

  // ---- hero pointer-tilt parallax ----
  const heroStage = document.getElementById('heroStage');
  const heroEl = document.querySelector('.hero');
  if (heroStage && heroEl && matchMedia('(hover: hover) and (pointer: fine)').matches
      && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let tiltRaf = null;
    heroEl.addEventListener('pointermove', ev => {
      const r = heroEl.getBoundingClientRect();
      const px = (ev.clientX - r.left) / r.width - 0.5;
      const py = (ev.clientY - r.top) / r.height - 0.5;
      if (tiltRaf) return;
      tiltRaf = requestAnimationFrame(() => {
        heroStage.style.setProperty('--tiltX', (px * 6).toFixed(2) + 'deg');
        heroStage.style.setProperty('--tiltY', (py * -6).toFixed(2) + 'deg');
        tiltRaf = null;
      });
    });
    heroEl.addEventListener('pointerleave', () => {
      heroStage.style.setProperty('--tiltX', '0deg');
      heroStage.style.setProperty('--tiltY', '0deg');
    });
  }

  // ---- reveal on scroll ----
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal, .rcard, .fact').forEach(el => { el.classList.add('reveal'); io.observe(el); });

  // ---- contact form (FormSubmit + honeypot; captcha via FormSubmit dashboard) ----
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const contactSend = document.getElementById('contactSend');
  const c = (i18n.contact) || {};
  if (contactForm && formStatus && contactSend) {
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      if (!contactForm.reportValidity()) return;
      const honey = contactForm.querySelector('[name="_honey"]');
      if (honey && honey.value) return;
      contactSend.disabled = true;
      contactSend.textContent = c.sending || 'Sending…';
      formStatus.classList.remove('error');
      formStatus.textContent = '';
      try {
        const res = await fetch('https://formsubmit.co/ajax/3af65db5073e39fb154eb3268d8f0105', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            name: contactForm.name.value,
            email: contactForm.email.value,
            message: contactForm.message.value,
            _subject: c.subject || 'New comment on comparereligion.com',
            _template: 'table',
            // FormSubmit: enable captcha in dashboard; honeypot already present as _honey
            _blacklist: '',
            page: location.href
          })
        });
        if (!res.ok) throw new Error('send failed');
        contactForm.reset();
        contactSend.textContent = c.sentBtn || 'Sent ✓';
        formStatus.textContent = c.sentMsg || 'Thank you — your comment is on its way.';
        setTimeout(() => {
          contactSend.disabled = false;
          contactSend.textContent = c.submitBtn || 'Send comment →';
        }, 4000);
      } catch (err) {
        contactSend.disabled = false;
        contactSend.textContent = c.submitBtn || 'Send comment →';
        formStatus.classList.add('error');
        formStatus.textContent = c.error || 'Something went wrong — please try again in a moment.';
      }
    });
  }

  // ---- journey router (legacy #route → #/route) ----
  const JOURNEY_ROUTES = ['home', 'religions', 'compare', 'islam', 'evidence', 'questions', 'objections', 'restoration', 'atheism', 'sources', 'contact'];
  function normalizeLegacyHash() {
    const raw = location.hash;
    if (!raw || raw === '#' || raw.startsWith('#/')) return false;
    const route = raw.slice(1).split(/[?/]/)[0];
    if (JOURNEY_ROUTES.includes(route)) {
      history.replaceState(null, '', '#/' + route + (raw.includes('?') ? raw.slice(raw.indexOf('?')) : ''));
      return true;
    }
    return false;
  }
  function journeyRoute() {
    normalizeLegacyHash();
    const h = location.hash.replace(/^#\/?/, '').split(/[?/]/)[0];
    return JOURNEY_ROUTES.includes(h) ? h : 'home';
  }
  function showJourney() {
    const r = journeyRoute();
    document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.dataset.route === r));
    document.querySelectorAll('.nav-links a[data-r]').forEach(a => a.classList.toggle('nav-active', a.dataset.r === r));
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  window.addEventListener('hashchange', showJourney);
  showJourney();
  window.FC_journeyRoute = journeyRoute;

  // ---- constellation reveal ----
  const consl = document.getElementById('constellation');
  if (consl) {
    new IntersectionObserver((es, o) => es.forEach(e => {
      if (e.isIntersecting) { consl.classList.add('in'); o.disconnect(); }
    }), { threshold: 0.4 }).observe(consl);
  }

  // ---- timeline of traditions ----
  const TL_YEARS = { indigenous: -3000, hinduism: -1900, judaism: -1650, zoroastrianism: -1100, shinto: -660, jainism: -550, confucianism: -500, buddhism: -450, taoism: -400, atheism: -300, christianity: 30, islam: 610, sikhism: 1499, lds: 1830, bahai: 1863, jw: 1870, scientology: 1954 };
  (function () {
    const tl = document.getElementById('timeline');
    if (!tl || typeof RELIGIONS === 'undefined') return;
    const min = -3300, max = 2250;
    const x = y => ((y - min) / (max - min)) * 100;
    [-3000, -2000, -1000, 0, 1000, 2000].forEach(y => {
      const t = document.createElement('div'); t.className = 'tl-tick'; t.style.left = x(y) + '%';
      t.textContent = y < 0 ? Math.abs(y) + ' BC' : (y === 0 ? 'AD 1' : 'AD ' + y);
      tl.appendChild(t);
    });
    const axis = document.createElement('div'); axis.className = 'tl-axis'; tl.appendChild(axis);
    RELIGIONS.filter(r => TL_YEARS[r.id] !== undefined)
      .sort((a, b) => TL_YEARS[a.id] - TL_YEARS[b.id])
      .forEach((r, i) => {
        const d = document.createElement('button'); d.type = 'button';
        d.className = 'tl-item ' + (i % 2 ? 'down' : 'up');
        d.style.left = x(TL_YEARS[r.id]) + '%';
        d.innerHTML = `<span class="tl-emoji" aria-hidden="true">${r.emoji}</span><span class="tl-name">${r.name}</span><span class="tl-date">${r.founded.split('·')[0].trim()}</span>`;
        d.addEventListener('click', () => openRelModal(r));
        tl.appendChild(d);
      });
  })();

  // ---- guided quiz ----
  (function () {
    const box = document.getElementById('quizBox');
    if (!box) return;
    const picks = {};
    const RESULTS = i18n.quizResults || {};
    const footer = i18n.quizFooter || '';
    box.querySelectorAll('.quiz-opt').forEach(btn => btn.addEventListener('click', () => {
      const q = btn.closest('.quiz-q');
      q.querySelectorAll('.quiz-opt').forEach(b => b.classList.remove('sel'));
      btn.classList.add('sel');
      picks[q.dataset.q] = btn.dataset.tags;
      if (Object.keys(picks).length === 4) showResult();
    }));
    function showResult() {
      const counts = {};
      Object.values(picks).forEach(t => counts[t] = (counts[t] || 0) + 1);
      const ranked = Object.entries(counts).sort((a, b) => b[1] - a[1]);
      const top = RESULTS[ranked[0][0]];
      if (!top) return;
      const second = ranked[1] && ranked[1][1] === ranked[0][1] ? RESULTS[ranked[1][0]] : null;
      const out = document.getElementById('quizResult');
      const title =
        (i18n.quizTitleBefore || 'Your answers sit closest to ') +
        top.label +
        (i18n.quizTitleAfter || '') +
        (second
          ? (i18n.quizTitleSecondBefore || ' — with a strong pull toward ') +
            second.label +
            (i18n.quizTitleSecondAfter || '')
          : '');
      out.innerHTML =
        `<h3>${title}</h3>` +
        `<div class="qr-row"><strong>${i18n.quizNearestLabel || 'Nearest traditions:'}</strong> ${top.traditions}${second ? ' · ' + second.traditions : ''}</div>` +
        `<div class="qr-row">${top.blurb}</div>` +
        `<div class="qr-row" style="margin-top:16px;"><a class="btn btn-primary" href="${top.link}">${top.linkText}</a></div>` +
        `<div class="qr-row" style="font-size:.82rem; opacity:.75;">${footer}</div>`;
      out.classList.add('show');
      out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  })();

  // ---- reading progress ----
  (function () {
    const KEY = 'fc-progress';
    let st = {}; try { st = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { /* ignore */ }
    st.visited = st.visited || [];
    const CH_NO = { religions: '01', compare: '02', islam: '03', evidence: '04', questions: '05', objections: '06', restoration: '07', atheism: '08', sources: '11', contact: '12' };
    const routeOf = a => { const h = a.getAttribute('href'); return h.startsWith('#/') ? h.slice(2) : h; };
    document.querySelectorAll('.chapter').forEach(a => {
      const b = document.createElement('span'); b.className = 'ch-done'; b.textContent = '✓'; a.appendChild(b);
    });
    function paint() {
      document.querySelectorAll('.chapter').forEach(a => a.classList.toggle('visited', st.visited.includes(routeOf(a))));
    }
    function record() {
      const r = journeyRoute();
      if (r !== 'home') {
        st.last = r;
        if (!st.visited.includes(r)) st.visited.push(r);
        try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { /* ignore */ }
        paint();
      }
    }
    paint();
    window.addEventListener('hashchange', record); record();
    const pill = document.getElementById('continuePill');
    if (pill && st.last && CH_NO[st.last]) {
      pill.href = '#/' + st.last;
      const prefix = i18n.continuePrefix || '▶ Continue where you left off — Chapter ';
      const suffix = i18n.continueSuffix || ' →';
      pill.textContent = prefix + CH_NO[st.last] + suffix;
      pill.classList.add('show');
    }
  })();

  // ---- share buttons ----
  (function () {
    const MSGS = i18n.shareMessages || {};
    document.querySelectorAll('.share-btn').forEach(b => b.addEventListener('click', async () => {
      const m = MSGS[b.dataset.share] || MSGS.site;
      if (!m) return;
      if (navigator.share) { try { await navigator.share(m); } catch (e) { /* cancelled */ } }
      else { window.open('https://wa.me/?text=' + encodeURIComponent(m.text + ' ' + m.url), '_blank', 'noopener'); }
    }));
  })();
})();
