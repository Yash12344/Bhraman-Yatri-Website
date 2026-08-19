"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Mountain, Phone, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FieldError, FieldIcon, FormAlert } from "@/components/forms/FormField";
import { bookingSchema, type BookingFormValues } from "@/lib/validations";
import { hasPaymentPage, paymentPageUrlWithPrefill } from "@/lib/booking";
import { SITE } from "@/lib/data";
import { cn, formatPrice } from "@/lib/utils";

export interface BookableTrek {
  slug: string;
  name: string;
  startingPrice: number;
  duration: string;
}

interface BookingFormProps {
  /** Passed from the server page so trek JSON never reaches the client bundle. */
  treks: BookableTrek[];
}

/**
 * Collects who is booking and what, then hands off to the operator's Razorpay
 * Payment Page. Payment itself happens on Razorpay — this form never sees card
 * details and never reports a booking as paid.
 */
export function BookingForm({ treks }: BookingFormProps) {
  const searchParams = useSearchParams();
  // Read on the client: `output: "export"` has no request at build time, so a
  // server component cannot see the query string.
  const requestedSlug = searchParams.get("trek") ?? "";
  const initialSlug = treks.some((trek) => trek.slug === requestedSlug)
    ? requestedSlug
    : "";

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      trek: initialSlug,
      participants: 1,
    },
  });

  const selected = treks.find((trek) => trek.slug === watch("trek"));
  const participants = watch("participants");
  const estimate =
    selected && Number.isFinite(participants) && participants > 0
      ? selected.startingPrice * participants
      : null;

  const onSubmit = (values: BookingFormValues) => {
    setSubmitError(null);

    const target = paymentPageUrlWithPrefill({
      name: values.name,
      email: values.email,
      phone: values.phone,
    });

    if (!target) {
      // No payment page configured. Say so plainly rather than implying the
      // booking went through.
      setSubmitError(
        `Online payment is not available just yet. Please contact us at ${SITE.email} or ${SITE.phone} and we will confirm your booking directly.`
      );
      return;
    }

    setIsRedirecting(true);
    window.location.href = target;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Booking form"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      <div>
        <Label htmlFor="booking-name">Full Name</Label>
        <div className="relative mt-1.5">
          <FieldIcon icon={User} />
          <Input
            id="booking-name"
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "booking-name-error" : undefined}
            className={cn("pl-10", errors.name && "border-red-400")}
            {...register("name")}
          />
        </div>
        <FieldError id="booking-name-error" message={errors.name?.message} />
      </div>

      <div>
        <Label htmlFor="booking-phone">Phone</Label>
        <div className="relative mt-1.5">
          <FieldIcon icon={Phone} />
          <Input
            id="booking-phone"
            type="tel"
            placeholder="Phone number"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "booking-phone-error" : undefined}
            className={cn("pl-10", errors.phone && "border-red-400")}
            {...register("phone")}
          />
        </div>
        <FieldError id="booking-phone-error" message={errors.phone?.message} />
      </div>

      <div className="sm:col-span-2">
        <Label htmlFor="booking-email">Email</Label>
        <div className="relative mt-1.5">
          <FieldIcon icon={Mail} />
          <Input
            id="booking-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "booking-email-error" : undefined}
            className={cn("pl-10", errors.email && "border-red-400")}
            {...register("email")}
          />
        </div>
        <FieldError id="booking-email-error" message={errors.email?.message} />
      </div>

      <div>
        <Label htmlFor="booking-trek">Trek</Label>
        <div className="relative mt-1.5">
          <FieldIcon icon={Mountain} />
          <Select
            id="booking-trek"
            aria-invalid={!!errors.trek}
            aria-describedby={errors.trek ? "booking-trek-error" : undefined}
            className={cn("pl-10", errors.trek && "border-red-400")}
            {...register("trek")}
          >
            <option value="" disabled>
              Select a trek
            </option>
            {treks.map((trek) => (
              <option key={trek.slug} value={trek.slug}>
                {trek.name}
              </option>
            ))}
          </Select>
        </div>
        <FieldError id="booking-trek-error" message={errors.trek?.message} />
      </div>

      <div>
        <Label htmlFor="booking-participants">Number of Participants</Label>
        <div className="relative mt-1.5">
          <FieldIcon icon={Users} />
          <Input
            id="booking-participants"
            type="number"
            min={1}
            max={30}
            aria-invalid={!!errors.participants}
            aria-describedby={
              errors.participants ? "booking-participants-error" : undefined
            }
            className={cn("pl-10", errors.participants && "border-red-400")}
            {...register("participants", { valueAsNumber: true })}
          />
        </div>
        <FieldError
          id="booking-participants-error"
          message={errors.participants?.message}
        />
      </div>

      {selected && (
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 sm:col-span-2">
          <p className="text-sm font-semibold text-gray-900">{selected.name}</p>
          <p className="mt-1 text-xs text-gray-500">{selected.duration}</p>
          <p className="mt-3 flex items-baseline justify-between gap-4 border-t border-neutral-200 pt-3 text-sm">
            <span className="text-gray-600">
              {formatPrice(selected.startingPrice)} × {estimate ? participants : "—"}
            </span>
            <span className="text-base font-bold text-saffron-500">
              {estimate ? formatPrice(estimate) : "—"}
            </span>
          </p>
          <p className="mt-2 text-xs leading-relaxed text-gray-500">
            Indicative total from the starting fare. The amount actually payable
            is confirmed on the payment page.
          </p>
        </div>
      )}

      {/* Only occupies a grid row when there is something to say. */}
      {submitError && (
        <div className="sm:col-span-2">
          <FormAlert message={submitError} />
        </div>
      )}

      <div className="sm:col-span-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting || isRedirecting}
          className="w-full sm:w-auto"
        >
          {isRedirecting ? "Redirecting to payment…" : "Continue to Payment"}
        </Button>
        <p className="mt-3 text-xs leading-relaxed text-gray-500">
          {hasPaymentPage
            ? "You will be taken to our secure Razorpay payment page to complete the booking."
            : "Online payment is being set up. Submit and we will tell you how to reach us to confirm."}
        </p>
      </div>
    </form>
  );
}
