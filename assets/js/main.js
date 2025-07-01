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
// Progressive Sticky Header Animation
(function() {
  const header = document.querySelector('.site-header');
  const logoImg = header.querySelector('.logo img');
  
  // Anpassen: Wie weit soll der Header schrumpfen?
  const maxScroll = 200;    // Bis zu 200px scrollen
  const maxHeight = 110;     // Ursprungs-Höhe Header
  const minHeight = 0;      // Ziel-Höhe (komplett weg)
  const maxLogo = 100;       // Ursprungs-Höhe Logo
  const minLogo = 0;        // Ziel-Höhe Logo (verschwinden)
  const maxPadding = 2;     // Padding in rem
  const minPadding = 0;     // Ziel-Padding

  window.addEventListener('scroll', function() {
    let scroll = window.scrollY;
    if (scroll < 0) scroll = 0;
    if (scroll > maxScroll) scroll = maxScroll;

    const t = scroll / maxScroll; // 0 bis 1

    // Dynamische Werte berechnen
    const newHeight = maxHeight - (maxHeight - minHeight) * t;
    const newLogo = maxLogo - (maxLogo - minLogo) * t;
    const newPadding = maxPadding - (maxPadding - minPadding) * t;
    const newOpacity = 1 - t;

    // Variablen setzen
    header.style.setProperty('--header-height', `${newHeight}px`);
    header.style.setProperty('--header-padding', `${newPadding}rem`);
    header.style.setProperty('--header-opacity', newOpacity);

    logoImg.style.setProperty('--logo-height', `${newLogo}px`);
  });
})();










/////////////////////////
const sidebar = document.getElementById('sidebar');
const dragHandle = document.getElementById('sidebar-drag');
let isDragging = false;
let startX = 0;
let startSidebarX = 0;
let sidebarOpen = true; // Sidebar sichtbar

function setSidebarCollapsed(collapsed) {
  if (collapsed) {
    sidebar.classList.add('collapsed');
    sidebarOpen = false;
  } else {
    sidebar.classList.remove('collapsed');
    sidebarOpen = true;
  }
}

// Start Drag
function onDragStart(e) {
  isDragging = true;
  startX = e.touches ? e.touches[0].clientX : e.clientX;
  document.body.style.userSelect = "none";
}
function onDragMove(e) {
  if (!isDragging) return;
  let currentX = e.touches ? e.touches[0].clientX : e.clientX;
  let delta = currentX - startX;

  // Wenn nach links gezogen wird und ausreichend weit: einklappen
  if (sidebarOpen && delta < -40) {
    setSidebarCollapsed(true);
    isDragging = false;
  }
  // Wenn nach rechts gezogen wird und Sidebar zu ist: ausklappen
  if (!sidebarOpen && delta > 40) {
    setSidebarCollapsed(false);
    isDragging = false;
  }
}
function onDragEnd() {
  isDragging = false;
  document.body.style.userSelect = "";
}

// Events (Maus UND Touch)
dragHandle.addEventListener('mousedown', onDragStart);
dragHandle.addEventListener('touchstart', onDragStart, {passive:true});
window.addEventListener('mousemove', onDragMove);
window.addEventListener('touchmove', onDragMove, {passive:true});
window.addEventListener('mouseup', onDragEnd);
window.addEventListener('touchend', onDragEnd);

// Optional: Klick auf Drag-Handle öffnet wieder (wenn zu)
dragHandle.addEventListener('click', () => {
  if (!sidebarOpen) setSidebarCollapsed(false);
});
