"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Mail, MessageSquare, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FieldError, FieldIcon, FormAlert } from "@/components/forms/FormField";
import { contactSchema, type ContactFormValues } from "@/lib/validations";
import { submitForm } from "@/lib/forms";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSendError(null);
    try {
      await submitForm({
        subject: `Website contact: ${values.subject}`,
        fromName: values.name,
        fields: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          subject: values.subject,
          message: values.message,
        },
      });
    } catch (error) {
      // Only a delivered message earns the success screen.
      setSendError(
        error instanceof Error
          ? error.message
          : "Sorry — we could not send your message just now. Please try again."
      );
      return;
    }
    setIsSubmitted(true);
    reset();
  };

  if (isSubmitted) {
    return (
      <div
        role="status"
        className="flex min-h-72 flex-col items-center justify-center gap-3 text-center"
      >
        <CheckCircle2 aria-hidden="true" className="size-12 text-forest-500" />
        <p className="text-lg font-semibold text-gray-900">Message sent!</p>
        <p className="max-w-sm text-sm text-gray-500">
          Thanks for reaching out — we&apos;ll reply within 24 hours.
        </p>
        <Button variant="primary" size="md" onClick={() => setIsSubmitted(false)}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Contact form"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      <div>
        <Label htmlFor="contact-name">Full Name</Label>
        <div className="relative mt-1.5">
          <FieldIcon icon={User} />
          <Input
            id="contact-name"
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={cn("pl-10", errors.name && "border-red-400")}
            {...register("name")}
          />
        </div>
        <FieldError id="contact-name-error" message={errors.name?.message} />
      </div>

      <div>
        <Label htmlFor="contact-phone">Phone</Label>
        <div className="relative mt-1.5">
          <FieldIcon icon={Phone} />
          <Input
            id="contact-phone"
            type="tel"
            placeholder="Phone number"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
            className={cn("pl-10", errors.phone && "border-red-400")}
            {...register("phone")}
          />
        </div>
        <FieldError id="contact-phone-error" message={errors.phone?.message} />
      </div>

      <div className="sm:col-span-2">
        <Label htmlFor="contact-email">Email</Label>
        <div className="relative mt-1.5">
          <FieldIcon icon={Mail} />
          <Input
            id="contact-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={cn("pl-10", errors.email && "border-red-400")}
            {...register("email")}
          />
        </div>
        <FieldError id="contact-email-error" message={errors.email?.message} />
      </div>

      <div className="sm:col-span-2">
        <Label htmlFor="contact-subject">Subject</Label>
        <div className="relative mt-1.5">
          <FieldIcon icon={MessageSquare} />
          <Input
            id="contact-subject"
            placeholder="What is this about?"
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "contact-subject-error" : undefined}
            className={cn("pl-10", errors.subject && "border-red-400")}
            {...register("subject")}
          />
        </div>
        <FieldError id="contact-subject-error" message={errors.subject?.message} />
      </div>

      <div className="sm:col-span-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          rows={5}
          placeholder="Tell us how we can help"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={cn("mt-1.5 min-h-32", errors.message && "border-red-400")}
          {...register("message")}
        />
        <FieldError id="contact-message-error" message={errors.message?.message} />
      </div>

      {/* Only occupies a grid row when there is actually something to say. */}
      {sendError && (
        <div className="sm:col-span-2">
          <FormAlert message={sendError} />
        </div>
      )}

      <div className="sm:col-span-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </form>
  );
}
