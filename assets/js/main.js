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



document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.blog-teaser-grid .blog-card');
  cards.forEach((card, i) => {
    setTimeout(() => {
      card.classList.add('appear');
    }, i === 0 ? 0 : 400 + i * 350);
  });
});




const header = document.querySelector('.site-header');
let lastScroll = window.scrollY;
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const current = window.scrollY;

      if (current > 30 && current > lastScroll) { 
        // User scrollt nach unten und ist ein Stück gescrollt
        header.classList.add('shrink');    // Header wird schmaler
        header.classList.add('hide');      // Header verschwindet ganz
      } else if (current > 10 && current < lastScroll) { 
        // User scrollt nach oben
        header.classList.add('shrink');    // Header bleibt schmal
        header.classList.remove('hide');   // Header wird sichtbar
      } else if (current <= 10) {
        // Ganz oben
        header.classList.remove('shrink'); // Originalgröße
        header.classList.remove('hide');
      }
      lastScroll = current;
      ticking = false;
    });
    ticking = true;
  }
});
