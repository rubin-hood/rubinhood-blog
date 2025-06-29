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



document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll('.blog-card');
  if (cards.length > 0) {
    // Entferne die Transition vor dem Sichtbarmachen!
    cards[0].style.transition = 'none';
    cards[0].classList.add('visible');
    // Danach kann die Transition zurückgesetzt werden, damit Hover usw. noch funktionieren
    setTimeout(() => {
      cards[0].style.transition = '';
    }, 50); // kleiner Timeout reicht
  }
  // Rest animiert verzögert
  for (let i = 1; i < cards.length; i++) {
    setTimeout(() => {
      cards[i].classList.add('visible');
    }, i * 120);
  }
});



