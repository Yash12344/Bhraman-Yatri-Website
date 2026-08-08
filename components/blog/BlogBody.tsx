import { Check } from "lucide-react";
import { TrekCard } from "@/components/treks/TrekCard";
import { resolveTrekBlock } from "@/lib/blog";
import type { BlogBlock } from "@/lib/types";

interface BlogBodyProps {
  blocks: BlogBlock[];
}

/**
 * Renders an article body. Prose blocks are plain typography; `treks` blocks
 * are resolved against the live trek data at build time, so the treks named in
 * an article are never out of step with `data/treks/`.
 */
export function BlogBody({ blocks }: BlogBodyProps) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        if (block.type === "heading") {
          return (
            <h2
              key={key}
              className="pt-2 text-xl font-bold leading-snug text-gray-900 sm:text-2xl"
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p key={key} className="text-base leading-[1.8] text-gray-600">
              {block.text}
            </p>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={key} className="space-y-2.5">
              {block.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-base leading-relaxed text-gray-600"
                >
                  <Check
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-forest-600"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote
              key={key}
              className="rounded-2xl border-l-4 border-saffron-500 bg-neutral-50 px-6 py-5 text-base leading-relaxed text-gray-700"
            >
              {block.text}
            </blockquote>
          );
        }

        const treks = resolveTrekBlock(block.filter);
        if (treks.length === 0) return null;

        return (
          <div key={key} className="rounded-2xl bg-neutral-50 p-5 sm:p-6">
            {block.caption && (
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
                {block.caption}
              </p>
            )}
            {/* Two columns, not three: the article column is narrow and a
                three-up grid squeezes the card's price row. */}
            <ul className="grid gap-5 sm:grid-cols-2">
              {treks.map((trek) => (
                <li key={trek.slug}>
                  <TrekCard trek={trek} />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
