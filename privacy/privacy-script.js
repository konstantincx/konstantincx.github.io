/* Privacy page script — Konstantin® */
(function(){
  function ready(fn){
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, { once:true });
    else fn();
  }

  ready(function(){
    // Footer year + last updated
    const now = new Date();
    const yf = document.getElementById('year-footer');
    if (yf) yf.textContent = now.getFullYear();
    const lu = document.getElementById('last-updated');
    if (lu) lu.textContent = now.toLocaleDateString(undefined, { year:'numeric', month:'long', day:'2-digit' });

    // Sync theme toggle with global behavior
    const cb = document.getElementById('themeCheckbox');
    if (cb) cb.checked = document.body.classList.contains('light');

    // --- Consent storage & application ---
    const LS_KEY = 'privacy_consent';
    const $analytics = document.getElementById('consent-analytics');
    const $embeds = document.getElementById('consent-embeds');

    function loadConsent(){
      try {
        const raw = localStorage.getItem(LS_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
      } catch(e){ return null; }
    }
    function saveConsent(state){
      try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch(e){}
    }

    function injectAnalytics(){
      // Placeholder: add your analytics script here when enabled.
      // const s = document.createElement('script');
      // s.src = 'https://your-analytics.example/analytics.js';
      // s.defer = true; document.head.appendChild(s);
    }

    function applyConsent(state){
      if (state.analytics) injectAnalytics();
      document.documentElement.dataset.embedsAllowed = String(!!state.embeds);
    }

    const saved = loadConsent();
    if (saved) {
      if ($analytics) $analytics.checked = !!saved.analytics;
      if ($embeds) $embeds.checked = !!saved.embeds;
      applyConsent(saved);
    }

    const $decline = document.getElementById('btn-decline');
    const $accept  = document.getElementById('btn-accept');
    const $reset   = document.getElementById('btn-reset');

    $decline?.addEventListener('click', () => {
      const state = { analytics:false, embeds:false };
      saveConsent(state); applyConsent(state);
    });

    $accept?.addEventListener('click', () => {
      const state = { analytics: !!$analytics?.checked, embeds: !!$embeds?.checked };
      saveConsent(state); applyConsent(state);
    });

    $reset?.addEventListener('click', () => {
      try { localStorage.removeItem(LS_KEY); } catch(e){}
      if ($analytics) $analytics.checked = false;
      if ($embeds) $embeds.checked = false;
      applyConsent({ analytics:false, embeds:false });
    });
  });
})();