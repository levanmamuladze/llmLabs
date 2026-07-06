/* LógosAI — app.js
 * UI plumbing: sticky nav, mobile drawer, staggered scroll-reveal, the demo
 * viewer modal (scenario gallery + tier "see it live"), and the lead form.
 * The EL/EN swap lives in i18n.js; the few strings this file builds at runtime
 * (the form's states) come back through window.LX_I18N so they follow language.
 *
 * Demo deployments live in ONE place — DEMOS below. ChatBOTTiers stays its own
 * deploy; we just frame its demo pages in a modal (lazy iframe, sandboxed).
 * When the LógosAI inbox / CRM webhook is ready, swap FORM_ENDPOINT. — LM
 */
(function () {
  'use strict';

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  var t = function (key) { return window.LX_I18N ? window.LX_I18N.t(key) : key; };

  /* ---- demo deployments (single source of truth) ---- */
  var CHATBOTTIERS_URL = 'https://chat-bot-tiers-eight.vercel.app';
  var CHARALAMPIDIS_URL = 'https://chat-bot-henna-mu.vercel.app/';
  // ?chat=open → every demo page opens its own conversation on load, so the
  // visitor lands in the chat instead of hunting for a bubble in the corner.
  var DEMOS = {
    restaurant: { url: CHATBOTTIERS_URL + '/restaurant?chat=open', title: 'Taverna «Το Κύμα» — Tier 1 demo' },
    clinic:     { url: CHATBOTTIERS_URL + '/clinic?chat=open',     title: 'Clinic «Γαλήνη» — Tier 2 demo' },
    eshop:      { url: CHARALAMPIDIS_URL + '?chat=open',           title: 'Χαραλαμπίδη — live client bot' }
  };

  var FORM_ENDPOINT = 'https://formspree.io/f/xnjkrqvg';   // → info.logosai@gmail.com

  /* ---- sticky nav: blur background past the fold ---- */
  var nav = $('#nav');
  var onScroll = function () { if (nav) nav.classList.toggle('is-stuck', window.scrollY > 40); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- mobile drawer ---- */
  var burger = $('#burger');
  var drawer = $('#drawer');
  if (burger && drawer) {
    var shutDrawer = function () {
      drawer.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    };
    burger.addEventListener('click', function () {
      var open = drawer.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    $$('a', drawer).forEach(function (a) { a.addEventListener('click', shutDrawer); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) shutDrawer();
    });
  }

  /* ---- staggered scroll reveal ----
     Give siblings within the same container an increasing --rise-delay so grids
     cascade in. IntersectionObserver, unobserve once shown. Falls back to
     "just show it" on ancient browsers. Motion is disabled via CSS under
     prefers-reduced-motion. */
  var risers = $$('.rise');
  risers.forEach(function (el) {
    var parent = el.parentElement;
    if (!parent) return;
    var group = $$('.rise', parent).filter(function (s) { return s.parentElement === parent; });
    var idx = group.indexOf(el);
    if (idx > 0) el.style.setProperty('--rise-delay', Math.min(idx, 5) * 70 + 'ms');
  });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('shown'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    risers.forEach(function (el) { io.observe(el); });
  } else {
    risers.forEach(function (el) { el.classList.add('shown'); });
  }

  /* ---- demo viewer modal ----
     Opened by any [data-demo-open="key"] (gallery cards + tier "see it live").
     The iframe is built on open and removed on close, so no bot keeps running
     in the background. Accessible: focus trap, ESC, backdrop click, focus return. */
  var modal = $('#demoModal');
  if (modal) {
    var mStage = $('#demoModalStage', modal);
    var mLoad = $('#demoModalLoad', modal);
    var mTitle = $('#demoModalTitle', modal);
    var mExt = $('#demoModalExt', modal);
    var mClose = $('#demoModalClose', modal);
    var lastFocused = null;
    var currentFrame = null;

    var focusables = function () {
      return $$('a[href], button:not([disabled])', modal).filter(function (el) { return el.offsetParent !== null; });
    };

    var onKey = function (e) {
      if (e.key === 'Escape') { closeDemo(); return; }
      if (e.key !== 'Tab') return;
      var f = focusables();
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };

    var openDemo = function (key) {
      var d = DEMOS[key];
      if (!d) return;
      lastFocused = document.activeElement;
      mTitle.textContent = d.title;
      mExt.href = d.url;
      if (mLoad) mLoad.classList.remove('gone');

      currentFrame = document.createElement('iframe');
      currentFrame.title = d.title;
      currentFrame.referrerPolicy = 'no-referrer';
      // sandbox: our own trusted demo pages need scripts + same-origin (their
      // API calls) + forms (the booking wizard) + popups (map/phone links).
      currentFrame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox');
      currentFrame.addEventListener('load', function () { if (mLoad) mLoad.classList.add('gone'); });
      currentFrame.src = d.url;
      mStage.appendChild(currentFrame);

      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lx-noscroll');
      document.addEventListener('keydown', onKey);
      setTimeout(function () { mClose.focus(); }, 40);
    };

    var closeDemo = function () {
      if (!modal.classList.contains('is-open')) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lx-noscroll');
      document.removeEventListener('keydown', onKey);
      if (currentFrame) { currentFrame.remove(); currentFrame = null; }
      if (mLoad) mLoad.classList.remove('gone');
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    };

    mClose.addEventListener('click', closeDemo);
    $$('[data-modal-close]', modal).forEach(function (el) { el.addEventListener('click', closeDemo); });
    $$('[data-demo-open]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openDemo(btn.getAttribute('data-demo-open'));
      });
    });

    // "I want one like this" in the modal bar: close the demo, let the anchor
    // carry the visitor to #contact — the hottest click on the page.
    var mCta = $('#demoModalCta', modal);
    if (mCta) mCta.addEventListener('click', function () { closeDemo(); });

    // ?demo=restaurant|clinic|eshop deep link — lets a specific demo be shared
    // (e.g. over WhatsApp mid-conversation) with the pricing context around it.
    var wanted = new URLSearchParams(window.location.search).get('demo');
    if (wanted && DEMOS[wanted]) openDemo(wanted);

    // Warm both bot backends the moment the gallery scrolls into view, so the
    // first click doesn't eat a Vercel cold start behind the spinner.
    var demoBand = $('#demo');
    if (demoBand && 'IntersectionObserver' in window) {
      var warmed = false;
      var warmIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting || warmed) return;
          warmed = true;
          warmIo.disconnect();
          [CHATBOTTIERS_URL + '/api/health', CHARALAMPIDIS_URL + 'api/health'].forEach(function (u) {
            fetch(u, { mode: 'no-cors' }).catch(function () { /* warm-up only */ });
          });
        });
      }, { rootMargin: '600px 0px' });
      warmIo.observe(demoBand);
    }
  }

  /* ---- lead form ----
     Minimal client-side validation (email shape + non-empty message), then
     POST as JSON. We surface a real error message instead of a generic alert
     so a prospect with a typo'd email or an adblocker actually knows why. */
  var form = $('#leadForm');
  if (form) {
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();

      var name = $('#f-name', form);
      var email = $('#f-email', form);
      var message = $('#f-message', form);
      var bad = [];

      [name, email, message].forEach(function (el) { el.classList.remove('err'); });

      if (!name.value.trim()) bad.push(name);
      if (!emailRe.test(email.value.trim())) bad.push(email);
      if (message.value.trim().length < 8) bad.push(message);

      if (bad.length) {
        bad.forEach(function (el) { el.classList.add('err'); });
        bad[0].focus();
        return;
      }

      var btn = $('button[type="submit"]', form);
      var label = btn.textContent;
      btn.disabled = true;
      btn.textContent = t('form.sending');

      var payload = {
        name: name.value.trim(),
        email: email.value.trim(),
        company: ($('#f-company', form) || {}).value || '',
        phone: ($('#f-phone', form) || {}).value || '',
        tier: ($('#f-tier', form) || {}).value || '',
        message: message.value.trim(),
        _source: 'logosai.site/contact'
      };

      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function (res) {
        if (!res.ok) throw new Error('Formspree responded ' + res.status);
        var firstName = escapeHtml(payload.name.split(' ')[0]);
        form.innerHTML =
          '<div class="lx-form__ok">' +
          '<h3>' + t('form.ok.title') + '</h3>' +
          '<p class="muted">' + t('form.ok.body').replace('{name}', firstName) + '</p>' +
          '</div>';
      }).catch(function (err) {
        console.error('[leadForm] submit failed:', err);
        btn.disabled = false;
        btn.textContent = label;
        var warn = $('.lx-form__note', form);
        if (warn) {
          warn.style.color = '#ff8f87';
          warn.textContent = t('form.err');
        }
      });
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  /* year in footer, so we never ship a stale copyright again */
  var yr = $('#yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
