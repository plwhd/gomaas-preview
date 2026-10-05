(() => {
  'use strict';
  const root = document.querySelector('[data-site-greeting]');
  if (!root) return;
  const button = root.querySelector('button');
  const status = root.querySelector('[role="status"]');
  const note = root.querySelector('[data-greeting-note]');
  const key = 'pengfei-site-greeting-daily-v1';
  const limit = 16;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const today = () => {
    const date = new Date();
    return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
  };
  let day = today();
  let value = 0;
  let effect = null;
  let sequence = 0;
  let announceTimer;
  let noteTimer;
  let rolloverTimer;
  const isEnglish = () => document.documentElement.lang.startsWith('en');
  const read = () => {
    try {
      const record = JSON.parse(localStorage.getItem(key));
      return record && record.date === today() && Number.isSafeInteger(record.count) && record.count >= 0
        ? Math.min(record.count, limit) : 0;
    } catch (_) { return day === today() ? value : 0; }
  };
  const paint = () => {
    const full = value >= limit;
    button.disabled = full;
    const label = full
      ? (isEnglish() ? "Today's 16 greetings are used. Come back tomorrow." : '\u4eca\u65e5\u5df2\u6253\u8fc7 16 \u6b21\u62db\u547c\uff0c\u660e\u5929\u53ef\u4ee5\u7ee7\u7eed')
      : (isEnglish() ? 'Say hello to this website' : '\u5411\u7f51\u7ad9\u6253\u4e2a\u62db\u547c');
    button.setAttribute('aria-label', label);
    if (full) button.title = label;
    else button.removeAttribute('title');
  };
  const sync = () => {
    const date = today();
    if (day !== date) { day = date; value = 0; }
    value = read();
    paint();
  };
  const scheduleRollover = () => {
    clearTimeout(rolloverTimer);
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 50);
    rolloverTimer = setTimeout(() => { sync(); scheduleRollover(); }, Math.max(50, midnight.getTime() - Date.now()));
  };
  sync();
  scheduleRollover();
  button.addEventListener('click', () => {
    if (day !== today()) sync();
    value = Math.max(value, read());
    if (value >= limit) { paint(); return; }
    value += 1;
    try { localStorage.setItem(key, JSON.stringify({ date: day, count: value })); }
    catch (_) {
      note.textContent = isEnglish() ? 'This click is kept on this page only.' : '\u672c\u6b21\u70b9\u51fb\u4ec5\u5728\u5f53\u524d\u9875\u9762\u4fdd\u7559';
      note.hidden = false;
      clearTimeout(noteTimer);
      noteTimer = setTimeout(() => { note.hidden = true; }, 2600);
    }
    paint();
    // Feedback is immediate; this interaction makes no network or analytics requests.
    if (effect) effect.cancel();
    if (!reduced.matches && button.animate) {
      effect = button.animate([
        { transform: 'scale(1) rotate(0deg)' },
        { transform: 'scale(.92) rotate(-6deg)', offset: .22 },
        { transform: 'scale(1.055) rotate(3deg)', offset: .58 },
        { transform: 'scale(1) rotate(0deg)' }
      ], { duration: 320, easing: 'ease-out' });
    }
    const burst = document.createElement('span');
    burst.className = 'site-greeting-burst';
    burst.textContent = '+1';
    burst.setAttribute('aria-hidden', 'true');
    burst.style.setProperty('--drift', `${[0, -9, 9, -4, 4][sequence++ % 5]}px`);
    root.append(burst);
    // Keep the effects bounded even during very rapid clicks.
    const bursts = root.querySelectorAll('.site-greeting-burst');
    if (bursts.length > 5) bursts[0].remove();
    setTimeout(() => burst.remove(), reduced.matches ? 350 : 700);
    clearTimeout(announceTimer);
    announceTimer = setTimeout(() => {
      status.textContent = value >= limit
        ? button.getAttribute('aria-label')
        : (isEnglish() ? 'Greeting sent.' : '\u5df2\u5411\u7f51\u7ad9\u6253\u8fc7\u62db\u547c');
    }, 350);
  });
  window.addEventListener('storage', event => {
    if (event.key === key || event.key === null) sync();
  });
  window.addEventListener('pageshow', () => { sync(); scheduleRollover(); });
  window.addEventListener('focus', () => { sync(); scheduleRollover(); });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) { sync(); scheduleRollover(); }
  });
  new MutationObserver(paint).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();
