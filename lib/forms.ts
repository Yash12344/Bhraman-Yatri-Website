/**
 * Delivery for the contact and enquiry forms.
 *
 * The site is a static export with no server of its own, so there is no API
 * route to post to. Submissions go straight from the browser to Web3Forms,
 * which emails them on. Its access key is designed to be public — it only
 * authorises posting to one fixed inbox, and cannot read mail or the account —
 * so shipping it in the bundle is safe. No secret is involved.
 *
 * The key lives in `data/forms.json` (with instructions inside the file) so it
 * can be pasted in without touching code.
 */
import formsConfig from "@/data/forms.json";
import { SITE } from "@/lib/data";

const ENDPOINT = "https://api.web3forms.com/submit";

export const WEB3FORMS_ACCESS_KEY: string = formsConfig.web3formsAccessKey.trim();

/** The inbox the operator intends submissions to reach. */
export const FORM_RECIPIENT: string = formsConfig.recipientEmail.trim();

/** False until the access key has been pasted into `data/forms.json`. */
export const isFormDeliveryConfigured: boolean = WEB3FORMS_ACCESS_KEY !== "";

/** Thrown when a submission did not reach the inbox, for any reason. */
export class FormDeliveryError extends Error {}

/** What we tell a visitor when we could not deliver their message. */
const FAILURE_MESSAGE =
  `Sorry — we could not send your message just now. Please try again, or reach us directly at ${SITE.email} or ${SITE.phone}.`;

interface SubmitOptions {
  /** Subject line of the email that lands in the inbox. */
  subject: string;
  /** Shown as the sender name in the inbox. */
  fromName: string;
  /** The form's own fields, sent through as-is. */
  fields: Record<string, string | number | undefined>;
}

/**
 * Posts one submission and resolves only if it was actually accepted.
 * Throws `FormDeliveryError` otherwise — the caller must not show a success
 * state unless this resolves.
 */
export async function submitForm({
  subject,
  fromName,
  fields,
}: SubmitOptions): Promise<void> {
  if (!isFormDeliveryConfigured) {
    // Loud in the console for whoever is setting the site up, quiet and
    // useful for the visitor.
    console.error(
      "Form delivery is not configured: paste a Web3Forms access key into data/forms.json. The submission was NOT sent."
    );
    throw new FormDeliveryError(FAILURE_MESSAGE);
  }

  let response: Response;
  try {
    response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...fields,
        // After the spread: a form field named `subject` must not overwrite
        // the email's subject line, nor anything overwrite the access key.
        access_key: WEB3FORMS_ACCESS_KEY,
        subject,
        from_name: fromName,
      }),
    });
  } catch {
    // Offline, DNS failure, blocked request.
    throw new FormDeliveryError(FAILURE_MESSAGE);
  }

  let body: { success?: boolean; message?: string } = {};
  try {
    body = await response.json();
  } catch {
    throw new FormDeliveryError(FAILURE_MESSAGE);
  }

  if (!response.ok || body.success !== true) {
    throw new FormDeliveryError(FAILURE_MESSAGE);
  }
}
