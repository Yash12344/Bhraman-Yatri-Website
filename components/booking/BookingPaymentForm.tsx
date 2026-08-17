"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/forms/FormField";
import { BOOKING, SITE } from "@/lib/data";
import {
  paymentBookingSchema,
  type PaymentBookingFormValues,
} from "@/lib/validations";
import { cn, formatDate, formatPrice } from "@/lib/utils";

interface BookingPaymentFormProps {
  /** Prefilled from ?trek= on the booking page. */
  defaultTrek?: string;
  defaultFee?: number;
}

/** Label above the field on small screens, beside it from `sm` up. */
function Row({
  htmlFor,
  label,
  children,
}: {
  htmlFor: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="sm:grid sm:grid-cols-[minmax(0,150px)_1fr] sm:items-start sm:gap-4">
      <Label
        htmlFor={htmlFor}
        className="text-sm font-normal text-gray-700 sm:pt-2.5"
      >
        {label} <span className="text-red-500">*</span>
      </Label>
      <div className="mt-1.5 sm:mt-0">{children}</div>
    </div>
  );
}

export function BookingPaymentForm({
  defaultTrek = "",
  defaultFee,
}: BookingPaymentFormProps) {
  const [submitted, setSubmitted] = useState<PaymentBookingFormValues | null>(
    null
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PaymentBookingFormValues>({
    resolver: zodResolver(paymentBookingSchema),
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      city: "",
      trekPlace: defaultTrek,
      startingDate: "",
      members: 1,
      feePerPerson: defaultFee,
    },
  });

  // The button shows a live total, the way the operator's payment page does.
  const members = watch("members");
  const feePerPerson = watch("feePerPerson");
  const total =
    Number.isFinite(members) && Number.isFinite(feePerPerson)
      ? Math.max(0, members) * Math.max(0, feePerPerson)
      : 0;

  const canPayOnline = BOOKING.paymentPageUrl !== "";

  const onSubmit = async (values: PaymentBookingFormValues) => {
    // Simulated submission — wire this to an API route or CRM endpoint.
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.info("Booking request:", values);
    setSubmitted(values);

    if (canPayOnline) {
      window.location.href = BOOKING.paymentPageUrl;
      return;
    }
    reset();
  };

  if (submitted && !canPayOnline) {
    return (
      <div
        role="status"
        className="flex min-h-[420px] flex-col items-center justify-center gap-3 bg-white p-8 text-center"
      >
        <CheckCircle2 aria-hidden="true" className="size-12 text-forest-500" />
        <p className="text-lg font-semibold text-gray-900">Booking received</p>
        <p className="max-w-sm text-sm leading-relaxed text-gray-500">
          Thank you, {submitted.name}. We have your request for{" "}
          {submitted.trekPlace} on {formatDate(submitted.startingDate)} for{" "}
          {submitted.members} {submitted.members === 1 ? "person" : "people"}.
          We will confirm your slot and send a secure payment link for{" "}
          {formatPrice(submitted.members * submitted.feePerPerson)} by email and
          WhatsApp.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(null)}
          className="mt-2 cursor-pointer text-sm font-semibold text-saffron-600 underline-offset-4 hover:underline"
        >
          Make another booking
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Booking form"
      className="flex h-full flex-col"
    >
      <div className="flex-1 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900">Payment Details</h2>
        <span
          aria-hidden="true"
          className="mt-3 block h-1 w-10 rounded-full bg-saffron-500"
        />

        <div className="mt-7 space-y-5">
          <Row htmlFor="bk-name" label="Your Full Name">
            <Input
              id="bk-name"
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "bk-name-error" : undefined}
              className={cn(errors.name && "border-red-400")}
              {...register("name")}
            />
            <FieldError id="bk-name-error" message={errors.name?.message} />
          </Row>

          <Row htmlFor="bk-mobile" label="Your Mobile">
            <div className="flex">
              <span
                aria-hidden="true"
                className="flex h-11 shrink-0 items-center rounded-l-lg border border-r-0 border-neutral-200 bg-neutral-50 px-3 text-sm text-gray-600"
              >
                IN +91
              </span>
              <Input
                id="bk-mobile"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                aria-invalid={!!errors.mobile}
                aria-describedby={errors.mobile ? "bk-mobile-error" : undefined}
                className={cn(
                  "rounded-l-none",
                  errors.mobile && "border-red-400"
                )}
                {...register("mobile")}
              />
            </div>
            <FieldError id="bk-mobile-error" message={errors.mobile?.message} />
          </Row>

          <Row htmlFor="bk-email" label="Your Email">
            <Input
              id="bk-email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "bk-email-error" : undefined}
              className={cn(errors.email && "border-red-400")}
              {...register("email")}
            />
            <FieldError id="bk-email-error" message={errors.email?.message} />
          </Row>

          <Row htmlFor="bk-city" label="Your City">
            <Input
              id="bk-city"
              autoComplete="address-level2"
              aria-invalid={!!errors.city}
              aria-describedby={errors.city ? "bk-city-error" : undefined}
              className={cn(errors.city && "border-red-400")}
              {...register("city")}
            />
            <FieldError id="bk-city-error" message={errors.city?.message} />
          </Row>

          <Row htmlFor="bk-trek" label="Trek Place">
            <Input
              id="bk-trek"
              aria-invalid={!!errors.trekPlace}
              aria-describedby={errors.trekPlace ? "bk-trek-error" : undefined}
              className={cn(errors.trekPlace && "border-red-400")}
              {...register("trekPlace")}
            />
            <FieldError id="bk-trek-error" message={errors.trekPlace?.message} />
          </Row>

          <Row htmlFor="bk-date" label="Starting Date">
            <Input
              id="bk-date"
              type="date"
              aria-invalid={!!errors.startingDate}
              aria-describedby={errors.startingDate ? "bk-date-error" : undefined}
              className={cn(errors.startingDate && "border-red-400")}
              {...register("startingDate")}
            />
            <FieldError
              id="bk-date-error"
              message={errors.startingDate?.message}
            />
          </Row>

          <Row htmlFor="bk-members" label="Number of Members">
            <Input
              id="bk-members"
              type="number"
              min={1}
              max={30}
              aria-invalid={!!errors.members}
              aria-describedby={errors.members ? "bk-members-error" : undefined}
              className={cn(errors.members && "border-red-400")}
              {...register("members", { valueAsNumber: true })}
            />
            <FieldError id="bk-members-error" message={errors.members?.message} />
          </Row>

          <Row htmlFor="bk-fee" label="Booking Fee Per Person">
            <div className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
              >
                ₹
              </span>
              <Input
                id="bk-fee"
                type="number"
                min={1}
                placeholder="Enter Amount"
                aria-invalid={!!errors.feePerPerson}
                aria-describedby={errors.feePerPerson ? "bk-fee-error" : undefined}
                className={cn("pl-7", errors.feePerPerson && "border-red-400")}
                {...register("feePerPerson", { valueAsNumber: true })}
              />
            </div>
            <FieldError id="bk-fee-error" message={errors.feePerPerson?.message} />
          </Row>
        </div>

        {!canPayOnline && (
          <p className="mt-7 rounded-lg bg-neutral-50 px-4 py-3 text-xs leading-relaxed text-gray-500">
            Online payment is not switched on yet. Submit this form and{" "}
            {SITE.name} will confirm your slot and send a secure payment link by
            email and WhatsApp.
          </p>
        )}
      </div>

      {/* Payment bar */}
      <div className="flex flex-col gap-4 border-t border-neutral-100 bg-neutral-50/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-0 sm:pl-8">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
          {BOOKING.paymentMethods.map((method) => (
            <span key={method}>{method}</span>
          ))}
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-14 cursor-pointer items-center justify-center gap-2 rounded-lg bg-saffron-500 px-8 text-base font-semibold text-white transition-colors hover:bg-saffron-600 disabled:cursor-not-allowed disabled:opacity-60 sm:h-[88px] sm:min-w-[210px] sm:rounded-none sm:rounded-br-2xl"
        >
          {isSubmitting
            ? "Please wait…"
            : canPayOnline
              ? `Pay ${formatPrice(total)}`
              : `Book Now · ${formatPrice(total)}`}
        </button>
      </div>
    </form>
  );
}
