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

## Overview and highlights copy

`shortOverview`, `fullOverview` and `highlights` are website copy written by
rewriting each brochure's own facts — the overview table, the day-wise
itinerary, the inclusions and the key notes. No destination, activity,
facility, viewpoint or peak appears that the brochure did not state.

Two scripts maintain this:

```bash
node scripts/write-trek-copy.mjs    # writes the copy into the JSON
node scripts/verify-trek-copy.mjs   # fails if any claim is unsupported
```

`verify-trek-copy.mjs` extracts every proper noun and figure from the copy and
asserts it also appears in that trek's source fields. It runs clean today, and
it earns its keep — it caught a first draft of the Hampta Pass overview that
described the crossing as running "from Kullu into Lahaul". Both are
geographically true, but neither word appears anywhere in that brochure, so the
wording was changed to the Chandra Valley, which the itinerary does name.

Editing the copy by hand in the JSON is fine. Re-run the verifier afterwards.

### Still empty: FAQs

| Field | What it powers |
|---|---|
| `faqs` | The FAQ accordion on the trek page |

No brochure contained a FAQ section, so nothing was written. The accordion stays
hidden until entries are added:

```jsonc
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

Four articles ship with the site. Each one is written from the trek data
itself — grades, seasons, durations, inclusions and the "things to carry"
lists — so nothing in them contradicts a brochure. They contain no reviews,
ratings or personal accounts, because those must come from real people.

A post's `body` is a list of blocks:

```jsonc
[
  {
    "slug": "packing-for-winter-treks",
    "title": "Packing For Winter Treks",
    "excerpt": "Short summary shown on the card.",
    "date": "2025-01-15",
    "author": "Bhraman Yatri Team",
    "image": "/site-images/treks/kedarkantha-trek.jpg",
    "tags": ["Gear", "Winter"],
    "body": [
      { "type": "heading", "text": "Layers" },
      { "type": "paragraph", "text": "..." },
      { "type": "list", "items": ["...", "..."] },
      { "type": "quote", "text": "..." },
      { "type": "treks", "filter": { "season": "winter" }, "caption": "Our winter treks." }
    ]
  }
]
```

The `treks` block is the useful one: instead of naming treks in prose that
goes stale, it renders live trek cards from a filter. `filter` accepts any
combination of `season` (`winter` | `spring` | `summer` | `monsoon` |
`autumn`), `difficulty`, `region`, `maxDays` and an explicit `slugs` list. Add
a trek and the articles that match it pick it up on the next build; a block
that matches nothing renders nothing rather than an empty box.

Posts are sorted newest-first by `date`, get their own page at
`/blog/{slug}`, and are added to `sitemap.xml` automatically.

### Article pictures

`image` is the fallback. The client can override any article's picture without
touching this file by dropping an image named after the post's slug into
`public/site-images/blog/` — see the README there.

---

## The gallery page

`/gallery` is built by listing directories, not from a data file, so there is
no cap on how many photographs the client adds and no code to change:

1. `public/site-images/gallery/` — the drop folder. Any filenames, any
   number, sub-folders welcome.
2. `public/site-images/treks/gallery/{slug}/` — per-trek folders.
3. Each trek's main image, so the page is never empty.

Alt text is derived from filenames (`kedarkantha-summit-sunrise.jpg` becomes
"Kedarkantha summit sunrise"); untouched camera names like `IMG_4821.jpg` fall
back to a generic description.

---

## Known issues in the source brochures

Recorded per trek under `source.discrepancies`. Worth resolving with the
operator before launch — the Sar Pass day distances contradict themselves on
every day, and several treks carry copy-pasted notes from other brochures.

## Contact details

Site-wide branding, phone, email and address live in `lib/data.ts` under
`SITE`. The values there are placeholders and must be replaced with the real
business details before launch.
