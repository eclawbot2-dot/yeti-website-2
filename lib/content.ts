// All site copy in one place (single source of truth). Concierge-forward,
// benefit-led, honest. No fabricated stats, reviews, brands, or prices.

export const NAV = [
  { label: "Tire Finder", href: "#finder" },
  { label: "Your Concierge", href: "#concierge" },
  { label: "How It Works", href: "#how" },
  { label: "Benefits", href: "#benefits" },
  { label: "FAQ", href: "#faq" },
];

export const HERO = {
  eyebrow: "Your Automotive Concierge",
  title: "The right tires, handled for you —",
  titleAccent: "built for the road ahead.",
  sub: "Skip the spec sheets and the showroom. Answer a few quick questions and your personal YETI™ pit crew sources the right tires, at the best price, and coordinates the install near you.",
  trust: "No commitments. No upsell games. A real pit crew in your corner.",
};

// ---- Concierge value (the spine of the site) ----
export const CONCIERGE = {
  heading: "A real pit crew, not a shopping cart",
  lead: "Anyone can sell you a tire. YETI™ gives you a person who owns the whole job — so you never decode a spec sheet, chase a shop, or overpay again.",
  values: [
    {
      title: "A dedicated human",
      body: "One concierge who knows your vehicle and how you drive — not a call center, not a chatbot. Same crew, every time.",
    },
    {
      title: "We do the research",
      body: "Load index, speed rating, fitment, tread-wear, all-weather grip — we translate the jargon and bring you the right call.",
    },
    {
      title: "Best price, sourced for you",
      body: "We shop our preferred network and bring you the best price we can secure. Clear and straight — no upsell theater.",
    },
    {
      title: "Install, coordinated",
      body: "We ship to a trusted shop near you and book the appointment. You just show up — or we arrange it around your schedule.",
    },
    {
      title: "We remember, so you don't",
      body: "Seasonal swaps, replacement reminders before tread runs low, records of what's on your car. Handled in the background.",
    },
    {
      title: "One relationship",
      body: "Tires, rotations, seasons, the next set — one point of contact for the life of your vehicle. That's the club.",
    },
  ],
};

// ---- Tire Finder (splash app) labels ----
export const FINDER = {
  eyebrow: "Free • 30 seconds",
  heading: "Find your tire in 30 seconds",
  sub: "Tell us a little about your driving. We'll point you to the right type of tire — then your concierge sources the exact set.",
  restart: "Start over",
  resultEyebrow: "Your recommended tire type",
  resultCtaLead: "Want your pit crew to source the exact set at the best price?",
  resultCta: "Get my tire match",
  resultNote: "No commitment. We'll reply with options and pricing — you decide.",
  back: "Back",
};

export const HOW = {
  heading: "How it works",
  sub: "You drive. We handle the rest.",
  steps: [
    { n: "01", title: "Tell us your ride", body: "Your vehicle, your climate, how you drive. Use the tire finder above — 30 seconds." },
    { n: "02", title: "Your concierge matches", body: "A real person confirms fitment and recommends the right tires at the best price." },
    { n: "03", title: "We ship + schedule", body: "We ship to a trusted shop near you and coordinate the install on your schedule." },
    { n: "04", title: "Drive on — we remember", body: "You roll out on the right rubber, with reminders before you ever run low." },
  ],
};

export const BENEFITS = {
  heading: "Everything tires, handled",
  sub: "Membership is the easy button — your concierge covers all of it.",
  items: [
    { title: "Concierge support", body: "A dedicated pit crew that owns the whole job." },
    { title: "Fitment guidance", body: "Exact sizing confirmed for your vehicle — no mismatches." },
    { title: "Product recommendations", body: "Tires matched to your driving, climate, and budget." },
    { title: "Install coordination", body: "We line up the install with a trusted shop near you." },
    { title: "Seasonal assistance", body: "Winter, summer, all-season — switched on your schedule." },
    { title: "Replacement reminders", body: "A heads-up before tread runs low. Never caught out." },
    { title: "Best-price sourcing", body: "Preferred network pricing, brought to you straight." },
    { title: "One point of contact", body: "No phone trees. The same crew, every time." },
  ],
};

export const PERFORMANCE = {
  heading: "Held to a performance standard",
  body:
    "Every tire we recommend has to earn it. We hold our picks to industry standards for tread-wear, grip, and handling across wet, dry, and winter conditions — so the tire on your car is the right tool for the road, not just whatever's in stock.",
  stats: [
    { k: "Tread-wear", v: "Rated & matched", note: "to how far and how hard you drive" },
    { k: "All-weather grip", v: "Wet · dry · winter", note: "handling verified across conditions" },
    { k: "Fitment", v: "100% confirmed", note: "exact sizing for your vehicle" },
  ],
};

export const SUSTAINABILITY = {
  heading: "Recycle a set, for every set",
  body:
    "For every set of tires we sell, YETI™ recycles a set. Old rubber doesn't belong in a landfill — it becomes roads, playgrounds, and fuel. Performance and responsibility ride together.",
  badge: "1 sold = 1 recycled",
};

export const FAQ = {
  heading: "Questions, answered",
  items: [
    { q: "What does it cost to join?", a: "There are no commitments and no membership games — you get the best tires at the best price we can secure, with the concierge service built in. Use the tire finder or reach out and your pit crew will walk you through it." },
    { q: "Do I have to come into a shop?", a: "No. The whole point is remote. We handle selection, pricing, and shipping, then coordinate the install with a trusted shop near you." },
    { q: "How do you pick my tires?", a: "Your concierge matches tires to your exact vehicle fitment, your climate, and how you drive — then confirms sizing before anything ships. The tire finder gives you a head start." },
    { q: "What if I don't know what I need?", a: "That's exactly what the club is for. Tell us the car and how you use it; we translate that into the right tire and the right price." },
    { q: "Do you really recycle tires?", a: "Yes — for every set sold, we recycle a set. It's part of how the club operates." },
  ],
};

export const JOIN = {
  heading: "Join the YETI™ Tire Club",
  sub: "No commitments, just the best tires at the best prices — with a pit crew in your corner.",
  cta: "Call your YETI pit crew",
  formLead: "Tell us your ride and we'll take it from here.",
  fields: {
    name: "Your name",
    email: "Email",
    vehicle: "Year / Make / Model",
    message: "How and where do you drive? (optional)",
    submit: "Get my tire match",
  },
  success: "Thanks — your pit crew will be in touch shortly.",
};

export const FOOTER = {
  blurb: "Your automotive concierge. The right tires, at the best price, handled for you.",
  rights: "YETI™ is a trademark of YETI Tires. All rights reserved.",
};
