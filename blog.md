---
layout: default
title: Blog
---

<h2>Blog</h2>
<div class="blog-grid">
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
    <div class="card-desc">{{ post.excerpt | strip_html | truncate: 140 }}</div>
  </div>
</a>
  {% endfor %}
</div>

