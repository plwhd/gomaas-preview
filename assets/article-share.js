(() => {
  const button = document.querySelector('[data-article-share]');
  if (!button) return;
  const status = document.querySelector('[data-share-status]');
  const fallback = document.querySelector('[data-share-fallback]');
  const label = document.querySelector('[data-share-fallback-label]');
  const field = document.querySelector('[data-share-fallback-url]');
  const icon = button.querySelector('[data-share-icon]');
  const copiedIcon = button.querySelector('[data-share-copied-icon]');
  const url = button.dataset.shareUrl;
  let pending = false, copied = false, failed = false, timer;
  const english = () => document.documentElement.lang === 'en';
  function sync() {
    const text = copied ? (english() ? 'Link copied' : '链接已复制')
      : (english() ? 'Copy article link' : '复制文章链接');
    button.title = text;
    button.setAttribute('aria-label', text);
    icon.toggleAttribute('hidden', copied);
    copiedIcon.toggleAttribute('hidden', !copied);
    label.textContent = english() ? 'Copy the article address below:' : '复制下方文章地址：';
    field.setAttribute('aria-label', english() ? 'Article address' : '文章地址');
    status.textContent = failed
      ? (english() ? 'Could not copy. Copy the address below or use the address bar.' : '未能复制，请复制下方地址或使用浏览器地址栏。')
      : copied ? (english() ? 'Article link copied.' : '文章链接已复制。') : '';
    status.classList.toggle('is-quiet', !failed);
  }
  button.hidden = false;
  button.addEventListener('click', async () => {
    if (pending) return;
    pending = true; copied = false; failed = false;
    clearTimeout(timer);
    fallback.hidden = true;
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    sync();
    try {
      if (!navigator.clipboard?.writeText) throw Error('Clipboard unavailable');
      await navigator.clipboard.writeText(url);
      copied = true;
      sync();
      timer = setTimeout(() => { copied = false; sync(); }, 2400);
    } catch {
      failed = true;
      fallback.hidden = false;
      sync();
      field.focus();
      field.select();
    } finally {
      pending = false;
      button.disabled = false;
      button.removeAttribute('aria-busy');
    }
  });
  new MutationObserver(sync).observe(document.documentElement, {attributes:true, attributeFilter:['lang']});
  sync();
})();
