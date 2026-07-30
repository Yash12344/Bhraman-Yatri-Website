import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  className?: string;
}

export function SectionHeading({ title, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col items-center gap-3 text-center", className)}>
      <h2 className="text-2xl font-bold uppercase tracking-wide text-gray-900 md:text-[28px]">
        {title}
      </h2>
      <span aria-hidden="true" className="flex items-center gap-1.5">
        <span className="h-[3px] w-8 rounded-full bg-saffron-500" />
        <span className="size-2 rounded-full bg-saffron-500" />
        <span className="h-[3px] w-8 rounded-full bg-saffron-500" />
      </span>
    </div>
  );
}
