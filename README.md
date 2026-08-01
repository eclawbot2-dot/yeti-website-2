# YETI™ Tires — yetitires.com

Marketing site for YETI Tires, the automotive concierge tire club. Photo-forward
light theme with the red/orange brand accent (`#f24f1e`) and a looping background
drive video in the hero (photo base = LCP + mobile + reduced-motion fallback).

## Hosting

One Vercel project (`yeti-website-2`) serves BOTH:

- **yetitires.com** (+ `www` 308 → apex) — PRODUCTION.
- **yeti.jahdev.com** — staging alias.

### Deploying — read this before trusting a push

**Git push alone deploys NOTHING.** The GitHub→Vercel webhook does not fire on
this fleet, so `git push` leaves the live sites on the previous build with no
error anywhere. Every deploy is manual:

```bash
# production (yetitires.com)
vercel deploy --prod --token <vcp_… from openclaw-morgan2 TOOLS.md>

# staging (yeti.jahdev.com)
vercel deploy --token <…>                       # preview build
vercel alias set <the-preview-url> yeti.jahdev.com
```

Then verify the LIVE host cache-busted (`curl "https://yetitires.com/?cb=$(date +%s)"`)
and grep for the new content — a READY deployment is not proof the alias moved.

`yeti.jahdev.com` carries a `gitBranch: staging` pin in the Vercel project, but
**that pin has never produced a deployment** (zero builds with `ref=staging` in
the project's history) — the domain has only ever been moved by `vercel alias set`
against a preview. Keep the `staging` branch fast-forwarded to `main` so the pin
is not misleading, but do not rely on it to ship.

CI (`.github/workflows/ci.yml`) only builds + runs `check-site.mjs`; it never
deploys. It still runs because this repo is public — Actions are disabled on the
fleet's private repos.

DNS is on Cloudflare. Email for the domain is intentionally stripped
(SPF `-all`, DMARC reject) — do NOT "fix" that.

## Stack

- Next.js 14.2 (App Router, TypeScript, Tailwind), **static export** (`output: 'export'`).
- Single source of truth: `lib/content.ts` (copy) + `lib/config.ts` (identifiers).
- Tire Finder (`lib/selector.ts`): deterministic mapping to tire TYPES —
  never fabricated brands or prices.
- No backend. Lead form uses a real `mailto:` fallback until a form endpoint is set.
- `scripts/check-site.mjs` (run in CI) enforces the honesty policy: canonical host,
  no fabricated social/brand/mailto destinations, branded 404, assets present.
- Icons: `public/favicon.svg` is the source of truth; `public/favicon.ico`
  (3-image PNG-ICO, 16/32/48, rasterized from that SVG) and
  `public/apple-touch-icon.png` are derived. The `.ico` is required because
  browsers request bare `/favicon.ico` regardless of any `<link>` tag — without
  the file that request 404s. `check-site.mjs` asserts both are exported.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
node scripts/check-site.mjs
```

## TODO (placeholders to confirm — see lib/config.ts)

- Real social handles (FB/IG/LinkedIn/X/TikTok) — currently labeled "coming soon".
- A phone number for "Call your YETI pit crew" (email is the working path today).
- Optional: GA4 measurement ID and a form endpoint (Formspree/Tally).
