import Link from "next/link";
import { Button, type ButtonProps } from "@/components/ui/button";
import { bookingHref, hasPaymentPage } from "@/lib/booking";
import { cn } from "@/lib/utils";

interface BookNowButtonProps {
  label?: string;
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
 * Once a payment page is configured it becomes an external link opening in a
 * new tab; until then it is an internal link to the contact page. Both look
 * identical, so nothing about the design depends on which is active.
 */
export function BookNowButton({
  label = "Book Now",
  srSuffix,
  variant = "primary",
  size = "md",
  className,
  linkClassName,
}: BookNowButtonProps) {
  const button = (
    <Button variant={variant} size={size} className={className} tabIndex={-1}>
      {label}
      {srSuffix && <span className="sr-only"> — {srSuffix}</span>}
    </Button>
  );

  if (hasPaymentPage) {
    return (
      <a
        href={bookingHref}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("block", linkClassName)}
      >
        {button}
      </a>
    );
  }

  return (
    <Link href={bookingHref} className={cn("block", linkClassName)}>
      {button}
    </Link>
  );
}
