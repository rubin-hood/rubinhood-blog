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
const header = document.querySelector('.site-header');
const collapseStart = 0;    // ab 0px scrollen fängt das shrinking an
const collapseEnd = 120;    // bei 120px ist der Header komplett weg
let ticking = false;

function onScroll() {
  const scrollY = window.scrollY || window.pageYOffset;

  if (scrollY < collapseStart) {
    header.classList.remove('shrink');
    header.classList.remove('hide');
    header.style.height = '';
    header.style.opacity = '';
  } else if (scrollY >= collapseStart && scrollY < collapseEnd) {
    header.classList.add('shrink');
    header.classList.remove('hide');
    let percent = (scrollY - collapseStart) / (collapseEnd - collapseStart);
    percent = Math.min(1, Math.max(0, percent));
    // Animation: Höhe & Transparenz gleichzeitig, sehr schnell
    header.style.height = `${110 - (56 * percent)}px`;        // von 110px auf 54px
    header.style.opacity = `${1 - percent}`;                  // von 1 auf 0
  } else {
    header.classList.add('hide');
    header.style.height = '0px';
    header.style.opacity = '0';
  }
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(onScroll);
    ticking = true;
  }
});

window.addEventListener('pageshow', () => {
  header.classList.remove('shrink', 'hide');
  header.style.height = '';
  header.style.opacity = '';
});



