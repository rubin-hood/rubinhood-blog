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



// === Sticky Header Animation ===
let lastScrollY = window.scrollY;
let ticking = false;
let header = document.querySelector('.site-header');
let shrinkPoint = 60;
let hidePoint = 180;

function onScroll() {
  let currentY = window.scrollY;
  // Shrink header when scrolled down a bit
  if (currentY > shrinkPoint && currentY < hidePoint) {
    header.classList.add('shrunk');
    header.classList.remove('hidden');
  } else if (currentY >= hidePoint && currentY > lastScrollY) {
    // Hide header on further scroll down
    header.classList.add('hidden');
  } else {
    // Show full header when at top or scrolling up
    header.classList.remove('shrunk');
    header.classList.remove('hidden');
  }
  lastScrollY = currentY;
  ticking = false;
}
window.addEventListener('scroll', function() {
  if (!ticking) {
    window.requestAnimationFrame(onScroll);
    ticking = true;
  }
});

// === Mobile Burger Navigation ===
const burgerBtn = document.getElementById('burger-btn');
const mobileMenu = document.getElementById('mobile-menu');

burgerBtn.addEventListener('click', function() {
  burgerBtn.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  // Prevent scroll behind mobile menu
  if (mobileMenu.classList.contains('open')) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

// Klick auf Overlay (außerhalb Nav schließt Menü)
mobileMenu.addEventListener('click', function(e) {
  if (e.target === mobileMenu) {
    burgerBtn.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = "";
  }
});
