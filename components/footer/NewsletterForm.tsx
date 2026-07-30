"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  newsletterSchema,
  type NewsletterFormValues,
} from "@/lib/validations";
import { cn } from "@/lib/utils";

export function NewsletterForm() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (values: NewsletterFormValues) => {
    console.info("Newsletter subscription:", values);
    setIsSubscribed(true);
    reset();
  };

  if (isSubscribed) {
    return (
      <p role="status" className="text-sm text-saffron-300">
        Thank you for subscribing!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Newsletter signup">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        placeholder="Enter your email"
        autoComplete="email"
        aria-invalid={!!errors.email}
        aria-describedby={errors.email ? "newsletter-email-error" : undefined}
        className={cn(
          "h-10 w-full rounded-lg border border-transparent bg-white px-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500",
          errors.email && "ring-2 ring-red-400"
        )}
        {...register("email")}
      />
      {errors.email && (
        <p id="newsletter-email-error" role="alert" className="mt-1 text-xs text-red-300">
          {errors.email.message}
        </p>
      )}
      <Button type="submit" variant="primary" size="sm" className="mt-3 h-10 w-full">
        Subscribe
      </Button>
    </form>
  );
}
