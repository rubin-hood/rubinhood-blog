---
layout: default
title: Blog
---

<div id="searchbox-container">
  <input id="searchbox" type="text" placeholder="Suche im Blog...">
</div>
<div id="searchinfo"></div>
<div id="searchresults"></div>

<div id="all-posts" class="blog-grid blog-grid-single"></div>
<div id="loadmore" style="text-align:center;margin:2em 0;"></div>

<script>
  fetch('{{ "/search.json" | relative_url }}')

document.addEventListener('DOMContentLoaded', function() {
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
        renderNextPosts(); // Zeige initial die ersten Posts
      });

    // === Helper: Datum auf Deutsch ===
    function formatDate(dateStr) {
      if (!dateStr) return '';
      const d = new Date(dateStr);
      return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }

    // === Rendering Blogcards ===
    function renderNextPosts() {
        // Nur die nächsten noch nicht gezeigten Posts
        const nextPosts = posts.slice(currentIndex, currentIndex + postsPerPage);
        nextPosts.forEach(post => {
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

        // Button anzeigen oder ausblenden
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

    // === Suchfunktion ===
    searchbox.addEventListener('input', function(e) {
        let query = e.target.value.trim();
        let out = '';
        let info = '';
        if (query.length < 3) {
            searchresults.innerHTML = '';
            searchinfo.innerHTML = '';
            postsContainer.style.display = '';
            loadmoreDiv.style.display = '';
            // Zeige alle bis jetzt geladenen Cards wieder an:
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
              let date = post.date ? formatDate(post.date) : '';
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
});
</script>



<style>
/* Container für das Suchfeld, sorgt für Zentrierung */
#searchbox-container {
  display: flex;                   /* Flexbox für einfaches Zentrieren */
  flex-direction: column;          /* Untereinander anordnen */
  align-items: center;             /* Horizontal zentrieren */
  margin-top: 0.3em;               /* Abstand nach oben */
  margin-bottom: 1em;              /* Abstand nach unten */
}

/* Suchfeld-Design */
#searchbox {
  width: 320px;                    /* Feste Breite */
  max-width: 90vw;                 /* Max. 90% der Viewport-Breite */
  padding: 0.5em;                  /* Innenabstand */
  font-size: 1.1em;                /* Schriftgröße */
  margin-bottom: 0.2em;            /* Minimaler Abstand zu Treffer-Anzeige */
  border: 2px solid #009C6C;       /* Grüner Rahmen */
  border-radius: 8px;              /* Abgerundete Ecken */
  outline: none;                   /* Kein extra Rahmen beim Fokus */
  background: #FCFBF7;             /* Heller Hintergrund */
  transition: border-color 0.2s;   /* Sanfter Übergang der Rahmenfarbe */
}

/* Rahmenfarbe des Suchfelds bei Fokus */
#searchbox:focus {
  border-color: #AA0600;           /* Rot beim Fokussieren */
}

/* Wrapper für Treffer-Anzeige ("x Treffer gefunden") */
#searchinfo {
  display: flex;                   /* Flex für Zentrierung */
  flex-direction: column;
  align-items: center;
  min-height: 2em;                 /* Mindesthöhe (Abstand nach unten) */
  margin-bottom: 0.3em;            /* Minimaler Abstand zu Ergebnissen */
}

/* Stil für Treffer-Anzeige */
.search-info {
  color: #009C6C;                  /* Grün */
  font-size: 1em;                  /* Größe der Treffer-Anzeige */
  text-align: center;              /* Zentriert */
  margin-bottom: 1.2em;            /* Abstand zu den Suchergebnissen */
}

/* Stil für "Keine Treffer gefunden" */
.search-info.notfound {
  color:rgb(92, 92, 92);                  /* Rot */
}

/* Wrapper für Suchergebnisse (max. Breite & Zentrierung) */
#searchresults {
  max-width: 600px;                /* Maximale Breite */
  margin-left: auto;               /* Zentriert */
  margin-right: auto;
}

/* Einzelne Ergebnis-Box */
.search-card {
  margin-bottom: 2em;              /* Abstand zwischen den Ergebnissen */
}

/* Titel des Suchergebnisses */
.search-title {
  display: block;                  /* Block-Element für Abstand */
  font-size: 1.2em;                /* Schriftgröße */
  font-weight: bold;               /* Fett */
  color: #009C6C;                  /* Grün */
  text-decoration: none;           /* Keine Unterstreichung */
  margin-bottom: 0.2em;            /* Abstand zum Datum */
  margin-top: 0.3em;               /* Abstand zum vorherigen Element */
}

/* Veröffentlichungsdatum */
.search-date {
  font-size: 1em;                  /* Normale Schriftgröße */
  color: #8a8a8a;                  /* Hellgrau */
  margin-bottom: 0.2em;            /* Abstand zum Textauszug */
  margin-top: 0.2em;
}

/* Auszug/Textvorschau */
.search-snippet {
  font-size: 1.04em;               /* Etwas größere Schrift */
  color: #222;                     /* Fast Schwarz */
}
</style>

