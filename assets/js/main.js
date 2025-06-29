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



// Karten beim Laden animiert erscheinen lassen
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.blog-teaser-grid .blog-card');
  cards.forEach((card, i) => {
    setTimeout(() => {
      card.classList.add('appear');
    }, i === 0 ? 0 : 250 + i * 120); // Erste sofort, Rest verzögert
  });

  // Alle Karten gleichzeitig vergrößern beim Hover/Fokus einer Karte
  const grid = document.querySelector('.blog-teaser-grid');
  if (!grid) return;

  function addGroupHover() {
    grid.classList.add('blog-card-group-hover');
  }
  function removeGroupHover() {
    grid.classList.remove('blog-card-group-hover');
  }

  cards.forEach(card => {
    card.addEventListener('mouseenter', addGroupHover);
    card.addEventListener('focusin', addGroupHover);
    card.addEventListener('mouseleave', removeGroupHover);
    card.addEventListener('focusout', removeGroupHover);
  });
});




