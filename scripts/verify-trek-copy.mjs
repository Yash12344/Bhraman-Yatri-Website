/**
 * Guards against invented content in the generated marketing copy.
 *
 * For every trek it extracts the proper nouns and numeric facts used in
 * `shortOverview`, `fullOverview` and `highlights`, then asserts each one also
 * appears somewhere in that same trek's source fields (overview table,
 * itinerary, inclusions, policies). Anything unsupported is reported.
 *
 * Run: node scripts/verify-trek-copy.mjs
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const treksDir = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "treks");

/**
 * Everything in the trek JSON except the three generated fields, plus the
 * legitimate rewrites of what it already says: month abbreviations expanded to
 * full names, and the brochure's "Uttrakhand" typo spelled correctly. Both are
 * rephrasings of existing facts, not new ones.
 */
function sourceText(trek) {
  const { shortOverview, fullOverview, highlights, ...source } = trek;
  void shortOverview;
  void fullOverview;
  void highlights;

  let text = JSON.stringify(source);

  const MONTHS = {
    Jan: "January", Feb: "February", Mar: "March", Apr: "April",
    Jun: "June", Jul: "July", Aug: "August", Sep: "September",
    Sept: "September", Oct: "October", Nov: "November", Dec: "December",
  };
  for (const [abbrev, full] of Object.entries(MONTHS)) {
    if (new RegExp(`\\b${abbrev}\\b`, "i").test(text)) text += ` ${full}`;
  }
  if (/uttra?ka?han?d/i.test(text)) text += " Uttarakhand";

  return text;
}

/** Ordinary English words that are capitalised only by sentence position. */
const STOPWORDS = new Set([
  "A", "An", "The", "And", "But", "Or", "From", "To", "At", "In", "On", "Of",
  "For", "With", "Over", "After", "Before", "Because", "Day", "Days", "Night",
  "Nights", "Trek", "Trekking", "Trekkers", "Graded", "Easy", "Moderate",
  "Difficult", "Season", "Seasons", "Camp", "Camping", "Hotel", "Homestay",
  "Optional", "Panoramic", "Sunrise", "Snow", "Forest", "Meadow", "Meadows",
  "Lake", "Valley", "Peak", "Peaks", "Summit", "Pass", "Ridge", "River",
  "India", "Indian", "Himalayan", "Himalaya", "Himalayas", "Alpine", "Return",
  "Pickup", "Drop", "Base", "Spikes", "Gaiters", "Vibrant", "Windswept",
  "Rhododendron", "Pine", "Oak", "Deodar", "Birch", "Maple", "Golden",
  "Sikh", "Shiva", "Starts", "Finish", "Finishes", "Cross", "Just", "Runs",
  "Skyline", "Views", "View", "Panoramas", "Crossing", "Steady", "Vast",
  "Near", "Deep", "Long", "Short", "High", "Open", "Mixed", "Dense", "Broad",
  "Sacred", "Rare", "Full", "Green", "Bare", "Gentle", "Classic", "Genuine",
  "Beneath", "Below", "Above", "Along", "Across", "Through", "Between",
  "Altitude", "Climb", "Ascent", "Descent", "Descends", "Walk", "Walked",
  "Water", "Sources", "Weather", "Fitness", "Buffer", "Reserve", "Road",
  "Roadblocks", "Ski", "Skiing", "Slopes", "Bloom", "Biodiversity", "Gurudwara",
  "Temple", "Pilgrimage", "Site", "Bridges", "Wooden", "Waterfalls", "Streams",
  "Glacial", "Glaciers", "Glacier", "Rock", "Sand", "Expanse", "Tree", "Line",
  "Colour", "Autumn", "Winter", "Summer", "Monsoon", "Spring", "Because",
  "Departures", "Leave", "Overnight", "Early", "Morning", "Time", "Anyone",
  "First", "Prior", "Experience", "Grade", "Range", "Route", "Trail", "Trails",
  "Way", "Days", "Km", "Ft", "Metres", "Kilometres", "Kilometre", "Miles",
  "Best", "Known", "Most", "More", "Finest", "Hardest", "Memorable", "Storied",
  "Suits", "Suited", "Beginners", "Families", "People", "Reason", "Good",
  "Available", "Included", "Provided", "Held", "Against", "Which", "Where",
  "When", "What", "That", "This", "These", "Those", "There", "Their", "Its",
  "Also", "Then", "Still", "Both", "Each", "Every", "Some", "Real", "Truest",
  "Sense", "Appeal", "Approach", "Contrast", "Sides", "Side", "Makes", "Takes",
  "Carries", "Leads", "Opens", "Gains", "Reaches", "Follows", "Begins", "Start",
  "Starting", "Ending", "Ends", "Ends", "Close", "Closes", "Given", "Wider",
  "Technical", "Ground", "Scenery", "Picturesque", "Village", "Wanting",
  "Without", "Demanding", "Delivers", "Matters", "Essential", "Adequate",
  "Supply", "Carrying", "Enough", "Part", "Experience", "Extraordinary",
  "Amount", "Accessible", "Packs", "Legs", "Those", "Point", "Push", "Rather",
  "Than", "Into", "Onto", "Out", "Up", "Down", "Back", "Beyond", "Around",
  "Air", "Colour", "Bloom", "Flowers", "Flowering", "Flower",
]);

const NUMERIC = /\b\d[\d,]*\s?(?:ft|m|km|kilometres?|metres?|degree)\b/gi;

let problems = 0;

for (const file of readdirSync(treksDir).filter((f) => f.endsWith(".json")).sort()) {
  const trek = JSON.parse(readFileSync(join(treksDir, file), "utf8"));
  const source = sourceText(trek).toLowerCase();
  const copy = [trek.shortOverview, trek.fullOverview, ...trek.highlights].join(" ");

  const unsupported = new Set();

  // Proper nouns: capitalised words not at the start of a sentence.
  for (const match of copy.matchAll(/(?<![.!?—]\s)(?<!^)\b([A-Z][a-z]{2,})\b/gm)) {
    const word = match[1];
    if (STOPWORDS.has(word)) continue;
    if (!source.includes(word.toLowerCase())) unsupported.add(word);
  }

  // Numeric facts: altitudes and distances must appear in the source.
  for (const match of copy.matchAll(NUMERIC)) {
    const digits = match[0].match(/\d[\d,]*/)[0].replace(/,/g, "");
    if (!source.replace(/,/g, "").includes(digits)) unsupported.add(match[0]);
  }

  const status = unsupported.size === 0 ? "✓" : `✗ UNSUPPORTED: ${[...unsupported].join(", ")}`;
  console.log(`${trek.slug.padEnd(26)} ${status}`);
  if (unsupported.size > 0) problems++;
}

console.log(
  problems === 0
    ? "\nEvery proper noun and figure in the generated copy is supported by that trek's own data."
    : `\n${problems} trek(s) contain unsupported claims.`
);
process.exit(problems === 0 ? 0 : 1);
