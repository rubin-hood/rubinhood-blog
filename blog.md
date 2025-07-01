---
layout: default
title: Blog
---

<!-- Suchmaske oben einfügen -->
<form id="site-search" action="#" autocomplete="off">
  <input id="search-input" type="search" placeholder="Suchen …" aria-label="Suche">
  <div id="search-results"></div>
</form>

<!-- Optional: Ergebnisse hier ausgeben -->
<div id="search-results"></div>

<div class="blog-grid blog-grid-single">
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


