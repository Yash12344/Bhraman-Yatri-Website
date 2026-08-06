import { z } from "zod";

const name = z
  .string()
  .min(2, "Please enter your full name")
  .max(80, "Name is too long");

const phone = z
  .string()
  .regex(/^[+]?[\d\s-]{10,15}$/, "Please enter a valid phone number");

const email = z.string().email("Please enter a valid email address");

export const enquirySchema = z.object({
  name,
  phone,
  email,
  trek: z.string().min(1, "Please select a trek"),
  message: z.string().max(600, "Message is too long").optional(),
});

export type EnquiryFormValues = z.infer<typeof enquirySchema>;

/** Per-trek booking enquiry, shown on every trek detail page. */
export const bookingSchema = z.object({
  name,
  phone,
  email,
  travelDate: z.string().min(1, "Please choose a travel date"),
  // Registered with `valueAsNumber`, so an empty field arrives as NaN.
  travellers: z
    .number({ error: "Please enter the number of travellers" })
    .int("Please enter a whole number")
    .min(1, "At least 1 traveller")
    .max(30, "For groups above 30, please call us"),
  message: z.string().max(600, "Message is too long").optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

export const contactSchema = z.object({
  name,
  email,
  phone,
  subject: z.string().min(2, "Please enter a subject").max(120, "Subject is too long"),
  message: z
    .string()
    .min(10, "Please tell us a little more")
    .max(1000, "Message is too long"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({ email });

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
