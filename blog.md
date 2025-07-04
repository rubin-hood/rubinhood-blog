---
layout: default
title: Blog
---

<div id="searchbox-container">
  <input id="searchbox" type="text" placeholder="Suche im Blog...">
</div>
<div id="searchinfo"></div>
<div id="searchresults"></div>

<!-- Hier werden die Blog-Posts per AJAX eingefügt -->
<div id="all-posts" class="blog-grid blog-grid-single"></div>
<div id="loadmore" style="text-align:center;margin:2em 0;"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // === Variablen ===
    let posts = [];
    let currentIndex = 0;
    const postsPerPage = 4;

    const postsContainer = document.getElementById('all-posts');
    const loadmoreDiv = document.getElementById('loadmore');
    const searchbox = document.getElementById('searchbox');
    const searchresults = document.getElementById('searchresults');
    const searchinfo = document.getElementById('searchinfo');

    // === AJAX: search.json laden ===
    fetch('{{ "/search.json" | relative_url }}')
      .then(response => response.json())
      .then(function(json){
        posts = json;
        renderNextPosts(); // Initial: Zeige die ersten Posts
      });

    // === Rendering für Blog-Cards ===
    function renderNextPosts() {
        // Immer die nächsten postsPerPage Posts holen
        const nextPosts = posts.slice(currentIndex, currentIndex + postsPerPage);

        nextPosts.forEach(post => {
            // Card zusammenbauen (wie bisher)
            const card = document.createElement('a');
            card.className = 'blog-card';
            card.href = post.url;

            card.innerHTML = `
                <div class="card-img">
                  ${post.image ? `<img src="${post.image}" alt="${post.title}" loading="lazy">` : 'Bild'}
                </div>
                <div class="card-content">
                  <div class="card-title">${post.title}</div>
                  <time class="card-date" datetime="${post.date}">
                    ${formatDate(post.date)}
                  </time>
                  <div class="card-desc">${post.excerpt ? post.excerpt : (post.content ? post.content.substring(0,140)+'...' : '')}</div>
                </div>
            `;
            postsContainer.appendChild(card);
        });

        currentIndex += postsPerPage;

        // „Mehr laden“-Button ein-/ausblenden
        if (currentIndex < posts.length) {
            loadmoreDiv.innerHTML = `
                <button id="loadmore-btn" style="
                  background:#009C6C;
                  color:#fff;
                  font-size:1.2em;
                  border:none;
                  padding:0.7em 1.7em;
                  border-radius:1.5em;
                  cursor:pointer;
                  box-shadow:0 4px 12px rgba(0,0,0,0.07);
                  margin:0.5em 0 1.5em 0;
                  display:inline-flex;
                  align-items:center;
                  gap:0.5em;">
                  <span>Mehr laden</span>
                  <span style="font-size:1.3em;">&#x25BC;</span>
                </button>
            `;
            document.getElementById('loadmore-btn').onclick = renderNextPosts;
        } else {
            loadmoreDiv.innerHTML = '';
        }
    }

    // === Suchfunktion über AJAX-Posts ===
    searchbox.addEventListener('input', function(e) {
        let query = e.target.value.trim();
        let out = '';
        let info = '';
        if (query.length < 3) {
            searchresults.innerHTML = '';
            searchinfo.innerHTML = '';
            postsContainer.style.display = '';
            loadmoreDiv.style.display = '';
            // Nur die bisher geladenen Posts zeigen
            Array.from(postsContainer.children).forEach(el => el.style.display = '');
            return;
        }

        // Ergebnisse suchen (im Titel + Inhalt)
        let results = posts.filter(post =>
            (post.content && post.content.toLowerCase().includes(query.toLowerCase())) ||
            (post.title && post.title.toLowerCase().includes(query.toLowerCase()))
        );

        if (results.length) {
            info = `<div class="search-info">${results.length} Treffer gefunden</div>`;
            out = results.map(post => {
              // Datum formatieren
              let date = post.date ? formatDate(post.date) : '';
              // Suchwort hervorheben
              let re = new RegExp('('+query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')+')','gi');
              let title = post.title.replace(re, '<b style="color:#AA0600;font-weight:bold;">$1</b>');

              let snippet = post.content || '';
              let idx = snippet.toLowerCase().indexOf(query.toLowerCase());
              if (idx > -1) {
                snippet = snippet.substring(Math.max(0, idx-60), idx+80);
              } else {
                snippet = snippet.substring(0, 140);
              }
              let excerpt = snippet.replace(re, '<b style="color:#AA0600;font-weight:bold;">$1</b>');

              return `<div class="search-card">
                <a href="${post.url}" class="search-title">${title}</a>
                <div class="search-date">${date}</div>
                <div class="search-snippet">${excerpt}...</div>
              </div>`;
            }).join('');
        } else {
            info = `<div class="search-info notfound">Keine Treffer gefunden.</div>`;
            out = '';
        }

        postsContainer.style.display = 'none';
        loadmoreDiv.style.display = 'none';
        searchinfo.innerHTML = info;
        searchresults.innerHTML = out;
    });

    // === Hilfsfunktion: Datum im deutschen Format ===
    function formatDate(dateStr) {
      if (!dateStr) return '';
      const d = new Date(dateStr);
      return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
});
</script>
