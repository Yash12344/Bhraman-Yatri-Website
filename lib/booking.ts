/**
 * The Book Now flow.
 *
 *   Trek page  ->  Book Now  ->  Razorpay Payment Page
 *
 * The operator takes payment on a hosted Razorpay Payment Page, so this site
 * never handles card data and needs no server of its own — which is what lets
 * it stay a static export. There is no Razorpay API key here, secret or
 * publishable: a hosted page needs none.
 *
 * Book Now is a plain link straight to that page. The customer enters their
 * details once, on Razorpay, rather than typing them here and again there.
 *
 * The page URL lives in `data/payment.json` — a data file with instructions
 * inside it — so the client can paste it in without touching code.
 */
import payment from "@/data/payment.json";

const PAYMENT_PAGE_URL: string = payment.paymentPageUrl.trim();

/** True once the client has pasted their Razorpay Payment Page link in. */
export const hasPaymentPage: boolean = PAYMENT_PAGE_URL !== "";

/**
 * Where Book Now goes.
 *
 * The trek is deliberately not passed along: a hosted Payment Page collects
 * only the fields the operator configured on it in the Razorpay dashboard, and
 * there is no documented, page-independent query parameter for naming the trek.
 * Inventing one would put a parameter in the URL that Razorpay ignores, so the
 * link stays exactly as configured.
 *
 * Falls back to the contact page while no payment page is configured, so the
 * button still takes the customer somewhere useful instead of nowhere.
 */
export const bookNowHref: string = hasPaymentPage
  ? PAYMENT_PAGE_URL
  : "/contact";
