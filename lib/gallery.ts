/**
 * Filesystem-backed image discovery. Server-only — import this from server
 * components and metadata generators, never from a "use client" module.
 *
 * Galleries are built by walking directories, so the client adds photos by
 * dropping files into `public/site-images/...`. There is no limit on how many,
 * no naming convention to follow and no code to change.
 */
import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { TREKS } from "@/lib/treks";
import {
  BLOG_IMAGE_DIR,
  GALLERY_DIR,
  trekCardImage,
  trekGalleryDir,
} from "@/lib/images";

const PUBLIC_DIR = join(process.cwd(), "public");
const IMAGE_EXTENSIONS = /\.(jpe?g|png|webp|avif)$/i;

export interface GalleryImage {
  src: string;
  alt: string;
}

const GENERIC_ALT = "Bhraman Yatri trek photograph";

/** What phones and cameras name files when nobody has renamed them. */
const CAMERA_FILENAME =
  /^(img|dsc|dscn|dscf|pxl|gopr|p|photo|image|picture|screenshot|whatsapp image|received)$/i;

/**
 * Turns a filename into readable alt text: "kedarkantha-summit-01.jpg"
 * becomes "Kedarkantha summit". Trailing counters and separators are dropped,
 * so the client gets sensible alt text just by naming files descriptively —
 * and untouched camera filenames like "IMG_4821.jpg" fall back to a generic
 * description rather than producing the useless alt text "IMG".
 */
function altFromFilename(file: string): string {
  const base = file
    .replace(IMAGE_EXTENSIONS, "")
    .replace(/[-_]+\d+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!base || CAMERA_FILENAME.test(base)) return GENERIC_ALT;
  return base.charAt(0).toUpperCase() + base.slice(1);
}

/**
 * Every image inside a public/ directory, including nested folders, so the
 * client can organise photos into subfolders (by trek, by year, by batch)
 * and they all still appear.
 */
function listImagesRecursive(publicPath: string): GalleryImage[] {
  const absolute = join(PUBLIC_DIR, publicPath);
  if (!existsSync(absolute)) return [];

  const found: GalleryImage[] = [];
  for (const entry of readdirSync(absolute).sort()) {
    const entryPublicPath = `${publicPath}/${entry}`;
    if (statSync(join(absolute, entry)).isDirectory()) {
      found.push(...listImagesRecursive(entryPublicPath));
    } else if (IMAGE_EXTENSIONS.test(entry)) {
      found.push({ src: entryPublicPath, alt: altFromFilename(entry) });
    }
  }
  return found;
}

/**
 * A trek's gallery: every file in its optional gallery folder, always led by
 * its main image so the section is never empty.
 */
export function getTrekGallery(slug: string, name: string): GalleryImage[] {
  const extra = listImagesRecursive(trekGalleryDir(slug)).map((image, index) => ({
    src: image.src,
    // Prefer a descriptive filename; fall back to the trek name.
    alt: image.alt === GENERIC_ALT
      ? `${name} — photo ${index + 2}`
      : `${name} — ${image.alt}`,
  }));
  return [{ src: trekCardImage(slug), alt: name }, ...extra];
}

/**
 * The site-wide gallery, in priority order:
 *   1. anything in public/site-images/gallery (the client's drop folder)
 *   2. per-trek gallery folders
 *   3. each trek's main image, so the page is never empty
 */
export function getSiteGallery(): GalleryImage[] {
  const uploaded = listImagesRecursive(GALLERY_DIR);

  const perTrek = TREKS.flatMap((trek) =>
    listImagesRecursive(trekGalleryDir(trek.slug)).map((image) => ({
      src: image.src,
      alt: `${trek.name} — ${image.alt}`,
    }))
  );

  const trekCovers: GalleryImage[] = TREKS.map((trek) => ({
    src: trek.image,
    alt: trek.imageAlt,
  }));

  const all = [...uploaded, ...perTrek, ...trekCovers];

  // A trek cover may also live in the drop folder; show each file once.
  const seen = new Set<string>();
  return all.filter((image) => {
    if (seen.has(image.src)) return false;
    seen.add(image.src);
    return true;
  });
}

/** Count only, for pages that want a figure without loading the list twice. */
export function getGalleryCount(): number {
  return getSiteGallery().length;
}

/**
 * A post's header image. The client can override any article's picture by
 * dropping a file named after the post's slug into public/site-images/blog —
 * no extension to remember, no JSON to edit. Falls back to the image named in
 * `data/blog/posts.json`.
 */
export function blogImage(slug: string, fallback: string | null): string | null {
  const dir = join(PUBLIC_DIR, BLOG_IMAGE_DIR);
  if (existsSync(dir)) {
    const match = readdirSync(dir)
      .sort()
      .find(
        (file) =>
          IMAGE_EXTENSIONS.test(file) &&
          file.replace(IMAGE_EXTENSIONS, "").toLowerCase() === slug
      );
    if (match) return `${BLOG_IMAGE_DIR}/${match}`;
  }
  return fallback;
}
