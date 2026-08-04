import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Shared layout column. At >= 1280px the container caps at 1280px with 16px
 * gutters, giving the 1248px content width the reference design is built on.
 */
export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-4",
        className
      )}
    >
      {children}
    </div>
  );
}
