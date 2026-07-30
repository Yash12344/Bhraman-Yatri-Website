# Bhraman Yatri — Explore Beyond Limits

A modern, production-ready travel website for a Himalayan trekking company,
recreated pixel-perfect from the original design.

## Tech Stack

- **Next.js 15** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui-style primitives** (`components/ui`)
- **Lucide Icons**
- **Framer Motion** — subtle fade-in / slide-up animations
- **SwiperJS** — hero + popular treks sliders
- **React Hook Form + Zod** — enquiry & newsletter form validation

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint
```

## Project Structure

```
app/                    # App Router entry (layout, page, globals, icon)
components/
  navbar/               # TopBar + sticky Navbar with dropdown & mobile menu
  hero/                 # Auto-playing hero slider
  search/               # Floating search card
  treks/                # Popular treks slider + TrekCard
  seasons/              # Winter / Summer season cards
  whychoose/            # Feature icon grid
  enquiry/              # Enquiry section + validated form
  footer/               # Footer + newsletter form
  shared/               # Logo, SectionHeading, FadeIn, WhatsApp icon/button
  ui/                   # shadcn-style primitives (button, input, select, …)
lib/
  data.ts               # All content — treks, menus, features, footer links
  types.ts              # Shared TypeScript interfaces
  validations.ts        # Zod schemas
  utils.ts              # cn() + formatting helpers
public/images/          # Placeholder imagery (descriptive filenames)
scripts/                # Placeholder image generator
```

## Images

The build environment for this project has no outbound access to Unsplash, so
`public/images` contains generated scenic placeholders (see
`scripts/generate-placeholders.mjs`). To use real photography, either replace
the files in `public/images` (keeping the same names) or point the `image`
fields in `lib/data.ts` at `images.unsplash.com` URLs — that host is already
whitelisted in `next.config.ts`.
