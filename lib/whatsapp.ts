/**
 * Customer enquiries go to WhatsApp, not to email.
 *
 * The contact and enquiry forms validate as normal, then open a WhatsApp
 * click-to-chat link with the enquiry already written out. The customer
 * presses Send themselves — the site never transmits their details anywhere,
 * so there is no endpoint, no third-party service and nothing stored.
 *
 * `wa.me` is deliberate: it opens the app on a phone and WhatsApp Web or the
 * desktop app on a computer, without hard-coding either.
 */
import { SITE } from "@/lib/data";

/**
 * The operator's WhatsApp number in the form wa.me expects: country code, no
 * "+", no spaces, no punctuation. Derived from the number already configured
 * for the site so there is only one place to change it.
 */
export const WHATSAPP_NUMBER: string = SITE.whatsappHref.replace(/\D/g, "");

/** One "Label: value" line, skipped entirely when the value is empty. */
type Line = [label: string, value: string | undefined];

/**
 * Builds the click-to-chat URL. Every field is URL-encoded together, so line
 * breaks, punctuation and non-Latin scripts all survive intact.
 *
 * Returns null if there is no usable number to send to, so the caller can
 * show an error rather than opening a broken link.
 */
export function buildWhatsAppEnquiryUrl(lines: Line[]): string | null {
  if (!WHATSAPP_NUMBER) return null;

  const body = lines
    .filter(([, value]) => value != null && value.trim() !== "")
    .map(([label, value]) => `${label}: ${value!.trim()}`)
    .join("\n");

  const message = [
    `Hello ${SITE.name},`,
    "",
    "I have an enquiry from your website.",
    "",
    body,
    "",
    "Thank you.",
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Opens WhatsApp in a new tab. Returns false when the browser blocked it, so
 * the caller can say so instead of implying the enquiry is on its way.
 *
 * `noopener` is applied by clearing `opener` afterwards rather than through
 * the features string: passing it there makes window.open return null even on
 * success, which would report every opened tab as a failure.
 */
export function openWhatsApp(url: string): boolean {
  const opened = window.open(url, "_blank");
  if (!opened) return false;
  opened.opener = null;
  return true;
}

/** Shown once WhatsApp is open. Deliberately not "message sent". */
export const WHATSAPP_OPENED_MESSAGE =
  "WhatsApp has been opened with your enquiry. Please press Send to submit it.";

export const WHATSAPP_FAILED_MESSAGE =
  "Unable to open WhatsApp. Please try again.";
