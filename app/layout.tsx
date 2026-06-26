import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SITE, SOCIAL, GA_MEASUREMENT_ID } from "@/lib/config";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Your Automotive Concierge — High-Performance Tires, Handled`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "tire concierge",
    "tire club",
    "performance tires",
    "buy tires online",
    "tire installation coordination",
    "best price tires",
    "YETI Tires",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — The best tires, at the best price, without the hassle`,
    description: SITE.description,
    url: SITE.url,
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "YETI Tires — a winding mountain road, built for the road ahead" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Your Automotive Concierge`,
    description: SITE.description,
    images: ["/images/og.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport = { themeColor: "#ffffff" };

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  email: SITE.email,
  slogan: SITE.tagline,
  foundingDate: String(SITE.established),
  logo: `${SITE.url}/favicon.svg`,
  image: `${SITE.url}/images/og.jpg`,
  sameAs: SOCIAL.filter((s) => s.href).map((s) => s.href as string),
  areaServed: "US",
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
