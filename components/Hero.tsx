import { HERO, FINDER } from "@/lib/content";
import TireSelector from "./TireSelector";
import HeroVideo from "./HeroVideo";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Background: road photo is the always-on base (LCP + mobile + reduced-motion
          fallback). The looping drive video layers on top on larger screens only —
          client-mounted (HeroVideo) so hidden-video users never download the mp4. */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/hero-road.jpg"
          alt="A winding mountain road through snow-dusted peaks — the road ahead"
          className="absolute inset-0 h-full w-full object-cover object-center"
          fetchPriority="high"
          decoding="async"
        />
        <HeroVideo />
        <div className="absolute inset-0 bg-gradient-to-r from-carbon-950/80 via-carbon-950/45 to-carbon-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon-950/70 via-transparent to-carbon-950/30" />
      </div>

      <div className="container-x grid items-center gap-10 pb-16 pt-28 sm:pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-24">
        {/* Left: concierge value proposition */}
        <div className="animate-fade-up">
          <span className="eyebrow-on-photo">
            <span className="inline-block h-px w-6 bg-brand-400" />
            {HERO.eyebrow}
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white drop-shadow sm:text-5xl md:text-[3.4rem]">
            {HERO.title}{" "}
            <span className="text-brand-400">{HERO.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">{HERO.sub}</p>
          <p className="mt-6 text-sm font-medium text-white/65">{HERO.trust}</p>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
            {["Best-price sourcing", "Install coordinated", "Reminders handled"].map((t) => (
              <li key={t} className="inline-flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-brand-400">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: the Tire Finder app — front and center */}
        <div id="finder" className="animate-fade-up scroll-mt-24" style={{ animationDelay: "120ms" }}>
          <div className="mb-3 text-center lg:text-left">
            <h2 className="font-display text-base font-bold uppercase tracking-wider text-white/90">{FINDER.heading}</h2>
          </div>
          <TireSelector />
        </div>
      </div>
    </section>
  );
}
