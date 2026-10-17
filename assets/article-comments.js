'use strict';
(() => {
  const thread = document.querySelector('#disqus_thread[data-disqus-shortname]');
  if (!thread) return;
  const root = thread.closest('.article-comments');
  const retry = root.querySelector('[data-comments-retry]');
  const status = root.querySelector('[data-comments-status]');
  const shortname = thread.dataset.disqusShortname;
  const url = new URL(thread.dataset.pageUrl);
  if (shortname !== 'lipengfei' || url.origin !== 'https://lipengfei.top' || url.search !== '?discussion=public'
    || !/^\/[a-z0-9-]+\.html$/.test(url.pathname)
    || thread.dataset.pageIdentifier !== 'article:' + url.pathname) return;
  const english = () => document.documentElement.lang === 'en';
  let timer, script, loading = false, state = 'idle';
  function sync() {
    retry.textContent = loading ? (english() ? 'Loading…' : '正在加载…')
      : (english() ? 'Retry loading' : '重试加载');
    status.textContent = state === 'loading' ? (english() ? 'Loading comments…' : '正在加载评论…')
      : state === 'failed' ? (english() ? 'Comments could not load. Please retry. You can still read the article.'
        : '评论暂未加载完成，请重试。文章仍可正常阅读。') : '';
  }
  function ready() {
    clearTimeout(timer);
    loading = false;
    state = 'ready';
    root.setAttribute('aria-busy', 'false');
    retry.hidden = true;
    sync();
  }
  function failed() {
    clearTimeout(timer);
    loading = false;
    state = 'failed';
    root.setAttribute('aria-busy', 'false');
    retry.hidden = false;
    retry.disabled = false;
    sync();
  }
  function configuration() {
    this.page.url = url.href;
    this.page.identifier = thread.dataset.pageIdentifier;
    this.page.title = thread.dataset.pageTitle;
    this.language = english() ? 'en' : 'zh';
    this.callbacks = { onReady: [ready] };
  }
  function startLoading() {
    if (loading) return;
    loading = true;
    state = 'loading';
    retry.disabled = true;
    root.setAttribute('aria-busy', 'true');
    sync();
    timer = setTimeout(failed, 15000);
    try {
      if (window.DISQUS?.reset) {
        window.DISQUS.reset({ reload: true, config: configuration });
        return;
      }
      script?.remove();
      window.disqus_config = configuration;
      script = document.createElement('script');
      script.src = 'https://' + shortname + '.disqus.com/embed.js';
      script.async = true;
      script.onerror = failed;
      script.dataset.timestamp = String(Date.now());
      document.head.appendChild(script);
    } catch {
      failed();
    }
  }
  retry.addEventListener('click', startLoading);
  new MutationObserver(sync).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  startLoading();
})();
