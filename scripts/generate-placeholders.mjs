/**
 * Generates photographic-style Himalayan placeholder imagery into
 * public/images.
 *
 * This project's build environment has no outbound network access, so stock
 * photography cannot be downloaded. These scenes are composed procedurally:
 * fractal-noise cloud fields, midpoint-displacement ridgelines, altitude-based
 * snow lines, atmospheric haze on distant layers and rock texture on near
 * ones — which reads far closer to a photograph than flat vector shapes.
 *
 * To use real photography instead, drop files with the same names into
 * public/images, or point the `image` fields in lib/data.ts at
 * images.unsplash.com URLs (already whitelisted in next.config.ts).
 *
 * Run: node scripts/generate-placeholders.mjs
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "site-images");
mkdirSync(outDir, { recursive: true });

/** Deterministic PRNG so every run reproduces identical art. */
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/**
 * Midpoint-displacement ridgeline. Produces natural mountain silhouettes
 * rather than regular zigzags.
 */
function ridgeline(rand, width, baseY, amp, roughness, depth, summits = 3) {
  // Seed alternating summits and saddles first, so subdivision sharpens real
  // peaks instead of smoothing a straight line into rolling hills.
  let pts = [];
  for (let i = 0; i <= summits; i++) {
    const peak = i % 2 === 1;
    const y = baseY - amp * (peak ? 0.62 + rand() * 0.38 : 0.02 + rand() * 0.24);
    pts.push([(width * i) / summits, y]);
  }
  for (let d = 0; d < depth; d++) {
    const next = [pts[0]];
    const scale = amp * Math.pow(roughness, d);
    for (let i = 0; i < pts.length - 1; i++) {
      const [x1, y1] = pts[i];
      const [x2, y2] = pts[i + 1];
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2 - (rand() - 0.42) * scale;
      next.push([mx, my], pts[i + 1]);
    }
    pts = next;
  }
  return pts;
}

function ridgePath(pts, width, height) {
  const body = pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L ");
  return `M 0 ${height} L ${body} L ${width} ${height} Z`;
}

let uid = 0;
const id = (p) => `${p}${uid++}`;

/** Puffy fractal cloud field confined to the upper sky. */
function clouds(width, height, seed, coverage, horizon) {
  const f = id("cl");
  const m = id("cm");
  return `
  <filter id="${f}" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.0022 0.010" numOctaves="6" seed="${seed}"/>
    <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  ${-coverage} 0 0 0 ${coverage * 0.92}"/>
  </filter>
  <linearGradient id="${m}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#fff" stop-opacity="0.15"/>
    <stop offset="35%" stop-color="#fff" stop-opacity="1"/>
    <stop offset="${horizon}%" stop-color="#fff" stop-opacity="0.75"/>
    <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
  </linearGradient>
  <mask id="${m}mask"><rect width="${width}" height="${height}" fill="url(#${m})"/></mask>`;
}

/** Fine grain over rock faces so near layers do not read as flat fills. */
function rockTexture(seed, strength) {
  const f = id("rk");
  return {
    id: f,
    def: `<filter id="${f}">
      <feTurbulence type="fractalNoise" baseFrequency="0.9 0.35" numOctaves="4" seed="${seed}"/>
      <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.6 0 0 0 0"/>
      <feComposite operator="in" in2="SourceGraphic"/>
    </filter>`,
    strength,
  };
}

/**
 * Builds a layered mountain scene.
 * layers: [{ base, amp, rock, snow, snowLine, haze }] far -> near
 */
