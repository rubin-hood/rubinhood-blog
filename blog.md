---
layout: default
title: Blog
permalink: /blog/
---

<div class="blog-container">
  <h1>Blog</h1>
  <input type="text" id="search-input" placeholder="Suche im Blog ..." autocomplete="off" />
  <ul id="search-results" class="search-results"></ul>
  <div id="posts-grid" class="posts-grid"></div>
  <button id="load-more-btn" style="display:none;">Mehr laden</button>
</div>

<!-- Styles: Passe nach Wunsch an -->
<style>
.blog-container { max-width: 900px; margin: 0 auto; padding: 2rem; }
#search-input { width: 100%; padding: 0.5rem; margin-bottom: 1.5rem; font-size: 1.1rem; }
.posts-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 2rem; }
.blog-card { background: #fff; border-radius: 12px; box-shadow: 0 2px 16px rgba(0,0,0,0.07); padding: 1.2rem; transition: box-shadow 0.2s; }
.blog-card:hover { box-shadow: 0 6px 28px rgba(0,0,0,0.13);}
.blog-card img { width: 100%; border-radius: 8px; margin-bottom: 1rem; }
.blog-card-title { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;}
.blog-card-meta { color: #777; font-size: 0.92rem; margin-bottom: 0.8rem;}
.blog-card-excerpt { color: #333; font-size: 1rem;}
#load-more-btn { margin: 2rem auto; display: block; padding: 0.8rem 2rem; font-size: 1.1rem; border: none; border-radius: 8px; background: #2e72e6; color: white; cursor: pointer;}
#load-more-btn:hover { background: #1a4da3; }
.search-results { list-style: none; padding: 0; margin-bottom: 1.5rem;}
.search-results li { background: #f5f5f5; margin-bottom: 0.5rem; padding: 0.7rem 1rem; border-radius: 7px;}
.search-results a { color: #2e72e6; text-decoration: none; font-weight: 500;}
</style>

<script>
const POSTS_PER_PAGE = 4;
let allPosts = [];
let currentPage = 1;
let filteredPosts = null;

// Suche nach search.json im richtigen Pfad (dynamisch für GitHub Pages & lokal!)
async function fetchPosts() {
  try {
    const res = await fetch('{{ "/search.json" | relative_url }}');
    allPosts = await res.json();
    renderPosts();
    document.getElementById('load-more-btn').style.display = allPosts.length > POSTS_PER_PAGE ? 'block' : 'none';
  } catch (err) {
    document.getElementById('posts-grid').innerHTML = '<p>Fehler beim Laden der Blogposts.</p>';
  }
}

function renderPosts(reset = true) {
  const grid = document.getElementById('posts-grid');
  let postsToShow = (filteredPosts === null ? allPosts : filteredPosts).slice(0, currentPage * POSTS_PER_PAGE);
  if (reset) grid.innerHTML = '';
  postsToShow.forEach(post => {
    grid.innerHTML += createCard(post);
  });
  if ((filteredPosts === null ? allPosts : filteredPosts).length > postsToShow.length) {
    document.getElementById('load-more-btn').style.display = 'block';
  } else {
    document.getElementById('load-more-btn').style.display = 'none';
  }
}


function createCard(post) {
  return `
    <div class="blog-card">
      ${post.image ? `<img src="${post.image}" alt="Vorschaubild">` : ''}
      <div class="blog-card-title"><a href="${post.url}">${post.title}</a></div>
      <div class="blog-card-meta">${formatDate(post.date)}</div>
      <div class="blog-card-excerpt">${post.excerpt}</div>
    </div>
  `;
}

function formatDate(d) {
  // Datumsformat: yyyy-mm-dd oder ISO
  if (!d) return '';
  const date = new Date(d);
  return date.toLocaleDateString('de-DE', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Mehr laden Button
document.addEventListener('DOMContentLoaded', () => {
  fetchPosts();

  document.getElementById('load-more-btn').onclick = () => {
    currentPage++;
    renderPosts(false);
  };

  // Suche
  const searchInput = document.getElementById('search-input');
  searchInput.oninput = function() {
    const val = this.value.trim().toLowerCase();
    const list = document.getElementById('search-results');
    if (!val) {
      filteredPosts = null;
      renderPosts();
      list.innerHTML = '';
      return;
    }
    // Suche in Titel UND Inhalt/Excerpt
    const hits = allPosts.filter(post =>
      (post.title && post.title.toLowerCase().includes(val)) ||
      (post.content && post.content.toLowerCase().includes(val)) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(val))
    );
    filteredPosts = hits;
    // Treffer-Liste unter Suchfeld
    if (hits.length === 0) {
      list.innerHTML = '<li>Keine Treffer gefunden.</li>';
    } else {
      list.innerHTML = hits.slice(0, 8).map(p => `
        <li><a href="${p.url}">${p.title}</a> <span style="color:#aaa;">(${formatDate(p.date)})</span></li>
      `).join('');
    }
    // Im Grid alle Treffer anzeigen (Pagination off)
    renderPosts();
    document.getElementById('load-more-btn').style.display = 'none';
  };
});
</script>

