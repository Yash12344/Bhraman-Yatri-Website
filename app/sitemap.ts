import type { MetadataRoute } from "next";
import { TREKS } from "@/lib/treks";
import { getBlogPosts } from "@/lib/blog";
import { SITE } from "@/lib/data";

/**
 * Static routes plus one entry per trek JSON and per blog post — new treks and
 * articles appear automatically, with no edit here.
 */
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

  const blogRoutes = getBlogPosts().map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...trekRoutes, ...blogRoutes];
}
