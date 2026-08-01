// Post-build static-output audit. Run after `next build` (output: 'export').
//
// Enforces this site's honesty policy:
//  - canonical/sitemap/OG must point at the production host (https://yetitires.com)
//  - NO fabricated external destinations: social links stay non-linking
//    "coming soon" placeholders until verified in lib/config.ts
//  - mailto: is allowed ONLY to the confirmed brand address Info@YetiTires.com
//  - NO fabricated tire brands anywhere (the Tire Finder recommends tire TYPES,
//    never brands or prices)
//  - referenced local assets must exist in the export; 404 must be branded
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = fileURLToPath(new URL('../out', import.meta.url));
// Keep in sync with SITE.url in lib/config.ts (canonical public origin).
const SITE_URL = 'https://yetitires.com';
const ALLOWED_MAILTO = 'info@yetitires.com'; // case-insensitive compare

const ALLOWED_HOSTS = new Set(['www.googletagmanager.com']); // GA loads only when GA_MEASUREMENT_ID is set

// Unverified/forbidden destinations — must never appear as links.
const FORBIDDEN = [
  /instagram\.com/i,
  /facebook\.com/i,
  /tiktok\.com/i,
  /twitter\.com/i,
  /(^|[^a-z0-9.])x\.com/i,
  /linkedin\.com/i,
  /localhost/i,
  /127\.0\.0\.1/,
  /yeti2?\.jahdev\.com/i, // stale staging hosts must not leak into canonical output
];

// Real tire manufacturers — none may be named: we never fabricate brand
// availability, endorsements, or prices.
const TIRE_BRANDS =
  /\b(Michelin|Goodyear|Bridgestone|Pirelli|Continental|Firestone|Dunlop|Yokohama|Hankook|BFGoodrich|Nokian|Falken|Toyo|Kumho|Nitto|General Tire)\b/i;

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* htmlFiles(p);
    else if (name.endsWith('.html')) yield p;
  }
}

let failures = 0;
const fail = (msg) => {
  failures++;
  console.error(`FAIL: ${msg}`);
};

if (!existsSync(OUT)) {
  console.error(`FAIL: out/ not found at ${OUT} — run \`next build\` first.`);
  process.exit(1);
}

// 1. Exported artifacts exist.
for (const f of [
  'index.html',
  '404.html',
  'sitemap.xml',
  'robots.txt',
  'favicon.svg',
  // Not redundant with favicon.svg: browsers request bare /favicon.ico whether
  // or not a <link> advertises it, so a missing file here is a live 404.
  'favicon.ico',
  'apple-touch-icon.png',
  'site.webmanifest',
  'images/og.jpg',
  'images/hero-road.jpg',
  'images/wheel-yellow.jpg',
  'images/wheel-chrome.jpg',
  'videos/road.mp4',
]) {
  if (!existsSync(join(OUT, f))) fail(`missing out/${f}`);
}

// 2. Sitemap + robots point at the canonical host only.
if (existsSync(join(OUT, 'sitemap.xml'))) {
  const sm = readFileSync(join(OUT, 'sitemap.xml'), 'utf8');
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (locs.length === 0) fail('sitemap.xml has no <loc> entries');
  for (const loc of locs) {
    if (!loc.startsWith(SITE_URL)) fail(`sitemap loc not on canonical host: ${loc}`);
  }
}
if (existsSync(join(OUT, 'robots.txt'))) {
  const robots = readFileSync(join(OUT, 'robots.txt'), 'utf8');
  if (!robots.includes(`${SITE_URL}/sitemap.xml`)) fail('robots.txt sitemap not on canonical host');
}

// 3. Canonical tag on the home page.
{
  const home = readFileSync(join(OUT, 'index.html'), 'utf8');
  // attribute-order independent (Next may reorder attributes across versions)
  const canon = home.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/) || home.match(/<link[^>]*href="([^"]+)"[^>]*rel="canonical"/);
  if (!canon) fail('index.html: no canonical link');
  else if (canon[1] !== `${SITE_URL}/`) fail(`index.html: canonical is ${canon[1]}, expected ${SITE_URL}/`);
}

// 4. HTML pages: forbidden destinations, unknown external hosts, mailto policy,
//    fabricated tire brands, broken local asset references.
let pages = 0;
for (const file of htmlFiles(OUT)) {
  pages++;
  const html = readFileSync(file, 'utf8');
  const rel = file.slice(OUT.length);

  for (const re of FORBIDDEN) {
    if (re.test(html)) fail(`${rel}: matches forbidden pattern ${re}`);
  }

  const brand = html.match(TIRE_BRANDS);
  if (brand) fail(`${rel}: names a real tire brand ("${brand[0]}") — we never fabricate brand claims`);

  for (const m of html.matchAll(/mailto:([^"?\\]+)/gi)) {
    if (m[1].toLowerCase() !== ALLOWED_MAILTO) fail(`${rel}: mailto to unverified address ${m[1]}`);
  }

  for (const m of html.matchAll(/(?:href|src)="(https?:\/\/[^"]+)"/g)) {
    let host;
    try {
      host = new URL(m[1]).hostname;
    } catch {
      fail(`${rel}: unparseable external URL ${m[1]}`);
      continue;
    }
    if (host === 'yetitires.com' || ALLOWED_HOSTS.has(host)) continue;
    fail(`${rel}: link to unverified external host ${host} (${m[1]})`);
  }

  for (const m of html.matchAll(
    /(?:(?:href|src)="|url\()(\/images\/[^")]+|\/videos\/[^")]+|\/favicon[^")]*|\/apple-touch-icon[^")]*)["\)]/g,
  )) {
    const asset = decodeURIComponent(m[1].split('?')[0]);
    if (!existsSync(join(OUT, asset))) fail(`${rel}: references missing asset ${asset}`);
  }
}
// home + 404 (+ Next's internal /_not-found stub if emitted)
if (pages < 2) fail(`only ${pages} HTML pages exported — expected at least home + 404`);

// 5. 404 must be the branded one, not Next's default.
if (existsSync(join(OUT, '404.html'))) {
  const p404 = readFileSync(join(OUT, '404.html'), 'utf8');
  if (p404.includes('This page could not be found')) {
    fail('404.html is the unbranded Next default');
  }
}

if (failures) {
  console.error(`\ncheck-site: ${failures} failure(s) across ${pages} pages`);
  process.exit(1);
}
console.log(`check-site: OK — ${pages} pages, honesty policy + artifacts verified`);
