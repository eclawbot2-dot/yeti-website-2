import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE.url}/`,
      // Manual value: bump to the current date whenever page content ships.
      lastModified: new Date("2026-07-01"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
