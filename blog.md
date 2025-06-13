---
layout: default
title: Blog
---

<h2>Blog</h2>
<div class="blog-grid">
  {% for post in site.posts %}
    <div class="blog-card">
      <div class="card-img">Bild</div>
      <div class="card-content">
        <div class="card-title">{{ post.title }}</div>
        <div class="card-desc">{{ post.excerpt }}</div>
      </div>
    </div>
  {% endfor %}
</div>
