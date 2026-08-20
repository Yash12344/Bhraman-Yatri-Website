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

## Customer enquiries go to WhatsApp

The Contact form and the homepage Enquiry form do **not** send email and do not
talk to any third-party service. When a visitor submits one:

1. The form validates as normal.
2. A WhatsApp message is written out from what they typed.
3. WhatsApp opens with that message ready.
4. **The visitor presses Send themselves.**

Nothing is transmitted by the website. The details go straight from the
visitor's browser into their own WhatsApp message, so there is no endpoint, no
API key, no stored data and nothing to configure. That is also why this works
on static hosting.

The number comes from `SITE.whatsappHref` in `lib/data.ts` — change it there
and both forms follow. `lib/whatsapp.ts` strips it to the digits `wa.me`
expects (country code, no "+", no spaces).

Because the site cannot know whether the visitor actually pressed Send, the
confirmation says *"WhatsApp has been opened with your enquiry. Please press
Send to submit it."* — never "message sent". If the browser blocks the popup
it says *"Unable to open WhatsApp. Please try again."* and keeps everything
typed so they can retry.

Booking is separate and unaffected: Book Now goes straight to Razorpay.

---

## Static export

`next.config.ts` sets `output: "export"`, so `npm run build` writes a fully
static site to `out/`. Two things are required for that and must stay:

- `images.unoptimized: true` — an exported site has no image-optimisation
  server. Without it the build fails.
- `export const dynamic = "force-static"` in `app/robots.ts` and
  `app/sitemap.ts` — without it the export build fails on those two routes.

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

## `about.json` — the About Us page

Holds the About page **exactly as the client supplied it** — every heading,
paragraph, emoji and figure, in their own wording and capitalisation. Reword
anything here and the page follows. Nothing on `/about` is written in code.

Two things to know when editing:

- **The four numbers are written out, not counted.** `"value": "10+"` under
  `stats` is literal text. When treks are added, update it here by hand — the
  page will not do it for you. (It can be switched back to counting the trek
  files automatically; ask your developer, it is a few lines.)
- **The emoji are the icons.** Each `howWeWork` item carries an `emoji` field
  and that is what appears in the tile. Paste a different emoji to change it.
  Emoji are drawn by the reader's own device, so they look slightly different
  on Windows, Android, iPhone and Mac — that is normal and not a fault.

---

## `legal/` — Privacy Policy and Terms & Conditions

`data/legal/privacy-policy.json` and `data/legal/terms-and-conditions.json`
render at `/privacy-policy` and `/terms-and-conditions` through one shared
component. A section is `{ heading, body[], list[], table, note }` — add,
remove or reword sections in the JSON and the page, its numbering and its
"On this page" jump links all follow.

Contact details are **not** written into that text. `{{SITE_NAME}}`,
`{{EMAIL}}`, `{{PHONE}}`, `{{ADDRESS}}` and `{{URL}}` are filled from `SITE`
in `lib/data.ts`, so a phone number changes in one place. Bump `lastUpdated`
when the wording changes — it is shown on the page and drives `sitemap.xml`.

### Where the text came from

The **Terms** follow the operator's own terms document, reorganised into
sections: booking and advance payment, rescheduling, the 20/10-day
cancellation schedule, vouchers, force majeure, the anti-coercion and false
price clauses, fitness and medical disclosure, conduct, luggage, third-party
suppliers, liability capped at trip cost, and Dehradun jurisdiction. The
cancellation schedule matches `cancellationPolicy` in the trek JSON.

The **Privacy Policy** was written for this website rather than adapted from
the operator's existing one, which describes advertisers, affiliate networks,
tracking pixels, cookies, stored card numbers and sharing data with marketing
partners. None of that is true of this site, and publishing it would commit
the operator to practices they do not follow. What this policy states matches
what the code actually does: form fields only, no analytics, no tracking
cookies, no third-party scripts, no card data.

### Before launch

- **Have a lawyer review both.** They are drafts, not legal advice.
- `{{ADDRESS}}` still resolves to the placeholder in `SITE.address`. A privacy
  policy naming the wrong registered address is worse than no address.
- Two statements about the balance payment differ: the trek pages say
  "remaining payment on arrival" (from the brochures), while the Terms say the
  balance is due before the trek start date. Confirm which is right.
- The Privacy Policy still lists a "Booking form" among the places you collect
  personal information. Book Now now goes straight to Razorpay, so those
  details are collected by Razorpay rather than by this website. Ask your
  lawyer whether that line should be reworded.

---

## The Razorpay payment link — where to paste it

**File: `data/payment.json`**

The booking flow is:

```
Trek page  ->  Book Now  ->  Razorpay Payment Page
```

Every Book Now button on the site — the navbar, the mobile menu and each trek
sidebar — opens that page directly. The customer fills in their details once,
on Razorpay.

**How to switch on payment**

1. In your Razorpay Dashboard go to **Payment Pages**, open the page you want
   to use, and copy its link (usually `https://rzp.io/l/something`).
2. Open `data/payment.json` and paste it between the quotes on line 2:

   ```json
   "paymentPageUrl": "https://rzp.io/l/your-link-here",
   ```

3. Save, then publish the website again ("deploy").

**No Razorpay API key is needed.** A hosted Payment Page needs none, so no
secret is ever stored in this website — which is what lets the site stay a
static export with no server.

**While the link is empty:** Book Now takes the customer to the Contact page
instead, so the button still leads somewhere useful and never claims a booking
was made. Paste the link in and it goes to Razorpay again.

---

## Note for developers: how Book Now is wired

`lib/booking.ts` is the whole of it: it reads the link out of
`data/payment.json` and exports `bookNowHref`. The single `BookNowButton`
component is a plain anchor to that href, so the navbar, the mobile menu and
every trek sidebar stay in step with nothing per-page to update.

The trek is not passed to Razorpay. A hosted Payment Page collects only the
fields the operator configured on it in the Razorpay dashboard, and there is
no documented, page-independent query parameter for naming the trek — adding
one would just put a parameter in the URL that Razorpay ignores.

There is no success state on this site at all: success is the Razorpay
receipt, so nothing here can claim a booking was paid. No booking details are
collected by this website and nothing is emailed to the operator — Razorpay's
own payment notification is the record of a booking.

Card data never touches this site, which is what the Privacy Policy relies on.
Taking payment in-page instead would need Razorpay keys, server-side order
creation and signature verification — impossible on a static export without
adding backend infrastructure.

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
