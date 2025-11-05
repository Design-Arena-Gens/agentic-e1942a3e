(function () {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const helloBtn = document.getElementById('helloBtn');
  const message = document.getElementById('message');
  const clock = document.getElementById('clock');

  function setTheme(next) {
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (_) {}
  }

  function initTheme() {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') {
        setTheme(saved);
        return;
      }
    } catch (_) {}
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }

  function tickClock() {
    const now = new Date();
    const fmt = new Intl.DateTimeFormat('fr-FR', {
      dateStyle: 'full', timeStyle: 'medium'
    }).format(now);
    clock.textContent = fmt;
  }

  function sayHello() {
    const greetings = [
      'Salut !', 'Bonjour ??', 'Coucou ?', 'Yo ??', 'Hello from Vercel ??'
    ];
    const pick = greetings[Math.floor(Math.random() * greetings.length)];
    message.textContent = pick + ' Il fait beau pour d?ployer.';
  }

  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'dark';
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  helloBtn.addEventListener('click', sayHello);

  initTheme();
  tickClock();
  setInterval(tickClock, 1000);
})();
