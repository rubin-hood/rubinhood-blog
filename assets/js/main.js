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

// Füge dies nach dem Laden der Seite ein (z.B. in main.js)
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.blog-card');
cards.forEach((card, i) => {
  setTimeout(() => {
    card.classList.add('animate-in');
    card.addEventListener('animationend', () => {
      card.classList.remove('animate-in');
      card.style.opacity = "1";
      card.style.transform = "none";
    }, { once: true });
  }, i * 400); // Nur noch gestaffelt nach Index, keine Grundverzögerung
});

