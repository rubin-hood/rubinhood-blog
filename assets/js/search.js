document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;

  const searchResults = document.getElementById('search-results');
  const allPosts = document.getElementById('all-posts');
  let posts = [];

  function highlight(text, search) {
    // Highlight alle Treffer, egal ob Groß- oder Kleinschreibung
    const re = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(re, '<mark>$1</mark>');
  }

  fetch('/rubinhood-blog/assets/js/search.json')
    .then(r => r.json())
    .then(data => {
      posts = data;
      searchInput.addEventListener('input', function () {
        const query = this.value.trim();
        if (query.length === 0) {
          searchResults.innerHTML = '';
          searchResults.style.display = 'none';
          allPosts.style.display = '';
          return;
        }

        allPosts.style.display = 'none';
        searchResults.style.display = '';

        const qLower = query.toLowerCase();

        const filtered = posts.filter(post =>
          post.title.toLowerCase().includes(qLower) ||
          (post.excerpt && post.excerpt.toLowerCase().includes(qLower))
        );

        if (filtered.length === 0) {
          searchResults.innerHTML = '<p>Keine Ergebnisse gefunden.</p>';
          return;
        }

        // Jedes Ergebnis als kompakte Textkarte, Suchbegriff hervorgehoben
        searchResults.innerHTML = filtered.map(post => {
          let snippet = '';
          // Falls im Titel
          if (post.title.toLowerCase().includes(qLower)) {
            snippet = highlight(post.title, query);
          }
          // Falls im Excerpt
          else if (post.excerpt && post.excerpt.toLowerCase().includes(qLower)) {
            // Zeige möglichst nur Satz mit Treffer, sonst Excerpt gesamt
            const sentences = post.excerpt.split(/(?<=[.?!])\s+/);
            const found = sentences.find(s => s.toLowerCase().includes(qLower));
            snippet = found ? highlight(found, query) : highlight(post.excerpt, query);
          } else {
            snippet = highlight(post.title, query);
          }

          return `
            <div class="search-result-hit">
              <a href="${post.url}">
                <div class="hit-title">${post.title}</div>
                <div class="hit-snippet">${snippet}</div>
              </a>
            </div>
          `;
        }).join('');
      });
    });
});
