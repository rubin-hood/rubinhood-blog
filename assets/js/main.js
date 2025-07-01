// ================================
// 1. Initialisierung nach Laden der Seite (Burger-Menü)
// ================================
document.addEventListener('DOMContentLoaded', function() {
  var burger = document.getElementById('burger-btn');
  var menu = document.getElementById('mobile-menu');
  if (burger && menu) { // <-- Schutz!
    burger.addEventListener('click', function() {
      menu.classList.toggle('open');
      burger.classList.toggle('open');
      document.body.classList.toggle('noscroll');
    });
    window.addEventListener('resize', function() {
      if (window.innerWidth > 900) {
        menu.classList.remove('open');
        burger.classList.remove('open');
        document.body.classList.remove('noscroll');
      }
    });
  }
});

// ================================
// 2. Intersection Observer für Animation der Blog-Kacheln
// ================================
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, observer) => {
    const visible = entries.filter(entry => entry.isIntersecting);
    visible.forEach((entry, i) => {
      setTimeout(() => {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }, i * 100);
    });
  }, {
    threshold: 0,
    rootMargin: '0px'
  });
  document.querySelectorAll('.blog-card').forEach(card => {
    observer.observe(card);
  });
}

// ================================
// 3. Sticky Header Animation
// ================================
(function() {
  const header = document.querySelector('.site-header');
  if (!header) return; // <-- Schutz!
  const logoImg = header.querySelector('.logo img');
  // Nur wenn ein Logo vorhanden ist
  if (!logoImg) return;
  const maxScroll = 200;
  const maxHeight = 110;
  const minHeight = 0;
  const maxLogo = 100;
  const minLogo = 0;
  const maxPadding = 2;
  const minPadding = 0;

  window.addEventListener('scroll', function() {
    let scroll = window.scrollY;
    if (scroll < 0) scroll = 0;
    if (scroll > maxScroll) scroll = maxScroll;
    const t = scroll / maxScroll;
    const newHeight = maxHeight - (maxHeight - minHeight) * t;
    const newLogo = maxLogo - (maxLogo - minLogo) * t;
    const newPadding = maxPadding - (maxPadding - minPadding) * t;
    const newOpacity = 1 - t;
    header.style.setProperty('--header-height', `${newHeight}px`);
    header.style.setProperty('--header-padding', `${newPadding}rem`);
    header.style.setProperty('--header-opacity', newOpacity);
    logoImg.style.setProperty('--logo-height', `${newLogo}px`);
  });
})();

// ================================
// 4. Blog-Suche (Nur aktiv, wenn Suchfeld existiert)
// ================================
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const allPosts = document.getElementById('all-posts');
  if (!searchInput || !searchResults || !allPosts) return; // Schutz!

  let posts = [];
  // Lade die Daten und setze erst dann den EventListener!
  fetch('/rubinhood-blog/assets/js/search.json')
    .then(r => r.json())
    .then(data => {
      posts = data;
      searchInput.addEventListener('input', function() {
        const query = this.value.trim().toLowerCase();
        if (query.length === 0) {
          searchResults.innerHTML = '';
          allPosts.style.display = '';
          return;
        }
        allPosts.style.display = 'none';

        // Filtere die Treffer
        const filtered = posts.filter(post =>
          post.title.toLowerCase().includes(query) ||
          (post.excerpt && post.excerpt.toLowerCase().includes(query))
        );

        if (filtered.length === 0) {
          searchResults.innerHTML = '<p>Keine Ergebnisse gefunden.</p>';
          return;
        }

        searchResults.innerHTML = filtered.map(post => `
          <a class="blog-card" href="${post.url}">
            <div class="card-img">
              ${post.image ? `<img src="${post.image}" alt="${post.title}">` : 'Bild'}
            </div>
            <div class="card-content">
              <div class="card-title">${post.title}</div>
              <time class="card-date">${post.date}</time>
              <div class="card-desc">${post.excerpt}</div>
            </div>
          </a>
        `).join('');
      });
    })
    .catch(error => {
      console.error("Konnte search.json nicht laden!", error);
    });
});
