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

const header = document.querySelector('.site-header');

let lastScroll = 0;
let ticking = false;
let collapsed = false;

function onScroll() {
  const scrollY = window.scrollY;

  // Header schrumpft zwischen 0px und 120px Scroll
  if (scrollY < 120) {
    header.classList.remove('collapsed');
    header.classList.remove('shrink');
    header.style.height = 90 - (54 * (scrollY / 120)) + 'px'; // von 90 auf 36 px
    header.style.opacity = (1 - 0.08 * (scrollY / 120)).toString();
    collapsed = false;
  } else if (scrollY >= 120 && scrollY < 200) {
    // Header bleibt geschrumpft
    header.classList.remove('collapsed');
    header.classList.add('shrink');
    header.style.height = '36px';
    header.style.opacity = '0.92';
    collapsed = false;
  } else {
    // Header komplett weg
    if (!collapsed) {
      header.classList.add('collapsed');
      header.style.height = '0px';
      header.style.opacity = '0';
      collapsed = true;
    }
  }
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
