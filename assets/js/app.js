/* LógosAI — app.js
 * UI plumbing: sticky nav, mobile drawer, scroll-reveal, the bot iframe
 * loader handoff, and the lead form (Formspree). The EL/EN swap lives in
 * i18n.js; the few strings this file builds at runtime (the form's states)
 * come back through window.LX_I18N so they follow the chosen language too.
 *
 * Heads-up for whoever picks this up next: the lead form posts to Formspree
 * for now (FORM_ENDPOINT below). When the LógosAI inbox / CRM webhook is
 * ready, swap FORM_ENDPOINT and add the `tier` field to the CRM mapping. — LM
 */
(function () {
  'use strict';

  // current-language string for the bits we render here; falls back to the
  // key (then English inside LX_I18N) if i18n.js somehow didn't load.
  var t = function (key) {
    return window.LX_I18N ? window.LX_I18N.t(key) : key;
  };

  // TODO(LM): replace with the LógosAI Formspree form id once the new inbox
  // is verified. Until then this points at the old LMLabs endpoint so test
  // submissions don't silently vanish.
  var FORM_ENDPOINT = 'https://formspree.io/f/xgopbgop';

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ---- sticky nav: toggle the blur background past the fold ---- */
  var nav = $('#nav');
  var onScroll = function () {
    if (nav) nav.classList.toggle('is-stuck', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- mobile drawer ---- */
  var burger = $('#burger');
  var drawer = $('#drawer');
  if (burger && drawer) {
    burger.addEventListener('click', function () {
      var open = drawer.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    $$('a', drawer).forEach(function (a) {
      a.addEventListener('click', function () {
        drawer.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- scroll reveal. IntersectionObserver, unobserve once shown so we
     don't keep firing on long pages. Falls back to "just show it" if the
     browser is ancient (none of our clients are, but belt & suspenders). ---- */
  var risers = $$('.rise');
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

  /* ---- bot iframe loader handoff ----
     The demo widget (chat-bot-henna-mu) cold-starts on Vercel, so first paint
     can lag a second or two. We show a spinner underneath and fade it on load.
     Safety timeout in case 'load' never fires (blocked/offline). */
  var botFrame = $('#botFrame');
  var botLoad = $('#botLoad');
  if (botFrame && botLoad) {
    var hideLoader = function () { botLoad.classList.add('gone'); };
    botFrame.addEventListener('load', hideLoader);
    setTimeout(hideLoader, 6000);
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
        tier: ($('#f-tier', form) || {}).value || '',
        message: message.value.trim(),
        // bit of routing context so we can triage in the inbox
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
        // don't swallow it — log for us, tell them what to do instead
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
