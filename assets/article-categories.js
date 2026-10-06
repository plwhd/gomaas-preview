// Static article metadata drives filters; no network requests or content rewriting.
(() => {
  const group = document.querySelector('[data-article-categories]');
  if (!group) return;
  const buttons = [...group.querySelectorAll('[data-category]')];
  const items = [...document.querySelectorAll('[data-article-category]')];
  const status = document.querySelector('[data-category-status]');
  const valid = new Set(buttons.map(button => button.dataset.category));
  let current = 'all';
  const normalize = value => valid.has(value) ? value : 'all';
  function announce() {
    const english = document.documentElement.lang === 'en';
    group.setAttribute('aria-label', english ? 'Article categories' : '文章分类');
    const count = items.filter(item => !item.hidden).length;
    status.textContent = english ? count + ' entries shown' : '显示 ' + count + ' 项';
  }
  function apply(value) {
    current = normalize(value);
    for (const item of items) item.hidden = current !== 'all' && item.dataset.articleCategory !== current;
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.category === current));
    announce();
  }
  group.addEventListener('click', event => {
    const button = event.target.closest('[data-category]');
    if (!button || !group.contains(button)) return;
    const next = button.dataset.category === current ? 'all' : button.dataset.category;
    const url = new URL(location.href);
    if (next === 'all') url.searchParams.delete('category');
    else url.searchParams.set('category', next);
    // Filtering remains usable if this browser restricts history updates.
    try { if (url.href !== location.href) history.pushState(null, '', url); } catch { /* Optional URL state. */ }
    apply(next);
  });
  window.addEventListener('popstate', () => apply(new URL(location.href).searchParams.get('category')));
  new MutationObserver(announce).observe(document.documentElement, {attributes:true, attributeFilter:['lang']});
  apply(new URL(location.href).searchParams.get('category'));
  group.hidden = false;
})();