function scene({
  width,
  height,
  seed,
  sky,
  sun,
  layers,
  cloud = { coverage: 1.35, horizon: 70, seed: 9 },
  extras = "",
  grade = null,
}) {
  const rand = rng(seed);
  const skyId = id("sky");
  const sunId = id("sun");
  const cloudDefs = clouds(width, height, cloud.seed, cloud.coverage, cloud.horizon);
  const cloudMaskId = cloudDefs.match(/mask id="([^"]+)"/)[1];
  const cloudFilterId = cloudDefs.match(/filter id="([^"]+)"/)[1];

  const defs = [
    `<linearGradient id="${skyId}" x1="0" y1="0" x2="0" y2="1">
       ${sky.map((c, i) => `<stop offset="${(i / (sky.length - 1)) * 100}%" stop-color="${c}"/>`).join("")}
     </linearGradient>`,
    sun
      ? `<radialGradient id="${sunId}" cx="50%" cy="50%" r="50%">
           <stop offset="0%" stop-color="${sun.color}" stop-opacity="0.98"/>
           <stop offset="45%" stop-color="${sun.color}" stop-opacity="0.35"/>
           <stop offset="100%" stop-color="${sun.color}" stop-opacity="0"/>
         </radialGradient>`
      : "",
    cloudDefs,
  ];

  const body = [];
  const ridges = [];
  body.push(`<rect width="${width}" height="${height}" fill="url(#${skyId})"/>`);
  if (sun) {
    body.push(
      `<circle cx="${width * sun.x}" cy="${height * sun.y}" r="${height * 0.55}" fill="url(#${sunId})"/>`,
      `<circle cx="${width * sun.x}" cy="${height * sun.y}" r="${height * (sun.disc ?? 0.045)}" fill="${sun.color}" opacity="0.95"/>`
    );
  }
  body.push(
    `<g mask="url(#${cloudMaskId})"><rect width="${width}" height="${height}" filter="url(#${cloudFilterId})"/></g>`
  );

  layers.forEach((l, i) => {
    const pts = ridgeline(
      rng(seed + i * 137 + 11),
      width,
      height * l.base,
      height * l.amp,
      l.rough ?? 0.5,
      l.detail ?? 5,
      l.summits ?? 3
    );
    ridges.push(pts);
    const d = ridgePath(pts, width, height);
    const clipId = id("clip");
    const tex = rockTexture(seed + i * 31, l.texture ?? 0);

    defs.push(`<clipPath id="${clipId}"><path d="${d}"/></clipPath>`);
    if (l.texture) defs.push(tex.def);

    body.push(`<path d="${d}" fill="${l.rock}"/>`);

    if (l.snow) {
      // Snow caps hug the crest: a band whose depth grows with altitude above
      // the snow line, so summits carry deep snow, saddles carry none, and
      // the rock face stays visible below. Reads like a real snow line.
      const peakY = Math.min(...pts.map(([, y]) => y));
      const baseline = height * l.base;
      const snowAlt = peakY + (baseline - peakY) * (l.snowLevel ?? 0.5);
      const k = l.snowThickness ?? 0.75;
      const maxDepth = height * (l.snowMax ?? 0.12);
      const capOf = (y) => Math.min(Math.max((snowAlt - y) * k, 0), maxDepth);
      const top = pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L ");
      const under = [...pts]
        .reverse()
        .map(([x, y]) => `${x.toFixed(1)} ${(y + capOf(y)).toFixed(1)}`)
        .join(" L ");
      body.push(
        `<g clip-path="url(#${clipId})"><path d="M ${top} L ${under} Z" fill="${l.snow}" opacity="${l.snowOpacity ?? 0.95}"/></g>`
      );
    }
    if (l.texture) {
      body.push(
        `<g clip-path="url(#${clipId})" opacity="${l.texture}"><rect width="${width}" height="${height}" filter="url(#${tex.id})"/></g>`
      );
    }
    if (l.haze) {
      body.push(
        `<g clip-path="url(#${clipId})"><rect width="${width}" height="${height}" fill="${l.haze}" opacity="${l.hazeOpacity ?? 0.25}"/></g>`
      );
    }
  });

  // Ground height of the nearest ridge, so figures stand on the terrain
  // instead of floating in front of it.
  const groundY = (x, layer = ridges.length - 1) => {
    const pts = ridges[layer];
    if (!pts) return height;
    let best = pts[0];
    for (const p of pts) {
      if (Math.abs(p[0] - x) < Math.abs(best[0] - x)) best = p;
    }
    return best[1];
  };
  body.push(typeof extras === "function" ? extras({ groundY, rand }) : extras);
  if (grade) {
    body.push(`<rect width="${width}" height="${height}" fill="${grade.color}" opacity="${grade.opacity}"/>`);
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>${defs.join("\n")}</defs>
  ${body.join("\n")}
  </svg>`;
}

/** Trekker seen from behind: orange shell, pack, beanie, trekking pole. */
function trekker(x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-46 250 L46 250 L30 40 L-30 40 Z" fill="#0f1720" opacity="0.16"/>
    <rect x="-26" y="96" width="22" height="120" rx="10" fill="#20262e"/>
    <rect x="6" y="96" width="22" height="120" rx="10" fill="#181d24"/>
    <rect x="-30" y="212" width="28" height="16" rx="6" fill="#11151a"/>
    <rect x="4" y="212" width="28" height="16" rx="6" fill="#11151a"/>
    <path d="M-34 6 Q0 -10 34 6 L40 104 Q0 116 -40 104 Z" fill="#e2571f"/>
    <path d="M-34 6 Q0 -10 34 6 L36 40 Q0 30 -36 40 Z" fill="#f26a26"/>
    <rect x="-44" y="18" width="16" height="70" rx="8" fill="#d24d18"/>
    <rect x="28" y="18" width="16" height="70" rx="8" fill="#d24d18"/>
    <rect x="-30" y="-4" width="60" height="86" rx="16" fill="#5b6570"/>
    <rect x="-30" y="-4" width="60" height="30" rx="14" fill="#6c7783"/>
    <rect x="-22" y="30" width="44" height="10" rx="5" fill="#454e58"/>
    <rect x="-14" y="52" width="28" height="26" rx="8" fill="#3c444d"/>
    <circle cx="0" cy="-26" r="21" fill="#141a20"/>
    <path d="M-21 -30 Q0 -52 21 -30 Q0 -40 -21 -30 Z" fill="#1d2731"/>
    <rect x="44" y="30" width="4" height="180" rx="2" fill="#2a323b" transform="rotate(7 46 120)"/>
  </g>`;
}

