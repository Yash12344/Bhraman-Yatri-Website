# Site content

Everything on this website is driven by the files in this folder. The app code
does not contain any trek information — adding a trek means adding data, not
changing code.

---

## Adding a new trek

Two steps, no code changes:

1. **Add the JSON.** Copy any file in `data/treks/` and edit it. The filename
   must match the `slug` field — `har-ki-dun-trek.json` has
   `"slug": "har-ki-dun-trek"`.
2. **Add the photo.** Put a `.jpg` in `public/site-images/treks/` named after
   the same slug — `har-ki-dun-trek.jpg`.
3. **Register it.** Open `lib/treks.ts` and add the import alongside the
   others. (This one line exists because Next.js needs static imports to
   bundle JSON at build time.)

The new trek then appears automatically in: the treks listing, the homepage
slider, the correct season groupings, the search filters, related-trek
suggestions, the navbar dropdown, the footer, and `sitemap.xml`. Its detail
page is generated at `/treks/{slug}`.

### Optional per-trek photo gallery

Create `public/site-images/treks/gallery/{slug}/` and drop in as many images
as you like. They appear in that trek's Gallery section and on the site-wide
gallery page. No naming rules beyond the file extension.

### Season groupings are automatic

A trek's seasons are read from its `bestSeason` text (e.g. `"Nov To April"`,
`"Round The Year"`). You do not maintain season lists by hand.

---

## Fields the brochures did not contain

These are intentionally empty across all nine treks, because the source PDFs
had no such content. **The website hides each section until it is filled in** —
nothing was invented to pad them out.

| Field in the trek JSON | What it powers |
|---|---|
| `shortOverview`, `fullOverview` | The "Overview" section on the trek page |
| `highlights` | The "Highlights" section |
| `faqs` | The FAQ accordion |

To fill them, edit the trek's JSON:

```jsonc
"shortOverview": "One or two sentences that sell the trek.",
"fullOverview": "A longer paragraph with more detail.",
"highlights": [
  "Summit views of Swargarohini and Bandarpoonch",
  "Camping beside a frozen alpine lake"
],
"faqs": [
  { "question": "How fit do I need to be?", "answer": "..." }
]
```

---

## `testimonials.json`

Ships as an empty list `[]`, so the homepage testimonials section is hidden.
Add real reviews only — these are shown to customers as genuine feedback.

```jsonc
[
  {
    "id": "priya-2024",
    "name": "Priya Sharma",
    "location": "Delhi",
    "trek": "Kedarkantha Trek",
    "rating": 5,
    "quote": "What they actually wrote."
  }
]
```

## `blog/posts.json`

Ships empty, so `/blog` shows a "coming soon" state.

```jsonc
[
  {
    "slug": "packing-for-winter-treks",
    "title": "Packing For Winter Treks",
    "excerpt": "Short summary shown on the card.",
    "date": "2025-01-15",
    "author": "Bhraman Yatri Team",
    "image": "/site-images/treks/kedarkantha-trek.jpg",
    "tags": ["Gear", "Winter"]
  }
]
```

---

## Known issues in the source brochures

Recorded per trek under `source.discrepancies`. Worth resolving with the
operator before launch — the Sar Pass day distances contradict themselves on
every day, and several treks carry copy-pasted notes from other brochures.

## Contact details

Site-wide branding, phone, email and address live in `lib/data.ts` under
`SITE`. The values there are placeholders and must be replaced with the real
business details before launch.
