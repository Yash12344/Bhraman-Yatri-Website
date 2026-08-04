"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Mail, Mountain, Phone, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { TREKS } from "@/lib/data";
import { enquirySchema, type EnquiryFormValues } from "@/lib/validations";
import { cn } from "@/lib/utils";

interface FieldIconProps {
  icon: LucideIcon;
}

function FieldIcon({ icon: Icon }: FieldIconProps) {
  return (
    <Icon
      aria-hidden="true"
      className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-400"
    />
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1 text-xs text-red-500">
      {message}
    </p>
  );
}

export function EnquiryForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { name: "", phone: "", email: "", trek: "", message: "" },
  });

  const onSubmit = async (values: EnquiryFormValues) => {
    // Simulated submission — wire this to an API route or CRM endpoint.
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.info("Enquiry submitted:", values);
    setIsSubmitted(true);
    reset();
  };

  if (isSubmitted) {
    return (
      <div
        role="status"
        className="flex h-full min-h-64 flex-col items-center justify-center gap-3 text-center"
      >
        <CheckCircle2 aria-hidden="true" className="size-12 text-forest-500" />
        <p className="text-lg font-semibold text-gray-900">
          Thank you for your enquiry!
        </p>
        <p className="max-w-sm text-sm text-gray-500">
          Our team will get back to you within 24 hours to plan your adventure.
        </p>
        <Button
          variant="primary"
          size="md"
          className="mt-2"
          onClick={() => setIsSubmitted(false)}
        >
          Send Another Enquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Trek enquiry form"
      className="grid grid-cols-1 items-start gap-x-6 gap-y-5 md:grid-cols-3"
    >
      <div>
        <label htmlFor="enquiry-name" className="sr-only">
          Your Name
        </label>
        <div className="relative">
          <FieldIcon icon={User} />
          <Input
            id="enquiry-name"
            placeholder="Your Name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "enquiry-name-error" : undefined}
            className={cn("pl-10", errors.name && "border-red-400")}
            {...register("name")}
          />
        </div>
        <FieldError id="enquiry-name-error" message={errors.name?.message} />
      </div>

      <div>
        <label htmlFor="enquiry-phone" className="sr-only">
          Phone Number
        </label>
        <div className="relative">
          <FieldIcon icon={Phone} />
          <Input
            id="enquiry-phone"
            type="tel"
            placeholder="Phone Number"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "enquiry-phone-error" : undefined}
            className={cn("pl-10", errors.phone && "border-red-400")}
            {...register("phone")}
          />
        </div>
        <FieldError id="enquiry-phone-error" message={errors.phone?.message} />
      </div>

      <div>
        <label htmlFor="enquiry-email" className="sr-only">
          Email Address
        </label>
        <div className="relative">
          <FieldIcon icon={Mail} />
          <Input
            id="enquiry-email"
            type="email"
            placeholder="Email Address"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "enquiry-email-error" : undefined}
            className={cn("pl-10", errors.email && "border-red-400")}
            {...register("email")}
          />
        </div>
        <FieldError id="enquiry-email-error" message={errors.email?.message} />
      </div>

      <div>
        <label htmlFor="enquiry-trek" className="sr-only">
          Select Trek
        </label>
        <div className="relative">
          <Mountain
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 z-10 size-4 -translate-y-1/2 text-gray-400"
          />
          <Select
            id="enquiry-trek"
            aria-invalid={!!errors.trek}
            aria-describedby={errors.trek ? "enquiry-trek-error" : undefined}
            className={cn("pl-10 text-gray-500", errors.trek && "border-red-400")}
            defaultValue=""
            {...register("trek")}
          >
            <option value="" disabled>
              Select Trek
            </option>
            {TREKS.map((trek) => (
              <option key={trek.id} value={trek.id}>
                {trek.name}
              </option>
            ))}
          </Select>
        </div>
        <FieldError id="enquiry-trek-error" message={errors.trek?.message} />
      </div>

      <div>
        <label htmlFor="enquiry-message" className="sr-only">
          Your Message
        </label>
        <Textarea
          id="enquiry-message"
          placeholder="Your Message"
          rows={3}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "enquiry-message-error" : undefined}
          className={cn("h-[66px]", errors.message && "border-red-400")}
          {...register("message")}
        />
        <FieldError id="enquiry-message-error" message={errors.message?.message} />
      </div>

      <div className="flex items-center">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="h-[42px] w-full"
        >
          {isSubmitting ? "Submitting..." : "Submit Enquiry"}
        </Button>
      </div>
    </form>
  );
}
