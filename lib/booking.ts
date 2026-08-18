/**
 * Where "Book Now" sends people.
 *
 * The operator takes payment on a hosted Razorpay Payment Page rather than on
 * this site, so every Book Now button is a link to that page. The link lives in
 * `data/payment.json` — a data file with instructions inside it — so the client
 * can paste it in without touching code.
 *
 * While the link is empty, Book Now falls back to the contact page. A booking
 * button that goes nowhere is worse than one that starts a conversation.
 */
import payment from "@/data/payment.json";

/** Used when no payment page has been set yet. */
const FALLBACK_HREF = "/contact";

export const PAYMENT_PAGE_URL: string = payment.paymentPageUrl.trim();

/** True once the client has pasted their Razorpay link in. */
export const hasPaymentPage: boolean = PAYMENT_PAGE_URL !== "";

/** The href every Book Now button points at. */
export const bookingHref: string = hasPaymentPage
  ? PAYMENT_PAGE_URL
  : FALLBACK_HREF;
