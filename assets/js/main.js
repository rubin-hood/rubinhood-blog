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





//Suchfunktion
document.addEventListener('DOMContentLoaded', function () {
  var searchInput = document.getElementById('search-input');
  var searchResults = document.getElementById('search-results');
  var idx, posts = [];

  fetch('/rubinhood-blog/search.json')
    .then(response => response.json())
    .then(data => {
      posts = data;
      idx = lunr(function () {
        this.ref('url');
        this.field('title', { boost: 10 });
        this.field('content');
        posts.forEach(function (doc) {
          this.add(doc);
        }, this);
      });
    });

  searchInput.addEventListener('input', function () {
    var query = this.value.trim();
    searchResults.innerHTML = '';
    if (query.length < 2) return;

    var results = idx.search(query + '*');
    if (results.length === 0) {
      searchResults.innerHTML = '<p>Keine Treffer gefunden.</p>';
      return;
    }

    var html = '<ul class="search-result-list">';
    results.forEach(function (result) {
      var post = posts.find(p => p.url === result.ref);
      html += `<li><a href="${post.url}">${post.title}</a><br>
      <span class="search-date">${post.date}</span><br>
      <span class="search-excerpt">${post.excerpt}</span></li>`;
    });
    html += '</ul>';
    searchResults.innerHTML = html;
  });
});


