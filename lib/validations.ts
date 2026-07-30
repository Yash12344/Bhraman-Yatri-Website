import { z } from "zod";

export const enquirySchema = z.object({
  name: z
    .string()
    .min(2, "Please enter your full name")
    .max(80, "Name is too long"),
  phone: z
    .string()
    .regex(/^[+]?[\d\s-]{10,15}$/, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  trek: z.string().min(1, "Please select a trek"),
  message: z.string().max(600, "Message is too long").optional(),
});

export type EnquiryFormValues = z.infer<typeof enquirySchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