/** Conifer silhouette for forested scenes. */
function pine(x, y, h, color, snow) {
  const w = h * 0.42;
  let t = `<g transform="translate(${x} ${y})">`;
  for (let i = 0; i < 4; i++) {
    const ty = -h + (h / 4) * i;
    const tw = w * (0.45 + (i / 4) * 0.62);
    t += `<path d="M0 ${ty.toFixed(1)} L${(tw / 2).toFixed(1)} ${(ty + h * 0.33).toFixed(
      1
    )} L${(-tw / 2).toFixed(1)} ${(ty + h * 0.33).toFixed(1)} Z" fill="${color}"/>`;
    if (snow) {
      t += `<path d="M0 ${ty.toFixed(1)} L${(tw * 0.2).toFixed(1)} ${(ty + h * 0.15).toFixed(
        1
      )} Q0 ${(ty + h * 0.09).toFixed(1)} ${(-tw * 0.2).toFixed(1)} ${(ty + h * 0.15).toFixed(
        1
      )} Z" fill="${snow}" opacity="0.85"/>`;
    }
  }
  return t + `<rect x="${-h * 0.03}" y="0" width="${h * 0.06}" height="${h * 0.09}" fill="#2b2118"/></g>`;
}

function tent(x, y, s, color) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-34 0 L0 -40 L34 0 Z" fill="${color}"/>
    <path d="M-34 0 L0 -40 L6 -40 L-22 0 Z" fill="#000" opacity="0.18"/>
    <path d="M0 -40 L10 0 L-10 0 Z" fill="#000" opacity="0.22"/>
  </g>`;
}

const images = [
  {
    name: "hero/slide-1-explore-beyond-limits",
    w: 1920,
    h: 1080,
    seed: 21,
    sky: ["#1f6fc4", "#4d93d6", "#9dc4e6"],
    sun: { x: 0.78, y: 0.12, color: "#fdf7e6", disc: 0.03 },
    cloud: { coverage: 1.15, horizon: 62, seed: 14 },
    layers: [
      { base: 0.66, amp: 0.5, summits: 5, rock: "#7f9db8", snow: "#f2f7fb", snowDepth: 0.30, haze: "#cfe0ef", hazeOpacity: 0.42 },
      { base: 0.8, amp: 0.44, summits: 3, rock: "#4a6c86", snow: "#eef5fa", snowDepth: 0.26, texture: 0.1 },
      { base: 1.02, amp: 0.36, rock: "#33475c", snow: "#e8f1f8", snowDepth: 0.20, texture: 0.16 },
    ],
    // Stands on the mid ridge so the figure reads clear of the search card
    // that overlaps the bottom of the hero.
    extras: ({ groundY }) => trekker(1330, groundY(1330, 1) - 232 * 1.0, 1.0),
  },
  {
    name: "hero/slide-2-walk-the-himalayas",
    w: 1920,
    h: 1080,
    seed: 33,
    sky: ["#20365e", "#a35f6a", "#f0a768", "#fbd9a6"],
    sun: { x: 0.3, y: 0.3, color: "#ffd79a", disc: 0.05 },
    cloud: { coverage: 1.5, horizon: 68, seed: 27 },
    layers: [
      { base: 0.7, amp: 0.46, rock: "#8f7690", snow: "#ffeede", snowDepth: 0.28, haze: "#e7b98f", hazeOpacity: 0.4 },
      { base: 0.86, amp: 0.4, rock: "#5c4a63", snow: "#fbe3cd", snowDepth: 0.24, texture: 0.12 },
      { base: 1.04, amp: 0.32, rock: "#2f2739", snow: "#e9d2c2", snowDepth: 0.18, texture: 0.18 },
    ],
  },
  {
    name: "hero/slide-3-adventure-awaits-you",
    w: 1920,
    h: 1080,
    seed: 47,
    sky: ["#2d7fbe", "#71aad4", "#c5ddea"],
    sun: { x: 0.5, y: 0.14, color: "#fbf6df", disc: 0.028 },
    cloud: { coverage: 1.25, horizon: 66, seed: 41 },
    layers: [
      { base: 0.62, amp: 0.44, rock: "#7796b0", snow: "#f0f6fb", snowDepth: 0.26, haze: "#d2e3f0", hazeOpacity: 0.45 },
      { base: 0.78, amp: 0.36, rock: "#46707f", snow: "#e9f3f8", snowDepth: 0.22, texture: 0.1 },
      { base: 1.05, amp: 0.3, rock: "#2c5340", texture: 0.16 },
    ],
  },
  {
    name: "treks/hampta-pass-trek",
    w: 1200,
    h: 900,
    seed: 61,
    sky: ["#2e79b8", "#7fb0d6", "#cfe1ee"],
    sun: { x: 0.74, y: 0.14, color: "#fdf8e8", disc: 0.035 },
    cloud: { coverage: 1.2, horizon: 64, seed: 55 },
    layers: [
      { base: 0.6, amp: 0.42, rock: "#7e9cb6", snow: "#f1f6fb", snowDepth: 0.28, haze: "#d3e2ef", hazeOpacity: 0.4 },
      { base: 0.76, amp: 0.36, rock: "#4a687e", snow: "#ecf4f9", snowDepth: 0.26, texture: 0.11 },
      { base: 1.06, amp: 0.26, rock: "#dfe9f0", snow: "#ffffff", snowDepth: 0.16, texture: 0.07 },
    ],
    extras: ({ groundY }) =>
      trekker(430, groundY(430) - 232 * 0.42, 0.42) +
      trekker(536, groundY(536) - 232 * 0.36, 0.36),
  },
  {
    name: "treks/kedarkantha-trek",
    w: 1200,
    h: 900,
    seed: 73,
    sky: ["#3b7cb5", "#8fb8d8", "#dbe8f1"],
    sun: { x: 0.22, y: 0.16, color: "#fdfaf0", disc: 0.03 },
    cloud: { coverage: 1.3, horizon: 60, seed: 67 },
    layers: [
      { base: 0.55, amp: 0.4, rock: "#87a3bb", snow: "#f2f7fb", snowDepth: 0.26, haze: "#d8e5f0", hazeOpacity: 0.45 },
      { base: 0.72, amp: 0.3, rock: "#5b7285", snow: "#eff6fa", snowDepth: 0.22, texture: 0.1 },
      { base: 1.08, amp: 0.2, rock: "#e8f0f6", snow: "#ffffff", snowDepth: 0.14, texture: 0.06 },
    ],
    extras: ({ groundY }) => {
      let s = "";
      const r = rng(91);
      const trees = [];
      for (let i = 0; i < 26; i++) {
        const x = 20 + r() * 1160;
        trees.push([x, groundY(x) + 10 + r() * 70, 110 + r() * 160]);
      }
      // Paint far-to-near so nearer trees overlap correctly.
      trees.sort((a, b) => a[1] - b[1]);
      for (const [x, y, h] of trees) s += pine(x, y, h, "#1d3b2c", "#eef6fa");
      s += tent(690, groundY(690) + 96, 1.15, "#e8632a");
      s += tent(826, groundY(826) + 112, 1.0, "#efb33a");
      return s;
    },
  },
  {
    name: "treks/valley-of-flowers-trek",
    w: 1200,
    h: 900,
    seed: 83,
    sky: ["#3d86bd", "#8ab9d6", "#d6e8ea"],
    sun: { x: 0.6, y: 0.13, color: "#fcf8e0", disc: 0.03 },
    cloud: { coverage: 1.35, horizon: 55, seed: 79 },
    layers: [
      { base: 0.5, amp: 0.36, rock: "#7b9ab4", snow: "#f0f6fb", snowDepth: 0.24, haze: "#d5e4ef", hazeOpacity: 0.44 },
      { base: 0.66, amp: 0.28, rock: "#4f7a63", texture: 0.1 },
      { base: 0.96, amp: 0.2, rock: "#4a8d51", texture: 0.14 },
    ],
    extras: () => {
      let s = `<rect x="0" y="720" width="1200" height="180" fill="#59a05a"/>`;
      const r = rng(101);
      const cols = ["#f2f6f0", "#efd9ec", "#f0a6c8", "#f5e08a", "#e79ac4", "#ffffff"];
      for (let i = 0; i < 900; i++) {
        const x = r() * 1200;
        const y = 690 + r() * 210;
        const rad = 2.2 + r() * 3.6;
        s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rad.toFixed(
          1
        )}" fill="${cols[(r() * cols.length) | 0]}" opacity="${(0.55 + r() * 0.45).toFixed(2)}"/>`;
      }
      return s;
    },
  },
  {
    name: "treks/kuari-pass-trek",
    w: 1200,
    h: 900,
    seed: 97,
    sky: ["#1c6cc0", "#5f9bd4", "#b9d5e9"],
    sun: { x: 0.36, y: 0.15, color: "#fdf9ea", disc: 0.03 },
    cloud: { coverage: 1.1, horizon: 62, seed: 89 },
    layers: [
      { base: 0.58, amp: 0.46, rock: "#7d9cb9", snow: "#f2f7fc", snowDepth: 0.28, haze: "#d0e1f0", hazeOpacity: 0.4 },
      { base: 0.76, amp: 0.36, rock: "#46637c", snow: "#ebf3fa", snowDepth: 0.22, texture: 0.11 },
      { base: 1.05, amp: 0.28, rock: "#2b4256", texture: 0.17 },
    ],
    extras: ({ groundY }) => trekker(400, groundY(400) - 232 * 0.6, 0.6),
  },
  {
    name: "treks/chopta-tungnath-trek",
    w: 1200,
    h: 900,
    seed: 109,
    sky: ["#2a5f9e", "#c98a5e", "#f2c18a"],
    sun: { x: 0.5, y: 0.2, color: "#ffd9a2", disc: 0.045 },
    cloud: { coverage: 1.45, horizon: 66, seed: 103 },
    layers: [
      { base: 0.64, amp: 0.4, rock: "#8b7a86", snow: "#fdeedd", snowDepth: 0.26, haze: "#e2b58e", hazeOpacity: 0.38 },
      { base: 0.82, amp: 0.32, rock: "#54443f", texture: 0.13 },
      { base: 1.06, amp: 0.24, rock: "#33291f", texture: 0.18 },
    ],
    extras: `<g transform="translate(600 700)">
      <rect x="-120" y="-10" width="240" height="26" fill="#4a382a"/>
      <rect x="-104" y="-120" width="208" height="112" fill="#6d5136"/>
      <rect x="-104" y="-120" width="208" height="112" fill="#000" opacity="0.12"/>
      <rect x="-70" y="-96" width="44" height="88" fill="#2c2015"/>
      <rect x="26" y="-96" width="44" height="88" fill="#2c2015"/>
      <path d="M-132 -120 L0 -212 L132 -120 Z" fill="#7d5f3f"/>
      <path d="M-132 -120 L0 -212 L0 -120 Z" fill="#000" opacity="0.14"/>
      <path d="M-96 -196 L0 -256 L96 -196 Z" fill="#6b4f34"/>
      <rect x="-8" y="-292" width="16" height="42" fill="#c98b3a"/>
      <circle cx="0" cy="-296" r="14" fill="#e0a94a"/>
      <ellipse cx="0" cy="20" rx="230" ry="26" fill="#20180f" opacity="0.3"/>
    </g>`,
  },
  {
    name: "treks/brahmatal-trek",
    w: 1200,
    h: 900,
    seed: 127,
    sky: ["#255f9e", "#77a8ce", "#cfe0ec"],
    sun: { x: 0.68, y: 0.14, color: "#fdfaf0", disc: 0.03 },
    cloud: { coverage: 1.28, horizon: 58, seed: 113 },
    layers: [
      { base: 0.54, amp: 0.42, rock: "#7f9db9", snow: "#f2f7fc", snowDepth: 0.26, haze: "#d3e2f0", hazeOpacity: 0.44 },
      { base: 0.72, amp: 0.32, rock: "#51697f", snow: "#eef5fa", snowDepth: 0.22, texture: 0.11 },
      { base: 1.02, amp: 0.22, rock: "#e6eff5", snow: "#ffffff", snowDepth: 0.15, texture: 0.07 },
    ],
    extras: `<ellipse cx="600" cy="830" rx="330" ry="52" fill="#8fb6cd" opacity="0.75"/>
             <ellipse cx="600" cy="826" rx="300" ry="40" fill="#c9dfe9" opacity="0.6"/>`,
  },
  // Bhrigu Lake and Dayara Bugyal are not listed here: both ship with real
  // photographs taken from the operator's own brochure and web page, so there
  // is no placeholder to generate — regenerating would overwrite them.
  {
    name: "treks/sar-pass-trek",
    w: 1200,
    h: 900,
    seed: 157,
    sky: ["#2469b4", "#74a6d2", "#cbdeed"],
    sun: { x: 0.28, y: 0.16, color: "#fdf9ee", disc: 0.03 },
    cloud: { coverage: 1.22, horizon: 62, seed: 151 },
    layers: [
      { base: 0.58, amp: 0.44, rock: "#7e9dba", snow: "#f2f7fc", snowDepth: 0.28, haze: "#d1e2f0", hazeOpacity: 0.42 },
      { base: 0.76, amp: 0.34, rock: "#495f78", snow: "#ecf4fa", snowDepth: 0.22, texture: 0.11 },
      { base: 1.05, amp: 0.26, rock: "#e4edf4", snow: "#ffffff", snowDepth: 0.15, texture: 0.07 },
    ],
    extras: ({ groundY }) => trekker(760, groundY(760) - 232 * 0.5, 0.5),
  },
  {
    name: "treks/har-ki-dun-trek",
    w: 1200,
    h: 900,
    seed: 167,
    sky: ["#2b74b4", "#82b2d4", "#d5e7ec"],
    sun: { x: 0.62, y: 0.15, color: "#fdf7e2", disc: 0.03 },
    cloud: { coverage: 1.3, horizon: 58, seed: 163 },
    layers: [
      { base: 0.52, amp: 0.4, rock: "#7d9fb9", snow: "#f1f6fb", snowDepth: 0.26, haze: "#d4e3f0", hazeOpacity: 0.44 },
      { base: 0.7, amp: 0.3, rock: "#4e7a66", texture: 0.11 },
      { base: 1.0, amp: 0.22, rock: "#59935a", texture: 0.15 },
    ],
    extras: ({ groundY }) => {
      let s = "";
      const r = rng(173);
      for (let i = 0; i < 16; i++) {
        const x = 30 + r() * 1140;
        s += pine(x, groundY(x) + 30 + r() * 80, 90 + r() * 110, "#234a33", null);
      }
      return s;
    },
  },
  {
    name: "general/enquiry-form-background",
    w: 1000,
    h: 1400,
    seed: 181,
    sky: ["#eef3f7", "#f7fafc", "#ffffff"],
    sun: null,
    cloud: { coverage: 1.7, horizon: 50, seed: 177 },
    layers: [
      { base: 0.74, amp: 0.2, rock: "#c3d3de", snow: "#ffffff", snowDepth: 0.14, haze: "#ffffff", hazeOpacity: 0.35 },
      { base: 0.86, amp: 0.16, rock: "#a8becd", snow: "#ffffff", snowDepth: 0.12, haze: "#ffffff", hazeOpacity: 0.2 },
      { base: 0.99, amp: 0.12, rock: "#8fabbd", snow: "#ffffff", snowLine: 0.92 },
    ],
    grade: { color: "#ffffff", opacity: 0.3 },
  },
];

for (const img of images) {
  const svg = scene({
    width: img.w,
    height: img.h,
    seed: img.seed,
    sky: img.sky,
    sun: img.sun,
    layers: img.layers,
    cloud: img.cloud,
    extras: img.extras ?? "",
    grade: img.grade,
  });
  mkdirSync(dirname(join(outDir, `${img.name}.jpg`)), { recursive: true });
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(join(outDir, `${img.name}.jpg`));
  console.log("generated", `${img.name}.jpg`);
}
