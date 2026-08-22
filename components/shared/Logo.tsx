import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/data";
import type { LogoAsset } from "@/lib/branding";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "dark" | "light";
  /**
   * "md" is the navbar mark; "sm" is the smaller footer mark.
   *
   * Both sizes are set in one place below and apply to the uploaded logo and
   * the built-in mark alike, so the two never drift apart.
   *
   * The navbar mark takes its largest step at `xl`, not `lg`: between 1024px
   * and 1279px the logo, the nav links and Book Now already fill the bar
   * exactly, so growing it there squeezes the nav instead of the whitespace.
   */
  size?: "sm" | "md";
  /**
   * The operator's uploaded logo, resolved on the server. When present it
   * replaces the built-in mark and wordmark entirely.
   */
  logo?: LogoAsset | null;
  className?: string;
}

export function Logo({
  variant = "dark",
  size = "md",
  logo = null,
  className,
}: LogoProps) {
  const isDark = variant === "dark";
  const mountain = isDark ? "var(--color-forest-800)" : "#ffffff";
  const snow = isDark ? "#ffffff" : "var(--color-forest-800)";

  return (
    <Link
      href="/"
      aria-label={`${SITE.name} — ${SITE.tagline}, go to homepage`}
      // The whole mark and wordmark is one hit area, with a subtle lift on hover.
      className={cn(
        "flex cursor-pointer items-center gap-2.5 rounded-lg transition-all duration-300 hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 focus-visible:ring-offset-4",
        className
      )}
    >
      {logo ? (
        // Height is fixed and width follows the file's own proportions, so any
        // shape of logo — square, wide lockup, tall stack — sits correctly.
        <Image
          src={logo.src}
          alt={SITE.name}
          width={logo.width}
          height={logo.height}
          priority
          className={cn(
            "w-auto object-contain",
            size === "sm" ? "h-14" : "h-16 xl:h-20"
          )}
        />
      ) : (
        <>
          <svg
            viewBox="0 0 52 44"
            aria-hidden="true"
            className={cn("shrink-0", size === "sm" ? "size-14" : "size-16 xl:size-20")}
          >
            {/* Sun disc behind the range */}
            <circle cx="26" cy="19" r="15" fill="var(--color-saffron-500)" />
            {/* Rear ridge */}
            <path d="M1 40 L14 17 L23 29 L30 20 L51 40 Z" fill={mountain} opacity="0.55" />
            {/* Front range with snow caps */}
            <path d="M0 40 L13 15 L22 28 L29 18 L44 40 Z" fill={mountain} />
            <path d="M9.4 21.5 L13 15 L16.6 21.5 L14.9 20 L13 22 L11.1 20 Z" fill={snow} />
            <path d="M25.7 22.4 L29 18 L32.3 22.4 L30.8 21.1 L29 22.7 L27.2 21.1 Z" fill={snow} />
          </svg>
          <span className="flex flex-col">
            <span
              className={cn(
                "text-xl font-bold leading-tight tracking-wide uppercase lg:text-2xl",
                isDark ? "text-forest-800" : "text-white"
              )}
            >
              {SITE.name}
            </span>
            <span className="text-[8px] font-semibold uppercase tracking-[0.28em] text-saffron-500 md:text-[9px]">
              — {SITE.tagline} —
            </span>
          </span>
        </>
      )}
    </Link>
  );
}
