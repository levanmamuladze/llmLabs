# LógosAI — site

Single-page marketing site for LógosAI (chatbots, AI agents, websites). Plain
static HTML/CSS/JS — **no build step, no framework, no npm**. Deploy = upload the
folder.

```
index.html              ← the page (one file, all sections)
assets/
  css/main.css          ← design system + components (prefix `lx-`)
  js/app.js             ← nav, drawer, scroll-reveal, bot-iframe loader, lead form
```

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
| 1 · Questions | Essential / Pro | €19 / €39 | €120 / €150 |
| 2 · Bookings | Standard / Plus | €59 / €79 | €250 / €290 |
| 3 · Sales / lead-gen | Full | €159 (range €149–190) | €450 |
| 4 · Full Agent | Custom | from €290 (by quote) | from €800 |

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
