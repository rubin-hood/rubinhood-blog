// ================================
// 1. Initialisierung nach Laden der Seite
// ================================
document.addEventListener('DOMContentLoaded', function() {
  // --------- Variablen für die wichtigsten Elemente ---------
  var burger = document.getElementById('burger-btn');      // Burger-Menü-Button
  var menu = document.getElementById('mobile-menu');       // Overlay für das mobile Menü

  // ================================
  // 2. Burger-Button: Öffnen & Schließen des Menüs
  // ================================
  burger.addEventListener('click', function() {
    menu.classList.toggle('open');                // Overlay ein-/ausblenden
    burger.classList.toggle('open');              // Button animieren (z.B. Kreuz)
    document.body.classList.toggle('noscroll');   // Body darf nicht scrollen bei offenem Menü
  });

  // ================================
  // 3. Fenstergröße überwachen: Menü bei großem Bildschirm schließen
  // ================================
  window.addEventListener('resize', function() {
    if (window.innerWidth > 900) {                      // Breakpoint anpassen an dein CSS!
      menu.classList.remove('open');                    // Overlay ausblenden
      burger.classList.remove('open');                  // Button zurücksetzen
      document.body.classList.remove('noscroll');       // Body wieder scrollbar machen
    }
  });
});



const observer = new IntersectionObserver((entries, observer) => {
  // Sortiere entries nach ihrer Position im DOM (optional)
  const visible = entries.filter(entry => entry.isIntersecting);
  visible.forEach((entry, i) => {
    setTimeout(() => {
      entry.target.classList.add('appear');
      observer.unobserve(entry.target);
    }, i * 100); // 100ms Staffelung pro sichtbarer Card
  });
}, {
  threshold: 0,
  rootMargin: '0px'
});

document.querySelectorAll('.blog-card').forEach(card => {
  observer.observe(card);
});




//-------------------------
// Progressive Sticky Header Animation
(function() {
  const header = document.querySelector('.site-header');
  const logoImg = header.querySelector('.logo img');
  
  // Konfiguration – anpassen nach Geschmack
  const maxScroll = 160;    // Wie viel Pixel, bis Header ganz wegslidet?
  const maxHeight = 110;    // Start-Höhe Header (wie dein Design)
  const minHeight = 36;     // Kleinste Höhe Header (sollte nicht 0 sein!)
  const maxLogo = 100;      // Logo groß
  const minLogo = 24;       // Logo klein
  const maxPadding = 2;     // Padding links/rechts in rem
  const minPadding = 0.5;   // Minimalpadding
  const fadeOutStart = 0.2; // Ab 20% Scroll beginnt Opazität zu sinken

  window.addEventListener('scroll', function() {
    let scroll = window.scrollY;
    if (scroll < 0) scroll = 0;
    if (scroll > maxScroll) scroll = maxScroll;
    const t = scroll / maxScroll; // 0 = oben, 1 = maxScroll

    // Animation: sanft schrumpfen
    const newHeight = maxHeight - (maxHeight - minHeight) * t;
    const newLogo = maxLogo - (maxLogo - minLogo) * t;
    const newPadding = maxPadding - (maxPadding - minPadding) * t;

    // Animation: sanft Opazität verringern, aber erst nach etwas Scroll
    let newOpacity = 1;
    if (t > fadeOutStart) {
      newOpacity = 1 - ((t - fadeOutStart) / (1 - fadeOutStart)); // linear fade ab 20%
      if (newOpacity < 0) newOpacity = 0;
    }

    // Animation: Slide-Out, sobald fast ganz oben (z.B. ab t > 0.97)
    let newTranslate = '0%';
    if (t > 0.97) newTranslate = '-100%';

    // Setzen der CSS-Variablen
    header.style.setProperty('--header-height', `${newHeight}px`);
    header.style.setProperty('--header-padding', `${newPadding}rem`);
    header.style.setProperty('--header-opacity', newOpacity);
    header.style.setProperty('--header-translate', newTranslate);
    logoImg.style.setProperty('--logo-height', `${newLogo}px`);
  });
})();


