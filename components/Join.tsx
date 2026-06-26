import { JOIN } from "@/lib/content";
import { SITE } from "@/lib/config";
import JoinForm from "./JoinForm";
import Reveal from "./Reveal";

export default function Join() {
  return (
    <section id="join" className="relative overflow-hidden bg-carbon-950 py-20 sm:py-28">
      <div className="absolute inset-0 -z-0 opacity-20">
        <img src="/images/hero-road.jpg" alt="" aria-hidden="true" className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="absolute inset-0 -z-0 bg-gradient-to-b from-carbon-950/85 to-carbon-950" />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <span className="eyebrow-on-photo">
            <span className="inline-block h-px w-6 bg-brand-400" />
            Membership
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
            {JOIN.heading}
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/80">{JOIN.sub}</p>

          <a
            href={`mailto:${SITE.email}?subject=${encodeURIComponent("Call your YETI pit crew")}`}
            className="group mt-8 inline-flex items-center gap-3 text-white"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 text-white transition-colors group-hover:bg-brand-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 6h16v12H4zM4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>
              <span className="block text-xs uppercase tracking-wider text-white/55">{JOIN.cta}</span>
              <span className="font-display font-semibold text-white group-hover:text-brand-300">{SITE.email}</span>
            </span>
          </a>
        </Reveal>

        <Reveal delay={120}>
          <JoinForm />
        </Reveal>
      </div>
    </section>
  );
}
