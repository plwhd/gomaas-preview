(() => {
  const controls = document.querySelector('[data-article-export]');
  const article = document.querySelector('article[data-article-content]');
  if (!controls || !article) return;
  const copy = controls.querySelector('[data-copy-markdown]');
  const copyLabel = controls.querySelector('[data-copy-label]');
  const download = controls.querySelector('[data-download-markdown]');
  const downloadLabel = controls.querySelector('[data-download-label]');
  const status = controls.querySelector('[data-export-status]');
  const cache = new Map();
  let timer, revision = 0, pending = false;
  const uiEnglish = () => document.documentElement.lang === 'en';
  const exportedLanguage = () => article.lang === 'en' && controls.dataset.exportEn ? 'en' : 'zh';
  const urlFor = language => language === 'en' ? controls.dataset.exportEn : controls.dataset.exportZh;
  function sync() {
    revision++;
    clearTimeout(timer);
    copyLabel.textContent = pending
      ? (uiEnglish() ? 'Copying…' : '复制中…')
      : (uiEnglish() ? 'Copy Markdown' : '复制 Markdown');
    downloadLabel.textContent = uiEnglish() ? 'Download Markdown' : '下载 Markdown';
    download.title = uiEnglish() ? 'Download this article as a Markdown file (.md)' : '下载本文的 Markdown 文件（.md）';
    download.href = urlFor(exportedLanguage());
    download.download = (article.querySelector('h1')?.textContent.trim() || 'article')+'.md';
    controls.setAttribute('aria-label',uiEnglish() ? 'Export article' : '文章导出');
    status.classList.add('is-quiet');
    status.textContent = '';
  }
  async function markdown(language) {
    const url = urlFor(language);
    if (!cache.has(url)) {
      const response = await fetch(url);
      if (!response.ok) throw Error('Markdown unavailable');
      const text = await response.text();
      if (!text.startsWith('# ') || /<!doctype|<html/i.test(text)) throw Error('Invalid Markdown response');
      cache.set(url,text);
    }
    return cache.get(url);
  }
  copy.hidden = false;
  copy.addEventListener('click', async () => {
    if (pending) return;
    pending = true;
    clearTimeout(timer);
    status.textContent = '';
    status.classList.add('is-quiet');
    copy.setAttribute('aria-busy','true');
    const language = exportedLanguage(), started = revision;
    copy.disabled = true;
    copyLabel.textContent = uiEnglish() ? 'Copying…' : '复制中…';
    try {
      const text = markdown(language).then(value => {
        // A language switch during loading cancels the old export.
        if (started !== revision) throw Error('Article language changed');
        return value;
      });
      if (navigator.clipboard?.write && window.ClipboardItem) {
        // Start inside the click gesture to preserve transient clipboard activation.
        const data = text.then(value => new Blob([value],{type:'text/plain'}));
        data.catch(() => {}); // Permission denial may stop the browser consuming the promise.
        await navigator.clipboard.write([new ClipboardItem({'text/plain':data})]);
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(await text);
      } else {
        text.catch(() => {});
        throw Error('Clipboard unavailable');
      }
      if (started !== revision) return;
      copyLabel.textContent = uiEnglish() ? 'Copied' : '已复制';
      status.textContent = uiEnglish() ? 'Markdown copied.' : 'Markdown 已复制。';
      status.classList.add('is-quiet');
      timer = setTimeout(sync,2400);
    } catch {
      if (started !== revision) return;
      copyLabel.textContent = uiEnglish() ? 'Copy Markdown' : '复制 Markdown';
      status.textContent = uiEnglish() ? 'Could not copy. Try again or download Markdown.' : '未能复制，请重试或下载 Markdown。';
      status.classList.remove('is-quiet');
    } finally {
      pending = false;
      copy.disabled = false;
      copy.removeAttribute('aria-busy');
      if (started !== revision) sync();
    }
  });
  new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  new MutationObserver(sync).observe(article,{attributes:true,attributeFilter:['lang']});
  sync();
})();
