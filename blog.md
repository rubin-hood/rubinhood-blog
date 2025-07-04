---
layout: default
title: Blog
---

<div class="blog-grid blog-grid-single">
  {% for post in site.posts %}
    <a class="blog-card" href="{{ post.url | relative_url }}">
      <div class="card-img">
        {% capture postslug %}
          {{ post.path | split: '/' | last | split: '.' | first | strip }}
        {% endcapture %}
        {% assign bildbasis = "/assets/img/posts/" | append: postslug %}
        {% assign extlist = "webp,jpg,png,svg" | split: "," %}
        {% assign bildpfad = "" %}
        {% for ext in extlist %}
          {% assign candidate = bildbasis | append: "." | append: ext %}
          {% if bildpfad == "" %}
            {% assign bildpfad = candidate %}
          {% endif %}
        {% endfor %}
        <img src="{{ bildpfad }}" alt="{{ post.title }}" loading="lazy" onerror="this.style.display='none';">
        <noscript>
          <img src="{{ bildpfad }}" alt="{{ post.title }}">
        </noscript>
        <!-- Optionaler Fallback-Text: -->
        <span style="display:none;">Kein Bild</span>
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
