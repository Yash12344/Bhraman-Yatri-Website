import type { LucideIcon } from "lucide-react";

/**
 * UI-level types. Trek content types live in `types/trek.ts` and the derived
 * view model in `lib/treks.ts` — this file covers only presentational data.
 */

export interface HeroSlide {
  id: string;
  image: string;
  imageAlt: string;
  titleTop: string;
  titleHighlight: string;
  subtitle: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
}

export interface SelectOption {
  label: string;
  value: string;
}

/**
 * Customer testimonial. Populated from `data/testimonials.json`, which ships
 * empty — the section is hidden until the operator supplies real reviews.
 */
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  trek: string;
  rating: number;
  quote: string;
}

/**
 * An article body is a list of blocks. Alongside prose there is a `treks`
 * block, which renders live trek cards from a filter — so a guide that says
 * "our easy treks" stays correct when the trek data changes.
 */
export type BlogBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | {
      type: "treks";
      /** Any subset — matched against the derived trek view. */
      filter: {
        season?: string;
        difficulty?: string;
        region?: string;
        maxDays?: number;
        slugs?: string[];
      };
      caption?: string;
    };

/** Blog post, loaded from `data/blog/posts.json`. */
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string | null;
  tags: string[];
  body: BlogBlock[];
}
