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

  function extractSnippet(text, query, maxSentences = 3) {
    if (!text) return '';
    const sentences = text.split(/(?<=[.?!])\s+/);
    const idx = sentences.findIndex(s => s.toLowerCase().includes(query.toLowerCase()));
    if (idx === -1) {
      // Wenn kein Satz, dann einfach die ersten Sätze als Fallback
      return highlight(sentences.slice(0, maxSentences).join(' '), query);
    }
    // Hole bis zu maxSentences rund um den Treffer
    const start = Math.max(0, idx - 1);
    const end = Math.min(sentences.length, idx + maxSentences - 1);
    return highlight(sentences.slice(start, end).join(' '), query);
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
            // Zeige immer den Titel + die ersten 2 Sätze aus dem Excerpt
            snippet = highlight(post.title, query);
            if (post.excerpt) {
              snippet += '<br>' + extractSnippet(post.excerpt, query, 2);
            }
          }
          else if (post.excerpt && post.excerpt.toLowerCase().includes(qLower)) {
            snippet = extractSnippet(post.excerpt, query, 3);
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
