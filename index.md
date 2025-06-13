---
layout: default
title: Home
---

<div class="intro">
  <p>Der <span class="underline">digitale</span> Wald, in dem <span class="underline">Kreativität</span> und <span class="underline">Technologie aufeinandertreffen</span>.</p>
  <h2>Welcome to my website showcasing my passion for IT projects.</h2>
  <p>
    This website is hosted on a Raspberry Pi 5 running PHP to provide a modern and interactive experience.
    The complete source code is available in my <a href="https://github.com/">GitHub</a> repository.
  </p>
</div>

<div class="blog-teaser-grid">
  {% for post in site.posts limit:3 %}
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

