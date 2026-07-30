import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export function Logo({ variant = "dark", className }: LogoProps) {
  return (
    <Link
      href="#home"
      aria-label="Bhraman Yatri — Explore Beyond Limitts, go to homepage"
      className={cn("flex items-center gap-2.5", className)}
    >
      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        className="size-11 shrink-0 md:size-12"
      >
        <circle cx="26" cy="18" r="13" fill="var(--color-saffron-500)" />
        <path
          d="M2 42 L17 14 L26 30 L32 20 L46 42 Z"
          fill={
            variant === "dark" ? "var(--color-forest-800)" : "#ffffff"
          }
        />
        <path
          d="M13.5 20.5 L17 14 L20.5 20.5 L18.8 19 L17 21 L15.2 19 Z"
          fill={variant === "dark" ? "#ffffff" : "var(--color-forest-800)"}
        />
        <path
          d="M29.5 24.2 L32 20 L34.5 24.2 L33.2 23.2 L32 24.6 L30.8 23.2 Z"
          fill={variant === "dark" ? "#ffffff" : "var(--color-forest-800)"}
        />
      </svg>
      <span className="flex flex-col">
        <span
          className={cn(
            "text-lg font-bold leading-tight tracking-wide uppercase md:text-xl",
            variant === "dark" ? "text-forest-800" : "text-white"
          )}
        >
          Bhraman Yatri
        </span>
        <span className="text-[8px] font-semibold uppercase tracking-[0.28em] text-saffron-500 md:text-[9px]">
          — Explore Beyond Limitts —
        </span>
      </span>
    </Link>
  );
}
