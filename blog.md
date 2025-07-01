---
layout: default
title: Blog
---

<input type="text" id="search-input" placeholder="Suche im Blog..." autocomplete="off" style="margin-bottom:2em; width:100%;padding:0.6em; font-size:1.1em;" />

<!-- Ergebnisse der Suche (Grid bleibt erhalten) -->
<div id="search-results" class="blog-grid blog-grid-single" style="display:none;"></div>

<!-- Alle Beiträge (Grid bleibt erhalten) -->
<div id="all-posts" class="blog-grid blog-grid-single">
  {% for post in site.posts %}
    <a class="blog-card" href="{{ post.url | relative_url }}">
      <div class="card-img">
        {% if post.image %}
          <img src="{{ post.image }}" alt="{{ post.title }}">
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

<!-- Suche-Logik: search.js am besten nur auf dieser Seite laden -->
<script src="{{ '/assets/js/search.js' | relative_url }}"></script>



