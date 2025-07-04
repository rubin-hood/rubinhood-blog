---
layout: default
title: Blog
---

<div id="searchbox-container">
  <input id="searchbox" type="text" placeholder="Suche im Blog...">
</div>
<div id="searchinfo"></div>
<div id="searchresults"></div>

<!-- Standard-Post-Liste für den ersten Besuch -->
<div id="all-posts" class="blog-grid blog-grid-single">
  {% for post in site.posts %}
    <a class="blog-card" href="{{ post.url | relative_url }}">
      <div class="card-img">
        {% if post.image %}
          <img src="{{ post.image }}" alt="{{ post.title }}" loading="lazy">
        {% else %}
          Bild
        {% endif %}
      </div>
      <div class="card-content">
        <div class="card-title">{{ post.title }}</div>
        <time class="card-date" datetime="{{ post.date | date_to_xmlschema }}">
          {{ post.date | date: "%d.%m.%Y" }}
        </time>
        <div class="card-desc">{{ post.excerpt | strip_html | truncate: 140 }}</div>
      </div>
    </a>
  {% endfor %}
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    let posts = [];
    fetch('{{ "/search.json" | relative_url }}')
      .then(response => response.json())
      .then(function(json){
        posts = json;
      });

    const searchbox = document.getElementById('searchbox');
    const searchresults = document.getElementById('searchresults');
    const searchinfo = document.getElementById('searchinfo');
    const allposts = document.getElementById('all-posts');

    searchbox.addEventListener('input', function(e) {
      let query = e.target.value.trim().toLowerCase();
      let out = '';
      let info = '';
      if (query.length < 3) {
        searchresults.innerHTML = '';
        searchinfo.innerHTML = '';
        allposts.style.display = '';
        return;
      }

      // Suche im Inhalt und Titel
      let results = posts.filter(post =>
        post.content.toLowerCase().includes(query) ||
        post.title.toLowerCase().includes(query)
      );

      if (results.length) {
        info = `<div class="search-info">${results.length} Treffer gefunden</div>`;
        out = results.map(post => {
          // Datum lesbar machen (ISO -> TT.MM.JJJJ)
          let date = '';
          if (post.date) {
            const d = new Date(post.date);
            date = d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
          }
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

          return `<div style="margin-bottom:1.5em">
            <a href="${post.url}"><strong>${post.title}</strong></a>
            <span class="search-date">${date ? ' &middot; ' + date : ''}</span><br>
            <span>${excerpt}...</span>
          </div>`;
        }).join('');
      } else {
        info = `<div class="search-info notfound">Keine Treffer gefunden.</div>`;
        out = '';
      }

      allposts.style.display = 'none';
      searchinfo.innerHTML = info;
      searchresults.innerHTML = out;
    });
});
</script>

<style>
#searchbox-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2em;       /* Abstand zum Menü */
  margin-bottom: 1.5em;  /* Abstand zur Trefferzahl */
}
#searchbox {
  width: 320px;
  max-width: 90vw;
  padding: 0.5em;
  font-size: 1.1em;
  margin-bottom: 1.5em;
  border: 2px solid #009C6C;
  border-radius: 8px;
  outline: none;
  background: #FCFBF7;
  transition: border-color 0.2s;
}
#searchbox:focus {
  border-color: #AA0600;
}
#searchinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 2.3em;
  margin-bottom: 1.3em;
}
.search-info {
  color: #009C6C;
  font-size: 2.3em;
  text-align: center;
}
.search-info.notfound {
  color: #AA0600;
}
#searchresults {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
.search-date {
  color: #999;
  font-size: 0.97em;
}
</style>
