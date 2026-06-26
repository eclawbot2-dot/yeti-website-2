// Single source of truth for external identifiers and derived URLs.
// Anything not yet confirmed is marked with a TODO and surfaced to the user.

export const SITE = {
  name: "YETI™ Tires",
  shortName: "YETI Tires",
  domain: "yeti2.jahdev.com",
  url: "https://yeti2.jahdev.com",
  tagline: "Your Automotive Concierge. Built for the Road Ahead.",
  description:
    "YETI™ Tires is your automotive concierge — a members club that handles tire selection, pricing, shipping and install coordination for you, remotely. The best tires at the best price, no hassle.",
  // Contact
  email: "Info@YetiTires.com", // confirmed brand address
  // TODO: confirm a real phone number for the "Call your Yeti Pit Crew" CTA. Until then, no tel: link is rendered.
  phone: "", // empty => CTA falls back to email, no fake number
  established: 2022,
};

// Social links. Only render a link when we have a VERIFIED handle.
// TODO: confirm the real YETI Tires handles before these go live; until confirmed
// they render as labeled "coming soon" placeholders (no guessed URLs).
export const SOCIAL: { label: string; href: string | null }[] = [
  { label: "Instagram", href: null },
  { label: "Facebook", href: null },
  { label: "LinkedIn", href: null },
  { label: "X", href: null },
  { label: "TikTok", href: null },
];

// Lead-capture form. TODO: swap in the real Formspree/Tally endpoint when provided.
// Until then the Join form uses a mailto fallback (which is a real, working path).
export const FORM_ENDPOINT: string | null = null;

// Analytics. TODO: provide a real GA4 measurement ID (G-XXXXXXX) to enable.
export const GA_MEASUREMENT_ID: string | null = null;

export const hasSocial = SOCIAL.some((s) => s.href);
