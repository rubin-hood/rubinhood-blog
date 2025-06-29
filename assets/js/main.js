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
// Smooth Sticky Shrinking Header
(function() {
  const header = document.getElementById('site-header');
  let lastScroll = window.scrollY;
  let ticking = false;
  let shrinkTrigger = 36; // Pixel nach denen Header beginnt zu schrumpfen
  let hideTrigger = 240;  // Pixel nach denen Header ausblendet

  function onScroll() {
    const y = window.scrollY;
    // Header nie ausblenden, wenn das mobile Menü offen ist!
    const burgerOpen = document.body.classList.contains('mobile-menu-open');
    if (burgerOpen) {
      header.classList.remove('hide');
      return;
    }
    // Animation
    if (y > shrinkTrigger && y <= hideTrigger) {
      header.classList.add('shrink');
      header.classList.remove('hide');
    } else if (y > hideTrigger) {
      header.classList.add('hide');
    } else {
      header.classList.remove('shrink', 'hide');
    }
    lastScroll = y;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
})();




