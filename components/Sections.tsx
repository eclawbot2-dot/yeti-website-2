import { CONCIERGE, HOW, BENEFITS, PERFORMANCE, SUSTAINABILITY } from "@/lib/content";
import Reveal from "./Reveal";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="eyebrow">
      <span className="inline-block h-px w-6 bg-brand-500" />
      {children}
    </span>
  );
}

/* The spine of the site: the concierge value. */
export function Concierge() {
  return (
    <section id="concierge" className="bg-paper-0 py-20 sm:py-28">
      <div className="container-x">
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow>Your Concierge</Eyebrow>
            <h2 className="section-heading mt-4">{CONCIERGE.heading}</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-600">{CONCIERGE.lead}</p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CONCIERGE.values.map((v, i) => (
            <Reveal key={v.title} delay={(i % 3) * 90}>
              <div className="card h-full p-6 transition-transform duration-200 hover:-translate-y-1">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <span className="font-display text-sm font-bold">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-ink-900">{v.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function How() {
  return (
    <section id="how" className="bg-paper-50 py-20 sm:py-28">
      <div className="container-x">
        <Reveal>
          <Eyebrow>How It Works</Eyebrow>
          <h2 className="section-heading mt-4">{HOW.heading}</h2>
          <p className="mt-4 max-w-xl text-lg text-ink-600">{HOW.sub}</p>
        </Reveal>
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HOW.steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <li className="card h-full p-6">
                <span className="font-display text-4xl font-bold text-brand-200">{s.n}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink-900">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Benefits() {
  return (
    <section id="benefits" className="bg-paper-0 py-20 sm:py-28">
      <div className="container-x">
        <Reveal>
          <Eyebrow>Club Benefits</Eyebrow>
          <h2 className="section-heading mt-4">{BENEFITS.heading}</h2>
          <p className="mt-4 max-w-xl text-lg text-ink-600">{BENEFITS.sub}</p>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.items.map((b, i) => (
            <Reveal key={b.title} delay={(i % 4) * 70}>
              <div className="card h-full p-5">
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-display text-base font-semibold text-ink-900">{b.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Performance() {
  return (
    <section id="performance" className="bg-paper-50 py-20 sm:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-paper-200 shadow-lift">
            <img
              src="/images/wheel-yellow.jpg"
              alt="Sports car alloy wheel fitted with a performance tire"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </Reveal>
        <div>
          <Reveal>
            <Eyebrow>Performance</Eyebrow>
            <h2 className="section-heading mt-4">{PERFORMANCE.heading}</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-600">{PERFORMANCE.body}</p>
          </Reveal>
          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {PERFORMANCE.stats.map((s, i) => (
              <Reveal key={s.k} delay={i * 90}>
                <div className="card h-full p-4">
                  <dt className="text-xs font-bold uppercase tracking-wider text-brand-600">{s.k}</dt>
                  <dd className="mt-1 font-display text-lg font-bold text-ink-900">{s.v}</dd>
                  <dd className="mt-1 text-xs leading-snug text-ink-500">{s.note}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function Sustainability() {
  return (
    <section className="bg-paper-0 py-20 sm:py-24">
      <div className="container-x">
        <Reveal>
          <div className="grid items-stretch gap-0 overflow-hidden rounded-3xl border border-paper-200 shadow-lift md:grid-cols-2">
            <div className="order-2 bg-carbon-950 p-8 sm:p-12 md:order-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                {SUSTAINABILITY.badge}
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                {SUSTAINABILITY.heading}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/75">{SUSTAINABILITY.body}</p>
            </div>
            <div className="order-1 min-h-[260px] md:order-2">
              <img
                src="/images/wheel-chrome.jpg"
                alt="Detail of a polished performance alloy wheel"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
