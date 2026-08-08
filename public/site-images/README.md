# How to change the pictures on the website

**You do not need to know any coding to do this.**

Every picture on the website lives in this folder. To change a picture, you
replace the file with your own — **keeping the file name exactly the same**.
The website will then show your new picture in that spot.

---

## The three rules

1. **Keep the file name exactly the same**, including the `.jpg` at the end.
   If the old file is `hampta-pass-trek.jpg`, your new file must also be
   called `hampta-pass-trek.jpg`.
2. **Keep the same file type.** Save your picture as a `.jpg`.
3. **Put it in the same folder** it came from (`hero`, `treks`, or `general`).

That's it. Same name, same folder — the website does the rest.

> **Two folders work differently — you can add as many new pictures as you
> like there, and nothing needs to be renamed:**
>
> - **`gallery/`** — everything you drop in here shows up on the Gallery page.
>   No limit, any file name, sub-folders welcome. See `gallery/README.md`.
> - **`blog/`** — the big picture at the top of a blog article. See
>   `blog/README.md`.

---

## Which file is which picture?

### `hero/` — the three big pictures at the very top of the site

These rotate automatically every few seconds.

| File name | Where it appears | Best size |
|---|---|---|
| `slide-1-explore-beyond-limits.jpg` | 1st big banner ("EXPLORE BEYOND LIMITS") | 1920 × 1080 |
| `slide-2-walk-the-himalayas.jpg` | 2nd big banner ("WALK THE HIMALAYAS") | 1920 × 1080 |
| `slide-3-adventure-awaits-you.jpg` | 3rd big banner ("ADVENTURE AWAITS YOU") | 1920 × 1080 |

**Tip:** the heading and buttons sit over the **left side** of these pictures,
so choose photos where the interesting part (a person, a peak) is on the
**right side**. It will look much better.

### `treks/` — the trek pictures

Each file is named after the trek it belongs to, so it is easy to find. These
appear on the "Popular Treks" cards and as the small thumbnails in the
"Treks By Season" boxes.

| File name | Trek |
|---|---|
| `hampta-pass-trek.jpg` | Hampta Pass Trek |
| `kedarkantha-trek.jpg` | Kedarkantha Trek |
| `valley-of-flowers-trek.jpg` | Valley of Flowers Trek |
| `kuari-pass-trek.jpg` | Kuari Pass Trek |
| `chopta-tungnath-trek.jpg` | Chopta Tungnath Trek |
| `brahmatal-trek.jpg` | Brahmatal Trek |
| `dayara-bugyal-trek.jpg` | Dayara Bugyal Trek |
| `bhrigu-lake-trek.jpg` | Bhrigu Lake Trek |
| `sar-pass-trek.jpg` | Sar Pass Trek |
| `har-ki-dun-trek.jpg` | Har Ki Dun Trek |

Best size: **1200 × 900** (a landscape photo). The card shows a wide strip
from the middle of the photo, so keep the main subject centred.

Want more than one photo for a trek? Make a folder at
`treks/gallery/<trek name>/` — for example `treks/gallery/kedarkantha-trek/` —
and drop in as many pictures as you like. They appear in that trek's photo
section and on the Gallery page.

### `gallery/` — your photo album

Drop photographs here and they appear on the Gallery page. There is no limit
and no naming rule. Full instructions are in `gallery/README.md`.

### `blog/` — blog article pictures

One picture per article, named after the article's web address. Full
instructions are in `blog/README.md`.

### `general/` — everything else

| File name | Where it appears | Best size |
|---|---|---|
| `enquiry-form-background.jpg` | Faded mountains behind "PLAN YOUR ADVENTURE" | 1000 × 1400 |

This one is shown very faded on purpose, behind the text. A simple, calm
mountain photo works best here.

---

## After you replace a picture

The website needs to be **published again** (your developer or hosting
provider calls this "deploy" or "redeploy") for the change to appear online.
This is one click on most hosting services. Until that happens, the old
picture may still show.

If you replaced a picture, redeployed, and still see the old one, do a hard
refresh in your browser: **Ctrl + F5** on Windows, or **Cmd + Shift + R** on
a Mac.

---

## A few tips for good-looking photos

- **Use large, sharp photos.** Small or blurry pictures will look fuzzy when
  stretched across the screen.
- **Keep files under about 500 KB each** where you can. Very heavy photos make
  the site slow to load. Free tools like [Squoosh](https://squoosh.app) or
  [TinyPNG](https://tinypng.com) shrink a photo without making it look worse.
- **Make sure you are allowed to use the photo.** Use your own photographs, or
  free-to-use ones from sites like Unsplash or Pexels.

---

## Adding a brand new trek

Adding a whole new trek (not just changing its photo) does need a small code
change — the trek's name, price and number of days live in the website's text
file. Ask your developer; it is a two-minute job for them.

---

## Note for developers

The pictures currently in this folder are **temporary placeholders**, generated
by `scripts/generate-placeholders.mjs` because the build environment had no
internet access to fetch stock photography. Replace them with real photographs
using the same file names.

Paths are referenced as plain strings in `lib/data.ts` (and
`components/enquiry/EnquirySection.tsx` for the enquiry background), so
swapping the files requires no code change. `images.unsplash.com` is already
whitelisted in `next.config.ts` if you would rather point at remote URLs.
