---
layout: default
title: Blog
---

<div id="searchbox-container">
  <input id="searchbox" type="text" placeholder="Suche im Blog...">
</div>
<div id="searchinfo"></div>
<div id="searchresults"></div>

<!-- Standard-Post-Liste für den ersten Besuch mit Pagination -->
<div id="all-posts" class="blog-grid blog-grid-single">
  {% for post in paginator.posts %}
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

<!-- Pagination Buttons -->
{% if paginator.total_pages > 1 %}
<div class="pagination">
  {% for page in (1..paginator.total_pages) %}
    {% if page == paginator.page %}
      <span class="page-number active">{{ page }}</span>
    {% else %}
      <a class="page-number" href="{{ paginator.paginate_path | replace: ':num', page }}">{{ page }}</a>
    {% endif %}
  {% endfor %}
</div>
{% endif %}

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
    const pagination = document.querySelector('.pagination');

    searchbox.addEventListener('input', function(e) {
      let query = e.target.value.trim();
      let out = '';
      let info = '';
      if (query.length < 3) {
        searchresults.innerHTML = '';
        searchinfo.innerHTML = '';
        allposts.style.display = '';
        if (pagination) pagination.style.display = '';
        return;
      }

      // Suche im Inhalt und Titel (ohne Berücksichtigung von Groß-/Kleinschreibung)
      let results = posts.filter(post =>
        post.content.toLowerCase().includes(query.toLowerCase()) ||
        post.title.toLowerCase().includes(query.toLowerCase())
      );

      if (results.length) {
        info = `<div class="search-info">${results.length} Treffer gefunden</div>`;
        out = results.map(post => {
          // Datum im deutschen Format, wenn vorhanden
          let date = '';
          if (post.date) {
            const d = new Date(post.date);
            date = d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
          }
          // Fundstellen hervorheben (fett + rot)
          let re = new RegExp('('+query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')+')','gi');
          let title = post.title.replace(re, '<b style="color:#AA0600;font-weight:bold;">$1</b>');

          let snippet = post.content;
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

      allposts.style.display = 'none';
      if (pagination) pagination.style.display = 'none';
      searchinfo.innerHTML = info;
      searchresults.innerHTML = out;
    });
});
</script>

<style>
/* Container für das Suchfeld */
#searchbox-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.3em;
  margin-bottom: 1em;
}
/* Suchfeld-Design */
#searchbox {
  width: 320px;
  max-width: 90vw;
  padding: 0.5em;
  font-size: 1.1em;
  margin-bottom: 0.2em;
  border: 2px solid #009C6C;
  border-radius: 8px;
  outline: none;
  background: #FCFBF7;
  transition: border-color 0.2s;
}
#searchbox:focus {
  border-color: #AA0600;
}
/* Wrapper für Treffer-Anzeige ("x Treffer gefunden") */
#searchinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 2em;
  margin-bottom: 0.3em;
}
/* Stil für Treffer-Anzeige */
.search-info {
  color: #009C6C;
  font-size: 1em;
  text-align: center;
  margin-bottom: 1.2em;
}
/* Stil für "Keine Treffer gefunden" */
.search-info.notfound {
  color: #AA0600;
}
/* Wrapper für Suchergebnisse */
#searchresults {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
.search-card {
  margin-bottom: 2em;
}
.search-title {
  display: block;
  font-size: 1.2em;
  font-weight: bold;
  color: #009C6C;
  text-decoration: none;
  margin-bottom: 0.2em;
  margin-top: 0.3em;
}
.search-date {
  font-size: 1em;
  color: #8a8a8a;
  margin-bottom: 0.2em;
  margin-top: 0.2em;
}
.search-snippet {
  font-size: 1.04em;
  color: #222;
}
/* Pagination-Stil */
.pagination {
  text-align: center;
  margin: 2em 0 1em 0;
}
.page-number {
  display: inline-block;
  margin: 0 0.3em;
  padding: 0.3em 0.7em;
  font-size: 1.3em;
  color: #009C6C;
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s;
}
.page-number.active, .page-number:hover {
  color: #AA0600;
  font-weight: bold;
  background: #e4e2dd;
}
</style>
