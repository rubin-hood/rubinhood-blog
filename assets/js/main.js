// ================================
// Alles erst nach Laden der Seite!
document.addEventListener('DOMContentLoaded', function() {

  // ================================
  // 1. Burger-Menü: Öffnen & Schließen
  // ================================
  var burger = document.getElementById('burger-btn');
  var menu = document.getElementById('mobile-menu');

  if (burger && menu) {
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

  // ================================
  // 2. Lazy Animation für Blog-Cards
  // ================================
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      // Nur die sichtbaren Elemente animieren (Staffelung!)
      const visible = entries.filter(entry => entry.isIntersecting);
      visible.forEach((entry, i) => {
        setTimeout(() => {
          entry.target.classList.add('appear');
          observer.unobserve(entry.target); // Nur 1x animieren
        }, i * 100); // 100ms Staffelung
      });
    }, {
      threshold: 0,
      rootMargin: '0px'
    });

    document.querySelectorAll('.blog-card').forEach(card => {
      observer.observe(card);
    });
  } else {
    // Fallback für alte Browser: Sofort anzeigen
    document.querySelectorAll('.blog-card').forEach(card => {
      card.classList.add('appear');
    });
  }

  // ================================
  // 3. Progressive Sticky Header Animation
  // ================================
  (function() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const logoImg = header.querySelector('.logo img');
    if (!logoImg) return;

    // Parameter für das Animation-Intervall
    const maxScroll = 20;
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

      // Dynamische Werte berechnen und setzen
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
  // 4. Lazy-Loading für Bilder
  // ================================
  document.querySelectorAll('img:not([loading])').forEach(img => {
    img.setAttribute('loading', 'lazy');
  });

});



/////////Suchfunktion
document.addEventListener('DOMContentLoaded', function() {
    let posts = [];
    fetch('{{ "/search.json" | relative_url }}')
      .then(response => response.json())
      .then(function(json){
        posts = json;
      });

    document.getElementById('searchbox').addEventListener('input', function(e) {
      let query = e.target.value.trim().toLowerCase();
      let out = '';
      if (query.length < 3) {
        document.getElementById('searchresults').innerHTML = '';
        return;
      }

      // Suche im Inhalt und Titel
      let results = posts.filter(post =>
        post.content.toLowerCase().includes(query) ||
        post.title.toLowerCase().includes(query)
      );

      results.forEach(post => {
        // Fundstellen hervorheben
        let snippet = post.content;
        let idx = snippet.toLowerCase().indexOf(query);
        if (idx > -1) {
          snippet = snippet.substring(Math.max(0, idx-60), idx+80);
        } else {
          snippet = snippet.substring(0, 140);
        }
        // Query fett markieren
        let re = new RegExp('('+query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')+')','gi');
        let excerpt = snippet.replace(re, '<b>$1</b>');

        out += `<div style="margin-bottom:1.5em">
          <a href="${post.url}"><strong>${post.title}</strong></a><br>
          <span>${excerpt}...</span>
        </div>`;
      });

      document.getElementById('searchresults').innerHTML = out || "Keine Treffer gefunden.";
    });
});