/**
 * The operator's own logo, discovered on disk. Server-only — import this from
 * server components, never from a "use client" module.
 *
 * The client drops a file into `public/site-images/logo/` and the site picks it
 * up. Nothing references the logo by name in code, so there is no path to keep
 * in sync and no build config to change.
 */
import { existsSync, readdirSync, openSync, readSync, closeSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { LOGO_DIR } from "@/lib/images";

const PUBLIC_DIR = join(process.cwd(), "public");
const LOGO_EXTENSIONS = /\.(svg|png|webp|jpe?g|avif)$/i;

export interface LogoAsset {
  src: string;
  width: number;
  height: number;
}

/**
 * Intrinsic pixel size, read from the file header.
 *
 * next/image needs real dimensions to reserve space before the image loads,
 * and the logo sits above the fold where a late resize is most visible. Only
 * the first bytes are read, and only the formats a logo actually arrives in.
 */
function imageSize(absolute: string): { width: number; height: number } | null {
  if (/\.svg$/i.test(absolute)) return svgSize(readFileSync(absolute, "utf8"));

  const buffer = Buffer.alloc(4096);
  const fd = openSync(absolute, "r");
  let read = 0;
  try {
    read = readSync(fd, buffer, 0, buffer.length, 0);
  } finally {
    closeSync(fd);
  }
  const head = buffer.subarray(0, read);

  // PNG: 8-byte signature, then an IHDR chunk carrying width and height.
  if (head.length > 24 && head.toString("ascii", 1, 4) === "PNG") {
    return { width: head.readUInt32BE(16), height: head.readUInt32BE(20) };
  }

  // WebP: "RIFF"…"WEBP", then a VP8 / VP8L / VP8X chunk.
  if (head.length > 30 && head.toString("ascii", 0, 4) === "RIFF" && head.toString("ascii", 8, 12) === "WEBP") {
    const chunk = head.toString("ascii", 12, 16);
    if (chunk === "VP8X") {
      return {
        width: 1 + head.readUIntLE(24, 3),
        height: 1 + head.readUIntLE(27, 3),
      };
    }
    if (chunk === "VP8L") {
      const bits = head.readUInt32LE(21);
      return { width: 1 + (bits & 0x3fff), height: 1 + ((bits >> 14) & 0x3fff) };
    }
    if (chunk === "VP8 ") {
      return {
        width: head.readUInt16LE(26) & 0x3fff,
        height: head.readUInt16LE(28) & 0x3fff,
      };
    }
  }

  // JPEG: walk the marker segments to the start-of-frame, which holds the size.
  if (head.length > 4 && head[0] === 0xff && head[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < head.length) {
      if (head[offset] !== 0xff) {
        offset += 1;
        continue;
      }
      const marker = head[offset + 1];
      // SOF0-SOF15, excluding the non-frame markers DHT, JPG and DAC.
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return {
          height: head.readUInt16BE(offset + 5),
          width: head.readUInt16BE(offset + 7),
        };
      }
      offset += 2 + head.readUInt16BE(offset + 2);
    }
  }

  return null;
}

/** SVG carries no pixels, so take the viewBox — or width/height if unitless. */
function svgSize(markup: string): { width: number; height: number } | null {
  const viewBox = markup.match(/viewBox\s*=\s*["']\s*[\d.-]+[\s,]+[\d.-]+[\s,]+([\d.]+)[\s,]+([\d.]+)/i);
  if (viewBox) {
    return { width: Math.round(Number(viewBox[1])), height: Math.round(Number(viewBox[2])) };
  }
  const width = markup.match(/\bwidth\s*=\s*["']([\d.]+)(px)?["']/i);
  const height = markup.match(/\bheight\s*=\s*["']([\d.]+)(px)?["']/i);
  if (width && height) {
    return { width: Math.round(Number(width[1])), height: Math.round(Number(height[1])) };
  }
  return null;
}

/** First file in the logo folder whose name (without extension) matches. */
function findLogoFile(basename: string): string | null {
  const dir = join(PUBLIC_DIR, LOGO_DIR);
  if (!existsSync(dir)) return null;

  const match = readdirSync(dir)
    .sort()
    .find(
      (file) =>
        LOGO_EXTENSIONS.test(file) &&
        file.replace(LOGO_EXTENSIONS, "").toLowerCase() === basename
    );
  return match ?? null;
}

function load(basename: string): LogoAsset | null {
  const file = findLogoFile(basename);
  if (!file) return null;

  const size = imageSize(join(PUBLIC_DIR, LOGO_DIR, file));
  // An unreadable header means an unusable logo; fall through to the built-in
  // mark rather than shipping an image that collapses to nothing.
  if (!size || !size.width || !size.height) return null;

  return { src: `${LOGO_DIR}/${file}`, ...size };
}

/**
 * The logo for a given background, or null when the client has not uploaded
 * one yet — in which case the built-in mark is drawn instead.
 *
 * `light` is for the dark footer: it prefers `logo-light.*` so a dark logo is
 * not lost against dark green, and falls back to the main file.
 */
export function getLogo(variant: "dark" | "light" = "dark"): LogoAsset | null {
  if (variant === "light") return load("logo-light") ?? load("logo");
  return load("logo");
}
