/* LógosAI — estimator.js
 * Ballpark the monthly LLM *API* bill for a bot. This is the same back-of-
 * envelope we use internally when scoping a tier, exposed for prospects so the
 * "but what does it cost to run?" question answers itself.
 *
 * Model (from our cost notes):
 *   bill ≈ Σ_per-message( in_tokens·in_price + out_tokens·out_price )
 *        ≈ conversations × ( conv_in/1e6·in_price + conv_out/1e6·out_price )
 * A typical 6-exchange conversation re-sends the whole context each turn, so
 * input dominates. Prices below are PUBLIC provider list prices per 1M tokens
 * (USD) — they move often, so re-check the official pricing pages before you
 * put a number in a written quote. This is infra cost only; it is NOT the
 * managed-service retainer and NOT our build fee.
 */
(function () {
  'use strict';

  var USD_TO_EUR = 0.92; // rough; we re-peg this every quarter

  // [in $/1M, out $/1M]. Order = roughly cheapest → most capable.
  var MODELS = {
    'llama31-8b':  { label: 'Llama 3.1 8B · Groq',     in: 0.05, out: 0.08 },
    'oss-20b':     { label: 'gpt-oss-20b · Groq',      in: 0.075, out: 0.30 },
    '4o-mini':     { label: 'GPT-4o-mini · OpenAI',    in: 0.15, out: 0.60 },
    'haiku':       { label: 'Claude Haiku 4.5',        in: 1.00, out: 5.00 },
    'sonnet':      { label: 'Claude Sonnet 4.6',       in: 3.00, out: 15.00 },
    'opus':        { label: 'Claude Opus 4.8',         in: 5.00, out: 25.00 }
  };

  // Per-conversation token footprint by bot style. RAG carries a fat context
  // (retrieved chunks) so its input is much heavier than a scripted wizard.
  var WORKLOADS = {
    'faq':    { label: 'FAQ widget (cached)', cin: 9000,  cout: 700,  cached: true },
    'wizard': { label: 'Guided wizard flow',  cin: 18000, cout: 900,  cached: false },
    'rag':    { label: 'RAG knowledge base',  cin: 42000, cout: 1200, cached: true }
  };

  var modelSel = document.getElementById('est-model');
  var loadSel = document.getElementById('est-load');
  var convRange = document.getElementById('est-convos');
  var convOut = document.getElementById('est-convos-val');
  var out = document.getElementById('est-bill');
  var note = document.getElementById('est-note');

  if (!modelSel || !convRange || !out) return; // estimator not on this page

  // fill the selects from the data above instead of hand-writing <option>s,
  // so adding a model is a one-line change here.
  Object.keys(MODELS).forEach(function (k) {
    var o = document.createElement('option');
    o.value = k; o.textContent = MODELS[k].label;
    modelSel.appendChild(o);
  });
  Object.keys(WORKLOADS).forEach(function (k) {
    var o = document.createElement('option');
    o.value = k; o.textContent = WORKLOADS[k].label;
    loadSel.appendChild(o);
  });
  modelSel.value = 'haiku';   // our default — best quality/€ for Greek
  loadSel.value = 'faq';

  function eur(n) {
    // small bills read better with a couple decimals; big ones rounded
    if (n < 50) return '€' + n.toFixed(n < 10 ? 1 : 0);
    return '€' + Math.round(n / 5) * 5; // snap to nearest 5, it's an estimate
  }

  function recalc() {
    var m = MODELS[modelSel.value];
    var w = WORKLOADS[loadSel.value];
    var convos = parseInt(convRange.value, 10);

    var inTok = w.cin;
    // prompt caching roughly 10x's the stable system+knowledge slab. We only
    // discount the portion that's actually reused (~70% of input on cached bots).
    if (w.cached) inTok = inTok * 0.3 + (inTok * 0.7) * 0.1;

    var perConvUsd = (inTok / 1e6) * m.in + (w.cout / 1e6) * m.out;
    var monthlyEur = perConvUsd * convos * USD_TO_EUR;

    out.textContent = eur(monthlyEur);
    convOut.textContent = convos.toLocaleString('en-US');

    if (note) {
      var perK = (perConvUsd * 1000 * USD_TO_EUR);
      note.innerHTML = w.cached
        ? 'Prompt caching applied — the stable system + knowledge block bills ~10× cheaper after the first hit. ≈ ' + eur(perK) + ' per 1,000 conversations.'
        : 'No caching on a scripted flow (context changes each step). ≈ ' + eur(perK) + ' per 1,000 conversations.';
    }
  }

  modelSel.addEventListener('change', recalc);
  loadSel.addEventListener('change', recalc);
  convRange.addEventListener('input', recalc);
  recalc();
})();
