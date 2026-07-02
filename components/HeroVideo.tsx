"use client";

import { useEffect, useState } from "react";

// Fleet class #46: a CSS-hidden autoplay <video> still DOWNLOADS the full mp4 —
// display:none only hides it. So the video element is mounted client-side, and
// only for viewports/users that will actually see it play:
//   - desktop-width viewports (mobile shows the photo only)
//   - no prefers-reduced-motion
//   - no Save-Data request
// The SSR'd hero photo underneath is the always-on base (LCP, no-JS, fallback),
// so skipping the video here never hides content. The CSS hide classes stay on
// as belt-and-braces for live preference flips.
export default function HeroVideo() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    const update = () => setShow(desktop.matches && !reduced.matches && !saveData);
    update();
    // Older Safari (≤13) only has the deprecated addListener API.
    if (typeof desktop.addEventListener === "function") {
      desktop.addEventListener("change", update);
      reduced.addEventListener("change", update);
      return () => {
        desktop.removeEventListener("change", update);
        reduced.removeEventListener("change", update);
      };
    }
    desktop.addListener(update);
    reduced.addListener(update);
    return () => {
      desktop.removeListener(update);
      reduced.removeListener(update);
    };
  }, []);

  if (!show) return null;

  return (
    <video
      className="absolute inset-0 hidden h-full w-full object-cover object-center md:block motion-reduce:!hidden"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/images/hero-road.jpg"
      aria-hidden="true"
    >
      <source src="/videos/road.mp4" type="video/mp4" />
    </video>
  );
}
