// Theme persistence
(function () {
  const root = document.documentElement;
  const STORAGE_KEY = 'akp-theme';
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light') {
    root.setAttribute('data-theme', 'light');
  }

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const applyPressed = () => {
      const isLight = root.getAttribute('data-theme') === 'light';
      themeToggle.setAttribute('aria-pressed', String(isLight));
    };
    applyPressed();
    themeToggle.addEventListener('click', () => {
      const nextIsLight = !(root.getAttribute('data-theme') === 'light');
      if (nextIsLight) {
        root.setAttribute('data-theme', 'light');
        localStorage.setItem(STORAGE_KEY, 'light');
      } else {
        root.removeAttribute('data-theme');
        localStorage.setItem(STORAGE_KEY, 'dark');
      }
      applyPressed();
    });
  }

  // Mobile nav
  const menuToggle = document.getElementById('menuToggle');
  const primaryMenu = document.getElementById('primaryMenu');
  if (menuToggle && primaryMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = primaryMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
    primaryMenu.addEventListener('click', (e) => {
      const target = e.target;
      if (target instanceof HTMLElement && target.tagName === 'A') {
        primaryMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Set current year
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Scroll reveal for sections
  const revealables = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealables.length) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    revealables.forEach((el) => observer.observe(el));
  } else {
    // Fallback
    revealables.forEach((el) => el.classList.add('revealed'));
  }
})();


