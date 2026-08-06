import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckListProps {
  items: string[];
  tone: "include" | "exclude" | "neutral";
  className?: string;
}

/** Ticked/crossed list used for inclusions, exclusions and packing lists. */
export function CheckList({ items, tone, className }: CheckListProps) {
  if (items.length === 0) return null;
  const Icon = tone === "exclude" ? X : Check;

  return (
    <ul className={cn("space-y-2.5", className)}>
      {items.map((item, index) => (
        <li key={index} className="flex gap-3 text-sm leading-relaxed text-gray-600">
          <span
            className={cn(
              "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
              tone === "include" && "bg-forest-50 text-forest-700",
              tone === "exclude" && "bg-red-50 text-red-500",
              tone === "neutral" && "bg-saffron-50 text-saffron-600"
            )}
          >
            <Icon aria-hidden="true" className="size-3.5" strokeWidth={3} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
