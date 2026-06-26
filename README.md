# YETI Tires — yeti.jahdev.com

Marketing site for YETI Tires, the automotive concierge tire club. Rebuilt with a
"Glacier Performance" design direction (carbon-dark + glacial ice-blue).

## Stack
- Next.js 14.2 (App Router, TypeScript, Tailwind), **static export** (`output: 'export'`).
- Single source of truth: `lib/content.ts` (copy) + `lib/config.ts` (identifiers).
- No backend. Lead form uses a real `mailto:` fallback until a form endpoint is set.

## Develop
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

## Deploy
Vercel (framework preset = Next.js, no `vercel.json`). Custom domain `yeti.jahdev.com`
via Cloudflare CNAME -> `cname.vercel-dns.com` (DNS-only).

## TODO (placeholders to confirm — see lib/config.ts)
- Real social handles (FB/IG/LinkedIn/X/TikTok) — currently labeled "coming soon".
- A phone number for "Call your YETI pit crew" (email is the working path today).
- Optional: GA4 measurement ID and a form endpoint (Formspree/Tally).
