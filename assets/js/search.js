console.log("search.js geladen!");
alert("search.js geladen!");


document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const allPosts = document.getElementById('all-posts');
  if (!searchInput || !searchResults || !allPosts) return;

  let posts = [];

  fetch('/rubinhood-blog/assets/js/search.json')
    .then(r => r.json())
    .then(data => {
      posts = data;
      console.log("Posts geladen:", posts.length);

      searchInput.addEventListener('input', function() {
        const query = this.value.trim().toLowerCase();
        console.log("Suchbegriff:", query);

        if (query.length === 0) {
          searchResults.innerHTML = '';
          allPosts.style.display = '';
          return;
        }
        allPosts.style.display = 'none';

        // Filtere die Treffer
        const filtered = posts.filter(post => {
          console.log("Check:", post.title, post.excerpt); // Zeigt alle Titel und Excerpts an
          return (
            post.title && post.title.toLowerCase().includes(query)
          ) || (
            post.excerpt && post.excerpt.toLowerCase().includes(query)
          );
        });

        console.log("Gefundene Treffer:", filtered.length, filtered);

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
      searchResults.innerHTML = '<p>Fehler beim Laden der Suchdaten.</p>';
    });
});
