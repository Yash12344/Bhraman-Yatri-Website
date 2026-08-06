"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarDays,
  CheckCircle2,
  Mail,
  Phone,
  User,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FieldError, FieldIcon } from "@/components/forms/FormField";
import { bookingSchema, type BookingFormValues } from "@/lib/validations";
import { cn } from "@/lib/utils";

interface BookingFormProps {
  trekName: string;
  trekSlug: string;
}

/** Per-trek booking enquiry. Rendered on every trek detail page. */
export function BookingForm({ trekName, trekSlug }: BookingFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      travelDate: "",
      travellers: 1,
      message: "",
    },
  });

  const onSubmit = async (values: BookingFormValues) => {
    // Simulated submission — wire this to an API route or CRM endpoint.
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.info("Booking request:", { trek: trekSlug, ...values });
    setIsSubmitted(true);
    reset();
  };

  if (isSubmitted) {
    return (
      <div
        role="status"
        className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-neutral-200 bg-white p-8 text-center"
      >
        <CheckCircle2 aria-hidden="true" className="size-12 text-forest-500" />
        <p className="text-lg font-semibold text-gray-900">Request received!</p>
        <p className="max-w-sm text-sm text-gray-500">
          Our team will contact you within 24 hours to confirm your slot on the{" "}
          {trekName}.
        </p>
        <Button variant="primary" size="md" onClick={() => setIsSubmitted(false)}>
          Book Another Date
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label={`Booking form for ${trekName}`}
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
        <Label htmlFor="booking-date">Travel Date</Label>
        <div className="relative mt-1.5">
          <FieldIcon icon={CalendarDays} />
          <Input
            id="booking-date"
            type="date"
            aria-invalid={!!errors.travelDate}
            aria-describedby={errors.travelDate ? "booking-date-error" : undefined}
            className={cn("pl-10", errors.travelDate && "border-red-400")}
            {...register("travelDate")}
          />
        </div>
        <FieldError id="booking-date-error" message={errors.travelDate?.message} />
      </div>

      <div>
        <Label htmlFor="booking-travellers">Number of Travellers</Label>
        <div className="relative mt-1.5">
          <FieldIcon icon={Users} />
          <Input
            id="booking-travellers"
            type="number"
            min={1}
            max={30}
            aria-invalid={!!errors.travellers}
            aria-describedby={
              errors.travellers ? "booking-travellers-error" : undefined
            }
            className={cn("pl-10", errors.travellers && "border-red-400")}
            {...register("travellers", { valueAsNumber: true })}
          />
        </div>
        <FieldError
          id="booking-travellers-error"
          message={errors.travellers?.message}
        />
      </div>

      <div className="sm:col-span-2">
        <Label htmlFor="booking-message">Message (optional)</Label>
        <Textarea
          id="booking-message"
          rows={3}
          placeholder="Tell us about your group, fitness level or any questions"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "booking-message-error" : undefined}
          className={cn("mt-1.5 min-h-24", errors.message && "border-red-400")}
          {...register("message")}
        />
        <FieldError id="booking-message-error" message={errors.message?.message} />
      </div>

      <div className="sm:col-span-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Sending..." : "Request Booking"}
        </Button>
      </div>
    </form>
  );
}
