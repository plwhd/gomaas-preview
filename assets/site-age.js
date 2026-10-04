// Footer age: calendar days since the first public release, in Asia/Shanghai.
(() => {
  'use strict';
  const node = document.querySelector('[data-site-age]');
  if (!node) return;
  const start = Date.parse(`${node.dataset.establishedDate}T00:00:00+08:00`);
  if (!Number.isFinite(start)) return;
  const day = 86400000;
  const offset = 8 * 3600000;
  let timer;
  function update() {
    const days = Math.max(0, Math.floor((Date.now() + offset) / day) - Math.floor((start + offset) / day));
    node.textContent = document.documentElement.lang === 'en'
      ? `Established ${days} ${days === 1 ? 'day' : 'days'} ago`
      : `本站已建立 ${days} 天`;
    clearTimeout(timer);
    timer = setTimeout(update, day - ((Date.now() + offset) % day) + 250);
  }
  new MutationObserver(update).observe(document.documentElement, {attributes: true, attributeFilter: ['lang']});
  document.addEventListener('visibilitychange', () => { if (!document.hidden) update(); });
  window.addEventListener('pageshow', update);
  update();
})();
