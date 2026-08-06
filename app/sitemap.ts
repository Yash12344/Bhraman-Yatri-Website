import type { MetadataRoute } from "next";
import { TREKS } from "@/lib/treks";
import { SITE } from "@/lib/data";

/** Static routes plus one entry per trek JSON — new treks appear automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = ["", "/about", "/treks", "/gallery", "/blog", "/contact"].map(
    (path) => ({
      url: `${SITE.url}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })
  );

  const trekRoutes = TREKS.map((trek) => ({
    url: `${SITE.url}/treks/${trek.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...trekRoutes];
}
