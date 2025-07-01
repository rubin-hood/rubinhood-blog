document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;

  const searchResults = document.getElementById('search-results');
  const allPosts = document.getElementById('all-posts');
  let posts = [];

  function highlight(text, search) {
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

        searchResults.innerHTML = filtered.map(post => {
          let snippet = '';
          if (post.title.toLowerCase().includes(qLower)) {
            snippet = highlight(post.title, query);
          }
          else if (post.excerpt && post.excerpt.toLowerCase().includes(qLower)) {
            const sentences = post.excerpt.split(/(?<=[.?!])\s+/);
            const found = sentences.find(s => s.toLowerCase().includes(qLower));
            snippet = found ? highlight(found, query) : highlight(post.excerpt, query);
          } else {
            snippet = highlight(post.title, query);
          }

          // Bild links
          let imageHtml = '';
          if (post.image) {
            imageHtml = `<div class="search-result-image"><img src="${post.image}" alt=""></div>`;
          } else {
            imageHtml = `<div class="search-result-image search-result-noimg">Kein Bild</div>`;
          }

          return `
            <div class="search-result-hit">
              <a href="${post.url}">
                ${imageHtml}
                <div class="search-result-text">
                  <div class="hit-title">${post.title}</div>
                  <div class="hit-snippet">${snippet}</div>
                </div>
              </a>
            </div>
          `;
        }).join('');
      });
    });
});
