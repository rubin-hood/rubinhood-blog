// ================================
// 1. Initialisierung nach Laden der Seite
// ================================
document.addEventListener('DOMContentLoaded', function() {
  // Wichtige Elemente holen
  var burger = document.getElementById('burger-btn');
  var menu = document.getElementById('mobile-menu');

  // Prüfen, ob beide Elemente existieren!
  if (!burger || !menu) return;

  // Burger-Button: Öffnen & Schließen
  burger.addEventListener('click', function() {
    menu.classList.toggle('open');
    burger.classList.toggle('open');
    document.body.classList.toggle('noscroll');
  });

  // Fenstergröße überwachen: Menü bei großem Bildschirm schließen
  window.addEventListener('resize', function() {
    if (window.innerWidth > 900) {
      menu.classList.remove('open');
      burger.classList.remove('open');
      document.body.classList.remove('noscroll');
    }
  });
});
