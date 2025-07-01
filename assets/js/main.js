console.log('Suche-Init geladen');


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


//////////////////
// Funktion für die Blog-Card
function renderCard(post) {
  return `
    <a class="blog-card" href="${post.url}">
      <div class="card-img">
        ${post.image ? `<img src="${post.image}" alt="${post.title}">` : `<div class="no-img">Bild</div>`}
      </div>
      <div class="card-content">
        <div class="card-title">${post.title}</div>
        <time class="card-date">${post.date}</time>
        <div class="card-desc">${post.excerpt}</div>
      </div>
    </a>
  `;
}

document.addEventListener('DOMContentLoaded', function() {
  console.log("JS geladen!"); // Kontrolle!
  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results');
  const blogList = document.getElementById('blog-list');
  let posts = [];

  fetch('/rubinhood-blog/assets/js/search.json')
    .then(response => response.json())
    .then(data => {
      posts = data;
      searchInput.addEventListener('input', function() {
        const query = this.value.trim().toLowerCase();

        if (!query || query.length < 2) {
          resultsContainer.innerHTML = '';
          blogList.style.display = '';
          return;
        }

        blogList.style.display = 'none';
        resultsContainer.innerHTML = `<div class="search-header">Suchergebnisse für "${searchInput.value}":</div>`;

        const filtered = posts.filter(post =>
          post.title.toLowerCase().includes(query) ||
          (post.excerpt && post.excerpt.toLowerCase().includes(query)) ||
          (post.content && post.content.toLowerCase().includes(query))
        );

        if (filtered.length === 0) {
          resultsContainer.innerHTML += '<div>Keine Treffer.</div>';
          return;
        }

        resultsContainer.innerHTML += `<div class="blog-grid blog-grid-single">` +
          filtered.map(post => renderCard(post)).join('') +
          `</div>`;
      });
    })
    .catch(err => {
      resultsContainer.innerHTML = '<div>Suche derzeit nicht verfügbar.</div>';
      console.error(err);
    });
});


