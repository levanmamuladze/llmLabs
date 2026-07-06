# LógosAI — site

Single-page marketing site for LógosAI (chatbots, AI agents, websites). Plain
static HTML/CSS/JS — **no build step, no framework, no npm**. Deploy = upload the
folder. Live at https://logoai-nu.vercel.app/ (custom domain pending).

```
index.html              ← the page (one file, all sections — GREEK source of truth)
assets/
  css/main.css          ← design system + components (prefix `lx-`)
  js/i18n.js            ← EL/EN swap: English dictionary + tiny apply/toggle engine
  js/app.js             ← nav, drawer, scroll-reveal, demo modal, warm-up ping, lead form
  favicon.svg           ← the Λ-bubble mark
  og.png                ← 1200×630 share card (WhatsApp/Viber/FB previews)
```

## Bilingual (Ελληνικά / English)

**Greek is the source of truth** and lives inline in `index.html` — deliberately,
so search engines index the language Greek buyers actually search in. English is
an override layer in `assets/js/i18n.js`, keyed by attributes on the markup:

- `data-i18n="key"` → swaps `innerHTML`
- `data-i18n-ph="key"` → swaps an input/textarea `placeholder`
- `data-i18n-aria="key"` → swaps an `aria-label`

The Greek baseline is captured on first load, so switching back to ΕΛ just
restores it — you only ever write English in the dictionary. First visit follows
the browser (`el-*` → Greek, otherwise English); the EN/ΕΛ toggle remembers the
choice in `localStorage`. **To add a string:** put the Greek in `index.html` with
a `data-i18n` key, then add the same key with the English text to `EN` in `i18n.js`.

## The demo gallery

`#demo` is a 3-card scenario gallery (taverna / clinic / real e-shop client). Each
card opens its live bot in an accessible modal — the iframe is injected on open
with `?chat=open` so the visitor lands in the conversation, and removed on close.
Deep link a demo with `?demo=restaurant|clinic|eshop` on the page URL. The two
backends get a `HEAD /api/health` warm-up ping when the gallery scrolls into view.
Demo URLs live in one place: `DEMOS` in `app.js`.

## Pricing model (what's on the page)

Flat **monthly subscription + one-off setup**, four tiers with sub-tiers:

| Tier | Sub-tiers | Monthly | Setup |
|------|-----------|---------|-------|
| 1 · Questions | Essential / Pro | €29 / €49 | €200 / €250 |
| 2 · Bookings | Standard / Plus | €79 / €99 | €400 / €450 |
| 3 · Sales / lead-gen | Full | from €190 (quoted per project) | from €700 |
| 4 · Full Agent | Custom | from €390 (quoted per project) | from €1200 |

Plus add-ons (channels, extra language, integrations, analytics, priority) and
discounts (annual −16%, seasonal pause, upgrade credit). T1–2 are flat list
prices; T3–4 always quoted. The subscription bundles hosting + model + support —
**no per-conversation/token bill is shown to clients**; internal model-cost notes
stay off the page.

## Before/at launch

- Analytics: create the site at cloud.umami.is, paste the website-id into the
  commented `<script>` in `index.html`'s head, un-comment.
- Custom domain: point it at the Vercel project, then update `canonical`,
  `og:url`, `og:image` and the widget-attribution URL in the bot repos.
- Contacts (698 367 8188 / 698 373 1929, info.logosai@gmail.com) and the
  Formspree endpoint (`xnjkrqvg`) are live in the page — keep them in sync if
  anything changes.

## Deploy

Any static host. Vercel drop-folder, Netlify, GitHub Pages, plain S3/nginx.
Nothing server-side.
