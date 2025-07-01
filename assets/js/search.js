searchResults.innerHTML = filtered.map(post => {
  let snippet = '';
  // Defensive fallback
  if (post.title && post.title.toLowerCase().includes(qLower)) {
    snippet = highlight(post.title, query);
    if (post.excerpt) {
      snippet += '<br>' + extractSnippet(post.excerpt, query, 2);
    }
  }
  else if (post.excerpt && post.excerpt.toLowerCase().includes(qLower)) {
    snippet = extractSnippet(post.excerpt, query, 3);
  }
  else if (post.content && post.content.toLowerCase().includes(qLower)) {
    snippet = extractSnippet(post.content, query, 3);
  }
  else {
    snippet = highlight(post.title || '', query);
  }

  let imageHtml = '';
  if (post.image) {
    imageHtml = `<div class="search-result-image"><img src="${post.image}" alt=""></div>`;
  } else {
    imageHtml = `<div class="search-result-image search-result-noimg">Kein Bild</div>`;
  }

  return `
    <div class="search-result-hit">
      <a href="${post.url}">
        ${imageHtml}
        <div class="search-result-text">
          <div class="hit-title">${post.title || ''}</div>
          <div class="hit-snippet">${snippet}</div>
        </div>
      </a>
    </div>
  `;
}).join('');
