# LógosAI — site

Single-page marketing site for LógosAI (chatbots, AI agents, websites). Plain
static HTML/CSS/JS — **no build step, no framework, no npm**. Deploy = upload the
folder.

```
index.html              ← the page (one file, all sections)
assets/
  css/main.css          ← design system + components (prefix `lx-`)
  js/app.js             ← nav, drawer, scroll-reveal, bot-iframe loader, lead form
  js/estimator.js       ← running-cost calculator (token-cost math)
```

## Before going live — checklist

Search the repo for `TODO:contact` and `TODO(LM)`:

1. **Contact details** — `index.html` has placeholder phone + email in three
   spots (nav, contact section, mobile sticky bar) and the `tel:` hrefs. Fill them.
2. **Lead form endpoint** — `app.js` → `FORM_ENDPOINT` still points at the old
   LMLabs Formspree id so test submits don't vanish. Swap it for the LógosAI
   form once the inbox is verified.
3. **Estimator prices** — `estimator.js` `MODELS` are provider *list* prices
   (USD/1M tokens). They drift; re-check the official pricing pages before you
   lean on the number in a written quote. `USD_TO_EUR` is re-pegged quarterly.

## The running-cost estimator

`estimator.js` is the same back-of-envelope we scope tiers with:

```
bill ≈ conversations × ( conv_in/1e6 · in_price + conv_out/1e6 · out_price ) × USD→EUR
```

Input dominates because every turn re-sends the whole context. Cached workloads
(FAQ, RAG) discount the stable system+knowledge slab ~10×. This is **infra/API
only** — not the build fee, not the managed-service retainer. Those (and the
internal S1/S2/S3 ranges) live in the chatbot-types doc in Notion and **must not**
be surfaced on the page.

## The live demo iframe

Hero + `#demo` embed the real FAQ-tier bot from
`chat-bot-henna-mu.vercel.app` (no `X-Frame-Options`, so it frames fine). It
cold-starts on Vercel, so there's a spinner under the iframe that fades on
`load`, with a 6s safety timeout in `app.js`.

## Deploy

Any static host. Netlify/Vercel drop-folder, GitHub Pages, or plain S3/nginx.
Nothing server-side.
