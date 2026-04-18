

    // ── Scroll reveal ──────────────────────────────
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    // ── Theme toggle ───────────────────────────────
    const themeBtn = document.getElementById('themeToggle');
    const htmlEl   = document.documentElement;

    const saved       = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(saved || (prefersDark ? 'dark' : 'light'));

    themeBtn.addEventListener('click', () => {
      const next = htmlEl.dataset.theme === 'light' ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });

    function applyTheme(theme) {
      htmlEl.dataset.theme = theme;
      themeBtn.querySelector('.icon-moon').style.display = theme === 'light' ? 'none'  : 'block';
      themeBtn.querySelector('.icon-sun').style.display  = theme === 'light' ? 'block' : 'none';
    }

    // ── Mobile menu ────────────────────────────────
    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    function openMenu() {
      mobileMenu.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');
      hamburger.querySelector('.icon-menu').style.display  = 'none';
      hamburger.querySelector('.icon-close').style.display = 'block';
    }
    function closeMenu() {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      hamburger.querySelector('.icon-menu').style.display  = 'block';
      hamburger.querySelector('.icon-close').style.display = 'none';
    }

    hamburger.addEventListener('click', () => {
      mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
    });
    document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', closeMenu));
    document.addEventListener('click', e => {
      if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) closeMenu();
    });
