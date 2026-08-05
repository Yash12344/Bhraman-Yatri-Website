/**
 * Shared shape for trek data extracted from the operator's PDF brochures.
 *
 * Extraction rule: every field mirrors what the brochure actually prints.
 * Nothing is inferred or invented — a field is `null` when the brochure does
 * not state it, and a list is `[]` when the brochure has no such section.
 */

export type Currency = "INR";

/**
 * A published price. Some brochures print a single fare; others (Har Ki Dun)
 * print several depending on the departure city, hence an array on `Trek`.
 */
export interface TrekPrice {
  amount: number;
  currency: Currency;
  /** Fare is quoted per person. */
  perPerson: boolean;
  /** Departure/return the fare covers, e.g. "Dehradun to Dehradun". */
  route: string | null;
  /** Brochure labels the fare "Starting from". */
  startingFrom: boolean;
  /** The fare exactly as printed, e.g. "Rs. 5,499/-". */
  raw: string;
}

/** One row of the brochure's "Brief Itinerary" page. */
export interface BriefItineraryDay {
  day: number;
  title: string;
  /** Distances/durations printed under the title, if any. */
  detail: string | null;
}

/** One full day page of the brochure. */
export interface ItineraryDay {
  day: number;
  title: string;
  altitude: string | null;
  driveDistance: string | null;
  trekDistance: string | null;
  duration: string | null;
  pickupPoint: string | null;
  dropPoint: string | null;
  /** Prose paragraphs, in order. */
  description: string[];
  /** Bulleted lines and "Note –" callouts printed on the same page. */
  notes: string[];
}

export interface CancellationRule {
  /** e.g. "20 days before the starting date of the Trek". */
  window: string;
  /** e.g. "Refund with 10% cancellation charges". */
  outcome: string;
}

export interface CancellationPolicy {
  rules: CancellationRule[];
  /** Trailing "Note :" under the rules. */
  note: string | null;
  /** The separate "REFUND" clause. */
  refund: string | null;
}

/**
 * The brochures have no page headed "Terms & Conditions"; they print a
 * "POLICIES" page whose remaining clauses are captured here.
 */
export interface TermsAndConditions {
  bookingConfirmation: string | null;
  keyNotes: string[];
}

export interface Faq {
  question: string;
  answer: string;
}

/** The brochure's "Available Dates" page, when present. */
export interface AvailableDates {
  months: { month: string; departures: string }[];
  notes: string[];
}

/** Provenance, so any value can be traced back to its brochure. */
export interface TrekSource {
  /** Original PDF filename. */
  file: string;
  /** Operator branding on the brochure. */
  brand: string;
  website: string | null;
  phones: string[];
  /** Sections absent from this brochure, recorded rather than fabricated. */
  missingSections: string[];
  /** Internal inconsistencies noticed in the brochure itself. */
  discrepancies: string[];
}

export interface Trek {
  name: string;
  slug: string;

  /** Duration exactly as printed, e.g. "5 Days/4 Nights". */
  duration: string;
  durationDays: number | null;
  durationNights: number | null;

  price: TrekPrice[];

  region: string;
  /** Brochure calls this "Grade", e.g. "Easy to Moderate". */
  difficulty: string;
  altitude: string;
  trekDistance: string;
  bestSeason: string;
  baseCamp: string;
  pickup: string;
  drop: string;
  nearestAirport: string;
  railwayStation: string;

  shortOverview: string | null;
  fullOverview: string | null;
  highlights: string[];

  briefItinerary: BriefItineraryDay[];
  itinerary: ItineraryDay[];

  inclusions: string[];
  exclusions: string[];
  /** The brochure's "Backpack Offloading Charges" panel. */
  backpackOffloading: string[];
  thingsToCarry: string[];
  /** Callouts printed under the Things to Carry grid. */
  thingsToCarryNotes: string[];

  cancellationPolicy: CancellationPolicy;
  termsAndConditions: TermsAndConditions;
  faqs: Faq[];

  availableDates: AvailableDates | null;

  source: TrekSource;
}
