/**
 * Blog loading and block resolution.
 *
 * Posts live in `data/blog/posts.json`. Their bodies are blocks of prose plus
 * `treks` blocks, which resolve against the live trek data — so a guide that
 * lists "our winter treks" updates itself when a trek is added or its season
 * changes. Nothing about the treks is restated by hand.
 */
import type { BlogBlock, BlogPost } from "@/lib/types";
import { TREKS, type TrekView } from "@/lib/treks";
import type { SeasonId } from "@/lib/seasons";
import postsData from "@/data/blog/posts.json";

const POSTS = postsData as BlogPost[];

/** Newest first. */
export function getBlogPosts(): BlogPost[] {
  return [...POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return POSTS.find((post) => post.slug === slug);
}

export function getBlogSlugs(): string[] {
  return POSTS.map((post) => post.slug);
}

/** Treks matching a `treks` block's filter, in the site's default order. */
export function resolveTrekBlock(
  filter: Extract<BlogBlock, { type: "treks" }>["filter"]
): TrekView[] {
  return TREKS.filter((trek) => {
    if (filter.slugs && !filter.slugs.includes(trek.slug)) return false;
    if (filter.season && !trek.seasons.includes(filter.season as SeasonId)) {
      return false;
    }
    if (
      filter.difficulty &&
      trek.difficultyLabel.toLowerCase() !== filter.difficulty.toLowerCase()
    ) {
      return false;
    }
    if (
      filter.region &&
      trek.regionSlug !== filter.region.toLowerCase() &&
      trek.regionLabel.toLowerCase() !== filter.region.toLowerCase()
    ) {
      return false;
    }
    if (
      filter.maxDays != null &&
      (trek.durationDays == null || trek.durationDays > filter.maxDays)
    ) {
      return false;
    }
    return true;
  });
}

/** Rough reading time from the prose blocks, at 200 words per minute. */
export function readingTime(post: BlogPost): number {
  const words = post.body.reduce((total, block) => {
    if (block.type === "paragraph" || block.type === "quote") {
      return total + block.text.split(/\s+/).length;
    }
    if (block.type === "heading") return total + block.text.split(/\s+/).length;
    if (block.type === "list") {
      return total + block.items.join(" ").split(/\s+/).length;
    }
    return total + 30; // a trek block costs the reader some scanning time
  }, 0);
  return Math.max(1, Math.round(words / 200));
}

/** Other posts to suggest at the end of an article. */
export function getRelatedPosts(slug: string, limit = 2): BlogPost[] {
  const current = getBlogPost(slug);
  if (!current) return [];

  return getBlogPosts()
    .filter((post) => post.slug !== slug)
    .map((post) => ({
      post,
      shared: post.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.shared - a.shared)
    .slice(0, limit)
    .map((entry) => entry.post);
}
