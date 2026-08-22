import type { MetadataRoute } from "next";
import { TREKS } from "@/lib/treks";
import { getBlogPosts } from "@/lib/blog";
import { PRIVACY_POLICY, TERMS_AND_CONDITIONS } from "@/lib/legal";
import { SITE } from "@/lib/data";

/** Required by `output: "export"`: emit this once at build time. */
export const dynamic = "force-static";

/**
 * Static routes plus one entry per trek JSON and per blog post — new treks and
 * articles appear automatically, with no edit here.
 */
/**
 * Canonical form of a route: the site exports one directory per page
 * (`trailingSlash: true`), so the trailing-slash spelling is the one that is
 * served directly and the one the canonical tags use. Listing it here keeps
 * the sitemap from pointing every crawler at a redirect.
 */
function canonical(path: string): string {
  return path === "" ? `${SITE.url}/` : `${SITE.url}${path}/`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/treks",
    "/gallery",
    "/blog",
    "/contact",
  ].map((path) => ({
    url: canonical(path),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  // Rarely change and are never the landing page for a search, but they
  // should still be indexed.
  const legalRoutes = [PRIVACY_POLICY, TERMS_AND_CONDITIONS].map((doc) => ({
    url: canonical(`/${doc.slug}`),
    lastModified: new Date(doc.lastUpdated),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  const trekRoutes = TREKS.map((trek) => ({
    url: canonical(`/treks/${trek.slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const blogRoutes = getBlogPosts().map((post) => ({
    url: canonical(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...trekRoutes, ...blogRoutes, ...legalRoutes];
}
