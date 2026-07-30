/**
 * Generates scenic layered-mountain placeholder images into public/images.
 *
 * The build environment for this project has no outbound access to Unsplash,
 * so these programmatic placeholders stand in for real photography. Swap any
 * file with a real Unsplash download of the same name (or use remote URLs —
 * images.unsplash.com is already whitelisted in next.config.ts).
 *
 * Run: node scripts/generate-placeholders.mjs
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
mkdirSync(outDir, { recursive: true });

/** Deterministic pseudo-random generator so every run produces identical art. */
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function mountainPath(rand, width, height, baseY, amp, peaks) {
  let d = `M 0 ${height} L 0 ${baseY}`;
  const step = width / peaks;
  for (let i = 0; i <= peaks; i++) {
    const x = i * step;
    const y = baseY - amp * (0.35 + rand() * 0.65) * (i % 2 === 0 ? 0.55 : 1);
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  d += ` L ${width} ${baseY} L ${width} ${height} Z`;
  return d;
}

function snowCaps(rand, width, baseY, amp, peaks, color) {
  let caps = "";
  const step = width / peaks;
  for (let i = 1; i < peaks; i += 2) {
    const x = i * step;
    const y = baseY - amp * (0.55 + rand() * 0.45);
    const w = step * (0.55 + rand() * 0.3);
    caps += `<path d="M ${(x - w / 2).toFixed(1)} ${(y + amp * 0.28).toFixed(1)} L ${x.toFixed(1)} ${y.toFixed(1)} L ${(x + w / 2).toFixed(1)} ${(y + amp * 0.28).toFixed(1)} Q ${x.toFixed(1)} ${(y + amp * 0.16).toFixed(1)} ${(x - w / 2).toFixed(1)} ${(y + amp * 0.28).toFixed(1)} Z" fill="${color}" opacity="0.92"/>`;
  }
  return caps;
}

function scene({ seed, width, height, sky, sun, layers, snow, haze }) {
  const rand = rng(seed);
  const layerSvg = layers
    .map((l, i) => {
      const baseY = height * l.base;
      const amp = height * l.amp;
      const peaks = l.peaks;
      let svg = `<path d="${mountainPath(rand, width, height, baseY, amp, peaks)}" fill="${l.color}"/>`;
      if (snow && i < snow.layers) {
        svg += snowCaps(rng(seed + 7 * (i + 1)), width, baseY, amp, peaks, snow.color);
      }
      return svg;
    })
    .join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${sky[0]}"/>
      <stop offset="100%" stop-color="${sky[1]}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${sun.color}" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="${sun.color}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#sky)"/>
  <circle cx="${width * sun.x}" cy="${height * sun.y}" r="${height * 0.28}" fill="url(#glow)"/>
  <circle cx="${width * sun.x}" cy="${height * sun.y}" r="${height * 0.07}" fill="${sun.color}" opacity="0.9"/>
  ${layerSvg}
  ${haze ? `<rect width="${width}" height="${height}" fill="${haze}" opacity="0.12"/>` : ""}
</svg>`;
}

const forest = ["#0f3d2e", "#14532d", "#1a5c38", "#0a2e21"];
const images = [
  { name: "hero-himalayan-trekker", w: 1920, h: 1080, seed: 11, sky: ["#8fb8d8", "#e8f1f7"], sun: { x: 0.72, y: 0.2, color: "#fff3d6" }, layers: [{ base: 0.55, amp: 0.42, peaks: 7, color: "#5a7d99" }, { base: 0.72, amp: 0.34, peaks: 9, color: "#3d5c74" }, { base: 0.88, amp: 0.26, peaks: 11, color: "#22384a" }], snow: { layers: 2, color: "#f4f9fd" } },
  { name: "hero-snow-peaks-sunrise", w: 1920, h: 1080, seed: 23, sky: ["#f2b878", "#fbe3c2"], sun: { x: 0.3, y: 0.26, color: "#ffd9a0" }, layers: [{ base: 0.52, amp: 0.4, peaks: 6, color: "#8c6f86" }, { base: 0.7, amp: 0.32, peaks: 8, color: "#5d4a66" }, { base: 0.88, amp: 0.24, peaks: 10, color: "#33283f" }], snow: { layers: 2, color: "#fff2e2" } },
  { name: "hero-alpine-valley", w: 1920, h: 1080, seed: 37, sky: ["#7fb2c9", "#e3f2ec"], sun: { x: 0.5, y: 0.18, color: "#fdf6dd" }, layers: [{ base: 0.5, amp: 0.38, peaks: 6, color: "#6b8fa8" }, { base: 0.68, amp: 0.3, peaks: 8, color: "#41718c" }, { base: 0.88, amp: 0.26, peaks: 9, color: forest[1] }], snow: { layers: 1, color: "#f4f9fd" } },
  { name: "trek-hampta-pass", w: 1200, h: 900, seed: 41, sky: ["#9cc3de", "#eef5f9"], sun: { x: 0.75, y: 0.2, color: "#fff6dd" }, layers: [{ base: 0.5, amp: 0.4, peaks: 6, color: "#607f9b" }, { base: 0.7, amp: 0.3, peaks: 8, color: "#3f5e78" }, { base: 0.9, amp: 0.22, peaks: 9, color: "#25404f" }], snow: { layers: 2, color: "#f4f9fd" } },
  { name: "trek-kedarkantha", w: 1200, h: 900, seed: 53, sky: ["#b9d3e6", "#f2f7fa"], sun: { x: 0.25, y: 0.2, color: "#ffffff" }, layers: [{ base: 0.48, amp: 0.36, peaks: 6, color: "#7c95ad" }, { base: 0.68, amp: 0.3, peaks: 8, color: "#54718c" }, { base: 0.9, amp: 0.24, peaks: 9, color: "#2c4a5e" }], snow: { layers: 3, color: "#ffffff" } },
  { name: "trek-valley-of-flowers", w: 1200, h: 900, seed: 67, sky: ["#8ec7d8", "#f0f8f2"], sun: { x: 0.6, y: 0.16, color: "#fdf3cf" }, layers: [{ base: 0.44, amp: 0.32, peaks: 6, color: "#5f8ba1" }, { base: 0.62, amp: 0.26, peaks: 8, color: "#3f7d64" }, { base: 0.85, amp: 0.24, peaks: 9, color: "#2c6b4f" }], snow: { layers: 1, color: "#f4f9fd" } },
  { name: "trek-kuari-pass", w: 1200, h: 900, seed: 71, sky: ["#a3c6e0", "#eef4f8"], sun: { x: 0.4, y: 0.22, color: "#fff6dd" }, layers: [{ base: 0.5, amp: 0.4, peaks: 7, color: "#6a86a0" }, { base: 0.7, amp: 0.3, peaks: 9, color: "#44607b" }, { base: 0.9, amp: 0.22, peaks: 10, color: "#273f52" }], snow: { layers: 2, color: "#f4f9fd" } },
  { name: "trek-chopta-tungnath", w: 1200, h: 900, seed: 83, sky: ["#e8b06f", "#f8e6c8"], sun: { x: 0.5, y: 0.24, color: "#ffd9a0" }, layers: [{ base: 0.52, amp: 0.38, peaks: 6, color: "#8a6a5a" }, { base: 0.7, amp: 0.3, peaks: 8, color: "#5d4638" }, { base: 0.9, amp: 0.22, peaks: 9, color: "#33261e" }], snow: { layers: 1, color: "#fdefdb" } },
  { name: "trek-brahmatal", w: 1200, h: 900, seed: 89, sky: ["#adcbe3", "#f0f6fa"], sun: { x: 0.68, y: 0.18, color: "#ffffff" }, layers: [{ base: 0.5, amp: 0.38, peaks: 6, color: "#7590a8" }, { base: 0.7, amp: 0.3, peaks: 8, color: "#4d6a84" }, { base: 0.9, amp: 0.22, peaks: 9, color: "#2b4557" }], snow: { layers: 3, color: "#ffffff" } },
  { name: "trek-dayara-bugyal", w: 1200, h: 900, seed: 97, sky: ["#90c1d6", "#eef7f0"], sun: { x: 0.35, y: 0.18, color: "#fdf3cf" }, layers: [{ base: 0.46, amp: 0.32, peaks: 6, color: "#628ba0" }, { base: 0.64, amp: 0.26, peaks: 8, color: "#447a60" }, { base: 0.86, amp: 0.24, peaks: 9, color: "#2f6a4c" }], snow: { layers: 1, color: "#f4f9fd" } },
  { name: "trek-bhrigu-lake", w: 1200, h: 900, seed: 101, sky: ["#89b8d4", "#e9f3f6"], sun: { x: 0.55, y: 0.2, color: "#fff6dd" }, layers: [{ base: 0.48, amp: 0.36, peaks: 6, color: "#5c82a0" }, { base: 0.66, amp: 0.28, peaks: 8, color: "#3c6484" }, { base: 0.88, amp: 0.24, peaks: 9, color: "#234459" }], snow: { layers: 2, color: "#f4f9fd" } },
  { name: "trek-sar-pass", w: 1200, h: 900, seed: 107, sky: ["#9dc4dd", "#eef5f8"], sun: { x: 0.3, y: 0.22, color: "#fff6dd" }, layers: [{ base: 0.5, amp: 0.4, peaks: 7, color: "#67839c" }, { base: 0.7, amp: 0.3, peaks: 9, color: "#425e77" }, { base: 0.9, amp: 0.22, peaks: 10, color: "#263e50" }], snow: { layers: 2, color: "#f4f9fd" } },
  { name: "trek-har-ki-dun", w: 1200, h: 900, seed: 113, sky: ["#a8c9df", "#f0f6f2"], sun: { x: 0.62, y: 0.2, color: "#fdf3cf" }, layers: [{ base: 0.48, amp: 0.36, peaks: 6, color: "#6d8ba2" }, { base: 0.66, amp: 0.28, peaks: 8, color: "#46756a" }, { base: 0.88, amp: 0.24, peaks: 9, color: "#2d5b45" }], snow: { layers: 2, color: "#f4f9fd" } },
  { name: "enquiry-mountain-range", w: 1000, h: 1400, seed: 127, sky: ["#dfe9ef", "#f7fafb"], sun: { x: 0.5, y: 0.16, color: "#ffffff" }, layers: [{ base: 0.55, amp: 0.3, peaks: 6, color: "#b6c8d4" }, { base: 0.72, amp: 0.24, peaks: 8, color: "#93abbb" }, { base: 0.9, amp: 0.18, peaks: 9, color: "#7392a6" }], snow: { layers: 2, color: "#ffffff" }, haze: "#ffffff" },
];

for (const img of images) {
  const svg = scene({ seed: img.seed, width: img.w, height: img.h, sky: img.sky, sun: img.sun, layers: img.layers, snow: img.snow, haze: img.haze });
  const file = join(outDir, `${img.name}.jpg`);
  await sharp(Buffer.from(svg)).jpeg({ quality: 82 }).toFile(file);
  console.log("generated", `${img.name}.jpg`);
}
