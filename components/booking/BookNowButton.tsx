import { Button, type ButtonProps } from "@/components/ui/button";
import { bookNowHref, hasPaymentPage } from "@/lib/booking";
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
 * It opens the operator's Razorpay Payment Page directly, so the customer
 * fills in their details once — on Razorpay — instead of entering them here
 * and then again there. A plain anchor rather than next/link, because the
 * destination is off-site.
 */
export function BookNowButton({
  label = "Book Now",
  srSuffix,
  variant = "primary",
  size = "md",
  className,
  linkClassName,
}: BookNowButtonProps) {
  return (
    <a
      href={bookNowHref}
      // Only an external link while a payment page is configured; the fallback
      // is an internal page and must not carry link relations meant for one.
      {...(hasPaymentPage ? { rel: "noopener noreferrer" } : {})}
      className={cn("block", linkClassName)}
    >
      <Button variant={variant} size={size} className={className} tabIndex={-1}>
        {label}
        {srSuffix && <span className="sr-only"> — {srSuffix}</span>}
      </Button>
    </a>
  );
}
