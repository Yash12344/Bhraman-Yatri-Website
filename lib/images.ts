/**
 * Image paths are resolved by convention rather than stored in the trek JSON,
 * so a new trek needs only a JSON file plus an image named after its slug.
 *
 * Safe to import from client components — this module touches no filesystem.
 * Directory listing (for per-trek galleries) lives in `lib/gallery.ts`, which
 * is server-only.
 */

export const TREK_IMAGE_DIR = "/site-images/treks";
export const HERO_IMAGE_DIR = "/site-images/hero";
export const GENERAL_IMAGE_DIR = "/site-images/general";
/**
 * The client's drop folder. Any number of images, any filenames, nested
 * folders welcome — everything here appears on the gallery page.
 */
export const GALLERY_DIR = "/site-images/gallery";
export const BLOG_IMAGE_DIR = "/site-images/blog";

/** Card and banner image for a trek: /site-images/treks/{slug}.jpg */
export function trekCardImage(slug: string): string {
  return `${TREK_IMAGE_DIR}/${slug}.jpg`;
}

/** Optional per-trek gallery folder: /site-images/treks/gallery/{slug}/ */
export function trekGalleryDir(slug: string): string {
  return `${TREK_IMAGE_DIR}/gallery/${slug}`;
}

export const ENQUIRY_BACKGROUND = `${GENERAL_IMAGE_DIR}/enquiry-form-background.jpg`;
