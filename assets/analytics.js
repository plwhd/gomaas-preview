/* Public website ID only. An empty ID leaves analytics completely disabled. */
(() => {
  'use strict';
  const websiteId = document.currentScript?.dataset.websiteId || '';
  const allowedPages = new Set(['/gomaas-preview/', '/gomaas-preview/index.html', '/gomaas-preview/resume.html']);
  if (location.hostname !== 'plwhd.github.io' || !allowedPages.has(location.pathname)) return;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(websiteId)) return;
  if (navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true) return;
  const events = new Set(['resume_open', 'resume_download_click', 'resume_pdf_open']);
  // Only send page paths and referrer origins, never query strings or custom identity data.
  window.gomaasAnalyticsBeforeSend = (type, payload) => {
    if (type !== 'event' || (payload.name && !events.has(payload.name))) return false;
    const clean = { ...payload };
    const url = new URL(clean.url || location.pathname, location.origin);
    if (!allowedPages.has(url.pathname)) return false;
    clean.url = url.pathname === '/gomaas-preview/index.html' ? '/gomaas-preview/' : url.pathname;
    try { clean.referrer = clean.referrer ? new URL(clean.referrer).origin : ''; }
    catch { clean.referrer = ''; }
    delete clean.data;
    delete clean.id;
    return clean;
  };
  const tracker = document.createElement('script');
  tracker.src = 'https://cloud.umami.is/script.js';
  tracker.async = true;
  tracker.dataset.websiteId = websiteId;
  tracker.dataset.domains = 'plwhd.github.io';
  tracker.dataset.excludeSearch = 'true';
  tracker.dataset.excludeHash = 'true';
  tracker.dataset.doNotTrack = 'true';
  tracker.dataset.beforeSend = 'gomaasAnalyticsBeforeSend';
  // Observe clicks without preventing navigation or changing native downloads.
  document.addEventListener('click', (event) => {
    const name = event.target.closest?.('[data-gomaas-event]')?.dataset.gomaasEvent;
    if (!events.has(name) || !window.umami?.track) return;
    try { Promise.resolve(window.umami.track(name)).catch(() => {}); }
    catch { /* Analytics must never interfere with the link. */ }
  }, { capture: true, passive: true });
  document.head.appendChild(tracker);
})();
