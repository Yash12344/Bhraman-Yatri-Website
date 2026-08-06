import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  /** "light" for use over dark hero imagery. */
  tone?: "light" | "dark";
  className?: string;
}

export function Breadcrumbs({ items, tone = "dark", className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1.5 text-xs",
          tone === "light" ? "text-white/80" : "text-gray-500"
        )}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors",
                    tone === "light" ? "hover:text-white" : "hover:text-saffron-600"
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={tone === "light" ? "text-white" : "text-gray-900"}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight aria-hidden="true" className="size-3.5 opacity-60" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
