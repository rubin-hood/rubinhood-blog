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
// Smooth, dynamisch schrumpfender und ausblendender Header

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector('.site-header');
  const logoImg = header.querySelector('.logo img');

  // Werte ggf. anpassen:
  const maxHeaderHeight = 90; // px
  const minHeaderHeight = 38; // px
  const maxLogoHeight   = 90;
  const minLogoHeight   = 32;
  const scrollMax       = 180; // Wie viel px schrumpft? Danach nicht mehr
  const hideAfter       = 250; // Ab wann wird Header komplett ausgeblendet?

  let ticking = false;

  function handleHeaderShrink() {
    const scrollY = window.scrollY;
    const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
    const sY = clamp(scrollY, 0, scrollMax);

    // Lineares Interpolieren
    const headerHeight = maxHeaderHeight - ((sY / scrollMax) * (maxHeaderHeight - minHeaderHeight));
    const logoHeight   = maxLogoHeight - ((sY / scrollMax) * (maxLogoHeight - minLogoHeight));

    header.style.height = `${headerHeight}px`;
    header.style.minHeight = `${headerHeight}px`;
    logoImg.style.height = `${logoHeight}px`;

    // Optional: Header komplett ausblenden, wenn sehr weit gescrollt
    if (scrollY > hideAfter) {
      header.classList.add('header-hidden');
    } else {
      header.classList.remove('header-hidden');
    }

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(handleHeaderShrink);
      ticking = true;
    }
  });
});



