// Clipboard writes happen only after an explicit click; no contact analytics.
(() => {
  const button = document.querySelector('[data-copy-wechat]');
  if (!button) return;
  const success = document.querySelector('[data-copy-success]');
  const error = document.querySelector('[data-copy-error]');
  button.hidden = false;
  button.addEventListener('click', async () => {
    success.hidden = true;
    error.hidden = true;
    button.disabled = true;
    try {
      await navigator.clipboard.writeText('13782729373');
      success.hidden = false;
    } catch {
      error.hidden = false;
    } finally {
      button.disabled = false;
    }
  });
})();
