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



let appearIndex = 0;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = appearIndex * 120;
      setTimeout(() => {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }, delay);
      appearIndex++;
    }
  });
}, {
  threshold: 0,
  rootMargin: '0px 0px -40% 0px'
});

document.querySelectorAll('.blog-card').forEach(card => {
  observer.observe(card);
});




