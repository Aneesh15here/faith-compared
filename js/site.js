/* Faith, Compared — shared site chrome (mobile nav, SW, progress) */
(function () {
  const i18n = window.FC_I18N || {};
  const navLabels = (i18n.nav) || { openMenu: 'Open menu', closeMenu: 'Close menu' };

  // Resolve asset root: locale pages live one level down.
  const path = location.pathname.replace(/\\/g, '/');
  const inLocale = /\/(es|hi|ja|ml|ta|zh)(\/|$)/.test(path);
  const assetRoot = inLocale ? '..' : '.';

  // ---- mobile nav drawer ----
  function initMobileNav() {
    const nav = document.querySelector('nav');
    const links = document.querySelector('.nav-links');
    const inner = document.querySelector('.nav-inner');
    if (!nav || !links || !inner || nav.querySelector('.nav-toggle')) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'nav-toggle';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'primary-nav');
    btn.setAttribute('aria-label', navLabels.openMenu);
    btn.innerHTML = '<span class="nav-toggle-bars" aria-hidden="true"></span>';
    links.id = links.id || 'primary-nav';

    const backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    backdrop.hidden = true;
    nav.after(backdrop);

    inner.appendChild(btn);

    let lastFocus = null;
    const focusables = () =>
      [btn, ...links.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')]
        .filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);

    function setOpen(open) {
      nav.classList.toggle('nav-open', open);
      document.body.classList.toggle('nav-drawer-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? navLabels.closeMenu : navLabels.openMenu);
      backdrop.hidden = !open;
      if (open) {
        lastFocus = document.activeElement;
        const firstLink = links.querySelector('a');
        if (firstLink) firstLink.focus();
      } else if (lastFocus && typeof lastFocus.focus === 'function') {
        lastFocus.focus();
      }
    }

    btn.addEventListener('click', () => setOpen(!nav.classList.contains('nav-open')));
    backdrop.addEventListener('click', () => setOpen(false));
    links.addEventListener('click', e => {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab' || !nav.classList.contains('nav-open')) return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  // ---- service worker (always register root SW) ----
  function initServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    const swUrl = assetRoot === '.' ? '/sw.js' : new URL('../sw.js', location.href).pathname;
    // Prefer absolute root so one SW covers all locales.
    navigator.serviceWorker.register('/sw.js').catch(() => {
      navigator.serviceWorker.register(swUrl).catch(() => {});
    });
  }

  // ---- scroll progress + trail hiker (when present) ----
  function initProgress() {
    const progressBar = document.getElementById('progress');
    const hiker = document.getElementById('trailHiker');
    if (!progressBar && !hiker) return;
    if (hiker) hiker.setAttribute('aria-hidden', 'true');
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      if (progressBar) progressBar.style.width = pct + '%';
      if (hiker) hiker.style.left = pct + '%';
    }, { passive: true });
  }

  // ---- back to top ----
  function initToTop() {
    const toTop = document.getElementById('toTop');
    if (!toTop) return;
    window.addEventListener('scroll', () => toTop.classList.toggle('show', window.scrollY > 700), { passive: true });
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ---- reveal on scroll (secondary pages) ----
  function initReveal() {
    const nodes = document.querySelectorAll('.reveal, .rcard, .fact, .quote-card, .q5-item');
    if (!nodes.length) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    nodes.forEach(el => { el.classList.add('reveal'); io.observe(el); });
  }

  initMobileNav();
  initReveal();
  initServiceWorker();
  initProgress();
  initToTop();
})();
