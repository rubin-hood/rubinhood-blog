---
layout: default
title: Blog
---

<div id="searchbox-container">
  <input id="searchbox" type="text" placeholder="Suche im Blog...">
  <div id="searchinfo" style="margin-top:0.5em; color:#009C6C; font-size:1em;"></div>
</div>
<div id="searchresults"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    let posts = [];
    fetch('{{ "/search.json" | relative_url }}')
      .then(response => response.json())
      .then(function(json){
        posts = json;
      });

    const searchbox = document.getElementById('searchbox');
    const searchinfo = document.getElementById('searchinfo');
    const searchresults = document.getElementById('searchresults');

    searchbox.addEventListener('input', function(e) {
      let query = e.target.value.trim().toLowerCase();
      let out = '';
      if (query.length < 3) {
        searchresults.innerHTML = '';
        searchinfo.textContent = '';
        return;
      }

      // Suche im Inhalt und Titel
      let results = posts.filter(post =>
        post.content.toLowerCase().includes(query) ||
        post.title.toLowerCase().includes(query)
      );

      if (results.length > 0) {
        searchinfo.textContent = results.length + ' Treffer gefunden';
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

          // Datum parsen (falls im JSON vorhanden)
          let dateStr = '';
          if (post.date) {
            // ISO oder Jekyll Format
            let d = new Date(post.date);
            if (!isNaN(d)) {
              dateStr = d.toLocaleDateString('de-DE');
            }
          }

          out += `<div style="margin-bottom:1.5em">
            <a href="${post.url}"><strong>${post.title}</strong></a><br>
            <span style="color:#888;font-size:0.95em">${dateStr ? dateStr + ' – ' : ''}</span>
            <span>${excerpt}...</span>
          </div>`;
        });
      } else {
        searchinfo.textContent = '';
        out = '<span style="color:#AA0600;">Keine Treffer gefunden.</span>';
      }

      searchresults.innerHTML = out;
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
