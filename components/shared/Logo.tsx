import Link from "next/link";
import { SITE } from "@/lib/data";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "dark" | "light";
  /** "md" is the navbar mark; "sm" is the smaller footer mark. */
  size?: "sm" | "md";
  className?: string;
}

export function Logo({ variant = "dark", size = "md", className }: LogoProps) {
  const isDark = variant === "dark";
  const mountain = isDark ? "var(--color-forest-800)" : "#ffffff";
  const snow = isDark ? "#ffffff" : "var(--color-forest-800)";

  return (
    <Link
      href="#home"
      aria-label={`${SITE.name} — ${SITE.tagline}, go to homepage`}
      className={cn("flex items-center gap-2.5", className)}
    >
      <svg
        viewBox="0 0 52 44"
        aria-hidden="true"
        className={cn("shrink-0", size === "sm" ? "size-11" : "size-12 lg:size-14")}
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
    </Link>
  );
}
