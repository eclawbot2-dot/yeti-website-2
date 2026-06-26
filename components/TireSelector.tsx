"use client";

import { useState } from "react";
import { QUESTIONS, recommend, type Answers, type IconKey } from "@/lib/selector";
import { FINDER } from "@/lib/content";
import { SITE } from "@/lib/config";

function Icon({ k, className = "h-6 w-6" }: { k: IconKey; className?: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<IconKey, React.ReactNode> = {
    car: <><path {...p} d="M3 13l2-5a3 3 0 012.8-2h8.4A3 3 0 0119 8l2 5v4h-2M5 17H3v-4" /><path {...p} d="M3 17h18" /><circle cx="7.5" cy="17.5" r="1.8" {...p} /><circle cx="16.5" cy="17.5" r="1.8" {...p} /></>,
    suv: <><path {...p} d="M3 12l1.5-5h12L20 12v5h-2M4 17H3v-5h17" /><circle cx="7.5" cy="17.5" r="1.8" {...p} /><circle cx="16.5" cy="17.5" r="1.8" {...p} /></>,
    sport: <><path {...p} d="M2 14l3-3 4-1 5-2h4l4 3v3h-2M3 14v3h1" /><circle cx="7" cy="17.5" r="1.8" {...p} /><circle cx="17" cy="17.5" r="1.8" {...p} /></>,
    ev: <><path {...p} d="M4 13l1.5-4.5A2.5 2.5 0 018 7h6.5a2.5 2.5 0 012.4 1.6L18 13v4h-2M6 17H4v-4h14" /><path {...p} d="M11 4l-2 4h3l-2 4" /></>,
    snow: <><path {...p} d="M12 3v18M5 7l14 10M19 7L5 17" /><path {...p} d="M12 6l-2 2m2-2l2 2M12 18l-2-2m2 2l2-2" /></>,
    seasons: <><circle cx="12" cy="12" r="4" {...p} /><path {...p} d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" /></>,
    sun: <><circle cx="12" cy="12" r="4.5" {...p} /><path {...p} d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" /></>,
    rain: <><path {...p} d="M7 13a4 4 0 01.5-8 5 5 0 019.5 1.5A3.5 3.5 0 0117 13H7z" /><path {...p} d="M8 17l-1 2M12 17l-1 2M16 17l-1 2" /></>,
    commute: <><circle cx="12" cy="12" r="9" {...p} /><path {...p} d="M12 7v5l3 2" /></>,
    highway: <><path {...p} d="M6 21L9 3M18 21L15 3" /><path {...p} d="M12 5v3M12 11v3M12 17v2" /></>,
    track: <><path {...p} d="M5 19c-2-6 2-12 7-12s5 4 3 6-6 1-6 3 3 3 5 1" /><circle cx="5" cy="19" r="1.4" {...p} /></>,
    trail: <><path {...p} d="M3 18l5-9 3 5 3-7 4 11" /><path {...p} d="M3 18h18" /></>,
  };
  return <svg viewBox="0 0 24 24" className={className} aria-hidden="true">{paths[k]}</svg>;
}

export default function TireSelector() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const total = QUESTIONS.length;
  // `done` is the single source of truth for the result view: it is only true
  // once every question has been answered (step advances exactly once per
  // answer). This invariant is what makes the `rec!` non-null assertions in the
  // result branch safe — `rec` is always computed when `done`.
  const done = step >= total;

  function choose(qid: string, cid: string) {
    setAnswers((a) => ({ ...a, [qid]: cid }));
    setStep((s) => s + 1);
  }
  function back() {
    setStep((s) => Math.max(0, s - 1));
  }
  function restart() {
    setAnswers({});
    setStep(0);
  }

  const rec = done ? recommend(answers) : null;

  function labelFor(qid: string) {
    const q = QUESTIONS.find((x) => x.id === qid);
    return q?.choices.find((c) => c.id === answers[qid as keyof Answers])?.label ?? "";
  }

  function mailtoHref() {
    const lines = [
      `Recommended tire type: ${rec?.type}`,
      "",
      `Vehicle: ${labelFor("vehicle")}`,
      `Climate: ${labelFor("climate")}`,
      `Driving: ${labelFor("driving")}`,
      "",
      "Please source the best set at the best price and let me know options + install near me.",
    ];
    return `mailto:${SITE.email}?subject=${encodeURIComponent(`Tire match: ${rec?.type}`)}&body=${encodeURIComponent(lines.join("\n"))}`;
  }

  function onGetMatch() {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "generate_lead", { method: "tire_finder", tire_type: rec?.type });
    }
  }

  return (
    <div className="card overflow-hidden p-6 sm:p-7">
      {/* progress */}
      <div className="mb-5 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-600">
          {FINDER.eyebrow}
        </span>
        {!done ? (
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {QUESTIONS.map((_, i) => (
              <span key={i} className={`h-1.5 rounded-full transition-all ${i === step ? "w-6 bg-brand-500" : i < step ? "w-3 bg-brand-300" : "w-3 bg-paper-200"}`} />
            ))}
          </div>
        ) : (
          <button onClick={restart} className="text-xs font-semibold text-ink-500 hover:text-brand-600">
            {FINDER.restart}
          </button>
        )}
      </div>

      {!done ? (
        <div key={step}>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">
            Step {step + 1} of {total}
          </p>
          <h3 className="mt-1 font-display text-xl font-bold text-ink-900 sm:text-2xl">{QUESTIONS[step].title}</h3>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {QUESTIONS[step].choices.map((c) => (
              <button
                key={c.id}
                onClick={() => choose(QUESTIONS[step].id, c.id)}
                className="group flex flex-col items-start gap-3 rounded-xl border border-paper-200 bg-white p-4 text-left transition-all hover:border-brand-400 hover:bg-brand-50 hover:shadow-card focus-visible:border-brand-500"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-paper-50 text-ink-700 transition-colors group-hover:bg-white group-hover:text-brand-600">
                  <Icon k={c.icon} />
                </span>
                <span className="text-sm font-semibold leading-tight text-ink-900">{c.label}</span>
              </button>
            ))}
          </div>
          {step > 0 && (
            <button onClick={back} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-ink-900">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {FINDER.back}
            </button>
          )}
        </div>
      ) : (
        <div className="animate-fade-up">
          <p className="eyebrow">{FINDER.resultEyebrow}</p>
          <h3 className="mt-2 font-display text-2xl font-bold text-ink-900 sm:text-3xl">{rec!.type}</h3>
          <p className="mt-1 text-[15px] font-medium text-brand-600">{rec!.tagline}</p>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{rec!.why}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {rec!.bestFor.map((t) => (
              <span key={t} className="rounded-full bg-paper-50 px-3 py-1 text-xs font-semibold text-ink-700">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-6 rounded-xl bg-paper-50 p-4">
            <p className="text-sm font-medium text-ink-700">{FINDER.resultCtaLead}</p>
            <a href={mailtoHref()} onClick={onGetMatch} className="btn-primary mt-3 w-full">
              {FINDER.resultCta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <p className="mt-2 text-center text-xs text-ink-500">{FINDER.resultNote}</p>
          </div>
        </div>
      )}
    </div>
  );
}
