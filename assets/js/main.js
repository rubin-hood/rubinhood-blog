// ================================
// Alles erst nach Laden der Seite!
document.addEventListener('DOMContentLoaded', function() {

  // ================================
  // 1. Burger-Menü: Öffnen & Schließen
  // ================================
  var burger = document.getElementById('burger-btn');
  var menu = document.getElementById('mobile-menu');

  if (burger && menu) {
    burger.addEventListener('click', function() {
      menu.classList.toggle('open');
      burger.classList.toggle('open');
      document.body.classList.toggle('noscroll');
    });

    window.addEventListener('resize', function() {
      if (window.innerWidth > 900) {
        menu.classList.remove('open');
        burger.classList.remove('open');
        document.body.classList.remove('noscroll');
      }
    });
  }

  // ================================
  // 2. Lazy Animation für Blog-Cards
  // ================================
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      // Nur die sichtbaren Elemente animieren (Staffelung!)
      const visible = entries.filter(entry => entry.isIntersecting);
      visible.forEach((entry, i) => {
        setTimeout(() => {
          entry.target.classList.add('appear');
          observer.unobserve(entry.target); // Nur 1x animieren
        }, i * 100); // 100ms Staffelung
      });
    }, {
      threshold: 0,
      rootMargin: '0px'
    });

    document.querySelectorAll('.blog-card').forEach(card => {
      observer.observe(card);
    });
  } else {
    // Fallback für alte Browser: Sofort anzeigen
    document.querySelectorAll('.blog-card').forEach(card => {
      card.classList.add('appear');
    });
  }

  // ================================
  // 3. Progressive Sticky Header Animation
  // ================================
  (function() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const logoImg = header.querySelector('.logo img');
    if (!logoImg) return;

    // Parameter für das Animation-Intervall
    const maxScroll = 20;
    const maxHeight = 110;
    const minHeight = 0;
    const maxLogo = 100;
    const minLogo = 0;
    const maxPadding = 2;
    const minPadding = 0;

    window.addEventListener('scroll', function() {
      let scroll = window.scrollY;
      if (scroll < 0) scroll = 0;
      if (scroll > maxScroll) scroll = maxScroll;

      const t = scroll / maxScroll;

      // Dynamische Werte berechnen und setzen
      const newHeight = maxHeight - (maxHeight - minHeight) * t;
      const newLogo = maxLogo - (maxLogo - minLogo) * t;
      const newPadding = maxPadding - (maxPadding - minPadding) * t;
      const newOpacity = 1 - t;

      header.style.setProperty('--header-height', `${newHeight}px`);
      header.style.setProperty('--header-padding', `${newPadding}rem`);
      header.style.setProperty('--header-opacity', newOpacity);
      logoImg.style.setProperty('--logo-height', `${newLogo}px`);
    });
  })();

  // ================================
  // 4. Lazy-Loading für Bilder
  // ================================
  document.querySelectorAll('img:not([loading])').forEach(img => {
    img.setAttribute('loading', 'lazy');
  });

});
