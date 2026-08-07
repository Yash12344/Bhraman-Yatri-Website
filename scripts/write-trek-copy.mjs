/**
 * Writes the marketing `shortOverview`, `fullOverview` and `highlights` fields
 * into data/treks/*.json.
 *
 * Every statement below is a rewrite of a fact already present in that trek's
 * JSON — the overview table, the day-wise itinerary, the inclusions or the key
 * notes. No destination, activity, facility, viewpoint or peak is mentioned
 * that the brochure did not state. Reviews, ratings and FAQs are never
 * generated here.
 *
 * Run: node scripts/write-trek-copy.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const treksDir = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "treks");

const COPY = {
  "brahmatal-trek": {
    shortOverview:
      "A winter classic in Garhwal — near-frozen alpine lakes, oak and rhododendron forest, and a 180-degree Himalayan skyline from 12,250 ft.",
    fullOverview:
      "Brahmatal is one of Uttarakhand's most rewarding winter treks, and at Easy to Moderate grade it suits trekkers stepping up to their first snow route. The journey begins at Haridwar or Rishikesh and follows mountain roads linking the Kumaon hills to Garhwal, with Nanda Ghunti's peak appearing before you reach the base camp at Lohajung. Over 24 kilometres the trail climbs from Lohajung market, past Mandoli village, to Bekaltal — a lake at 9,690 ft that lies almost frozen through winter. Beyond it, thickets of oak and rhododendron give way to open meadows as the tree line ends, opening views of Mount Trishul and Nanda Ghunti. The zigzag ascent to Brahmatal Top reaches 12,250 ft, where a 180-degree sweep of the Himalayan range unfolds around Brahmatal Lake, before the descent to Khorurai at 9,150 ft. Running December to March, this six-day trek combines hotel, homestay and camp nights.",
    highlights: [
      "Brahmatal Top at 12,250 ft, with a 180-degree view of the Himalayan range",
      "Near-frozen alpine lakes at Bekaltal (9,690 ft) and Brahmatal",
      "Views of Mount Trishul and Nanda Ghunti from the meadows",
      "Oak and rhododendron forest trails above Lohajung",
      "Open meadows beyond the tree line",
      "24 km of trekking across 6 days, graded Easy to Moderate",
      "A December-to-March winter season",
      "Hotel, homestay and camping nights included",
    ],
  },

  "chopta-tungnath-trek": {
    shortOverview:
      "Three days to the world's highest Shiva temple and a 360-degree summit — the most accessible high-altitude trek we run.",
    fullOverview:
      "Chopta Tungnath with Chandrashila packs an extraordinary amount into three days, and at Easy grade with just 14 kilometres of walking it is the most accessible high-altitude trek in our range. Departures leave overnight from Delhi or early morning from Rishikesh, driving past the sacred confluence at Devprayag Sangam and on through Ukhimath to Sari Village. If time allows on arrival, a two-kilometre walk leads to Deoriatal, a lake known for its crystal-clear reflections of the Himalayan peaks. The main day opens with a drive through dense forest to Chopta, then a 3.5 kilometre climb to Tungnath Temple — the highest Shiva temple in the world. A further 1.5 kilometre ascent gains Chandrashila Peak at 12,110 ft, where a 360-degree panorama takes in Chaukhamba and Nanda Devi. Because the route runs round the year, it suits first-time trekkers and anyone short on time.",
    highlights: [
      "Tungnath Temple — the highest Shiva temple in the world",
      "360-degree summit views from Chandrashila Peak at 12,110 ft",
      "Panoramas taking in Chaukhamba and Nanda Devi",
      "Deoriatal and its crystal-clear reflections of the Himalayan peaks",
      "The sacred confluence at Devprayag Sangam en route",
      "Just 14 km of trekking, graded Easy",
      "Runs round the year",
      "Pickup from either Rishikesh or Delhi",
    ],
  },

  "dayara-bugyal-trek": {
    shortOverview:
      "One of Uttarakhand's broadest high-altitude meadows, reached in four days on an easy forest trail from Raithal.",
    fullOverview:
      "Dayara Bugyal is a meadow trek in the truest sense — a gentle four-day walk that opens onto one of the broadest alpine grasslands in Uttarakhand. Graded Easy and covering 22 kilometres, it suits beginners and anyone wanting real Himalayan scenery without technical ground. The trek starts from the picturesque village of Raithal, an eight to nine hour drive from Dehradun railway station. From there the trail climbs steadily through dense forest to the camp at Gui, gaining height from 7,150 ft to 9,600 ft. The following day is the highlight: a hike from Gui up to Dayara Bugyal at 12,000 ft, where the meadows spread out in every direction, with the option of continuing to Bakaria Top — also known as Dayara Top — for a wider panorama. With a long season running October to June, Dayara Bugyal can be walked as green summer meadow or under winter snow.",
    highlights: [
      "The vast high-altitude meadows of Dayara Bugyal at 12,000 ft",
      "Optional climb to Bakaria Top, also known as Dayara Top",
      "Steady forest ascent from Raithal to the camp at Gui",
      "Altitude gain from 7,150 ft to 12,000 ft across the trek",
      "22 km across 4 days, graded Easy",
      "A long season, October right through to June",
      "Camping at Gui, with hotel or homestay at base",
      "Pickup from Dehradun railway station",
    ],
  },

  "hampta-pass-trek": {
    shortOverview:
      "A crossover trek from the green valleys above Manali into the rocky Chandra Valley, with an optional drive to Chandratal, the Moon Lake.",
    fullOverview:
      "Hampta Pass is the classic crossover trek — in five days it carries you from the lush green valleys above Manali over a 14,100 ft pass into the rugged, rocky landscape of the Chandra Valley, and the contrast between the two sides is what makes it memorable. The route begins with a short drive from Manali to Jobra, then an easy two-kilometre walk to the Chika campsite at 10,100 ft. From there it follows alpine meadows and streams beneath the Dhauladhar range to Balu Ka Ghera at 12,400 ft, a broad expanse of sand and rock. The crossing itself is the hardest and finest day: a climb to Hampta Pass with panoramic views of towering peaks and glaciers, followed by a steep descent to Shea Goru. After dropping to Chatru and the Chandra Valley, road and weather conditions permitting, a drive reaches Chandratal — the Moon Lake — at 14,100 ft. Graded Moderate, 25 kilometres, June to September.",
    highlights: [
      "Cross the 14,100 ft Hampta Pass into the Chandra Valley",
      "Panoramic views of towering peaks and glaciers from the pass",
      "Alpine meadows and streams beneath the Dhauladhar range",
      "Camp at Balu Ka Ghera, an expanse of sand and rock at 12,400 ft",
      "Optional drive to Chandratal, the Moon Lake, at 14,100 ft",
      "Return drive through the Spiti Valley and over Rohtang Pass",
      "25 km across 5 days, graded Moderate",
      "A summer season trek, June to September",
    ],
  },

  "har-ki-dun-trek": {
    shortOverview:
      "A cradle of a valley below Swargarohini, reached along river trails, wooden bridges and waterfalls.",
    fullOverview:
      "Har Ki Dun is a valley trek rather than a summit push, and its appeal is the approach: 35 kilometres of river trails, wooden bridges, dense forest and waterfalls leading into one of Garhwal's most storied valleys. The drive from Dehradun follows the Tons and Yamuna rivers through Purola and Mori to the base at Sankri. From there the route runs to Seema via Gangad on forest trails and riverside paths, then climbs beside the Har Ki Dun River to the Waterfall Camp at around 3,050 m. The finest day walks through alpine meadows and glacial streams into Har Ki Dun Valley at 3,566 m, with Swargarohini, Bandarpoonch, Black Peak and the Jaundar Glacier in view, and an optional hike to Maninda Tal for those with the weather and the legs for it. A buffer day is held in reserve against bad weather, which may take in Osla village and the Someshwar Mahadev Temple.",
    highlights: [
      "Har Ki Dun Valley at 3,566 m, beneath Swargarohini",
      "Views of Swargarohini, Bandarpoonch, Black Peak and the Jaundar Glacier",
      "Optional hike to Maninda Tal, weather and fitness permitting",
      "River trails, wooden bridges and waterfalls along the Har Ki Dun River",
      "Alpine meadows and glacial streams on the valley day",
      "Drive in along the Tons and Yamuna rivers via Purola and Mori",
      "35 km across 6 days, graded Moderate",
      "A buffer day held in reserve for bad weather and roadblocks",
    ],
  },

  "kedarkantha-trek": {
    shortOverview:
      "India's best-known winter summit — deodar forest, a lake camp and a 12,500 ft top with Swargarohini on the skyline.",
    fullOverview:
      "Kedarkantha is the winter trek most people in India start with, and for good reason: at Easy to Moderate grade and 20 kilometres across five days, it delivers a genuine 12,500 ft summit without demanding prior experience. The drive from Dehradun runs alongside the Yamuna and other rivers through pine forest to the base village of Sankri. Day two climbs through deodar, oak and birch to Juda Ka Talab at 9,100 ft, a lake camp reached on a trail carpeted in maple leaves. The next stage passes through pine and oak into open meadows at the base camp, 11,250 ft, with Swargarohini, Kala Nag and Bandarpoonch on the skyline. Summit day climbs to 12,500 ft and returns, descending past crystal-clear streams to camp beneath an open, star-filled sky. Spikes and gaiters are provided for the summit climb, and the season runs November to April.",
    highlights: [
      "The Kedarkantha summit at 12,500 ft",
      "Skyline views of Swargarohini, Kala Nag and Bandarpoonch",
      "Camp beside the Juda Ka Talab lake at 9,100 ft",
      "Deodar, oak and birch forest trails above Sankri",
      "Open meadows at the 11,250 ft base camp",
      "Spikes and gaiters provided for the summit climb",
      "20 km across 5 days, graded Easy to Moderate",
      "A winter season, November to April",
    ],
  },

  "kuari-pass-trek": {
    shortOverview:
      "Ridge walking at 12,750 ft with Nanda Devi and Trishul across the valley, finishing through the meadows of Gurson Bugyal.",
    fullOverview:
      "Kuari Pass is a ridge-and-forest trek with some of the finest peak views in Garhwal, and its long October-to-April season means it can be walked in autumn colour or in deep winter snow. From Rishikesh the drive climbs past Devprayag and Chamoli to Joshimath. The walking begins above Tugashi village, rising through a mix of steep and moderate climbs to the camp at Gulling Top, 9,700 ft, known for its sunrises. Day three enters the mixed oak and rhododendron forest of Tali, camping at 11,050 ft. Summit day crosses Khullara Top to the Kuari Pass at 12,750 ft, where high snow and squalling wind on the ridges are part of the experience and the Garhwal peaks open up. The finale descends through dense forest into Gurson Bugyal, a vast green meadow with panoramic views of Nanda Devi and Trishul, ending at Auli — better known for its ski slopes.",
    highlights: [
      "Kuari Pass at 12,750 ft, reached by way of Khullara Top",
      "Panoramic views of Nanda Devi and Trishul from Gurson Bugyal",
      "Sunrise from the Gulling Top camp at 9,700 ft",
      "Mixed oak and rhododendron forest camp at Tali, 11,050 ft",
      "Finish at Auli, known for its skiing slopes",
      "Drive in past Devprayag and Chamoli",
      "31 km across 6 days, graded Easy to Moderate",
      "A long season from October to April",
    ],
  },

  "sar-pass-trek": {
    shortOverview:
      "A snow crossing above the Parvati Valley at 4,200 m, with a sunrise summit and a forest descent to Barshaini.",
    fullOverview:
      "Sar Pass is the best-known trek out of the Parvati Valley, and at 4,200 m it offers a genuine snow crossing on a five-day, 33-kilometre route graded Moderate. The trail starts at Kasol, 1,700 m, climbing through dense forest of rhododendron, pine and golden oak to Grahan Village at 2,350 m. From there it gains over a thousand metres through lush meadows and towering trees to camp at Min Thach, 3,400 m. The route then turns rugged, rising above the tree line into windswept terrain at Nagaru, 3,800 m — a stretch with no water sources along the way, so carrying an adequate supply matters. Crossing day begins early for a steep ascent on snow to the Sar Pass summit, where sunrise opens panoramic views over the Parvati Valley and the surrounding peaks, before a long descent to the meadow camp at Biskeri Thach. The trek closes with a forest walk to Barshaini and a drive back to Kasol.",
    highlights: [
      "A snow crossing at the Sar Pass summit, 4,200 m",
      "Sunrise and panoramic views over the Parvati Valley",
      "Rhododendron, pine and golden oak forest above Kasol",
      "Meadow camps at Min Thach (3,400 m) and Biskeri Thach (3,350 m)",
      "Windswept high camp at Nagaru, above the tree line",
      "33 km across 5 days, graded Moderate",
      "Seasons: April to June, and October",
      "Starts and finishes at Kasol in the Parvati Valley",
    ],
  },

  "valley-of-flowers-trek": {
    shortOverview:
      "A monsoon-season trek into a valley in full bloom, paired with the high gurudwara and lake at Hemkund Sahib.",
    fullOverview:
      "The Valley of Flowers is a monsoon trek — in the one season when most Himalayan routes close, this one comes into its own. Across six days and 38 kilometres it pairs the flowering valley with the sacred lake and gurudwara at Hemkund Sahib. The journey opens with a long drive from Rishikesh to Govindghat, then a short transfer to Poolna and a nine-kilometre climb to Ghangaria at 10,500 ft, the base for both walks. From there a four-kilometre trail each way leads into the Valley of Flowers at 11,550 ft, a full day given over to vibrant meadows, blooming flowers and the valley's remarkable biodiversity. The following day climbs to Hemkund Sahib at 14,100 ft, a Sikh pilgrimage site above 4,298 m where the gurudwara stands beside the lake, with panoramic views of the surrounding mountains. Graded Moderate, the season runs mid-July to mid-September, when the flowers are at their best.",
    highlights: [
      "The Valley of Flowers in bloom at 11,550 ft",
      "Hemkund Sahib and its gurudwara at 14,100 ft",
      "A rare monsoon-season Himalayan trek",
      "Vibrant meadows and the valley's remarkable biodiversity",
      "Base camp at Ghangaria, 10,500 ft",
      "38 km across 6 days, graded Moderate",
      "Season of mid-July to mid-September, at peak bloom",
      "Pickup and drop at Rishikesh",
    ],
  },
};

let written = 0;
for (const [slug, copy] of Object.entries(COPY)) {
  const file = join(treksDir, `${slug}.json`);
  const trek = JSON.parse(readFileSync(file, "utf8"));

  trek.shortOverview = copy.shortOverview;
  trek.fullOverview = copy.fullOverview;
  trek.highlights = copy.highlights;

  writeFileSync(file, `${JSON.stringify(trek, null, 2)}\n`);

  const words = copy.fullOverview.trim().split(/\s+/).length;
  const flag = words >= 120 && words <= 200 ? "ok" : "OUT OF RANGE";
  console.log(
    `${slug.padEnd(26)} overview=${String(words).padStart(3)} words (${flag})  highlights=${copy.highlights.length}`
  );
  written++;
}
console.log(`\nUpdated ${written} trek files.`);
