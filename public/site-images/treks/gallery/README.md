# Per-trek photo galleries

**Every trek already has its own folder here.** Open the folder named after the
trek and drop your photographs in. That's the whole job — nothing to rename, no
folder to create, no code to touch.

    bhrigu-lake/            <- has photos, so its Gallery section shows
    kedarkantha-trek/       <- empty, so its Gallery section stays hidden
    hampta-pass-trek/
    valley-of-flowers-trek/
    ...and one for every other trek

- **As many photos as you like** in each folder. There is no limit.
- **Any file name.** `.jpg`, `.jpeg`, `.png`, `.webp` and `.avif` all work.
- Photos appear in **two** places: the Gallery section on that trek's own page,
  and the website's main Gallery page.

A trek's Gallery section only appears once you have put at least one photo in
its folder, so an empty folder never leaves an empty section on the page. This
is why Bhrigu Lake currently shows a Gallery and the other treks do not.

## Naming tip

The website turns the file name into the photo's description for Google and
for screen readers. `summit-sunrise.jpg` becomes "Summit sunrise". A camera
name like `IMG_2291.jpg` still works — it just gets a generic description.

## Adding a brand new trek

When a new trek is added, create a folder here named exactly after that trek's
file in `data/treks/` — `data/treks/kedarkantha-trek.json` pairs with a folder
called `kedarkantha-trek`. Your developer does this when they add the trek.

## After adding photos

The website needs to be published again (your developer or hosting provider
calls this "deploy") for new photos to appear online.
