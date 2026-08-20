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
