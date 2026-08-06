import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-semibold whitespace-nowrap",
  {
    variants: {
      variant: {
        forest: "bg-forest-50 text-forest-800",
        saffron: "bg-saffron-50 text-saffron-700",
        neutral: "bg-neutral-100 text-gray-700",
        glass: "bg-white/15 text-white backdrop-blur-sm ring-1 ring-white/25",
        solid: "bg-saffron-500 text-white",
      },
      size: {
        sm: "px-2.5 py-1 text-[11px]",
        md: "px-3 py-1.5 text-xs",
      },
    },
    defaultVariants: { variant: "neutral", size: "sm" },
  }
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, variant, size, className }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)}>
      {children}
    </span>
  );
}
