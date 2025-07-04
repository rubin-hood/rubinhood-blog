---
layout: default
title: Blog
---

<div id="searchbox-container">
  <input id="searchbox" type="text" placeholder="Suche im Blog...">
</div>
<div id="searchresults"></div>

<div class="blog-grid blog-grid-single">
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
</script>

<style>
#searchbox-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2em;
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
#searchresults {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

</style>
