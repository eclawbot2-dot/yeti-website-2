import type { Metadata } from "next";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

// Branded 404 (fleet class #22: never ship Next's unbranded default).
// No shared Header/Footer here — their in-page anchor links (#finder, #faq…)
// only exist on the home page and would be dead on a 404 URL (fleet class #34).
export default function NotFound() {
  return (
    <main id="main" className="flex min-h-screen flex-col items-center justify-center bg-paper-0 px-6 text-center">
      <Logo className="h-14 w-14" />
      <p className="mt-8 font-display text-sm font-bold uppercase tracking-[0.2em] text-brand-600">404</p>
      <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
        This road doesn&rsquo;t go anywhere.
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-600">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved. Your pit crew is still right where you left them.
      </p>
      <a href="/" className="btn-primary mt-8">
        Back to YETI™ Tires
      </a>
    </main>
  );
}
