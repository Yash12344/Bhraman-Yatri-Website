import Link from "next/link";
import { Button, type ButtonProps } from "@/components/ui/button";
import { bookingStartHref } from "@/lib/booking";
import { cn } from "@/lib/utils";

interface BookNowButtonProps {
  label?: string;
  /** Trek being booked, so the booking form opens with it already chosen. */
  trekSlug?: string;
  /** Appended to the accessible name, e.g. the trek being booked. */
  srSuffix?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  /** Wrapper class, for layout at the call site. */
  linkClassName?: string;
}

/**
 * The single Book Now control, used by the navbar and every trek page.
 *
 * It always opens the booking form. From a trek page it carries that trek, so
 * the customer never retypes what they were already looking at. Payment
 * happens after the form, on the operator's Razorpay page.
 */
export function BookNowButton({
  label = "Book Now",
  trekSlug,
  srSuffix,
  variant = "primary",
  size = "md",
  className,
  linkClassName,
}: BookNowButtonProps) {
  return (
    <Link
      href={bookingStartHref(trekSlug)}
      className={cn("block", linkClassName)}
    >
      <Button variant={variant} size={size} className={className} tabIndex={-1}>
        {label}
        {srSuffix && <span className="sr-only"> — {srSuffix}</span>}
      </Button>
    </Link>
  );
}
