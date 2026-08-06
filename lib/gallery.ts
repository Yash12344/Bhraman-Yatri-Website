/**
 * Filesystem-backed image discovery. Server-only — import this from server
 * components and metadata generators, never from a "use client" module.
 *
 * Galleries are built by listing directories, so the client can add photos by
 * dropping files into `public/site-images/...` with no code change.
 */
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { TREKS } from "@/lib/treks";
import { trekCardImage, trekGalleryDir } from "@/lib/images";

const PUBLIC_DIR = join(process.cwd(), "public");
const IMAGE_EXTENSIONS = /\.(jpe?g|png|webp|avif)$/i;

export interface GalleryImage {
  src: string;
  alt: string;
}

/** Image files inside a public/ directory, sorted for stable output. */
function listImages(publicPath: string): string[] {
  const absolute = join(PUBLIC_DIR, publicPath);
  if (!existsSync(absolute)) return [];
  return readdirSync(absolute)
    .filter((file) => IMAGE_EXTENSIONS.test(file))
    .sort()
    .map((file) => `${publicPath}/${file}`);
}

/**
 * A trek's gallery: every file in its optional gallery folder, always led by
 * its main image so the section is never empty.
 */
export function getTrekGallery(slug: string, name: string): GalleryImage[] {
  const extra = listImages(trekGalleryDir(slug)).map((src, index) => ({
    src,
    alt: `${name} — photo ${index + 2}`,
  }));
  return [{ src: trekCardImage(slug), alt: name }, ...extra];
}

/** Site-wide gallery: one hero image per trek, plus any loose gallery photos. */
export function getSiteGallery(): GalleryImage[] {
  const trekImages: GalleryImage[] = TREKS.map((trek) => ({
    src: trek.image,
    alt: trek.imageAlt,
  }));

  const extras: GalleryImage[] = TREKS.flatMap((trek) =>
    listImages(trekGalleryDir(trek.slug)).map((src, index) => ({
      src,
      alt: `${trek.name} — photo ${index + 2}`,
    }))
  );

  return [...trekImages, ...extras];
}
