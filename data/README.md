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

### Bhrigu Lake is thinner than the rest

Nine treks came from PDF brochures. Bhrigu Lake came from the operator's web
page, where several sections sit behind "READ MORE" toggles and collapsed
accordions that a page capture does not expand. So its Inclusions, Exclusions,
Things to Carry and Policy lists are **truncated**, its Day 02 and Day 03
itinerary entries have titles but no descriptions, and its departure dates and
railway station are absent. Every gap is itemised in that file's
`source.missingSections`, and nothing was filled in from guesswork.

The page also states "4 days" while listing a three-day itinerary. Both are
recorded as-is; ask the operator which is right before launch.

## The booking form

`/booking` is the site's single booking form, laid out to match the operator's
existing payment page: brand and terms on the left, fields on the right.
Trek pages and the "Book Now" buttons link to it, and `?trek={slug}` prefills
the trek name and its starting price.

### Switching on online payment

`BOOKING.paymentPageUrl` in `lib/data.ts` is empty. While it is empty:

- the button reads **"Book Now · ₹total"**, not "Pay",
- submitting records the booking and tells the customer a payment link will
  follow by email and WhatsApp.

Set it to the operator's hosted payment page (their Razorpay Payment Page URL)
and the button becomes **"Pay ₹total"** and hands off there after submission.
The page never shows a Pay button unless something is actually behind it.

**Still to wire:** the submit handler in
`components/booking/BookingPaymentForm.tsx` logs to the console like the other
forms on the site. It needs pointing at an API route, inbox or CRM before
launch, or bookings will not reach anyone. Taking card details directly on the
site — rather than handing off to a hosted page — would additionally need
server-side order creation and payment-signature verification.

The `UPI / VISA / MASTERCARD / RUPAY` strip is plain text rather than the brand
logos, which are trademarks and were not available offline. Drop real SVGs in
and swap `BOOKING.paymentMethods` for them if the operator wants the marks.

---

## Contact details

Site-wide branding, phone, email and address live in `lib/data.ts` under
`SITE`, and the social profiles under `SOCIAL_LINKS`.

Real and confirmed:

| Value | |
|---|---|
| Phone / WhatsApp | `+91 92587 18441` — drives the top bar, the footer, the floating WhatsApp button and the hero CTA |
| Instagram | `instagram.com/bhramanyatri` |
| Facebook | `facebook.com/share/1J84ZmC9Ah/` |
| YouTube | `youtube.com/@bhramanyatri` |

**Still placeholders — replace before launch:** `email`
(`info@bhramanyatri.com`), `address` (`Dehradun, Uttarakhand, India - 248001`,
which also feeds the `PostalAddress` in the homepage structured data), `url`
(`https://bhramanyatri.com`) and the `copyright` year.

The Facebook entry is a share link rather than a page vanity URL. It works,
but if the page has a proper handle it would be tidier to use it.
