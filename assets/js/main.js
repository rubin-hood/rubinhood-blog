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


// Smooth Collapsing Sticky Header
let lastScroll = 0;
let ticking = false;
const header = document.querySelector('.site-header');
const collapseStart = 30;  // ab wieviel px Scroll soll geschrumpft werden
const collapseEnd = 420;   // ab wieviel px Header ganz verschwinden

function onScroll() {
  const scrollY = window.scrollY || window.pageYOffset;

  if (scrollY < collapseStart) {
    header.classList.remove('shrink');
    header.classList.remove('hide');
  } else if (scrollY >= collapseStart && scrollY < collapseEnd) {
    header.classList.add('shrink');
    header.classList.remove('hide');
    // Dynamische Höhe/Transparenz (optional):
    let percent = (scrollY - collapseStart) / (collapseEnd - collapseStart);
    percent = Math.min(1, Math.max(0, percent));
    header.style.height = `${110 - (56 * percent)}px`;
    header.style.opacity = `${1 - (0.95 * percent)}`;
  } else {
    header.classList.add('hide');
    header.style.height = '0px';
    header.style.opacity = '0';
  }
  ticking = false;
}

// Für ultra smoothness -> requestAnimationFrame
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(onScroll);
    ticking = true;
  }
});

// Optional: Reset bei Seitenwechsel (falls SPA)
window.addEventListener('pageshow', () => {
  header.classList.remove('shrink', 'hide');
  header.style.height = '';
  header.style.opacity = '';
});


