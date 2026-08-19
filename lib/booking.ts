/**
 * The Book Now flow.
 *
 *   Trek page  ->  Book Now  ->  /booking?trek=slug  ->  Razorpay Payment Page
 *
 * The operator takes payment on a hosted Razorpay Payment Page, so this site
 * never handles card data and needs no server of its own — which is what lets
 * it stay a static export. There is no Razorpay API key here, secret or
 * publishable: a hosted page needs none.
 *
 * The page URL lives in `data/payment.json` — a data file with instructions
 * inside it — so the client can paste it in without touching code.
 */
import payment from "@/data/payment.json";

/** Where the booking form lives. */
export const BOOKING_PATH = "/booking";

export const PAYMENT_PAGE_URL: string = payment.paymentPageUrl.trim();

/** True once the client has pasted their Razorpay Payment Page link in. */
export const hasPaymentPage: boolean = PAYMENT_PAGE_URL !== "";

/** Book Now target. Carries the trek so the form knows what is being booked. */
export function bookingStartHref(trekSlug?: string): string {
  return trekSlug
    ? `${BOOKING_PATH}?trek=${encodeURIComponent(trekSlug)}`
    : BOOKING_PATH;
}

export interface PaymentPrefill {
  name: string;
  email: string;
  phone: string;
}

/**
 * The Razorpay Payment Page URL with the customer's details attached, so they
 * do not retype what they just entered.
 *
 * Returns null when no payment page is configured — the caller must then show
 * an error rather than pretending anything succeeded.
 *
 * Razorpay reads `prefill[...]` query parameters on its hosted pages. If a
 * given page ignores them the customer simply fills those fields in again;
 * nothing breaks either way.
 */
export function paymentPageUrlWithPrefill(prefill: PaymentPrefill): string | null {
  if (!hasPaymentPage) return null;

  try {
    const url = new URL(PAYMENT_PAGE_URL);
    url.searchParams.set("prefill[name]", prefill.name);
    url.searchParams.set("prefill[email]", prefill.email);
    url.searchParams.set("prefill[contact]", prefill.phone);
    return url.toString();
  } catch {
    // A malformed URL in the config file: send them to it unchanged rather
    // than dropping the booking on the floor.
    return PAYMENT_PAGE_URL;
  }
}
