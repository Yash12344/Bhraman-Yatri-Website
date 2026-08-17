/**
 * Privacy Policy and Terms & Conditions.
 *
 * The text lives in `data/legal/*.json` so the operator (or their lawyer) can
 * edit it without touching code. Contact details are not repeated in that
 * text — `{{tokens}}` are filled from `SITE`, so changing a phone number in
 * one place updates both documents.
 */
import { SITE } from "@/lib/data";
import privacyPolicy from "@/data/legal/privacy-policy.json";
import termsAndConditions from "@/data/legal/terms-and-conditions.json";

export interface LegalSection {
  heading: string;
  /** Paragraphs, in order. */
  body?: string[];
  /** Bulleted points shown after the paragraphs. */
  list?: string[];
  /** A two-column table, for things like the cancellation windows. */
  table?: { columns: [string, string]; rows: [string, string][] };
  /** A callout rendered after everything else in the section. */
  note?: string;
}

export interface LegalDocument {
  slug: string;
  title: string;
  summary: string;
  /** ISO date, shown as "Last updated". */
  lastUpdated: string;
  sections: LegalSection[];
}

const TOKENS: Record<string, string> = {
  "{{SITE_NAME}}": SITE.name,
  "{{EMAIL}}": SITE.email,
  "{{PHONE}}": SITE.phone,
  "{{ADDRESS}}": SITE.address,
  "{{URL}}": SITE.url,
};

function fill(text: string): string {
  return Object.entries(TOKENS).reduce(
    (filled, [token, value]) => filled.split(token).join(value),
    text
  );
}

/** Interpolates every string in the document, leaving its shape untouched. */
function hydrate(doc: LegalDocument): LegalDocument {
  return {
    ...doc,
    summary: fill(doc.summary),
    sections: doc.sections.map((section) => ({
      ...section,
      heading: fill(section.heading),
      body: section.body?.map(fill),
      list: section.list?.map(fill),
      table: section.table && {
        columns: section.table.columns,
        rows: section.table.rows.map(
          ([left, right]) => [fill(left), fill(right)] as [string, string]
        ),
      },
      note: section.note ? fill(section.note) : undefined,
    })),
  };
}

export const PRIVACY_POLICY = hydrate(privacyPolicy as LegalDocument);
export const TERMS_AND_CONDITIONS = hydrate(
  termsAndConditions as LegalDocument
);
