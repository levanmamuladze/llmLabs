# LógosAI — site

Single-page marketing site for LógosAI (chatbots, AI agents, websites). Plain
static HTML/CSS/JS — **no build step, no framework, no npm**. Deploy = upload the
folder.

```
index.html              ← the page (one file, all sections)
assets/
  css/main.css          ← design system + components (prefix `lx-`)
  js/i18n.js            ← EL/EN swap: Greek dictionary + tiny apply/toggle engine
  js/app.js             ← nav, drawer, scroll-reveal, bot-iframe loader, lead form
```

## Bilingual (Ελληνικά / English)

English is the source of truth and lives inline in `index.html`. Greek is an
override layer in `assets/js/i18n.js`, keyed by attributes on the markup:

- `data-i18n="key"` → swaps `innerHTML`
- `data-i18n-ph="key"` → swaps an input/textarea `placeholder`
- `data-i18n-aria="key"` → swaps an `aria-label`

The English baseline is captured on first load, so switching back to EN just
restores it — you only ever write Greek in the dictionary. First visit follows
the browser (`el-*` → Greek, otherwise English); the EN/ΕΛ toggle in the nav and
drawer remembers the choice in `localStorage`. The few strings `app.js` builds at
runtime (form sending/success/error) read from `window.LX_I18N` so they follow the
language too. **To add a string:** put the English in `index.html` with a
`data-i18n` key, then add the same key with the Greek text to `EL` in `i18n.js`.

## Before going live — checklist

Search the repo for `TODO:contact` and `TODO(LM)`:

1. **Contact details** — `index.html` has placeholder phone + email in three
   spots (nav, contact section, mobile sticky bar) and the `tel:` hrefs. Fill them.
2. **Lead form endpoint** — `app.js` → `FORM_ENDPOINT` still points at the old
   LMLabs Formspree id so test submits don't vanish. Swap it for the LógosAI
   form once the inbox is verified.
3. **Pricing** — the `#pricing` section hardcodes the numbers from the June'26
   services proposal (`tiersguide.pdf`). If Levan revises the deck, update the
   tier cards + add-ons in `index.html` to match. Prices are € **ex. VAT 24%**.

## Pricing model (what's on the page)

Flat **monthly subscription + one-off setup**, four tiers with sub-tiers:

| Tier | Sub-tiers | Monthly | Setup |
|------|-----------|---------|-------|
| 1 · Questions | Essential / Pro | €29 / €49 | €200 / €250 |
| 2 · Bookings | Standard / Plus | €79 / €99 | €400 / €450 |
| 3 · Sales / lead-gen | Full | €199 (range €190–250) | €700 |
| 4 · Full Agent | Custom | from €390 (by quote) | from €1200 |

Plus add-ons (channels, extra language, integrations, analytics, priority) and
discounts (annual −16%, seasonal pause, upgrade credit). The subscription bundles
hosting + model + support — deliberately **no per-conversation/token bill is shown
to clients**; pricing is value-based, not usage-metered. Internal model-cost notes
(the per-conversation €0.000x figures) stay in the chatbot-types doc in Notion and
must not be surfaced on the page.

## The live demo iframe

Hero + `#demo` embed the real FAQ-tier bot from
`chat-bot-henna-mu.vercel.app` (no `X-Frame-Options`, so it frames fine). It
cold-starts on Vercel, so there's a spinner under the iframe that fades on
`load`, with a 6s safety timeout in `app.js`.

## Deploy

Any static host. Netlify/Vercel drop-folder, GitHub Pages, or plain S3/nginx.
Nothing server-side.
