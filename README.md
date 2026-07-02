# YETI™ Tires — yetitires.com

Marketing site for YETI Tires, the automotive concierge tire club. Photo-forward
light theme with the red/orange brand accent (`#f24f1e`) and a looping background
drive video in the hero (photo base = LCP + mobile + reduced-motion fallback).

## Hosting

One Vercel project (`yeti-website-2`) serves BOTH:

- **yetitires.com** (+ `www` 308 → apex) — PRODUCTION. Deploys via
  `vercel deploy --prod`.
- **yeti.jahdev.com** — staging alias (domain pinned to `gitBranch: staging`;
  historically pointed at a preview deployment via `vercel alias set`).

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
