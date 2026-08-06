import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  /** Optional supporting line rendered under the divider. */
  subtitle?: string;
  align?: "center" | "left";
  /** Renders as h1 on pages where this is the primary heading. */
  as?: "h1" | "h2";
  className?: string;
  id?: string;
}

export function SectionTitle({
  title,
  subtitle,
  align = "center",
  as: Heading = "h2",
  className,
  id,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <Heading
        id={id}
        className="text-[22px] font-bold uppercase leading-none tracking-wide text-gray-900 md:text-[26px]"
      >
        {title}
      </Heading>
      <span aria-hidden="true" className="flex items-center gap-1.5">
        <span className="h-[3px] w-8 rounded-full bg-saffron-500" />
        <span className="size-2 rounded-full bg-saffron-500" />
        <span className="h-[3px] w-8 rounded-full bg-saffron-500" />
      </span>
      {subtitle && (
        <p
          className={cn(
            "text-sm leading-relaxed text-gray-500",
            align === "center" && "max-w-2xl"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
