/* LógosAI — bilingual layer (Ελληνικά / English). No framework, no build.
 *
 * GREEK is the source of truth: it lives inline in index.html so crawlers
 * index the language our buyers search in. This file only carries the English
 * overrides plus a tiny engine that swaps them in and out, keyed by:
 *
 *   data-i18n="key"       → element.innerHTML
 *   data-i18n-ph="key"    → element placeholder
 *   data-i18n-aria="key"  → element aria-label
 *
 * The Greek baseline is captured on first run, so switching back to ΕΛ is
 * just "restore what was there." The visitor's pick is remembered; a first
 * visit follows the browser (el-* → Greek, everyone else → English).
 *
 * app.js reads window.LX_I18N for the handful of strings it builds itself
 * (the form's sending / success / error states).
 */
(function () {
  'use strict';

  var STORE_KEY = 'logosai.lang';

  /* ---- English copy (overrides the inline Greek). Values may keep the same
     inline markup (spans, <b>, <em>) as the Greek baseline. ---- */
  var EN = {
    'a11y.skip': 'Skip to content',
    'nav.build': 'What we build',
    'nav.demo': 'Live demo',
    'nav.pricing': 'Tiers &amp; pricing',
    'nav.faq': 'FAQ',
    'nav.cta': 'Book a call',
    'nav.menu': 'Open menu',
    'hero.pill': 'Taking on 2–3 new bot builds this quarter',
    'hero.h1': 'Bots that <span class="glow">answer</span>. Agents that <span class="glow">act</span>. Sites that <span class="glow">convert</span>.',
    'hero.sub': 'We take the repetitive questions, the no-shows and the order-status calls off your plate — with a Greek-first assistant that answers 24/7 and books, checks orders and updates your CRM on its own. Grounded in your content, live in days.',
    'hero.cta1': 'Talk to the live bot →',
    'hero.cta2': 'See tiers &amp; pricing',
    'hero.meta1': '<b>1–3 days</b> for a FAQ widget',
    'hero.meta2': '<b>Flat pricing</b> · no usage fees',
    'hero.meta3': '<b>Direct</b> — you talk to the dev',
    'build.kicker': 'What we build',
    'build.h2': 'Three things, one conversation',
    'build.lede': 'Most clients start with one and grow into the others. The bot and the site share the same brand voice because the same person writes both.',
    'build.c1.h3': 'Conversational chatbots',
    'build.c1.p': 'The widget that answers ωράρια, τιμές, “πού είστε;” — grounded in your own content, so answers come from you, not thin air.',
    'build.c1.li1': 'One &lt;script&gt; tag, drops into any site',
    'build.c1.li2': 'Greek + English in the same thread',
    'build.c1.li3': 'Answers from your content, not made up',
    'build.c2.h3': 'AI agents that do things',
    'build.c2.p': 'Not just talk — act. Books the appointment, checks order status, files the return, pushes the lead into your CRM. Scoped access, every action traceable — designed per project.',
    'build.c2.li1': 'Calendar, e-shop, CRM, payment, SMS',
    'build.c2.li2': 'Scoped, read-only credentials by default',
    'build.c2.li3': 'Every action logged — you can see what it did',
    'build.c3.h3': 'The site it lives on',
    'build.c3.p': 'If the bot needs a home, we build it. Fast, mobile-first landing pages and business sites — the same conversion focus, now with an assistant baked in instead of a contact form nobody fills out.',
    'build.c3.li1': 'Mobile-first, loads fast on 4G',
    'build.c3.li2': 'Bot embedded, not bolted on',
    'build.c3.li3': 'You own the code — no lock-in',
    'demo.kicker': 'Live, not a mockup',
    'demo.h2': 'Pick a business. Talk to its bot.',
    'demo.lede': 'These are real, working bots — the exact experience we’d ship you, on sample data. Choose the scenario closest to your business and try it live, right here on the page.',
    'badge.live': 'Live',
    'scn.r.tier': 'Tier 1 · FAQ',
    'scn.r.h3': 'Taverna “Το Κύμα”',
    'scn.r.p': 'A seaside taverna’s assistant — hours, the day’s fish, reservations, allergens, parking. Answers freely in Greek or English.',
    'scn.r.li1': 'Answers from one content file',
    'scn.r.li2': 'Greek + English in one chat',
    'scn.r.li3': 'Hands off to the phone when unsure',
    'scn.try': 'Try this demo →',
    'scn.c.tier': 'Tier 2 · Bookings',
    'scn.c.h3': 'Clinic “Γαλήνη”',
    'scn.c.p': 'A dental clinic’s receptionist — walks you to a real appointment (service → day → time → details) and answers questions on the way.',
    'scn.c.li1': 'Live slots from the schedule',
    'scn.c.li2': 'Booking code on confirm',
    'scn.c.li3': 'Chats while it books',
    'badge.real': 'Real client',
    'scn.e.tier': 'Tier 1 · In production',
    'scn.e.h3': 'Χαραλαμπίδη — linens e-shop',
    'scn.e.p': 'A real bot we built and run for a Thessaloniki bed-linens shop — product advice, sizes, prices, care, returns. A production build you can try right now.',
    'scn.e.li1': 'Recommends by size &amp; budget',
    'scn.e.li2': 'Embeds with one script tag',
    'scn.e.li3': 'Sales-tuned, not just FAQ',
    'proof.s1': 'Always-on answering — even after you’ve closed',
    'proof.b2': '1–3 days',
    'proof.s2': 'From scope call to a live FAQ widget',
    'proof.b3': '3 bots',
    'proof.s3': 'Live on this page — try them right now',
    'proof.s4': 'You own the build — no lock-in',
    'pricing.kicker': 'Tiers &amp; pricing',
    'pricing.h2': 'Four tiers. Start low, climb when it pays for itself.',
    'pricing.lede': 'Priced on the work it takes off your plate, not on tokens. A flat monthly subscription plus a one-off setup is all of it: hosting, the AI model and support are bundled, so there’s no surprise usage bill. Every tier upgrades into the next without a rebuild, and we credit your previous setup when you move up.',
    't1.no': 'TIER 1 · Questions',
    'badge.livedemo': 'Live demo',
    't1.what': 'A floating chat bubble that understands free-form questions and answers from your content — hours, services, prices, location, policies. Grounded in your material, so when it doesn\'t know it says so and points to a human.',
    't1.p1.desc': 'Core content — FAQ + the essentials. Clean standard tone.',
    'unit.mo': '/mo',
    't1.p1.set': 'setup €200',
    't1.p2.tag': '★ Most chosen',
    't1.p2.desc': 'Full content set, tone tuned to your brand — great for tourism.',
    't1.p2.set': 'setup €250',
    't1.fit': '<b>Ideal for:</b> restaurants, shops, services with frequent questions.',
    't1.live': '▸ See it live',
    't1.cta': 'Get my FAQ bot →',
    't2.no': 'TIER 2 · Bookings',
    't2.what': 'Walks the visitor to a booking step-by-step (service → day → time → details) while answering questions along the way. Free slots come from your own schedule, so they’re never stale; issues a booking code.',
    't2.p1.desc': 'Full booking flow + smart Q&amp;A.',
    't2.p1.set': 'setup €400',
    't2.p2.desc': 'Extra booking scenarios &amp; richer flows.',
    't2.p2.set': 'setup €450',
    't2.fit': '<b>Ideal for:</b> clinics, salons, gyms — anything appointment-based.',
    't2.live': '▸ See it live',
    't2.cta': 'Set up bookings →',
    't3.no': 'TIER 3 · Sales / lead-gen',
    'badge.custom': 'Custom · quoted',
    't3.what': 'Opens the conversation, works out what the visitor wants, qualifies the interest, collects contact details and hands the hot lead to a human with a summary of the chat.',
    't3.p1.desc': 'Qualifying scenarios, lead form, sales alert, basic analytics.',
    't3.mo': '<small>from</small> €190<small>/mo</small>',
    't3.set': 'setup from €700',
    't3.range': 'Quoted per project — depends on conversation volume and scenario complexity.',
    't3.fit': '<b>Ideal for:</b> lead-driven services — real estate, insurance, B2B.',
    't3.cta': 'Book a scoping call →',
    't4.no': 'TIER 4 · Full agent',
    't4.what': 'Doesn’t just talk — does the job: books into a real calendar, updates your CRM, sends SMS/email, even takes payments. Designed around your existing systems.',
    't4.p1.desc': '1–3 system integrations, secure flows, priority support.',
    't4.mo': '<small>from</small> €390<small>/mo</small>',
    't4.set': 'setup from €1200',
    't4.range': 'Always quoted per project — cost is driven by the integrations and the safety checks.',
    't4.fit': '<b>Ideal for:</b> businesses with systems that want real automation.',
    't4.cta': 'Plan your integration →',
    'addons.h4a': 'Add-ons',
    'addon.a1': '<span>WhatsApp / Instagram / Messenger channel</span><b>+€25–45/mo</b>',
    'addon.a2': '<span>Extra language beyond EL/EN</span><b>+€10/mo</b>',
    'addon.a3': '<span>Connect an external system <em>(per integration)</em></span><b>from €250 once</b>',
    'addon.a4': '<span>Monthly report &amp; analytics</span><b>+€15/mo</b>',
    'addon.a5': '<span>Priority support</span><b>+€20/mo</b>',
    'addons.h4b': 'Discounts &amp; flexibility',
    'addon.d1': '<span>Annual prepay</span><b>2 months free (−16%)</b>',
    'addon.d2': '<span>Seasonal businesses (e.g. tavernas)</span><b>winter pause / reduced off-season</b>',
    'addon.d3': '<span>Upgrade tier anytime</span><b>previous setup credited</b>',
    'addons.vat': 'All prices in € excluding VAT 24%. Tiers 1–2 are flat list prices; Tiers 3–4 are quoted per project.',
    'proc.kicker': 'How it goes',
    'proc.h2': 'From first call to live in five steps',
    'proc.s1.h4': 'Scope call',
    'proc.s1.p': 'What should it deflect or do? We pick the tier and the model together. No commitment.',
    'proc.s2.h4': 'Flow &amp; content',
    'proc.s2.p': 'We map the conversation and gather your FAQ, docs, or system access. You approve the flow.',
    'proc.s3.h4': 'Build &amp; tune',
    'proc.s3.p': 'Prompting, retrieval or tool-calling, brand voice. You test it on a staging link.',
    'proc.s4.h4': 'Integrate',
    'proc.s4.p': 'Calendar, CRM, e-shop — wired with scoped credentials and an audit log. Sandbox first.',
    'proc.s5.h4': 'Launch &amp; watch',
    'proc.s5.p': 'One script tag goes live. We monitor the first weeks and tighten anything that misfires.',
    'why.kicker': 'Why us, specifically',
    'why.h2': 'Engineered to be trusted',
    'why.i2.h4': 'Greek-first, not Greek-as-afterthought',
    'why.i2.p': 'The model is chosen per client, not one-size-fits-all — premium models where Greek tone and nuance matter most, economical ones where volume justifies it.',
    'why.i4.h4': 'Agentic, but careful',
    'why.i4.p': 'Credentials encrypted in a secrets manager, least-privilege scopes, rate limiting, and an audit line for every action the bot takes.',
    'why.i6.h4': 'Two founders, zero layers',
    'why.i6.p': 'No account-manager relay. Kimon scopes it with you, Levan builds it — the people you meet are the people doing the work.',
    'faq.kicker': 'Straight answers',
    'faq.h2': 'Questions we get a lot',
    'faq.q1': 'Will the bot make stuff up?',
    'faq.a1': 'It answers from the content you give it and is told to say “I don’t know — here’s how to reach a human” when something’s out of scope. Grounding the model in your own material instead of letting it free-style is exactly what keeps it from inventing hours or prices. We test the edges before launch.',
    'faq.q2': 'Do you need our passwords?',
    'faq.a2': 'For Tiers 1 and 2, basically no — a Questions bot holds zero credentials, a Bookings bot just needs calendar/email access. Only the full Agent tier touches real systems, and there we use scoped, least-privilege keys stored encrypted, with every action logged so you can audit what it did.',
    'faq.q3': 'Are there hidden usage fees on top of the monthly price?',
    'faq.a3': 'No. The tier subscription is flat and already bundles hosting and the AI model, so there’s no separate “API bill” that creeps up with traffic. Even on the priciest model our running cost stays well under what the subscription covers — that’s why pricing is based on the value (fewer phone calls, fewer no-shows, 24/7), not on tokens.',
    'faq.q4': 'Can it speak Greek properly?',
    'faq.a4': 'Yes — every tier is bilingual EL/EN out of the box and the content is written in Greek. We choose the model per client: premium models where Greek tone and nuance matter most, more economical ones where high conversation volume justifies it.',
    'faq.q5': 'We already have a website. Do we need a new one?',
    'faq.a5': 'No. The chatbot drops onto your existing site with one script tag. We only build a site if you want one or the current one is holding the bot back.',
    'faq.q6': 'What if we outgrow the tier we start on?',
    'faq.a6': 'That’s the plan. Upgrade anytime — a Questions bot grows into Bookings, Bookings into Sales, and any of them into a full Agent. No rebuild, and we credit the setup fee you already paid against the new tier. Tiers can also be hybrid: e.g. a Questions bot with one booking button borrowed from Tier 2.',
    'faq.q7': 'Do we own it?',
    'faq.a7': 'Yes. The build is yours. The managed-service subscription is optional — drop it whenever, the bot is still yours. No lock-in.',
    'contact.kicker': 'Get in touch',
    'contact.h3': 'Tell us what you’re drowning in.',
    'contact.p': 'The repetitive questions, the no-shows, the order-status calls — whatever it is, there’s probably a tier for it. Drop a line and we’ll reply within a business day, usually with a question or two before quoting anything.',
    'contact.ch1.label': 'Call, WhatsApp or Viber',
    'contact.ch2.label': 'Email',
    'contact.ch3.label': 'Based in',
    'contact.ch3.val': 'Thessaloniki — working remotely across Greece &amp; the EU',
    'contact.ch4.label': 'Who you’ll talk to',
    'contact.ch4.val': 'Kimon Katechakis — sales &amp; scoping · Levan Mamuladze — engineering',
    'form.ph.name': 'Your name',
    'form.ph.email': 'Email',
    'form.ph.company': 'Business name (optional)',
    'form.ph.phone': 'Phone (optional — we can call you back)',
    'form.opt.0': 'What are you after? (optional)',
    'form.opt.1': 'Tier 1 · Questions bot — answer customer questions',
    'form.opt.2': 'Tier 2 · Bookings bot — guide visitors to an appointment',
    'form.opt.3': 'Tier 3 · Sales bot — qualify &amp; capture leads',
    'form.opt.4': 'Tier 4 · Full Agent — connect to our systems',
    'form.opt.5': 'A website (with or without a bot)',
    'form.opt.6': 'Not sure yet — help me pick',
    'form.ph.message': 'What\'s the repetitive thing you\'d love to hand off? A couple of sentences is plenty.',
    'form.submit': 'Send it →',
    'form.note': 'We reply within one business day. No spam, no drip sequence — just a human.',
    'modal.cta': 'I want one like this →',
    'modal.open': 'Open in new tab ↗',
    'modal.close': 'Close demo',
    'foot.copy': 'LógosAI — chatbots, AI agents &amp; websites. Thessaloniki.',
    'foot.pricing': 'Pricing',
    'foot.demo': 'Demo',
    'foot.contact': 'Contact',
    'sticky.call': 'Call'
  };

  /* ---- <title> + <meta description> per language ---- */
  var META = {
    en: {
      title: 'LógosAI — Chatbots, AI Agents & Websites for Greek businesses',
      desc: 'LógosAI designs conversational chatbots, action-taking AI agents, and the websites they live on. Greek-first, bilingual EL/EN. Live demos on the page.'
    },
    el: {
      title: 'LógosAI — Chatbots, AI Agents & ιστοσελίδες για ελληνικές επιχειρήσεις',
      desc: 'Η LógosAI σχεδιάζει συνομιλιακά chatbots, AI agents που εκτελούν ενέργειες, και τις ιστοσελίδες όπου ζουν. Greek-first, δίγλωσσα EL/EN. Ζωντανά demos στη σελίδα.'
    }
  };

  /* ---- strings app.js builds at runtime (the form's states) ---- */
  var DYN = {
    'form.sending': { en: 'Sending…', el: 'Αποστολή…' },
    'form.ok.title': { en: 'Got it ✓', el: 'Το λάβαμε ✓' },
    'form.ok.body': {
      en: 'Thanks {name}. We read every message ourselves — expect a reply within one business day, usually with a couple of questions about your use case before any number gets quoted.',
      el: 'Ευχαριστούμε {name}. Διαβάζουμε κάθε μήνυμα οι ίδιοι — περίμενε απάντηση μέσα σε μία εργάσιμη, συνήθως με μερικές ερωτήσεις για την περίπτωσή σου πριν δοθεί οποιαδήποτε τιμή.'
    },
    'form.err': {
      en: 'Hmm, that didn’t send (an adblocker can do this). Email us directly and we’ll pick it up.',
      el: 'Χμ, δεν στάλθηκε (μπορεί να φταίει κάποιος adblocker). Στείλε μας email απευθείας και θα το δούμε.'
    }
  };

  var meta = document.querySelector('meta[name="description"]');
  var baseHTML = new Map();   // captured English innerHTML, per element
  var basePH = new Map();     // captured English placeholders
  var baseAria = new Map();   // captured English aria-labels
  var lang = 'en';

  function preferred() {
    try {
      var saved = localStorage.getItem(STORE_KEY);
      if (saved === 'el' || saved === 'en') return saved;
    } catch (e) { /* private mode / storage off — fall through to the browser */ }
    return /^el\b/i.test(navigator.language || navigator.userLanguage || '') ? 'el' : 'en';
  }

  function swap(attr, store, map, setter) {
    var nodes = document.querySelectorAll('[' + attr + ']');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var key = el.getAttribute(attr);
      if (!store.has(el)) store.set(el, setter.read(el));
      var override = lang === 'en' ? map[key] : null;
      setter.write(el, override != null ? override : store.get(el));
    }
  }

  function apply(next) {
    lang = next === 'el' ? 'el' : 'en';
    document.documentElement.lang = lang;

    swap('data-i18n', baseHTML, EN, {
      read: function (el) { return el.innerHTML; },
      write: function (el, v) { el.innerHTML = v; }
    });
    swap('data-i18n-ph', basePH, EN, {
      read: function (el) { return el.getAttribute('placeholder') || ''; },
      write: function (el, v) { el.setAttribute('placeholder', v); }
    });
    swap('data-i18n-aria', baseAria, EN, {
      read: function (el) { return el.getAttribute('aria-label') || ''; },
      write: function (el, v) { el.setAttribute('aria-label', v); }
    });

    var m = META[lang];
    document.title = m.title;
    if (meta) meta.setAttribute('content', m.desc);

    var toggles = document.querySelectorAll('[data-lang-set]');
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].setAttribute('aria-pressed', toggles[i].getAttribute('data-lang-set') === lang ? 'true' : 'false');
    }

    try { localStorage.setItem(STORE_KEY, lang); } catch (e) { /* nothing we can do */ }
  }

  // the toggle buttons live in both the nav and the drawer; one delegated handler
  document.addEventListener('click', function (ev) {
    var btn = ev.target.closest && ev.target.closest('[data-lang-set]');
    if (!btn) return;
    ev.preventDefault();
    apply(btn.getAttribute('data-lang-set'));
  });

  // what app.js calls for its runtime strings
  window.LX_I18N = {
    t: function (key) {
      var pair = DYN[key];
      if (!pair) return key;
      return pair[lang] || pair.en;
    },
    get lang() { return lang; }
  };

  apply(preferred());
})();
