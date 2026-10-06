// Per page load only. No dates, persistence, tracking or network calls.
(() => {
  const button = document.querySelector('.avatar-mask-frame');
  const mask = button?.querySelector('.avatar-mask');
  if (!button || !mask) return;
  const threshold = 16;
  let clicks = 0;
  button.disabled = false;
  button.addEventListener('click', () => {
    if (clicks >= threshold) return;
    clicks += 1;
    if (clicks === threshold) {
      mask.removeAttribute('hidden');
      button.setAttribute('aria-pressed', 'true');
    }
  });
})();
