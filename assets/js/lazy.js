
function setLazy() {
  document.querySelectorAll('img:not([loading])').forEach(img =>
    img.setAttribute('loading', 'lazy')
  );
}
setLazy();

const observer = new MutationObserver(setLazy);
observer.observe(document.body, { childList: true, subtree: true });