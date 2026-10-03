(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const controls = document.querySelector('.slide-controls');
  if (!slides.length || !controls) return;
  const prev = controls.querySelector('[data-prev]');
  const next = controls.querySelector('[data-next]');
  const themeButton = controls.querySelector('[data-theme]');
  const count = controls.querySelector('[data-current]');
  const timerButton = controls.querySelector('[data-timer-toggle]');
  const remaining = controls.querySelector('[data-remaining]');
  const timerParts = [...controls.querySelectorAll('[data-timer-part]')];
  const progress = document.querySelector('.slide-timer-progress');
  const fill = progress.querySelector('[data-timer-fill]');
  let durationMs = 0;
  let elapsedMs = 0;
  let startedAt = null;
  let timerInterval = null;
  let current = -1;
  function stopTicking() {
    if (timerInterval !== null) clearInterval(timerInterval);
    timerInterval = null;
  }
  function timerElapsed() {
    return Math.min(durationMs, elapsedMs + (startedAt === null ? 0 : performance.now() - startedAt));
  }
  function drawTimer() {
    const elapsed = timerElapsed();
    const seconds = Math.max(0, Math.ceil((durationMs - elapsed) / 1000));
    remaining.textContent = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
    const complete = durationMs > 0 && elapsed >= durationMs;
    remaining.classList.toggle('is-complete', complete);
    progress.classList.toggle('is-complete', complete);
    fill.style.width = `${durationMs ? elapsed / durationMs * 100 : 0}%`;
    const label = startedAt !== null ? '暂停计时' : complete ? '重新计时' : elapsedMs > 0 ? '继续计时' : '开始计时';
    timerButton.title = label;
    timerButton.setAttribute('aria-label', label);
    timerButton.querySelector('svg').innerHTML = startedAt !== null
      ? "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M15.75 5.25v13.5m-7.5-13.5v13.5\"/>"
      : "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z\"/>";
  }
  function tickTimer() {
    if (timerElapsed() >= durationMs) {
      elapsedMs = durationMs;
      startedAt = null;
      stopTicking();
    }
    drawTimer();
  }
  function clearTimerProgress() {
    // A new page starts at zero, rather than animating the previous page's bar backwards.
    fill.style.transition = 'none';
    fill.style.width = '0%';
    progress.classList.remove('is-complete');
    void fill.offsetWidth;
    fill.style.removeProperty('transition');
  }
  function resetTimer() {
    stopTicking();
    startedAt = null;
    elapsedMs = 0;
    const minutes = Number(slides[current].dataset.duration);
    durationMs = Number.isFinite(minutes) && minutes > 0 ? Math.round(minutes * 60000) : 0;
    timerButton.hidden = !durationMs;
    progress.hidden = !durationMs;
    timerParts.forEach(part => { part.hidden = !durationMs; });
    remaining.title = `目标时间 ${Number.isFinite(minutes) ? minutes : 0} 分钟`;
    clearTimerProgress();
    drawTimer();
  }
  timerButton.addEventListener('click', () => {
    if (!durationMs) return;
    if (startedAt !== null) {
      elapsedMs = timerElapsed();
      startedAt = null;
      stopTicking();
    } else {
      if (elapsedMs >= durationMs) { elapsedMs = 0; clearTimerProgress(); }
      startedAt = performance.now();
      timerInterval = setInterval(tickTimer, 1000);
    }
    drawTimer();
  });
  document.addEventListener('visibilitychange', () => { if (startedAt !== null) tickTimer(); });
  window.addEventListener('pagehide', stopTicking);
  window.addEventListener('pageshow', () => {
    if (startedAt !== null && timerInterval === null) {
      tickTimer();
      if (startedAt !== null) timerInterval = setInterval(tickTimer, 1000);
    }
  });
  function fromHash() {
    const match = location.hash.match(/^#slide-(\d+)$/);
    return match ? Math.max(0, Math.min(slides.length - 1, Number(match[1]) - 1)) : 0;
  }
  function show(index, updateHash = true) {
    const nextIndex = Math.max(0, Math.min(slides.length - 1, index));
    const changed = nextIndex !== current;
    current = nextIndex;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    prev.disabled = current === 0;
    next.disabled = current === slides.length - 1;
    count.textContent = String(current + 1);
    if (changed) resetTimer();
    if (updateHash) history.replaceState(null, '', `#slide-${current + 1}`);
    window.scrollTo({top: 0, behavior: 'instant'});
  }
  prev.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  window.addEventListener('hashchange', () => show(fromHash(), false));
  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.target.closest('input, textarea, select, [contenteditable="true"]')) return;
    if (event.key === 'ArrowRight' || event.key === 'PageDown' || (event.key === ' ' && !event.target.closest('button, a'))) { event.preventDefault(); show(current + 1); }
    else if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); show(current - 1); }
    else if (event.key === 'Home') { event.preventDefault(); show(0); }
    else if (event.key === 'End') { event.preventDefault(); show(slides.length - 1); }
    else if (event.key.toLowerCase() === 'f') { event.preventDefault(); toggleFullscreen(); }
  });
  let start = null;
  const deck = document.querySelector('.slide-deck');
  deck.addEventListener('touchstart', event => {
    start = event.touches.length === 1 ? {x:event.touches[0].clientX, y:event.touches[0].clientY} : null;
  }, {passive:true});
  deck.addEventListener('touchend', event => {
    if (!start || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    start = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) show(current + (dx < 0 ? 1 : -1));
  }, {passive:true});
  deck.addEventListener('touchcancel', () => { start = null; });
  // Fullscreen remains available with F; the reference toolbar's monitor is a theme toggle.
  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
    } catch { /* Browser restrictions leave the current slide intact. */ }
  }
  const scheme = window.matchMedia('(prefers-color-scheme: dark)');
  let theme = 'system';
  try { theme = localStorage.getItem('gomaas-slide-theme') || 'system'; } catch {}
  if (!['system', 'light', 'dark'].includes(theme)) theme = 'system';
  // Heroicons v2.2.0 (MIT), copyright Tailwind Labs; see HEROICONS-LICENSE.txt.
  const icons = {
    "system": "<path fill-rule=\"evenodd\" d=\"M2.25 5.25a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3V15a3 3 0 0 1-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 0 1-.53 1.28h-9a.75.75 0 0 1-.53-1.28l.621-.622a2.25 2.25 0 0 0 .659-1.59V18h-3a3 3 0 0 1-3-3V5.25Zm1.5 0v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5Z\" clip-rule=\"evenodd\"/>",
    "light": "<path d=\"M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z\"/>",
    "dark": "<path fill-rule=\"evenodd\" d=\"M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z\" clip-rule=\"evenodd\"/>"
};
  function applyTheme() {
    document.body.dataset.theme = theme === 'system' ? (scheme.matches ? 'dark' : 'light') : theme;
    const label = {system:'跟随系统', light:'浅色模式', dark:'深色模式'}[theme];
    themeButton.setAttribute('aria-label', `切换主题（当前：${label}）`);
    themeButton.title = label;
    themeButton.querySelector('svg').innerHTML = icons[theme];
  }
  themeButton.addEventListener('click', () => {
    theme = {system:'light', light:'dark', dark:'system'}[theme];
    try { localStorage.setItem('gomaas-slide-theme', theme); } catch {}
    applyTheme();
  });
  scheme.addEventListener('change', () => { if (theme === 'system') applyTheme(); });
  applyTheme();
  show(fromHash(), false);
  controls.hidden = false;
})();
